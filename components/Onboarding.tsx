import Link from "next/link";

const STEPS = [
  { n: "01", title: "Register", body: "Sign up in under a minute. Tell us your grade, syllabus, and the subjects you're after." },
  { n: "02", title: "Consultation", body: "A dedicated student consultant walks you through the right classes, tutors, and pace for you." },
  { n: "03", title: "Pay & Learn", body: "Secure payment, instant access. Live classes, recordings, exams, and parent updates from day one." },
];

export function Onboarding() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="kicker">
              <span className="kicker-num">§ 07</span>
              Onboarding / Three steps
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Register. Consult. <em className="accent">Begin.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
              No fragmented forms. Register, talk to a real human, then learn — with WhatsApp
              available as a fallback at any point.
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <div className="grid md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              className={`relative p-7 lg:p-10 border-b border-[rgba(14,20,33,0.10)] md:border-b-0 ${i !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}
            >
              <p className="font-display italic text-[80px] leading-none text-[rgba(14,20,33,0.10)]">
                {s.n}
              </p>
              <h3 className="display mt-4" style={{ fontSize: "var(--fs-h3)" }}>{s.title}</h3>
              <p className="text-[#2C334A] text-[14px] mt-3 leading-[1.65] max-w-sm">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="rule-strong" />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/enrol" className="btn btn-primary">Start enrolment</Link>
          <Link href="/contact" className="btn btn-ghost">Book consultation</Link>
        </div>
      </div>
    </section>
  );
}
