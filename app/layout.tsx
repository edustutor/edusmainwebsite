import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Headings — Poppins. Friendly geometric sans, high recognition, optimised
// for education and family-facing platforms.
const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body — Open Sans. Best-in-class legibility for parents and students.
const sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
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
  themeColor: "#F8FBFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-[#F8FBFF] text-[#102033] antialiased">
        <div className="app-atmosphere" aria-hidden />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
