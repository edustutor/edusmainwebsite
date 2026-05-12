"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { staggerContainer, fadeUp, scaleIn, inViewClose } from "@/lib/motion";
import { APPLY_URL } from "./TeachShared";

export function TeachCTA() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-edge">
        <m.div
          className="relative rounded-[36px] glass-strong p-8 md:p-14 overflow-hidden text-center"
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={inViewClose}
        >
          <div aria-hidden className="absolute inset-0 -z-10">
            <AmbientGlow top="-8%" left="-4%"  size={200} color="#2563EB" opacity={[0.12, 0.22]} duration={20} blur={80} />
            <AmbientGlow top="-8%" right="-4%" size={200} color="#8B5CF6" opacity={[0.12, 0.22]} duration={22} delay={2} blur={80} />
            <AmbientGlow bottom="-12%" left="35%"  size={220} color="#06B6D4" opacity={[0.10, 0.18]} duration={24} delay={4} blur={80} />
            <AmbientGlow bottom="-12%" right="20%" size={180} color="#FACC15" opacity={[0.12, 0.20]} duration={18} delay={1} blur={70} />
          </div>

          <m.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inViewClose}>
            <m.p variants={fadeUp} className="eyebrow"><span className="dot" />Join the EDUS Tutor Network</m.p>
            <m.h2
              variants={fadeUp}
              className="heading mt-5"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15 }}
            >
              Teach with discipline, professionalism, and <em>purpose.</em>
            </m.h2>
            <m.p variants={fadeUp} className="text-[#2B3950] text-[15.5px] max-w-2xl mx-auto mt-5 leading-[1.7]">
              At EDUS, teaching is about building confidence, shaping futures, and creating
              meaningful academic progress for students across borders. If you are ready,
              EDUS is ready to work with you.
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now as an EDUS Tutor
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#apply" className="btn btn-yellow">Review Declaration</a>
            </m.div>

            <m.p variants={fadeUp} className="mt-6 text-[12px] uppercase tracking-[0.12em] text-[#5A6A82] font-display font-600">
              By applying you agree to EDUS academic standards, tutor policies, and QA procedures.
            </m.p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
