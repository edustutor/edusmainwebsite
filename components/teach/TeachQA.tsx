"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const QA = [
  { title: "Class Completion",   body: "Planned vs conducted classes.",                              tint: "#2563EB" },
  { title: "Punctuality",        body: "Joining time, duration, schedule discipline.",               tint: "#8B5CF6" },
  { title: "Teaching Quality",   body: "Explanation, clarity, preparation, and delivery.",           tint: "#06B6D4" },
  { title: "Student Engagement", body: "Interaction, questioning, participation, motivation.",       tint: "#FACC15" },
  { title: "Technical Quality",  body: "Audio, video, board visibility, and recordings.",            tint: "#22C55E" },
  { title: "Attendance",         body: "Student attendance and participation trends.",               tint: "#2563EB" },
  { title: "Student Retention",  body: "Growth, dropouts, and continuation patterns.",               tint: "#8B5CF6" },
  { title: "Feedback",           body: "Student, parent, consultant, and QA observations.",          tint: "#06B6D4" },
  { title: "Compliance",         body: "Attendance marking, recordings, communication, system use.", tint: "#FACC15" },
];

/* Mock report numbers - illustrative only */
const REPORT_KPIS = [
  { label: "Classes Conducted",  value: "24 / 24", tint: "#2563EB", pct: 100 },
  { label: "Student Attendance", value: "94%",     tint: "#8B5CF6", pct: 94 },
  { label: "QA Score",           value: "9.2 / 10", tint: "#06B6D4", pct: 92 },
  { label: "Student Retention",  value: "+5",       tint: "#FACC15", pct: 88 },
];

const REPORT_SESSIONS = [
  { day: "Mon",  attendance: 92, qa: "A+" },
  { day: "Tue",  attendance: 88, qa: "A"  },
  { day: "Wed",  attendance: 96, qa: "A+" },
  { day: "Thu",  attendance: 90, qa: "A"  },
  { day: "Fri",  attendance: 98, qa: "A+" },
  { day: "Sat",  attendance: 86, qa: "A"  },
];

const REPORT_SECTIONS = [
  "Class-wise Performance",
  "Session Details",
  "Student Trend",
  "QA Summary",
  "Payment Summary",
  "3-Month Comparison",
  "Academic Remarks",
];

export function TeachQA() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Quality Assurance"
            title="Every tutor is reviewed fairly and"
            emphasis="professionally."
            body="EDUS runs a monthly tutor review system so students get a consistent, high-quality learning experience - and tutors get clear, fair feedback."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {QA.map((q) => (
            <m.div
              key={q.title}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: q.tint }}
                />
                <p className="font-display font-700 text-[13.5px] text-[#102033] leading-tight">
                  {q.title}
                </p>
              </div>
              <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{q.body}</p>
            </m.div>
          ))}
        </m.div>

        {/* Monthly Tutor Report - visual mock dashboard */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: copy + sections covered */}
          <div className="lg:col-span-5">
            <p className="eyebrow"><span className="dot" />Monthly Tutor Report</p>
            <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
              See your performance, <em>every month.</em>
            </h3>
            <p className="text-[#2B3950] text-[14.5px] mt-4 leading-[1.7]">
              Every tutor receives a structured monthly report combining class data, attendance,
              QA remarks, consultant feedback, and academic approval - so strengths and improvement
              areas are clear.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {REPORT_SECTIONS.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[12px] text-[#102033] font-display font-600 shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: realistic mock report card */}
          <div className="lg:col-span-7">
            <ReportMock />
          </div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Mock monthly report card - infographic style                    */
/* --------------------------------------------------------------- */
function ReportMock() {
  return (
    <div className="relative">
      {/* Soft halo */}
      <div
        aria-hidden
        className="absolute inset-[-4%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative rounded-[24px] bg-white border border-[rgba(16,32,51,0.08)] shadow-[0_30px_70px_-30px_rgba(16,32,51,0.25)] overflow-hidden">
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.06) 0%, rgba(139,92,198,0.06) 50%, rgba(6,182,212,0.06) 100%)",
            borderBottom: "1px solid rgba(16,32,51,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="inline-flex w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="inline-flex w-2 h-2 rounded-full bg-[#28C840]" />
            <p className="ml-2 text-[11px] uppercase tracking-widest font-display font-700 text-[#102033]">
              Tutor Monthly Report
            </p>
          </div>
          <span className="text-[11px] text-[#5A6A82] font-display font-600">
            Cycle - Nov 2025
          </span>
        </div>

        {/* KPI row */}
        <div className="px-5 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REPORT_KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-3"
            >
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-600">
                {k.label}
              </p>
              <p
                className="font-display font-800 text-[17px] leading-tight mt-1"
                style={{ color: k.tint }}
              >
                {k.value}
              </p>
              <div className="mt-2 h-1 rounded-full bg-[#EEF2F7] overflow-hidden">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${k.pct}%`, background: k.tint }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mid row: attendance chart + QA grade summary */}
        <div className="px-5 mt-5 grid sm:grid-cols-5 gap-3">
          {/* Attendance bar chart */}
          <div className="sm:col-span-3 rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-600">
                Weekly Attendance
              </p>
              <p className="font-display font-800 text-[12.5px] text-[#102033]">
                94% <span className="text-[10.5px] text-[#22C55E] ml-1 font-700">▲ 4%</span>
              </p>
            </div>
            <div className="mt-3 flex items-end gap-2 h-[88px]">
              {REPORT_SESSIONS.map((s, i) => (
                <div key={s.day} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                  <span
                    className="w-full rounded-t-md"
                    style={{
                      height: `${s.attendance}%`,
                      background:
                        i === 4
                          ? "linear-gradient(180deg,#2563EB 0%,#6E5BC8 100%)"
                          : "rgba(37,99,235,0.22)",
                    }}
                  />
                  <span className="text-[9.5px] text-[#5A6A82] font-display font-600">
                    {s.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QA grade donut */}
          <div className="sm:col-span-2 rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-4 flex items-center gap-3">
            <svg width="68" height="68" viewBox="0 0 36 36" className="shrink-0">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#EEF2F7" strokeWidth="4" />
              <circle
                cx="18" cy="18" r="14"
                fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 14}
                strokeDashoffset={(2 * Math.PI * 14) * (1 - 0.92)}
                transform="rotate(-90 18 18)"
              />
              <text
                x="18" y="20"
                textAnchor="middle"
                fill="#102033"
                fontSize="9"
                fontWeight="800"
                fontFamily="var(--font-display)"
              >
                A+
              </text>
            </svg>
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-600">
                QA Grade
              </p>
              <p className="font-display font-800 text-[15px] text-[#102033] mt-1">
                Excellent
              </p>
              <p className="text-[11px] text-[#5A6A82] mt-0.5">Top 12% of tutors</p>
            </div>
          </div>
        </div>

        {/* Bottom row: payment summary + academic remark */}
        <div className="px-5 mt-3 pb-5 grid sm:grid-cols-5 gap-3">
          {/* Payment summary */}
          <div className="sm:col-span-3 rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-600">
              Payment Summary
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <PayItem label="Class Rate"  value="100%" tint="#2563EB" />
              <PayItem label="Additions"   value="+4%"  tint="#22C55E" />
              <PayItem label="Deductions"  value="-1%"  tint="#FACC15" />
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(16,32,51,0.06)] flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-600">
                Final Payable
              </span>
              <span
                className="font-display font-800 text-[14px]"
                style={{
                  background: "linear-gradient(90deg,#2563EB 0%,#6E5BC8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Approved
              </span>
            </div>
          </div>

          {/* Academic remark */}
          <div
            className="sm:col-span-2 rounded-xl p-4 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,198,0.08) 100%)",
              border: "1px solid rgba(37,99,235,0.18)",
            }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#2563EB] font-display font-700">
                Academic Remark
              </p>
              <p className="text-[12.5px] text-[#102033] mt-1.5 leading-[1.55]">
                Strong concept delivery and high student engagement. Continue.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-display font-700 text-[#22C55E]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" aria-hidden>
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Continuation Approved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayItem({ label, value, tint }: { label: string; value: string; tint: string }) {
  return (
    <div className="rounded-lg bg-white border border-[rgba(16,32,51,0.06)] p-2">
      <p className="text-[9.5px] uppercase tracking-[0.06em] text-[#5A6A82] font-display font-600">
        {label}
      </p>
      <p
        className="font-display font-800 text-[13px] leading-none mt-1"
        style={{ color: tint }}
      >
        {value}
      </p>
    </div>
  );
}
