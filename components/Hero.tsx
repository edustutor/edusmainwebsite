import Link from "next/link";
import { RegionSelector } from "./RegionSelector";
import { Ticker } from "./Ticker";

export function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Top meta bar — editorial dateline */}
      <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
        <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
          <div className="flex items-center gap-4" data-anim>
            <span>Vol. V · No. 26</span>
            <span className="hidden sm:inline w-px h-3 bg-[rgba(14,20,33,0.20)]" />
            <span className="hidden sm:inline">Term II · 2026</span>
            <span className="hidden md:inline w-px h-3 bg-[rgba(14,20,33,0.20)]" />
            <span className="hidden md:inline">Colombo · Chennai · London</span>
          </div>
          <div className="flex items-center gap-4" data-anim="2">
            <span className="text-[#1640D8]">● Enrolments Open</span>
          </div>
        </div>
      </div>

      {/* MASTHEAD — newspaper-grade hero */}
      <div className="container-wide pt-12 md:pt-16">
        {/* Title block — full-width masthead */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-9" data-anim="3">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1640D8] mb-5">
              Sri Lankan Learning · <span className="text-[#0E1421]">Global Success</span>
            </p>
            <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
              The right<br />
              <span className="italic">syllabus.</span>
            </h1>
          </div>

          <aside className="col-span-12 lg:col-span-3 lg:pb-4" data-anim="4">
            <div className="rule-strong mb-4" />
            <p className="eyebrow mb-3"><span className="square" />The Brief</p>
            <p className="text-[#2C334A] text-[14.5px] leading-[1.55]">
              Live online tuition, intelligently routed. National syllabus group classes for
              Sri Lanka, premium structured tuition for Chennai Grades 6–10, and one-to-one
              for global learners.
            </p>
          </aside>
        </div>

        {/* Lower split — italic continuation + meta */}
        <div className="grid grid-cols-12 gap-6 mt-2 lg:mt-1" data-anim="4">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
              <span className="italic">In the right format.</span><br />
              <span className="text-[#1640D8]">With the right support.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:pb-2 flex flex-col justify-end">
            <div className="rule mb-4" />
            <div className="flex flex-wrap gap-2">
              <Link href="#choose-region" className="btn btn-primary">Choose your region</Link>
              <Link href="/how-it-works" className="btn btn-ghost">The Method</Link>
            </div>
            <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390] mt-4">
              Choose one of three doors below ↓
            </p>
          </div>
        </div>

        {/* Stats row — editorial datapoints */}
        <div className="rule-strong mt-14" />
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(14,20,33,0.10)]" data-anim="5">
          {[
            { k: "5+", v: "Years operating", note: "Since 2020" },
            { k: "530+", v: "Live classes", note: "In session weekly" },
            { k: "30+", v: "Countries served", note: "One-to-one global" },
            { k: "G1 → A/L", v: "Coverage span", note: "All key subjects" },
          ].map((s, i) => (
            <div key={i} className="px-5 md:px-7 py-7 first:pl-0">
              <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
                {String(i + 1).padStart(2, "0")} / 04
              </p>
              <p className="font-display text-[40px] md:text-[52px] leading-[0.95] tnum text-[#0E1421] mt-2">
                {s.k}
              </p>
              <p className="text-[14px] text-[#0E1421] mt-3 font-medium">{s.v}</p>
              <p className="text-[12px] text-[#6B7390] mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="rule-strong" />
      </div>

      {/* Ticker — corporate signature */}
      <div className="mt-2">
        <Ticker tone="ink" />
      </div>

      {/* Region selector */}
      <div id="choose-region" className="container-wide pt-20 md:pt-24 scroll-mt-24" data-anim="6">
        <RegionSelector />
      </div>
    </section>
  );
}
