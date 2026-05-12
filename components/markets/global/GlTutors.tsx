"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const STANDARDS = [
  "Understand the syllabus and exam requirements",
  "Explain lessons clearly and patiently",
  "Identify weaknesses and learning gaps",
  "Provide individual academic attention",
  "Support practice and revision consistently",
  "Maintain professionalism and responsibility",
  "Help students build confidence and consistency",
];

export function GlTutors() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          {/* Copy */}
          <div className="lg:col-span-6">
            <SectionHead
              align="left"
              eyebrow="Tutor Quality"
              title="Learn from carefully selected expert"
              emphasis="tutors."
              body="Tutor quality is one of EDUS Global's strongest priorities. Tutors are selected on subject knowledge, teaching ability, communication, reliability, and student-handling capacity."
            />
            <m.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-7 grid sm:grid-cols-2 gap-3"
            >
              {STANDARDS.map((s) => (
                <m.li
                  key={s}
                  variants={fadeUp}
                  className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-3.5 py-2.5 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
                >
                  <span className="inline-flex w-5 h-5 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[13px] text-[#102033] leading-[1.5]">{s}</p>
                </m.li>
              ))}
            </m.ul>
            <p className="mt-7 text-[14px] text-[#2B3950] leading-[1.7] max-w-xl">
              The right tutor can change the way a student learns. EDUS Global helps students
              find that tutor.
            </p>
          </div>

          {/* Visual quality board */}
          <div className="lg:col-span-6">
            <TutorBoard />
          </div>
        </m.div>
      </div>
    </section>
  );
}

function TutorBoard() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.20) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#EEF6FF] via-white to-[#E6FAFD] border border-white/80 shadow-[0_30px_80px_-30px_rgba(16,32,51,0.20)] p-6 md:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
              Tutor Selection Score
            </p>
            <p
              className="font-[family-name:var(--font-display)] font-800 text-[34px] leading-none mt-2"
              style={{
                background: "linear-gradient(135deg,#2563EB 0%,#06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              9.4 / 10
            </p>
            <p className="text-[11px] text-[#2563EB] mt-1 font-[family-name:var(--font-display)] font-700">
              Multi-stage evaluation · No assignments by default
            </p>
          </div>
          <svg width="76" height="76" viewBox="0 0 36 36" className="shrink-0">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#EEF2F7" strokeWidth="4" />
            <circle
              cx="18" cy="18" r="14"
              fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 14}
              strokeDashoffset={(2 * Math.PI * 14) * (1 - 0.94)}
              transform="rotate(-90 18 18)"
            />
            <text x="18" y="20" textAnchor="middle" fill="#102033" fontSize="9" fontWeight="800">
              A+
            </text>
          </svg>
        </div>
        <div className="mt-6 space-y-3.5">
          <Bar label="Subject Mastery"        pct={96} tint="#2563EB" />
          <Bar label="Exam-Pattern Knowledge" pct={94} tint="#8B5CF6" />
          <Bar label="Delivery Clarity"       pct={92} tint="#06B6D4" />
          <Bar label="Student Engagement"     pct={95} tint="#22C55E" />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, pct, tint }: { label: string; pct: number; tint: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[11.5px] uppercase tracking-[0.06em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
          {label}
        </p>
        <p className="font-[family-name:var(--font-display)] font-800 text-[12.5px] text-[#102033]">
          {pct}%
        </p>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-[#EEF2F7] overflow-hidden">
        <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: tint }} />
      </div>
    </div>
  );
}
