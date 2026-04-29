"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  fadeUp, staggerContainer, sectionRevealStrong, glassHover, inView,
} from "@/lib/motion";

type Region = {
  flag: string;
  title: string;
  description: string;
  suitableFor: string;
  features: string[];
  cta: string;
  href: string;
  tint: string;
  tintSoft: string;
  index: string;
};

const REGIONS: Region[] = [
  {
    flag: "🇱🇰",
    title: "Sri Lanka Classes",
    description: "Live online group classes and one to one support for students following the Sri Lankan school curriculum.",
    suitableFor: "Grade 1 to G.C.E A/L students",
    features: [
      "National syllabus classes",
      "Group and individual class options",
      "Grade based subject support",
      "Recordings, exams, and resources",
      "Parent communication and progress updates",
    ],
    cta: "Explore Sri Lanka Classes",
    href: "/sl",
    tint: "#2563EB", tintSoft: "#EEF6FF", index: "01",
  },
  {
    flag: "🇮🇳",
    title: "India Grades 6 to 10",
    description: "Premium structured online tuition for English medium students in Chennai and across India.",
    suitableFor: "Grade 6 to Grade 10 students",
    features: [
      "English medium classes",
      "Tamil, Hindi, English, Maths, Science, Social Science",
      "Weekly academic monitoring",
      "Exam focused learning",
      "Parent reports and disciplined class tracking",
    ],
    cta: "Explore India Classes",
    href: "/in",
    tint: "#8B5CF6", tintSoft: "#F4EEFF", index: "02",
  },
  {
    flag: "🌐",
    title: "Global One to One Classes",
    description: "Flexible one to one online tuition for students who need personalised academic support from anywhere.",
    suitableFor: "International students and custom learning needs",
    features: [
      "Personal tutor matching",
      "Flexible class timing",
      "Syllabus based support",
      "Individual attention",
      "Progress focused learning",
    ],
    cta: "Book One to One Tuition",
    href: "/global",
    tint: "#06B6D4", tintSoft: "#E6FAFD", index: "03",
  },
];

export function RegionSelector() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Skip parallax on mobile — scroll-linked transforms on heavily blurred
  // layers are the main mobile-jank culprit.
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-40, 80]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60]);

  return (
    <section
      ref={ref}
      id="regions"
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
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
          className="mt-12 grid md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {REGIONS.map((r) => (
            <m.div
              key={r.index}
              variants={fadeUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <m.div variants={glassHover}>
                <Link
                  href={r.href}
                  className="group relative glass rounded-[28px] p-7 overflow-hidden block h-full"
                >
                  <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: r.tint, opacity: 0.30 }} />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <m.span
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl"
                        style={{ background: r.tintSoft, border: `1px solid ${r.tint}20` }}
                        whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
                      >
                        {r.flag}
                      </m.span>
                      <span className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.16em] uppercase text-[#5A6A82]">
                        {r.index} / 03
                      </span>
                    </div>

                    <h3 className="heading mt-7" style={{ fontSize: "21px", lineHeight: 1.25 }}>
                      {r.title}
                    </h3>
                    <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.6]">{r.description}</p>

                    <p className="mt-4 text-[12px] font-[family-name:var(--font-display)] font-600 uppercase tracking-[0.12em]" style={{ color: r.tint }}>
                      Suitable for · {r.suitableFor}
                    </p>

                    <ul className="mt-4 space-y-2 text-[13.5px]">
                      {r.features.map((f, i) => (
                        <m.li
                          key={f}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.1 + i * 0.05, duration: 0.4 },
                          }}
                          viewport={inView}
                          className="flex items-start gap-2.5 text-[#2B3950]"
                        >
                          <span
                            className="inline-flex w-4 h-4 mt-0.5 rounded-full items-center justify-center shrink-0"
                            style={{ background: `${r.tint}1A` }}
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={r.tint} strokeWidth="3.5" aria-hidden>
                              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {f}
                        </m.li>
                      ))}
                    </ul>

                    <div className="mt-7 pt-5 border-t border-[rgba(16,32,51,0.08)]">
                      <span
                        className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] font-600 text-[14px]"
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
          Not sure which path fits? <Link href="/contact" className="text-[#2563EB] font-medium hover:underline">Talk to EDUS Team</Link>.
        </m.p>
      </div>
    </section>
  );
}
