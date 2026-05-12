"use client";
import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";
import { JsonLdScript, faqPage } from "@/components/layout/StructuredData";

const FAQS = [
  {
    q: "Does EDUS offer online classes for Maldives students?",
    a: "Yes. EDUS offers premium 1-to-1 online classes for Maldives students preparing for Cambridge IGCSE and O-Level subjects.",
  },
  {
    q: "Which grades are available for Maldives students?",
    a: "Currently EDUS focuses on Grade 9 and Grade 10 students following Cambridge IGCSE / O-Level subjects.",
  },
  {
    q: "Are these group classes or individual classes?",
    a: "All Maldives classes are conducted as individual 1-to-1 online classes. Group classes are not offered for the Maldives launch.",
  },
  {
    q: "What subjects are available?",
    a: "EDUS currently offers Mathematics 0580, English as a Second Language 0510, Biology 0610, Chemistry 0620, and Physics 0625.",
  },
  {
    q: "How much does each class cost?",
    a: "Pricing starts from USD 18 per hour. Subject-wise fees vary: Mathematics $20, English $18, Biology $22, Chemistry $24, and Physics $24 per hour.",
  },
  {
    q: "Can students from islands outside Malé join?",
    a: "Yes. Students from any island in the Maldives can join EDUS online classes from home - no travel required.",
  },
  {
    q: "Can parents track the student's progress?",
    a: "Yes. Parents receive updates regarding attendance, learning progress, and areas that need improvement.",
  },
  {
    q: "How do we start?",
    a: "Parents can submit the registration form. The EDUS academic team will contact you to understand the student's needs and arrange the most suitable class plan.",
  },
];

export function MvFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <JsonLdScript data={faqPage(FAQS)} />
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={220} color="#06B6D4" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={200} color="#22C55E" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
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
            Maldives parents <em>frequently ask.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Everything you need to know before enrolling your child.
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
                      backgroundColor: isOpen ? "#06B6D4" : "#FFFFFF",
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
