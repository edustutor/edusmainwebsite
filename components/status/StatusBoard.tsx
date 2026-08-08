"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { StatusPayload, StatusSystem, SystemState } from "@/lib/status";

/**
 * Live status board for /status - Statuspage-style layout.
 *
 * Overall banner, a grouped component list where each row carries a 90-day
 * uptime bar strip (hover or tap a bar for that day's detail), and a
 * collapsible day-by-day past-incidents log. Receives the server snapshot
 * as `initial` for instant first paint, then polls /api/status every 60s
 * (and on tab focus). `import type` keeps the data module - and its API
 * key - out of the client bundle.
 */

const REFRESH_MS = 60_000;
const DAY_SECS = 86400;

// Right-side status label colour per state.
const STATE_META: Record<SystemState, { label: string; ink: string }> = {
  operational: { label: "Operational", ink: "#15803D" },
  degraded: { label: "Degraded", ink: "#B45309" },
  down: { label: "Major Outage", ink: "#B91C1C" },
  maintenance: { label: "Maintenance", ink: "#1D4ED8" },
  unknown: { label: "Unknown", ink: "#5A6A82" },
};

// Full-width overall banner per state.
const BANNER: Record<SystemState, { bg: string; text: string }> = {
  operational: { bg: "linear-gradient(135deg,#16A34A,#22C55E)", text: "All Systems Operational" },
  degraded: { bg: "linear-gradient(135deg,#D97706,#F59E0B)", text: "Some Systems Degraded" },
  down: { bg: "linear-gradient(135deg,#DC2626,#EF4444)", text: "Major Service Outage" },
  maintenance: { bg: "linear-gradient(135deg,#1D4ED8,#2563EB)", text: "Scheduled Maintenance" },
  unknown: { bg: "linear-gradient(135deg,#475569,#64748B)", text: "Status Temporarily Unavailable" },
};

// Bar strip colour, tooltip label, and detail line per day character.
const BAR_COLOR: Record<string, string> = { u: "#22C55E", d: "#F59E0B", x: "#EF4444", n: "#E3E9F1" };
const BAR_LABEL: Record<string, string> = {
  u: "Operational",
  d: "Partial outage",
  x: "Major outage",
  n: "No data",
};
const BAR_DETAIL: Record<string, string> = {
  u: "100% uptime that day",
  d: "Some downtime that day",
  x: "Major outage that day",
  n: "Before monitoring began",
};

export function StatusBoard({ initial }: { initial: StatusPayload | null }) {
  const [data, setData] = useState<StatusPayload | null>(initial);
  const [ago, setAgo] = useState("just now");

  // Poll the live feed on an interval and when the tab regains focus.
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) return;
        const next = (await res.json()) as StatusPayload;
        if (alive) setData(next);
      } catch {
        /* keep last snapshot on a transient error */
      }
    }
    if (!initial) load();
    const poll = setInterval(load, REFRESH_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [initial]);

  // "Updated X ago" is computed only after mount so server and client agree
  // on first paint (avoids a hydration mismatch from Date.now()).
  const updatedAt = data?.updatedAt;
  useEffect(() => {
    if (!updatedAt) return;
    const refresh = () => setAgo(relativeTime(updatedAt));
    refresh();
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [updatedAt]);

  const overall: SystemState = data?.overall ?? "unknown";
  const banner = BANNER[overall];
  const allSystems = useMemo(
    () => (data?.groups ?? []).flatMap((g) => g.systems),
    [data],
  );

  return (
    <section className="container-edge pb-16 pt-2">
      <StatusKeyframes />

      {/* Heading */}
      <div className="max-w-2xl">
        <p className="text-[11px] font-display font-600 tracking-[0.18em] uppercase text-[#2563EB]">
          EDUS System Status
        </p>
        <h1 className="mt-2 font-display font-700 text-[#102033] text-[clamp(26px,3.2vw,40px)] leading-[1.12]">
          Live status of every EDUS service
        </h1>
      </div>

      {/* Overall banner */}
      <div
        className="rounded-[18px] mt-6 px-6 md:px-8 py-5 md:py-6 flex items-center gap-4 shadow-[0_20px_50px_-24px_rgba(16,32,51,0.45)]"
        style={{ background: banner.bg }}
      >
        <BannerIcon state={overall} />
        <div className="flex-1 min-w-0">
          <p className="font-display font-700 text-white text-[clamp(18px,2vw,24px)] leading-tight">
            {banner.text}
          </p>
          <p className="text-white/85 text-[12.5px] mt-1 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white status-blink" aria-hidden />
              Live
            </span>
            <span aria-hidden>·</span>
            <span>Updated {ago}</span>
            <span aria-hidden>·</span>
            <span>Refreshes every 60s</span>
          </p>
        </div>
      </div>

      {/* Plain-language summary - server-rendered so search and AI engines
          can read and quote the current status directly. Full width so it
          reads as one clean line instead of wrapping to a short orphan. */}
      {data && data.groups.length > 0 && (
        <p className="mt-4 text-[13.5px] text-[#2B3950] leading-[1.6]">
          {summaryLine(data)}
        </p>
      )}

      {data?.stale && (
        <p className="mt-3 text-[12.5px] text-[#B45309] flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F59E0B]" aria-hidden />
          Showing the last confirmed reading. Live monitoring will resume automatically.
        </p>
      )}

      {/* Components + uptime history */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h2 className="font-display font-600 text-[13px] text-[#102033]">
            Uptime over the past 90 days
          </h2>
          {allSystems.length > 0 && (
            <span className="text-[12px] text-[#5A6A82] shrink-0">
              {allSystems.filter((s) => s.state === "operational").length}/{allSystems.length} operational
            </span>
          )}
        </div>

        <Legend />

        <div className="space-y-6">
          {(data?.groups ?? []).map((group) => (
            <div key={group.name}>
              <h3 className="font-display font-600 text-[11px] tracking-[0.14em] uppercase text-[#8A98AC] mb-2">
                {group.name}
              </h3>
              <div className="glass rounded-[18px] px-5 md:px-6 divide-y divide-[rgba(16,32,51,0.07)]">
                {group.systems.map((sys) => (
                  <ComponentRow key={sys.id} system={sys} />
                ))}
              </div>
            </div>
          ))}

          {data && data.groups.length === 0 && (
            <div className="glass rounded-[18px] px-6 py-10 text-center text-[#5A6A82]">
              {data.error
                ? "System status is temporarily unavailable. Please check back shortly."
                : "No systems are being monitored yet."}
            </div>
          )}
        </div>
      </div>

      {/* Past incidents - collapsible, day by day */}
      <div className="mt-11">
        <h2 className="font-display font-700 text-[16px] text-[#102033] mb-4">
          Past Incidents
        </h2>
        <PastIncidents data={data} />
      </div>

      {/* Footer note */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12.5px] text-[#5A6A82]">
        <p>
          Independently monitored around the clock from multiple global regions.
          Health checks run every 5 minutes.
        </p>
        <p>
          Experiencing an issue not shown here?{" "}
          <Link href="/contact" className="text-[#2563EB] hover:underline font-600">
            Contact support
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------

function Legend() {
  const items = [
    { c: "u", label: "Operational" },
    { c: "d", label: "Partial outage" },
    { c: "x", label: "Major outage" },
    { c: "n", label: "No data yet" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-[11px] text-[#5A6A82]">
      {items.map((it) => (
        <span key={it.c} className="inline-flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-[3px]"
            style={{ background: BAR_COLOR[it.c] }}
            aria-hidden
          />
          {it.label}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------
// Component row + uptime strip
// ---------------------------------------------------------------------

function ComponentRow({ system }: { system: StatusSystem }) {
  const meta = STATE_META[system.state];
  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display font-600 text-[14.5px] text-[#102033] truncate">
            {system.name}
          </p>
          <p className="text-[12px] text-[#8A98AC] truncate">{system.description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {system.responseMs != null && (
            <span className="hidden sm:inline text-[12px] text-[#8A98AC] tabular-nums">
              {system.responseMs} ms
            </span>
          )}
          <span
            className="inline-flex items-center gap-1.5 text-[12.5px] font-display font-600"
            style={{ color: meta.ink }}
          >
            {/* Blinking live dot - same soft cadence as the footer 9A link. */}
            <span
              className="inline-block w-2 h-2 rounded-full status-blink"
              style={{ background: BAR_COLOR[stateChar(system.state)] }}
              aria-hidden
            />
            {meta.label}
          </span>
        </div>
      </div>

      <UptimeStrip
        bars={system.bars}
        startSec={system.barsStartSec}
        uptime90={system.uptime.d90}
      />
    </div>
  );
}

function UptimeStrip({
  bars,
  startSec,
  uptime90,
}: {
  bars: string;
  startSec: number;
  uptime90: number;
}) {
  const chars = bars.split("");
  // hover follows the pointer; pinned stays after a click / tap.
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const shown = hover !== null ? hover : pinned;

  return (
    <div className="mt-3">
      <div className="relative">
        {shown !== null && (
          <BarTooltip
            index={shown}
            total={chars.length}
            char={chars[shown]}
            date={new Date((startSec + shown * DAY_SECS) * 1000)}
          />
        )}
        <div
          className="flex items-stretch gap-px sm:gap-[2px] h-[32px]"
          role="img"
          aria-label={`90-day uptime history, ${formatUptime(uptime90)} uptime`}
        >
          {chars.map((c, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setPinned((p) => (p === i ? null : i))}
              aria-label={`${formatDayShort(new Date((startSec + i * DAY_SECS) * 1000))}: ${BAR_LABEL[c] ?? "No data"}`}
              className="flex-1 min-w-0 rounded-full origin-bottom transition-transform duration-150 hover:scale-y-[1.18] focus:outline-none focus-visible:scale-y-[1.18]"
              style={{ background: BAR_COLOR[c] ?? BAR_COLOR.n }}
            />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#8A98AC]">
        <span>90 days ago</span>
        <span className="tabular-nums">{formatUptime(uptime90)} uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function BarTooltip({
  index,
  total,
  char,
  date,
}: {
  index: number;
  total: number;
  char: string;
  date: Date;
}) {
  // Clamp so tooltips near the ends stay inside the card.
  const leftPct = Math.min(94, Math.max(6, ((index + 0.5) / total) * 100));
  const color = BAR_COLOR[char] ?? BAR_COLOR.n;
  return (
    <div
      className="absolute bottom-full mb-2 z-20 -translate-x-1/2 pointer-events-none status-tip"
      style={{ left: `${leftPct}%` }}
    >
      <div className="glass-strong rounded-[10px] px-3 py-2 whitespace-nowrap shadow-[0_16px_40px_-16px_rgba(16,32,51,0.4)]">
        <p className="text-[11.5px] font-display font-600 text-[#102033] flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} aria-hidden />
          {formatDayShort(date)}
        </p>
        <p className="text-[11px] text-[#5A6A82] mt-0.5">
          {BAR_LABEL[char] ?? "No data"} · {BAR_DETAIL[char] ?? ""}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Past incidents - collapsible, grouped by day (most recent first)
// ---------------------------------------------------------------------

const INCIDENT_DAYS = 14;

function PastIncidents({ data }: { data: StatusPayload | null }) {
  const [open, setOpen] = useState(false);

  // Use the server snapshot time as the reference "now" so the day grid is
  // identical on server and client (no hydration mismatch).
  const refSec = data ? Math.floor(data.updatedAt / 1000) : 0;
  const days = useMemo(() => {
    const todayStart = Math.floor(refSec / DAY_SECS) * DAY_SECS;
    const out: { start: number; items: StatusPayload["incidents"] }[] = [];
    for (let i = 0; i < INCIDENT_DAYS; i += 1) {
      const start = todayStart - i * DAY_SECS;
      const end = start + DAY_SECS;
      const items = (data?.incidents ?? []).filter((inc) => inc.at >= start && inc.at < end);
      out.push({ start, items });
    }
    return out;
  }, [data, refSec]);

  if (!data) {
    return (
      <div className="glass rounded-[18px] px-6 py-8 text-center text-[#5A6A82]">
        Loading incident history…
      </div>
    );
  }

  const total = data.incidents.length;
  const clean = total === 0;
  const summary = clean
    ? `No incidents reported in the last ${INCIDENT_DAYS} days`
    : `${total} incident${total === 1 ? "" : "s"} in the last ${INCIDENT_DAYS} days`;

  return (
    <div className="glass rounded-[18px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 md:px-6 py-4 text-left hover:bg-white/40 transition-colors"
      >
        <span className="flex items-center gap-2.5 text-[13.5px] font-display font-600 text-[#102033]">
          {clean ? <CheckIcon /> : <AlertIcon />}
          {summary}
        </span>
        <span className="flex items-center gap-2 text-[12px] text-[#5A6A82]">
          <span className="hidden sm:inline">{open ? "Hide" : "View"} history</span>
          <Chevron open={open} />
        </span>
      </button>

      {open && (
        <div className="px-5 md:px-6 pb-2 border-t border-[rgba(16,32,51,0.07)] divide-y divide-[rgba(16,32,51,0.07)] status-expand">
          {days.map((day) => (
            <div key={day.start} className="py-4">
              <p className="font-display font-600 text-[13.5px] text-[#102033]">
                {formatFullDate(day.start)}
              </p>
              {day.items.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {day.items.map((inc, i) => (
                    <li key={`${inc.at}-${i}`} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ background: inc.durationSec === 0 ? "#EF4444" : "#F59E0B" }}
                        aria-hidden
                      />
                      <span className="text-[13px] text-[#2B3950]">
                        <span className="font-600 text-[#102033]">{inc.system}</span> — {inc.reason}
                        <span className="text-[#8A98AC]">
                          {" ("}
                          {inc.durationSec === 0 ? "ongoing" : `down ${formatDuration(inc.durationSec)}`}
                          {")"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-[12.5px] text-[#8A98AC]">No incidents reported.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Icons + keyframes
// ---------------------------------------------------------------------

function BannerIcon({ state }: { state: SystemState }) {
  const ok = state === "operational";
  return (
    <span
      className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/20"
      aria-hidden
    >
      {ok ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="rgba(34,197,94,0.14)" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="rgba(245,158,11,0.16)" />
      <path d="M12 8v4m0 4h.01" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusKeyframes() {
  return (
    <style>{`
      @keyframes status-blink { 0%,100%{opacity:1} 50%{opacity:.4} }
      .status-blink { animation: status-blink 1.4s ease-in-out infinite; }
      @keyframes status-tip-in { from{opacity:0; transform:translate(-50%,4px)} to{opacity:1; transform:translate(-50%,0)} }
      .status-tip { animation: status-tip-in .14s ease-out; }
      @keyframes status-expand-in { from{opacity:0; transform:translateY(-4px)} to{opacity:1; transform:none} }
      .status-expand { animation: status-expand-in .22s ease-out; }
      @media (prefers-reduced-motion: reduce){
        .status-blink,.status-tip,.status-expand{animation:none}
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------

function stateChar(state: SystemState): string {
  if (state === "operational") return "u";
  if (state === "degraded") return "d";
  if (state === "down") return "x";
  return "n";
}

// One plain sentence describing the current status - the line search and
// AI engines quote. Built from the live data so it is always accurate.
function summaryLine(data: StatusPayload): string {
  const systems = data.groups.flatMap((g) => g.systems);
  const n = systems.length;
  const op = systems.filter((s) => s.state === "operational").length;
  const avg = n ? systems.reduce((sum, s) => sum + s.uptime.d90, 0) / n : 100;
  const avgStr = avg >= 100 ? "100%" : `${avg.toFixed(2)}%`;
  const inc = data.incidents.length;
  const incShort = inc === 0 ? "no incidents" : `${inc} incident${inc === 1 ? "" : "s"}`;
  const lead =
    data.overall === "operational"
      ? `As of the latest check, all ${n} EDUS services are operational.`
      : `As of the latest check, ${op} of ${n} EDUS services are operational.`;
  return `${lead} Over the past 90 days, average uptime is ${avgStr} with ${incShort}.`;
}

function formatUptime(n: number): string {
  if (n >= 100) return "100%";
  return `${n.toFixed(2)}%`;
}

function relativeTime(updatedAtMs: number): string {
  const secs = Math.max(0, Math.round((Date.now() - updatedAtMs) / 1000));
  if (secs < 20) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
}

function formatDuration(secs: number): string {
  if (secs < 60) return `${secs}s`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"}`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${hours}h ${rem}m` : `${hours}h`;
}

function formatDayShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatFullDate(unixSecs: number): string {
  return new Date(unixSecs * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
