"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Auto-dial hotline screen for /call.
 *
 * On mount it navigates to `tel:<number>`, which makes the device open
 * its phone dialer with the EDUS hotline pre-filled (the user then taps
 * the call button). Browsers do NOT allow placing a call silently - a
 * user gesture is always required to actually dial - so a large, obvious
 * "Call now" button and the visible number act as the reliable fallback
 * (and the primary path on desktop, where `tel:` may not resolve).
 *
 * The auto-redirect fires IMMEDIATELY on mount (no delay) so the dialer
 * opens as fast as possible. A guard ref makes sure it only fires once
 * even under React 18/19 StrictMode double-mount in dev.
 */
export function CallNow({
  telHref,
  display,
}: {
  telHref: string; // e.g. "tel:+94707072072"
  display: string; // e.g. "+94 70 707 2072"
}) {
  const [triggered, setTriggered] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    setTriggered(true);
    // Fire on the next tick so the tel: navigation is not swallowed by
    // the initial render commit, but with zero artificial delay.
    window.setTimeout(() => {
      window.location.href = telHref;
    }, 0);
  }, [telHref]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="glass-strong rounded-[32px] p-8 sm:p-12 max-w-md w-full text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="blob" style={{ top: "-10%", left: "-8%", width: 220, height: 220, background: "#2563EB", opacity: 0.18 }} />
          <span className="blob" style={{ bottom: "-12%", right: "-8%", width: 220, height: 220, background: "#22C55E", opacity: 0.16 }} />
        </div>

        {/* Phone icon */}
        <span
          className="mx-auto inline-flex w-16 h-16 rounded-2xl items-center justify-center animate-pulse"
          style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 3h3.5l1.6 5-2 1.3a12 12 0 0 0 5.6 5.6l1.3-2 5 1.6V20a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 4.6 1.5 1.5 0 0 1 5 3z" />
          </svg>
        </span>

        <h1 className="heading mt-6" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
          {triggered ? (
            <>Connecting your call…</>
          ) : (
            <>Calling EDUS…</>
          )}
        </h1>
        <p className="mt-3 text-[#2B3950] text-[15px] leading-relaxed">
          Your phone should open the dialer with our hotline ready. If it
          does not, tap the button below to call us now.
        </p>

        {/* Big tap-to-call button */}
        <a href={telHref} className="btn btn-primary w-full mt-7 justify-center text-[16px] !py-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 3h3.5l1.6 5-2 1.3a12 12 0 0 0 5.6 5.6l1.3-2 5 1.6V20a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 4.6 1.5 1.5 0 0 1 5 3z" />
          </svg>
          Call {display}
        </a>

        {/* Number shown as text so it can be copied on desktop */}
        <p className="mt-4 text-[13px] text-[#5A6A82]">
          Hotline: <span className="tnum font-600 text-[#102033]">{display}</span>
        </p>
      </div>
    </div>
  );
}
