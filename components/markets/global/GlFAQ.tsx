"use client";
import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";

const FAQS = [
  {
    q: "What is EDUS Global?",
    a: "EDUS Global is the international one to one online tutoring service of EDUS, designed for students from any country who need personalized live classes with expert tutors.",
  },
  {
    q: "Can students from any country join EDUS Global?",
    a: "Yes. Students from any country can request one to one online classes through EDUS Global, depending on syllabus, subject, tutor availability, and time zone.",
  },
  {
    q: "Does EDUS teach Cambridge and Edexcel students?",
    a: "Yes. EDUS Global supports students following Cambridge and Edexcel syllabuses, including IGCSE, GCSE, O-Level, AS Level, and A-Level subjects.",
  },
  {
    q: "Can EDUS arrange tutors for other syllabuses?",
    a: "Yes. EDUS can arrange one to one tutoring for different international and national syllabuses based on the student's requirement and tutor availability.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "EDUS Global classes are live online one to one sessions. Students interact directly with the tutor, ask questions, and receive personalized guidance.",
  },
  {
    q: "How are tutors selected?",
    a: "Tutors are selected based on subject expertise, teaching experience, communication ability, syllabus understanding, and suitability for the student's requirement.",
  },
  {
    q: "Can parents receive progress updates?",
    a: "Yes. Parents receive updates about attendance, learning progress, student improvement, and academic areas that need more focus.",
  },
  {
    q: "Are class timings flexible?",
    a: "Yes. Class timings are arranged based on the student's country, time zone, and tutor availability.",
  },
  {
    q: "How much do EDUS Global classes cost?",
    a: "Fees depend on the subject, grade, syllabus, tutor level, number of classes, and duration. EDUS provides a suitable fee structure after reviewing the requirement.",
  },
  {
    q: "How can I register for EDUS Global classes?",
    a: "Submit the inquiry form and share the student's details. Our academic team will contact you to recommend the right tutor and learning plan.",
  },
];

export function GlFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={220} color="#06B6D4" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={200} color="#2563EB" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Global FAQ</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Frequently asked <em>questions.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Everything parents and students ask before joining EDUS Global.
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
