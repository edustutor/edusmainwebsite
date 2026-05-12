"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const COMPONENTS = [
  { icon: "💼", title: "Class Rate",          body: "Per hour, session, student, or class depending on agreement." },
  { icon: "✅", title: "Completed Sessions",  body: "Payments are based on approved completed sessions." },
  { icon: "➕", title: "Additions",           body: "Extra classes, special sessions, bonuses, or approved adjustments." },
  { icon: "➖", title: "Deductions",          body: "Cancellations, missing recordings, attendance, QA, or policy issues." },
  { icon: "🔐", title: "Final Approval",      body: "Payments finalized after academic and admin verification." },
];

export function TeachPayments() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Payments"
            title="Clear, structured, and"
            emphasis="performance-based."
            body="Tutor payments are calculated against the approved model for each class or student - and finalized only after academic and admin verification."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {COMPONENTS.map((c) => (
            <m.article
              key={c.title}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <span className="text-2xl" aria-hidden>{c.icon}</span>
              <p className="mt-3 font-display font-700 text-[14px] text-[#102033] leading-tight">
                {c.title}
              </p>
              <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{c.body}</p>
            </m.article>
          ))}
        </m.div>

        <p className="mt-6 text-center text-[12.5px] text-[#5A6A82]">
          Final payment terms are shared only with selected tutors after screening and discussion.
        </p>
      </div>
    </section>
  );
}
