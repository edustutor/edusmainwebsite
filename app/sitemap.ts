import type { MetadataRoute } from "next";

const SITE = "https://edustutor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    // Top-level
    { path: "/",                 changeFrequency: "weekly",  priority: 1.0 },

    // Market landing pages
    { path: "/sl",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/in",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/mv",               changeFrequency: "weekly",  priority: 0.95 },
    { path: "/global",           changeFrequency: "weekly",  priority: 0.95 },

    // Product / conversion
    { path: "/teach",            changeFrequency: "weekly",  priority: 0.85 },
    { path: "/contact",          changeFrequency: "monthly", priority: 0.80 },
    { path: "/enrol",            changeFrequency: "monthly", priority: 0.80 },

    // Storytelling
    { path: "/how-it-works",     changeFrequency: "monthly", priority: 0.70 },
    { path: "/success-stories",  changeFrequency: "monthly", priority: 0.70 },

    // Legal (low priority but indexable)
    { path: "/privacy",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/terms",            changeFrequency: "yearly",  priority: 0.30 },
    { path: "/cookies",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/refunds",          changeFrequency: "yearly",  priority: 0.30 },
    { path: "/safeguarding",     changeFrequency: "yearly",  priority: 0.30 },
    { path: "/acceptable-use",   changeFrequency: "yearly",  priority: 0.30 },
  ];

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
