"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { sectionRevealStrong, stepReveal, inView, slideInLeft } from "@/lib/motion";

const STEPS = [
  { n: "01", title: "Choose Market", body: "Select Sri Lanka, India, or Global.", tint: "#2563EB" },
  { n: "02", title: "Choose Class Type", body: "Pick group class, one to one tuition, or consultation support.", tint: "#8B5CF6" },
  { n: "03", title: "Select Grade and Subject", body: "Choose the grade, subject, syllabus, and preferred learning option.", tint: "#06B6D4" },
  { n: "04", title: "Submit Parent Details", body: "Share the student and guardian details for admission support.", tint: "#22C55E" },
  { n: "05", title: "Confirm and Start", body: "Complete the enrolment process and begin learning with EDUS.", tint: "#FACC15" },
];

export function JoinFlow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="enrolment"
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobY }}>
          <AmbientGlow top="20%" right="-6%" size={400} color="#22C55E" opacity={[0.08, 0.18]} duration={22} />
        </m.div>
        <AmbientGlow bottom="10%" left="-8%" size={360} color="#8B5CF6" opacity={[0.08, 0.18]} duration={26} delay={3} />
      </div>

      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          <m.div
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
            variants={sectionRevealStrong}
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

          <div className="lg:col-span-8 relative">
            {/* Scroll-driven connecting line */}
            <div aria-hidden className="absolute left-[28px] top-0 bottom-0 w-px bg-[rgba(16,32,51,0.10)] hidden sm:block" />
            <m.div
              aria-hidden
              style={{ height: lineHeight }}
              className="absolute left-[28px] top-0 w-px bg-gradient-to-b from-[#2563EB] via-[#8B5CF6] to-[#FACC15] hidden sm:block origin-top"
            />

            <ol className="space-y-4 relative">
              {STEPS.map((s, i) => (
                <m.li
                  key={s.n}
                  custom={i}
                  variants={stepReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={inView}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="glass rounded-[22px] p-6 flex items-start gap-5 relative"
                >
                  <m.span
                    className="inline-flex w-12 h-12 rounded-2xl items-center justify-center font-[family-name:var(--font-display)] font-700 text-[16px] text-white shrink-0 relative z-10"
                    style={{
                      background: `linear-gradient(180deg, ${s.tint}DD, ${s.tint})`,
                      boxShadow: `0 10px 22px -8px ${s.tint}80`,
                    }}
                    initial={{ scale: 0.7 }}
                    whileInView={{
                      scale: 1,
                      transition: { duration: 0.4, delay: i * 0.08 + 0.15, ease: [0.25, 0.8, 0.3, 1] },
                    }}
                    viewport={inView}
                    whileHover={{ scale: 1.06, transition: { duration: 0.25 } }}
                  >
                    {s.n}
                  </m.span>
                  <m.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={inView}>
                    <h3 className="heading" style={{ fontSize: "19px" }}>{s.title}</h3>
                    <p className="text-[#2B3950] text-[14.5px] mt-2 leading-[1.65]">{s.body}</p>
                  </m.div>
                </m.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
