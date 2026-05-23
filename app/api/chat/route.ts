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
 * STREAMING + TOOL USE:
 *   The model has access to a `search_edustutor` tool implemented by
 *   lib/chatbot/tavily.ts. Tavily restricts hits to EDUS apex domains.
 *
 *   Per-round flow:
 *     1. Open SSE stream to NIM with tools=[search_edustutor].
 *     2. Read SSE deltas as they arrive.
 *     3. If the first deltas describe a TOOL CALL, accumulate the
 *        tool_calls.function.arguments JSON across deltas, close the
 *        stream once we have a complete call, run Tavily, append the
 *        tool result to the conversation, then call NIM AGAIN with
 *        tools omitted - this second call streams plain content to
 *        the browser.
 *     4. If the deltas describe CONTENT instead, pipe them straight
 *        to the browser as plain text - same path as the no-tool case.
 *
 *   We cap tool calls at 1 per chat turn. Two reasons: (a) prevents
 *   runaway recursion, (b) Tavily free-tier quota is finite. If the
 *   model wants to search again, it must wait for the next user turn.
 *
 *   Why not interleave content + tool calls? Llama 3.3 emits one or
 *   the other per response, not both. Streaming-mid-tool-call is
 *   possible in theory but adds 100+ LOC of partial-content buffering
 *   for marginal UX gain - we'd save maybe 200ms on the rare
 *   acknowledgement token before the tool call.
 *
 * NVIDIA NIM uses an OpenAI-compatible chat completions API.
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
 */
const rateLimitStore = new Map<string, number[]>();

/* --------------------------------------------------------------- */
/* Tool definition for NIM. OpenAI-style function-calling schema.   */
/* --------------------------------------------------------------- */

/**
 * The single tool we expose to the model. Tavily-backed, scoped to
 * EDUS apex domains via the server-side helper. Description copy is
 * tuned to make the model use it ONLY when the catalog can't answer.
 */
const TOOLS = [
  {
    type: "function",
    function: {
      name: "search_edustutor",
      description:
        "Search the EDUS websites (edustutor.com, edus.lk, edus.edu.lk) for live content beyond the class catalog already in the system prompt. Use this ONLY when the parent asks about something not in the catalog: blog posts, gallery albums, accreditations, the founder, press coverage, partner organisations, recent news, the contact page, the press kit, or any specific URL on the EDUS sites. Do NOT use this for class recommendations, fees, tutors, or timetables - those facts live in the catalog already.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Short focused search query in English. 3-10 words. Examples: 'Grade 5 scholarship blog post', 'National ICT Award 2024 EDUS', 'EDUS founder Sugeevan'.",
          },
        },
        required: ["query"],
      },
    },
  },
];

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
  const systemPrompt = buildSystemPrompt(
    catalog.classes,
    catalog.tutors,
    intake,
  );

  // 4. Open the first NIM round WITH tools enabled. NimMessage is the
  // OpenAI-compatible message shape - it supports the tool roles we
  // need beyond the user/assistant pair the client speaks.
  const conversation: NimMessage[] = [
    { role: "system", content: systemPrompt },
    ...(clientMessages ?? []).map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  // SPEED OPTIMISATION (locked 2026-05-23):
  // Most user turns are catalog questions ("class details for grade 6",
  // "show me maths tutors", "fees for grade 8 science"). For those we
  // KNOW the answer is in the system prompt and the search tool is
  // irrelevant. Skip the tool wiring on those turns to save NIM's
  // "should I call a tool?" deliberation latency (~300-500ms of
  // first-token delay per round). The bot still has tools available on
  // off-catalog turns (founder bio, blog posts, gallery, etc).
  const latestUser = [...(clientMessages ?? [])]
    .reverse()
    .find((m) => m.role === "user");
  const needsTools = userTurnNeedsSearchTool(latestUser?.content ?? "");

  const round1 = await runRound({
    apiKey,
    model,
    messages: conversation,
    tools: needsTools ? TOOLS : undefined,
  });

  // 5a. If round 1 returned a content stream (no tool call), pipe it
  // straight to the browser. This is the common path.
  if (round1.kind === "content") {
    return contentResponse(round1.body);
  }

  // 5b. If round 1 returned an error, surface it.
  if (round1.kind === "error") {
    return round1.response;
  }

  // 5c. The model called the search tool. Execute it, append the
  // result + the model's tool call to the conversation, then run a
  // second NIM round WITHOUT tools so the model produces a normal
  // streamed reply incorporating the search results.
  const toolCall = round1.toolCall;
  console.log(
    "[chat] tool call:",
    toolCall.name,
    "args:",
    JSON.stringify(toolCall.args).slice(0, 200),
  );

  let toolResult: TavilyResult[] = [];
  if (toolCall.name === "search_edustutor") {
    const q = typeof toolCall.args.query === "string" ? toolCall.args.query : "";
    toolResult = await searchEdus(q);
    console.log(
      `[chat] tavily returned ${toolResult.length} result(s) for query: ${q}`,
    );
  } else {
    console.warn("[chat] unknown tool requested:", toolCall.name);
  }

  // Append the assistant's tool-call turn + the tool result to the
  // conversation. The OpenAI spec requires the assistant turn to carry
  // the tool_calls array and the tool turn to reference the same id.
  const toolCallId = toolCall.id || `call_${Date.now()}`;
  conversation.push({
    role: "assistant",
    content: "",
    tool_calls: [
      {
        id: toolCallId,
        type: "function",
        function: {
          name: toolCall.name,
          arguments: JSON.stringify(toolCall.args),
        },
      },
    ],
  });
  conversation.push({
    role: "tool",
    tool_call_id: toolCallId,
    content: formatSearchResults(toolResult),
  });

  // Round 2: NO tools (so the model can't loop) + streaming so the
  // parent gets the same fast feel as a non-tool answer.
  const round2 = await runRound({
    apiKey,
    model,
    messages: conversation,
    tools: undefined, // disable tools - prevents recursion + saves quota
  });

  if (round2.kind === "content") {
    return contentResponse(round2.body);
  }
  if (round2.kind === "error") {
    return round2.response;
  }
  // Round 2 should never return a tool call (tools disabled). Treat
  // as upstream confusion if it does.
  console.error("[chat] unexpected tool call on round 2");
  return NextResponse.json(
    { error: "The assistant is temporarily unavailable. Please try again." },
    { status: 502 },
  );
}

/* --------------------------------------------------------------- */
/* NIM round - one chat completion call, streaming                  */
/* --------------------------------------------------------------- */

/**
 * OpenAI-compatible chat message - includes the tool variants the
 * client doesn't speak (we add them server-side during tool flow).
 */
type NimMessage =
  | { role: "system" | "user"; content: string }
  | {
      role: "assistant";
      content: string;
      tool_calls?: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    }
  | { role: "tool"; tool_call_id: string; content: string };

type RunRoundArgs = {
  apiKey: string;
  model: string;
  messages: NimMessage[];
  tools: typeof TOOLS | undefined;
};

type RunRoundResult =
  | { kind: "content"; body: ReadableStream<Uint8Array> }
  | {
      kind: "tool";
      toolCall: { id: string; name: string; args: Record<string, unknown> };
    }
  | { kind: "error"; response: Response };

/**
 * Open a NIM streaming chat completion. Reads the SSE stream just long
 * enough to determine whether the first delta is content or a tool
 * call, then either:
 *   - "content": returns the FULL stream wrapped to emit plain text
 *     (the remaining content tokens flow through to the browser).
 *   - "tool": cancels the SSE stream and returns the parsed tool call.
 *   - "error": returns a 502 Response to surface to the caller.
 *
 * We CANNOT split the stream into "what we already read" + "rest" with
 * a single pipe. Instead, on content we re-emit the buffered first
 * content token then continue from the reader. The transform stream
 * below handles that initial-token replay.
 */
async function runRound(args: RunRoundArgs): Promise<RunRoundResult> {
  const { apiKey, model, messages, tools } = args;

  const payload: Record<string, unknown> = {
    model,
    messages,
    temperature: 0.3,
    top_p: 0.9,
    // 500 tokens (~375 words) is enough for the longest realistic reply
    // (all-classes proforma listing with 6-8 cards + admission line +
    // enrolment options). Was 800 - dropped to cut tail latency, since
    // Llama 3.3 70B's streaming throughput is ~30 tok/s so 300 fewer
    // tokens saves ~10s on the longest replies.
    max_tokens: 500,
    stream: true,
  };
  if (tools) {
    payload.tools = tools;
    payload.tool_choice = "auto";
  }

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
 *   - The first content delta -> stream the rest as plain text.
 *   - A complete tool call (one or more deltas assembling function.name
 *     and function.arguments JSON) -> cancel the stream, return the
 *     parsed tool call.
 *   - [DONE] with no content + no tool call -> error.
 *
 * This is the trickiest bit. NIM emits tool calls as multiple deltas
 * because the function arguments JSON streams in chunks. We assemble
 * them across deltas and complete the call when finish_reason is
 * "tool_calls" or "stop".
 */
async function classifyAndStream(
  upstream: ReadableStream<Uint8Array>,
): Promise<RunRoundResult> {
  const decoder = new TextDecoder("utf-8");
  const reader = upstream.getReader();

  let buffer = "";
  // Tool call accumulators (per OpenAI streaming spec).
  let toolId = "";
  let toolName = "";
  let toolArgs = "";
  let firstContent: string | null = null;
  let pendingBytes: Uint8Array | null = null; // bytes after first content delta - we'll replay them

  // Process bytes until we've classified.
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) pendingBytes = pendingBytes ? concat(pendingBytes, value) : value;
    buffer += decoder.decode(value, { stream: true });

    // Process every complete SSE frame in the buffer. A frame ends
    // with the SSE-standard blank line "\n\n".
    let sep: number;
    let classified = false;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);

      for (const line of frame.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") {
          // Stream ended without content - if we have an accumulated
          // tool call, complete it. Otherwise error.
          if (toolName) {
            return finishToolCall(toolId, toolName, toolArgs);
          }
          return {
            kind: "error",
            response: NextResponse.json(
              { error: "The assistant returned an empty reply. Please try again." },
              { status: 502 },
            ),
          };
        }
        try {
          const json = JSON.parse(payload) as {
            choices?: Array<{
              delta?: {
                content?: string;
                tool_calls?: Array<{
                  index?: number;
                  id?: string;
                  type?: string;
                  function?: { name?: string; arguments?: string };
                }>;
              };
              finish_reason?: string | null;
            }>;
          };
          const delta = json.choices?.[0]?.delta;
          const finish = json.choices?.[0]?.finish_reason;

          // Accumulate any tool_call deltas.
          if (delta?.tool_calls) {
            for (const tc of delta.tool_calls) {
              if (tc.id) toolId = tc.id;
              if (tc.function?.name) toolName = tc.function.name;
              if (tc.function?.arguments) toolArgs += tc.function.arguments;
            }
          }

          // First content delta = we know it's a content reply.
          if (delta?.content && firstContent === null) {
            firstContent = delta.content;
            classified = true;
            break;
          }

          // finish_reason "tool_calls" with name = call complete.
          if (finish === "tool_calls" && toolName) {
            return finishToolCall(toolId, toolName, toolArgs);
          }
        } catch {
          // Malformed frame - skip.
        }
      }
      if (classified) break;
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

  // Reader closed without classification - treat as error.
  if (toolName) {
    return finishToolCall(toolId, toolName, toolArgs);
  }
  return {
    kind: "error",
    response: NextResponse.json(
      { error: "The assistant returned an empty reply. Please try again." },
      { status: 502 },
    ),
  };
}

/**
 * Build the result for a completed tool call. Parses the accumulated
 * arguments JSON; if parsing fails we treat it as an empty object so
 * the tool can still run (Tavily will get an empty query and return []).
 */
function finishToolCall(
  id: string,
  name: string,
  argsRaw: string,
): RunRoundResult {
  let args: Record<string, unknown> = {};
  try {
    args = JSON.parse(argsRaw || "{}") as Record<string, unknown>;
  } catch {
    console.warn(
      "[chat] tool args JSON parse failed:",
      argsRaw.slice(0, 200),
    );
  }
  return { kind: "tool", toolCall: { id, name, args } };
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
function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

/** Format Tavily results into a compact text block the LLM can read. */
function formatSearchResults(results: TavilyResult[]): string {
  if (results.length === 0) {
    return "No matching pages found on the EDUS websites. Tell the parent we couldn't find a matching page and offer to connect them with the EDUS team via https://edustutor.com/contact.";
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
    "Use these results to answer the parent's question. Cite the most relevant URL in your reply. If none of these answer the question, tell the parent honestly and offer to connect them with the EDUS team.",
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
 * Decide whether the latest user turn likely needs the search tool.
 *
 * Speed optimisation: when the user is clearly asking about catalog
 * content (classes / fees / tutors / schedules) we skip wiring tools
 * into round 1, saving NIM's "should I call a tool?" deliberation
 * latency. Tools stay enabled for anything that LOOKS like an
 * off-catalog topic - founder, blog, gallery, press, accreditation,
 * specific URLs etc.
 *
 * False positives (turning tools off when they were needed) just mean
 * the bot answers from the catalog or honestly says "I'm not sure,
 * try /contact" - no crash, no wrong answer.
 * False negatives (turning tools on when they weren't needed) cost
 * ~300-500ms of latency - the current bug we're trying to remove.
 *
 * Rule: tools ON only when the message contains an off-catalog signal
 * keyword. Otherwise tools OFF.
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

  // Default: catalog turn - skip tools for speed.
  return false;
}
