import type { MetadataRoute } from "next";
import { PUBLISHED_POSTS } from "@/components/blog/BlogData";

const SITE = "https://edustutor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: Date }[] = [
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

    // Legal (low priority but indexable)
    { path: "/privacy",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/terms",            changeFrequency: "yearly",  priority: 0.30 },
    { path: "/cookies",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/refunds",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/safeguarding",     changeFrequency: "yearly",  priority: 0.30 },
    { path: "/acceptable-use",   changeFrequency: "yearly",  priority: 0.30 },
  ];

  // Blog posts - each gets its own entry with the post's actual datePublished.
  const blogRoutes = PUBLISHED_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    lastModified: new Date(p.dateModified ?? p.datePublished),
  }));

  return [...routes, ...blogRoutes].map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
