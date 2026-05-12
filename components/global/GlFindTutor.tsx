"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";
import { GL_SIGNUP } from "./GlobalShared";

export function GlFindTutor() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative rounded-[28px] glass-strong p-8 md:p-12 overflow-hidden text-center"
        >
          <div aria-hidden className="absolute inset-0 -z-10">
            <AmbientGlow top="-8%" left="-4%"  size={200} color="#2563EB" opacity={[0.12, 0.20]} duration={20} blur={80} />
            <AmbientGlow bottom="-12%" right="20%" size={180} color="#06B6D4" opacity={[0.12, 0.20]} duration={22} delay={2} blur={70} />
          </div>

          <p className="eyebrow"><span className="dot" />Quick Match</p>
          <h2 className="heading mt-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
            Ready to find the right tutor for your <em>child?</em>
          </h2>
          <p className="text-[#2B3950] text-[15px] max-w-2xl mx-auto mt-4 leading-[1.7]">
            Whether your child needs help with Cambridge, Edexcel, IGCSE, GCSE, A-Level, school
            subjects, revision, or exam preparation, EDUS Global is ready to help.
          </p>

          <m.div variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={GL_SIGNUP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Find My Tutor
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#pricing" className="btn btn-yellow">View Pricing Factors</a>
          </m.div>

          <p className="mt-5 text-[12.5px] text-[#5A6A82]">
            Submit your requirement today. Our academic team will guide you with the best
            available tutor and class plan.
          </p>
        </m.div>
      </div>
    </section>
  );
}
