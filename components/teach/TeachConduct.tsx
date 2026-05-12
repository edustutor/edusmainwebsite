"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const CONDUCT = [
  "Teach with honesty, patience, and responsibility.",
  "Respect every student regardless of level, background, country, language, or syllabus.",
  "Maintain professional communication with students, parents, and EDUS staff.",
  "Protect student privacy and institutional confidentiality.",
  "Avoid inappropriate language, discrimination, personal bias, or unprofessional behaviour.",
  "Do not use EDUS classes for personal promotions or private tutoring.",
  "Maintain a safe and respectful online learning environment.",
  "Accept academic feedback positively and improve continuously.",
];

export function TeachConduct() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Code of Conduct"
            title="Professionalism, care, and"
            emphasis="integrity."
            body="All EDUS tutors uphold these principles in every class, every conversation, every term."
          />
        </m.div>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 gap-3"
        >
          {CONDUCT.map((c) => (
            <m.li
              key={c}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[13.5px] text-[#102033] leading-[1.55]">{c}</p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
