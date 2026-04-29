"use client";
import { useState } from "react";

const GROUPS = [
  {
    code: "core",
    label: "Core Subjects",
    subjects: ["Mathematics", "Science", "English", "Social Science", "ICT"],
    tint: "#2563EB",
  },
  {
    code: "sciences",
    label: "Sciences",
    subjects: ["Physics", "Chemistry", "Biology", "Combined Mathematics", "Further Mathematics"],
    tint: "#8B5CF6",
  },
  {
    code: "languages",
    label: "Languages",
    subjects: ["Tamil", "Hindi", "Sinhala", "Spoken English", "English Literature"],
    tint: "#06B6D4",
  },
  {
    code: "commerce",
    label: "Commerce",
    subjects: ["Economics", "Business Studies", "Accounting", "Geography", "History"],
    tint: "#22C55E",
  },
  {
    code: "skills",
    label: "Essential Skills",
    subjects: ["Elocution", "IQ Training", "Public Speaking", "Study Skills"],
    tint: "#FACC15",
  },
];

export function Subjects() {
  const [active, setActive] = useState(GROUPS[0].code);
  const current = GROUPS.find((g) => g.code === active) ?? GROUPS[0];

  return (
    <section id="subjects" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", right: "-6%", width: 380, height: 380, background: "#22C55E", opacity: 0.14 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Subjects</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Every key subject. <em>Every grade.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            From foundation to A-Level — taught in English by qualified, vetted tutors. Filter
            below to see the subjects in each group.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {GROUPS.map((g) => {
            const isActive = active === g.code;
            return (
              <button
                key={g.code}
                onClick={() => setActive(g.code)}
                className={`px-4 py-2 rounded-full text-[13.5px] font-medium font-[family-name:var(--font-display)] transition border ${
                  isActive
                    ? "text-white border-transparent shadow-[0_8px_22px_-6px_rgba(37,99,235,0.45)]"
                    : "bg-white/70 text-[#2B3950] border-[rgba(16,32,51,0.10)] hover:bg-white"
                }`}
                style={isActive ? { background: g.tint } : undefined}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Subjects panel */}
        <div className="mt-8 glass-strong rounded-[28px] p-7 md:p-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p
              className="font-[family-name:var(--font-display)] font-600 text-[14px] tracking-[0.12em] uppercase"
              style={{ color: current.tint }}
            >
              {current.label}
            </p>
            <p className="text-[12.5px] text-[#5A6A82]">{current.subjects.length} subjects available</p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {current.subjects.map((s) => (
              <div
                key={s}
                className="rounded-2xl bg-white border border-[rgba(16,32,51,0.06)] px-4 py-3.5 flex items-center gap-3 hover:border-[rgba(37,99,235,0.30)] transition"
              >
                <span
                  className="inline-flex w-8 h-8 rounded-xl items-center justify-center"
                  style={{ background: `${current.tint}1A`, color: current.tint }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
                    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
                  </svg>
                </span>
                <span className="font-[family-name:var(--font-display)] font-500 text-[14.5px] text-[#102033]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
