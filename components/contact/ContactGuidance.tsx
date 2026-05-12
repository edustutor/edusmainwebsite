import Link from "next/link";

const ROUTING = [
  { tag: "For new admissions",       hint: "choose Student Admissions" },
  { tag: "For current students",     hint: "choose Existing Student Support" },
  { tag: "For global tutoring",      hint: "choose EDUS Global Support" },
  { tag: "For tutor applications",   hint: "choose Tutor Inquiry" },
  { tag: "For partnerships",         hint: "choose Partnership Inquiry" },
];

export function ContactGuidance() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge max-w-4xl mx-auto">
        <div className="rounded-3xl glass-strong p-6 md:p-10">
          <p className="eyebrow"><span className="dot" />Not Sure Who to Contact</p>
          <h2 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
            Send your inquiry. We&apos;ll route it to the{" "}
            <em>right department.</em>
          </h2>

          <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {ROUTING.map((r) => (
              <li
                key={r.tag}
                className="bg-white border border-[rgba(16,32,51,0.06)] rounded-xl px-4 py-3 text-[13px] text-[#2B3950]"
              >
                <strong className="font-[family-name:var(--font-display)] font-700 text-[#102033]">{r.tag}:</strong>{" "}
                <span className="text-[#5A6A82]">{r.hint}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#inquiry" className="btn btn-primary">
              Make an Inquiry Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
