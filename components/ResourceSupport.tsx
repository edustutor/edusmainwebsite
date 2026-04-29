"use client";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";

const CARDS = [
  {
    icon: "🗄️",
    title: "Resource Vault",
    body: "Access useful academic resources, past papers, and study materials.",
    tint: "#2563EB",
  },
  {
    icon: "🎬",
    title: "Class Recordings",
    body: "Revise lessons anytime and catch up on missed topics.",
    tint: "#8B5CF6",
  },
  {
    icon: "🤖",
    title: "AI Study Support",
    body: "Use guided digital learning tools for extra study support.",
    tint: "#06B6D4",
  },
  {
    icon: "📝",
    title: "Exam Preparation",
    body: "Practice with assessments, revision sessions, and progress reviews.",
    tint: "#22C55E",
  },
];

export function ResourceSupport() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  return (
    <section
      ref={ref}
      id="resources"
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobY }}>
          <AmbientGlow top="14%" left="-4%" size={220} color="#FACC15" opacity={[0.06, 0.14]} duration={22} blur={80} />
        </m.div>
        <AmbientGlow bottom="6%" right="-4%" size={220} color="#06B6D4" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Resource & Learning Support</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            More than <em>online classes.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS supports students with learning resources, class recordings, guided revision, exams,
            and digital tools that help students continue learning after the live class.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {CARDS.map((c) => (
            <m.article
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-6 relative overflow-hidden"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 180, height: 180, background: c.tint, opacity: 0.20 }} />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${c.tint}15`, border: `1px solid ${c.tint}25` }}
                >
                  {c.icon}
                </div>
                <h3 className="heading mt-5" style={{ fontSize: "18px" }}>{c.title}</h3>
                <p className="text-[#2B3950] text-[13.5px] mt-2 leading-[1.65]">{c.body}</p>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
