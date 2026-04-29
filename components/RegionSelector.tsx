import Link from "next/link";

type Region = {
  code: string;
  flag: string;
  name: string;
  title: string;
  pitch: string;
  bullets: string[];
  cta: string;
  href: string;
  meta: string;
  index: string;
};

const REGIONS: Region[] = [
  {
    code: "SL",
    flag: "🇱🇰",
    name: "Sri Lanka",
    title: "National syllabus, group & 1:1.",
    pitch: "Live online classes for Grade 1 to A/L. Sinhala, Tamil, English medium. Group from LKR 1,000 / month.",
    bullets: ["G1 – A/L", "3 mediums", "Group + Individual"],
    cta: "Enter Sri Lanka",
    href: "/sl",
    meta: "edustutor.com/sl",
    index: "01",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    name: "India · Chennai",
    title: "Premium structured tuition.",
    pitch: "Grades 6–10. CBSE / Matriculation aligned. Weekly parent reports, exam analytics, ₹1,000 per subject.",
    bullets: ["Grade 6 – 10", "English medium", "Weekly reporting"],
    cta: "Enter India",
    href: "/in",
    meta: "edustutor.com/in",
    index: "02",
  },
  {
    code: "GL",
    flag: "🌐",
    name: "Global · 1:1",
    title: "Personal tutors, anywhere.",
    pitch: "Cambridge, Edexcel, IB, AP. Flexible timings across 30+ countries. Tutor matched within 48 hours.",
    bullets: ["Cambridge · Edexcel · IB", "Flexible timing", "48-hr match"],
    cta: "Enter Global",
    href: "/global",
    meta: "edustutor.com/global",
    index: "03",
  },
];

export function RegionSelector() {
  return (
    <div>
      {/* Section head */}
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="kicker">
            <span className="kicker-num">§ 01</span>
            Markets / Choose your door
          </p>
          <h2 className="display mt-5" style={{ fontSize: "var(--fs-display)" }}>
            One brand. <em className="accent">Three immediate doors.</em>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:pb-3">
          <p className="text-[#2C334A] text-[14.5px] leading-relaxed max-w-md">
            Each door routes you to a tailored microsite that only ever shows valid combinations
            for your market. Switch any time from the global header.
          </p>
        </div>
      </div>

      <div className="rule-strong mt-10" />

      {/* Region rows — editorial table */}
      <div>
        {REGIONS.map((r, i) => (
          <Link
            key={r.code}
            href={r.href}
            className="group block py-8 lg:py-10 border-b border-[rgba(14,20,33,0.10)] hover:bg-[rgba(14,20,33,0.02)] transition-colors"
          >
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Index + flag */}
              <div className="col-span-12 lg:col-span-2 flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B7390]">
                  No. {r.index}
                </span>
                <span className="text-3xl">{r.flag}</span>
              </div>

              {/* Title block */}
              <div className="col-span-12 lg:col-span-5">
                <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#1640D8] mb-2">
                  {r.code} · {r.name}
                </p>
                <h3 className="display leading-[1.04]" style={{ fontSize: "var(--fs-h2)" }}>
                  {r.title}
                </h3>
              </div>

              {/* Pitch */}
              <div className="col-span-12 lg:col-span-3">
                <p className="text-[#2C334A] text-[14.5px] leading-[1.55]">{r.pitch}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {r.bullets.map((b) => (
                    <li
                      key={b}
                      className="px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-wider text-[#6B7390] border border-[rgba(14,20,33,0.14)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA arrow */}
              <div className="col-span-12 lg:col-span-2 flex lg:justify-end items-center">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#0E1421] group-hover:text-[#1640D8] transition">
                  {r.cta}
                  <span className="font-display italic text-2xl leading-none">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#6B7390]">
        Recovery path · Looking for another country or syllabus? Switch from any page header.
      </p>
    </div>
  );
}
