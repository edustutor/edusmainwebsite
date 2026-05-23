"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { IntakeForm } from "./IntakeForm";
import type {
  ChatMessage as ChatMessageType,
  IntakePayload,
  LeadPayload,
} from "@/lib/chatbot/types";

/**
 * The chat panel - opens above the floating launcher.
 *
 * Two phases:
 *   1. INTAKE phase (intake == null):
 *      Render <IntakeForm/>. Once submitted, store the intake in state.
 *      The first chat message fires automatically with a personalised
 *      bot greeting that already knows name + grade + medium.
 *   2. CONVERSATION phase (intake != null):
 *      Render header + scrollable message list + input. Every
 *      /api/chat call carries the intake payload so the system prompt
 *      can suppress the "what's your name / what grade" loop.
 *
 * Lead capture:
 *   - The system prompt now asks the LLM to emit ONLY the conversation
 *     extras (subject, recommendedClassCode, notes) in the
 *     [[LEAD_CAPTURE]] block.
 *   - The frontend MERGES that with the intake we already have to
 *     build the full LeadPayload, then POSTs to /api/lead.
 *   - That means the LLM cannot fabricate phone numbers or names -
 *     the client controls those fields, the LLM only contributes the
 *     subject + class match + free-text notes.
 */

type Props = {
  messages: ChatMessageType[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  intake: IntakePayload | null;
  setIntake: React.Dispatch<React.SetStateAction<IntakePayload | null>>;
  onClose: () => void;
};

/** Maximum chars per user message. Mirrors the server-side validation. */
const MAX_USER_LEN = 2000;

export function ChatPanel({
  messages,
  setMessages,
  intake,
  setIntake,
  onClose,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to bottom on every message addition.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // Focus the input when conversation phase begins.
  useEffect(() => {
    if (intake) inputRef.current?.focus();
  }, [intake]);

  // Escape closes the panel - matches modal-pattern UX users expect.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /**
   * Generic POST to /api/chat. Used both for the initial greeting (when
   * intake is submitted) and for every subsequent user message.
   *
   * `userText` is the latest user message to append. Pass null to send
   * just the existing history (e.g. when bootstrapping the greeting
   * after intake submission - no user turn yet, the server's system
   * prompt opens the conversation).
   */
  const callChat = async (
    userText: string | null,
    currentIntake: IntakePayload,
  ) => {
    setError(null);

    let nextHistory: ChatMessageType[];
    if (userText) {
      const userMsg: ChatMessageType = { role: "user", content: userText };
      nextHistory = [...messages, userMsg];
      setMessages(nextHistory);
    } else {
      nextHistory = messages;
    }
    setLoading(true);

    try {
      const apiPayload = nextHistory.filter((m) => m.role !== "system");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiPayload,
          intake: currentIntake,
        }),
      });

      if (res.status === 429) {
        const json = await res.json().catch(() => ({}));
        const seconds = (json as { retryAfterSeconds?: number })
          ?.retryAfterSeconds ?? 60;
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
          typeof (json as { error?: unknown })?.error === "string"
            ? ((json as { error: string }).error)
            : "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { role: "system", content: reason }]);
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

      // Scan for the LEAD_CAPTURE block. Strip it from the visible
      // bubble and (if valid) merge with intake + POST to /api/lead.
      const leadResult = extractLeadCapture(raw);
      const visible = leadResult.cleaned.trim() || raw;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: visible },
      ]);

      if (leadResult.extras) {
        const fullLead: LeadPayload = {
          name: currentIntake.name,
          phone: currentIntake.phone,
          country: currentIntake.country,
          syllabus: currentIntake.syllabus,
          grade: currentIntake.grade,
          medium: currentIntake.medium,
          ...(leadResult.extras.subject
            ? { subject: leadResult.extras.subject }
            : {}),
          ...(leadResult.extras.recommendedClassCode
            ? { recommendedClassCode: leadResult.extras.recommendedClassCode }
            : {}),
          ...(leadResult.extras.notes
            ? { notes: leadResult.extras.notes }
            : {}),
        };

        // Verbose client-side logging so dev tools clearly show the
        // captured lead before it leaves the browser. The server route
        // does the same on the receiving end.
        // eslint-disable-next-line no-console
        console.log(
          "%c[EDUS chatbot] lead captured -> POST /api/lead",
          "color:#2563EB;font-weight:700",
          fullLead,
        );

        // Fire-and-forget. /api/lead never returns 5xx, so we don't
        // need error handling that would surface to the parent.
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullLead),
        }).catch((err) =>
          // eslint-disable-next-line no-console
          console.warn("[EDUS chatbot] /api/lead network failure:", err),
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[EDUS chatbot] /api/chat error:", err);
      setError("Network hiccup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Intake form submission handler. Stores the intake and immediately
   * fires the first /api/chat call so the bot opens the conversation
   * with a personalised greeting. No "Press enter to start" friction.
   */
  const handleIntakeSubmit = (next: IntakePayload) => {
    setIntake(next);
    // Seed an opening user-style message that prompts the LLM to greet.
    // The LLM has the full intake in its system prompt context, so
    // it'll greet the parent by name + acknowledge the grade + ask the
    // single best clarifying question.
    void callChat("Hi! I've shared my details above. Can you help?", next);
  };

  const send = () => {
    if (!intake) return; // form should be showing instead
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_USER_LEN || loading) return;
    setInput("");
    void callChat(trimmed, intake);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
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

      {/* Phase 1: intake form. Phase 2: message list + input. */}
      {intake ? (
        <>
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

          <div className="border-t border-[rgba(16,32,51,0.08)] bg-white px-3 py-3">
            {error ? (
              <p className="text-[11.5px] text-[#DC2626] px-1 pb-1.5">
                {error}
              </p>
            ) : null}
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) =>
                  setInput(e.target.value.slice(0, MAX_USER_LEN))
                }
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder="Ask about a class, tutor, or schedule..."
                rows={1}
                aria-label="Type your message"
                className="flex-1 resize-none rounded-xl border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] leading-[1.55] focus:outline-none focus:border-[#2563EB] focus:bg-white transition placeholder:text-[#5A6A82] disabled:opacity-60 max-h-32"
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45"
                style={{
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
                }}
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
        </>
      ) : (
        <IntakeForm onSubmit={handleIntakeSubmit} />
      )}
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
 * Parse the LLM reply for the conversation-level lead extras:
 *
 *   [[LEAD_CAPTURE]]
 *   {"subject":"...","recommendedClassCode":"...","notes":"..."}
 *   [[/LEAD_CAPTURE]]
 *
 * The intake fields (name, phone, country, syllabus, grade, medium) are
 * NOT in this block - they live in component state from the IntakeForm.
 * The frontend merges them with these extras before POSTing the lead.
 *
 * Returns the cleaned reply (block stripped) + the extras (or null if
 * the block was absent / malformed).
 */
function extractLeadCapture(raw: string): {
  cleaned: string;
  extras: {
    subject?: string;
    recommendedClassCode?: string;
    notes?: string;
  } | null;
} {
  const marker = /\[\[LEAD_CAPTURE\]\]\s*([\s\S]*?)\s*\[\[\/LEAD_CAPTURE\]\]/;
  const match = raw.match(marker);
  if (!match) return { cleaned: raw, extras: null };

  const cleaned = raw.replace(marker, "").trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[1]);
  } catch {
    return { cleaned, extras: null };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { cleaned, extras: null };
  }
  const p = parsed as Record<string, unknown>;

  const extras: {
    subject?: string;
    recommendedClassCode?: string;
    notes?: string;
  } = {};
  if (typeof p.subject === "string" && p.subject.trim()) {
    extras.subject = p.subject.trim().slice(0, 60);
  }
  if (
    typeof p.recommendedClassCode === "string" &&
    p.recommendedClassCode.trim()
  ) {
    extras.recommendedClassCode = p.recommendedClassCode.trim().slice(0, 40);
  }
  if (typeof p.notes === "string" && p.notes.trim()) {
    extras.notes = p.notes.trim().slice(0, 2000);
  }
  // Even an empty extras object is meaningful - it signals "the bot
  // thinks we have a match, please capture the lead even if no extra
  // detail was attached."
  return { cleaned, extras };
}
