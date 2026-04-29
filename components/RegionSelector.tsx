import Link from "next/link";

type Region = {
  flag: string;
  title: string;
  pitch: string;
  features: string[];
  cta: string;
  href: string;
  tint: string;
  tintSoft: string;
  index: string;
};

const REGIONS: Region[] = [
  {
    flag: "🇱🇰",
    title: "Sri Lanka Classes",
    pitch: "Live online tuition for the National syllabus, Cambridge & Edexcel — Grade 1 to A/L.",
    features: [
      "Grade 1 – A/L",
      "Group + Individual",
      "Sinhala · Tamil · English",
      "From LKR 1,000 / month",
    ],
    cta: "Explore Sri Lanka",
    href: "/sl",
    tint: "#2563EB",
    tintSoft: "#EEF6FF",
    index: "01",
  },
  {
    flag: "🇮🇳",
    title: "India · Grades 6 to 10",
    pitch: "Premium structured tuition for Chennai families — CBSE & matriculation aligned.",
    features: [
      "Grades 6 – 10",
      "English medium",
      "Weekly parent reports",
      "From ₹1,000 per subject",
    ],
    cta: "Explore India",
    href: "/in",
    tint: "#8B5CF6",
    tintSoft: "#F4EEFF",
    index: "02",
  },
  {
    flag: "🌐",
    title: "Global One-to-One Classes",
    pitch: "Personal tutors matched to your syllabus and timezone within 48 hours.",
    features: [
      "Cambridge · Edexcel · IB",
      "30+ countries served",
      "Demo before you commit",
      "Flexible scheduling",
    ],
    cta: "Explore Global",
    href: "/global",
    tint: "#06B6D4",
    tintSoft: "#E6FAFD",
    index: "03",
  },
];

export function RegionSelector() {
  return (
    <section id="regions" className="relative py-20 md:py-28 scroll-mt-24">
      {/* floating circles */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-8%", width: 380, height: 380, background: "#2563EB", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", left: "-6%", width: 360, height: 360, background: "#8B5CF6", opacity: 0.15 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Choose Your Region</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            One brand. <em>Three immediate doors.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            A single decision routes you to a tailored experience. You can switch any time from the
            top header.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {REGIONS.map((r) => (
            <Link
              key={r.index}
              href={r.href}
              className="group relative glass rounded-[28px] p-7 lift overflow-hidden"
            >
              {/* corner glow */}
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: r.tint, opacity: 0.30 }} />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl"
                    style={{ background: r.tintSoft, border: `1px solid ${r.tint}20` }}
                  >
                    {r.flag}
                  </span>
                  <span className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.16em] uppercase text-[#5A6A82]">
                    {r.index} / 03
                  </span>
                </div>

                <h3 className="heading mt-7" style={{ fontSize: "21px", lineHeight: 1.25 }}>
                  {r.title}
                </h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{r.pitch}</p>

                <ul className="mt-5 space-y-2.5 text-[13.5px]">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[#2B3950]">
                      <span
                        className="inline-flex w-4 h-4 rounded-full items-center justify-center"
                        style={{ background: `${r.tint}1A` }}
                      >
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={r.tint} strokeWidth="3.5" aria-hidden>
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-[rgba(16,32,51,0.08)]">
                  <span
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] font-600 text-[14px]"
                    style={{ color: r.tint }}
                  >
                    {r.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform group-hover:translate-x-1" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-[#5A6A82]">
          Looking for another country or syllabus? You can switch any time from the header.
        </p>
      </div>
    </section>
  );
}
