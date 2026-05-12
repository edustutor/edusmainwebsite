"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, PlainCard, ApplyCtaRow } from "./TeachShared";

const REASONS = [
  { icon: "📋", title: "Structured Class Allocation", body: "Classes assigned based on subject expertise, availability, and student demand.", tint: "#2563EB" },
  { icon: "🌐", title: "Teach From Anywhere",         body: "Online teaching opportunity for tutors with a proper setup.",                  tint: "#06B6D4" },
  { icon: "🎓", title: "Academic Support",            body: "Class planning, student coordination, and performance improvement.",          tint: "#8B5CF6" },
  { icon: "🧑‍💼", title: "Student Consultant Support", body: "Coordination on attendance, follow-ups, and communication.",                  tint: "#22C55E" },
  { icon: "🏆", title: "Performance Recognition",     body: "Top tutors identified through monthly reports and QA reviews.",               tint: "#FACC15" },
  { icon: "📈", title: "Growth Opportunities",        body: "More classes, leadership roles, and long-term academic partnerships.",        tint: "#2563EB" },
  { icon: "💳", title: "System-Based Payments",       body: "Calculated by class completion, rate, attendance, QA, and policies.",        tint: "#8B5CF6" },
  { icon: "🤝", title: "Real Academic Partnership",   body: "Tutors are not random freelancers - they are academic partners.",            tint: "#06B6D4" },
];

export function TeachWhy() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Why Teach with EDUS"
            title="A professional platform for serious"
            emphasis="tutors."
            body="At EDUS, tutors contribute directly to student success and institutional growth. Here is what working with us looks like in practice."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {REASONS.map((r) => (
            <m.div key={r.title} variants={fadeUp}>
              <PlainCard icon={r.icon} title={r.title} body={r.body} tint={r.tint} />
            </m.div>
          ))}
        </m.div>

        <ApplyCtaRow />
      </div>
    </section>
  );
}
