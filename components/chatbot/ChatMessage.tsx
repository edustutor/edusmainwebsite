"use client";

/**
 * Single chat message bubble. Memo-less - rendering a chat list of
 * 10-30 small messages doesn't need memoization, and adding React.memo
 * here would only hide the cost of repaints, not eliminate them.
 *
 * Visual rules:
 *   - User messages: brand blue background, white text, right-aligned.
 *   - Assistant messages: white card with soft shadow, dark text,
 *     left-aligned. Matches the glass-morphism aesthetic of the rest
 *     of the EDUS site.
 *   - System / error messages: muted text, italic, centered.
 *
 * Content handling:
 *   - We render plain text with whitespace preserved (`whitespace-pre-wrap`).
 *   - URLs in assistant replies are auto-linked - the LLM frequently
 *     drops https://signup.edustutor.com/ and https://edustutor.com/contact
 *     links, and these should be clickable.
 *   - Lead-capture markers ([[LEAD_CAPTURE]]...[[/LEAD_CAPTURE]]) are
 *     stripped from the visible bubble by the parent panel BEFORE
 *     the message reaches this component, so no escape needed here.
 */

import type { ChatMessage as ChatMessageType } from "@/lib/chatbot/types";

type Props = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: Props) {
  if (message.role === "system") {
    // Intake summary cards (sent by ChatPanel right after the form is
    // submitted) start with the "📋 Details shared" prefix. Render
    // those as a proper read-only card so the parent can see at a
    // glance what they shared with the EDUS team. Other system
    // messages (rate-limit, error fallbacks) keep the small centered
    // italic rendering they always had.
    if (message.content.startsWith("📋 ")) {
      const lines = message.content.split("\n");
      const [header, ...rest] = lines;
      return (
        <div className="flex justify-start">
          <div className="max-w-[92%] rounded-xl px-4 py-3 bg-[#EFF4FF] border border-[#2563EB]/15 text-[12.5px] text-[#2B3950] leading-[1.6]">
            <p className="font-display font-700 text-[13px] text-[#102033] mb-1.5">
              {header}
            </p>
            <ul className="space-y-0.5">
              {rest.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <p className="text-center text-[12px] text-[#5A6A82] italic px-4">
        {message.content}
      </p>
    );
  }

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.55] whitespace-pre-wrap break-words",
          isUser
            ? "bg-[#2563EB] text-white rounded-br-sm shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)]"
            : "bg-white text-[#102033] rounded-bl-sm border border-[rgba(16,32,51,0.08)] shadow-[0_6px_18px_-10px_rgba(16,32,51,0.18)]",
        ].join(" ")}
      >
        {renderInline(message.content)}
      </div>
    </div>
  );
}

/**
 * Auto-link URLs in plain text. We only handle http(s) for safety -
 * never auto-link arbitrary tokens that could be tel:, mailto:, or
 * javascript: schemes. Limit one regex pass over the string.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const urlRegex = /(https?:\/\/[^\s)\]]+)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>,
      );
    }
    const url = match[0];
    // Strip trailing punctuation that's almost never part of the URL.
    const cleaned = url.replace(/[.,;:!?]+$/, "");
    const stripped = url.length - cleaned.length;
    parts.push(
      <a
        key={key++}
        href={cleaned}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-80"
      >
        {cleaned}
      </a>,
    );
    if (stripped > 0) {
      parts.push(<span key={key++}>{url.slice(url.length - stripped)}</span>);
    }
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return parts;
}
