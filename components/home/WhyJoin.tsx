"use client";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";

const REASONS = [
  { icon: "🎥", title: "Live Online Classes", body: "Students learn through interactive online classes led by qualified tutors. Lessons are structured, scheduled, and easy to access from home.", tint: "#2563EB" },
  { icon: "👩‍🏫", title: "Expert Tutors", body: "EDUS works with trained tutors who understand school subjects, exam expectations, and student learning gaps.", tint: "#8B5CF6" },
  { icon: "📊", title: "Parent Updates", body: "Parents stay informed about attendance, class participation, assessments, and learning progress.", tint: "#06B6D4" },
  { icon: "🎬", title: "Class Recordings", body: "Students can revise missed or difficult lessons through recordings and learning support materials.", tint: "#22C55E" },
  { icon: "📝", title: "Exams and Assessments", body: "Regular exams and academic reviews help students understand their progress and improve before school exams.", tint: "#FACC15" },
  { icon: "📚", title: "Resource Support", body: "Students get access to useful learning resources, past paper support, study materials, and guided academic content.", tint: "#2563EB" },
];

export function WhyJoin() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-50, 70]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -50]);

  return (
    <section
      ref={ref}
      id="why"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobAY }}>
          <AmbientGlow top="12%" left="-4%" size={240} color="#06B6D4" opacity={[0.08, 0.14]} duration={22} blur={80} />
        </m.div>
        <m.div className="absolute inset-0" style={{ y: blobBY }}>
          <AmbientGlow bottom="6%" right="-4%" size={220} color="#FACC15" opacity={[0.08, 0.14]} duration={26} delay={2} blur={80} />
        </m.div>
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Why Choose EDUS</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Why families <em>choose EDUS.</em>
          </h2>
          <p className="mt-3 text-[12.5px] font-display font-600 tracking-[0.16em] uppercase text-[#2563EB]">
            Quality-Assured - Online - Live - Learning Platform
          </p>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS is built for parents who want more than a normal online class. We combine live teaching,
            structured monitoring, learning resources, and parent communication so students stay supported
            from enrolment to progress review.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {REASONS.map((r) => (
            <m.article
              key={r.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-7 relative overflow-hidden cursor-default group"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 180, height: 180, background: r.tint, opacity: 0.20 }} />
              <div className="relative">
                <m.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${r.tint}15`, border: `1px solid ${r.tint}25` }}
                  whileHover={{ scale: 1.08, rotate: -4, transition: { duration: 0.3 } }}
                >
                  {r.icon}
                </m.div>
                <h3 className="heading mt-6" style={{ fontSize: "19px" }}>{r.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{r.body}</p>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
