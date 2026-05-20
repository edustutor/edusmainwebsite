"use client";
import { useEffect } from "react";

/**
 * Registers /sw.js with the browser so EDUS becomes installable as a
 * Progressive Web App. The service worker itself is intentionally
 * minimal (see public/sw.js) - its presence is what unlocks Chrome /
 * Edge / Samsung Internet's "Install app" prompt + iOS / iPadOS
 * "Add to Home Screen" badge.
 *
 * Why not register from a <Script> tag in <head>?
 *   - We want to defer registration until after the page is interactive
 *     so it never competes with LCP. A useEffect inside a client
 *     component runs post-hydration, after the user's first paint.
 *   - The mounted client component lets us cleanly skip registration
 *     in environments where it would only generate noise (browsers
 *     without SW support, localhost dev where Chrome flags SW as
 *     uninstallable).
 *
 * Failure modes handled:
 *   - Old browsers without `navigator.serviceWorker` → no-op.
 *   - Registration network failure → caught + logged once, never
 *     thrown to React. The site keeps working as a regular website.
 *   - Multiple mounts → register() is idempotent; the browser dedupes
 *     by scope + scriptURL.
 *
 * Mount this once near the bottom of the root layout (after the
 * primary content tree) so it never blocks rendering.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    // Feature-detect. Old browsers without SW support get a normal
    // website experience; no error, no console noise.
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Skip registration on localhost dev. SW caching during development
    // is more pain than value (stale chunks after rebuilds) and Chrome
    // already lets you trigger install prompts on localhost via
    // chrome://flags if you specifically want to test the flow.
    if (window.location.hostname === "localhost") return;

    // Defer one tick past hydration so registration never competes
    // with above-the-fold paint. The browser ignores SW registration
    // requests during pageload anyway, but this makes the intent
    // explicit and improves Lighthouse "Time to Interactive".
    //
    // requestIdleCallback is widely available but still missing in
    // some older WebKit + iOS Safari builds. Feature-detect with
    // `typeof` (the function reference itself is always truthy when
    // the API exists, so an `if (window.requestIdleCallback)` check
    // would be flagged as always-true by TypeScript).
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const id: number = hasIdleCallback
      ? window.requestIdleCallback(() => register(), { timeout: 4000 })
      : window.setTimeout(register, 1500);

    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback?.(id);
      } else {
        window.clearTimeout(id);
      }
    };
  }, []);

  // Renders nothing - this component exists purely for the side effect.
  return null;
}

/**
 * Actual register call. Pulled out so the useEffect body stays small
 * and the scheduling logic (requestIdleCallback vs setTimeout) is
 * readable without the registration noise inline.
 */
function register() {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .catch((err) => {
      // Don't escalate - a missing or broken SW does not break the
      // site. We just lose installability for this session. Log once
      // so a real registration regression is at least visible in
      // browser devtools / Sentry / whatever's listening.
      console.warn("[EDUS PWA] Service worker registration failed:", err);
    });
}
