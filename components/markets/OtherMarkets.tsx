import Link from "next/link";

/**
 * Cross-link block placed near the bottom of every market page.
 * Builds the SL ↔ IN ↔ MV ↔ Global content cluster so Google sees them as
 * a tight topical group and link equity flows between them.
 */

type MarketCode = "sl" | "in" | "mv" | "gl";

type MarketLink = {
  code: MarketCode;
  flag: string;
  title: string;
  tag: string;
  href: string;
  tint: string;
  tintSoft: string;
};

const MARKETS: MarketLink[] = [
  {
    code: "sl",
    flag: "🇱🇰",
    title: "Sri Lanka",
    tag: "National - Cambridge - Edexcel",
    href: "/sl",
    tint: "#2563EB",
    tintSoft: "#EEF6FF",
  },
  {
    code: "in",
    flag: "🇮🇳",
    title: "India",
    tag: "CBSE - Classes 6-10",
    href: "/in",
    tint: "#8B5CF6",
    tintSoft: "#F4EEFF",
  },
  {
    code: "mv",
    flag: "🇲🇻",
    title: "Maldives",
    tag: "Cambridge IGCSE / O-Level",
    href: "/mv",
    tint: "#22C55E",
    tintSoft: "#E8FAEC",
  },
  {
    code: "gl",
    flag: "🌐",
    title: "Global",
    tag: "Worldwide One-to-One",
    href: "/global",
    tint: "#06B6D4",
    tintSoft: "#E6FAFD",
  },
];

export function OtherMarkets({ current }: { current: MarketCode }) {
  const others = MARKETS.filter((m) => m.code !== current);

  return (
    <section
      data-track-surface="other_markets"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Other EDUS Markets</p>
          <h2 className="heading mt-4" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
            Looking for a different <em>learning path?</em>
          </h2>
          <p className="text-[#2B3950] text-[14.5px] mt-3 leading-[1.65]">
            EDUS supports students across four markets. Explore the right path for your child.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto items-stretch">
          {others.map((m) => (
            <Link
              key={m.code}
              href={m.href}
              className="group relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)] hover:shadow-[0_18px_40px_-20px_rgba(37,99,235,0.20)] hover:-translate-y-0.5 transition flex flex-col h-full"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex w-11 h-11 rounded-xl items-center justify-center text-2xl shrink-0"
                  style={{ background: m.tintSoft, border: `1px solid ${m.tint}20` }}
                >
                  {m.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-700 text-[15px] text-[#102033] leading-tight">
                    {m.title}
                  </p>
                  <p
                    className="text-[10.5px] uppercase tracking-[0.08em] font-display font-700 mt-1 leading-[1.45]"
                    style={{ color: m.tint }}
                  >
                    {m.tag}
                  </p>
                </div>
              </div>
              <p
                className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[12.5px] font-display font-700"
                style={{ color: m.tint }}
              >
                Explore {m.title}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className="group-hover:translate-x-0.5 transition">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
