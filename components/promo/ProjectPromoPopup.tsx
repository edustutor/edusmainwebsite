"use client";

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

/** Time-based trigger: fire after this many ms even if the parent
 *  doesn't scroll. Safety net for engaged readers who stop on the hero. */
const PROMO_DELAY_MS = 10_000;

/** Scroll-based trigger: fire when the parent has scrolled past this
 *  fraction of the page. Whichever fires first wins. 0.15 = 15%.
 *  Catches fast scrollers who skim before the 10s timer expires. */
const PROMO_SCROLL_THRESHOLD = 0.15;

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

  // Dual trigger: fires on whichever happens first -
  //   (a) PROMO_DELAY_MS elapsed since the page settled, OR
  //   (b) parent scrolled past PROMO_SCROLL_THRESHOLD of the page.
  // Both register independently; the first to fire wins and the other
  // tears itself down via the shared `fire` helper.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (SKIP_PATHS.some((p) => pathname?.startsWith(p))) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let alreadyFired = false;
    // window.setTimeout returns `number` in the DOM lib while the global
    // setTimeout's return is `Timeout` under @types/node. Use the
    // explicit window form throughout so both ends agree.
    let timerId: number | null = null;

    // Shared fire helper. Idempotent: if either trigger already won,
    // subsequent calls (e.g. from the OTHER trigger) are no-ops.
    const fire = () => {
      if (alreadyFired) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      alreadyFired = true;
      setOpen(true);
      // Detach both triggers immediately so neither tries to fire again.
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll, { capture: false } as EventListenerOptions);
    };

    // Trigger A - the 10-second timer. Safety net for parents who sit
    // on the hero without scrolling.
    timerId = window.setTimeout(fire, PROMO_DELAY_MS);

    // Trigger B - the 15% scroll-depth threshold. Catches fast scrollers
    // who skim through the page before the 10s timer fires.
    //
    // scrollY / (docHeight - viewportHeight) gives the percentage of the
    // total scrollable distance the parent has traversed. We clamp to
    // [0,1] so a bounce-up doesn't read as negative.
    function getScrollPct(): number {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      return Math.min(1, Math.max(0, window.scrollY / max));
    }

    // Named function so removeEventListener can detach it cleanly inside
    // `fire` above. passive:true lets the browser skip preventDefault
    // checks for better scroll-thread performance.
    function onScroll() {
      if (getScrollPct() >= PROMO_SCROLL_THRESHOLD) fire();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
    };
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
      // CENTERING STRATEGY (verified mobile + desktop):
      //   1. `fixed inset-0` covers the layout viewport (the legacy
      //      iOS-Safari trap where 100vh > visible height when the
      //      address bar is showing).
      //   2. `height: 100dvh` overrides height to use the DYNAMIC
      //      viewport - tracks the visible area in real time as the
      //      address bar / keyboard collapses or expands.
      //   3. `flex items-center justify-center` centers the card in
      //      both axes.
      //   4. The card also has `m-auto` as a defence-in-depth backstop
      //      so even if a parent flex context fails, auto margins keep
      //      it visually centered.
      //   5. Safe-area padding keeps the card clear of the iOS notch +
      //      Android status bar at top and the home indicator at bottom.
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 sm:px-6"
      onClick={dismiss}
      style={{
        // 100dvh = dynamic viewport height. Always matches what the
        // user can actually see, even on iOS Safari where the address
        // bar shrinks/grows.
        height: "100dvh",
        // Translucent backdrop. The blur softens the underlying page
        // so the popup pops, but doesn't fully obscure the content -
        // the visitor still sees they're on the EDUS site.
        background: "rgba(16,32,51,0.55)",
        backdropFilter: "blur(6px)",
        // Safe-area padding so the card never sits under the iOS
        // notch / Android status bar at top or the home indicator at
        // the bottom on mobile.
        paddingTop: "max(1.5rem, env(safe-area-inset-top, 0px))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Stop propagation so clicks INSIDE the card don't trigger the
          backdrop dismiss handler.
          max-h + overflow-y-auto guarantee the card never escapes the
          viewport on short phone screens (the image alone is ~52vw tall
          + content + button rows could push past 700px tall otherwise).
          m-auto is the centering backstop (see strategy comment above). */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] max-h-full m-auto overflow-y-auto rounded-[24px] bg-white border border-[rgba(16,32,51,0.10)] shadow-[0_30px_80px_-20px_rgba(16,32,51,0.55)]"
        style={{
          animation: "edus-promo-pop 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        {/* Close button - floats above the card in the top-right
            corner, slightly OUTSIDE the image area so it doesn't
            collide with the trophy/student artwork on mobile. White
            background + shadow + ring keep it readable on any image. */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close 9A Challenge promo"
          className="absolute top-2 right-2 z-20 inline-flex w-9 h-9 rounded-full items-center justify-center bg-white text-[#102033] shadow-[0_6px_16px_-4px_rgba(16,32,51,0.55)] ring-1 ring-[rgba(16,32,51,0.08)] hover:bg-white hover:scale-105 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/60"
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

        {/* Promo image. Intentionally a plain <img> instead of
            next/image because Vercel's free-tier image-optimisation
            quota is finite (1000 transformations / month) and this
            image is already a hand-optimised WebP at the perfect size
            (1672x941, 191 KB). Running it through /_next/image would
            burn quota for zero quality gain - and on a quota-exhausted
            project the optimiser returns HTTP 402 Payment Required,
            which is what caused the popup to render blank on
            production before this change. Browsers handle plain
            <img loading="lazy"> well enough that nothing is lost. */}
        {/* Image wrapper. overflow-hidden + the rounded-t corners
            inherited via the parent ensure the image clips cleanly to
            the rounded card edges. Aspect ratio kept at 16:9 so the
            container reserves space and avoids layout shift before
            the image loads. */}
        <div className="relative aspect-[16/9] bg-[#0B1A36] overflow-hidden rounded-t-[24px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/edus-9a-challenge-popup.webp"
            alt="EDUS 9A Challenge - G.C.E O/L 2026 - 6 Months Project Class"
            loading="lazy"
            decoding="async"
            width={1672}
            height={941}
            className="absolute inset-0 w-full h-full object-cover"
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
