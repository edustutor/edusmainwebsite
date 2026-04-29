const REASONS = [
  {
    icon: "personal",
    title: "Personalised attention",
    body: "Tutor-matching, small group sizes, and one-to-one timing flexibility built around the student.",
  },
  {
    icon: "parent",
    title: "Parent updates that mean something",
    body: "Attendance monitoring, term reports, and a parent-facing app so you never wonder how it's going.",
  },
  {
    icon: "rec",
    title: "Recordings, revision, exams",
    body: "Every live class is recorded. Periodic assessments and exam prep keep students on track.",
  },
  {
    icon: "ai",
    title: "AI Study Buddy",
    body: "A focused, beta companion for revision questions and self-paced learning between classes.",
  },
  {
    icon: "vault",
    title: "Resource vault",
    body: "Past papers and filtered resources by provider, medium, subject, and grade — owned by EDUS.",
  },
  {
    icon: "trust",
    title: "Single source of truth",
    body: "One controlled set of metrics, contacts, and proof. No mixed claims across pages or apps.",
  },
];

export function WhyJoin() {
  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="glow" style={{ top: "10%", right: "-10%", width: 520, height: 520, background: "#CFE0FF" }} />
      </div>

      <div className="container-edge">
        <div className="max-w-2xl">
          <p className="eyebrow"><span className="dot" />03 · Why families choose EDUS</p>
          <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Built for results. <em>Designed for trust.</em>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((r, i) => (
            <article key={r.title} className="relative glass rounded-3xl p-7 lift">
              <div className="flex items-start justify-between">
                <ReasonIcon name={r.icon} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C6485]">
                  R/{(i + 1).toString().padStart(2, "0")}
                </span>
              </div>
              <h3 className="display text-2xl mt-6 leading-tight">{r.title}</h3>
              <p className="text-[#2B3458] text-sm mt-3 leading-relaxed">{r.body}</p>
              <div className="mt-6 pt-5 border-t border-[rgba(10,18,48,0.06)] flex items-center justify-between">
                <span className="text-xs font-mono text-[#5C6485]">Included for every learner</span>
                <span className="w-7 h-7 rounded-full border border-[rgba(10,18,48,0.10)] inline-flex items-center justify-center text-[#2B3458]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonIcon({ name }: { name: string }) {
  const common = "w-12 h-12 rounded-2xl glass-tint flex items-center justify-center text-[#0A55F5]";
  const stroke = (path: React.ReactNode) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      {path}
    </svg>
  );
  const map: Record<string, React.ReactNode> = {
    personal: stroke(
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
      </>,
    ),
    parent: stroke(
      <>
        <rect x="4" y="4" width="16" height="13" rx="2" />
        <path d="M4 9h16M9 13h6" strokeLinecap="round" />
        <path d="M8 21l4-3 4 3" strokeLinecap="round" strokeLinejoin="round" />
      </>,
    ),
    rec: stroke(
      <>
        <rect x="3" y="6" width="14" height="12" rx="2" />
        <path d="M17 10l4-2v8l-4-2z" />
      </>,
    ),
    ai: stroke(
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
        <rect x="7" y="7" width="10" height="10" rx="2.5" />
        <circle cx="12" cy="12" r="2" />
      </>,
    ),
    vault: stroke(
      <>
        <path d="M4 6l8-3 8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>,
    ),
    trust: stroke(
      <>
        <path d="M3 12h4l3-7 4 14 3-7h4" strokeLinecap="round" strokeLinejoin="round" />
      </>,
    ),
  };
  return <span className={common}>{map[name]}</span>;
}
