import { NextResponse } from "next/server";
import { loadCatalog } from "@/lib/chatbot/catalog";
import { buildSystemPrompt } from "@/lib/chatbot/systemPrompt";
import type { ChatMessage, ChatRequest } from "@/lib/chatbot/types";

/**
 * /api/chat - server-side NVIDIA NIM proxy for the EDUS chatbot.
 *
 * Why a proxy and not direct browser-to-NIM calls?
 *   1. NVIDIA_API_KEY MUST stay server-side. Direct calls from the
 *      browser would expose the key to anyone who opens devtools.
 *   2. We inject the EDUS system prompt + catalog data server-side so
 *      the client only sends the conversation history. Catalog stays
 *      authoritative; client can't manipulate what classes get shown.
 *   3. Per-IP rate limiting (10 messages/min) lives here. Without it,
 *      a misbehaving page on edustutor.com could rack up unbounded
 *      NVIDIA bills.
 *
 * Wire format:
 *   POST /api/chat
 *   { "messages": [{ "role": "user", "content": "..." }, ...] }
 *
 *   200 { "message": "...assistant reply..." }
 *   400 { "error": "..." }
 *   429 { "error": "rate limit", "retryAfterSeconds": 60 }
 *   500 { "error": "..." }
 *   502 { "error": "upstream failure" }
 *
 * NVIDIA NIM uses an OpenAI-compatible chat completions API, so the
 * request body shape mirrors OpenAI's exactly.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** OpenAI-compatible NIM endpoint. Model + key come from env. */
const NIM_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const DEFAULT_MODEL = "meta/llama-3.3-70b-instruct";

/** Conversation limits to keep latency + cost predictable. */
const MAX_TURNS = 30;        // chat history length cap
const MAX_USER_LEN = 2000;   // per-message char cap
const MAX_TOTAL_LEN = 20000; // total history char cap

/** Rate limit: 10 messages per IP per 60s rolling window. */
const RATE_LIMIT_PER_MIN = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * In-memory rate limit store. Keyed by IP, value is array of timestamps
 * (ms) of recent requests within the rolling window.
 *
 * In-memory is intentional: this is per-Vercel-instance scope, which
 * means a determined attacker could amortise their load across instances.
 * That's fine for v1 - the NVIDIA per-request cost is low and the
 * 10/min cap protects against accidental loops, not motivated abuse.
 * If abuse becomes real, upgrade to Vercel KV or Upstash Redis.
 */
const rateLimitStore = new Map<string, number[]>();

function getClientIp(req: Request): string {
  // Vercel sets x-forwarded-for; first IP in the list is the client.
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/**
 * Returns null if within limit, or a Response if rate-limited.
 * Side effect: trims old entries + records this request's timestamp.
 */
function rateLimit(ip: string): Response | null {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitStore.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT_PER_MIN) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return NextResponse.json(
      { error: "rate limit", retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  // Opportunistic cleanup - drop entries we'll never need again.
  if (rateLimitStore.size > 5000) {
    for (const [key, ts] of rateLimitStore) {
      const filtered = ts.filter((t) => t > cutoff);
      if (filtered.length === 0) rateLimitStore.delete(key);
      else rateLimitStore.set(key, filtered);
    }
  }
  return null;
}

/**
 * Validate the incoming messages array. Returns null on success or a
 * 400 Response with a parent-friendly error message.
 */
function validateMessages(messages: unknown): {
  error?: Response;
  messages?: ChatMessage[];
} {
  if (!Array.isArray(messages)) {
    return { error: NextResponse.json({ error: "messages must be an array" }, { status: 400 }) };
  }
  if (messages.length === 0) {
    return { error: NextResponse.json({ error: "messages cannot be empty" }, { status: 400 }) };
  }
  if (messages.length > MAX_TURNS) {
    return {
      error: NextResponse.json(
        { error: `conversation too long - max ${MAX_TURNS} turns` },
        { status: 400 },
      ),
    };
  }
  const cleaned: ChatMessage[] = [];
  let totalLen = 0;
  for (const m of messages) {
    if (typeof m !== "object" || m === null) {
      return { error: NextResponse.json({ error: "invalid message" }, { status: 400 }) };
    }
    const msg = m as Record<string, unknown>;
    if (msg.role !== "user" && msg.role !== "assistant") {
      // We reject any client-supplied "system" role - the server adds it.
      return { error: NextResponse.json({ error: "invalid message role" }, { status: 400 }) };
    }
    if (typeof msg.content !== "string") {
      return { error: NextResponse.json({ error: "message content must be a string" }, { status: 400 }) };
    }
    const content = msg.content.trim();
    if (msg.role === "user" && content.length > MAX_USER_LEN) {
      return {
        error: NextResponse.json(
          { error: `message too long - max ${MAX_USER_LEN} chars` },
          { status: 400 },
        ),
      };
    }
    totalLen += content.length;
    cleaned.push({ role: msg.role, content });
  }
  if (totalLen > MAX_TOTAL_LEN) {
    return {
      error: NextResponse.json(
        { error: "conversation too long" },
        { status: 400 },
      ),
    };
  }
  return { messages: cleaned };
}

export async function POST(req: Request) {
  const apiKey = process.env.NVIDIA_API_KEY;
  const model = process.env.NVIDIA_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Chatbot is not configured (NVIDIA_API_KEY missing)." },
      { status: 500 },
    );
  }

  // 1. Rate limit FIRST - cheapest rejection path.
  const ip = getClientIp(req);
  const rateLimitResponse = rateLimit(ip);
  if (rateLimitResponse) return rateLimitResponse;

  // 2. Parse + validate body.
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const { error, messages: clientMessages } = validateMessages(body.messages);
  if (error) return error;

  // 3. Build the system prompt with the live catalog injected.
  const catalog = await loadCatalog();
  const systemPrompt = buildSystemPrompt(catalog.classes, catalog.tutors);

  // 4. Call NVIDIA NIM (OpenAI-compatible chat completions API).
  const upstreamPayload = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...(clientMessages ?? []),
    ],
    temperature: 0.3,        // low temp - we want catalog-accurate replies, not creative ones
    top_p: 0.9,
    max_tokens: 800,         // generous enough for class recommendations + capture flow
    stream: false,           // v1 returns full reply; streaming can be added later
  };

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(NIM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(upstreamPayload),
    });
  } catch (err) {
    console.error("[chat] NIM fetch error:", err);
    return NextResponse.json(
      { error: "Could not reach the assistant. Please try again in a moment." },
      { status: 502 },
    );
  }

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text().catch(() => "");
    // Log the upstream error verbatim - dev terminal shows the real reason
    // (invalid model name, auth failure, quota exceeded, etc).
    console.error(
      "[chat] NIM upstream error:",
      upstreamRes.status,
      text.slice(0, 500),
    );
    // Return a generic message to the browser. We never echo upstream
    // error bodies because they may contain internal endpoint paths or
    // error codes that don't help the parent.
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }

  // 5. Extract the assistant's reply from the OpenAI-compatible response.
  type NimResponse = {
    choices?: Array<{ message?: { content?: string } }>;
  };
  let json: NimResponse;
  try {
    json = (await upstreamRes.json()) as NimResponse;
  } catch (err) {
    console.error("[chat] NIM JSON parse error:", err);
    return NextResponse.json(
      { error: "Unexpected response from the assistant." },
      { status: 502 },
    );
  }

  const assistantContent = json.choices?.[0]?.message?.content?.trim() ?? "";
  if (!assistantContent) {
    return NextResponse.json(
      { error: "The assistant returned an empty reply. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: assistantContent });
}
