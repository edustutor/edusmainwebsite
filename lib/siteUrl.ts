/**
 * Host-aware URL resolution for EDUS multi-domain SEO.
 *
 * EDUS runs on 6 parallel domains that all serve the same Next.js app:
 *
 *   - edustutor.com         (international primary, English default)
 *   - www.edustutor.com
 *   - edus.edu.lk           (Sri Lanka academic primary)
 *   - www.edus.edu.lk
 *   - edus.lk               (Sri Lanka short domain)
 *   - www.edus.lk
 *
 * Each domain is an independent, indexable property. To keep Google from
 * treating the other 5 as duplicate content, every page must:
 *
 *   1. Self-canonical: a page on edus.lk/blog declares
 *      <link rel="canonical" href="https://edus.lk/blog">, not edustutor.com.
 *   2. List all 6 domains as hreflang alternates.
 *   3. Point JSON-LD @id / mainEntityOfPage at the served host.
 *
 * This module reads the inbound Host header (via next/headers) and returns
 * the active domain, then exposes helpers to build canonical + hreflang
 * blocks consistently across the codebase.
 */
import { headers } from "next/headers";

/**
 * The 6 production domains. ORDER MATTERS for hreflang fallback - earlier
 * entries are tried first when an ambiguous host (e.g. a preview URL) hits
 * the helper. Apex versions are listed before www variants so they win the
 * tie-break.
 */
export const DOMAINS = [
  {
    host: "edustutor.com",
    /** Country/language label Google uses for SERP targeting. */
    hreflang: "en",
    /** Human label for any debug UI. */
    label: "International",
  },
  {
    host: "www.edustutor.com",
    hreflang: "en",
    label: "International (www)",
  },
  {
    host: "edus.edu.lk",
    hreflang: "en-LK",
    label: "Sri Lanka (academic)",
  },
  {
    host: "www.edus.edu.lk",
    hreflang: "en-LK",
    label: "Sri Lanka (academic, www)",
  },
  {
    host: "edus.lk",
    hreflang: "en-LK",
    label: "Sri Lanka",
  },
  {
    host: "www.edus.lk",
    hreflang: "en-LK",
    label: "Sri Lanka (www)",
  },
] as const;

export type SiteDomain = (typeof DOMAINS)[number];

/**
 * Fallback host - used at build time when there is no incoming request
 * (e.g. sitemap generation, static metadata defaults). edustutor.com is
 * the brand primary even though the others are equally indexable.
 */
export const PRIMARY_DOMAIN = "edustutor.com" as const;

/**
 * Resolve the active host from the inbound request, falling back to
 * PRIMARY_DOMAIN at build time or when the request host doesn't match
 * any configured domain (e.g. preview deployments at *.vercel.app).
 *
 * Marked async because Next 15+ `headers()` returns a Promise.
 */
export async function getCurrentHost(): Promise<string> {
  try {
    const h = await headers();
    // Vercel + most proxies set `host` to the public hostname. Strip any
    // port suffix (`localhost:3000`) before matching.
    const raw = h.get("host") ?? "";
    const host = raw.split(":")[0].toLowerCase();
    const match = DOMAINS.find((d) => d.host === host);
    return match ? match.host : PRIMARY_DOMAIN;
  } catch {
    // headers() throws when called outside a request scope (build / sitemap).
    return PRIMARY_DOMAIN;
  }
}

/**
 * Same as getCurrentHost but returns the full DOMAINS entry so callers
 * can read the hreflang code for the active host.
 */
export async function getCurrentDomain(): Promise<SiteDomain> {
  const host = await getCurrentHost();
  const found = DOMAINS.find((d) => d.host === host);
  return found ?? DOMAINS[0];
}

/**
 * Build an absolute URL for the active host. Use this to construct the
 * <link rel="canonical"> and any JSON-LD `url` / `@id` fields that need
 * to point at the served domain instead of the brand primary.
 *
 *   const url = await siteUrl("/blog");        // → https://edus.lk/blog
 *   const url = await siteUrl("/gallery/foo"); // → https://edus.lk/gallery/foo
 */
export async function siteUrl(path: string = "/"): Promise<string> {
  const host = await getCurrentHost();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `https://${host}${cleanPath}`;
}

/**
 * Build the hreflang alternates block for a given path. Returns a record
 * shape that Next's Metadata.alternates.languages accepts directly:
 *
 *   { "en": "https://edustutor.com/blog",
 *     "en-LK": "https://edus.edu.lk/blog",
 *     "x-default": "https://edustutor.com/blog" }
 *
 * Behaviour:
 *   - Each unique hreflang code (en, en-LK) gets ONE entry per Google's
 *     spec - we pick the primary apex domain for each code so that
 *     consolidated link equity flows through the apex variant.
 *   - x-default always points at the international primary (edustutor.com).
 *   - The www variants are NOT listed as separate hreflang because Google
 *     treats them as the same site when properly canonicalised.
 */
export function hreflangAlternates(path: string = "/"): Record<string, string> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return {
    "en": `https://edustutor.com${cleanPath}`,
    "en-LK": `https://edus.edu.lk${cleanPath}`,
    "x-default": `https://edustutor.com${cleanPath}`,
  };
}

/**
 * Helper for components that need ALL 6 domain URLs for a given path -
 * e.g. JSON-LD `sameAs` lists or a "view on another domain" footer
 * element. Returns the full apex list in order.
 */
export function allDomainUrls(path: string = "/"): string[] {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return DOMAINS.map((d) => `https://${d.host}${cleanPath}`);
}

/**
 * Per-domain Google Analytics 4 + Google Tag Manager IDs.
 *
 * Each domain group has its OWN GA4 property + GTM container so
 * traffic on edustutor.com is reported separately from edus.lk /
 * edus.edu.lk in the dashboards. The .lk pair groups both Sri Lankan
 * domains because they serve the same audience.
 *
 * Returned from getCurrentAnalyticsIds() at request time so the right
 * pair fires regardless of which domain the visitor lands on.
 */
type AnalyticsIds = {
  /** GA4 Measurement ID, format G-XXXXXXXXXX. */
  ga4: string;
  /** GTM Container ID, format GTM-XXXXXXX. */
  gtm: string;
};

const ANALYTICS_INTERNATIONAL: AnalyticsIds = {
  ga4: "G-TDTGSZ3JKP",
  gtm: "GTM-PRCZXRWT",
};

const ANALYTICS_SRI_LANKA: AnalyticsIds = {
  ga4: "G-CR35WZ2QEY",
  gtm: "GTM-564N63N7",
};

/**
 * Resolve which (GA4, GTM) pair to fire for the inbound request. The
 * .com group and the two .lk domains have distinct properties so the
 * dashboards stay segmented.
 */
export async function getCurrentAnalyticsIds(): Promise<AnalyticsIds> {
  const host = await getCurrentHost();
  if (host.endsWith(".lk")) return ANALYTICS_SRI_LANKA;
  return ANALYTICS_INTERNATIONAL;
}
