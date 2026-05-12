"use client";

import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";

/* ---------------------------------------------------------------- */
/* Form options - kept short                                         */
/* ---------------------------------------------------------------- */

const REGIONS = [
  "Sri Lanka",
  "India · CBSE",
  "Maldives · Cambridge",
  "Global · One-to-One",
  "Not sure yet",
];

/* ---------------------------------------------------------------- */
/* Social channels - shown beside the form                           */
/* ---------------------------------------------------------------- */

const SOCIALS = [
  { label: "Facebook",  href: "https://www.facebook.com/edusonline" },
  { label: "Instagram", href: "https://www.instagram.com/edus_online/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@edusonline" },
  { label: "YouTube",   href: "https://www.youtube.com/@edusonline/" },
  { label: "LinkedIn",  href: "https://lk.linkedin.com/company/edusonline" },
];

/* ---------------------------------------------------------------- */
/* Types & validation                                                */
/* ---------------------------------------------------------------- */

type FormState = {
  parentName: string;
  phone: string;
  email: string;
  region: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  parentName: "",
  phone: "",
  email: "",
  region: "",
  message: "",
};

const MESSAGE_MAX = 500;

function validate(s: FormState): FieldErrors {
  const errs: FieldErrors = {};
  if (!s.parentName.trim()) errs.parentName = "Required";
  if (!s.phone.trim()) errs.phone = "Required";
  else if (!/^[\d\s+()-]{7,20}$/.test(s.phone.trim())) errs.phone = "Enter a valid number";
  if (s.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) {
    errs.email = "Enter a valid email";
  }
  if (s.message.length > MESSAGE_MAX) errs.message = `Maximum ${MESSAGE_MAX} characters`;
  return errs;
}

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      // Replace with your real endpoint (Formspree, Web3Forms, API route, etc.)
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
      setData(INITIAL);
    } catch {
      setSubmitError("Something went wrong. Please try again or email hello@edustutor.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="inquiry"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      {/* Background glows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={220} color="#2563EB" opacity={[0.06, 0.14]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" right="-4%" size={200} color="#8B5CF6" opacity={[0.06, 0.12]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge max-w-3xl mx-auto">
        {/* Heading */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="text-center"
        >
          <p className="eyebrow"><span className="dot" />Send Us Your Inquiry</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Tell us what you need, and the right EDUS team will{" "}
            <em>contact you.</em>
          </h2>
          <p className="text-[#2B3950] text-[15px] mt-4 leading-[1.65]">
            Five short fields. We will follow up within one business day.
          </p>
        </m.div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <m.div
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mt-10 rounded-3xl glass-strong p-8 md:p-12 text-center"
              role="status"
              aria-live="polite"
            >
              <span className="inline-flex w-14 h-14 rounded-2xl items-center justify-center bg-[#22C55E]/15 text-3xl">
                ✅
              </span>
              <h3 className="heading mt-5" style={{ fontSize: "24px" }}>
                Thank you for contacting <em>EDUS.</em>
              </h3>
              <p className="text-[#2B3950] text-[14.5px] mt-3 leading-[1.65] max-w-md mx-auto">
                Our team will review your inquiry and contact you with the most suitable class,
                tutor, or support option within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn btn-yellow mt-7"
              >
                Send another inquiry
              </button>
            </m.div>
          ) : (
            <m.form
              key="form"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              onSubmit={onSubmit}
              noValidate
              aria-label="EDUS contact form"
              className="mt-10 glass-strong rounded-[28px] p-6 md:p-10"
            >
              <fieldset className="space-y-5" disabled={submitting}>
                {/* Row 1 — Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" required error={errors.parentName}>
                    <Input
                      value={data.parentName}
                      onChange={(v) => set("parentName", v)}
                      autoComplete="name"
                      placeholder="Parent or student name"
                    />
                  </Field>
                  <Field
                    label="Phone Number"
                    required
                    error={errors.phone}
                    hint="Include country code"
                  >
                    <Input
                      value={data.phone}
                      onChange={(v) => set("phone", v)}
                      autoComplete="tel"
                      inputMode="tel"
                      type="tel"
                      placeholder="+94 ..."
                    />
                  </Field>
                </div>

                {/* Row 2 — Email + Region */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" hint="Optional" error={errors.email}>
                    <Input
                      value={data.email}
                      onChange={(v) => set("email", v)}
                      autoComplete="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </Field>
                  <Field label="Market / Pathway">
                    <Select
                      value={data.region}
                      onChange={(v) => set("region", v)}
                      options={REGIONS}
                      placeholder="Choose one"
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field
                  label="How can we help?"
                  hint={`${data.message.length} / ${MESSAGE_MAX}`}
                  error={errors.message}
                >
                  <textarea
                    value={data.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    placeholder="Tell us about the student, subject, grade, or anything else."
                    className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[14.5px] text-[#102033] placeholder:text-[#5A6A82] focus:border-[#2563EB] focus:outline-none transition"
                  />
                </Field>

                {/* Submit */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[11.5px] text-[#5A6A82] max-w-md leading-[1.5]">
                    By submitting, you agree to be contacted by EDUS regarding your inquiry, class
                    options, and student support.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Submit Inquiry"}
                    {!submitting && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>

                {submitError && (
                  <p role="alert" className="text-[13px] text-[#DC2626]">
                    {submitError}
                  </p>
                )}
              </fieldset>

              {/* Divider + Socials */}
              <div className="mt-8 pt-6 border-t border-[rgba(16,32,51,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#5A6A82] font-[family-name:var(--font-display)] font-700 text-center">
                  Or reach us on social
                </p>
                <ul className="mt-4 flex items-center justify-center gap-2">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`EDUS on ${s.label}`}
                        title={`EDUS on ${s.label}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[#5A6A82] hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:-translate-y-0.5 transition shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
                      >
                        <SocialIcon name={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-[12px] text-[#5A6A82]">
                  Email{" "}
                  <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
                    hello@edustutor.com
                  </a>{" "}
                  ·{" "}
                  <a href="tel:+94707072072" className="text-[#2563EB] hover:underline">
                    +94 70 707 2072
                  </a>
                </p>
              </div>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Form primitives                                                   */
/* ---------------------------------------------------------------- */

function Field({
  label, required, error, hint, children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-[12px] font-[family-name:var(--font-display)] font-700 uppercase tracking-[0.10em] text-[#102033]">
          {label}
          {required && <span className="text-[#DC2626] ml-0.5">*</span>}
        </span>
        {hint && !error && (
          <span className="text-[10.5px] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
            {hint}
          </span>
        )}
        {error && (
          <span className="text-[10.5px] text-[#DC2626] font-[family-name:var(--font-display)] font-700">
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Input({
  value, onChange, type = "text", placeholder, autoComplete, inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text" | "numeric" | "decimal";
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[14.5px] text-[#102033] placeholder:text-[#5A6A82] focus:border-[#2563EB] focus:outline-none transition"
    />
  );
}

function Select({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[14.5px] text-[#102033] focus:border-[#2563EB] focus:outline-none transition appearance-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A6A82' stroke-width='2.4'%3E%3Cpath d='M6 9l6 6 6-6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        paddingRight: "2.5rem",
      }}
    >
      <option value="">{placeholder ?? "Select"}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

/* ---------------------------------------------------------------- */
/* Social icons - matches SiteFooter SVG set                         */
/* ---------------------------------------------------------------- */

function SocialIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  switch (name) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.5-1.5h1.7V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.1H7.5V13h2.8v8h3.2z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2C8.9 4.2 8.5 4.2 7.3 4.3c-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.5 2.6 9.9 2.6 12s0 2.5.1 3.1c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zm5.6-7.4a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M20 8.6c-1.7 0-3.3-.6-4.5-1.7v7.6c0 3.2-2.6 5.8-5.8 5.8-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.1-.9-.1-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7V2.2h3c.1 1 .4 1.9.9 2.7.5.7 1.2 1.3 2 1.7.8.4 1.6.6 2.5.6v3.4z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M23 7.2s-.2-1.5-.9-2.2c-.9-.9-1.9-.9-2.4-1C16.4 3.8 12 3.8 12 3.8s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.7 1 7.2 1 7.2S.8 9 .8 10.8v1.6C.8 14.2 1 16 1 16s.2 1.5.9 2.2c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.6c0-1.8-.2-3.6-.2-3.6zM9.7 14.5V8l5.7 3.3-5.7 3.2z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <path d="M20.5 2h-17C2.7 2 2 2.7 2 3.5v17c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-17c0-.8-.7-1.5-1.5-1.5zM8 19H5V9h3v10zM6.5 7.7C5.6 7.7 4.9 7 4.9 6.1S5.6 4.5 6.5 4.5s1.6.7 1.6 1.6S7.4 7.7 6.5 7.7zM19 19h-3v-5.3c0-1.3-.5-2.2-1.6-2.2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.6 1.3 3.6 4.1V19z" />
        </svg>
      );
    default:
      return null;
  }
}
