import Link from "next/link";
import { Ticker } from "./Ticker";

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

export function MarketLanding({ cfg }: { cfg: MarketConfig }) {
  const numeral = cfg.code === "SL" ? "I" : cfg.code === "IN" ? "II" : "III";

  return (
    <>
      {/* Top bar */}
      <section className="relative pt-20">
        <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
          <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
            <div className="flex items-center gap-4">
              <Link href="/#choose-region" className="hover:text-[#0E1421]">← All markets</Link>
              <span className="hidden sm:inline w-px h-3 bg-[rgba(14,20,33,0.20)]" />
              <span className="hidden sm:inline">{cfg.url}</span>
            </div>
            <span className="text-[#1640D8]">{cfg.flag} {cfg.region}</span>
          </div>
        </div>

        {/* Hero — Global edition: centered editorial column */}
        <div className="container-wide pt-12 md:pt-20">
          <div className="text-center max-w-5xl mx-auto" data-anim>
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1640D8] mb-6">
              <span className="font-display italic text-[#0E1421] mr-2">N° {numeral}</span>
              {cfg.hero.eyebrow}
            </p>
            <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
              {cfg.hero.title}<br />
              <em className="text-[#1640D8]">{cfg.hero.titleEm}</em>
            </h1>
            <p className="mt-10 text-[#2C334A] text-[17px] leading-[1.65] max-w-2xl mx-auto">
              {cfg.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href="/enrol" className="btn btn-primary">{cfg.ctaText}</Link>
              <Link href="/contact" className="btn btn-ghost">Book consultation</Link>
            </div>
          </div>

          <div className="rule-strong mt-16" />

          {/* Pillars */}
          <div className="grid md:grid-cols-3" data-anim="2">
            {cfg.pillars.map((p, i) => (
              <Link
                key={p.tag}
                href={p.href}
                className={`p-7 lg:p-10 border-b border-[rgba(14,20,33,0.10)] md:border-b-0 ${i !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""} hover:bg-[rgba(14,20,33,0.02)] transition-colors group`}
              >
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  Pillar {String(i + 1).padStart(2, "0")} · {p.tag}
                </p>
                <h3 className="display mt-7" style={{ fontSize: "var(--fs-h2)" }}>{p.title}</h3>
                <p className="text-[#2C334A] text-[14.5px] mt-3 leading-[1.65]">{p.body}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#0E1421] group-hover:text-[#1640D8] transition">
                  Open <span className="font-display italic text-lg leading-none">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="rule-strong" />
        </div>

        <Ticker tone="paper" />
      </section>

      {/* Catalogue */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ {numeral}.01</span> Catalogue</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Only valid <em className="accent">combinations.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                The class catalogue filters by syllabus, level, subject, and class type — only what's
                offered in {cfg.region}.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          {cfg.filters.map((f, i) => (
            <div key={f.label} className={`grid grid-cols-12 gap-6 py-9 ${i !== cfg.filters.length - 1 ? "border-b border-[rgba(14,20,33,0.10)]" : ""}`}>
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  N° {String(i + 1).padStart(2, "0")} · {f.label}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-1.5">
                {f.options.map((o) => (
                  <span key={o} className="px-3 py-1.5 text-[12.5px] font-medium border border-[rgba(14,20,33,0.18)] bg-white/40">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="rule-strong" />
        </div>
      </section>

      {/* Facts */}
      <section className="relative py-20 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(14,20,33,0.10)] border-y border-[rgba(14,20,33,0.10)]">
            {cfg.facts.map((f, i) => (
              <div key={f.k} className="px-5 md:px-7 py-8">
                <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
                  {String(i + 1).padStart(2, "0")} / 04
                </p>
                <p className="font-display text-[40px] leading-none tnum text-[#0E1421] mt-3">{f.k}</p>
                <p className="text-[12.5px] text-[#2C334A] mt-2">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
