"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import type {
  ChatMessage as ChatMessageType,
  LeadPayload,
} from "@/lib/chatbot/types";

/**
 * The chat panel itself - opens above the floating launcher.
 *
 * Layout:
 *   +-----------------------------+
 *   | header (brand + close)      |
 *   +-----------------------------+
 *   |                             |
 *   | scrollable message list     |
 *   |                             |
 *   +-----------------------------+
 *   | input + send                |
 *   +-----------------------------+
 *
 * Conversation lifecycle:
 *   1. Mount: show a single assistant intro message - cheap, no API call.
 *   2. User submits: append user message, set loading, POST history
 *      (excluding the intro since the server adds the system prompt) to
 *      /api/chat. Show typing indicator while waiting.
 *   3. Server responds with assistant content. Scan for the
 *      [[LEAD_CAPTURE]]{...}[[/LEAD_CAPTURE]] marker; if present:
 *        - Strip the marker block from the visible bubble.
 *        - POST the JSON to /api/lead in the background.
 *        - Disable input briefly so the parent doesn't keep typing
 *          while we confirm capture.
 *   4. Errors fall back to a system message + the input stays enabled
 *      so the parent can try again.
 *
 * Why no SSE streaming for v1:
 *   - NIM supports it, but the answer is usually 1-3 short paragraphs,
 *     not a long essay. Full-buffer-then-render is simpler + lighter.
 *   - Streaming adds ~80 LOC of EventSource plumbing for marginal UX
 *     gain on responses that average ~1.5s.
 *   - Can swap to streaming later by changing the API route's
 *     `stream: false` flag + adding a ReadableStream handler here.
 */

type Props = {
  messages: ChatMessageType[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  onClose: () => void;
};

const INTRO_MESSAGE: ChatMessageType = {
  role: "assistant",
  content:
    "Hi! I'm the EDUS admissions assistant. Tell me your child's grade, preferred subject, and medium (Tamil or English), and I'll find a matching live online class from our 2026 timetable. You can write in English or Tamil.",
};

/** Maximum chars per user message. Mirrors the server-side validation. */
const MAX_USER_LEN = 2000;

export function ChatPanel({ messages, setMessages, onClose }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Seed the intro message on first mount. Use a ref guard so React's
  // dev-mode double-invocation doesn't add it twice.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    if (messages.length === 0) {
      setMessages([INTRO_MESSAGE]);
    }
  }, [messages.length, setMessages]);

  // Auto-scroll to bottom on every message addition.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // Focus the input when the panel opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape key closes the panel - matches modal-pattern UX users expect.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_USER_LEN || loading) return;
    setError(null);

    const userMsg: ChatMessageType = { role: "user", content: trimmed };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      // We exclude the intro message from the wire payload - it's
      // a UI affordance, not part of the conversation the model needs
      // to see. The server's system prompt covers the same context.
      const apiPayload = nextHistory.filter(
        (m) => m !== INTRO_MESSAGE && m.role !== "system",
      );

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
      });

      if (res.status === 429) {
        const json = await res.json().catch(() => ({}));
        const seconds = json?.retryAfterSeconds ?? 60;
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Slow down a moment - try again in about ${seconds} seconds.`,
          },
        ]);
        return;
      }

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const reason =
          typeof json?.error === "string"
            ? json.error
            : "Something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev,
          { role: "system", content: reason },
        ]);
        return;
      }

      const json = (await res.json()) as { message?: string };
      const raw = (json.message ?? "").trim();
      if (!raw) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "I didn't catch that. Could you rephrase what you're looking for?",
          },
        ]);
        return;
      }

      // Scan for a lead-capture block. If found, strip it from the
      // visible bubble and POST the JSON to /api/lead.
      const leadResult = extractLeadCapture(raw);
      const visible = leadResult.cleaned.trim() || raw;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: visible },
      ]);

      if (leadResult.lead) {
        // Fire-and-forget. The /api/lead route never returns 5xx to
        // the parent - it logs failures and acknowledges. So we don't
        // need error handling here that would surface to the UI.
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadResult.lead),
        }).catch((err) => console.warn("[chatbot] /api/lead failed:", err));
      }
    } catch (err) {
      console.error("[chatbot] /api/chat error:", err);
      setError("Network hiccup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter inserts a newline.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div
      role="dialog"
      aria-label="EDUS admissions chat"
      className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-[400px] h-[min(620px,calc(100vh-2.5rem))] flex flex-col rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(16,32,51,0.4)] border border-[rgba(16,32,51,0.08)] overflow-hidden"
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="inline-flex w-8 h-8 rounded-full items-center justify-center bg-white/15 backdrop-blur shrink-0"
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="font-display font-700 text-[14px] leading-tight">
              EDUS admissions
            </p>
            <p className="text-[11px] text-white/85 leading-tight">
              Live online classes - Sri Lanka
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="inline-flex w-8 h-8 rounded-full items-center justify-center hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* Message list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FBFF]"
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {loading ? (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm border border-[rgba(16,32,51,0.08)] px-4 py-2.5 shadow-[0_6px_18px_-10px_rgba(16,32,51,0.18)] flex items-center gap-1.5">
              <Dot delay="0s" />
              <Dot delay="0.15s" />
              <Dot delay="0.3s" />
            </div>
          </div>
        ) : null}
      </div>

      {/* Input */}
      <div className="border-t border-[rgba(16,32,51,0.08)] bg-white px-3 py-3">
        {error ? (
          <p className="text-[11.5px] text-[#DC2626] px-1 pb-1.5">{error}</p>
        ) : null}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_USER_LEN))}
            onKeyDown={onKeyDown}
            disabled={loading}
            placeholder="Ask about a class, tutor, or schedule..."
            rows={1}
            aria-label="Type your message"
            className="flex-1 resize-none rounded-xl border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] leading-[1.55] focus:outline-none focus:border-[#2563EB] focus:bg-white transition placeholder:text-[#5A6A82] disabled:opacity-60 max-h-32"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="text-[10.5px] text-[#5A6A82] mt-2 px-1">
          AI assistant. Confirms details with the EDUS team before enrolment.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Typing dot - tiny presentational helper                          */
/* --------------------------------------------------------------- */
function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden
      className="inline-block w-1.5 h-1.5 rounded-full bg-[#2563EB]/60"
      style={{
        animation: "edus-chat-bounce 1.2s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <style>{`
        @keyframes edus-chat-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </span>
  );
}

/* --------------------------------------------------------------- */
/* Lead capture extractor                                            */
/* --------------------------------------------------------------- */

/**
 * Parse the LLM reply for a lead-capture block. The system prompt
 * instructs the model to emit:
 *
 *   [[LEAD_CAPTURE]]
 *   { ...json... }
 *   [[/LEAD_CAPTURE]]
 *
 * Returns the validated lead object (or null if parsing failed) and
 * the cleaned reply with the block stripped out for display.
 *
 * Strict-ish parsing: we only accept the exact marker shape, and we
 * silently drop the block if the JSON inside is malformed. Better to
 * surface the reply without the lead than to forward garbage to the
 * EDUS team.
 */
function extractLeadCapture(raw: string): {
  cleaned: string;
  lead: LeadPayload | null;
} {
  const marker = /\[\[LEAD_CAPTURE\]\]\s*([\s\S]*?)\s*\[\[\/LEAD_CAPTURE\]\]/;
  const match = raw.match(marker);
  if (!match) return { cleaned: raw, lead: null };

  const cleaned = raw.replace(marker, "").trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[1]);
  } catch {
    return { cleaned, lead: null };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { cleaned, lead: null };
  }
  const p = parsed as Record<string, unknown>;

  // Minimum required fields. Anything less is junk - drop silently.
  if (
    typeof p.name !== "string" ||
    typeof p.phone !== "string" ||
    typeof p.country !== "string" ||
    typeof p.grade !== "string" ||
    typeof p.medium !== "string" ||
    typeof p.subject !== "string"
  ) {
    return { cleaned, lead: null };
  }

  const lead: LeadPayload = {
    name: p.name,
    phone: p.phone,
    country: p.country,
    grade: p.grade,
    medium: p.medium,
    subject: p.subject,
    ...(typeof p.notes === "string" && p.notes ? { notes: p.notes } : {}),
    ...(typeof p.recommendedClassCode === "string" && p.recommendedClassCode
      ? { recommendedClassCode: p.recommendedClassCode }
      : {}),
  };
  return { cleaned, lead };
}
