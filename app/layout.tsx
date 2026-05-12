import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/effects/Motion";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Atmosphere } from "@/components/effects/Atmosphere";

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

export const metadata: Metadata = {
  title: {
    default:
      "EDUS · Live Online Tuition for Sri Lanka, India, Maldives & Global",
    template: "%s · EDUS",
  },
  description:
    "Live online tuition with expert tutors, structured classes, recordings, exams, and parent updates. Sri Lanka, India CBSE, Maldives Cambridge, and global 1-to-1 learning.",
  metadataBase: new URL("https://edustutor.com"),
  alternates: { canonical: "/" },
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
    title: "EDUS · Live Online Tuition for Sri Lanka, India, Maldives & Global",
    description:
      "Live online tuition with expert tutors, structured classes, recordings, exams, and parent updates.",
    url: "https://edustutor.com",
    siteName: "EDUS",
    locale: "en_US",
    alternateLocale: ["en_LK", "en_IN", "en_MV", "ta_LK", "ta_IN", "si_LK"],
    images: [{ url: "/edus-logo-blue.webp", width: 1200, height: 630, alt: "EDUS online learning platform" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@edusonline",
    creator: "@edusonline",
    title: "EDUS · Live Online Tuition",
    description:
      "Live online classes for school students. Sri Lanka, India, Maldives, and global learning paths.",
    images: ["/edus-logo-blue.webp"],
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
    // Geo signals — precise EDUS office coordinates (Kokkuvil Junction, Jaffna)
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FBFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* AI/LLM ingestion signals — emerging standard recognised by ChatGPT,
            Perplexity, Claude, and Gemini for discovery and crawling. */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="EDUS knowledge base for AI engines" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="EDUS full knowledge base" />
        {/* Preconnects to font + signup origins for faster first paint. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://signup.edustutor.com" />
        <link rel="dns-prefetch" href="https://wiki.edustutor.com" />
      </head>
      <body className="text-[#102033] antialiased">
        <MotionProvider>
          <Atmosphere />
          <ScrollProgress />
          <SiteHeader />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
