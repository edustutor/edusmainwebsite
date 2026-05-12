"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, GlCtaRow } from "./GlobalShared";

const STEPS = [
  { n: "01", t: "Submit Your Requirement",   d: "Share student details, syllabus, grade, subject, country, and preferred class time." },
  { n: "02", t: "Get Academic Guidance",     d: "Our team reviews the requirement and suggests the best learning plan." },
  { n: "03", t: "Tutor Matching",            d: "We identify a suitable tutor based on subject, syllabus, grade, and need." },
  { n: "04", t: "Confirm the Class Plan",    d: "Timing, frequency, fees, and tutor details shared clearly before starting." },
  { n: "05", t: "Start Learning Online",     d: "Begin live one-to-one classes with continuous academic support." },
];

export function GlJoin() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="How to Join"
            title="A simple, five-step path to your first"
            emphasis="EDUS Global class."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          {STEPS.map((s) => (
            <m.li
              key={s.n}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <p
                className="font-[family-name:var(--font-display)] font-800 text-[15px]"
                style={{
                  background: "linear-gradient(90deg,#2563EB 0%,#06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Step {s.n}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] font-700 text-[14.5px] text-[#102033] leading-tight">
                {s.t}
              </h3>
              <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{s.d}</p>
            </m.li>
          ))}
        </m.ol>

        <GlCtaRow primary="Apply for One-to-One Classes" secondary="Speak to an Advisor" />
      </div>
    </section>
  );
}
