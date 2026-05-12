"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const FEATURES = [
  "Real-time teaching and interaction",
  "Doubt clearing during the class",
  "Topic-wise explanation and revision",
  "Screen sharing and digital teaching tools",
  "Class planning based on student requirement",
  "Individual correction and feedback",
  "Flexible online access from any country",
];

const STUDENT_GAINS = [
  { icon: "💡", title: "Clearer Understanding",      body: "Ask questions freely and receive explanations until the concept lands." },
  { icon: "💪", title: "More Confidence",            body: "One-to-one attention helps students feel comfortable and motivated." },
  { icon: "📈", title: "Better Academic Performance", body: "Structured tutoring and focused guidance improve results over time." },
  { icon: "📝", title: "Exam Readiness",             body: "Support for school, term, board, IGCSE, GCSE, O & A-Level prep." },
  { icon: "🏠", title: "Flexible Learning from Home", body: "No travel, no traffic, no location barriers." },
  { icon: "🤝", title: "Supportive Experience",      body: "Patient, caring, and academically responsible guidance." },
];

export function GlLiveClass() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Live Online Experience"
            title="Live online learning that feels"
            emphasis="personal."
            body="EDUS Global is not a recorded course. It is a live, interactive, one-to-one learning experience built around the student."
          />
        </m.div>

        {/* Live features */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {FEATURES.map((f) => (
            <m.div
              key={f}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span className="inline-flex w-6 h-6 rounded-full bg-[#06B6D4]/12 items-center justify-center shrink-0 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[13px] text-[#102033] leading-[1.55]">{f}</p>
            </m.div>
          ))}
        </m.div>

        {/* Student gains */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />What Students Gain</p>
            <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
              Real outcomes, not just <em>completed sessions.</em>
            </h3>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_GAINS.map((g) => (
              <article
                key={g.title}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
              >
                <span className="text-2xl" aria-hidden>{g.icon}</span>
                <h4 className="mt-3 font-[family-name:var(--font-display)] font-700 text-[14.5px] text-[#102033] leading-tight">
                  {g.title}
                </h4>
                <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.6]">{g.body}</p>
              </article>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
