"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const RULES = [
  "Conduct classes only through EDUS-approved platforms and schedules.",
  "Start and end classes on time.",
  "Use proper teaching materials when needed.",
  "Maintain a professional online teaching environment.",
  "Avoid unnecessary cancellations.",
  "Inform the academic team in advance if any class cannot be conducted.",
  "Do not directly collect payments from EDUS students.",
  "Do not privately move EDUS students outside the institute.",
  "Support student learning with care, patience, and accountability.",
  "Follow child safety, online conduct, and professional communication standards at all times.",
];

export function TeachRules() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Tutor Rules & Standards"
            title="Mandatory standards before"
            emphasis="applying."
            body="Every tutor who joins EDUS must agree to follow these class-conduct standards from day one."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 gap-3"
        >
          {RULES.map((r, i) => (
            <m.li
              key={r}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span
                className="inline-flex w-7 h-7 rounded-full text-[11.5px] font-[family-name:var(--font-display)] font-800 text-white items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB 0%,#6E5BC8 100%)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13.5px] text-[#102033] leading-[1.55]">{r}</p>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
