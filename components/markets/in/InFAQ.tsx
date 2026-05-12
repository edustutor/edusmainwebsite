"use client";
import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";
import { JsonLdScript, faqPage } from "@/components/layout/StructuredData";

/**
 * India FAQ — answers derived only from publicly stated facts in
 * InShared.tsx and llms-full.txt. No fabricated content.
 */

const FAQS = [
  {
    q: "Which CBSE classes does EDUS India cover?",
    a: "EDUS India focuses on CBSE Classes 6 to 10. This includes the Middle Stage (Classes 6, 7, 8) and the Secondary Stage (Classes 9 and 10).",
  },
  {
    q: "Which subjects are taught?",
    a: "EDUS India teaches three core CBSE subjects: Mathematics, Science, and English. Each is taught at the level required for the CBSE board curriculum for that class.",
  },
  {
    q: "Is this English medium only?",
    a: "Yes. All EDUS India CBSE classes are taught in English medium, aligned to the CBSE board's English-medium curriculum.",
  },
  {
    q: "What does it cost?",
    a: "There is a one-time admission fee of ₹2,000. After that, classes cost ₹1,000 per subject per month, or ₹2,500 per month for all three subjects combined (saving ₹500 vs taking subjects individually).",
  },
  {
    q: "What does the monthly fee include?",
    a: "The fee includes onboarding and assessment, live online classes plus recordings, 2 hours per week per subject, individual attention in every class, performance monitoring, monthly parent reporting and progress reviews, and anytime parent support.",
  },
  {
    q: "When are classes held?",
    a: "Classes run Monday to Saturday across three slots: 6:30 PM to 7:30 PM, 7:45 PM to 8:45 PM, and an optional 9:00 PM to 10:00 PM slot. Each subject runs 2 hours per week.",
  },
  {
    q: "Are these group classes or one-to-one?",
    a: "EDUS India CBSE classes run as live online group classes with recordings. Group sizes are kept small enough that students receive individual attention in every session.",
  },
  {
    q: "How are tutors selected?",
    a: "Every EDUS tutor is vetted, demo-tested, interviewed, and trained before being matched with students. Tutors are segmented by stage (Middle Stage tutors for Classes 6 to 8, Secondary Stage tutors for Classes 9 and 10) and reviewed monthly against academic standards.",
  },
  {
    q: "Are EDUS classes available across Tamil Nadu?",
    a: "Yes. EDUS India online classes are accessible from any city in Tamil Nadu — Chennai, Coimbatore, Madurai, Trichy, Salem, and beyond — as long as the student has an internet-connected device.",
  },
  {
    q: "How do students enrol?",
    a: "Parents can register at https://signup.edustutor.com/ or contact the EDUS team. After reviewing the student's class, subjects, and preferred schedule, the academic team confirms the class plan and start date within one business day.",
  },
];

export function InFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <JsonLdScript data={faqPage(FAQS)} />
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={220} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={200} color="#06B6D4" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />FAQ</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            CBSE parents <em>frequently ask.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Everything you need to know about EDUS India CBSE classes before enrolling your child.
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
                      backgroundColor: isOpen ? "#8B5CF6" : "#FFFFFF",
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
