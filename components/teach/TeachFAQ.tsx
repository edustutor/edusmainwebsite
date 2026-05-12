"use client";
import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";

const FAQS = [
  {
    q: "Can I teach from outside Sri Lanka?",
    a: "Yes. EDUS welcomes qualified tutors from Sri Lanka, India, and other countries, depending on subject requirement, syllabus compatibility, language ability, and teaching quality.",
  },
  {
    q: "Do I need online teaching experience?",
    a: "Online teaching experience is preferred, but not always mandatory. You must be comfortable using online platforms such as Google Meet and digital teaching tools.",
  },
  {
    q: "Will EDUS provide students?",
    a: "EDUS may allocate students or classes based on demand, tutor suitability, subject requirement, and performance.",
  },
  {
    q: "How are tutor payments calculated?",
    a: "Payments are based on the approved payment model, completed classes, class type, rate, additions, deductions, and academic approval.",
  },
  {
    q: "Will my classes be reviewed?",
    a: "Yes. EDUS reviews tutor performance through attendance, recordings, QA checks, student feedback, and academic monitoring.",
  },
  {
    q: "Can I directly contact students?",
    a: "Tutor communication must follow EDUS-approved communication policies. Tutors are not allowed to misuse student contacts or move students outside EDUS.",
  },
  {
    q: "What happens after I apply?",
    a: "The EDUS academic team reviews your application. If shortlisted, you may be contacted for an interview, demo class, subject evaluation, or onboarding discussion.",
  },
];

export function TeachFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={220} color="#8B5CF6" opacity={[0.06, 0.14]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={200} color="#2563EB" opacity={[0.06, 0.12]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Tutor FAQ</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Common tutor <em>questions.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Everything you need to know before applying. Reach out if anything else is unclear.
          </p>
        </m.div>

        <m.div
          className="mt-12 max-w-3xl mx-auto space-y-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <m.div key={f.q} variants={fadeUp} className="glass rounded-[20px] overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="heading text-[16.5px] flex-1">{f.q}</span>
                  <m.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? "#2563EB" : "#FFFFFF",
                      color: isOpen ? "#FFFFFF" : "#102033",
                    }}
                    transition={{ duration: 0.25, ease: [0.25, 0.8, 0.3, 1] }}
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-[rgba(16,32,51,0.10)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      key="content"
                      variants={accordionMotion}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#2B3950] text-[14.5px] leading-[1.7]">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
