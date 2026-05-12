"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./MvShared";

const FLOW = [
  { n: "01", title: "Student Level Check",     body: "Understand current level, school progress, and weak areas.", tint: "#06B6D4" },
  { n: "02", title: "Personal Learning Plan",  body: "Subject-wise plan built around the student's exam goals.",   tint: "#2563EB" },
  { n: "03", title: "Concept Teaching",        body: "Each topic explained clearly with examples and guided practice.", tint: "#8B5CF6" },
  { n: "04", title: "Practice & Correction",   body: "Students solve questions in and after class with feedback.", tint: "#22C55E" },
  { n: "05", title: "Past Paper Training",     body: "Exam-style questions, mark schemes, and answer patterns.",   tint: "#FACC15" },
  { n: "06", title: "Progress Review",         body: "Parents updated on improvement, attendance, and targets.",   tint: "#06B6D4" },
];

export function MvLearningFlow() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="How EDUS Teaches"
            title="We don't just complete lessons. We make sure students"
            emphasis="understand."
            body="Every class follows a structured flow - so the student improves step by step, not just session by session."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FLOW.map((s) => (
            <m.li
              key={s.n}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex w-11 h-11 rounded-xl items-center justify-center font-[family-name:var(--font-display)] font-800 text-[13px] text-white shrink-0"
                  style={{ background: s.tint }}
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] font-700 text-[15px] text-[#102033] leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.6]">{s.body}</p>
                </div>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
