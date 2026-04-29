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

export function MarketLanding({ cfg }: { cfg: MarketConfig }) {
  const glow =
    cfg.code === "SL" ? "#9CC0FF" : cfg.code === "IN" ? "#FFE08A" : "#D9C8FF";

  return (
    <>
      <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow" style={{ top: -120, left: -100, width: 540, height: 540, background: glow }} />
          <div className="glow" style={{ bottom: -200, right: -100, width: 500, height: 500, background: "#CFE0FF", opacity: 0.5 }} />
        </div>

        <div className="container-edge">
          <div className="flex items-center justify-between flex-wrap gap-3" data-anim>
            <Link
              href="/#choose-region"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-[#2B3458]"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Looking for another country or syllabus? Switch here.
            </Link>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#5C6485]">
              {cfg.url} · {cfg.region}
            </p>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow" data-anim="2"><span className="dot" />{cfg.hero.eyebrow}</p>
              <h1 className="display text-[clamp(40px,7vw,100px)] mt-3" data-anim="3">
                {cfg.flag}&nbsp;{cfg.hero.title}<br />
                <em>{cfg.hero.titleEm}</em>
              </h1>
            </div>
            <div className="lg:col-span-4" data-anim="4">
              <p className="text-[#2B3458] text-[17px] leading-relaxed">{cfg.hero.sub}</p>
              <div className="flex flex-wrap gap-3 mt-5">
                <Link href="/enrol" className="btn btn-sun">{cfg.ctaText}</Link>
                <Link href="/contact" className="btn btn-ghost">Book consultation</Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-4" data-anim="5">
            {cfg.pillars.map((p, i) => (
              <Link key={p.tag} href={p.href} className="group glass rounded-3xl p-7 lift relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#5C6485] uppercase">
                    Pillar {String(i + 1).padStart(2, "0")} · {p.tag}
                  </span>
                </div>
                <h3 className="display text-3xl mt-6">{p.title}</h3>
                <p className="text-[#2B3458] text-sm mt-2 leading-relaxed">{p.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#0A55F5]">
                  Open
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow"><span className="dot" />Catalogue</p>
              <h2 className="display text-4xl md:text-5xl mt-4">
                Only valid <em>combinations.</em>
              </h2>
              <p className="text-[#5C6485] mt-4 text-[15px]">
                The class catalogue filters by grade, syllabus, medium, and class type — only what's
                offered in {cfg.region}.
              </p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {cfg.filters.map((f) => (
                <div key={f.label} className="glass rounded-2xl p-5">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#5C6485]">{f.label}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {f.options.map((o) => (
                      <span key={o} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(10,18,48,0.08)] text-[13px] text-[#0A1230]">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-[rgba(10,18,48,0.06)] bg-[rgba(10,18,48,0.04)]">
            {cfg.facts.map((f) => (
              <div key={f.k} className="bg-white p-7">
                <p className="font-display text-4xl tnum text-[#0A1230]">{f.k}</p>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-1">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
