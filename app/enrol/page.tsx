"use client";
import Link from "next/link";
import { useState } from "react";

const STEPS = ["Market", "Class type", "Grade & syllabus", "Details", "Confirm"];

export default function EnrolPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <section className="relative pt-32 sm:pt-36 pb-28 min-h-screen overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.25 }} />
        <div className="blob" style={{ top: "30%", right: "-10%", width: 460, height: 460, background: "#8B5CF6", opacity: 0.25 }} />
      </div>

      <div className="container-edge max-w-4xl mx-auto">
        <div className="text-center">
          <p className="eyebrow"><span className="dot" />Enrolment · Multi-step</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Start your <em>EDUS journey.</em>
          </h1>
          <p className="text-[#2B3950] mt-5 max-w-xl mx-auto text-[16px] leading-[1.65]">
            Only the fields that matter — revealed as you make each choice. Five short steps.
            WhatsApp is available as a fallback if you'd prefer to talk first.
          </p>
        </div>

        <div className="mt-10 glass rounded-full p-1.5 flex gap-1">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`flex-1 text-center px-3 py-2 rounded-full text-[10.5px] font-medium font-[family-name:var(--font-display)] uppercase tracking-[0.14em] transition ${
                i === step
                  ? "bg-[#102033] text-white"
                  : i < step
                    ? "text-[#2563EB]"
                    : "text-[#5A6A82]"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {s}
            </div>
          ))}
        </div>

        <div className="mt-8 glass-strong rounded-[28px] p-8 md:p-12 min-h-[420px]">
          {step === 0 && (
            <Step title="Where are you based?" sub="We only show classes valid for your market.">
              <Choices
                value={data.market}
                onChange={(v) => set("market", v)}
                options={[
                  { v: "SL", label: "Sri Lanka", note: "National syllabus + 1:1" },
                  { v: "IN", label: "India", note: "Grades 6–10 · CBSE/NCERT" },
                  { v: "GL", label: "Anywhere else", note: "Global one-to-one" },
                ]}
              />
            </Step>
          )}
          {step === 1 && (
            <Step title="Group classes or one-to-one?" sub="You can change this later.">
              <Choices
                value={data.classType}
                onChange={(v) => set("classType", v)}
                options={[
                  { v: "group", label: "Group classes", note: "Structured weekly schedule" },
                  { v: "1to1", label: "One-to-one", note: "Personal tutor, flexible timing" },
                ]}
              />
            </Step>
          )}
          {step === 2 && (
            <Step title="Grade & syllabus" sub="So we can match you to the right tutor.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Grade / Year">
                  <select value={data.grade || ""} onChange={(e) => set("grade", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]">
                    <option value="">Select grade</option>
                    {["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Year 12","Year 13"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Syllabus / Board">
                  <select value={data.syllabus || ""} onChange={(e) => set("syllabus", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]">
                    <option value="">Select syllabus</option>
                    {["G.C.E. National","CBSE / NCERT","Cambridge IGCSE","Edexcel","IB Diploma","ICSE / ISC"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Subject(s)">
                  <input value={data.subject || ""} onChange={(e) => set("subject", e.target.value)} placeholder="e.g. Maths, Physics" className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033] placeholder:text-[#5A6A82]" />
                </Field>
                <Field label="Medium">
                  <select value={data.medium || ""} onChange={(e) => set("medium", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]">
                    <option value="">Select medium</option>
                    {["English","Sinhala","Tamil"].map((m) => <option key={m}>{m}</option>)}
                  </select>
                </Field>
              </div>
            </Step>
          )}
          {step === 3 && (
            <Step title="Your details" sub="The tutor coordinator will reach out within one business day.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Student name">
                  <input value={data.student || ""} onChange={(e) => set("student", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]" />
                </Field>
                <Field label="Guardian name">
                  <input value={data.guardian || ""} onChange={(e) => set("guardian", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]" />
                </Field>
                <Field label="Email">
                  <input type="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]" />
                </Field>
                <Field label="Phone (with country code)">
                  <input value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033]" />
                </Field>
                <Field label="Preferred start" className="sm:col-span-2">
                  <input value={data.start || ""} onChange={(e) => set("start", e.target.value)} placeholder="e.g. Next term" className="w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[#102033] placeholder:text-[#5A6A82]" />
                </Field>
              </div>
            </Step>
          )}
          {step === 4 && (
            <Step title="You're all set." sub="A real human at EDUS will follow up. Welcome.">
              <div className="rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5A6A82] mb-4">Submission preview</p>
                <ul className="space-y-2 text-sm">
                  {Object.entries(data).map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4">
                      <span className="text-[#5A6A82] capitalize font-mono text-xs">{k}</span>
                      <span className="text-[#102033]">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-sun">Submit & continue</Link>
                <Link href="https://wa.me/" className="btn btn-ghost">WhatsApp fallback</Link>
              </div>
            </Step>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="btn btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="btn btn-primary">
              Continue
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <span className="text-xs font-mono text-[#5A6A82]">Last step</span>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="heading" style={{ fontSize: "26px" }}>{title}</h2>
      <p className="text-[#5A6A82] mt-2 text-[14px]">{sub}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}
function Choices({
  value, onChange, options,
}: {
  value: string | undefined;
  onChange: (v: string) => void;
  options: { v: string; label: string; note: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={`text-left rounded-2xl p-5 border transition ${
              active
                ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_10px_24px_-8px_rgba(37,99,235,0.45)]"
                : "bg-white border-[rgba(16,32,51,0.10)] hover:border-[rgba(37,99,235,0.30)]"
            }`}
          >
            <p className={`font-[family-name:var(--font-display)] font-600 text-[18px] ${active ? "text-white" : "text-[#102033]"}`}>{o.label}</p>
            <p className={`text-[11.5px] mt-1 ${active ? "text-white/80" : "text-[#5A6A82]"}`}>{o.note}</p>
          </button>
        );
      })}
    </div>
  );
}
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11.5px] font-[family-name:var(--font-display)] font-600 uppercase tracking-[0.14em] text-[#5A6A82] mb-2">{label}</span>
      {children}
    </label>
  );
}
