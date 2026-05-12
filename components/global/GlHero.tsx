"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { GL_SIGNUP } from "./GlobalShared";

const TRUST = [
  "Expert Tutors",
  "Flexible Timings",
  "Personalized Lessons",
  "Parent Updates",
];

export function GlHero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="6%" left="-4%" size={260} color="#2563EB" opacity={[0.12, 0.20]} duration={22} blur={80} />
        <AmbientGlow bottom="0%" right="-4%" size={240} color="#06B6D4" opacity={[0.10, 0.18]} duration={26} delay={3} blur={80} />
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
                <span className="dot" />EDUS Global · One to One Online
              </p>
              <h1 className="heading mt-4" style={{ fontSize: "var(--fs-hero)" }}>
                World-class online tutoring for{" "}
                <em>students everywhere.</em>
              </h1>
              <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.7] max-w-2xl">
                Personalized one-to-one live classes for Cambridge, Edexcel, and any
                international or national syllabus. Taught by expert tutors, guided with
                care, and designed to help every student learn confidently and succeed globally.
              </p>
            </m.div>

            <m.ul variants={staggerContainer} className="mt-7 flex flex-wrap gap-2 max-w-2xl">
              {TRUST.map((t) => (
                <m.li
                  key={t}
                  variants={fadeUp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[12.5px] text-[#102033] font-[family-name:var(--font-display)] font-600 shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  {t}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={GL_SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start Your Global Learning Journey
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="#how" className="btn btn-yellow">How It Works</Link>
            </m.div>

            <p className="mt-6 text-[12px] uppercase tracking-[0.12em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
              1-to-1 Live · Cambridge · Edexcel · IGCSE · GCSE · O / A-Level
            </p>
          </div>

          {/* Hero visual */}
          <m.div variants={fadeUp} className="lg:col-span-5">
            <GlHeroVisual />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Hero visual - global reach board                                 */
/* --------------------------------------------------------------- */
function GlHeroVisual() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.20) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#EEF6FF] via-white to-[#E6FAFD] border border-white/80 shadow-[0_30px_80px_-30px_rgba(16,32,51,0.20)] p-6 md:p-7">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="text-2xl" aria-hidden>🌐</span>
            <p className="font-[family-name:var(--font-display)] font-800 text-[14px] text-[#102033]">
              EDUS Global Reach
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-[family-name:var(--font-display)] font-700"
            style={{ background: "rgba(37,99,235,0.12)", color: "#2563EB" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            Live · 1-to-1
          </span>
        </div>

        {/* Big stat */}
        <div className="mt-5 rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] p-4">
          <p className="text-[11px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-600">
            Students Across
          </p>
          <p
            className="font-[family-name:var(--font-display)] font-800 text-[34px] leading-none mt-2"
            style={{
              background: "linear-gradient(90deg,#2563EB 0%,#06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            14+ Countries
          </p>
          <p className="text-[11.5px] text-[#5A6A82] mt-1.5 leading-tight">
            UK, UAE, Qatar, Saudi Arabia, Oman, Kuwait, Canada, Australia, NZ, Singapore,
            Malaysia, USA, Europe & more.
          </p>
        </div>

        {/* Curricula chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Cambridge", "Edexcel", "IGCSE", "GCSE", "O-Level", "A-Level", "IB", "National"].map((c) => (
            <span
              key={c}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-[family-name:var(--font-display)] font-700 bg-white border border-[rgba(16,32,51,0.08)] text-[#102033]"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 rounded-xl bg-white border border-[rgba(16,32,51,0.08)] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex w-9 h-9 rounded-full items-center justify-center"
              style={{ background: "rgba(6,182,212,0.12)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.6" aria-hidden>
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] font-700 text-[12.5px] text-[#102033]">
                Time-zone friendly
              </p>
              <p className="text-[10.5px] text-[#5A6A82] mt-0.5">Class times built around you</p>
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.10em] text-[#5A6A82] font-[family-name:var(--font-display)] font-700">
            Global
          </p>
        </div>
      </div>
    </div>
  );
}
