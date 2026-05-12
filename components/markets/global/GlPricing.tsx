"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, GL_SIGNUP, GlCtaRow } from "./GlobalShared";

const FACTORS = [
  { icon: "📚", title: "Curriculum or Syllabus",       tint: "#2563EB" },
  { icon: "🎓", title: "Subject and Grade Level",      tint: "#8B5CF6" },
  { icon: "🗓️", title: "Classes per Week",             tint: "#06B6D4" },
  { icon: "⏱️", title: "Class Duration",               tint: "#22C55E" },
  { icon: "🌟", title: "Tutor Expertise Level",        tint: "#FACC15" },
  { icon: "📝", title: "Exam Preparation Requirement", tint: "#2563EB" },
  { icon: "🌍", title: "Time Zone & Schedule",         tint: "#8B5CF6" },
];

export function GlPricing() {
  return (
    <section id="pricing" className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="6%" left="-4%"  size={220} color="#06B6D4" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Pricing"
            title="Affordable one to one online tutoring for"
            emphasis="global students."
            body="Every student is different, so EDUS Global builds a customized learning plan and fee structure once we understand the requirement."
          />
        </m.div>

        <div className="mt-10 max-w-4xl mx-auto rounded-[28px] glass-strong p-6 md:p-10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="eyebrow"><span className="dot" />Pricing Depends On</p>
              <h3 className="heading mt-2" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                Tailored to your child's <em>exact requirement.</em>
              </h3>
            </div>
            <p className="text-[12px] uppercase tracking-widest text-[#5A6A82] font-display font-600">
              No fixed packages
            </p>
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {FACTORS.map((f) => (
              <m.div
                key={f.title}
                variants={fadeUp}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
              >
                <span
                  className="inline-flex w-9 h-9 rounded-lg items-center justify-center text-base"
                  style={{ background: `${f.tint}15`, border: `1px solid ${f.tint}25` }}
                >
                  {f.icon}
                </span>
                <p className="mt-3 font-display font-700 text-[13px] text-[#102033] leading-tight">
                  {f.title}
                </p>
              </m.div>
            ))}
          </m.div>

          <p className="mt-7 text-center text-[14px] text-[#2B3950] leading-[1.7] max-w-xl mx-auto">
            Tell us your requirement. We will recommend the best tutor and the most suitable
            learning plan for your child.
          </p>

          <GlCtaRow primary="Request Class Fee Details" />

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.12em] text-[#5A6A82] font-display font-600">
            <a
              href={GL_SIGNUP}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2563EB] transition"
            >
              Apply for One-to-One Classes ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
