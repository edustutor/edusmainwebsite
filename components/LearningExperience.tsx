"use client";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { sectionRevealStrong, stepReveal, inView } from "@/lib/motion";

const STEPS = [
  { tag: "Region", title: "Choose Your Region", body: "Select Sri Lanka, India, or Global learning support based on your child's location and academic need." },
  { tag: "Grade", title: "Select Grade and Subject", body: "Choose the right grade, subject, syllabus, and class type." },
  { tag: "Live", title: "Join Live Classes", body: "Attend scheduled online classes with trained tutors through a structured learning plan." },
  { tag: "Practice", title: "Practice and Revise", body: "Use assignments, recordings, resources, and revision support to strengthen understanding." },
  { tag: "Track", title: "Track Progress", body: "Monitor attendance, exams, learning improvement, and tutor feedback." },
  { tag: "Updates", title: "Get Parent Updates", body: "Parents receive clear updates so they know how their child is performing." },
];

const TINTS = ["#2563EB", "#8B5CF6", "#06B6D4", "#22C55E", "#FACC15", "#2563EB"];

export function LearningExperience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-50, 60]);

  return (
    <section
      ref={ref}
      id="how"
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobY }}>
          <AmbientGlow top="20%" right="-8%" size={440} color="#8B5CF6" opacity={[0.10, 0.24]} duration={22} />
        </m.div>
        <AmbientGlow bottom="10%" left="-6%" size={360} color="#2563EB" opacity={[0.08, 0.18]} duration={26} delay={4} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />How Learning Works</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            A simple online learning process for <em>every student.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS keeps the learning journey clear. Students join the right class, attend live lessons,
            complete practice work, review recordings, and receive regular academic support.
          </p>
        </m.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <m.article
              key={s.tag}
              custom={i}
              variants={stepReveal}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-6 relative overflow-hidden"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 160, height: 160, background: TINTS[i], opacity: 0.18 }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <m.span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full font-[family-name:var(--font-display)] font-700 text-[13px] text-white"
                    style={{ background: TINTS[i] }}
                    initial={{ scale: 0.7, rotate: -12 }}
                    whileInView={{
                      scale: 1, rotate: 0,
                      transition: { duration: 0.45, delay: i * 0.06 + 0.15, ease: [0.25, 0.8, 0.3, 1] },
                    }}
                    viewport={inView}
                    whileHover={{ scale: 1.08, transition: { duration: 0.25 } }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </m.span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#5A6A82]">
                    {s.tag}
                  </span>
                </div>
                <h3 className="heading mt-5" style={{ fontSize: "19px" }}>{s.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{s.body}</p>
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <m.span
                      key={j}
                      className="h-1 flex-1 rounded-full"
                      initial={{ background: "rgba(16,32,51,0.08)", scaleX: 0 }}
                      whileInView={{
                        background: j <= i ? TINTS[i] : "rgba(16,32,51,0.08)",
                        scaleX: 1,
                      }}
                      transition={{ duration: 0.45, delay: 0.06 * j + 0.25 }}
                      viewport={inView}
                      style={{ transformOrigin: "left" }}
                    />
                  ))}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
