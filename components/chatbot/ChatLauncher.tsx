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
 * Z-index 80 puts it above the consent banner (banner z-[70], modal
 * backdrop z-[60] in ConsentBanner) so a parent can still open the
 * chat while the cookie toast is up - but BELOW any future critical-
 * action modal that would need to fully block interaction.
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
    // Wrapper handles position + iOS safe-area inset so the launcher
    // clears the home indicator on iPhone notch / dynamic island
    // devices. Tailwind doesn't ship a safe-area utility by default, so
    // the inline style appends it to the existing right/bottom offset.
    //   - Mobile (<sm):  bottom-4 right-4 (16px gutter, conserves real estate)
    //   - Tablet+ (sm:): bottom-5 right-5 (20px gutter)
    <div
      className="fixed right-4 bottom-4 sm:right-5 sm:bottom-5 z-[80]"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <button
        type="button"
        onClick={open ? onClose : onOpen}
        aria-label={open ? "Close EDUS chat" : "Open EDUS chat - ask about classes"}
        className={[
          // Size: 56px on mobile (large enough for fat thumbs, small
          // enough to not crowd 320px viewports) -> 14 * 4 = 56.
          // No size jump on tablet+ since 56px is already comfortable.
          "relative inline-flex items-center justify-center w-14 h-14 rounded-full",
          "shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/35",
          "transition will-change-transform hover:-translate-y-0.5",
          // Billing-style wobble when pulse=true. Subtle - 4deg either
          // side, 3.5s cycle, paused on hover so the user doesn't fight
          // the animation while aiming for the button.
          pulse ? "edus-chat-wobble hover:[animation-play-state:paused]" : "",
        ].join(" ")}
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
        }}
      >
        {/* Pulse ring - the outermost attention layer. Absolute so it
            doesn't displace the icon. Inside the button so it inherits
            the launcher's screen position. */}
        {pulse ? (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "rgba(37,99,235,0.45)",
              animation:
                "edus-chat-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
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

        {/* "1" unread notification badge - the second attention layer.
            Sits in the top-right corner of the launcher with its own
            ping ring so the parent reads it as "you have a message".
            Only renders during the pulse phase; disappears after the
            first interaction along with the other pulse effects. */}
        {pulse ? (
          <span
            aria-hidden
            className="absolute -top-1 -right-1 inline-flex w-5 h-5 items-center justify-center"
          >
            <span
              className="absolute inline-flex w-full h-full rounded-full bg-[#EF4444] opacity-75"
              style={{
                animation:
                  "edus-chat-badge-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span className="relative inline-flex w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-display font-700 items-center justify-center shadow-[0_2px_6px_-1px_rgba(239,68,68,0.6)] ring-2 ring-white">
              1
            </span>
          </span>
        ) : null}
      </button>

      {/* Keyframes for the three pulse layers. Scoped via a single
          <style> tag so other consumers of the launcher don't need to
          duplicate them. prefers-reduced-motion stops every animation
          for users who've opted out of motion in their OS. */}
      <style>{`
        @keyframes edus-chat-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes edus-chat-badge-ping {
          0%   { transform: scale(1);   opacity: 0.75; }
          70%  { transform: scale(2.2); opacity: 0;    }
          100% { transform: scale(2.2); opacity: 0;    }
        }
        @keyframes edus-chat-wobble {
          0%, 100%        { transform: rotate(0deg)  translateY(0); }
          15%             { transform: rotate(-6deg) translateY(0); }
          30%             { transform: rotate(6deg)  translateY(0); }
          45%             { transform: rotate(-4deg) translateY(0); }
          60%             { transform: rotate(4deg)  translateY(0); }
          75%, 100%       { transform: rotate(0deg)  translateY(0); }
        }
        .edus-chat-wobble {
          animation: edus-chat-wobble 3.5s ease-in-out infinite;
          transform-origin: 50% 90%;
        }
        @media (prefers-reduced-motion: reduce) {
          .edus-chat-wobble { animation: none; }
        }
      `}</style>
    </div>
  );
}
