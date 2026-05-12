"use client";
import Link from "next/link";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { APPLY_URL } from "./TeachShared";

const HERO_POINTS = [
  "Teach students across Sri Lanka, India, Maldives & Global",
  "Structured class allocation with academic support",
  "Performance-based recognition and growth path",
  "Transparent QA review and monthly reporting",
];

export function TeachHero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="6%" left="-4%" size={260} color="#2563EB" opacity={[0.10, 0.18]} duration={22} blur={80} />
        <AmbientGlow bottom="0%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {/* Copy */}
          <div className="lg:col-span-7">
            <m.div variants={sectionRevealStrong}>
              <p className="eyebrow"><span className="dot" />Teach with EDUS</p>
              <h1 className="heading mt-4" style={{ fontSize: "var(--fs-hero)" }}>
                Become an EDUS Tutor and{" "}
                <em>Inspire Students Beyond Borders.</em>
              </h1>
              <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.7] max-w-2xl">
                At EDUS, we are building a future-ready online learning ecosystem where passionate
                tutors, smart technology, and structured academic systems come together to create
                meaningful student success - across Sri Lanka, India, Maldives, and global student
                communities.
              </p>
            </m.div>

            <m.ul variants={staggerContainer} className="mt-7 space-y-3 max-w-xl">
              {HERO_POINTS.map((p) => (
                <m.li
                  key={p}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-[#102033] text-[14.5px]"
                >
                  <span className="inline-flex w-6 h-6 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply to Teach with EDUS
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="#requirements" className="btn btn-yellow">Learn Tutor Requirements</Link>
            </m.div>

            <p className="mt-6 text-[12px] uppercase tracking-[0.12em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
              Quality-Assured · Academically Supported · Performance Reviewed
            </p>
          </div>

          {/* Visual stat board */}
          <m.div variants={fadeUp} className="lg:col-span-5">
            <HeroStatBoard />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Visual stat board - quick-glance tutor signals                   */
/* --------------------------------------------------------------- */
function HeroStatBoard() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#EEF6FF] via-white to-[#F4EEFF] border border-white/80 shadow-[0_30px_80px_-30px_rgba(16,32,51,0.20)] p-6 md:p-7">
        <div className="grid grid-cols-2 gap-3">
          <StatTile k="5+ yrs" v="In Online Education" tint="#2563EB" />
          <StatTile k="7,000+" v="Students Supported" tint="#8B5CF6" />
          <StatTile k="100%" v="Live Online Model" tint="#06B6D4" />
          <StatTile k="4 Markets" v="SL · IN · MV · Global" tint="#FACC15" />
        </div>
        <div className="mt-4 rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
              Tutor Network Growth
            </p>
            <p className="font-[family-name:var(--font-display)] font-800 text-[14px] text-[#102033]">
              +42%<span className="text-[10.5px] text-[#5A6A82] ml-1 font-600">YoY</span>
            </p>
          </div>
          <svg width="100%" height="42" viewBox="0 0 200 42" className="mt-2 block" preserveAspectRatio="none">
            <defs>
              <linearGradient id="teach-spark-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 32 L25 28 L50 30 L75 22 L100 24 L125 14 L150 16 L175 8 L200 4 L200 42 L0 42 Z" fill="url(#teach-spark-fill)" />
            <path d="M0 32 L25 28 L50 30 L75 22 L100 24 L125 14 L150 16 L175 8 L200 4" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="200" cy="4" r="3" fill="#2563EB" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatTile({ k, v, tint }: { k: string; v: string; tint: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] p-4">
      <p
        className="font-[family-name:var(--font-display)] font-800 text-[20px] leading-none"
        style={{ color: tint }}
      >
        {k}
      </p>
      <p className="text-[11.5px] text-[#5A6A82] mt-1.5 leading-tight">{v}</p>
    </div>
  );
}
