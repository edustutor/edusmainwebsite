import { NextResponse } from "next/server";
import { loadCatalog } from "@/lib/chatbot/catalog";
import { buildSystemPrompt } from "@/lib/chatbot/systemPrompt";
import { searchEdus, type TavilyResult } from "@/lib/chatbot/tavily";
import type {
  ChatMessage,
  ChatRequest,
  IntakePayload,
} from "@/lib/chatbot/types";

/**
 * /api/chat - server-side NVIDIA NIM proxy for the EDUS chatbot.
 *
 * Why a proxy and not direct browser-to-NIM calls?
 *   1. NVIDIA_API_KEY MUST stay server-side. Direct calls from the
 *      browser would expose the key to anyone who opens devtools.
 *   2. We inject the EDUS system prompt + catalog data server-side so
 *      the client only sends the conversation history. Catalog stays
 *      authoritative; client can't manipulate what classes get shown.
 *   3. Per-IP rate limiting (10 messages/min) lives here.
 *   4. The Tavily search tool runs HERE so the parent never sees raw
 *      search payloads and TAVILY_API_KEY stays off the browser.
 *
 * Wire format:
 *   POST /api/chat
 *   { "messages": [{ "role": "user", "content": "..." }, ...],
 *     "intake": { ... } }
 *
 *   200 text/plain (chunked) - streams the assistant reply token-by-token
 *   400 application/json { "error": "..." }
 *   429 application/json { "error": "rate limit", "retryAfterSeconds": 60 }
 *   500 application/json { "error": "..." }
 *   502 application/json { "error": "upstream failure" }
 *
 * STREAMING + SITE SEARCH:
 *   One NIM call per user turn, streamed straight to the browser as
 *   plain text. When the turn is about something outside the class
 *   catalog (founder, press, gallery, awards, contact...), the server
 *   first runs a Tavily search (lib/chatbot/tavily.ts, EDUS domains
 *   only) and appends the results to the system prompt.
 *
 *   Why the server searches instead of offering the model a tool:
 *   on 2026-10-21 Nemotron 3 Ultra wrote its tool call into the reply
 *   as plain text (raw JSON or <tool_call> tags) on 2 of 6 search
 *   questions, which would show to the parent. Searching server-side
 *   removes that failure, works with any model, and needs one model
 *   call instead of two.
 *
 * NVIDIA NIM uses an OpenAI-compatible chat completions API.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** OpenAI-compatible NIM endpoint. Model + key come from env. */
const NIM_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
// Llama 3.3 70B was retired by NVIDIA on 2026-08-26 (HTTP 410), which took
// the chatbot down. Nemotron 3 Ultra was the best of the NIM models tested
// on 2026-10-21 for Tamil + Sinhala quality, tool calling and speed
// (first token in about 2s). DeepSeek V4.1 Flash wrote slightly better
// Sinhala but took over 70s on NIM's shared queue, so it is not usable here.
const DEFAULT_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

/** Conversation limits to keep latency + cost predictable. */
const MAX_TURNS = 30;        // chat history length cap
const MAX_USER_LEN = 2000;   // per-message char cap
const MAX_TOTAL_LEN = 20000; // total history char cap
const MAX_SEARCH_QUERY_LEN = 300; // Tavily works best with a short query

/** Rate limit: 10 messages per IP per 60s rolling window. */
const RATE_LIMIT_PER_MIN = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * In-memory rate limit store. Keyed by IP, value is array of timestamps
 * (ms) of recent requests within the rolling window.
 */
const rateLimitStore = new Map<string, number[]>();

/* --------------------------------------------------------------- */
/* Rate limiting + helpers                                          */
/* --------------------------------------------------------------- */

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

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
  if (rateLimitStore.size > 5000) {
    for (const [key, ts] of rateLimitStore) {
      const filtered = ts.filter((t) => t > cutoff);
      if (filtered.length === 0) rateLimitStore.delete(key);
      else rateLimitStore.set(key, filtered);
    }
  }
  return null;
}

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

/* --------------------------------------------------------------- */
/* POST handler                                                      */
/* --------------------------------------------------------------- */

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

  // 3. Build the system prompt with the live catalog + intake injected.
  const catalog = await loadCatalog();
  const intake = sanitiseIntake(body.intake);
  let systemPrompt = buildSystemPrompt(
    catalog.classes,
    catalog.tutors,
    intake,
  );

  // 4. Off-catalog turns (founder, press, gallery, awards...) get a site
  // search first, appended to the system prompt. Catalog turns skip it,
  // since classes, fees, tutors and timetables are already in the prompt.
  const latestUser = [...(clientMessages ?? [])]
    .reverse()
    .find((m) => m.role === "user");
  const latestText = latestUser?.content ?? "";
  if (userTurnNeedsSearchTool(latestText)) {
    const results = await searchEdus(latestText.slice(0, MAX_SEARCH_QUERY_LEN));
    console.log(`[chat] site search returned ${results.length} result(s)`);
    systemPrompt = `${systemPrompt}\n\n${formatSearchResults(results)}`;
  }

  const conversation: NimMessage[] = [
    { role: "system", content: systemPrompt },
    ...(clientMessages ?? []).map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  // 5. One streamed NIM call; pipe the reply straight to the browser.
  const round = await runRound({ apiKey, model, messages: conversation });
  if (round.kind === "content") {
    return contentResponse(round.body);
  }
  return round.response;
}

/* --------------------------------------------------------------- */
/* NIM round - one chat completion call, streaming                  */
/* --------------------------------------------------------------- */

/** OpenAI-compatible chat message. */
type NimMessage = { role: "system" | "user" | "assistant"; content: string };

type RunRoundArgs = {
  apiKey: string;
  model: string;
  messages: NimMessage[];
};

type RunRoundResult =
  | { kind: "content"; body: ReadableStream<Uint8Array> }
  | { kind: "error"; response: Response };

/**
 * Open a NIM streaming chat completion. Reads the SSE stream until the
 * first real content arrives, then either:
 *   - "content": returns the FULL stream wrapped to emit plain text
 *     (the remaining content tokens flow through to the browser).
 *   - "error": returns a 502 Response to surface to the caller.
 *
 * We CANNOT split the stream into "what we already read" + "rest" with
 * a single pipe. Instead, on content we re-emit the buffered first
 * content token then continue from the reader. The transform stream
 * below handles that initial-token replay.
 */
async function runRound(args: RunRoundArgs): Promise<RunRoundResult> {
  const { apiKey, model, messages } = args;

  const payload: Record<string, unknown> = {
    model,
    messages,
    temperature: 0.3,
    top_p: 0.9,
    // 500 tokens (~375 words) is enough for the longest realistic reply
    // (all-classes proforma listing with 6-8 cards + admission line +
    // enrolment options). Was 800 - dropped to cut tail latency.
    max_tokens: 500,
    stream: true,
    // Nemotron 3 is a reasoning model. Left on, it spends the token budget
    // thinking and sometimes writes its reasoning into the reply itself
    // (seen in testing). Models without this switch ignore it.
    chat_template_kwargs: { enable_thinking: false },
  };

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(NIM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[chat] NIM fetch error:", err);
    return {
      kind: "error",
      response: NextResponse.json(
        { error: "Could not reach the assistant. Please try again in a moment." },
        { status: 502 },
      ),
    };
  }

  if (!upstreamRes.ok || !upstreamRes.body) {
    const text = upstreamRes.body
      ? await upstreamRes.text().catch(() => "")
      : "";
    console.error(
      "[chat] NIM upstream error:",
      upstreamRes.status,
      text.slice(0, 500),
    );
    return {
      kind: "error",
      response: NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again." },
        { status: 502 },
      ),
    };
  }

  return classifyAndStream(upstreamRes.body);
}

/**
 * Peek at the upstream stream until we see either:
 *   - The first real content delta -> stream the rest as plain text.
 *   - [DONE] or end of stream with no content -> error.
 */
async function classifyAndStream(
  upstream: ReadableStream<Uint8Array>,
): Promise<RunRoundResult> {
  const decoder = new TextDecoder("utf-8");
  const reader = upstream.getReader();

  let buffer = "";
  let firstContent: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Process every complete SSE frame in the buffer. A frame ends
    // with the SSE-standard blank line "\n\n".
    let sep: number;
    while (firstContent === null && (sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);

      for (const line of frame.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") {
          return emptyReplyError();
        }
        try {
          const json = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const content = json.choices?.[0]?.delta?.content;
          // Leading whitespace alone does not start the reply: Nemotron
          // often sends a lone "\n" first.
          if (content && content.trim()) {
            firstContent = content;
            break;
          }
        } catch {
          // Malformed frame - skip.
        }
      }
    }

    if (firstContent !== null) {
      // Content path. Build a NEW stream that emits the captured first
      // content, then processes the remaining bytes from the reader.
      const stream = buildContentStream({
        reader,
        decoder,
        buffer,
        prefix: firstContent,
      });
      return { kind: "content", body: stream };
    }
  }

  return emptyReplyError();
}

function emptyReplyError(): RunRoundResult {
  return {
    kind: "error",
    response: NextResponse.json(
      { error: "The assistant returned an empty reply. Please try again." },
      { status: 502 },
    ),
  };
}

/**
 * Build a ReadableStream that emits:
 *   1. The prefix string (the first content delta we already consumed).
 *   2. The remaining content deltas read from `reader`.
 *
 * Reuses the same SSE-frame parser as the original transform.
 */
function buildContentStream(args: {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  decoder: TextDecoder;
  buffer: string;
  prefix: string;
}): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let buffer = args.buffer;
  let emittedPrefix = false;

  return new ReadableStream({
    async start(controller) {
      try {
        if (!emittedPrefix && args.prefix) {
          controller.enqueue(encoder.encode(args.prefix));
          emittedPrefix = true;
        }
        // Drain the buffer we already have.
        const drained = drainContentFrames(buffer);
        for (const t of drained.texts) {
          controller.enqueue(encoder.encode(t));
        }
        if (drained.done) {
          return;
        }
        buffer = drained.remainder;

        // Continue reading.
        while (true) {
          const { value, done } = await args.reader.read();
          if (done) break;
          buffer += args.decoder.decode(value, { stream: true });
          const next = drainContentFrames(buffer);
          for (const t of next.texts) {
            controller.enqueue(encoder.encode(t));
          }
          if (next.done) return;
          buffer = next.remainder;
        }
      } catch (err) {
        console.error("[chat] stream read error:", err);
        controller.error(err);
        return;
      } finally {
        controller.close();
      }
    },
  });
}

/** Returns the text deltas in `buffer`, the remaining unconsumed
 *  buffer text, and whether [DONE] was hit. */
function drainContentFrames(buffer: string): {
  texts: string[];
  remainder: string;
  done: boolean;
} {
  const texts: string[] = [];
  let rest = buffer;
  let sep: number;
  while ((sep = rest.indexOf("\n\n")) !== -1) {
    const frame = rest.slice(0, sep);
    rest = rest.slice(sep + 2);
    for (const line of frame.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") return { texts, remainder: rest, done: true };
      if (!payload) continue;
      try {
        const json = JSON.parse(payload) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const text = json.choices?.[0]?.delta?.content;
        if (text) texts.push(text);
      } catch {
        // skip malformed frame
      }
    }
  }
  return { texts, remainder: rest, done: false };
}

/** Concatenate two Uint8Arrays. */
/** Format Tavily results into a compact text block the LLM can read. */
function formatSearchResults(results: TavilyResult[]): string {
  if (results.length === 0) {
    return "Website search: no matching pages found on the EDUS websites. If the catalog above answers the question, answer from it. Otherwise tell the parent honestly and offer to connect them with the EDUS team via https://edustutor.com/contact.";
  }
  const lines = results.map(
    (r, i) =>
      `${i + 1}. ${r.title}\n   URL: ${r.url}\n   Excerpt: ${r.content.slice(0, 400)}`,
  );
  return [
    `Search results from EDUS websites (${results.length} hit${results.length === 1 ? "" : "s"}):`,
    "",
    ...lines,
    "",
    "Use these results only if they help answer the parent's question, and cite the most relevant URL. Class, fee, tutor and timetable facts always come from the catalog above. If neither answers the question, tell the parent honestly and offer to connect them with the EDUS team.",
  ].join("\n");
}

/** Wrap a ReadableStream<Uint8Array> in a Response with the streaming
 *  headers the browser fetch+ReadableStream loop expects. */
function contentResponse(stream: ReadableStream<Uint8Array>): Response {
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Accel-Buffering": "no",
    },
  });
}

/* --------------------------------------------------------------- */
/* Intake sanitiser - unchanged from prior version                   */
/* --------------------------------------------------------------- */

function sanitiseIntake(input: unknown): IntakePayload | null {
  if (typeof input !== "object" || input === null) return null;
  const i = input as Record<string, unknown>;
  const name = typeof i.name === "string" ? i.name.trim().slice(0, 120) : "";
  const phone = typeof i.phone === "string" ? i.phone.trim().slice(0, 30) : "";
  const country = typeof i.country === "string" ? i.country.trim().slice(0, 60) : "";
  const syllabus = typeof i.syllabus === "string" ? i.syllabus.trim().slice(0, 60) : "";
  const grade = typeof i.grade === "string" ? i.grade.trim().slice(0, 30) : "";
  const medium = typeof i.medium === "string" ? i.medium.trim().slice(0, 30) : "";
  if (!name || !phone || !country || !syllabus || !grade || !medium) return null;
  return { name, phone, country, syllabus, grade, medium };
}

/**
 * Decide whether the latest user turn needs a site search first.
 *
 * Catalog questions (classes / fees / tutors / schedules) are answered
 * from the system prompt, so they skip the search and its 1-2s cost.
 * Anything that LOOKS off-catalog - founder, blog, gallery, press,
 * awards, accreditation, specific URLs - is searched first.
 *
 * A missed keyword just means the bot answers from what it already knows
 * or honestly points to /contact. An extra search costs a second and one
 * Tavily credit. Rule: search only when an off-catalog keyword appears.
 */
function userTurnNeedsSearchTool(text: string): boolean {
  const lower = (text ?? "").toLowerCase().trim();
  if (!lower) return false;

  // Keywords that signal "this is NOT a catalog question".
  // Curated from the chatbot's actual off-catalog use cases.
  const OFF_CATALOG_HINTS = [
    "founder", "ceo", "cto", "sugeevan", "tisankan",
    "blog", "article", "news", "press", "media",
    "gallery", "photo", "video", "youtube",
    "review", "testimonial",
    "accreditation", "certified", "certificate", "license",
    "award", "recogni",
    "partner", "scholarship", "edus aid",
    "contact", "address", "office", "location", "map",
    "career", "job", "vacancy", "hiring", "apply",
    "about us", "story", "history", "vision", "mission",
    "company", "corporate",
    "crunchbase", "linkedin", "facebook", "instagram", "twitter",
    "url", "link",
  ];
  for (const hint of OFF_CATALOG_HINTS) {
    if (lower.includes(hint)) return true;
  }

  // Default: catalog turn - no search needed.
  return false;
}
