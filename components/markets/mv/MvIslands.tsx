"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./MvShared";

const ISLANDS = [
  { name: "Malé",         note: "Capital",           tint: "#2563EB" },
  { name: "Hulhumalé",    note: "Greater Malé",      tint: "#06B6D4" },
  { name: "Addu",         note: "Southern Atoll",    tint: "#8B5CF6" },
  { name: "Fuvahmulah",   note: "Gnaviyani Atoll",   tint: "#22C55E" },
  { name: "Kulhudhuffushi", note: "Northern Hub",    tint: "#FACC15" },
  { name: "All Islands",  note: "Maldives-wide",     tint: "#2563EB" },
];

export function MvIslands() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={240} color="#06B6D4" opacity={[0.10, 0.18]} duration={22} blur={80} />
        <AmbientGlow bottom="6%" left="-4%"  size={220} color="#22C55E" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Maldives-Wide"
            title="Online classes for students across"
            emphasis="every island."
            body="EDUS supports students from Malé, Hulhumalé, Addu, Fuvahmulah, Kulhudhuffushi - and every island in between. Quality tutoring delivered home, with Maldives-friendly schedules."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ISLANDS.map((i) => (
            <m.article
              key={i.name}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] flex items-center gap-4"
            >
              <span
                className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl"
                style={{ background: `${i.tint}15`, border: `1px solid ${i.tint}25` }}
              >
                🏝️
              </span>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-display)] font-700 text-[15px] text-[#102033] leading-tight">
                  {i.name}
                </h3>
                <p className="text-[12px] uppercase tracking-[0.08em] mt-1 font-[family-name:var(--font-display)] font-600" style={{ color: i.tint }}>
                  {i.note}
                </p>
              </div>
            </m.article>
          ))}
        </m.div>

        <p className="mt-8 text-center text-[13px] text-[#5A6A82] max-w-2xl mx-auto">
          All classes are conducted online with Maldives-friendly schedules - easier for students,
          parents, school routines, and exam prep alike.
        </p>
      </div>
    </section>
  );
}
