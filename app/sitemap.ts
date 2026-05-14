import type { MetadataRoute } from "next";
import { PUBLISHED_POSTS } from "@/components/blog/BlogData";
import { PUBLISHED_ALBUMS, cloudinaryUrl } from "@/components/gallery/GalleryData";
import { getCurrentHost } from "@/lib/siteUrl";

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

  const routes: SitemapRow[] = [
    // Top-level
    { path: "/",                 changeFrequency: "weekly",  priority: 1.0 },

    // Market landing pages
    { path: "/sl",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/sl/timetable",     changeFrequency: "monthly", priority: 0.85 },
    { path: "/in",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/mv",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/global",           changeFrequency: "weekly",  priority: 0.95 },

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
