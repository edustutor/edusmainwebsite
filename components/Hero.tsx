"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import {
  fadeUp,
  staggerContainer,
  buttonGlow,
} from "@/lib/motion";

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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
        <m.div className="flex justify-center" variants={fadeUp}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            Live online tuition · 🇱🇰 Sri Lanka · 🇮🇳 India · 🇲🇻 Maldives · 🌐 Global
          </div>
        </m.div>

        {/* Brand promise — small kicker above H1 */}
        <m.p
          variants={fadeUp}
          className="mt-7 text-center text-[12.5px] font-[family-name:var(--font-display)] font-600 tracking-[0.2em] uppercase text-[#2563EB]"
        >
          Quality-Assured Online Live Learning Platform
        </m.p>

        {/* H1 */}
        <m.div className="mt-4 text-center max-w-5xl mx-auto" variants={fadeUp}>
          <h1 className="heading" style={{ fontSize: "var(--fs-hero)" }}>
            Learn from the <em>Best Tutors</em>.<br />
            Achieve <em>Exceptional Results</em>.
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

      {/* Dashboard preview - gentle float + scroll parallax */}
      <m.div
        className="container-edge"
        style={{ y: dashboardY, scale: dashboardScale }}
      >
        <m.div
          className="mt-14 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <m.div
            className="relative glass-strong rounded-[28px] p-6 md:p-8"
            animate={{
              y: [0, -8, 0],
              transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 1.0,
              },
            }}
          >
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: "🎓", k: "Live Online Classes", v: "Interactive lessons led by qualified tutors. Recordings included.", tint: "#2563EB" },
                { icon: "🖥️", k: "EDUS LMS", v: "One platform for classes, recordings, assignments, exams, and progress.", tint: "#8B5CF6" },
                { icon: "📚", k: "Resource Vault", v: "Past papers, study materials, and AI study support for revision.", tint: "#06B6D4" },
              ].map((c, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.7 + i * 0.1, duration: 0.5 },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.10)] p-5 shadow-[0_2px_8px_-4px_rgba(16,32,51,0.06)]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${c.tint}1A`, color: c.tint }}
                  >
                    {c.icon}
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-display)] font-600 text-[17px] text-[#102033]">{c.k}</p>
                  <p className="text-[13.5px] text-[#5A6A82] mt-1.5 leading-relaxed">{c.v}</p>
                </m.div>
              ))}
            </div>
          </m.div>
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
