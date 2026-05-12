import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form handler.
 *
 * Receives JSON from `components/shared/ContactForm.tsx`, validates, and
 * forwards to CONTACT_TO_EMAIL via AWS SES SMTP. Replies are routed back
 * to the visitor's email via the Reply-To header so the inquiry can be
 * answered directly from the inbox.
 *
 * Spam controls:
 *   - honeypot field `_company` (must be empty)
 *   - length caps on every field
 *   - minimal phone shape check
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME = 120;
const MAX_PHONE = 30;
const MAX_EMAIL = 160;
const MAX_REGION = 60;
const MAX_MESSAGE = 1000;

function bad(reason: string) {
  return NextResponse.json({ ok: false, error: reason }, { status: 400 });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "EDUS Inquiries";

  if (!host || !user || !pass || !toEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request body");
  }

  // Honeypot — real users can't fill this hidden field.
  if (typeof body._company === "string" && body._company.trim().length > 0) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const parentName = typeof body.parentName === "string" ? body.parentName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const region = typeof body.region === "string" ? body.region.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!parentName || parentName.length > MAX_NAME) return bad("Name is required");
  if (!phone || phone.length > MAX_PHONE) return bad("Phone is required");
  if (!/^[\d\s+()-]{7,20}$/.test(phone)) return bad("Enter a valid phone number");
  if (email.length > MAX_EMAIL) return bad("Email is too long");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Enter a valid email");
  if (region.length > MAX_REGION) return bad("Market field is too long");
  if (message.length > MAX_MESSAGE) return bad("Message is too long");

  const subject = `EDUS contact form — ${parentName}${region ? ` (${region})` : ""}`;

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#102033;line-height:1.6;font-size:14px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#2563EB;">New EDUS contact form submission</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px;">
        <tr><td style="padding:6px 0;color:#5A6A82;width:140px;">Name</td><td style="padding:6px 0;">${escapeHtml(parentName)}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6A82;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(phone)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(phone)}</a></td></tr>
        ${email ? `<tr><td style="padding:6px 0;color:#5A6A82;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(email)}</a></td></tr>` : ""}
        ${region ? `<tr><td style="padding:6px 0;color:#5A6A82;">Market</td><td style="padding:6px 0;">${escapeHtml(region)}</td></tr>` : ""}
      </table>
      ${
        message
          ? `<div style="margin-top:18px;padding:14px 16px;background:#F4F8FF;border:1px solid rgba(37,99,235,0.18);border-radius:10px;white-space:pre-wrap;">${escapeHtml(message)}</div>`
          : `<p style="margin-top:18px;color:#5A6A82;font-style:italic;">No message provided.</p>`
      }
      <p style="margin-top:24px;font-size:12px;color:#5A6A82;">Submitted via edustutor.com/contact</p>
    </div>
  `;

  const text = [
    `New EDUS contact form submission`,
    ``,
    `Name:   ${parentName}`,
    `Phone:  ${phone}`,
    email ? `Email:  ${email}` : null,
    region ? `Market: ${region}` : null,
    ``,
    message ? `Message:\n${message}` : `No message provided.`,
    ``,
    `Submitted via edustutor.com/contact`,
  ]
    .filter(Boolean)
    .join("\n");

  // Port 587 = STARTTLS; port 465 = implicit TLS.
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject,
      html,
      text,
      ...(email ? { replyTo: email } : {}),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] SES SMTP error:", err);
    const debugMsg =
      process.env.NODE_ENV !== "production" && err instanceof Error
        ? `SES: ${err.message}`
        : "Could not send your inquiry. Please try again later.";
    return NextResponse.json({ ok: false, error: debugMsg }, { status: 502 });
  }
}
