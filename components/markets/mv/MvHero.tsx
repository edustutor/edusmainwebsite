"use client";
import Link from "next/link";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { MV_SIGNUP, SUBJECTS } from "./MvShared";

const TRUST = [
  "1-to-1 Classes",
  "Cambridge IGCSE / O-Level Focus",
  "Maldives-Friendly Timings",
  "Parent Progress Updates",
];

export function MvHero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="6%" left="-4%" size={260} color="#06B6D4" opacity={[0.12, 0.20]} duration={22} blur={80} />
        <AmbientGlow bottom="0%" right="-4%" size={240} color="#22C55E" opacity={[0.10, 0.18]} duration={26} delay={3} blur={80} />
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
              <p className="eyebrow">
                <span className="dot" />Maldives - Cambridge IGCSE & O-Level
              </p>
              <h1 className="heading mt-4" style={{ fontSize: "var(--fs-hero)" }}>
                Cambridge IGCSE & O-Level{" "}
                <em>success starts here.</em>
              </h1>
              <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.7] max-w-2xl">
                Personalized 1-to-1 online classes for Maldives Grade 9 and Grade 10 students,
                guided by expert EDUS tutors for Mathematics, English, Biology, Chemistry and
                Physics - from Malé to Addu, every island.
              </p>
            </m.div>

            <m.ul variants={staggerContainer} className="mt-7 flex flex-wrap gap-2 max-w-2xl">
              {TRUST.map((t) => (
                <m.li
                  key={t}
                  variants={fadeUp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[12.5px] text-[#102033] font-display font-600 shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                  {t}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={MV_SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start Learning with EDUS
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="#subjects" className="btn btn-yellow">View Subjects & Pricing</Link>
            </m.div>

            <p className="mt-6 text-[12px] uppercase tracking-[0.12em] text-[#5A6A82] font-display font-600">
              1-to-1 Only - Cambridge IGCSE / O-Level - Maldives-Wide
            </p>
          </div>

          {/* Hero visual */}
          <m.div variants={fadeUp} className="lg:col-span-5">
            <MvHeroVisual />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Hero visual - Cambridge IGCSE / O-Level focus board              */
/* --------------------------------------------------------------- */
function MvHeroVisual() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Soft halo */}
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(6,182,212,0.20) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative rounded-[28px] bg-linear-to-br from-[#E6FBFF] via-white to-[#EAFBF1] border border-white/80 shadow-[0_30px_80px_-30px_rgba(16,32,51,0.20)] p-6 md:p-7">
        {/* Header band */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="text-2xl" aria-hidden>🇲🇻</span>
            <p className="font-display font-800 text-[14px] text-[#102033]">
              Maldives - Grade 9-10
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-display font-700"
            style={{ background: "rgba(6,182,212,0.12)", color: "#0891B2" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            Cambridge IGCSE
          </span>
        </div>

        {/* Subject chips */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {SUBJECTS.map((s) => (
            <div
              key={s.code}
              className="flex items-center gap-2 bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-3 py-2.5"
            >
              <span
                className="inline-flex w-8 h-8 rounded-lg items-center justify-center text-base shrink-0"
                style={{ background: `${s.tint}15`, border: `1px solid ${s.tint}25` }}
              >
                {s.icon}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="font-display font-700 text-[12px] text-[#102033] truncate">
                  {s.short}
                </p>
                <p className="text-[10px] text-[#5A6A82] mt-0.5">Cambridge - {s.code}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer band */}
        <div className="mt-5 rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex w-9 h-9 rounded-full items-center justify-center"
              style={{ background: "rgba(34,197,94,0.12)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.6" aria-hidden>
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-display font-700 text-[12.5px] text-[#102033]">
                100% Individual
              </p>
              <p className="text-[10.5px] text-[#5A6A82] mt-0.5">No group classes - Personal tutor</p>
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
            Live - 1-to-1
          </p>
        </div>
      </div>
    </div>
  );
}
