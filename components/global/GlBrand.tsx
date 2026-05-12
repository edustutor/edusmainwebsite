"use client";
import { m } from "@/components/Motion";
import { sectionRevealStrong, inView } from "@/lib/motion";

const PILLARS = [
  { title: "Simple", body: "Education without confusion. Clear plans, clear progress." },
  { title: "Structured", body: "Lesson flow, revision, practice, and consistent academic support." },
  { title: "Personal", body: "Built around the student, not the average." },
  { title: "Effective", body: "Focused on real understanding and meaningful improvement." },
];

export function GlBrand() {
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
          <div className="lg:col-span-5">
            <p className="eyebrow"><span className="dot" />EDUS Trust</p>
            <h2 className="heading mt-3" style={{ fontSize: "clamp(24px, 2.8vw, 34px)", lineHeight: 1.15 }}>
              EDUS - <em>learning made lovable.</em>
            </h2>
            <p className="text-[#2B3950] text-[15px] mt-4 leading-[1.7]">
              EDUS is an online learning institute built to make education simple, structured,
              personal, and effective. With live online classes, flexible support, expert tutors,
              and student-centered teaching, EDUS Global helps students learn beyond boundaries.
            </p>
            <p className="mt-5 text-[14px] text-[#2563EB] font-[family-name:var(--font-display)] font-700">
              From anywhere in the world, students can learn better with EDUS.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {PILLARS.map((p, i) => (
              <article
                key={p.title}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
              >
                <p
                  className="font-[family-name:var(--font-display)] font-800 text-[12px] tracking-[0.16em] uppercase"
                  style={{
                    color: ["#2563EB", "#8B5CF6", "#06B6D4", "#22C55E"][i],
                  }}
                >
                  Pillar {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] font-700 text-[18px] text-[#102033] leading-tight">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[#5A6A82] mt-2 leading-[1.6]">{p.body}</p>
              </article>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
