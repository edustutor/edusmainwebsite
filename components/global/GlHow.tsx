"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const FLOW = [
  { n: "01", title: "Understand the Student",  body: "Syllabus, grade, subject, current level, challenges, and expected goals collected.", tint: "#2563EB" },
  { n: "02", title: "Match the Right Tutor",   body: "A suitable tutor identified by subject expertise, teaching style, and student fit.",  tint: "#8B5CF6" },
  { n: "03", title: "Start Live 1-to-1",       body: "Live online classes where the tutor explains, teaches, and supports directly.",       tint: "#06B6D4" },
  { n: "04", title: "Practice & Improve",      body: "Targeted practice, revision, homework, and exam-focused preparation.",                tint: "#22C55E" },
  { n: "05", title: "Track Progress",          body: "Updates so parents and students see improvement, attendance, and next focus areas.",  tint: "#FACC15" },
];

export function GlHow() {
  return (
    <section id="how" className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="How Learning Happens"
            title="A live, structured, and personalized"
            emphasis="learning flow."
            body="Every EDUS Global class is live online so the student and tutor interact in real time, every session."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {FLOW.map((s) => (
            <m.li
              key={s.n}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex w-10 h-10 rounded-xl items-center justify-center font-[family-name:var(--font-display)] font-800 text-[13px] text-white"
                  style={{ background: s.tint }}
                >
                  {s.n}
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-700 text-[14px] text-[#102033] leading-tight">
                  {s.title}
                </h3>
              </div>
              <p className="text-[12.5px] text-[#5A6A82] mt-3 leading-[1.6]">{s.body}</p>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
