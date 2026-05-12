"use client";
import Link from "next/link";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";

const BENEFITS = [
  "In-depth Subject Expertise",
  "Exceptional Online Delivery",
  "Mastery in Teaching Techniques",
  "Personalised Attention to Every Student",
];

export function QualifiedTutors() {
  return (
    <section
      id="tutors"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="6%" right="-4%" size={220} color="#8B5CF6" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {/* Left column - copy + benefits + CTA */}
          <div className="lg:col-span-6">
            <m.div variants={sectionRevealStrong}>
              <p className="eyebrow"><span className="dot" />Access to Quality Learning</p>
              <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
                Highly Qualified and Dedicated <em>Tutors.</em>
              </h2>
              <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.7] max-w-xl">
                At EDUS, we bring you top-tier educators from renowned institutions, delivering
                innovative, world-class teaching aligned with global standards.
              </p>
            </m.div>

            <m.ul
              variants={staggerContainer}
              className="mt-7 space-y-3 max-w-md"
            >
              {BENEFITS.map((b) => (
                <m.li
                  key={b}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-[#102033] text-[15px] font-[family-name:var(--font-display)] font-600"
                >
                  <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://signup.edustutor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join Now
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
            </m.div>

            <m.p variants={fadeUp} className="mt-5 text-[13px] text-[#5A6A82]">
              Are you a tutor?{" "}
              <Link href="/teach" className="text-[#2563EB] font-[family-name:var(--font-display)] font-700 hover:underline">
                Become an EDUS tutor →
              </Link>
            </m.p>
          </div>

          {/* Right column - illustrated card with floating callouts */}
          <m.div variants={fadeUp} className="lg:col-span-6">
            <TutorIllustration />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Illustration card with floating callouts                         */
/* --------------------------------------------------------------- */

function TutorIllustration() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Soft halo */}
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main scene card */}
      <div className="relative aspect-[5/4] rounded-[28px] bg-gradient-to-br from-[#EEF6FF] via-white to-[#F4EEFF] border border-white/80 shadow-[0_30px_80px_-30px_rgba(16,32,51,0.20)] overflow-hidden">
        {/* Decorative dots */}
        <span aria-hidden className="absolute top-8 right-10 w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
        <span aria-hidden className="absolute top-14 right-20 w-1 h-1 rounded-full bg-[#8B5CF6]" />
        <span aria-hidden className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
        <span aria-hidden className="absolute top-1/3 left-6 w-1 h-1 rounded-full bg-[#FACC15]" />

        {/* Subtle concentric rings - design centerpiece */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="qt-ring-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.16" />
              <stop offset="60%"  stopColor="#2563EB" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Big soft radial wash */}
          <circle cx="250" cy="200" r="180" fill="url(#qt-ring-fade)" />
          {/* Crisp dashed rings */}
          <circle cx="250" cy="200" r="155" fill="none" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.30" />
          <circle cx="250" cy="200" r="115" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.28" />
          <circle cx="250" cy="200" r="78"  fill="none" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.30" />
        </svg>

        {/* Centerpiece: gradient medallion + headline stat */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center text-center">
            {/* Medallion */}
            <div className="relative w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-full grid place-items-center"
              style={{
                background:
                  "conic-gradient(from 210deg at 50% 50%, #2563EB 0deg, #6E5BC8 120deg, #06B6D4 240deg, #2563EB 360deg)",
                boxShadow: "0 30px 60px -20px rgba(37,99,235,0.45), inset 0 2px 0 rgba(255,255,255,0.4)",
              }}
            >
              <div className="w-[88%] h-[88%] rounded-full bg-white grid place-items-center shadow-[inset_0_2px_8px_rgba(16,32,51,0.06)]">
                <div className="flex flex-col items-center leading-none">
                  <span className="font-[family-name:var(--font-display)] font-800 text-[34px] sm:text-[40px] bg-clip-text text-transparent bg-gradient-to-br from-[#2563EB] to-[#6E5BC8]">
                    200+
                  </span>
                  <span className="mt-1.5 text-[10.5px] tracking-[0.14em] uppercase text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
                    Expert Tutors
                  </span>
                </div>
              </div>
              {/* Verified tick */}
              <span
                aria-hidden
                className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white grid place-items-center shadow-[0_6px_14px_rgba(16,32,51,0.18)] border border-[rgba(16,32,51,0.06)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Tutor-quality stat chips - arranged around medallion */}
            <div className="absolute inset-0 pointer-events-none">
              {/* top-left - Years of Teaching (bar) */}
              <StatChip style={{ top: "-12%", left: "-92%" }}>
                <BarStat label="Avg. Experience" value="12+ yrs" pct={82} tint="#2563EB" />
              </StatChip>

              {/* bottom-left - Subject Mastery (donut) */}
              <StatChip style={{ bottom: "-12%", left: "-86%" }}>
                <DonutStat label="Subject Mastery" value="98%" pct={98} tint="#8B5CF6" />
              </StatChip>

              {/* top-right - Delivery Rating (5-star) */}
              <StatChip style={{ top: "-14%", right: "-92%" }} align="right">
                <StarStat label="Delivery Rating" value="4.9" />
              </StatChip>

              {/* bottom-right - Exam-pass uplift (sparkline) */}
              <StatChip style={{ bottom: "-14%", right: "-86%" }} align="right">
                <SparkStat label="Result Uplift" value="+38%" tint="#06B6D4" />
              </StatChip>
            </div>
          </div>
        </div>

        {/* Top-right floating callout - Qualified Educators */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3 shadow-[0_18px_40px_-16px_rgba(16,32,51,0.18)]">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex w-9 h-9 rounded-xl items-center justify-center shrink-0"
              style={{ background: "rgba(37,99,235,0.10)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" aria-hidden>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] font-800 text-[14px] text-[#102033]">
                100% <span className="text-[#2563EB] font-700">Qualified</span>
              </p>
              <p className="text-[10.5px] text-[#5A6A82] mt-0.5 uppercase tracking-[0.08em]">
                Verified Educators
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-left floating callout - Live Engagement (animated bars) */}
        <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3 shadow-[0_18px_40px_-16px_rgba(16,32,51,0.18)] w-[58%] max-w-[280px]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-[#5A6A82] font-[family-name:var(--font-display)] font-600 uppercase tracking-[0.08em]">
              Live Engagement
            </p>
            <span className="font-[family-name:var(--font-display)] font-800 text-[13px] text-[#102033]">
              96<span className="text-[#5A6A82] text-[10px] font-600 ml-0.5">/100</span>
            </span>
          </div>
          <div className="mt-2 flex items-end gap-1 h-8">
            {[55, 70, 48, 82, 64, 90, 75, 96, 82, 88].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-[2px]"
                style={{
                  height: `${h}%`,
                  background:
                    i === 7
                      ? "linear-gradient(180deg, #2563EB 0%, #6E5BC8 100%)"
                      : "rgba(37,99,235,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Stat chip - wrapper for the 4 mini visualisations               */
/* --------------------------------------------------------------- */

function StatChip({
  children, style, align = "left",
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  align?: "left" | "right";
}) {
  return (
    <div
      className="absolute hidden sm:block bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-3 py-2 shadow-[0_10px_24px_-12px_rgba(16,32,51,0.20)] pointer-events-auto min-w-[128px]"
      style={{ ...style, textAlign: align === "right" ? "right" : "left" }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Mini-viz primitives                                              */
/* --------------------------------------------------------------- */

function BarStat({ label, value, pct, tint }: { label: string; value: string; pct: number; tint: string }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[9.5px] text-[#5A6A82] uppercase tracking-[0.08em] font-600">{label}</p>
        <p className="font-[family-name:var(--font-display)] font-800 text-[13px] text-[#102033]">{value}</p>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-[#EEF2F7] overflow-hidden">
        <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: tint }} />
      </div>
    </>
  );
}

function DonutStat({ label, value, pct, tint }: { label: string; value: string; pct: number; tint: string }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 36 36" className="shrink-0">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#EEF2F7" strokeWidth="4" />
        <circle
          cx="18" cy="18" r={r}
          fill="none" stroke={tint} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className="leading-tight">
        <p className="font-[family-name:var(--font-display)] font-800 text-[13px] text-[#102033]">{value}</p>
        <p className="text-[9.5px] text-[#5A6A82] uppercase tracking-[0.08em] font-600">{label}</p>
      </div>
    </div>
  );
}

function StarStat({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="flex items-center justify-end gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FACC15" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        ))}
      </div>
      <div className="mt-1 flex items-baseline justify-end gap-1.5">
        <span className="font-[family-name:var(--font-display)] font-800 text-[13px] text-[#102033]">{value}</span>
        <span className="text-[9.5px] text-[#5A6A82] uppercase tracking-[0.08em] font-600">{label}</span>
      </div>
    </>
  );
}

function SparkStat({ label, value, tint }: { label: string; value: string; tint: string }) {
  return (
    <>
      <div className="flex items-baseline justify-end gap-1.5">
        <span className="font-[family-name:var(--font-display)] font-800 text-[13px]" style={{ color: tint }}>{value}</span>
        <span className="text-[9.5px] text-[#5A6A82] uppercase tracking-[0.08em] font-600">{label}</span>
      </div>
      <svg width="100" height="22" viewBox="0 0 100 22" className="mt-1 ml-auto block" preserveAspectRatio="none">
        <defs>
          <linearGradient id="qt-spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={tint} stopOpacity="0.35" />
            <stop offset="100%" stopColor={tint} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 18 L14 14 L28 16 L42 10 L56 12 L70 6 L84 8 L100 2 L100 22 L0 22 Z" fill="url(#qt-spark-fill)" />
        <path d="M0 18 L14 14 L28 16 L42 10 L56 12 L70 6 L84 8 L100 2" fill="none" stroke={tint} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="2" r="2" fill={tint} />
      </svg>
    </>
  );
}
