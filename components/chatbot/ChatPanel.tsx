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
  /**
   * Why the panel opened.
   *   - "manual": user clicked the launcher. Show the intake form directly.
   *   - "auto":   the 30s timer fired. Show a "Would you like to join
   *               EDUS Online classes?" Yes/No prompt FIRST, only reveal
   *               the intake form once the parent clicks Yes. This makes
   *               the unprompted popup feel like a polite ask rather than
   *               a demanded form.
   */
  openMode: "auto" | "manual";
};

/** Maximum chars per user message. Mirrors the server-side validation. */
const MAX_USER_LEN = 2000;

/**
 * Idle-nudge timing. When the bot finishes a reply and the parent goes
 * silent for this long, fire ONE follow-up nudge so we keep the
 * conversation alive (sales-driven follow-up behaviour).
 *
 * 45 seconds is the sweet spot: short enough that parents who got
 * distracted come back to a fresh prompt, long enough that we don't
 * interrupt a parent who is still typing a long question. We cap total
 * nudges per session at MAX_NUDGES so the bot never feels spammy.
 */
const IDLE_NUDGE_MS = 45_000;
const MAX_NUDGES = 2;

/**
 * Synthetic user message that triggers the nudge round. The bot sees
 * this content in the chat history; the system prompt tells it how to
 * respond (warm gentle follow-up, vary the angle, never repeat).
 *
 * IMPORTANT: this string is stripped from the visible UI so the parent
 * never sees the placeholder. The LLM uses it purely as a signal.
 */
const IDLE_NUDGE_PROMPT =
  "[user went idle - send one short gentle follow-up nudge to re-engage them]";

export function ChatPanel({
  messages,
  setMessages,
  intake,
  setIntake,
  onClose,
  openMode,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Idle-nudge bookkeeping. Both refs (not state) because they don't
  // need to trigger re-renders - the timer is a fire-and-forget side
  // effect, the counter only gates whether we schedule another one.
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeCountRef = useRef(0);

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

  // Clear any pending idle-nudge timer on unmount so we don't fire
  // after the parent has navigated away or closed the panel.
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  /**
   * Cancel any pending idle-nudge timer. Called whenever the parent
   * shows activity (typing, sending, opening/closing the panel) so we
   * never fire a nudge while they're actively engaged.
   */
  const cancelIdleNudge = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  /**
   * Schedule the next idle-nudge round.
   *
   * Called after a bot reply finishes. If the parent doesn't type or
   * send anything within IDLE_NUDGE_MS, fire ONE synthetic nudge round
   * to the LLM so the bot says something warm and re-engaging.
   *
   * Capped at MAX_NUDGES per conversation - after that we go silent and
   * let the parent restart the conversation on their own terms.
   */
  const scheduleIdleNudge = (currentIntake: IntakePayload) => {
    cancelIdleNudge();
    if (nudgeCountRef.current >= MAX_NUDGES) return;
    idleTimerRef.current = setTimeout(() => {
      nudgeCountRef.current += 1;
      void callChat(IDLE_NUDGE_PROMPT, currentIntake, { hideUserBubble: true });
    }, IDLE_NUDGE_MS);
  };

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
    opts: { hideUserBubble?: boolean } = {},
  ) => {
    // Any chat call cancels the previous idle timer - whether the call
    // is parent-initiated (they're back, no nudge needed) or system-
    // initiated (the nudge itself fired, don't stack a second one).
    cancelIdleNudge();
    setError(null);

    let nextHistory: ChatMessageType[];
    if (userText) {
      // hideUserBubble=true means this is a synthetic system message
      // (e.g. the idle nudge prompt). We still send it to the LLM so the
      // model knows what to respond to, but we don't render it as a
      // user bubble in the visible chat thread.
      const userMsg: ChatMessageType = { role: "user", content: userText };
      nextHistory = [...messages, userMsg];
      if (opts.hideUserBubble) {
        // Send to API but keep the visible UI state unchanged.
        // (We pass nextHistory to fetch but skip the setMessages call.)
      } else {
        setMessages(nextHistory);
      }
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
        // Error path: server returns application/json with { error }.
        const json = await res.json().catch(() => ({}));
        const reason =
          typeof (json as { error?: unknown })?.error === "string"
            ? ((json as { error: string }).error)
            : "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { role: "system", content: reason }]);
        return;
      }

      // Streaming path. The server returns text/plain (chunked) -
      // each chunk is raw token text from NIM. We append each chunk
      // to a single assistant message bubble so the user sees the
      // reply materialise instead of staring at a typing indicator.
      if (!res.body) {
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

      // Insert an empty assistant message that we'll mutate in place
      // as chunks arrive. Capture its index so subsequent updates
      // target this exact bubble (history may grow if the user
      // somehow triggers another action mid-stream).
      let assistantIndex = -1;
      setMessages((prev) => {
        assistantIndex = prev.length;
        return [...prev, { role: "assistant", content: "" }];
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      // First-token latency is what determines "fast feels". Once we
      // get the first chunk, drop the typing indicator immediately -
      // the text itself is the indicator now.
      let gotFirstToken = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        accumulated += chunk;
        if (!gotFirstToken) {
          gotFirstToken = true;
          setLoading(false); // hide typing indicator the moment text starts
        }
        // While streaming, hide any partial [[LEAD_CAPTURE]] marker
        // from the visible bubble. If the marker is mid-emission we'd
        // see ugly raw JSON for half a second. The maskLeadMarker
        // helper trims everything from "[[" onwards if it might be
        // the start of a marker.
        const visibleSoFar = maskLeadMarker(accumulated);
        setMessages((prev) => {
          const next = [...prev];
          if (assistantIndex >= 0 && next[assistantIndex]) {
            next[assistantIndex] = {
              role: "assistant",
              content: visibleSoFar,
            };
          }
          return next;
        });
      }

      // Stream finished. accumulated holds the full raw reply.
      const raw = accumulated.trim();
      if (!raw) {
        setMessages((prev) => {
          const next = [...prev];
          if (assistantIndex >= 0 && next[assistantIndex]) {
            // Replace the empty assistant bubble with a fallback.
            next[assistantIndex] = {
              role: "system",
              content:
                "I didn't catch that. Could you rephrase what you're looking for?",
            };
          }
          return next;
        });
        return;
      }

      // Run the final lead-capture extraction on the complete reply.
      // Update the assistant bubble to its cleaned form.
      const leadResult = extractLeadCapture(raw);
      const visible = leadResult.cleaned.trim() || raw;
      setMessages((prev) => {
        const next = [...prev];
        if (assistantIndex >= 0 && next[assistantIndex]) {
          next[assistantIndex] = { role: "assistant", content: visible };
        }
        return next;
      });

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
      // After the reply lands, arm the next idle-nudge window. If the
      // parent types or sends, cancelIdleNudge() fires from those
      // handlers and the timer never gets to ring.
      scheduleIdleNudge(currentIntake);
    }
  };

  /**
   * Intake form submission handler. Stores the intake, fires the FIRST
   * lead capture to the CRM (so EDUS sees every visitor who completes
   * the form, even if they bounce before the bot recommends a class),
   * and kicks off the chat with a personalised greeting.
   *
   * The lead is sent TWICE during a successful conversation:
   *   1. Here on intake submit  -> stage=intake (name + phone + country +
   *                                syllabus + grade + medium). Lands in
   *                                CRM as soon as Start chat is clicked.
   *   2. After bot recommendation -> stage=qualified (same fields PLUS
   *                                subject + recommendedClassCode +
   *                                notes from the chat). Lands later in
   *                                the same /api/lead handler. The CRM
   *                                team sees it as a follow-up enrichment
   *                                on the original lead in their
   *                                dashboard (Perfex de-dupes on phone).
   *
   * Why fire on intake instead of waiting for a class recommendation?
   *   - Parents often complete the form, get distracted, and never
   *     finish the conversation. Without the early POST those leads
   *     would be lost to the CRM entirely.
   *   - The chat flow keeps working exactly the same on top - the
   *     second POST happens inside the streaming reply handler.
   */
  const handleIntakeSubmit = (next: IntakePayload) => {
    setIntake(next);
    // Fire-and-forget the intake lead. We do this BEFORE kicking off
    // the chat so the CRM call goes out even if the chat fails (slow
    // network, NIM rate limit, etc.). Server-side /api/lead never
    // returns 5xx so we don't surface errors to the parent.
    const intakeLead: LeadPayload = {
      name: next.name,
      phone: next.phone,
      country: next.country,
      syllabus: next.syllabus,
      grade: next.grade,
      medium: next.medium,
    };
    // eslint-disable-next-line no-console
    console.log(
      "%c[EDUS chatbot] intake lead -> POST /api/lead",
      "color:#2563EB;font-weight:700",
      intakeLead,
    );
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(intakeLead),
    }).catch((err) =>
      // eslint-disable-next-line no-console
      console.warn("[EDUS chatbot] /api/lead intake POST failure:", err),
    );

    // Render a clean system "intake summary" card at the top of the
    // chat so the parent immediately sees what they shared. This
    // replaces the previous "Hi! I've shared my details above" user
    // bubble that was confusing - it looked like the parent typed it.
    const summaryLines = [
      `📋 Details shared with EDUS:`,
      `• Name: ${next.name}`,
      `• Country: ${next.country}`,
      `• Phone: +${next.phone}`,
      `• Grade: ${next.grade}`,
      `• Medium: ${next.medium}`,
      `• Syllabus: ${next.syllabus}`,
    ].join("\n");
    setMessages([{ role: "system", content: summaryLines }]);

    // Seed an opening signal to the LLM so it greets the parent. The
    // LLM has the full intake in its system prompt context, so it'll
    // greet by name + acknowledge the grade + ask the single best
    // clarifying question. hideUserBubble:true keeps the synthetic
    // signal OUT of the visible chat - the parent never sees the
    // placeholder text.
    void callChat(
      "Hi! I've shared my details above. Can you help?",
      next,
      { hideUserBubble: true },
    );
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
      aria-label="EDUS AI Assistant chat"
      className={[
        // z-[80] keeps the panel above the cookie consent banner
        // (banner z-[70], modal backdrop z-[60] in ConsentBanner).
        // Otherwise the cookie toast covers the panel header on first
        // visit and the parent can't interact with chat.
        "fixed z-[80] flex flex-col bg-white overflow-hidden",
        // Position + size strategy:
        //   - <sm (mobile): bottom-4 right-4 left-4 with a small top
        //     gap so the panel feels like a real sheet, not a fullscreen
        //     takeover. The width auto-fills between the two side gutters.
        //   - sm+ (tablet, desktop): bottom-5 right-5 anchored to the
        //     bottom-right with a fixed max width (the prior layout).
        "right-4 bottom-4 left-4 sm:left-auto sm:right-5 sm:bottom-5",
        // Height respects iOS safe-area + viewport vs. the design max.
        // 88vh on phones leaves a small breathing area at the top so
        // the user can dismiss by tapping outside.
        "h-[min(88vh,640px)] sm:h-[min(620px,calc(100vh-2.5rem))]",
        // Width: auto-fill on mobile, capped on tablet+.
        "sm:w-[calc(100vw-2.5rem)] sm:max-w-[400px]",
        "rounded-2xl border border-[rgba(16,32,51,0.08)]",
        "shadow-[0_30px_60px_-20px_rgba(16,32,51,0.4)]",
      ].join(" ")}
      style={{
        // Push the panel up by the iOS home-indicator height so the
        // input area isn't covered by the system gesture bar.
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Header.
          Layout mirrors WhatsApp / Messenger conventions parents already
          recognise: avatar + name + status line. The status line carries
          a live "Online" pulse dot and a typical-response-time hint, which
          softens the parent's expectations (they understand it's not an
          instant reply, but they can see the assistant is awake). */}
      <header
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar circle with the chat icon - kept from the prior design. */}
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
              EDUS AI Assistant
            </p>
            {/* Status row: live pulse dot + Online + reply-time hint.
                flex-wrap keeps "Online · Replies in ~1 min" intact on
                small phones where the header could otherwise overflow. */}
            <p className="text-[11px] text-white/85 leading-tight flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5">
              {/* Online pulse - inner solid dot + outer ping. Pure CSS
                  ping animation keyframes are scoped via a local <style>
                  block (see end of this header section). */}
              <span
                aria-hidden
                className="relative inline-flex w-2 h-2 shrink-0"
              >
                <span
                  className="absolute inline-flex w-full h-full rounded-full bg-[#22C55E] opacity-75"
                  style={{
                    animation: "edus-online-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#22C55E]" />
              </span>
              <span>Online</span>
              <span aria-hidden className="opacity-50">·</span>
              <span>Replies in ~1 min</span>
              <style>{`
                @keyframes edus-online-ping {
                  0%   { transform: scale(1);   opacity: 0.75; }
                  80%  { transform: scale(2.4); opacity: 0;    }
                  100% { transform: scale(2.4); opacity: 0;    }
                }
              `}</style>
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
                onChange={(e) => {
                  // Parent is typing - cancel any pending nudge so the
                  // bot doesn't interrupt them mid-sentence.
                  cancelIdleNudge();
                  setInput(e.target.value.slice(0, MAX_USER_LEN));
                }}
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
        <IntakeForm
          onSubmit={handleIntakeSubmit}
          openMode={openMode}
          onDecline={onClose}
        />
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
/* Streaming display helpers                                         */
/* --------------------------------------------------------------- */

/**
 * Hide partial [[LEAD_CAPTURE]] markers while the stream is still
 * arriving. Once the model starts emitting the marker block, we don't
 * want the parent to briefly see "[[LEAD_C" then "[[LEAD_CAP" then the
 * raw JSON flickering across the bubble.
 *
 * Heuristic: if the text contains a complete opening marker
 * "[[LEAD_CAPTURE]]" we truncate at that position. We do NOT try to
 * partial-match prefixes like "[[LE" because (a) the marker is the
 * ONLY known double-bracket sequence the LLM emits, (b) trimming a
 * legitimate "[[" elsewhere (rare in normal text) would be more
 * jarring than briefly showing the opening marker once.
 *
 * The final extractLeadCapture call runs on the COMPLETE accumulated
 * text after the stream finishes, so this is purely a presentational
 * hide-during-streaming optimisation.
 */
function maskLeadMarker(text: string): string {
  const idx = text.indexOf("[[LEAD_CAPTURE]]");
  return idx === -1 ? text : text.slice(0, idx).trimEnd();
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
