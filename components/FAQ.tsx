"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Is EDUS only for students under 18?",
    a: "Yes. EDUS is designed for school-age students from Grade 1 through A-Level. Parents are partners in the journey through weekly reports and a dedicated parent app.",
  },
  {
    q: "Are all classes taught in English?",
    a: "Our international and India offerings are 100% English medium. The Sri Lanka programme additionally offers Sinhala and Tamil medium for the National syllabus where required.",
  },
  {
    q: "How qualified are EDUS tutors?",
    a: "Every tutor is screened, demo-tested, interviewed, and trained on our academic SOPs before teaching a single class. Qualified subject specialists only — no juniors or generalists.",
  },
  {
    q: "Can my child join part-way through a term?",
    a: "Yes. We share recordings of every prior class, plus a one-to-one catch-up plan from your tutor so your student is never behind.",
  },
  {
    q: "What syllabuses do you cover?",
    a: "Sri Lanka National (G.C.E. O/L and A/L), Cambridge IGCSE & A-Level, Edexcel, IB Diploma, CBSE, and Indian matriculation boards. Filtering shows only what's offered in your market.",
  },
  {
    q: "What does the free consultation include?",
    a: "A 20-minute call with an EDUS advisor: we review the student's grade and goals, recommend tutors, walk you through the platform, and answer every parent question — no commitment.",
  },
  {
    q: "Are recordings included in every class?",
    a: "Yes. Every live class is recorded and added to the student's library. They can rewatch any topic, anytime, from the EDUS Tutor app or web platform.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cards, bank transfers, UPI, Google Pay, PhonePe, and Razorpay (India). All payments are secure and you'll receive an instant confirmation.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-6%", width: 360, height: 360, background: "#8B5CF6", opacity: 0.14 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Frequently Asked</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Questions parents ask. <em>Answered.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Can't find what you're looking for? Book a free consultation and our team will walk you
            through everything.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="glass rounded-[20px] overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="heading text-[16.5px] flex-1">{f.q}</span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition ${
                      isOpen ? "bg-[#2563EB] text-white" : "bg-white border border-[rgba(16,32,51,0.10)] text-[#102033]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[#2B3950] text-[14.5px] leading-[1.7]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
