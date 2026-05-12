"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, SUBJECTS } from "./MvShared";

export function MvSubjectDetails() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Subject Details"
            title="A closer look at each Cambridge"
            emphasis="subject."
            body="Every subject is taught by a tutor matched to your child's level and goals. Below is what each subject covers in EDUS classes."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 space-y-3"
        >
          {SUBJECTS.map((s) => (
            <m.article
              key={s.code}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 md:p-6 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] flex flex-col md:flex-row md:items-center gap-5"
            >
              <div className="flex items-center gap-3 md:w-64 shrink-0">
                <span
                  className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl"
                  style={{ background: `${s.tint}15`, border: `1px solid ${s.tint}25` }}
                >
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] font-700 text-[16px] text-[#102033] leading-tight">
                    {s.short}
                  </h3>
                  <p className="text-[11.5px] uppercase tracking-[0.06em] mt-1 font-[family-name:var(--font-display)] font-600" style={{ color: s.tint }}>
                    Cambridge · {s.code}
                  </p>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-[#2B3950] leading-[1.65]">{s.blurb}</p>
                <p className="mt-2 text-[12px] text-[#5A6A82]">{s.topics}</p>
              </div>
              <div className="md:text-right shrink-0">
                <p
                  className="font-[family-name:var(--font-display)] font-800 text-[24px] leading-none"
                  style={{ color: s.tint }}
                >
                  ${s.price}
                </p>
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] mt-1.5 font-[family-name:var(--font-display)] font-600">
                  / hour · USD
                </p>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
