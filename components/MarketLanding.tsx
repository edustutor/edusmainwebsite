import Link from "next/link";

export type MarketConfig = {
  code: "SL" | "IN" | "GL";
  flag: string;
  region: string;
  url: string;
  hero: { eyebrow: string; title: string; titleEm: string; sub: string };
  pillars: { title: string; body: string; href: string; tag: string }[];
  filters: { label: string; options: string[] }[];
  facts: { k: string; v: string }[];
  ctaText: string;
};

const TINTS = ["#2563EB", "#8B5CF6", "#06B6D4", "#22C55E"];

export function MarketLanding({ cfg }: { cfg: MarketConfig }) {
  return (
    <>
      <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#06B6D4", opacity: 0.30 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#8B5CF6", opacity: 0.30 }} />
          <div className="blob" style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#2563EB", opacity: 0.22 }} />
        </div>

        <div className="container-edge">
          <div className="flex justify-center" data-anim>
            <Link href="/#regions" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All markets
              <span className="text-[#5A6A82]">·</span>
              <span className="text-[#06B6D4]">{cfg.flag} {cfg.region}</span>
            </Link>
          </div>

          <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
            <p className="eyebrow">{cfg.hero.eyebrow}</p>
            <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
              {cfg.hero.title} <em>{cfg.hero.titleEm}</em>
            </h1>
            <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
              {cfg.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
              <Link href="/enrol" className="btn btn-primary">{cfg.ctaText}</Link>
              <Link href="/contact" className="btn btn-yellow">Book Free Consultation</Link>
            </div>
          </div>

          {/* Pillars */}
          <div className="mt-14 grid md:grid-cols-3 gap-4" data-anim="4">
            {cfg.pillars.map((p, i) => {
              const tint = TINTS[i % TINTS.length];
              return (
                <Link key={p.tag} href={p.href} className="glass rounded-[24px] p-7 lift relative overflow-hidden block">
                  <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: tint, opacity: 0.22 }} />
                  <div className="relative">
                    <span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-[family-name:var(--font-display)] font-600 tracking-[0.12em] uppercase"
                      style={{ background: `${tint}15`, color: tint }}
                    >
                      Pillar {String(i + 1).padStart(2, "0")} · {p.tag}
                    </span>
                    <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{p.title}</h3>
                    <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{p.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-display)] font-600 text-[14px]" style={{ color: tint }}>
                      Open
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {cfg.facts.map((f, i) => (
              <div key={i} className="glass rounded-2xl px-5 py-4 text-center">
                <p className="font-[family-name:var(--font-display)] font-700 text-[22px] tnum text-[#102033]">{f.k}</p>
                <p className="text-[11.5px] text-[#5A6A82] mt-1">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Catalogue</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Only valid <em>combinations.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              The class catalogue filters by syllabus, level, subject, and class type — only what's
              offered in {cfg.region}.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {cfg.filters.map((f, i) => {
              const tint = TINTS[i % TINTS.length];
              return (
                <div key={f.label} className="glass rounded-[24px] p-7">
                  <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase" style={{ color: tint }}>
                    {f.label}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {f.options.map((o) => (
                      <span key={o} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[13px] text-[#102033]">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
