"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const ROWS = [
  { group: "Same lesson for all students",       edus: "Personalized lesson for one student" },
  { group: "Limited time to ask doubts",          edus: "Direct doubt clearing with tutor" },
  { group: "Fixed pace for the full class",       edus: "Learning pace adjusted to the student" },
  { group: "Less individual correction",          edus: "Tutor gives focused feedback" },
  { group: "Travel or location restrictions",     edus: "Learn from anywhere online" },
  { group: "Parents may not see clear progress",  edus: "Parent updates and academic follow-up" },
];

export function GlCompare() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Why 1-to-1 Works"
            title="Why one to one online tutoring works better for many"
            emphasis="students."
            body="A side-by-side look at how EDUS Global compares to traditional group learning."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 max-w-5xl mx-auto rounded-[24px] bg-white border border-[rgba(16,32,51,0.08)] overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
        >
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-[rgba(16,32,51,0.08)]">
            <div className="px-5 py-4 bg-[#F6F8FB]">
              <p className="text-[11px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-700">
                Traditional Group Learning
              </p>
            </div>
            <div
              className="px-5 py-4 text-white"
              style={{ background: "linear-gradient(90deg,#2563EB 0%,#06B6D4 100%)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.10em] font-[family-name:var(--font-display)] font-700">
                EDUS Global · One to One
              </p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((r, i) => (
            <m.div
              key={r.edus}
              variants={fadeUp}
              className={`grid grid-cols-2 ${
                i !== ROWS.length - 1 ? "border-b border-[rgba(16,32,51,0.06)]" : ""
              }`}
            >
              <div className="px-5 py-4 flex items-start gap-3 bg-white">
                <span className="inline-flex w-5 h-5 rounded-full bg-[#5A6A82]/12 items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5A6A82" strokeWidth="3" aria-hidden>
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[13.5px] text-[#5A6A82] leading-[1.55]">{r.group}</p>
              </div>
              <div className="px-5 py-4 flex items-start gap-3 bg-[#F6FAFE]">
                <span className="inline-flex w-5 h-5 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[13.5px] text-[#102033] leading-[1.55] font-[family-name:var(--font-display)] font-600">
                  {r.edus}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
