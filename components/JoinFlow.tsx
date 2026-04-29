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
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="kicker">
              <span className="kicker-num">§ 08</span>
              Process / How to join
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              One unified <em className="accent">join flow.</em>
            </h2>
            <p className="text-[#2C334A] mt-5 max-w-sm text-[14.5px] leading-relaxed">
              No more half-finished forms or WhatsApp-only paths. Five clean steps, progressive
              disclosure, and a confirmation you can act on.
            </p>
            <div className="mt-7 flex gap-3">
              <Link href="/enrol" className="btn btn-primary">Start enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Book a call</Link>
            </div>
          </div>

          <ol className="col-span-12 lg:col-span-8">
            <div className="rule-strong" />
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-12 gap-6 py-8 border-b border-[rgba(14,20,33,0.10)]">
                <div className="col-span-2 md:col-span-1">
                  <p className="font-display italic text-[28px] leading-none text-[#1640D8]">{s.n}</p>
                </div>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="display leading-tight" style={{ fontSize: "var(--fs-h2)" }}>{s.title}</h3>
                  <p className="text-[#2C334A] mt-3 text-[15px] leading-[1.65] max-w-xl">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
