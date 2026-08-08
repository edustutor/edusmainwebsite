"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { StatusPayload, SystemState } from "@/lib/status";

/**
 * Compact live status pill for the site footer.
 *
 * Fetches /api/status once on mount and shows an overall health dot that
 * links to the full /status page. Renders a neutral placeholder first so
 * there is no layout shift and the link always works, even before (or if)
 * the feed loads.
 */

const DOT: Record<SystemState, string> = {
  operational: "#22C55E",
  degraded: "#F59E0B",
  down: "#EF4444",
  maintenance: "#2563EB",
  unknown: "#94A3B8",
};

const LABEL: Record<SystemState, string> = {
  operational: "All Systems Operational",
  degraded: "Some Systems Degraded",
  down: "Service Outage",
  maintenance: "Under Maintenance",
  unknown: "System Status",
};

export function StatusPill() {
  const [state, setState] = useState<SystemState | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/status", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: StatusPayload | null) => {
        if (alive && data) setState(data.overall);
      })
      .catch(() => {
        /* Leave the neutral placeholder on error. */
      });
    return () => {
      alive = false;
    };
  }, []);

  const s = state ?? "unknown";

  return (
    <Link
      href="/status"
      className="group inline-flex items-center gap-2 rounded-full bg-white border border-[rgba(16,32,51,0.08)] px-3 py-1.5 text-[12px] text-[#2B3950] hover:border-[#2563EB]/40 hover:text-[#2563EB] transition shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
      title="View EDUS system status"
    >
      {/* Live status dot - soft blink, same cadence as the status board. */}
      <span
        className="inline-block w-2 h-2 rounded-full status-pill-blink"
        style={{ background: DOT[s] }}
        aria-hidden
      />
      <span className="font-600">{LABEL[s]}</span>
      <style>{`
        @keyframes status-pill-blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .status-pill-blink { animation: status-pill-blink 1.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .status-pill-blink{animation:none} }
      `}</style>
    </Link>
  );
}
