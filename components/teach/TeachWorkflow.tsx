"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const STAGES = [
  { n: "01", title: "Tutor Onboarding",       body: "Submit application and required documents." },
  { n: "02", title: "Screening",              body: "Review of qualifications, expertise, communication, and availability." },
  { n: "03", title: "Interview / Demo",       body: "Demo session or subject evaluation if required." },
  { n: "04", title: "Agreement & System Setup", body: "Class rules, payment terms, and system access." },
  { n: "05", title: "Class Allocation",       body: "Assigned suitable classes or individual students." },
  { n: "06", title: "Monthly Teaching Cycle", body: "Conduct classes as per schedule with discipline." },
  { n: "07", title: "QA & Performance Review", body: "Recordings, attendance, feedback, academic monitoring." },
  { n: "08", title: "Payment Finalization",   body: "Calculated by completed classes, additions, deductions." },
  { n: "09", title: "Continuous Improvement", body: "Feedback and action plans for ongoing growth." },
];

export function TeachWorkflow() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Life of Teachers at EDUS"
            title="A structured online teaching"
            emphasis="workflow."
            body="Every tutor follows a clear, repeatable cycle - from onboarding to continuous improvement."
          />
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {STAGES.map((s) => (
            <m.li
              key={s.n}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex w-10 h-10 rounded-xl items-center justify-center font-display font-800 text-[13px] text-white shrink-0"
                  style={{ background: "linear-gradient(135deg,#2563EB 0%,#6E5BC8 100%)" }}
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-700 text-[15px] text-[#102033] leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.6]">{s.body}</p>
                </div>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
