/**
 * EDUS Online Tuition - Minimal Service Worker
 *
 * Purpose: satisfy Chrome / Edge / Samsung Internet installability
 * criteria so users see the "Install app" / "Add to home screen"
 * prompt. The browser will not surface that prompt unless a service
 * worker is registered + active for the page's origin.
 *
 * This worker INTENTIONALLY does not intercept fetch traffic. Caching
 * the EDUS site would risk:
 *   - Stale Google Reviews on /sl (refreshed weekly via cron)
 *   - Stale blog posts / gallery albums
 *   - Stale price/timetable data on /sl, /sl/timetable, /in
 *   - Stale JSON-LD payloads after schema fixes
 * The marketing-site UX expects "always fresh" content over offline
 * availability, so we trade offline capability for content freshness.
 *
 * If you ever want offline support, replace this with Serwist
 * (@serwist/next) and configure a network-first runtime caching
 * strategy. See: https://serwist.pages.dev/docs/next/getting-started
 *
 * --- Lifecycle events --------------------------------------------
 *
 * `install`  - first time the worker is registered. We immediately
 *              skipWaiting() so the new worker activates without
 *              waiting for all tabs to close - matters when shipping
 *              future SW changes via auto-update.
 *
 * `activate` - the worker is now controlling the page. claim() takes
 *              over any tabs that were previously uncontrolled so the
 *              SW becomes the source of truth without a page refresh.
 *
 * `fetch`    - NOT handled. The browser handles every network request
 *              normally, exactly as if no SW were present. The empty
 *              listener exists ONLY to satisfy Chrome's install gate -
 *              Chrome requires a `fetch` handler before considering
 *              the SW "controlled" and eligible to drive an install
 *              prompt.
 */

self.addEventListener("install", (event) => {
  // Activate immediately - no waiting period for new SW versions.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  // Take control of any open clients (tabs) that aren't yet controlled.
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch handler. Chrome's install criteria require a
// registered fetch listener; this one delegates every request to the
// network so the browser cache + Vercel edge cache + Next.js Image
// optimisation all behave exactly as on a non-PWA site.
self.addEventListener("fetch", () => {
  // No respondWith() call - the browser proceeds with its default
  // network handling. The listener's presence alone satisfies the
  // installability check.
});
