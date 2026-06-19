"use client";

import { useState } from "react";
import {
  OV,
  QUALIFICATIONS,
  ENGLISH_QUALS,
  PREFERRED_COUNTRIES,
  whatsappUrl,
} from "@/lib/overseas/data";
import { OvIcon } from "@/components/overseas/OvIcon";

/**
 * EDUS Overseas free-consultation form.
 *
 * Lead handling in this build is WhatsApp + email only (no CRM). On
 * submit we compose a single readable message from every field and:
 *   1. open WhatsApp (wa.me) prefilled - the primary, fastest channel
 *      and the conversion target for this section, AND
 *   2. offer a one-tap email fallback (mailto) with the same body.
 *
 * Fields mirror the requirements doc: Full Name, Email, Mobile, Last
 * Qualification (select), Preferred Country (select), English
 * Qualification (multi-select tick). Validation is light and at the
 * edge - required fields gate submit; the rest is free text.
 */

type EnglishQual = (typeof ENGLISH_QUALS)[number];

export function ConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [country, setCountry] = useState("");
  const [englishQuals, setEnglishQuals] = useState<EnglishQual[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function toggleEnglish(q: EnglishQual) {
    setEnglishQuals((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]
    );
  }

  function buildMessage(): string {
    const lines = [
      "New study abroad consultation request:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
      `Last qualification: ${qualification || "-"}`,
      `Preferred country: ${country || "-"}`,
      `English qualification: ${englishQuals.length ? englishQuals.join(", ") : "-"}`,
    ];
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Required-field gate (the only validation the edge needs).
    if (!name.trim() || !email.trim() || !mobile.trim()) {
      setError("Please fill in your name, email, and mobile number.");
      return;
    }
    setError("");
    const message = buildMessage();
    // Open WhatsApp prefilled in a new tab - primary channel.
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function mailtoHref(): string {
    const subject = "Study Abroad Consultation Request";
    return `mailto:${OV.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  }

  if (sent) {
    return (
      <div className="ov-glass-strong rounded-[28px] p-8 sm:p-10 text-center">
        <div
          className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-full"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        >
          <OvIcon name="check" size={28} tint="#fff" />
        </div>
        <h3 className="ov-heading text-[22px] mt-5">Thank you, {name.split(" ")[0] || "there"}!</h3>
        <p className="mt-3 text-[14.5px] text-[var(--ov-ink-soft)] leading-relaxed max-w-md mx-auto">
          WhatsApp should have opened with your details ready to send. If it
          did not, use one of the options below and a counsellor will reply
          shortly.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={whatsappUrl(buildMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="ov-btn ov-btn-teal text-[14px]"
          >
            <OvIcon name="whatsapp" size={18} tint="#fff" />
            Open WhatsApp
          </a>
          <a href={mailtoHref()} className="ov-btn ov-btn-ghost text-[14px]">
            <OvIcon name="mail" size={16} tint="var(--ov-ink)" />
            Email Instead
          </a>
          <a href={`tel:${OV.phoneTel}`} className="ov-btn ov-btn-primary text-[14px]">
            <OvIcon name="phone" size={16} tint="#fff" />
            Call {OV.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ov-glass-strong rounded-[28px] p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kumar Selvarajan"
            className="ov-field"
            autoComplete="name"
          />
        </Field>
        <Field label="Email Address" required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="ov-field"
            autoComplete="email"
          />
        </Field>
        <Field label="Mobile Number" required>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="07X XXX XXXX"
            className="ov-field"
            autoComplete="tel"
          />
        </Field>
        <Field label="Last Qualification">
          <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="ov-field"
          >
            <option value="">Select...</option>
            {QUALIFICATIONS.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Country" full>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="ov-field"
          >
            <option value="">Select a destination...</option>
            {PREFERRED_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* English qualification - tick options */}
      <div className="mt-4">
        <p className="font-display font-700 text-[13px] text-[var(--ov-ink)] mb-2.5">
          English Qualification
        </p>
        <div className="flex flex-wrap gap-2">
          {ENGLISH_QUALS.map((q) => {
            const on = englishQuals.includes(q);
            return (
              <button
                key={q}
                type="button"
                onClick={() => toggleEnglish(q)}
                aria-pressed={on}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-600 transition"
                style={
                  on
                    ? { background: "linear-gradient(135deg, #14B8A6, #0E9488)", color: "#fff" }
                    : { background: "rgba(255,255,255,0.85)", color: "var(--ov-ink-soft)", border: "1px solid var(--ov-rule)" }
                }
              >
                {on && <OvIcon name="check" size={14} tint="#fff" />}
                {q}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-[13px] font-600 text-[var(--ov-coral-deep)]">{error}</p>
      )}

      <button type="submit" className="ov-btn ov-btn-primary w-full mt-6 text-[15px]">
        <OvIcon name="whatsapp" size={18} tint="#fff" />
        Send My Free Consultation Request
      </button>
      <p className="mt-3 text-center text-[12px] text-[var(--ov-ink-mute)]">
        Opens WhatsApp with your details ready to send. No charge, no obligation.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block font-display font-700 text-[13px] text-[var(--ov-ink)] mb-1.5">
        {label}
        {required && <span className="text-[var(--ov-coral-deep)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
