"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./MvShared";

const FOCUS = [
  "Full syllabus understanding",
  "Topic-wise explanation",
  "Past paper practice",
  "Mark scheme awareness",
  "Time management",
  "Common mistake correction",
  "Exam confidence building",
  "Final revision planning",
];

export function MvExamPrep() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Exam Preparation"
            title="Focused support for Cambridge IGCSE &"
            emphasis="O-Level exams."
            body="Cambridge exams reward understanding and exam technique - not memorizing. EDUS classes are built around both."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {FOCUS.map((f) => (
            <m.div
              key={f}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[13.5px] text-[#102033] leading-[1.55]">{f}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
