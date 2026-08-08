/**
 * EDUS system status - UptimeRobot data layer.
 * ----------------------------------------------------------------------
 * Single source of truth for the /status page and the /api/status poll
 * endpoint. Calls the UptimeRobot v2 API once, shapes the raw monitors
 * into a clean public payload (grouped systems, uptime %, response time,
 * incident feed), and caches the result in memory for 60s so repeated
 * page loads and client polls never hammer UptimeRobot's rate limit.
 *
 * The API key below is a READ-ONLY UptimeRobot key. It can only list
 * monitor status - it cannot create, edit, pause, or delete anything.
 * It is intentionally committed (not an env var) because the status data
 * it exposes is public by design, and this module only ever runs on the
 * server (imported by the route handler and the server page), so the key
 * is never shipped in client JavaScript.
 *
 * Why v2 and not v3: v2's getMonitors returns uptime ratios, response
 * times, and incident logs in ONE call. v3's per-day uptime histogram is
 * empty until a monitor has accumulated history, so v2 is the reliable
 * choice for a status page today.
 */

const UPTIMEROBOT_READONLY_KEY = "ur3697721-5a9c76988ca288dd84df84d1";
const ENDPOINT = "https://api.uptimerobot.com/v2/getMonitors";

// In-memory cache. The Next server process is long-lived, so this map
// persists across requests and keeps UptimeRobot calls to at most one
// per minute regardless of traffic.
const CACHE_TTL_MS = 60_000;
const UPSTREAM_TIMEOUT_MS = 12_000;

// ---------------------------------------------------------------------
// Public payload types
// ---------------------------------------------------------------------

export type SystemState =
  | "operational"
  | "degraded"
  | "down"
  | "maintenance"
  | "unknown";

export type StatusSystem = {
  id: number;
  name: string;
  group: string;
  description: string;
  state: SystemState;
  /** Uptime percentages for the last 24h, 7d, 30d, 90d. */
  uptime: { d1: number; d7: number; d30: number; d90: number };
  /** Latest response time in milliseconds, or null when unmeasured. */
  responseMs: number | null;
  /**
   * 90-day uptime history, one character per day, oldest first:
   *   'u' up   'd' partial outage   'x' major outage   'n' no data yet
   * Rendered as the Statuspage-style bar strip on the /status page.
   */
  bars: string;
  /** Unix seconds of the first bar's day (UTC midnight). */
  barsStartSec: number;
};

export type StatusIncident = {
  system: string;
  /** Unix seconds when the outage started. */
  at: number;
  /** How long the outage lasted, in seconds. 0 means still ongoing. */
  durationSec: number;
  reason: string;
};

export type StatusGroup = {
  name: string;
  systems: StatusSystem[];
};

export type StatusPayload = {
  ok: boolean;
  overall: SystemState;
  /** Unix milliseconds of the last successful UptimeRobot read. */
  updatedAt: number;
  groups: StatusGroup[];
  incidents: StatusIncident[];
  /** True when we are serving the last good cache after an upstream error. */
  stale: boolean;
  error?: string;
};

// ---------------------------------------------------------------------
// Curation - map raw monitors to clean public labels and groups.
// ---------------------------------------------------------------------

type Label = { name: string; group: string; description: string };

// Explicit labels keyed by the monitor's friendly name in UptimeRobot.
// Anything not listed still shows up (see prettify below) so newly added
// monitors are never silently dropped - only the internal environments in
// HIDDEN_PATTERN are excluded from the public page.
const LABELS: Record<string, Label> = {
  "EDUS LMS - Production": {
    name: "Learning Platform (LMS API)",
    group: "Core Platform",
    description: "Live classes, homework, attendance, and payments API",
  },
  "EDUS LMS - Dev": {
    name: "Learning Platform - Dev / Staging",
    group: "Development",
    description: "Internal development and testing environment",
  },
  "https://signup.edustutor.com": {
    name: "Student Signup & Enrolment",
    group: "Core Platform",
    description: "New student registration and onboarding",
  },
  "https://edustutor.com": {
    name: "Main Website",
    group: "Websites",
    description: "edustutor.com public site",
  },
  "https://edus.lk": {
    name: "EDUS.lk Website",
    group: "Websites",
    description: "Sri Lanka domain (edus.lk)",
  },
  "http://crm.edustutor.com": {
    name: "CRM & Staff Console",
    group: "Internal Tools",
    description: "Staff operations and administration",
  },
};

// Every monitor is shown. To hide a monitor from the public page later,
// add its friendly name to this set.
const HIDDEN_NAMES = new Set<string>();

// Fixed display order for the groups. Unknown groups fall to the end.
const GROUP_ORDER = [
  "Core Platform",
  "Websites",
  "Internal Tools",
  "Development",
  "Other Systems",
];

// ---------------------------------------------------------------------
// Raw UptimeRobot response (only the fields we read).
// ---------------------------------------------------------------------

type RawLog = {
  type: number; // 1 = down, 2 = up, 99 = paused
  datetime: number;
  duration: number;
  reason?: { code?: string; detail?: string };
};

type RawMonitor = {
  id: number;
  friendly_name: string;
  url: string;
  status: number; // 0 paused, 1 not checked, 2 up, 8 seems down, 9 down
  create_datetime: number; // unix secs the monitor was created
  custom_uptime_ratio?: string; // "d1-d7-d30-d90"
  response_times?: { datetime: number; value: number }[];
  logs?: RawLog[];
};

type RawResponse = {
  stat: string;
  error?: { message?: string };
  monitors?: RawMonitor[];
};

// ---------------------------------------------------------------------
// Mapping helpers
// ---------------------------------------------------------------------

// UptimeRobot status code -> our public state.
function toState(status: number): SystemState {
  if (status === 2) return "operational";
  if (status === 8) return "degraded";
  if (status === 9) return "down";
  if (status === 0) return "maintenance";
  return "unknown";
}

// Turn a URL-style friendly name into a readable label for monitors that
// are not in the LABELS map (e.g. "https://foo.edustutor.com/" -> "foo").
function prettify(friendlyName: string): string {
  const looksLikeUrl = /^https?:\/\//i.test(friendlyName);
  if (!looksLikeUrl) return friendlyName;
  return friendlyName.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
}

// "100.000-99.980-100.000-99.900" -> { d1, d7, d30, d90 } as numbers.
function parseUptime(ratio: string | undefined): StatusSystem["uptime"] {
  const parts = (ratio ?? "").split("-").map((p) => Number(p));
  const clean = (n: number) => (Number.isFinite(n) ? n : 100);
  return {
    d1: clean(parts[0]),
    d7: clean(parts[1]),
    d30: clean(parts[2]),
    d90: clean(parts[3]),
  };
}

// down > degraded > operational. maintenance / unknown never worsen the
// overall banner unless every visible system is in that state.
function computeOverall(systems: StatusSystem[]): SystemState {
  if (systems.length === 0) return "unknown";
  if (systems.some((s) => s.state === "down")) return "down";
  if (systems.some((s) => s.state === "degraded")) return "degraded";
  if (systems.some((s) => s.state === "operational")) return "operational";
  if (systems.every((s) => s.state === "maintenance")) return "maintenance";
  return "unknown";
}

// Number of days shown in the uptime bar strip.
const BARS_DAYS = 90;
const DAY_SECS = 86400;

// Reconstruct the 90-day uptime strip from the monitor's creation date and
// its down logs. Each returned character is one day (oldest first):
//   'u' up   'd' partial outage (<1h down)   'x' major outage (>=1h down)
//   'n' no data (the day was entirely before the monitor was created)
// A day after creation with no "down" log counts as up, which is correct
// because UptimeRobot records every outage in the logs.
function buildBars(createSec: number, logs: RawLog[]): { bars: string; startSec: number } {
  const nowSec = Math.floor(Date.now() / 1000);
  const todayStart = Math.floor(nowSec / DAY_SECS) * DAY_SECS;
  const startSec = todayStart - (BARS_DAYS - 1) * DAY_SECS;
  const downLogs = logs.filter((l) => l.type === 1);

  let bars = "";
  for (let i = 0; i < BARS_DAYS; i += 1) {
    const dayStart = startSec + i * DAY_SECS;
    const dayEnd = dayStart + DAY_SECS;
    if (dayEnd <= createSec) {
      bars += "n";
      continue;
    }
    let downSecs = 0;
    for (const log of downLogs) {
      const ds = log.datetime;
      // A log with duration 0 is an ongoing outage - count it up to now.
      const de = log.duration ? log.datetime + log.duration : nowSec;
      const overlapStart = Math.max(dayStart, ds);
      const overlapEnd = Math.min(dayEnd, de);
      if (overlapEnd > overlapStart) downSecs += overlapEnd - overlapStart;
    }
    if (downSecs >= 3600) bars += "x";
    else if (downSecs > 0) bars += "d";
    else bars += "u";
  }
  return { bars, startSec };
}

// ---------------------------------------------------------------------
// Fetch + build
// ---------------------------------------------------------------------

async function fetchAndBuild(): Promise<StatusPayload> {
  const body = new URLSearchParams({
    api_key: UPTIMEROBOT_READONLY_KEY,
    format: "json",
    logs: "1",
    logs_limit: "50", // enough down events to reconstruct 90 days of bars
    log_types: "1-2", // down + up events only (skip paused noise)
    custom_uptime_ratios: "1-7-30-90",
    response_times: "1",
    response_times_limit: "1",
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  let json: RawResponse;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body,
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`UptimeRobot HTTP ${res.status}`);
    json = (await res.json()) as RawResponse;
  } finally {
    clearTimeout(timer);
  }

  if (json.stat !== "ok" || !json.monitors) {
    throw new Error(json.error?.message ?? "UptimeRobot returned an error");
  }

  const visible = json.monitors.filter((m) => !HIDDEN_NAMES.has(m.friendly_name));

  const systems: StatusSystem[] = visible.map((m) => {
    const label = LABELS[m.friendly_name];
    const latest = m.response_times?.[0]?.value;
    const barData = buildBars(m.create_datetime, m.logs ?? []);
    return {
      id: m.id,
      name: label?.name ?? prettify(m.friendly_name),
      group: label?.group ?? "Other Systems",
      description: label?.description ?? m.url,
      state: toState(m.status),
      uptime: parseUptime(m.custom_uptime_ratio),
      responseMs: typeof latest === "number" ? latest : null,
      bars: barData.bars,
      barsStartSec: barData.startSec,
    };
  });

  // Group the systems in the fixed display order.
  const byGroup = new Map<string, StatusSystem[]>();
  for (const sys of systems) {
    const arr = byGroup.get(sys.group) ?? [];
    arr.push(sys);
    byGroup.set(sys.group, arr);
  }
  const groups: StatusGroup[] = [...byGroup.keys()]
    .sort((a, b) => {
      const ai = GROUP_ORDER.indexOf(a);
      const bi = GROUP_ORDER.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map((name) => ({ name, systems: byGroup.get(name) ?? [] }));

  // Incident feed - down events across all visible monitors, newest first.
  const incidents: StatusIncident[] = [];
  for (const m of visible) {
    const label = LABELS[m.friendly_name];
    const systemName = label?.name ?? prettify(m.friendly_name);
    for (const log of m.logs ?? []) {
      if (log.type !== 1) continue; // only "down" starts an incident
      incidents.push({
        system: systemName,
        at: log.datetime,
        durationSec: log.duration ?? 0,
        reason: log.reason?.detail || "Service interruption",
      });
    }
  }
  incidents.sort((a, b) => b.at - a.at);

  return {
    ok: true,
    overall: computeOverall(systems),
    updatedAt: Date.now(),
    groups,
    incidents: incidents.slice(0, 12),
    stale: false,
  };
}

// ---------------------------------------------------------------------
// Public entry point (used by the route handler and the server page).
// ---------------------------------------------------------------------

let cache: { at: number; data: StatusPayload } | null = null;

export async function getSystemStatus(): Promise<StatusPayload> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.data;
  }
  try {
    const data = await fetchAndBuild();
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    // On an upstream failure, keep serving the last good snapshot so a
    // brief UptimeRobot hiccup never blanks the status page. Only when we
    // have never succeeded do we return an explicit error payload.
    const message = err instanceof Error ? err.message : "Status unavailable";
    if (cache) {
      return { ...cache.data, stale: true, error: message };
    }
    return {
      ok: false,
      overall: "unknown",
      updatedAt: Date.now(),
      groups: [],
      incidents: [],
      stale: true,
      error: message,
    };
  }
}
