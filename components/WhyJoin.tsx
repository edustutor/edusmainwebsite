const REASONS = [
  { idx: "01", title: "Personalised attention", body: "Tutor-matching, small group sizes, and one-to-one timing flexibility built around the student." },
  { idx: "02", title: "Parent updates that mean something", body: "Attendance monitoring, term reports, and a parent app so you never wonder how it's going." },
  { idx: "03", title: "Recordings, revision, exams", body: "Every live class is recorded. Periodic assessments and exam prep keep students on track." },
  { idx: "04", title: "AI Study Buddy", body: "A focused, beta companion for revision questions and self-paced learning between classes." },
  { idx: "05", title: "Resource vault", body: "Past papers and filtered resources by provider, medium, subject, and grade — owned by EDUS." },
  { idx: "06", title: "Single source of truth", body: "One controlled set of metrics, contacts, and proof. No mixed claims across pages or apps." },
];

export function WhyJoin() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="kicker">
              <span className="kicker-num">§ 04</span>
              Differentiators / Why families choose EDUS
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Built for results.<br />
              <em className="accent">Designed for trust.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
              Six standards, every learner
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <article
              key={r.idx}
              className={`p-7 lg:p-9 border-b border-[rgba(14,20,33,0.10)] ${(i + 1) % 3 !== 0 ? "lg:border-r border-[rgba(14,20,33,0.10)]" : ""} ${i % 2 !== 0 ? "md:border-r-0 md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-7">
                <span className="font-display italic text-[20px] text-[#1640D8]">{r.idx} ·</span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B7390]">
                  Standard
                </span>
              </div>
              <h3 className="display leading-[1.1]" style={{ fontSize: "var(--fs-h3)" }}>{r.title}</h3>
              <p className="text-[#2C334A] text-[14px] mt-3 leading-[1.65]">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
