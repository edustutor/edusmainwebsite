import Link from "next/link";
import { RegionSelector } from "./RegionSelector";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
      {/* light section grid + soft local glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="glow" style={{ top: 0, left: "-10%", width: 540, height: 540, background: "#9CC0FF" }} />
        <div className="glow" style={{ top: "30%", right: "-12%", width: 600, height: 600, background: "#FFE08A", opacity: 0.5 }} />
      </div>

      <div className="container-edge">
        {/* status bar */}
        <div data-anim className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full glass text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFC21A]/60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC21A]" />
            </span>
            <span className="text-[#2B3458]">Live · Term 2 · 2026 enrolments open</span>
            <span className="hidden sm:inline text-[#5C6485]">·</span>
            <span className="hidden sm:inline text-[#5C6485]">Colombo 14:32 IST</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5C6485]">
            One brand · Three doors · One conversion engine
          </p>
        </div>

        {/* headline */}
        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h1 data-anim="2" className="display" style={{ fontSize: "var(--fs-hero)" }}>
              Learn the right<br />
              syllabus, <em>in the right format</em>,<br />
              with the right support.
            </h1>
          </div>
          <div data-anim="3" className="lg:col-span-4 lg:pb-3">
            <p className="text-[#2B3458] text-[17px] leading-[1.6] max-w-md">
              EDUS is a future-ready education platform. Live online group tuition for the Sri Lankan
              syllabus, focused English-medium classes for India Grades 6–10, and one-to-one tuition
              for students anywhere on the planet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#choose-region" className="btn btn-sun">
                Choose your region
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost">How learning works</Link>
            </div>
          </div>
        </div>

        {/* region selector */}
        <div data-anim="4" id="choose-region" className="mt-20 scroll-mt-32">
          <RegionSelector />
        </div>

        {/* trust strip */}
        <div data-anim="5" className="mt-16 grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-soft bg-white/60 backdrop-blur-sm">
          {[
            { k: "7,000+", v: "Learners taught" },
            { k: "98.4%", v: "Pass rate" },
            { k: "30+", v: "Countries served" },
            { k: "97.6%", v: "Parent satisfaction" },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-6 py-7 ${i !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""} ${i === 2 || i === 3 ? "md:border-l border-[rgba(10,18,48,0.06)]" : ""}`}
              style={{
                borderTop: i >= 2 ? "1px solid rgba(10,18,48,0.06)" : undefined,
              }}
            >
              <p className="font-display text-[40px] leading-none tnum text-[#0A1230]">{s.k}</p>
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-2">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
