import Link from "next/link";

const ROWS = [
  {
    tag: "SL",
    flag: "🇱🇰",
    title: "Sri Lanka",
    sub: "National-syllabus group classes plus one-to-one support.",
    items: [
      { label: "Grade 1 – A/L", note: "All grades · all key subjects" },
      { label: "Sinhala · Tamil · English medium", note: "Region-aware filtering" },
      { label: "Group + Individual", note: "Recordings · revision · exams" },
    ],
    href: "/sl",
  },
  {
    tag: "IN",
    flag: "🇮🇳",
    title: "India · Launch",
    sub: "English-medium tuition for CBSE/NCERT-aligned Grades 6–10.",
    items: [
      { label: "Grades 6 – 10", note: "Focused launch scope" },
      { label: "CBSE · NCERT-aligned", note: "Board-level language" },
      { label: "Live · Recorded · Tracked", note: "Parent updates included" },
    ],
    href: "/in",
  },
  {
    tag: "GL",
    flag: "🌐",
    title: "Global · One-to-one",
    sub: "Personal tutors matched to your syllabus, timezone, and goals.",
    items: [
      { label: "Cambridge · Edexcel · IB", note: "Major international boards" },
      { label: "Flexible timings", note: "Across 30+ countries" },
      { label: "Tutor-match in 48 hrs", note: "Demo before you commit" },
    ],
    href: "/global",
  },
];

export function Offer() {
  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="eyebrow"><span className="dot" />02 · What EDUS offers</p>
            <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Three offers. <em>No overlap.</em>
            </h2>
          </div>
          <p className="text-[#5C6485] max-w-md">
            Each market only ever shows valid combinations — Indian parents never see G.C.E. resources;
            Sri Lankan students never see global one-to-one pricing.
          </p>
        </div>

        <div className="space-y-4">
          {ROWS.map((row, i) => (
            <Link
              href={row.href}
              key={row.tag}
              className="group block relative rounded-3xl glass lift overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-6 p-7 lg:p-8 items-center">
                <div className="lg:col-span-3 flex items-center gap-4">
                  <span className="text-4xl">{row.flag}</span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-[#5C6485] uppercase">
                      0{i + 1} · /{row.tag.toLowerCase()}/
                    </p>
                    <h3 className="display text-3xl mt-1">{row.title}</h3>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[#2B3458]">{row.sub}</p>
                </div>
                <div className="lg:col-span-5 grid sm:grid-cols-3 gap-3">
                  {row.items.map((it) => (
                    <div key={it.label} className="rounded-2xl bg-white border border-[rgba(10,18,48,0.06)] p-3">
                      <p className="text-[13px] font-medium text-[#0A1230]">{it.label}</p>
                      <p className="text-[11px] font-mono text-[#5C6485] mt-0.5 uppercase tracking-wider">
                        {it.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                aria-hidden
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[rgba(10,18,48,0.08)] bg-white flex items-center justify-center text-[#2B3458]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
