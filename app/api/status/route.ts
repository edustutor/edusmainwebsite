import { NextResponse } from "next/server";
import { getSystemStatus } from "@/lib/status";

/**
 * Live system-status feed for the /status page.
 *
 * The client board polls this every 60s to refresh without a full reload.
 * getSystemStatus() already caches the UptimeRobot call in memory for 60s,
 * so this endpoint is cheap to hit. The Cache-Control header lets any CDN
 * in front of the app share one response per minute across all visitors.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSystemStatus();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
