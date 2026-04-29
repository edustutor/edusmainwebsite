import Link from "next/link";

const ROWS = [
  {
    n: "I",
    flag: "🇱🇰",
    market: "Sri Lanka",
    title: "National syllabus, group plus one-to-one.",
    sub: "The flagship offer.",
    items: ["Grade 1 – A/L", "Sinhala · Tamil · English", "Group + Individual"],
    href: "/sl",
  },
  {
    n: "II",
    flag: "🇮🇳",
    market: "India · Chennai",
    title: "Premium structured tuition for Grades 6–10.",
    sub: "Disciplined monitoring. Weekly reports.",
    items: ["Grade 6 – 10", "CBSE / Matriculation", "₹1,000 per subject"],
    href: "/in",
  },
  {
    n: "III",
    flag: "🌐",
    market: "Global",
    title: "One-to-one tutors, matched within 48 hours.",
    sub: "International syllabuses, flexible timings.",
    items: ["Cambridge · Edexcel · IB", "30+ countries", "Demo before commit"],
    href: "/global",
  },
];

export function Offer() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="kicker">
              <span className="kicker-num">§ 03</span>
              Offer / What EDUS does
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Three offers. <em className="accent">No overlap.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
              Each market only ever shows valid combinations — Indian parents never see G.C.E.
              resources; Sri Lankan students never see global one-to-one pricing.
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        {/* Table-style rows */}
        <div>
          {ROWS.map((row, i) => (
            <Link
              href={row.href}
              key={row.n}
              className="group block py-9 lg:py-12 border-b border-[rgba(14,20,33,0.10)] hover:bg-[rgba(14,20,33,0.02)] transition-colors"
            >
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 lg:col-span-1">
                  <p className="font-display italic text-[32px] leading-none text-[#0E1421]">
                    {row.n}.
                  </p>
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{row.flag}</span>
                    <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                      {row.market}
                    </span>
                  </div>
                  <h3 className="display mt-3 leading-[1.06]" style={{ fontSize: "var(--fs-h2)" }}>
                    {row.title}
                  </h3>
                  <p className="text-[#6B7390] text-[13px] mt-2 italic">{row.sub}</p>
                </div>

                <div className="col-span-12 lg:col-span-5">
                  <ul className="space-y-2">
                    {row.items.map((it, j) => (
                      <li key={it} className="flex items-baseline gap-3 text-[14px]">
                        <span className="font-mono text-[10px] text-[#6B7390] tnum w-6">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[#0E1421]">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-12 lg:col-span-2 flex lg:justify-end items-center">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#0E1421] group-hover:text-[#1640D8] transition">
                    Open
                    <span className="font-display italic text-2xl leading-none">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
