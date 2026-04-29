import Link from "next/link";
import { RegionSelector } from "./RegionSelector";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
      {/* Local atmosphere — multiple soft orbs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="glow" style={{ top: "-6%", left: "-8%", width: 460, height: 460, background: "#9CC0FF" }} />
        <div className="glow" style={{ top: "20%", right: "-10%", width: 520, height: 520, background: "#FFE08A", opacity: 0.55 }} />
        <div className="glow" style={{ top: "55%", left: "30%", width: 420, height: 420, background: "#D9C8FF", opacity: 0.45 }} />
      </div>

      <div className="container-edge">
        {/* Status bar */}
        <div data-anim className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass text-[11px] font-mono">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFC21A]/60 animate-pulse" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC21A]" />
            </span>
            <span className="text-[#2B3458]">Live · Term 2 · 2026 enrolments open</span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C6485]">
            One brand · Three doors · One conversion engine
          </p>
        </div>

        {/* Headline — 7/5 split, tighter scale */}
        <div className="mt-10 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#0A55F5]" data-anim="2">
              Sri Lankan Learning · Global Success
            </p>
            <h1
              data-anim="3"
              className="display mt-4"
              style={{ fontSize: "var(--fs-hero)", lineHeight: 1.02 }}
            >
              Learn the right syllabus,<br />
              <em>in the right format</em>,<br />
              with the right support.
            </h1>
          </div>

          <div data-anim="4" className="lg:col-span-5 lg:pb-2">
            <p className="text-[#2B3458] text-[16px] leading-[1.6] max-w-md">
              Top-notch online tutoring from qualified tutors at the comfort of your home.
              Live classes for the Sri Lankan National syllabus and Cambridge / Edexcel,
              focused English-medium tuition for India Grades 6–10, and one-to-one for
              students anywhere on the planet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#choose-region" className="btn btn-sun">
                Choose your region
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost">How learning works</Link>
            </div>

            {/* Inline trust pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["5+ yrs experience", "530+ live classes", "Grade 1 – A/L", "24/7 support"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full glass text-[11px] font-mono text-[#2B3458]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Region selector */}
        <div data-anim="5" id="choose-region" className="mt-16 scroll-mt-32">
          <RegionSelector />
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-soft bg-white/65 backdrop-blur-sm">
          {[
            { k: "5+", v: "Years of experience" },
            { k: "530+", v: "Live classes running" },
            { k: "Grade 1 – A/L", v: "Coverage" },
            { k: "24 / 7", v: "Student support" },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-5 py-6 ${i % 2 !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-[rgba(10,18,48,0.06)]" : ""} ${i === 2 ? "md:border-l border-[rgba(10,18,48,0.06)]" : ""}`}
            >
              <p className="font-display text-[28px] sm:text-[32px] leading-none tnum text-[#0A1230]">{s.k}</p>
              <p className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-2">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
