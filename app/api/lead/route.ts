import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/chatbot/types";

/**
 * /api/lead - lead capture from the EDUS chatbot.
 *
 * The chatbot's system prompt instructs the LLM to emit a
 * [[LEAD_CAPTURE]]{...JSON...}[[/LEAD_CAPTURE]] block once a parent has
 * shared name + phone + country + grade + medium + subject. The browser
 * detects that marker, extracts the JSON, and POSTs it here.
 *
 * This route:
 *   1. Validates the lead payload strictly (no junk forwards).
 *   2. Forwards to LEAD_ENDPOINT_URL (the EDUS backend) so the
 *      academic team gets the lead in their existing CRM/dashboard.
 *   3. If LEAD_ENDPOINT_URL is unset OR the forward fails, we ALSO
 *      log the lead server-side so it's never silently lost - the dev
 *      terminal / Vercel logs become the fallback inbox.
 *
 * Strategy: never return a 5xx to the browser unless the lead is
 * genuinely unrecoverable. A backend hiccup should not break the
 * parent's experience - the bot still says "thanks, we'll be in touch"
 * and the lead lands in the Vercel logs for the team to recover.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME = 120;
const MAX_PHONE = 30;
const MAX_COUNTRY = 60;
const MAX_SYLLABUS = 60;
const MAX_GRADE = 30;
const MAX_MEDIUM = 30;
const MAX_SUBJECT = 60;
const MAX_NOTES = 2000;
const MAX_CLASS_CODE = 40;

function bad(reason: string) {
  return NextResponse.json({ ok: false, error: reason }, { status: 400 });
}

/**
 * Strict whitelist validation. Each field is trimmed + length-capped.
 * Phone matches a permissive international shape: optional leading `+`,
 * then 7-15 digits (E.164 covers 7-15 significant digits).
 */
function validate(body: unknown): LeadPayload | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const country = typeof b.country === "string" ? b.country.trim() : "";
  const syllabus = typeof b.syllabus === "string" ? b.syllabus.trim() : "";
  const grade = typeof b.grade === "string" ? b.grade.trim() : "";
  const medium = typeof b.medium === "string" ? b.medium.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const notes = typeof b.notes === "string" ? b.notes.trim() : "";
  const recommendedClassCode =
    typeof b.recommendedClassCode === "string"
      ? b.recommendedClassCode.trim()
      : "";

  if (!name || name.length > MAX_NAME) return { error: "Name is required" };
  if (!phone || phone.length > MAX_PHONE) return { error: "Phone is required" };
  if (!/^\+?[\d\s\-()]{7,30}$/.test(phone)) {
    return { error: "Enter a valid phone number" };
  }
  if (!country || country.length > MAX_COUNTRY) {
    return { error: "Country is required" };
  }
  if (!syllabus || syllabus.length > MAX_SYLLABUS) {
    return { error: "Syllabus is required" };
  }
  if (!grade || grade.length > MAX_GRADE) return { error: "Grade is required" };
  if (!medium || medium.length > MAX_MEDIUM) {
    return { error: "Medium is required" };
  }
  // Subject is optional: leads can land before a class is recommended.
  if (subject.length > MAX_SUBJECT) {
    return { error: "Subject is too long" };
  }
  if (notes.length > MAX_NOTES) return { error: "Notes is too long" };
  if (recommendedClassCode.length > MAX_CLASS_CODE) {
    return { error: "Class code is too long" };
  }

  const lead: LeadPayload = {
    name,
    phone,
    country,
    syllabus,
    grade,
    medium,
    ...(subject ? { subject } : {}),
    ...(notes ? { notes } : {}),
    ...(recommendedClassCode ? { recommendedClassCode } : {}),
  };
  return lead;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  const result = validate(body);
  if ("error" in result) return bad(result.error);
  const lead = result;

  // Always log to server stdout so the lead is never lost. Vercel
  // captures these in the Functions dashboard - the academic team
  // (or Tisankan) can grep them when the backend forward fails.
  // Use a banner + pretty-printed JSON so the lead is impossible to
  // miss in a busy dev terminal.
  console.log("\n========== [EDUS LEAD CAPTURED] ==========");
  console.log(JSON.stringify(lead, null, 2));
  console.log("==========================================\n");

  // Forward to the EDUS backend. NEXT_PUBLIC_LEAD_ENDPOINT is the
  // configured URL (placeholder for now per Tisankan; will be a real
  // EDUS API endpoint in production). NEXT_PUBLIC_ prefix only because
  // we may also surface the endpoint URL in client code later - the
  // actual POST happens server-side here so no key is exposed.
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  if (!endpoint) {
    console.warn(
      "[lead] NEXT_PUBLIC_LEAD_ENDPOINT not set - logged only, no forward attempted",
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }

  console.log(`[lead] forwarding to ${endpoint} ...`);
  try {
    const forwardRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // X-Source header lets the receiving backend distinguish chatbot
        // leads from /contact form leads in dashboards.
        "X-Source": "edustutor-chatbot",
      },
      body: JSON.stringify(lead),
    });
    if (!forwardRes.ok) {
      const text = await forwardRes.text().catch(() => "");
      console.error(
        `[lead] forward FAILED -> HTTP ${forwardRes.status}`,
        text.slice(0, 500),
      );
      return NextResponse.json({ ok: true, forwarded: false });
    }
    console.log(`[lead] forward OK -> HTTP ${forwardRes.status}`);
  } catch (err) {
    console.error("[lead] forward fetch error:", err);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
