"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  fadeUp, staggerContainer, sectionRevealStrong, glassHover, inView,
} from "@/lib/motion";

type RegionFact = { label: string; value: string };

type Region = {
  flag: string;
  title: string;
  tag: string;
  hook: string;
  facts: RegionFact[];
  cta: string;
  href: string;
  tint: string;
  tintSoft: string;
};

const REGIONS: Region[] = [
  {
    flag: "🇱🇰",
    title: "Sri Lanka",
    tag: "National - Cambridge - Edexcel",
    hook: "Every grade, every syllabus, taught by tutors who actually know the Sri Lankan exam.",
    facts: [
      { label: "Syllabus", value: "National - Cambridge - Edexcel" },
      { label: "Classes",  value: "Primary - Grade 6-11 - O/L - A/L" },
      { label: "Medium",   value: "Tamil - English - Sinhala" },
      { label: "Format",   value: "Group & One-to-One" },
    ],
    cta: "Explore Sri Lanka",
    href: "/sl",
    tint: "#2563EB", tintSoft: "#EEF6FF",
  },
  {
    flag: "🇮🇳",
    title: "India",
    tag: "CBSE - Classes 6-10",
    hook: "Disciplined, structured CBSE tuition built around the exam, not the calendar.",
    facts: [
      { label: "Syllabus", value: "CBSE" },
      { label: "Classes",  value: "Middle (6-8) & Secondary (9-10)" },
      { label: "Medium",   value: "English" },
      { label: "Format",   value: "Group & One-to-One" },
    ],
    cta: "Explore India",
    href: "/in",
    tint: "#8B5CF6", tintSoft: "#F4EEFF",
  },
  {
    flag: "🇲🇻",
    title: "Maldives",
    tag: "Cambridge IGCSE / O-Level",
    hook: "One tutor. One student. Cambridge results delivered island-wide.",
    facts: [
      { label: "Syllabus", value: "Cambridge IGCSE / O-Level" },
      { label: "Classes",  value: "Grade 9 & Grade 10" },
      { label: "Medium",   value: "English" },
      { label: "Format",   value: "One-to-One only" },
    ],
    cta: "Explore Maldives",
    href: "/mv",
    tint: "#22C55E", tintSoft: "#E8FAEC",
  },
  {
    flag: "🌐",
    title: "Global",
    tag: "Worldwide One-to-One",
    hook: "Any syllabus, any country, any subject. Matched to the right tutor in days.",
    facts: [
      { label: "Syllabus", value: "Cambridge - Edexcel - IB - National" },
      { label: "Classes",  value: "IGCSE - GCSE - O/A-Level - School" },
      { label: "Medium",   value: "English" },
      { label: "Format",   value: "One-to-One online" },
    ],
    cta: "Explore Global",
    href: "/global",
    tint: "#06B6D4", tintSoft: "#E6FAFD",
  },
];

export function RegionSelector() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Skip parallax on mobile - scroll-linked transforms on heavily blurred
  // layers are the main mobile-jank culprit.
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-40, 80]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60]);

  return (
    <section
      ref={ref}
      id="regions"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobAY }}>
          <AmbientGlow top="12%" right="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={20} blur={80} />
        </m.div>
        <m.div className="absolute inset-0" style={{ y: blobBY }}>
          <AmbientGlow bottom="6%" left="-4%" size={220} color="#8B5CF6" opacity={[0.08, 0.14]} duration={24} delay={3} blur={80} />
        </m.div>
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Choose Your Path</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Choose the learning path that <em>fits your child.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS gives every student a clear route based on country, grade, syllabus, and learning need.
            Select the right path and start with a focused learning experience.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {REGIONS.map((r) => (
            <m.div
              key={r.href}
              variants={fadeUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="h-full"
            >
              <m.div variants={glassHover} className="h-full">
                <Link
                  href={r.href}
                  className="group relative glass rounded-[28px] p-7 overflow-hidden block h-full"
                >
                  <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: r.tint, opacity: 0.30 }} />

                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <m.span
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl shrink-0"
                        style={{ background: r.tintSoft, border: `1px solid ${r.tint}20` }}
                        whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
                      >
                        {r.flag}
                      </m.span>
                      <h3
                        className="heading whitespace-nowrap"
                        style={{ fontSize: "24px", lineHeight: 1.1, letterSpacing: "-0.01em" }}
                      >
                        {r.title}
                      </h3>
                    </div>

                    <span
                      className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-display font-700 tracking-[0.04em] self-start"
                      style={{ background: r.tintSoft, color: r.tint, border: `1px solid ${r.tint}25` }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: r.tint }} />
                      {r.tag}
                    </span>

                    <p className="text-[#2B3950] text-[14px] mt-4 leading-[1.55] flex-1">
                      {r.hook}
                    </p>

                    <dl className="mt-5 space-y-2.5">
                      {r.facts.map((f) => (
                        <div key={f.label}>
                          <dt
                            className="text-[10px] font-display font-700 uppercase tracking-widest"
                            style={{ color: r.tint }}
                          >
                            {f.label}
                          </dt>
                          <dd className="mt-0.5 text-[13px] text-[#102033] font-display font-600 leading-[1.4]">
                            {f.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 pt-4 border-t border-[rgba(16,32,51,0.08)]">
                      <span
                        className="inline-flex items-center gap-2 font-display font-700 text-[14px]"
                        style={{ color: r.tint }}
                      >
                        {r.cta}
                        <m.svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.25 }}
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </m.svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </m.div>
            </m.div>
          ))}
        </m.div>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-8 text-center text-[13px] text-[#5A6A82]"
        >
          Not sure which path fits? <Link href="/contact" className="text-[#2563EB] font-medium hover:underline">Talk to US</Link>.
        </m.p>
      </div>
    </section>
  );
}
