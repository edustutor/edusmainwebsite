"use client";

/**
 * Floating brand-blue chat launcher. Bottom-right on every page.
 *
 * Three states:
 *   - Closed + pulse: subtle ping animation behind the bubble to
 *     draw the eye on first visit. Stops as soon as the user clicks.
 *   - Closed + idle: just the round button. No animation.
 *   - Open: the launcher hides (the ChatPanel header has its own
 *     close button so we don't duplicate UI).
 *
 * Accessibility:
 *   - role="button" via the native <button> element.
 *   - aria-label changes between "Open EDUS chat" / "Close EDUS chat"
 *     based on state so screen readers narrate the right action.
 *   - 48x48 touch target meets WCAG 2.1 AA (2.5.5).
 *
 * Z-index 60 puts it above the consent banner (z-50 in ConsentBanner)
 * so a parent can still open the chat while the cookie toast is up -
 * but BELOW any future critical-action modal that would need to fully
 * block interaction.
 */

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  pulse: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function ChatLauncher({ open, pulse, onOpen, onClose }: Props) {
  // Track whether the launcher should be visible. We hide it while the
  // panel is open since the panel has its own close button.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Skip rendering on SSR to keep the floating button out of the initial
  // HTML payload (zero impact on LCP / FCP). The button doesn't need to
  // be SEO-discoverable since it's not content.
  if (!mounted || open) return null;

  return (
    <button
      type="button"
      onClick={open ? onClose : onOpen}
      aria-label={open ? "Close EDUS chat" : "Open EDUS chat - ask about classes"}
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center justify-center w-14 h-14 rounded-full shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/35 transition hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
      }}
    >
      {/* Pulse ring - subtle attention ping. Inside the button so it
          inherits the same screen position; absolutely positioned so
          it doesn't displace the icon. */}
      {pulse ? (
        <>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background: "rgba(37,99,235,0.45)",
              animation: "edus-chat-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <style>{`
            @keyframes edus-chat-ping {
              0%   { transform: scale(1);   opacity: 0.7; }
              80%  { transform: scale(1.7); opacity: 0;   }
              100% { transform: scale(1.7); opacity: 0;   }
            }
          `}</style>
        </>
      ) : null}

      {/* Chat-bubble icon. White-on-blue for AA contrast. */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="relative"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </button>
  );
}
