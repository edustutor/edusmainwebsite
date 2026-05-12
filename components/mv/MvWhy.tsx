"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./MvShared";

const FEATURES = [
  { icon: "🎯", title: "1-to-1 Attention",         body: "Every student learns individually with a dedicated tutor. No crowded online classrooms.", tint: "#06B6D4" },
  { icon: "📘", title: "Cambridge Exam Focus",     body: "Lessons aligned to Cambridge IGCSE and O-Level subject requirements.",                    tint: "#2563EB" },
  { icon: "🧑‍🏫", title: "Expert Tutors",           body: "Carefully selected tutors who understand concepts, exam patterns, and student needs.",   tint: "#8B5CF6" },
  { icon: "🕒", title: "Flexible Online Learning", body: "Sessions arranged around Maldives-friendly timings, school and family routines.",         tint: "#FACC15" },
  { icon: "📊", title: "Parent Updates",           body: "Attendance, progress, and learning feedback shared with parents regularly.",              tint: "#22C55E" },
  { icon: "🏝️", title: "Island-Friendly Access",   body: "Students from any island can access high-quality tutoring without travel.",              tint: "#06B6D4" },
  { icon: "🏠", title: "Safe Learning from Home",  body: "A comfortable, respectful, family-friendly online learning environment.",                 tint: "#2563EB" },
  { icon: "📝", title: "Exam Preparation",         body: "Syllabus coverage, past papers, weak areas, revision, and confidence building.",          tint: "#8B5CF6" },
];

export function MvWhy() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#06B6D4" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Why EDUS for Maldives"
            title="Why Maldives parents choose"
            emphasis="EDUS."
            body="EDUS is built for Maldivian families who want personal attention, exam clarity, and consistent academic support - all from home."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FEATURES.map((f) => (
            <m.article
              key={f.title}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full"
            >
              <span
                className="inline-flex w-10 h-10 rounded-xl items-center justify-center text-lg"
                style={{ background: `${f.tint}15`, border: `1px solid ${f.tint}25` }}
              >
                {f.icon}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] font-700 text-[15px] text-[#102033] leading-tight">
                {f.title}
              </h3>
              <p className="text-[13px] text-[#5A6A82] mt-1.5 leading-[1.6]">{f.body}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
