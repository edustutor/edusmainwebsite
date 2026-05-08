"use client";
import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, staggerContainer, sectionRevealStrong, accordionMotion, inView } from "@/lib/motion";

const FAQS = [
  {
    q: "What is EDUS?",
    a: "EDUS is an online education platform that provides live online tuition, group classes, one to one learning, academic monitoring, learning resources, and parent updates for school students.",
  },
  {
    q: "Who can join EDUS classes?",
    a: "Students can join based on their region, grade, syllabus, subject, and learning need. EDUS currently supports Sri Lanka classes, India Grades 6 to 10, Maldives classes, and global one to one learning pathways.",
  },
  {
    q: "Are classes conducted live?",
    a: "Yes. EDUS classes are conducted live online with trained tutors. Students can interact, ask questions, and follow a structured lesson plan.",
  },
  {
    q: "Can parents track student progress?",
    a: "Yes. EDUS supports parent communication through attendance updates, progress reviews, exam feedback, and academic monitoring.",
  },
  {
    q: "Are recordings available?",
    a: "Yes. Class recordings and learning resources may be provided depending on the class type and learning plan.",
  },
  {
    q: "Does EDUS offer one to one tuition?",
    a: "Yes. EDUS offers one to one online tuition for students who need personalised support, flexible timing, and subject specific attention.",
  },
  {
    q: "What subjects are available for India?",
    a: "The India launch focuses on English medium Grades 6 to 10 with Tamil, English, Maths & Science.",
  },
  {
    q: "How do I enrol?",
    a: "Choose your region, select the class type, choose the grade and subject, submit parent details, and the EDUS team will guide you through the next step.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-40, 60]);

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobY }}>
          <AmbientGlow top="14%" right="-4%" size={220} color="#8B5CF6" opacity={[0.06, 0.14]} duration={22} blur={80} />
        </m.div>
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
          <p className="eyebrow"><span className="dot" />FAQ</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Frequently asked <em>questions.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Can't find what you're looking for? Book a free consultation and our team will walk you
            through everything.
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
              <m.div key={i} variants={fadeUp} className="glass rounded-[20px] overflow-hidden">
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
