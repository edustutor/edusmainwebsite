"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import {
  fadeUp,
  staggerContainer,
  buttonGlow,
} from "@/lib/motion";

/**
 * Audience phrases that cycle through the H1's second line.
 * Order: generic first (best for SEO crawlers / no-JS readers) so the
 * H1 reads naturally even if the rotator never starts. Then the four
 * markets EDUS actually serves.
 *
 * "Every Student" is the canonical fallback - matches the static H1.
 */
const ROTATING_AUDIENCES = [
  "Every Student.",
  "Sri Lanka.",
  "India.",
  "Maldives.",
  "Worldwide.",
] as const;

/** Rotation cadence - slow enough to read, fast enough to feel alive */
const ROTATION_MS = 2800;

const DESKTOP_HERO_GLOWS = [
  { top: "-8%", left: "-8%", size: 480, color: "#2563EB", opacity: [0.22, 0.36] as [number, number], duration: 14, delay: 0, parallax: -60 },
  { top: "10%", right: "-10%", size: 500, color: "#8B5CF6", opacity: [0.20, 0.32] as [number, number], duration: 16, delay: 2, parallax: 80 },
  { top: "55%", left: "30%", size: 440, color: "#06B6D4", opacity: [0.16, 0.28] as [number, number], duration: 18, delay: 4, parallax: -40 },
  { top: "20%", right: "30%", size: 300, color: "#FACC15", opacity: [0.20, 0.32] as [number, number], duration: 12, delay: 1, parallax: 60 },
  { bottom: "-10%", left: "20%", size: 400, color: "#22C55E", opacity: [0.12, 0.22] as [number, number], duration: 20, delay: 3, parallax: -90 },
];

// Mobile uses 3 glows, no parallax (parallax = 0).
const MOBILE_HERO_GLOWS = [
  { top: "-6%", left: "-6%", size: 280, color: "#2563EB", opacity: [0.20, 0.32] as [number, number], duration: 16, delay: 0, parallax: 0 },
  { top: "8%", right: "-8%", size: 280, color: "#8B5CF6", opacity: [0.18, 0.30] as [number, number], duration: 18, delay: 2, parallax: 0 },
  { bottom: "-8%", left: "20%", size: 240, color: "#06B6D4", opacity: [0.14, 0.24] as [number, number], duration: 20, delay: 4, parallax: 0 },
];

const SUPPORTING = [
  "Live online classes for school students",
  "Group and one to one learning options",
  "Structured academic monitoring",
  "Class recordings and learning resources",
  "Parent updates and progress tracking",
  "Easy enrolment and online support",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Respect prefers-reduced-motion. When true, the H1 phrase stays static
  // on the SEO-canonical first option ("Every Student.") and never rotates.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Audience rotator: cycles through ROTATING_AUDIENCES on a fixed cadence.
  // Skipped entirely under reduced-motion preferences.
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setAudienceIndex((i) => (i + 1) % ROTATING_AUDIENCES.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax content as user scrolls past hero. On mobile, scroll-driven
  // transforms force constant repaints of huge blurred layers - kill them.
  const headlineY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -60]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -120]);
  const dashboardScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroGlows = isMobile ? MOBILE_HERO_GLOWS : DESKTOP_HERO_GLOWS;

  return (
    <section ref={ref} className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      {/* Breathing glows. Parallax disabled on mobile via parallax: 0. */}
      <m.div aria-hidden className="absolute inset-0 -z-10" style={{ opacity: heroOpacity }}>
        {heroGlows.map((g, i) => (
          <ParallaxedGlow key={i} {...g} />
        ))}
      </m.div>

      <m.div
        className="container-edge"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ y: headlineY }}
      >
        {/* Status badge */}
        <m.div className="flex justify-center px-3" variants={fadeUp}>
          <div className="inline-flex flex-col items-center gap-1 sm:flex-row sm:gap-2.5 px-5 py-2 rounded-3xl sm:rounded-full glass text-[12px] sm:text-[12.5px] font-medium text-[#2B3950] text-center max-w-full">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              Live online tuition
            </span>
            <span className="hidden sm:inline text-[#5A6A82]">-</span>
            <span>🇱🇰 Sri Lanka - 🇮🇳 India - 🇲🇻 Maldives - 🌐 Global</span>
          </div>
        </m.div>

        {/* Brand promise - small kicker above H1 */}
        <m.p
          variants={fadeUp}
          className="mt-7 text-center text-[12.5px] font-display font-600 tracking-[0.2em] uppercase text-[#2563EB]"
        >
          Quality-Assured Online Live Learning Platform
        </m.p>

        {/* H1 - 4-line stacked layout. Lines 1-3 are SEO-locked. Line 4
            rotates through audience phrases for visual impact while the
            keyword stack ("Online Tuition" + "Live Online Classes") stays
            untouched. Server-rendered HTML carries "Every Student." as the
            no-JS / reduced-motion fallback. */}
        <m.div className="mt-4 text-center max-w-5xl mx-auto" variants={fadeUp}>
          <h1
            className="heading flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: "var(--fs-hero-stacked)" }}
          >
            <span className="block sm:whitespace-nowrap">
              Best <em>Online Tuition</em>
            </span>
            <span className="block sm:whitespace-nowrap">
              with Expert Tutors.
            </span>
            <span className="block sm:whitespace-nowrap">
              <em>Live Online Classes</em>
            </span>
            <span className="block sm:whitespace-nowrap">
              <span className="inline-flex items-baseline justify-center">
                <span>for&nbsp;</span>
                <span className="relative inline-block align-baseline">
                  {/* Invisible width-reservation token holds the line at
                      the widest phrase so layout never shifts on rotate. */}
                  <span aria-hidden className="invisible whitespace-nowrap">
                    Every Student.
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <m.span
                      key={ROTATING_AUDIENCES[audienceIndex]}
                      initial={{ y: "0.4em", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-0.4em", opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.8, 0.3, 1] }}
                      // text-left pins the rotating phrase to the left edge
                      // of the reservation slot, so shorter phrases sit
                      // visually adjacent to "for" instead of drifting to
                      // the middle of the reserved width.
                      className="absolute inset-0 whitespace-nowrap text-left"
                    >
                      <em>{ROTATING_AUDIENCES[audienceIndex]}</em>
                    </m.span>
                  </AnimatePresence>
                </span>
              </span>
            </span>
          </h1>
        </m.div>

        {/* Subheading */}
        <m.div className="mt-7 max-w-2xl mx-auto text-center" variants={fadeUp}>
          <p className="text-[#2B3950] text-[17px] leading-[1.65]">
            World-class online learning with expert tutors, personalized support, structured
            guidance, and proven academic success for students worldwide.
          </p>
        </m.div>

        {/* CTAs */}
        <m.div
          className="mt-9 flex flex-wrap justify-center gap-3"
          variants={buttonGlow}
          initial="hidden"
          animate="show"
        >
          <a
            href="https://signup.edustutor.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Start Learning with EDUS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link href="/contact" className="btn btn-yellow"> Talk to US </Link>
        </m.div>

        {/* Supporting points */}
        <m.ul
          className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-2.5"
          variants={staggerContainer}
        >
          {SUPPORTING.map((s) => (
            <m.li
              key={s}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-[#2B3950] text-[14px]"
            >
              <span className="inline-flex w-5 h-5 rounded-full bg-[#22C55E]/15 items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {s}
            </m.li>
          ))}
        </m.ul>

        {/* Trust line */}
        <m.p
          variants={fadeUp}
          className="mt-10 text-center text-[13px] text-[#5A6A82] max-w-2xl mx-auto"
        >
          Trusted online learning support for students, parents, and tutors across Sri Lanka, India,
          Maldives, and global learning pathways.
        </m.p>
      </m.div>

      {/* Platform preview - product-style mock with live header */}
      <m.div
        className="container-edge"
        style={{
          y: dashboardY,
          scale: dashboardScale,
          willChange: "transform",
        }}
      >
        <m.div
          className="mt-14 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="relative glass-strong rounded-[28px] overflow-hidden">
            {/* Header strip - mimics a real product window */}
            <div
              className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-[rgba(16,32,51,0.08)]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(37,99,235,0.06) 0%, rgba(139,92,198,0.06) 50%, rgba(6,182,212,0.06) 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex w-2 h-2 rounded-full bg-[#FF5F57]" />
                <span className="inline-flex w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <span className="inline-flex w-2 h-2 rounded-full bg-[#28C840]" />
                <p className="ml-2 text-[11px] uppercase tracking-[0.12em] font-display font-700 text-[#102033]">
                  EDUS Platform
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-display font-700 bg-[#DC2626]/10 text-[#DC2626]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
                  LIVE NOW
                </span>
                <p className="text-[10.5px] text-[#5A6A82] font-display font-600">
                  Class - Mathematics - Grade 10
                </p>
              </div>
            </div>

            {/* Three feature columns */}
            <div className="grid md:grid-cols-3 divide-x divide-[rgba(16,32,51,0.08)]">
              {/* Live Classes column */}
              <PlatformColumn
                tint="#2563EB"
                eyebrow=""
                title="Live Online Classes"
                body="Interactive lessons led by qualified tutors. Every session recorded."
                delay={0.7}
                visual={
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar tint="#2563EB" letter="T" />
                      <div className="flex-1 h-1 rounded-full bg-[#2563EB]/14 overflow-hidden">
                        <span className="block h-full w-[78%] rounded-full" style={{ background: "linear-gradient(90deg,#2563EB,#6E5BC8)" }} />
                      </div>
                      <span className="text-[10px] font-display font-700 text-[#2563EB]">78%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar tint="#06B6D4" letter="S" />
                      <p className="text-[11px] text-[#5A6A82] font-display font-600">
                        Topic 03 of 05 - Quadratics
                      </p>
                    </div>
                  </div>
                }
              />

              {/* LMS column */}
              <PlatformColumn
                tint="#8B5CF6"
                eyebrow=""
                title="EDUS LMS & Mobile App"
                body="One platform for classes, recordings, assignments, exams, and progress."
                delay={0.8}
                visual={
                  <div className="grid grid-cols-3 gap-1.5">
                    {["Classes", "Records", "Tasks", "Exams", "Reports", "Wallet"].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center justify-center px-1.5 py-1 rounded-md text-[9.5px] font-display font-700 bg-white border border-[#8B5CF6]/25 text-[#102033]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                }
              />

              {/* Resource Vault column */}
              <PlatformColumn
                tint="#06B6D4"
                eyebrow=""
                title="Resource Vault"
                body="Past papers, study materials, and AI study support for revision."
                delay={0.9}
                visual={
                  <div className="space-y-1.5">
                    {[
                      { name: "Past Paper - 2024", c: "#06B6D4" },
                      { name: "Revision Notes",   c: "#22C55E" },
                      { name: "AI Study Buddy",   c: "#FACC15" },
                    ].map((r) => (
                      <div
                        key={r.name}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white border border-[rgba(16,32,51,0.06)]"
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: r.c }}
                        />
                        <span className="text-[11px] font-display font-600 text-[#102033] truncate">
                          {r.name}
                        </span>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>

            {/* Footer stats strip */}
            <div
              className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-[rgba(16,32,51,0.08)]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(37,99,235,0.04) 0%, rgba(6,182,212,0.04) 100%)",
              }}
            >
              <FooterStat k="11K+" v="Students" tint="#2563EB" />
              <FooterStat k="200+" v="Tutors" tint="#8B5CF6" />
              <FooterStat k="4" v="Markets" tint="#06B6D4" />
              <FooterStat k="98%" v="Pass rate" tint="#22C55E" />
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}

/**
 * Parallaxed breathing glow.
 * Wraps an AmbientGlow in a scroll-driven y-translate so it drifts as the
 * user scrolls past the hero, while the glow itself breathes opacity + scale.
 *
 * If `parallax === 0` (mobile config), the scroll listener is skipped
 * entirely - saves a `useScroll` subscription per glow on phones.
 */
function ParallaxedGlow({
  top, left, right, bottom, size, color, opacity, duration, delay, parallax,
}: {
  top?: string; left?: string; right?: string; bottom?: string;
  size: number; color: string; opacity: [number, number];
  duration: number; delay: number; parallax: number;
}) {
  if (parallax === 0) {
    return (
      <div className="absolute inset-0">
        <AmbientGlow
          top={top} left={left} right={right} bottom={bottom}
          size={size} color={color} opacity={opacity}
          duration={duration} delay={delay} blur={60}
        />
      </div>
    );
  }
  return <ParallaxedGlowActive
    top={top} left={left} right={right} bottom={bottom}
    size={size} color={color} opacity={opacity}
    duration={duration} delay={delay} parallax={parallax}
  />;
}

function ParallaxedGlowActive({
  top, left, right, bottom, size, color, opacity, duration, delay, parallax,
}: {
  top?: string; left?: string; right?: string; bottom?: string;
  size: number; color: string; opacity: [number, number];
  duration: number; delay: number; parallax: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax]);

  return (
    <m.div ref={ref} className="absolute inset-0" style={{ y }}>
      <AmbientGlow
        top={top} left={left} right={right} bottom={bottom}
        size={size} color={color} opacity={opacity}
        duration={duration} delay={delay} blur={110}
      />
    </m.div>
  );
}

/* --------------------------------------------------------------- */
/* Platform preview helpers                                         */
/* --------------------------------------------------------------- */

function PlatformColumn({
  tint, eyebrow, title, body, visual, delay,
}: {
  tint: string;
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  delay: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { delay, duration: 0.5 } }}
      className="p-5 md:p-6 bg-white/85"
    >
      <p
        className="text-[10px] uppercase tracking-[0.12em] font-display font-800"
        style={{ color: tint }}
      >
        {eyebrow}
      </p>
      <p className="mt-1 font-display font-700 text-[15.5px] text-[#102033] leading-tight">
        {title}
      </p>
      <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">
        {body}
      </p>
      <div className="mt-4">{visual}</div>
    </m.div>
  );
}

function Avatar({ tint, letter }: { tint: string; letter: string }) {
  return (
    <span
      className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-display font-800 text-white shrink-0"
      style={{ background: tint }}
    >
      {letter}
    </span>
  );
}

function FooterStat({ k, v, tint }: { k: string; v: string; tint: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <p
        className="font-display font-800 text-[14px] leading-none"
        style={{ color: tint }}
      >
        {k}
      </p>
      <p className="text-[10.5px] text-[#5A6A82] font-display font-600">
        {v}
      </p>
    </div>
  );
}
