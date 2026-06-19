import type { MetadataRoute } from "next";
import { PUBLISHED_POSTS } from "@/components/blog/BlogData";
import { PUBLISHED_ALBUMS, cloudinaryUrl } from "@/components/gallery/GalleryData";
import { getCurrentHost } from "@/lib/siteUrl";

/**
 * Sri Lanka domains whose apex "/" is permanently redirected to "/sl" by
 * proxy.ts. If the sitemap lists "/" for these hosts, Google Search
 * Console flags it as "Page with redirect" and refuses to index. The
 * canonical landing page on these hosts is "/sl", so we swap "/" with
 * "/sl" + drop the duplicate when building the .lk variant.
 *
 * Source of truth: lib/siteUrl.ts (DOMAINS where hreflang === "en-LK").
 * Listed inline here to avoid a runtime dependency from sitemap build.
 */
const SL_REDIRECT_HOSTS = new Set([
  "edus.lk",
  "www.edus.lk",
  "edus.edu.lk",
  "www.edus.edu.lk",
]);

/** One row in the internal route list. `images` becomes `<image:loc>`
 *  entries on the URL when present (image sitemap extension). */
type SitemapRow = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
  images?: string[];
};

/**
 * Host-aware sitemap. Each of the 6 EDUS domains serves its OWN sitemap
 * listing its OWN URLs (e.g. edus.lk/sitemap.xml lists edus.lk URLs).
 * This is the correct pattern for independent multi-domain SEO - each
 * Search Console property reads only its own sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = await getCurrentHost();
  const SITE = `https://${host}`;
  const now = new Date();

  // On Sri Lanka hosts the apex "/" is permanently redirected to "/sl"
  // by proxy.ts, so emitting "/" in the sitemap causes Google to flag
  // it as "Page with redirect" and refuse to index. For those hosts we
  // drop the apex row entirely - "/sl" remains as the canonical home
  // entry (with priority 0.95 below, which is the highest non-redirecting
  // page so it picks up the "homepage" weight in the sitemap regardless).
  const isSlRedirectHost = SL_REDIRECT_HOSTS.has(host);

  const routes: SitemapRow[] = [
    // Top-level - skipped on .lk hosts because "/" 308s to "/sl" there.
    ...(isSlRedirectHost
      ? []
      : [{ path: "/", changeFrequency: "weekly" as const, priority: 1.0 }]),

    // Market landing pages.
    // On .lk hosts "/sl" IS the homepage (since "/" 308s here) so it
    // gets priority 1.0 to match what "/" would have been on .com.
    { path: "/sl",               changeFrequency: "weekly",  priority: isSlRedirectHost ? 1.0 : 0.95 },
    { path: "/sl/timetable",     changeFrequency: "monthly", priority: 0.85 },
    // Time-sensitive campaign page - high priority + weekly until
    // O/L 2026 exam window (Nov 2026). Refresh frequency matters more
    // than priority here so Googlebot revisits during the enrolment
    // window.
    { path: "/sl/9a-project",    changeFrequency: "weekly",  priority: 0.90 },
    // Evergreen reference asset (O/L grading scale + what 9A means).
    // Built to earn backlinks: teachers / parent blogs / forums cite it
    // instead of re-typing the grade scale. Monthly + 0.75 so it accrues
    // topical authority like a hub page, above the blog posts.
    { path: "/sl/ol-grading-scale", changeFrequency: "monthly", priority: 0.75 },
    { path: "/in",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/mv",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/global",           changeFrequency: "weekly",  priority: 0.95 },

    // EDUS Overseas Consultancy - separately branded study-abroad section
    // at /overseas. High priority + weekly: it is a new revenue line
    // targeting Sri Lankan rank-1 for "study abroad consultants Sri Lanka".
    { path: "/overseas",                changeFrequency: "weekly",  priority: 0.90 },
    { path: "/overseas/about",          changeFrequency: "monthly", priority: 0.70 },
    { path: "/overseas/contact",        changeFrequency: "monthly", priority: 0.70 },
    // Per-destination landing pages (UK, Australia, Canada, Dubai,
    // Ireland, New Zealand) - deep SEO for "study in <X> from Sri Lanka".
    { path: "/overseas/uk",             changeFrequency: "monthly", priority: 0.80 },
    { path: "/overseas/australia",      changeFrequency: "monthly", priority: 0.80 },
    { path: "/overseas/canada",         changeFrequency: "monthly", priority: 0.80 },
    { path: "/overseas/dubai",          changeFrequency: "monthly", priority: 0.80 },
    { path: "/overseas/ireland",        changeFrequency: "monthly", priority: 0.80 },
    { path: "/overseas/new-zealand",    changeFrequency: "monthly", priority: 0.80 },

    // Product / conversion
    { path: "/teach",            changeFrequency: "weekly",  priority: 0.85 },
    { path: "/contact",          changeFrequency: "monthly", priority: 0.80 },

    // Trust & brand
    { path: "/about",            changeFrequency: "monthly", priority: 0.70 },
    { path: "/press",            changeFrequency: "monthly", priority: 0.60 },

    // Blog index
    { path: "/blog",             changeFrequency: "weekly",  priority: 0.75 },

    // Gallery index
    { path: "/gallery",          changeFrequency: "monthly", priority: 0.70 },

    // Legal (low priority but indexable)
    { path: "/privacy",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/terms",            changeFrequency: "yearly",  priority: 0.30 },
    { path: "/cookies",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/refunds",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/safeguarding",     changeFrequency: "yearly",  priority: 0.30 },
    { path: "/acceptable-use",   changeFrequency: "yearly",  priority: 0.30 },
  ];

  // Blog posts - each gets its own entry with the post's actual datePublished.
  const blogRoutes: SitemapRow[] = PUBLISHED_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    lastModified: new Date(p.dateModified ?? p.datePublished),
  }));

  // Gallery albums - lastModified uses the album's event date so the
  // sitemap reflects when the photos were actually captured. We also
  // emit every album photo as <image:loc> so Google Images discovers
  // the full set without re-crawling the HTML.
  const galleryRoutes: SitemapRow[] = PUBLISHED_ALBUMS.map((a) => ({
    path: `/gallery/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.60,
    lastModified: new Date(a.dateModified ?? a.datePublished),
    images: a.photos.map((p) => cloudinaryUrl(p.publicId, { width: 1600 })),
  }));

  return [...routes, ...blogRoutes, ...galleryRoutes].map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    ...(r.images && r.images.length ? { images: r.images } : {}),
  }));
}
