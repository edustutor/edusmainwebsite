"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const REASONS = [
  { icon: "🎯", title: "Expert Tutors Matched to Student",   body: "Grade, syllabus, subject, learning level, and goal reviewed before tutor matching.", tint: "#2563EB" },
  { icon: "🧑‍🏫", title: "Personalized One to One",           body: "One student per class. Clear explanation, real questions, full attention.",          tint: "#06B6D4" },
  { icon: "🕒", title: "Flexible Global Timings",            body: "Schedules arranged across countries and time zones around tutor availability.",     tint: "#8B5CF6" },
  { icon: "📋", title: "Structured Lessons & Progress",      body: "Lesson flow, topic coverage, revision, practice, and continuous improvement.",      tint: "#22C55E" },
  { icon: "👨‍👩‍👧", title: "Parent-Friendly Updates",         body: "Attendance, learning progress, performance, and areas needing focus shared.",        tint: "#FACC15" },
  { icon: "💳", title: "Affordable Global Tuition",          body: "High-quality online tutoring at practical pricing vs international alternatives.",  tint: "#2563EB" },
];

export function GlWhy() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow bottom="10%" right="-4%" size={240} color="#06B6D4" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Why EDUS Global"
            title="Why students and parents choose"
            emphasis="EDUS Global."
            body="A clear, structured, and student-first online tutoring experience built for families anywhere in the world."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {REASONS.map((r) => (
            <m.article
              key={r.title}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full"
            >
              <span
                className="inline-flex w-11 h-11 rounded-xl items-center justify-center text-xl"
                style={{ background: `${r.tint}15`, border: `1px solid ${r.tint}25` }}
              >
                {r.icon}
              </span>
              <h3 className="mt-3 font-display font-700 text-[15px] text-[#102033] leading-tight">
                {r.title}
              </h3>
              <p className="text-[13px] text-[#5A6A82] mt-1.5 leading-[1.6]">{r.body}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
