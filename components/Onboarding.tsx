import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Register",
    body: "Sign up in under a minute. Tell us your grade, syllabus, and the subjects you're after.",
    cta: "Create account",
  },
  {
    n: "02",
    title: "Consultation",
    body: "A dedicated student consultant walks you through the right classes, tutors, and pace for you.",
    cta: "Book a call",
  },
  {
    n: "03",
    title: "Pay & Learn",
    body: "Secure payment, instant access. Live classes, recordings, exams, and parent updates from day one.",
    cta: "Start learning",
  },
];

export function Onboarding() {
  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="glow" style={{ top: "10%", left: "-8%", width: 500, height: 500, background: "#CFE0FF" }} />
      </div>

      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="eyebrow"><span className="dot" />Onboarding · 3 steps</p>
            <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Get going in <em>three steps.</em>
            </h2>
          </div>
          <p className="text-[#5C6485] max-w-md text-[15px] leading-relaxed">
            No friction, no fragmented forms. Register, talk to a real human, then learn — with WhatsApp
            available as a fallback at any point.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <article key={s.n} className="relative glass rounded-3xl p-7 lift overflow-hidden">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">
                  Step · {s.n}
                </span>
                <span className="inline-flex w-9 h-9 rounded-full glass-tint items-center justify-center font-display text-lg text-[#0A1230]">
                  {i + 1}
                </span>
              </div>
              <h3 className="display mt-6 leading-tight" style={{ fontSize: "var(--fs-h3)" }}>{s.title}</h3>
              <p className="text-[#2B3458] text-[14.5px] mt-3 leading-relaxed">{s.body}</p>
              <Link href="/enrol" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0A55F5]">
                {s.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
