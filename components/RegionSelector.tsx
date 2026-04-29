import Link from "next/link";

type Region = {
  code: string;
  flag: string;
  title: string;
  pitch: string;
  bullets: string[];
  cta: string;
  href: string;
  meta: string;
  glow: string;
};

const REGIONS: Region[] = [
  {
    code: "SL",
    flag: "🇱🇰",
    title: "I'm in Sri Lanka",
    pitch: "National-syllabus group classes plus one-to-one support.",
    bullets: ["Grades 1 – A/L", "Sinhala · Tamil · English medium", "Group + individual classes"],
    cta: "Enter Sri Lanka",
    href: "/sl",
    meta: "edustutor.com/sl",
    glow: "#9CC0FF",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    title: "I'm in India",
    pitch: "English-medium tuition for CBSE/NCERT-aligned Grades 6–10.",
    bullets: ["Grades 6 – 10", "CBSE / NCERT-aligned", "Live online · parent updates"],
    cta: "Enter India",
    href: "/in",
    meta: "edustutor.com/in",
    glow: "#FFE08A",
  },
  {
    code: "GL",
    flag: "🌐",
    title: "I need one-to-one classes from anywhere",
    pitch: "Personal tutors matched to your syllabus, timezone, and goals.",
    bullets: ["Cambridge · Edexcel · IB · National", "Flexible timings", "Tutor-matching in 48 hours"],
    cta: "Enter Global",
    href: "/global",
    meta: "edustutor.com/global",
    glow: "#D9C8FF",
  },
];

export function RegionSelector() {
  return (
    <div className="relative">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
        <div>
          <p className="eyebrow"><span className="dot" />Step 01 · Choose your door</p>
          <h2 className="display mt-3" style={{ fontSize: "var(--fs-h2)" }}>
            One brand. <em>Three immediate doors.</em>
          </h2>
        </div>
        <p className="text-sm text-[#5C6485] max-w-xs leading-relaxed">
          A single decision routes you to a tailored microsite. You can switch any time from the header.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {REGIONS.map((r, i) => (
          <RegionCard key={r.code} region={r} idx={i} />
        ))}
      </div>

      <p className="mt-6 text-xs font-mono text-[#5C6485]">
        Looking for another country or syllabus? You can switch from any page.
      </p>
    </div>
  );
}

function RegionCard({ region: r, idx }: { region: Region; idx: number }) {
  return (
    <Link href={r.href} className="group relative glass-tint lift rounded-[28px] p-7 overflow-hidden block">
      {/* per-card glow */}
      <span aria-hidden className="glow" style={{ top: -80, right: -60, width: 240, height: 240, background: r.glow, opacity: 0.7 }} />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-3xl select-none">{r.flag}</span>
          <span className="font-mono text-[11px] tracking-[0.16em] text-[#5C6485]">
            0{idx + 1} / 03
          </span>
        </div>

        <p className="mt-9 eyebrow"><span className="dot" />{r.code} · {r.meta}</p>
        <h3 className="display mt-2 leading-[1.04]" style={{ fontSize: "var(--fs-h3)" }}>{r.title}</h3>
        <p className="text-[#2B3458] mt-2.5 text-[14.5px] leading-[1.55]">{r.pitch}</p>

        <ul className="mt-6 space-y-2 text-[13.5px]">
          {r.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[#2B3458]">
              <span className="inline-flex w-4 h-4 rounded-full bg-[#0A55F5]/10 items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A55F5" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-5 border-t border-[rgba(10,18,48,0.06)] flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0A1230]">
            {r.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#5C6485] uppercase">
            tailored microsite
          </span>
        </div>
      </div>
    </Link>
  );
}
