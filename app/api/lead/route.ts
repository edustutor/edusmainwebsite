import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/chatbot/types";
import { isValidNormalisedPhone } from "@/lib/chatbot/countries";

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
 *   2. Builds a Perfex-CRM-shaped lead payload and POSTs it to
 *      https://crm.edustutor.com/api/leads (the EDUS leads pipeline).
 *      Tokenised via the CRM_AUTH_TOKEN env var sent in the `authtoken`
 *      header. Mandatory CRM fields (source, status, assigned) are
 *      baked into the request - status=12 and assigned=1 are the EDUS
 *      defaults agreed with the academic team.
 *   3. If CRM_AUTH_TOKEN is unset OR the forward fails, we ALSO log
 *      the lead server-side so it's never silently lost - the dev
 *      terminal / Vercel logs become the fallback inbox.
 *
 * Strategy: never return a 5xx to the browser unless the lead is
 * genuinely unrecoverable. A backend hiccup should not break the
 * parent's experience - the bot still says "thanks, we'll be in touch"
 * and the lead lands in the Vercel logs for the team to recover.
 *
 * CRM payload shape (Perfex API):
 *   source       String  - "EDUS Chatbot"
 *   status       String  - "12" (default per EDUS team)
 *   assigned     String  - "1"  (default assignee per EDUS team)
 *   name         String  - parent / student full name
 *   phonenumber  String  - international-format phone
 *   country      String  - intake country
 *   description  String  - newline-joined dump of syllabus / grade /
 *                          medium / subject / recommendedClassCode /
 *                          notes so the team sees full context in one
 *                          glance inside Perfex.
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
  // Server-side defence-in-depth: enforce the same EDUS phone format
  // the IntakeForm normaliser produces. Digits only, no leading zero,
  // total length 7-15 (ITU-T E.164). Rejects "+94..." / "0707..." /
  // anything with spaces or symbols.
  if (!isValidNormalisedPhone(phone)) {
    return { error: "Enter a valid phone number (digits only, with country code)" };
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

  // Forward to the EDUS CRM (Perfex-style). The token gives write
  // access to the leads pipeline so it lives ONLY in CRM_AUTH_TOKEN
  // (server-side env). If the token isn't configured locally we skip
  // the forward but still return ok=true to the client - the lead is
  // already preserved in the server logs above.
  const endpoint =
    process.env.CRM_LEAD_ENDPOINT ?? "https://crm.edustutor.com/api/leads";
  const token = process.env.CRM_AUTH_TOKEN;

  if (!token) {
    console.warn(
      "[lead] CRM_AUTH_TOKEN not set - logged only, no CRM forward attempted",
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }

  // Build the Perfex CRM payload. Mandatory fields are spelled out
  // first; optional fields follow with sensible defaults so the EDUS
  // team always gets full context in their dashboard.
  //
  // IMPORTANT: Perfex's POST /api/leads expects classic PHP form-encoded
  // body (`application/x-www-form-urlencoded`), NOT JSON. Smoke-tested
  // live: a JSON body returns 404 with "field is required" errors for
  // every field; URLSearchParams returns 200 + "Lead add successful."
  //
  // The `description` field is the one place where syllabus / grade /
  // medium / subject / recommended class / free-form notes all live -
  // Perfex doesn't have first-class columns for these, so bundling them
  // into description is the cleanest way to surface the context.
  const description = formatDescription(lead);
  const form = new URLSearchParams();
  form.set("source", "EDUS Chatbot");
  // Mandatory defaults agreed with Tisankan / EDUS team:
  //   status=12   - the EDUS team's default "new chatbot lead" status
  //   assigned=1  - default lead owner inside Perfex
  form.set("status", "12");
  form.set("assigned", "1");
  form.set("name", lead.name);
  form.set("phonenumber", lead.phone);
  form.set("country", lead.country);
  form.set("description", description);

  console.log(`[lead] forwarding to CRM ${endpoint} ...`);
  try {
    const forwardRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Perfex CRM auth - the token rides in the `authtoken` header.
        authtoken: token,
      },
      body: form.toString(),
    });
    // Perfex CRM is quirky: it can return HTTP 404 for validation
    // failures (instead of 4xx) while a true success is a clean 200
    // with body `{"status": true, "message": "Lead add successful."}`.
    // We read the body either way for logging context.
    const responseBody = await forwardRes.text().catch(() => "");
    if (!forwardRes.ok) {
      console.error(
        `[lead] CRM forward FAILED -> HTTP ${forwardRes.status}`,
        responseBody.slice(0, 500),
      );
      return NextResponse.json({ ok: true, forwarded: false });
    }
    // Verify the application-level success flag inside the body so we
    // don't claim "forwarded" when the CRM rejected the lead silently.
    let crmSuccess = false;
    try {
      const parsed = JSON.parse(responseBody) as { status?: boolean };
      crmSuccess = parsed?.status === true;
    } catch {
      // Body wasn't JSON - treat HTTP 200 as success by default.
      crmSuccess = true;
    }
    if (!crmSuccess) {
      console.error(
        `[lead] CRM rejected lead at app level -> ${responseBody.slice(0, 500)}`,
      );
      return NextResponse.json({ ok: true, forwarded: false });
    }
    console.log(
      `[lead] CRM forward OK -> HTTP ${forwardRes.status}`,
      responseBody.slice(0, 200),
    );
  } catch (err) {
    console.error("[lead] CRM forward fetch error:", err);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

/**
 * Compose the Perfex `description` blob from every optional field the
 * intake form / chatbot collected. The EDUS team scans this inside the
 * CRM lead card so the format is keep-it-simple key/value lines.
 *
 * NEVER include phone or country here - those go into first-class CRM
 * columns above. Description is for the conversational context only.
 */
function formatDescription(lead: LeadPayload): string {
  const lines: string[] = [];
  lines.push(`Syllabus: ${lead.syllabus}`);
  lines.push(`Grade: ${lead.grade}`);
  lines.push(`Medium: ${lead.medium}`);
  if (lead.subject) lines.push(`Subject: ${lead.subject}`);
  if (lead.recommendedClassCode) {
    lines.push(`Recommended class: ${lead.recommendedClassCode}`);
  }
  if (lead.notes) {
    // Notes can be multi-sentence; isolate them visually so the EDUS
    // team can spot them at a glance.
    lines.push("");
    lines.push("Notes from chat:");
    lines.push(lead.notes);
  }
  lines.push("");
  lines.push("Source: EDUS Chatbot (edustutor.com)");
  return lines.join("\n");
}
