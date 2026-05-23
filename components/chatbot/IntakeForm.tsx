"use client";
import { useState } from "react";
import type { IntakePayload } from "@/lib/chatbot/types";

/**
 * Pre-chat intake form. Shown inside the chat panel BEFORE the
 * conversation begins. Captures the six facts the bot needs to skip
 * over the "what is your name / what grade / what medium" interrogation
 * and start with a useful recommendation:
 *
 *   1. Full name        (parent or student)
 *   2. Phone            (international format)
 *   3. Country          (Sri Lanka / India / Maldives / UK / UAE / ...)
 *   4. Syllabus         (National / Cambridge / Edexcel / CBSE / IGCSE / Other)
 *   5. Grade            (3 - A/L)
 *   6. Medium           (Tamil / English / Sinhala)
 *
 * Once submitted, the parent payload is handed to the chat panel, which
 * sends it server-side on every /api/chat request so the system prompt
 * can personalise the conversation.
 *
 * Why a form vs continued conversation?
 *   - Six form fields beats six conversational turns. Forms feel
 *     deliberate; chat-based intake feels like an interview.
 *   - Pre-collecting raw facts means the LLM never has to parse
 *     phone numbers or country names out of free-form text - eliminates
 *     a class of "I think they said +94 77 maybe" extraction failures.
 *   - The lead-capture endpoint receives a guaranteed-clean payload
 *     instead of trusting the LLM's free-form extraction.
 *
 * Accessibility:
 *   - Every input has a label, every required field has aria-required.
 *   - Submit button is disabled until validation passes (visible state).
 *   - Errors are announced via aria-describedby on the failing field.
 */

type Props = {
  onSubmit: (intake: IntakePayload) => void;
};

// Option lists. Kept as compact tuples to minimise component bundle size.
const COUNTRIES = [
  "Sri Lanka",
  "India",
  "Maldives",
  "UAE",
  "Qatar",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Singapore",
  "Malaysia",
  "Other",
];

const SYLLABUSES = [
  "National Syllabus (Sri Lanka)",
  "Cambridge IGCSE / O-Level / A-Level",
  "Edexcel IGCSE / GCSE / A-Level",
  "CBSE (India)",
  "International Baccalaureate (IB)",
  "Other",
];

const GRADES = [
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "A/L 2026",
  "A/L 2027",
  "A/L 2028",
  "Other",
];

const MEDIUMS = ["Tamil", "English", "Sinhala"];

export function IntakeForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [syllabus, setSyllabus] = useState("National Syllabus (Sri Lanka)");
  const [grade, setGrade] = useState("Grade 6");
  const [medium, setMedium] = useState("Tamil");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Phone validation: permissive international shape. Same regex as the
  // /api/lead server-side validator so client + server agree.
  const isPhoneValid = /^\+?[\d\s\-()]{7,30}$/.test(phone.trim());
  const isNameValid = name.trim().length > 1;
  const canSubmit = isNameValid && isPhoneValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      if (!isPhoneValid) setPhoneError("Enter a valid phone number");
      return;
    }
    setPhoneError(null);
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      country,
      syllabus,
      grade,
      medium,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto px-4 py-4 bg-[#F8FBFF]"
      noValidate
    >
      <div className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_6px_18px_-10px_rgba(16,32,51,0.18)]">
        <p className="font-display font-700 text-[15px] text-[#102033] leading-snug">
          Quick start
        </p>
        <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
          Share a few details so I can match you to the right class faster.
        </p>

        <div className="mt-4 space-y-3">
          <Field id="intake-name" label="Full name">
            <input
              id="intake-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 120))}
              required
              aria-required
              placeholder="e.g. Suresh Kumar"
              className={inputClass}
            />
          </Field>

          <Field
            id="intake-phone"
            label="Phone (with country code)"
            error={phoneError ?? undefined}
          >
            <input
              id="intake-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.slice(0, 30));
                if (phoneError) setPhoneError(null);
              }}
              required
              aria-required
              aria-invalid={phoneError ? "true" : "false"}
              aria-describedby={phoneError ? "intake-phone-error" : undefined}
              placeholder="+94 77 123 4567"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field id="intake-country" label="Country">
              <select
                id="intake-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={selectClass}
              >
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field id="intake-grade" label="Grade">
              <select
                id="intake-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className={selectClass}
              >
                {GRADES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="intake-syllabus" label="Syllabus">
            <select
              id="intake-syllabus"
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              className={selectClass}
            >
              {SYLLABUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field id="intake-medium" label="Medium">
            <div className="flex gap-2" role="radiogroup" aria-label="Medium">
              {MEDIUMS.map((m) => {
                const selected = medium === m;
                return (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMedium(m)}
                    className={[
                      "flex-1 px-3 py-2 rounded-lg text-[13.5px] font-display font-600 transition",
                      selected
                        ? "bg-[#2563EB] text-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)]"
                        : "bg-[#F4F8FF] text-[#2B3950] border border-[rgba(16,32,51,0.10)] hover:border-[#2563EB]/40",
                    ].join(" ")}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-5 w-full rounded-xl py-2.5 text-white text-[14px] font-display font-700 shadow-[0_6px_18px_-6px_rgba(37,99,235,0.55)] transition disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
          }}
        >
          Start chat
        </button>

        <p className="mt-3 text-[10.5px] text-[#5A6A82] leading-[1.5] text-center">
          By starting, you agree to share these details with the EDUS academic team.
        </p>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- */
/* Internal field wrapper - keeps label + input + error in one place */
/* --------------------------------------------------------------- */
function Field({
  id,
  label,
  children,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.1em] font-display font-700 text-[#5A6A82] mb-1"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[11px] text-[#DC2626] mt-1"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition placeholder:text-[#5A6A82]/60";

const selectClass =
  "w-full rounded-lg border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition";
