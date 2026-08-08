import type { Metadata } from "next";
import { getSystemStatus, type StatusPayload } from "@/lib/status";
import { StatusBoard } from "@/components/status/StatusBoard";
import { StatusFaq } from "@/components/status/StatusFaq";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { JsonLdScript, breadcrumbList, faqPage } from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";

// Re-render the server snapshot at most once a minute. getSystemStatus()
// also caches the UptimeRobot call in memory, so this page is cheap even
// under load, and the client board keeps it live after first paint.
export const revalidate = 60;

// Status FAQ. Rendered visibly by <StatusFaq> AND emitted as FAQPage
// structured data below. Both read this one array so the schema answers
// always match the on-page text (Google requires that match).
const STATUS_FAQ = [
  {
    q: "Is EDUS down right now?",
    a: "You can see the live status of every EDUS service on this page. When all indicators are green, EDUS is fully operational. The page refreshes automatically every 60 seconds.",
  },
  {
    q: "How do I check EDUS uptime and past incidents?",
    a: "Each EDUS service shows its uptime for the last 24 hours, 7 days, 30 days, and 90 days, plus a 90-day bar history. The Past Incidents section lists any disruptions day by day for the last 14 days.",
  },
  {
    q: "How often is the EDUS status updated?",
    a: "EDUS services are checked every 5 minutes by independent monitoring from multiple global regions, and this status page refreshes every 60 seconds.",
  },
  {
    q: "What should I do if an EDUS service is down?",
    a: "If a service shows an outage, the EDUS team is automatically alerted and working on it. For urgent help, contact EDUS support at hello@edustutor.com or +94 70 707 2072.",
  },
];

export const metadata: Metadata = {
  title: "System Status - Live Uptime & Service Health",
  description:
    "Live operational status, 90-day uptime, and incident history for every EDUS service - the learning platform, websites, student signup, and internal systems. Updated every 60 seconds.",
  alternates: {
    canonical: "/status",
    languages: hreflangAlternates("/status"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "EDUS System Status - Live Uptime & Incidents",
    description:
      "Live operational status, 90-day uptime, and incident history for every EDUS service. Monitored around the clock.",
    siteName: "EDUS",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "EDUS System Status" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDUS System Status - Live Uptime & Incidents",
    description:
      "Live operational status, 90-day uptime, and incident history for every EDUS service.",
    images: ["/edus-og.jpg"],
  },
};

export default async function StatusPage() {
  let initial: StatusPayload | null = null;
  try {
    initial = await getSystemStatus();
  } catch {
    // getSystemStatus never throws in practice, but if it did we still
    // render the shell and let the client board fetch the live feed.
    initial = null;
  }

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "System Status", path: "/status" },
        ])}
      />
      <JsonLdScript data={faqPage(STATUS_FAQ)} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "System Status" }]}
      />
      <StatusBoard initial={initial} />
      <StatusFaq items={STATUS_FAQ} />
    </>
  );
}
