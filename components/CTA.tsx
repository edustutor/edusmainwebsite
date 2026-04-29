"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { staggerContainer, fadeUp, scaleIn, inViewClose } from "@/lib/motion";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-edge">
        <m.div
          className="relative rounded-[36px] glass-strong p-8 md:p-14 overflow-hidden text-center"
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={inViewClose}
          style={{ y: cardY }}
        >
          {/* Breathing color glows */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <AmbientGlow top="-10%" left="-10%" size={380} color="#2563EB" opacity={[0.18, 0.32]} duration={18} />
            <AmbientGlow top="-10%" right="-10%" size={340} color="#8B5CF6" opacity={[0.18, 0.32]} duration={20} delay={2} />
            <AmbientGlow bottom="-15%" left="30%" size={400} color="#06B6D4" opacity={[0.14, 0.26]} duration={22} delay={4} />
            <AmbientGlow bottom="-15%" right="20%" size={300} color="#FACC15" opacity={[0.18, 0.30]} duration={16} delay={1} />
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inViewClose}
          >
            <m.p variants={fadeUp} className="eyebrow"><span className="dot" />Ready When You Are</m.p>
            <m.h2 variants={fadeUp} className="heading mt-5" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
              Give your child a smarter<br />
              <em>online learning experience.</em>
            </m.h2>
            <m.p variants={fadeUp} className="text-[#2B3950] text-[17px] max-w-2xl mx-auto mt-6 leading-[1.7]">
              Join EDUS and help your child learn with live classes, expert tutors, structured academic
              support, parent updates, recordings, and clear progress tracking.
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-yellow">Book a Free Consultation</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {[
                { k: "Free", v: "Consultation" },
                { k: "48 hr", v: "Tutor matching" },
                { k: "Weekly", v: "Parent reports" },
                { k: "24 / 7", v: "Student support" },
              ].map((s) => (
                <m.div
                  key={s.v}
                  variants={fadeUp}
                  className="rounded-2xl bg-white/80 border border-white/80 px-3 py-3.5 text-center"
                >
                  <p className="font-[family-name:var(--font-display)] font-700 text-[18px] text-[#102033]">{s.k}</p>
                  <p className="text-[11.5px] text-[#5A6A82] mt-0.5">{s.v}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
