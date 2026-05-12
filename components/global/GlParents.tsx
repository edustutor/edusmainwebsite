"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const EXPECT = [
  "Clear communication before classes begin",
  "Tutor matching based on student requirement",
  "Flexible scheduling support",
  "Learning progress updates",
  "Attendance awareness",
  "Exam-focused preparation when needed",
  "Support from the EDUS academic team",
];

export function GlParents() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-6">
            <SectionHead
              align="left"
              eyebrow="Built for Parents"
              title="Your child learns online. You stay close to their"
              emphasis="progress."
              body="Parents often worry whether online classes will work, whether the tutor will understand the child, and whether the child will improve. EDUS Global solves this with a structured and transparent learning approach."
            />
          </div>

          <m.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="lg:col-span-6 grid sm:grid-cols-2 gap-3"
          >
            {EXPECT.map((e) => (
              <m.li
                key={e}
                variants={fadeUp}
                className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
              >
                <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[13.5px] text-[#102033] leading-[1.55]">{e}</p>
              </m.li>
            ))}
          </m.ul>
        </m.div>
      </div>
    </section>
  );
}
