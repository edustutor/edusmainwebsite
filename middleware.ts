import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware - runs before every request reaches the Next route.
 *
 * Sole job today: when a visitor lands on the ROOT of a Sri Lanka domain
 * (edus.lk, www.edus.lk, edus.edu.lk, www.edus.edu.lk), redirect them
 * to /sl on the same domain so the homepage of those .lk properties
 * shows the Sri Lanka content directly.
 *
 *   edus.lk/         → 308 → edus.lk/sl
 *   www.edus.lk/     → 308 → www.edus.lk/sl
 *   edus.edu.lk/     → 308 → edus.edu.lk/sl
 *   www.edus.edu.lk/ → 308 → www.edus.edu.lk/sl
 *   edustutor.com/   → unchanged (international homepage)
 *   any other path   → unchanged (only the root triggers this)
 *
 * 308 (permanent) - so Google transfers any equity that hit the .lk
 * apex over to the /sl page and stops indexing the root entirely.
 *
 * Why a middleware and not vercel.json redirects? vercel.json `redirects`
 * does match on `has: [{ type: "host", value: "..." }]` but the same-host
 * redirect target must be hardcoded per rule. Middleware reads the inbound
 * host once and reuses it - cleaner and easier to extend.
 */

/** Hosts that should redirect "/" → "/sl". */
const SRI_LANKA_HOSTS = new Set([
  "edus.lk",
  "www.edus.lk",
  "edus.edu.lk",
  "www.edus.edu.lk",
]);

export function middleware(req: NextRequest) {
  // We only ever act on the root path. The matcher below already filters
  // for "/" but checking explicitly here keeps the function defensive in
  // case the matcher gets relaxed in future.
  if (req.nextUrl.pathname !== "/") return NextResponse.next();

  // Vercel forwards the public hostname in `host`. Strip any port suffix.
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (!SRI_LANKA_HOSTS.has(host)) return NextResponse.next();

  // Preserve query string + any future trailing-slash handling. We rebuild
  // the URL on the same host so the redirect stays in-domain.
  const target = req.nextUrl.clone();
  target.pathname = "/sl";
  return NextResponse.redirect(target, 308);
}

/**
 * Matcher = which routes the middleware runs for. We only need it on the
 * homepage. Everything else (assets, /sl, /blog, etc.) bypasses the edge
 * entirely so there's zero overhead for the rest of the site.
 */
export const config = {
  matcher: ["/"],
};
