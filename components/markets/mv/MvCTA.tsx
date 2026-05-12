"use client";
import Link from "next/link";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { staggerContainer, fadeUp, scaleIn, inViewClose } from "@/lib/motion";
import { MV_SIGNUP } from "./MvShared";

export function MvCTA() {
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
            <AmbientGlow top="-8%" left="-4%"  size={200} color="#06B6D4" opacity={[0.14, 0.22]} duration={20} blur={80} />
            <AmbientGlow top="-8%" right="-4%" size={200} color="#22C55E" opacity={[0.12, 0.20]} duration={22} delay={2} blur={80} />
            <AmbientGlow bottom="-12%" left="35%" size={220} color="#2563EB" opacity={[0.10, 0.18]} duration={24} delay={4} blur={80} />
          </div>

          <m.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inViewClose}>
            <m.p variants={fadeUp} className="eyebrow"><span className="dot" />Ready to Start</m.p>
            <m.h2
              variants={fadeUp}
              className="heading mt-5"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15 }}
            >
              Give your child the right support, at the <em>right time.</em>
            </m.h2>
            <m.p variants={fadeUp} className="text-[#2B3950] text-[15.5px] max-w-2xl mx-auto mt-5 leading-[1.7]">
              Cambridge IGCSE and O-Level years are important. With the right tutor, clear guidance,
              and consistent support, your child can improve faster and prepare with confidence.
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={MV_SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start Learning with EDUS
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {[
                { k: "From $18", v: "Per hour" },
                { k: "1:1", v: "Individual classes only" },
                { k: "Cambridge", v: "IGCSE / O-Level" },
                { k: "Grade 9-10", v: "Maldives focus" },
              ].map((s) => (
                <m.div
                  key={s.v}
                  variants={fadeUp}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.10)] px-3 py-3.5 text-center shadow-[0_2px_8px_-4px_rgba(16,32,51,0.06)]"
                >
                  <p className="font-[family-name:var(--font-display)] font-700 text-[16px] text-[#102033]">{s.k}</p>
                  <p className="text-[11px] text-[#5A6A82] mt-0.5">{s.v}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
