import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Display: Fraunces — a confident, high-contrast contemporary serif used by
// many premium global brands; works for editorial trust and modern polish.
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body: Inter — the global standard for product UI; excellent legibility at
// every size, world-class language coverage, and strong on Core Web Vitals.
const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Mono: JetBrains Mono — for eyebrows, metadata, and tabular numerics.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "EDUS — Learn the right syllabus, in the right format, with the right support.",
    template: "%s · EDUS",
  },
  description:
    "EDUS is a future-ready education platform offering live online group and one-to-one tuition for Sri Lanka, India, and global learners.",
  metadataBase: new URL("https://edustutor.com"),
  applicationName: "EDUS Tutor",
  authors: [{ name: "EDUS" }],
  keywords: [
    "online tuition", "Sri Lanka tuition", "CBSE tuition", "IGCSE tutor",
    "live online classes", "Edexcel", "IB Diploma", "one to one tutor",
  ],
  openGraph: {
    type: "website",
    title: "EDUS — Learn the right syllabus, in the right format, with the right support.",
    description:
      "Live online group and one-to-one tuition for Sri Lanka, India, and global learners.",
    url: "https://edustutor.com",
    siteName: "EDUS Tutor",
  },
  twitter: { card: "summary_large_image", title: "EDUS Tutor" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBFCFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-[#FBFCFF] text-[#0A1230] antialiased">
        <div className="app-atmosphere" aria-hidden />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
