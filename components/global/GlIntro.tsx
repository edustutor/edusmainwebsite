"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const PERFECT_FOR = [
  "One to one online tutoring from experienced subject tutors",
  "Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level support",
  "Personalized lessons for any syllabus or curriculum",
  "Flexible class timings based on country and time zone",
  "Strong support for school, term, and board exams",
  "Individual attention that group classrooms cannot give",
  "Affordable online tuition with trusted academic guidance",
];

export function GlIntro() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Who This Is For"
            title="Learn from EDUS, wherever you are in the"
            emphasis="world."
            body="At EDUS Global, students from any country can learn online with carefully selected expert tutors through personalized one to one live classes. Whether the child follows Cambridge, Edexcel, IGCSE, GCSE, A-Level, O-Level, IB, or a national syllabus, EDUS helps identify the right tutor, the right learning plan, and the right academic support."
          />
        </m.div>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto"
        >
          {PERFECT_FOR.map((p) => (
            <m.li
              key={p}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[13.5px] text-[#102033] leading-[1.55]">{p}</p>
            </m.li>
          ))}
        </m.ul>

        <p className="mt-8 max-w-2xl mx-auto text-center text-[14.5px] text-[#2B3950] leading-[1.7]">
          If your child needs the right teacher, the right support, and the right learning
          plan, EDUS Global is built for you.
        </p>
      </div>
    </section>
  );
}
