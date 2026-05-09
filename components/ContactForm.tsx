"use client";

import { useState } from "react";
import { m, AnimatePresence } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";

/* ---------------------------------------------------------------- */
/* Form options                                                     */
/* ---------------------------------------------------------------- */

const REGIONS = [
  "Sri Lanka Classes",
  "India Grades 6 to 10",
  "Maldives Classes",
  "Global One to One Classes",
];

const CLASS_TYPES = [
  "Group Class",
  "One to One Class",
  "Exam Preparation",
  "Subject Support",
  "Not Sure",
];

const GRADES = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11 (O/L)", "Grade 12 (A/L)", "Grade 13 (A/L)",
  "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", "Year 13",
];

const SUBJECT_GROUPS: { label: string; subjects: string[] }[] = [
  { label: "Languages", subjects: ["Tamil", "Sinhala", "Hindi", "English"] },
  {
    label: "Sciences & Maths",
    subjects: ["Mathematics", "Science", "Combined Mathematics", "Physics", "Chemistry", "Biology"],
  },
  {
    label: "Humanities",
    subjects: ["Environment / ENV", "ICT", "History", "Geography", "Civics", "Social Science"],
  },
  {
    label: "Cambridge",
    subjects: ["Cambridge Mathematics", "Cambridge Science", "Cambridge English", "Cambridge ICT"],
  },
  {
    label: "Edexcel",
    subjects: ["Edexcel Mathematics", "Edexcel Science", "Edexcel English", "Edexcel ICT"],
  },
];

const CONTACT_METHODS = ["WhatsApp", "Phone Call", "Email"];
const CONTACT_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];

/* ---------------------------------------------------------------- */
/* Types & validation                                                */
/* ---------------------------------------------------------------- */

type FormState = {
  parentName: string;
  whatsapp: string;
  email: string;
  studentName: string;
  grade: string;
  region: string;
  classType: string;
  subjects: string[];
  contactMethod: string;
  contactTime: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  parentName: "",
  whatsapp: "",
  email: "",
  studentName: "",
  grade: "",
  region: "",
  classType: "",
  subjects: [],
  contactMethod: "",
  contactTime: "",
  message: "",
};

const MESSAGE_MAX = 500;

function validate(s: FormState): FieldErrors {
  const errs: FieldErrors = {};
  if (!s.parentName.trim()) errs.parentName = "Required";
  if (!s.whatsapp.trim()) errs.whatsapp = "Required";
  else if (!/^[\d\s+()-]{7,20}$/.test(s.whatsapp.trim())) errs.whatsapp = "Enter a valid number";
  if (!s.studentName.trim()) errs.studentName = "Required";
  if (!s.grade) errs.grade = "Required";
  if (!s.region) errs.region = "Required";
  if (!s.classType) errs.classType = "Required";
  if (s.subjects.length === 0) errs.subjects = "Choose at least one";
  if (s.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) {
    errs.email = "Enter a valid email";
  }
  if (s.message.length > MESSAGE_MAX) errs.message = `Maximum ${MESSAGE_MAX} characters`;
  return errs;
}

/* ---------------------------------------------------------------- */
/* Component                                                         */
/* ---------------------------------------------------------------- */

export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isMobile = useIsMobile();

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleSubject = (subject: string) => {
    setData((d) => {
      const has = d.subjects.includes(subject);
      return {
        ...d,
        subjects: has ? d.subjects.filter((s) => s !== subject) : [...d.subjects, subject],
      };
    });
    if (errors.subjects) setErrors((e) => ({ ...e, subjects: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    try {
      // TODO: wire to a real endpoint (e.g. POST /api/contact).
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setData(INITIAL);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact-form"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      {/* Background glows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <AmbientGlow top="10%" left="-4%" size={260} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={isMobile ? 50 : 80} />
        </div>
        <div className="absolute inset-0">
          <AmbientGlow bottom="6%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.14]} duration={26} delay={3} blur={isMobile ? 50 : 80} />
        </div>
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Contact EDUS</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Get the right learning support <em>for your child.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Tell us what your child needs. The EDUS team will guide you to the right class, subject,
            tutor, or enrolment option.
          </p>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 max-w-3xl mx-auto"
        >
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="EDUS contact form"
            className="glass-strong rounded-[28px] p-6 md:p-10"
          >
            <fieldset className="space-y-6" disabled={submitting}>
              {/* Row 1 - Parent + WhatsApp */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Parent / Guardian Name" required error={errors.parentName}>
                  <Input
                    value={data.parentName}
                    onChange={(v) => set("parentName", v)}
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </Field>
                <Field
                  label="Mobile / WhatsApp Number"
                  required
                  error={errors.whatsapp}
                  hint="Include country code"
                >
                  <Input
                    value={data.whatsapp}
                    onChange={(v) => set("whatsapp", v)}
                    autoComplete="tel"
                    inputMode="tel"
                    type="tel"
                    placeholder="+94 ..."
                  />
                </Field>
              </div>

              {/* Row 2 - Email + Student name */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email Address" hint="Optional" error={errors.email}>
                  <Input
                    value={data.email}
                    onChange={(v) => set("email", v)}
                    autoComplete="email"
                    inputMode="email"
                    type="email"
                    placeholder="parent@example.com"
                  />
                </Field>
                <Field label="Student Name" required error={errors.studentName}>
                  <Input
                    value={data.studentName}
                    onChange={(v) => set("studentName", v)}
                    placeholder="Your child's name"
                  />
                </Field>
              </div>

              {/* Row 3 - Grade + Region */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Student Grade" required error={errors.grade}>
                  <Select
                    value={data.grade}
                    onChange={(v) => set("grade", v)}
                    placeholder="Select grade"
                    options={GRADES}
                  />
                </Field>
                <Field label="Learning Region" required error={errors.region}>
                  <Select
                    value={data.region}
                    onChange={(v) => set("region", v)}
                    placeholder="Select region"
                    options={REGIONS}
                  />
                </Field>
              </div>

              {/* Row 4 - Class type pills */}
              <Field label="Class Type" required error={errors.classType}>
                <PillGroup
                  value={data.classType}
                  onChange={(v) => set("classType", v)}
                  options={CLASS_TYPES}
                />
              </Field>

              {/* Row 5 - Subject multi-select */}
              <Field
                label="Subject(s) Interested In"
                required
                error={errors.subjects}
                hint={data.subjects.length > 0 ? `${data.subjects.length} selected` : "Choose any number"}
              >
                <SubjectMultiSelect selected={data.subjects} onToggle={toggleSubject} />
              </Field>

              {/* Row 6 - Contact method + time */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Preferred Contact Method">
                  <PillGroup
                    value={data.contactMethod}
                    onChange={(v) => set("contactMethod", v)}
                    options={CONTACT_METHODS}
                    compact
                  />
                </Field>
                <Field label="Preferred Contact Time">
                  <PillGroup
                    value={data.contactTime}
                    onChange={(v) => set("contactTime", v)}
                    options={CONTACT_TIMES}
                    compact
                  />
                </Field>
              </div>

              {/* Row 7 - Message */}
              <Field
                label="Anything else we should know?"
                hint={`${data.message.length} / ${MESSAGE_MAX}`}
                error={errors.message}
              >
                <Textarea
                  value={data.message}
                  onChange={(v) => set("message", v.slice(0, MESSAGE_MAX))}
                  placeholder="Specific subjects, exam timelines, learning needs..."
                  rows={4}
                />
              </Field>
            </fieldset>

            {/* Status messages */}
            <AnimatePresence mode="wait">
              {status === "error" && (
                <m.p
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  role="alert"
                  className="mt-6 px-4 py-3 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#7F1D1D] text-[13.5px]"
                >
                  Please check the required fields and submit again.
                </m.p>
              )}
              {status === "success" && (
                <m.p
                  key="ok"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  className="mt-6 px-4 py-3 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] text-[#14532D] text-[13.5px]"
                >
                  Thank you for contacting EDUS. Our team will contact you soon with the right learning option.
                </m.p>
              )}
            </AnimatePresence>

            {/* Submit + trust line */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary justify-center min-w-[180px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Submit Enquiry"}
                {!submitting && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className="text-[12.5px] text-[#5A6A82] leading-relaxed">
                Your details are used only to contact you about EDUS classes.
              </p>
            </div>
          </form>
        </m.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Field primitives                                                  */
/* ---------------------------------------------------------------- */

function Field({
  label, required, hint, error, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-[family-name:var(--font-sans)] font-600 text-[#102033]">
          {label}
          {required && <span aria-hidden className="text-[#EF4444] ml-1">*</span>}
        </span>
        {(hint || error) && (
          <span className={`text-[11.5px] ${error ? "text-[#B91C1C] font-medium" : "text-[#5A6A82]"}`}>
            {error || hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-2xl px-4 py-3 bg-white border border-[rgba(16,32,51,0.10)] " +
  "text-[15px] text-[#102033] placeholder:text-[#9AA5BD] " +
  "shadow-[0_1px_2px_rgba(16,32,51,0.04)] " +
  "transition-colors transition-shadow " +
  "focus:outline-none focus:border-[#2563EB] " +
  "focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]";

function Input({
  value, onChange, type = "text", ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputBase}
      {...rest}
    />
  );
}

function Select({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} appearance-none pr-10 cursor-pointer`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <svg
        aria-hidden
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A6A82]"
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Textarea({
  value, onChange, ...rest
}: {
  value: string;
  onChange: (v: string) => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} resize-y min-h-[112px]`}
      {...rest}
    />
  );
}

function PillGroup({
  value, onChange, options, compact = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            type="button"
            key={o}
            onClick={() => onChange(active ? "" : o)}
            aria-pressed={active}
            className={`px-4 py-2 rounded-full ${compact ? "text-[12.5px]" : "text-[13.5px]"} font-medium font-[family-name:var(--font-sans)] transition border ${
              active
                ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.45)]"
                : "bg-white text-[#2B3950] border-[rgba(16,32,51,0.12)] hover:border-[rgba(37,99,235,0.45)] hover:text-[#102033]"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function SubjectMultiSelect({
  selected, onToggle,
}: {
  selected: string[];
  onToggle: (subject: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Subjects"
      className="rounded-2xl bg-white border border-[rgba(16,32,51,0.10)] p-4 max-h-[280px] overflow-y-auto"
    >
      <div className="space-y-4">
        {SUBJECT_GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-[10.5px] font-[family-name:var(--font-display)] font-600 tracking-[0.14em] uppercase text-[#5A6A82] mb-2">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {g.subjects.map((s) => {
                const active = selected.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => onToggle(s)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-full text-[12.5px] font-medium transition border ${
                      active
                        ? "bg-[#EEF6FF] text-[#1D4ED8] border-[#2563EB]"
                        : "bg-white text-[#2B3950] border-[rgba(16,32,51,0.10)] hover:border-[rgba(37,99,235,0.45)]"
                    }`}
                  >
                    {active && <span aria-hidden className="mr-1">✓</span>}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
