"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const COUNTRIES = [
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇴🇲", name: "Oman" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇲🇾", name: "Malaysia" },
  { flag: "🇪🇺", name: "Europe" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🌐", name: "& many more" },
];

export function GlReach() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Global Reach"
            title="Online tutoring for students"
            emphasis="worldwide."
            body="EDUS Global is built for students living outside Sri Lanka, India, and Maldives who need quality online tutoring with trusted tutors."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
        >
          {COUNTRIES.map((c) => (
            <m.div
              key={c.name}
              variants={fadeUp}
              className="flex items-center gap-2.5 bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-3 py-2.5 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
            >
              <span className="text-xl shrink-0" aria-hidden>{c.flag}</span>
              <p className="font-display font-700 text-[12px] text-[#102033] leading-tight truncate">
                {c.name}
              </p>
            </m.div>
          ))}
        </m.div>

        <p className="mt-8 max-w-2xl mx-auto text-center text-[14px] text-[#2B3950] leading-[1.7]">
          Wherever your child lives, EDUS can help them learn with the right tutor online.
        </p>
      </div>
    </section>
  );
}
