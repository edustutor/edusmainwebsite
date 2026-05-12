"use client";
import { useState } from "react";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";
import { JsonLdScript, faqPage } from "@/components/layout/StructuredData";

/**
 * Sri Lanka FAQ — answers derived only from publicly stated facts in the
 * llms-full.txt knowledge base. No fabricated content.
 */

const FAQS = [
  {
    q: "Which grades does EDUS Sri Lanka cover?",
    a: "EDUS Sri Lanka offers online tuition from Grade 1 through to G.C.E A/L. This includes the primary years, junior secondary, O/L preparation (Grade 10 and 11), and A/L streams.",
  },
  {
    q: "Which syllabuses are supported?",
    a: "EDUS Sri Lanka teaches the Sri Lankan National Syllabus, Cambridge IGCSE, and Edexcel. Tutors are matched to the specific syllabus the student follows at school.",
  },
  {
    q: "What mediums of instruction are available?",
    a: "Classes are offered in Sinhala, Tamil, and English medium. Students can pick the medium that matches their school's instruction or their preferred learning language.",
  },
  {
    q: "Are these group classes or one-to-one?",
    a: "Both. EDUS Sri Lanka runs scheduled live group classes and one-to-one online tuition. Group classes follow a fixed timetable; one-to-one tuition is scheduled around the student's availability.",
  },
  {
    q: "How much does EDUS Sri Lanka cost?",
    a: "Group class fees start from LKR 1,000 per subject per month for primary and junior secondary, LKR 1,200 per subject per month for O/L (Grade 10 and 11), and LKR 2,500 per subject per month for A/L. One-to-one tuition starts from LKR 2,500 per hour across all grades.",
  },
  {
    q: "Which A/L subjects can students take?",
    a: "EDUS Sri Lanka covers G.C.E A/L Combined Mathematics, Biology, Chemistry, Physics, ICT, English Literature, Economics, Business Studies, and Accounting.",
  },
  {
    q: "Are classes live or pre-recorded?",
    a: "All classes are conducted live online with trained tutors. Recordings of each live class are also provided so students can revise the lesson afterwards.",
  },
  {
    q: "Can parents track progress?",
    a: "Yes. Parents receive attendance, learning progress, and exam feedback updates. The EDUS academic team also runs scheduled progress reviews depending on the class type.",
  },
  {
    q: "Does EDUS prepare students for the Grade 5 Scholarship Exam?",
    a: "Yes. EDUS offers structured Grade 5 Scholarship preparation in Sinhala, Tamil, and English medium, with live online classes covering reasoning, mathematics, and language.",
  },
  {
    q: "How do students enrol?",
    a: "Parents can register at https://signup.edustutor.com/ or contact the EDUS team. After reviewing the student's grade, subject, and syllabus, the academic team confirms the most suitable class plan within one business day.",
  },
];

export function SlFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <JsonLdScript data={faqPage(FAQS)} />
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={220} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={200} color="#8B5CF6" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
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
            Sri Lankan parents <em>frequently ask.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Everything you need to know about EDUS Sri Lanka before enrolling your child.
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
