import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MotionProvider } from "@/components/Motion";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Atmosphere } from "@/components/Atmosphere";

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
      "EDUS Online Tuition | Live Online Classes for Sri Lanka, India & Global Students",
    template: "%s · EDUS",
  },
  description:
    "Join EDUS for live online tuition, expert tutors, structured classes, parent updates, recordings, exams, and progress tracking. Explore Sri Lanka classes, India Grades 6 to 10, and global one to one tuition.",
  metadataBase: new URL("https://edustutor.com"),
  applicationName: "EDUS",
  authors: [{ name: "EDUS" }],
  keywords: [
    "online tuition",
    "online tuition Sri Lanka",
    "online classes for students",
    "live online classes",
    "online tutors",
    "online learning platform",
    "Sri Lanka online tuition",
    "India online tuition",
    "Chennai online tuition",
    "one to one online tuition",
    "online tuition for school students",
    "online tuition for Grade 6 to 10",
    "parent monitored online classes",
    "online tuition for Maths",
    "online tuition for Science",
    "online tuition for English",
    "online tuition for ICT",
    "online tuition for Tamil",
    "online tuition for Hindi",
    "online tuition for Social Science",
  ],
  openGraph: {
    type: "website",
    title: "EDUS Online Tuition | Live Online Classes for Sri Lanka, India & Global Students",
    description:
      "Live online tuition, expert tutors, structured classes, parent updates, recordings, exams, and progress tracking. Sri Lanka, India, and global learning paths.",
    url: "https://edustutor.com",
    siteName: "EDUS",
    images: [{ url: "/edus_logo_blue.webp", width: 1200, height: 630, alt: "EDUS online learning platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDUS Online Tuition",
    description:
      "Live online classes for school students. Sri Lanka, India, and global learning paths.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/edus_favicon.webp", type: "image/webp" }],
    shortcut: ["/edus_favicon.webp"],
    apple: [{ url: "/edus_favicon.webp" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FBFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
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
