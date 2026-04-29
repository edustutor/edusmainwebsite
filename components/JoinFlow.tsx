"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { sectionReveal, stepReveal, inView } from "@/lib/motion";

const STEPS = [
  { n: "01", title: "Choose Market", body: "Select Sri Lanka, India, or Global.", tint: "#2563EB" },
  { n: "02", title: "Choose Class Type", body: "Pick group class, one to one tuition, or consultation support.", tint: "#8B5CF6" },
  { n: "03", title: "Select Grade and Subject", body: "Choose the grade, subject, syllabus, and preferred learning option.", tint: "#06B6D4" },
  { n: "04", title: "Submit Parent Details", body: "Share the student and guardian details for admission support.", tint: "#22C55E" },
  { n: "05", title: "Confirm and Start", body: "Complete the enrolment process and begin learning with EDUS.", tint: "#FACC15" },
];

export function JoinFlow() {
  return (
    <section id="enrolment" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", right: "-6%", width: 380, height: 380, background: "#22C55E", opacity: 0.14 }} />
      </div>

      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          <m.div
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <p className="eyebrow"><span className="dot" />Enrolment Flow</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Start learning with EDUS in <em>a few simple steps.</em>
            </h2>
            <p className="text-[#2B3950] mt-5 text-[15.5px] leading-[1.7]">
              The EDUS enrolment process helps parents choose the correct learning path without confusion.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </div>
          </m.div>

          <ol className="lg:col-span-8 space-y-4">
            {STEPS.map((s, i) => (
              <m.li
                key={s.n}
                custom={i}
                variants={stepReveal}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="glass rounded-[22px] p-6 flex items-start gap-5"
              >
                <span
                  className="inline-flex w-12 h-12 rounded-2xl items-center justify-center font-[family-name:var(--font-display)] font-700 text-[16px] text-white shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${s.tint}DD, ${s.tint})`,
                    boxShadow: `0 10px 22px -8px ${s.tint}80`,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="heading" style={{ fontSize: "19px" }}>{s.title}</h3>
                  <p className="text-[#2B3950] text-[14.5px] mt-2 leading-[1.65]">{s.body}</p>
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
