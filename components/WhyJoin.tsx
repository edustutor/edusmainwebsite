"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionReveal, inView } from "@/lib/motion";

const REASONS = [
  {
    icon: "🎥",
    title: "Live Online Classes",
    body: "Students learn through interactive online classes led by qualified tutors. Lessons are structured, scheduled, and easy to access from home.",
    tint: "#2563EB",
  },
  {
    icon: "👩‍🏫",
    title: "Expert Tutors",
    body: "EDUS works with trained tutors who understand school subjects, exam expectations, and student learning gaps.",
    tint: "#8B5CF6",
  },
  {
    icon: "📊",
    title: "Parent Updates",
    body: "Parents stay informed about attendance, class participation, assessments, and learning progress.",
    tint: "#06B6D4",
  },
  {
    icon: "🎬",
    title: "Class Recordings",
    body: "Students can revise missed or difficult lessons through recordings and learning support materials.",
    tint: "#22C55E",
  },
  {
    icon: "📝",
    title: "Exams and Assessments",
    body: "Regular exams and academic reviews help students understand their progress and improve before school exams.",
    tint: "#FACC15",
  },
  {
    icon: "📚",
    title: "Resource Support",
    body: "Students get access to useful learning resources, past paper support, study materials, and guided academic content.",
    tint: "#2563EB",
  },
];

export function WhyJoin() {
  return (
    <section id="why" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", left: "-8%", width: 420, height: 420, background: "#06B6D4", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", right: "-6%", width: 380, height: 380, background: "#FACC15", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Why Choose EDUS</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Why families <em>choose EDUS.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS is built for parents who want more than a normal online class. We combine live teaching,
            structured monitoring, learning resources, and parent communication so students stay supported
            from enrolment to progress review.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {REASONS.map((r) => (
            <m.article
              key={r.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-7 relative overflow-hidden cursor-default"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 180, height: 180, background: r.tint, opacity: 0.20 }} />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${r.tint}15`, border: `1px solid ${r.tint}25` }}
                >
                  {r.icon}
                </div>
                <h3 className="heading mt-6" style={{ fontSize: "19px" }}>{r.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{r.body}</p>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
