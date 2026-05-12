"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";

type Group = { title: string; subjects: string[] };
type Pathway = {
  code: "SL" | "IN" | "MV" | "GL";
  flag: string;
  label: string;
  region: string;
  description: string;
  groups: Group[];
  cta: { label: string; href: string };
  tint: string;
  tintSoft: string;
};

const PATHWAYS: Pathway[] = [
  {
    code: "SL",
    flag: "🇱🇰",
    label: "Sri Lanka",
    region: "National Syllabus",
    description:
      "Sri Lankan National Syllabus from Grade 1 to A/L, with group classes and subject based enrolment across primary, secondary, and advanced level.",
    groups: [
      {
        title: "Grade 1 to 5",
        subjects: ["Tamil", "English", "Mathematics", "Environment", "Science", "Sinhala"],
      },
      {
        title: "Grade 6 to 11",
        subjects: [
          "Tamil",
          "English",
          "Mathematics",
          "Science",
          "ICT",
          "History",
          "Geography",
          "Civics",
          "Sinhala",
        ],
      },
      {
        title: "G.C.E A/L",
        subjects: ["Combined Mathematics", "Biology", "Chemistry", "Physics", "ICT"],
      },
    ],
    cta: { label: "Explore Sri Lanka Classes", href: "/sl" },
    tint: "#2563EB",
    tintSoft: "#EEF6FF",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    label: "India",
    region: "CBSE Classes 6 to 10 · English Medium",
    description:
      "Premium English-medium CBSE tuition for Classes 6 to 10 with three core subjects, monthly academic monitoring, and exam-focused learning.",
    groups: [
      {
        title: "Middle Stage · CBSE Classes 6 – 8",
        subjects: ["Mathematics", "Science", "English"],
      },
      {
        title: "Secondary Stage · CBSE Classes 9 – 10",
        subjects: ["Mathematics", "Science", "English"],
      },
    ],
    cta: { label: "Explore India Classes", href: "/in" },
    tint: "#8B5CF6",
    tintSoft: "#F4EEFF",
  },
  {
    code: "MV",
    flag: "🇲🇻",
    label: "Maldives",
    region: "English Medium · Cambridge & Edexcel",
    description:
      "Live online classes for Maldivian school students. Cambridge IGCSE, Edexcel, and core academic subjects taught by qualified tutors with parent updates and recordings included.",
    groups: [
      {
        title: "Core Subjects",
        subjects: ["Mathematics", "Science", "English", "ICT", "Physics", "Chemistry", "Biology"],
      },
      {
        title: "Cambridge",
        subjects: ["Cambridge Mathematics", "Cambridge Science", "Cambridge English", "Cambridge ICT"],
      },
      {
        title: "Edexcel",
        subjects: ["Edexcel Mathematics", "Edexcel Science", "Edexcel English", "Edexcel ICT"],
      },
    ],
    cta: { label: "Explore Maldives Classes", href: "/mv" },
    tint: "#22C55E",
    tintSoft: "#E8FAEC",
  },
  {
    code: "GL",
    flag: "🌐",
    label: "Global",
    region: "International Syllabus · One to One",
    description:
      "Personal tutor matching with flexible timing for international students. Cambridge, Edexcel, and core academic subjects supported.",
    groups: [
      {
        title: "Core Global Subjects",
        subjects: [
          "Mathematics",
          "Science",
          "English",
          "ICT",
          "Physics",
          "Chemistry",
          "Biology",
          "Tamil",
          "Sinhala",
        ],
      },
      {
        title: "Cambridge",
        subjects: [
          "Cambridge Mathematics",
          "Cambridge Science",
          "Cambridge English",
          "Cambridge ICT",
        ],
      },
      {
        title: "Edexcel",
        subjects: [
          "Edexcel Mathematics",
          "Edexcel Science",
          "Edexcel English",
          "Edexcel ICT",
        ],
      },
    ],
    cta: { label: "Book One to One Tuition", href: "/global" },
    tint: "#06B6D4",
    tintSoft: "#E6FAFD",
  },
];

export function Subjects() {
  const [active, setActive] = useState<Pathway["code"]>("SL");
  const current = PATHWAYS.find((p) => p.code === active) ?? PATHWAYS[0];

  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-60, 60]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);

  return (
    <section
      ref={ref}
      id="subjects"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobAY }}>
          <AmbientGlow top="14%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.14]} duration={22} blur={80} />
        </m.div>
        <m.div className="absolute inset-0" style={{ y: blobBY }}>
          <AmbientGlow bottom="6%" right="-4%" size={220} color="#22C55E" opacity={[0.06, 0.12]} duration={26} delay={3} blur={80} />
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
          <p className="eyebrow"><span className="dot" />Subjects</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Every subject, mapped to the right <em>syllabus and grade.</em>
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.65]">
            Pick a pathway to see exactly what your child can learn with EDUS.
          </p>
        </m.div>

        {/* Pathway tabs - always one row */}
        <m.div
          className="mt-10 flex justify-center px-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div className="inline-flex glass rounded-full p-1 sm:p-1.5 gap-0.5 sm:gap-1">
            {PATHWAYS.map((p) => {
              const isActive = active === p.code;
              return (
                <button
                  key={p.code}
                  onClick={() => setActive(p.code)}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-medium font-[family-name:var(--font-display)] transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? "text-white" : "text-[#2B3950] hover:text-[#102033]"
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="subjects-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: p.tint }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{p.flag}</span>
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </m.div>

        {/* Active pathway panel */}
        <AnimatePresence mode="wait">
          <m.div
            key={current.code}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-8 glass-strong rounded-[28px] p-6 md:p-8 max-w-5xl mx-auto relative overflow-hidden"
          >
            <span aria-hidden className="blob" style={{ top: -80, right: -80, width: 280, height: 280, background: current.tint, opacity: 0.16 }} />
            <div className="relative">
              {/* Compact header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-2xl shrink-0"
                    style={{ background: current.tintSoft, border: `1px solid ${current.tint}25` }}
                  >
                    {current.flag}
                  </span>
                  <div className="min-w-0">
                    <h3 className="heading leading-tight" style={{ fontSize: "20px" }}>
                      {current.label}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-display)] font-700 text-[10.5px] tracking-[0.12em] uppercase mt-0.5"
                      style={{ color: current.tint }}
                    >
                      {current.region}
                    </p>
                  </div>
                </div>
                <Link
                  href={current.cta.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-[family-name:var(--font-display)] font-700 text-white shadow-[0_8px_20px_-10px_rgba(16,32,51,0.30)] hover:-translate-y-0.5 transition"
                  style={{ background: current.tint }}
                >
                  Explore
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Subject groups - compact pill rows */}
              <m.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-6 space-y-4"
              >
                {current.groups.map((g) => (
                  <m.div
                    key={g.title}
                    variants={fadeUp}
                    className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.06)] px-4 py-3.5"
                  >
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <p
                        className="font-[family-name:var(--font-display)] font-700 text-[12px] tracking-[0.10em] uppercase"
                        style={{ color: current.tint }}
                      >
                        {g.title}
                      </p>
                      <p
                        className="text-[10.5px] font-[family-name:var(--font-display)] font-700"
                        style={{ color: `${current.tint}` }}
                      >
                        {g.subjects.length} subject{g.subjects.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {g.subjects.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[family-name:var(--font-display)] font-600 leading-tight bg-white border transition hover:-translate-y-0.5"
                          style={{
                            borderColor: `${current.tint}30`,
                            color: "#102033",
                          }}
                        >
                          <span
                            aria-hidden
                            className="inline-block w-1 h-1 rounded-full mr-1.5"
                            style={{ background: current.tint }}
                          />
                          {s}
                        </span>
                      ))}
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
