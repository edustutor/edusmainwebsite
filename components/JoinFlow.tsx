import Link from "next/link";

const STEPS = [
  { n: "01", title: "Choose Your Region", body: "Sri Lanka, India, or global one-to-one. We'll show only what's available in your market.", tint: "#2563EB" },
  { n: "02", title: "Pick Class Type", body: "Group classes for structured weekly progress, or one-to-one for personal pace and timing.", tint: "#8B5CF6" },
  { n: "03", title: "Select Grade & Subject", body: "Filter by grade, syllabus, and the subjects your student needs. We match you with a tutor.", tint: "#06B6D4" },
  { n: "04", title: "Book a Free Consultation", body: "Talk to an EDUS advisor who'll confirm your plan and walk through next steps with no pressure.", tint: "#22C55E" },
  { n: "05", title: "Start Learning", body: "Secure payment, instant confirmation, recordings from day one, and weekly parent updates.", tint: "#FACC15" },
];

export function JoinFlow() {
  return (
    <section id="enrolment" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", right: "-6%", width: 380, height: 380, background: "#22C55E", opacity: 0.14 }} />
      </div>

      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow"><span className="dot" />Enrolment Flow</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              From sign-up to <em>steady progress.</em>
            </h2>
            <p className="text-[#2B3950] mt-5 text-[15.5px] leading-[1.7]">
              Five simple steps. No fragmented forms, no guesswork. Real human consultants from start
              to finish.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </div>
          </div>

          <ol className="lg:col-span-8 space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="glass rounded-[22px] p-6 lift flex items-start gap-5">
                <span
                  className="inline-flex w-12 h-12 rounded-2xl items-center justify-center font-[family-name:var(--font-display)] font-700 text-[16px] text-white shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${s.tint}DD, ${s.tint})`,
                    boxShadow: `0 10px 22px -8px ${s.tint}80`,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="heading" style={{ fontSize: "19px" }}>{s.title}</h3>
                  <p className="text-[#2B3950] text-[14.5px] mt-2 leading-[1.65]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
