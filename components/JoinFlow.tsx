import Link from "next/link";

const STEPS = [
  { n: "01", title: "Choose your market", body: "Sri Lanka, India, or global one-to-one. The site only shows valid combinations from this point on." },
  { n: "02", title: "Class type & syllabus", body: "Group or individual. Grade, board, and medium filtering — only what's offered in your market." },
  { n: "03", title: "Match or consult", body: "View timetabled options instantly, or request a free consultation with an EDUS advisor." },
  { n: "04", title: "Submit details", body: "A short, multi-step form that reveals only the fields that matter after each previous choice." },
  { n: "05", title: "Pay and begin", body: "Secure payment, instant confirmation, and a clear first-class plan. WhatsApp remains for fallback support." },
];

export function JoinFlow() {
  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow"><span className="dot" />05 · How to join</p>
            <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
              One unified <em>join flow.</em>
            </h2>
            <p className="text-[#5C6485] mt-5 max-w-sm">
              No more half-finished forms or WhatsApp-only paths. Five clean steps, progressive disclosure, and a confirmation
              you can act on.
            </p>
            <div className="mt-7 flex gap-3">
              <Link href="/enrol" className="btn btn-sun">Start enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Book a call</Link>
            </div>
          </div>

          <ol className="lg:col-span-8 relative">
            <span aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[rgba(10,18,48,0.10)] to-transparent" />
            {STEPS.map((s) => (
              <li key={s.n} className="relative pl-14 pb-9 last:pb-0">
                <span className="absolute left-0 top-0 w-9 h-9 rounded-full glass-tint flex items-center justify-center font-mono text-[11px] tracking-wider text-[#0A55F5]">
                  {s.n}
                </span>
                <div className="glass rounded-2xl p-6 lift">
                  <h3 className="display text-2xl">{s.title}</h3>
                  <p className="text-[#2B3458] mt-2 text-sm leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
