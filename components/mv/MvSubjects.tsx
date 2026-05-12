"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, SUBJECTS, MV_SIGNUP, MvCtaRow } from "./MvShared";

const PLANS = [
  { need: "Regular Subject Support",  hours: "4 – 8 hrs / month",  tint: "#06B6D4" },
  { need: "Exam Preparation",         hours: "8 – 12 hrs / month", tint: "#2563EB" },
  { need: "Weak-Area Recovery",       hours: "12+ hrs / month",    tint: "#8B5CF6" },
  { need: "Intensive Revision",       hours: "Customized Plan",    tint: "#FACC15" },
];

export function MvSubjects() {
  return (
    <section id="subjects" className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow bottom="10%" right="-4%" size={240} color="#22C55E" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Subjects & Pricing"
            title="Simple, transparent, per-hour"
            emphasis="USD pricing."
            body="All Maldives classes are 1-to-1 online sessions. Pick one subject or several - pay only for the hours your child needs."
          />
        </m.div>

        {/* Subject cards */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {SUBJECTS.map((s) => (
            <m.article
              key={s.code}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] flex flex-col"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: s.tint }}
              />
              <div className="flex items-start justify-between gap-2">
                <span
                  className="inline-flex w-11 h-11 rounded-xl items-center justify-center text-xl"
                  style={{ background: `${s.tint}15`, border: `1px solid ${s.tint}25` }}
                >
                  {s.icon}
                </span>
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-[family-name:var(--font-display)] font-700"
                  style={{ background: `${s.tint}15`, color: s.tint }}
                >
                  {s.code}
                </span>
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-display)] font-700 text-[15px] text-[#102033] leading-tight">
                {s.short}
              </h3>
              <p className="text-[11.5px] text-[#5A6A82] mt-1 leading-tight">{s.name}</p>
              <p className="text-[12px] text-[#2B3950] mt-3 leading-[1.55] flex-1">{s.topics}</p>
              <div className="mt-4 pt-3 border-t border-[rgba(16,32,51,0.06)] flex items-baseline justify-between">
                <p
                  className="font-[family-name:var(--font-display)] font-800 text-[20px] leading-none"
                  style={{ color: s.tint }}
                >
                  ${s.price}
                </p>
                <p className="text-[10.5px] text-[#5A6A82] uppercase tracking-[0.08em] font-[family-name:var(--font-display)] font-600">
                  / hour
                </p>
              </div>
            </m.article>
          ))}
        </m.div>

        {/* Recommended monthly plan */}
        <div className="mt-12 max-w-4xl mx-auto rounded-[24px] glass-strong p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="eyebrow"><span className="dot" />Recommended Monthly Plan</p>
              <h3 className="heading mt-2" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                Match the <em>plan</em> to your child&apos;s goal.
              </h3>
            </div>
            <p className="text-[12px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
              Per-hour · USD billing
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLANS.map((p) => (
              <article
                key={p.need}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: p.tint }}
                />
                <p className="mt-2.5 font-[family-name:var(--font-display)] font-700 text-[13.5px] text-[#102033] leading-tight">
                  {p.need}
                </p>
                <p
                  className="font-[family-name:var(--font-display)] font-800 text-[15px] mt-1.5"
                  style={{ color: p.tint }}
                >
                  {p.hours}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] text-[#5A6A82] text-center">
            All classes are 1-to-1 only. Group classes are not offered for the Maldives launch.
          </p>

          <MvCtaRow />

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.12em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
            <a href={MV_SIGNUP} target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition">
              Register for Maldives Online Classes ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
