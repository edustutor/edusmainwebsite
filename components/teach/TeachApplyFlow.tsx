"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const STEPS = [
  { n: "01", t: "Read tutor expectations, rules, and requirements." },
  { n: "02", t: "Confirm you meet the academic, technical, and professional standards." },
  { n: "03", t: "Click the application button and complete the form." },
  { n: "04", t: "Upload CV, qualifications, teaching experience, and documents." },
  { n: "05", t: "EDUS academic team reviews your application." },
  { n: "06", t: "Shortlisted tutors are invited for interview, demo, or subject test." },
  { n: "07", t: "Selected tutors receive onboarding instructions and agreement." },
  { n: "08", t: "Approved tutors are added to the EDUS tutor network." },
];

export function TeachApplyFlow() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Application Process"
            title="How to apply as an EDUS"
            emphasis="tutor."
            body="A clear, step-by-step process from application to onboarding."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
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
                  background: "linear-gradient(90deg,#2563EB 0%,#6E5BC8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Step {s.n}
              </p>
              <p className="mt-2 text-[13.5px] text-[#102033] leading-[1.55]">{s.t}</p>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
