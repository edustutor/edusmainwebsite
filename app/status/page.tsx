import type { Metadata } from "next";
import { getSystemStatus, type StatusPayload } from "@/lib/status";
import { StatusBoard } from "@/components/status/StatusBoard";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { JsonLdScript, breadcrumbList } from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";

// Re-render the server snapshot at most once a minute. getSystemStatus()
// also caches the UptimeRobot call in memory, so this page is cheap even
// under load, and the client board keeps it live after first paint.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Live operational status and uptime for EDUS - the learning platform, websites, student signup, and internal systems. Real-time monitoring of all EDUS services.",
  alternates: {
    canonical: "/status",
    languages: hreflangAlternates("/status"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "EDUS System Status",
    description:
      "Live operational status and uptime for every EDUS service. Monitored around the clock.",
    siteName: "EDUS",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "EDUS System Status" }],
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
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "System Status" }]}
      />
      <StatusBoard initial={initial} />
    </>
  );
}
