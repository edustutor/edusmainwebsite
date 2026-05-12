"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";

const PROMISES = [
  { n: "01", title: "One Student",   body: "Every class focuses on one learner. No shared attention. No skipped questions.",     tint: "#2563EB" },
  { n: "02", title: "One Tutor",     body: "Matched to syllabus, subject, grade, learning level, and academic goal.",            tint: "#8B5CF6" },
  { n: "03", title: "One Path",      body: "A personalized plan built around speed, schedule, and target performance.",          tint: "#06B6D4" },
];

export function GlPromise() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="The EDUS Global Promise"
            title="One student. One tutor. One personalized"
            emphasis="learning path."
            body="Every student learns differently. Some need help with basics, some need exam prep, some need to push past a plateau. EDUS Global builds the class around the learner, not the other way around."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-3 gap-4"
        >
          {PROMISES.map((p) => (
            <m.article
              key={p.n}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: p.tint }}
              />
              <p
                className="font-display font-800 text-[12px] tracking-[0.16em] uppercase"
                style={{ color: p.tint }}
              >
                Step {p.n}
              </p>
              <h3 className="mt-2 font-display font-700 text-[20px] text-[#102033] leading-tight">
                {p.title}
              </h3>
              <p className="text-[13.5px] text-[#5A6A82] mt-2 leading-[1.6]">{p.body}</p>
            </m.article>
          ))}
        </m.div>

        <p className="mt-8 max-w-2xl mx-auto text-center text-[14.5px] text-[#2B3950] leading-[1.7]">
          At EDUS, learning is not just about attending classes. It is about understanding
          better, building confidence, and achieving meaningful academic progress.
        </p>
      </div>
    </section>
  );
}
