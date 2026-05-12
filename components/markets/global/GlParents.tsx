"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
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
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Built for Parents"
            title="Your child learns online. You stay close to their"
            emphasis="progress."
            body="Parents often worry whether online classes work, whether the tutor will understand the child, and whether the child will improve. EDUS Global solves this with a structured, transparent approach."
          />
        </m.div>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 max-w-4xl mx-auto bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
        >
          {EXPECT.map((e, i) => (
            <m.li
              key={e}
              variants={fadeUp}
              className={`flex items-center gap-4 px-5 py-4 ${
                i !== EXPECT.length - 1 ? "border-b border-[rgba(16,32,51,0.06)]" : ""
              }`}
            >
              <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center bg-[#2563EB]/12 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[14px] text-[#102033] font-[family-name:var(--font-display)] font-600 leading-tight flex-1">
                {e}
              </p>
              <span
                className="font-[family-name:var(--font-display)] font-700 text-[11px] tracking-[0.10em] text-[#5A6A82] hidden sm:inline"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </m.li>
          ))}
        </m.ul>

        <p className="mt-6 text-center text-[13px] text-[#5A6A82] max-w-2xl mx-auto">
          Your child learns online, but you stay connected to their progress every step of the way.
        </p>
      </div>
    </section>
  );
}
