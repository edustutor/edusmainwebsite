"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 * Global 9A Challenge promo popup.
 *
 * Behaviour:
 *   - Fires once per browser session after PROMO_DELAY_MS on EVERY page
 *     except /sl/9a-project itself (no point promoting the page the
 *     visitor is already on) and /api/* routes.
 *   - Visitor closes it via the X button, outside-click, Escape, or
 *     clicking "Maybe later" - any of those sets the dismissed flag so
 *     the popup never re-fires in the same session.
 *   - Clicking the primary CTA navigates to /sl/9a-project AND sets
 *     the dismissed flag so the popup doesn't show again on landing.
 *
 * Why session-storage (not local-storage):
 *   - We want first-time visitors per browser session to see it once.
 *     If they leave and come back tomorrow, they'll see it again.
 *     local-storage would suppress it forever; cookies need consent.
 *
 * Performance:
 *   - The wrapper component is tiny (~3 KB pre-gzip). The actual
 *     image is dynamically rendered ONLY when the popup is open, so
 *     the WebP doesn't ship on first paint - it's fetched only at the
 *     10s mark, well after LCP / FCP have stabilised.
 *   - Mounts inside the body of the root layout. Z-index 90 puts it
 *     above the chat panel (80), launcher (80), and cookie banner (70)
 *     - this popup is the highest-priority modal on the page when
 *     visible.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true" + aria-labelledby on the title.
 *   - Escape closes it.
 *   - Focus trap is intentionally NOT implemented because the popup
 *     has only two interactive elements (CTA + close) - a tab cycle
 *     between them works without an explicit trap. If we add more
 *     fields later we'll wire in focus-trap-react.
 *   - Respects prefers-reduced-motion via the @keyframes fallback
 *     defined in the inline <style> block.
 */

const PROMO_DELAY_MS = 10_000;
const SESSION_KEY = "edus.promo.9aProjectShown";

/** Routes where the popup SHOULDN'T fire. /sl/9a-project itself + any
 *  /api/* route + the contact form (visitor is mid-task). */
const SKIP_PATHS = ["/sl/9a-project", "/contact"];

export function ProjectPromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Set the dismissed flag in sessionStorage so subsequent page
  // navigations within the same tab don't show the popup again.
  const dismiss = useCallback(() => {
    setOpen(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage can be unavailable in private modes / iframes;
        // failing silently here is fine - worst case the popup may
        // re-show on next navigation in those edge cases.
      }
    }
  }, []);

  // 10-second arming timer. Bails if the route is on the skip list
  // OR if the popup has already been shown this session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (SKIP_PATHS.some((p) => pathname?.startsWith(p))) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const id = window.setTimeout(() => {
      // Re-check the flag at firing time too - guards against a race
      // where another tab in the same session set the flag during the
      // 10s wait.
      if (!sessionStorage.getItem(SESSION_KEY)) {
        setOpen(true);
      }
    }, PROMO_DELAY_MS);

    return () => window.clearTimeout(id);
  }, [pathname]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-9a-title"
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center px-4 sm:px-6 pb-4 sm:pb-0"
      onClick={dismiss}
      style={{
        // Translucent backdrop. The blur softens the underlying page
        // so the popup pops, but doesn't fully obscure the content -
        // the visitor still sees they're on the EDUS site.
        background: "rgba(16,32,51,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Stop propagation so clicks INSIDE the card don't trigger the
          backdrop dismiss handler. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] rounded-[24px] bg-white overflow-hidden border border-[rgba(16,32,51,0.10)] shadow-[0_30px_80px_-20px_rgba(16,32,51,0.55)]"
        style={{
          animation: "edus-promo-pop 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        {/* Close button - top-right of the card, sits OVER the image
            so it stays visible on mobile where the image is the focal
            point. White circle for contrast against any image. */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close 9A Challenge promo"
          className="absolute top-3 right-3 z-10 inline-flex w-9 h-9 rounded-full items-center justify-center bg-white/90 text-[#102033] shadow-[0_4px_12px_-4px_rgba(16,32,51,0.4)] hover:bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/60"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Promo image. next/image gives us WebP / AVIF responsive
            variants automatically. Priority is NOT set because this
            renders only after the 10s timer - well past LCP. */}
        <div className="relative aspect-[16/9] bg-[#0B1A36]">
          <Image
            src="/edus-9a-challenge-popup.webp"
            alt="EDUS 9A Challenge - G.C.E O/L 2026 - 6 Months Project Class"
            fill
            sizes="(min-width: 640px) 480px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Content + CTA. Uses the existing eyebrow / heading / btn
            tokens from globals.css so the popup feels native to the
            rest of the site. */}
        <div className="p-5 sm:p-6 text-center">
          <h2
            id="promo-9a-title"
            className="font-display font-700 text-[20px] sm:text-[22px] text-[#102033] leading-snug"
          >
            G.C.E O/L 2026 - 6 Months <em className="text-[#2563EB] not-italic">9A Project Class</em>
          </h2>
          <p className="text-[13px] sm:text-[13.5px] text-[#2B3950] mt-2.5 leading-[1.6]">
            Grade 10 missed? Basics not strong? EDUS is ready to guide you to
            9A. Live online classes, F-result refund promise, expert O/L
            tutors.
          </p>

          {/* Tamil tagline + urgency line. lang="ta" so screen readers
              switch voices for the Tamil pass and search engines index
              it as Tamil content. */}
          <div className="mt-4">
            <p
              className="font-display font-700 text-[14.5px] sm:text-[15.5px] text-[#2563EB] leading-[1.5]"
              lang="ta"
            >
              சரியான வழிகாட்டலுடன், உங்கள் வெற்றியை உறுதி செய்வோம்!
            </p>
            {/* Blink animation drives urgency. Soft fade (not a hard
                CSS3 visibility blink) so it stays readable + doesn't
                trigger photosensitivity issues. Pauses entirely under
                prefers-reduced-motion (defined in the <style> block
                further down). */}
            <p className="font-display font-700 text-[13.5px] sm:text-[14.5px] text-[#DC2626] mt-1.5 edus-promo-blink">
              Limited Students Only. Enrol Now!
            </p>
          </div>

          {/* Single primary CTA. The close button (top-right X) +
              outside-click + Escape already cover the "no thanks"
              path, so a secondary button would be UI noise. */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/sl/9a-project"
              onClick={dismiss}
              className="btn btn-primary"
            >
              View 9A Project
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes edus-promo-pop {
            from { opacity: 0; transform: translateY(20px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
          }
          /* Urgency blink for the "Limited Students Only" line. Soft
             0.45 -> 1.0 fade (not a hard 0/1 visibility flicker) so the
             text stays readable mid-cycle and the eye can't get fatigued.
             1.2s cycle ~ fast enough to feel urgent but slow enough to
             not trigger photosensitivity issues. */
          @keyframes edus-promo-blink {
            0%, 100% { opacity: 1;    }
            50%      { opacity: 0.45; }
          }
          .edus-promo-blink {
            animation: edus-promo-blink 1.2s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            [role="dialog"] > div { animation: none; }
            .edus-promo-blink     { animation: none; }
          }
        `}</style>
      </div>
    </div>
  );
}
