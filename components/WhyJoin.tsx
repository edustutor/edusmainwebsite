const REASONS = [
  { icon: "🎯", title: "Personalised attention", body: "Tutor matching, small groups, and one-to-one timing flexibility built around the student.", tint: "#2563EB" },
  { icon: "📊", title: "Weekly parent reports", body: "Attendance, homework completion, and topic-by-topic progress shared every week.", tint: "#8B5CF6" },
  { icon: "🎥", title: "Recordings & revision", body: "Every live class is recorded. Periodic exams and revision keep students on track.", tint: "#06B6D4" },
  { icon: "🤖", title: "AI Study Buddy", body: "A smart companion for revision questions and self-paced learning between classes.", tint: "#22C55E" },
  { icon: "🗄️", title: "Resource Vault", body: "Past papers and curated notes by syllabus, subject, and grade — owned by EDUS.", tint: "#FACC15" },
  { icon: "🛡️", title: "Safeguarding first", body: "Vetted tutors, monitored classrooms, and parent-grade safety standards by default.", tint: "#2563EB" },
];

export function WhyJoin() {
  return (
    <section id="why" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", left: "-8%", width: 420, height: 420, background: "#06B6D4", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", right: "-6%", width: 380, height: 380, background: "#FACC15", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Why Choose EDUS</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Built for results. <em>Designed for trust.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Six standards that come with every learner — across Sri Lanka, India, and the world.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((r) => (
            <article
              key={r.title}
              className="glass rounded-[24px] p-7 lift relative overflow-hidden"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
