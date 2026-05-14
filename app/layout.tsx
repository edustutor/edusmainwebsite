import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/effects/Motion";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { AnalyticsClickTracker } from "@/components/analytics/AnalyticsClickTracker";
import {
  getCurrentHost,
  getCurrentAnalyticsIds,
  hreflangAlternates,
} from "@/lib/siteUrl";

// Headings - Poppins. Friendly geometric sans, high recognition, optimised
// for education and family-facing platforms.
const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body - Open Sans. Best-in-class legibility for parents and students.
const sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Root metadata is built per-request so each of the 6 EDUS domains
 * (edustutor.com, www.edustutor.com, edus.edu.lk, www.edus.edu.lk,
 *  edus.lk, www.edus.lk) gets a SELF-canonical and a shared hreflang
 * block. This is the correct pattern for the same content served on
 * multiple ccTLDs - Google sees them as regional variants instead of
 * duplicate content.
 *
 * Per-page metadata (e.g. /blog/[slug], /gallery/[slug]) continues to
 * override individual fields; the host-aware `metadataBase` + `canonical`
 * + `alternates.languages` flow down from this root.
 */
export async function generateMetadata(): Promise<Metadata> {
  const host = await getCurrentHost();
  const origin = `https://${host}`;
  return {
  title: {
    default: "EDUS - Live Online Tuition - Sri Lanka, India, Maldives",
    template: "%s - EDUS",
  },
  description:
    "Join EDUS for live online tuition with expert tutors, structured classes, exams, and parent updates. Sri Lanka, India CBSE, Maldives Cambridge & global 1-to-1.",
  // Dynamic per active domain - drives every absolute URL Next generates
  // for OG/canonical/twitter on this page render.
  metadataBase: new URL(origin),
  alternates: {
    canonical: "/",
    // hreflang lists the apex of each language/region target. Same path
    // ("/") because the homepage exists on every domain. Page-level
    // metadata blocks may override `alternates.languages` with a path-
    // specific map (e.g. /blog → hreflangAlternates("/blog")).
    languages: hreflangAlternates("/"),
  },
  applicationName: "EDUS",
  authors: [{ name: "EDUS" }],
  keywords: [
    // Brand
    "EDUS",
    "EDUS Online Tuition",
    "EDUS Tutor",
    "edustutor",
    // Primary platform
    "online tuition",
    "online tutoring",
    "online classes",
    "online tutors",
    "online learning platform",
    "live online classes",
    "live online tuition",
    "online classes for students",
    "online classes for kids",
    "online classes for school students",
    "online tuition for school students",
    "best online tuition platform",
    "best online tutoring service",
    // Markets
    "online tuition Sri Lanka",
    "Sri Lanka online tuition",
    "India online tuition",
    "Tamil Nadu CBSE online tuition",
    "online tuition Tamil Nadu",
    "Maldives online tuition",
    "Maldives Cambridge tuition",
    "Maldives Edexcel tuition",
    "online tuition for international students",
    "online tuition worldwide",
    "global online tutoring",
    // Formats
    "one to one online tuition",
    "1 to 1 online tuition",
    "group online classes",
    "private online tutor",
    "personal online tutor",
    "personal class online",
    "personal class for kids",
    "personal class online tutor",
    "personal online classes",
    "personal tuition online",
    // Syllabuses
    "CBSE online tuition for Classes 6 to 10",
    "Cambridge online tuition",
    "Edexcel online tuition",
    "IGCSE online tuition",
    "O Level online tuition",
    "A Level online tuition",
    "G.C.E A/L online tuition",
    "G.C.E O/L online tuition",
    "National Syllabus online tuition",
    // Subjects
    "online tuition for Maths",
    "online tuition for Science",
    "online tuition for English",
    "online tuition for ICT",
    "online tuition for Tamil",
    "online tuition for Hindi",
    "online tuition for Sinhala",
    "online tuition for Physics",
    "online tuition for Chemistry",
    "online tuition for Biology",
    "online tuition for Social Science",
    "online tuition for Combined Maths",
    // Parent / trust
    "parent monitored online classes",
    "live online classes with parent updates",
    "affordable online tuition",
    "quality assured online tuition",
    "exam preparation online tuition",
    "tutor matching online",
    // Institute / brand category
    "best online institute",
    "best online learning institute",
    "best online tuition institute",
    "top online learning platform",
    "trusted online tuition platform",
    "leading online education platform",
    "online education institute",
    // Best tutor / quality
    "best online tutor",
    "best tutor online",
    "best teacher online",
    "top rated online tutors",
    "qualified online tutors",
    "expert tutors online",
    "experienced online tutors",
    // Results / outcomes
    "best results in O/L exam",
    "best results in A/L exam",
    "9A in O/L",
    "3A in A/L",
    "Distinction online tuition",
    "online tuition for top grades",
    "top scorers online tuition",
    "scholarship exam online tuition",
    "online tuition for scholarship exam",
    "Grade 5 scholarship online classes",
    "exam toppers online tuition",
    "high scoring online classes",
  ],
  openGraph: {
    type: "website",
    title: "EDUS - Live Online Tuition - Sri Lanka, India, Maldives",
    description:
      "Join EDUS for live online tuition with expert tutors, structured classes, exams, and parent updates. Sri Lanka, India CBSE, Maldives Cambridge & global 1-to-1.",
    // Self-referencing OG URL - points at the active domain, not the brand
    // primary. This matches og:url with the canonical and avoids OG-graph
    // de-duplication across the 6 domains.
    url: origin,
    siteName: "EDUS",
    locale: "en_US",
    alternateLocale: ["en_LK", "en_IN", "en_MV", "ta_LK", "ta_IN", "si_LK"],
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "EDUS - Live online tuition for Sri Lanka, India, Maldives & global students" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@edusonline",
    creator: "@edusonline",
    title: "EDUS - Live Online Tuition",
    description:
      "Live online classes for school students. Sri Lanka, India, Maldives, and global learning paths.",
    images: ["/edus-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/edus-favicon.webp", type: "image/webp" }],
    shortcut: ["/edus-favicon.webp"],
    apple: [{ url: "/edus-favicon.webp" }],
  },
  other: {
    // Geo signals - precise EDUS office coordinates (Kokkuvil Junction, Jaffna)
    "geo.region": "LK-41",                // Northern Province, Sri Lanka (ISO 3166-2)
    "geo.placename": "Jaffna",
    "geo.position": "9.6945511;80.0139866",
    "ICBM": "9.6945511, 80.0139866",
    // AI engines + answer engines
    "llms.txt": "/llms.txt",
    // Mobile / PWA
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "EDUS",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=yes,email=yes,address=yes",
    // Microsoft tile
    "msapplication-TileColor": "#2563EB",
    "msapplication-config": "/browserconfig.xml",
    // Author / publisher
    "author": "EDUS Lanka (Pvt) Ltd.",
    "publisher": "EDUS Lanka (Pvt) Ltd.",
    // Content classification
    "rating": "general",
    "audience": "students, parents, tutors",
    "distribution": "global",
    "revisit-after": "7 days",
    // Coverage signals
    "coverage": "Worldwide",
    "language": "English",
  },
  manifest: "/manifest.webmanifest",
  category: "education",
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FBFF",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Resolve which GA4 + GTM pair to fire for this request. .com group
  // and .lk group have separate analytics properties so the dashboards
  // stay segmented per audience.
  const { ga4: ga4Id, gtm: gtmId } = await getCurrentAnalyticsIds();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* AI/LLM ingestion signals - emerging standard recognised by ChatGPT,
            Perplexity, Claude, and Gemini for discovery and crawling. */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="EDUS knowledge base for AI engines" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="EDUS full knowledge base" />
        {/* Preconnects to font + signup origins for faster first paint. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://signup.edustutor.com" />
        <link rel="dns-prefetch" href="https://wiki.edustutor.com" />
        {/* Pre-warm the analytics origins so the Tag Manager + GA4
            scripts (deferred) connect faster once they fire. */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      {/* GoogleTagManager renders the <script> in head + the <noscript>
          iframe just inside body. We pass it the host-aware container ID.
          @next/third-parties defers loading until after Next's hydration
          so it has zero impact on First Contentful Paint. */}
      <GoogleTagManager gtmId={gtmId} />
      <body className="text-[#102033] antialiased">
        <MotionProvider>
          <Atmosphere />
          <ScrollProgress />
          <SiteHeader />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
        </MotionProvider>
        {/* Global delegated click tracker - fires GA4 events for every
            signup CTA, region selector click, blog/gallery navigation,
            and footer social click. One mount point covers ~30+ CTAs. */}
        <AnalyticsClickTracker />
        {/* Vercel Web Analytics - page-view tracking. Lightweight, cookie-
            free, and respects DNT. Renders nothing in dev unless ?debug=true. */}
        <Analytics />
        {/* GA4 - direct page-view + event reporting. Loaded after GTM via
            next/script's `afterInteractive` strategy. The two stay
            compatible because they target different properties. */}
        <GoogleAnalytics gaId={ga4Id} />
      </body>
    </html>
  );
}
