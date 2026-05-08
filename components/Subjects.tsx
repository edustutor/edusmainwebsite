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
    region: "Grades 6 to 10 · English Medium",
    description:
      "English Medium tuition for Grades 6 to 10 with six core subjects, weekly academic monitoring, and exam focused learning.",
    groups: [
      {
        title: "Grade 6 to 10",
        subjects: ["Tamil", "Hindi", "English", "Mathematics", "Science", "Social Science"],
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
      className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden"
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
            Subjects designed for <em>school success.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Each EDUS pathway has its own subject list, mapped to the right syllabus and grade. Pick
            a pathway below to see the subjects available.
          </p>
        </m.div>

        {/* Pathway tabs — always one row */}
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
            className="mt-8 glass-strong rounded-[28px] p-7 md:p-10 max-w-6xl mx-auto relative overflow-hidden"
          >
            <span aria-hidden className="blob" style={{ top: -80, right: -80, width: 320, height: 320, background: current.tint, opacity: 0.18 }} />
            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl"
                    style={{ background: current.tintSoft, border: `1px solid ${current.tint}25` }}
                  >
                    {current.flag}
                  </span>
                  <div>
                    <p
                      className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.14em] uppercase"
                      style={{ color: current.tint }}
                    >
                      {current.region}
                    </p>
                    <h3 className="heading mt-1" style={{ fontSize: "20px" }}>
                      {current.label}
                    </h3>
                  </div>
                </div>
                <Link
                  href={current.cta.href}
                  className="btn"
                  style={{
                    background: current.tint,
                    color: "#fff",
                    border: `1px solid ${current.tint}`,
                  }}
                >
                  {current.cta.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <p className="text-[#2B3950] text-[14.5px] mt-5 leading-[1.65] max-w-3xl">
                {current.description}
              </p>

              {/* Groups */}
              <m.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-8 space-y-6"
              >
                {current.groups.map((g) => (
                  <m.div key={g.title} variants={fadeUp}>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <p
                        className="font-[family-name:var(--font-display)] font-600 text-[14px] tracking-[0.10em] uppercase"
                        style={{ color: current.tint }}
                      >
                        {g.title}
                      </p>
                      <p className="text-[11.5px] text-[#5A6A82]">
                        {g.subjects.length} subject{g.subjects.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <m.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5"
                    >
                      {g.subjects.map((s) => (
                        <m.div
                          key={s}
                          variants={fadeUp}
                          whileHover={{
                            y: -3,
                            boxShadow: `0 14px 32px -10px ${current.tint}55`,
                            borderColor: `${current.tint}55`,
                            transition: { duration: 0.25 },
                          }}
                          className="rounded-xl bg-white border border-[rgba(16,32,51,0.06)] px-3.5 py-3 flex items-center gap-2.5 cursor-default"
                        >
                          <span
                            className="inline-flex w-7 h-7 rounded-lg items-center justify-center shrink-0"
                            style={{ background: `${current.tint}15`, color: current.tint }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
                              <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
                            </svg>
                          </span>
                          <span className="font-[family-name:var(--font-display)] font-500 text-[13.5px] text-[#102033] leading-tight">
                            {s}
                          </span>
                        </m.div>
                      ))}
                    </m.div>
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
