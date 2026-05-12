"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const SUBJECTS = [
  { icon: "🧮", name: "Mathematics",         tint: "#2563EB" },
  { icon: "➕", name: "Further Mathematics", tint: "#2563EB" },
  { icon: "🔬", name: "Science",             tint: "#8B5CF6" },
  { icon: "⚛️", name: "Physics",             tint: "#FACC15" },
  { icon: "🧪", name: "Chemistry",           tint: "#8B5CF6" },
  { icon: "🧬", name: "Biology",             tint: "#22C55E" },
  { icon: "📖", name: "English Language",    tint: "#06B6D4" },
  { icon: "📚", name: "English Literature",  tint: "#06B6D4" },
  { icon: "💻", name: "ICT / Computer Sci",  tint: "#2563EB" },
  { icon: "📈", name: "Economics",           tint: "#22C55E" },
  { icon: "💼", name: "Business Studies",    tint: "#FACC15" },
  { icon: "🧾", name: "Accounting",          tint: "#8B5CF6" },
  { icon: "🇮🇳", name: "Tamil",               tint: "#06B6D4" },
  { icon: "🇱🇰", name: "Sinhala",             tint: "#2563EB" },
  { icon: "🏛️", name: "History",             tint: "#8B5CF6" },
  { icon: "🌱", name: "Environmental",       tint: "#22C55E" },
  { icon: "🗣️", name: "Spoken English",      tint: "#06B6D4" },
  { icon: "📝", name: "Exam Revision",       tint: "#FACC15" },
];

export function GlSubjects() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Subjects"
            title="Expert support for every important"
            emphasis="subject."
            body="Experienced tutors who understand the syllabus, exam expectations, and the real learning challenges students face."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {SUBJECTS.map((s) => (
            <m.div
              key={s.name}
              variants={fadeUp}
              className="flex items-center gap-2.5 bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-3 py-2.5 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
            >
              <span
                className="inline-flex w-8 h-8 rounded-lg items-center justify-center text-base shrink-0"
                style={{ background: `${s.tint}15`, border: `1px solid ${s.tint}25` }}
              >
                {s.icon}
              </span>
              <h3
                className="font-display font-700 text-[12px] text-[#102033] leading-tight truncate"
                aria-label={`Online ${s.name} tutor`}
              >
                {s.name}
              </h3>
            </m.div>
          ))}
        </m.div>

        <p className="mt-8 max-w-2xl mx-auto text-center text-[14px] text-[#5A6A82] leading-[1.7]">
          Need a subject not listed here? Tell us your requirement and we will help find the
          right tutor.
        </p>
      </div>
    </section>
  );
}
