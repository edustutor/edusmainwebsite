"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const LEVELS = [
  { n: "01", label: "New Tutor",                    body: "Recently onboarded tutor under observation.",                       tint: "#94A3B8" },
  { n: "02", label: "Active Tutor",                 body: "Conducting regular classes with acceptable performance.",            tint: "#2563EB" },
  { n: "03", label: "Preferred Tutor",              body: "Strong QA, student retention, and reliability.",                     tint: "#8B5CF6" },
  { n: "04", label: "Senior Tutor",                 body: "High-performing tutor trusted with major classes.",                  tint: "#06B6D4" },
  { n: "05", label: "Lead Tutor / Academic Contributor", body: "Involved in curriculum, training, mentoring, or development.",  tint: "#FACC15" },
];

export function TeachGrowth() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Tutor Growth Path"
            title="High-quality tutors grow with"
            emphasis="EDUS."
            body="Tutors who maintain teaching quality, student satisfaction, and professional conduct earn additional classes, leadership roles, and long-term academic opportunities."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 relative"
        >
          {/* Connector line */}
          <span
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-[44px] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(148,163,184,0.5), rgba(37,99,235,0.5), rgba(139,92,198,0.5), rgba(6,182,212,0.5), rgba(250,204,21,0.5))",
            }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {LEVELS.map((l) => (
              <m.article
                key={l.label}
                variants={fadeUp}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] text-center"
              >
                <div className="relative mx-auto w-[88px] h-[88px] grid place-items-center">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${l.tint}18`, border: `2px solid ${l.tint}` }}
                  />
                  <span
                    className="font-[family-name:var(--font-display)] font-800 text-[18px]"
                    style={{ color: l.tint }}
                  >
                    {l.n}
                  </span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-700 text-[14px] text-[#102033] leading-tight">
                  {l.label}
                </h3>
                <p className="text-[12px] text-[#5A6A82] mt-1.5 leading-[1.55]">{l.body}</p>
              </m.article>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
