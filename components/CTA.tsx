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
            <AmbientGlow top="-8%" left="-4%" size={200} color="#2563EB" opacity={[0.12, 0.22]} duration={20} blur={80} />
            <AmbientGlow top="-8%" right="-4%" size={200} color="#8B5CF6" opacity={[0.12, 0.22]} duration={22} delay={2} blur={80} />
            <AmbientGlow bottom="-12%" left="35%" size={220} color="#06B6D4" opacity={[0.10, 0.18]} duration={24} delay={4} blur={80} />
            <AmbientGlow bottom="-12%" right="20%" size={180} color="#FACC15" opacity={[0.12, 0.20]} duration={18} delay={1} blur={70} />
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inViewClose}
          >
            <m.p variants={fadeUp} className="eyebrow"><span className="dot" />Ready When You Are</m.p>
            <m.h2
              variants={fadeUp}
              className="heading mt-5"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15 }}
            >
              Give your child a smarter <em>online learning experience.</em>
            </m.h2>
            <m.p variants={fadeUp} className="text-[#2B3950] text-[15.5px] max-w-2xl mx-auto mt-5 leading-[1.7]">
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
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.10)] px-3 py-3.5 text-center shadow-[0_2px_8px_-4px_rgba(16,32,51,0.06)]"
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
