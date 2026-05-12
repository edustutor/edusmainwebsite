"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, inView } from "@/lib/motion";

const STATS = [
  { k: "5+ Years",            v: "In Online Education",           tint: "#2563EB" },
  { k: "7,000+",              v: "Students Supported",            tint: "#8B5CF6" },
  { k: "100% Online",         v: "Live Learning Model",           tint: "#06B6D4" },
  { k: "4 Markets",           v: "SL - IN - MV - Global",         tint: "#FACC15" },
  { k: "Group + 1:1",         v: "Class Formats",                 tint: "#2563EB" },
  { k: "National - CIE - Edexcel", v: "Multi-Syllabus Coverage",  tint: "#8B5CF6" },
];

export function TeachStats() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow"><span className="dot" />EDUS at a Glance</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            A growing online learning <em>institute.</em>
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
            Over the years EDUS has supported thousands of students through online learning. Our next
            phase is focused on building a stronger tutor network, expanding internationally, and
            delivering a consistent learning experience through academic discipline and technology.
          </p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {STATS.map((s) => (
            <m.div
              key={s.v}
              variants={fadeUp}
              className="relative rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full"
                style={{ background: s.tint }}
              />
              <p
                className="font-display font-800 text-[22px] leading-tight"
                style={{ color: s.tint }}
              >
                {s.k}
              </p>
              <p className="text-[12.5px] text-[#5A6A82] mt-2 leading-snug">{s.v}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
