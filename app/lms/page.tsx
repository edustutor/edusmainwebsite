import type { Metadata } from "next";
import { LmsRedirect } from "@/components/lms/LmsRedirect";

/**
 * /lms - smart app launcher.
 *
 * Detects the visitor's device and sends them, fast, to the right place:
 * Android -> Google Play, iOS -> App Store, desktop -> the web LMS
 * (lms.edustutor.com). A branded fallback card with all three options is
 * shown in case auto-redirect is blocked. Handy as one short link for
 * print, QR codes, and social bios: "edustutor.com/lms".
 */

export const metadata: Metadata = {
  title: { absolute: "Open the EDUS App" },
  description:
    "Open the EDUS Online Institute app. We send you to Google Play, the App Store, or the web app for your device.",
  // Utility redirect page - kept out of the index so it never shows in
  // search results or trips thin-content / soft-404 checks.
  robots: { index: false, follow: true },
  alternates: { canonical: "/lms" },
};

export default function LmsPage() {
  return <LmsRedirect />;
}
