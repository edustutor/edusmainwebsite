"use client";
import Link from "next/link";

export const MV_SIGNUP = "https://signup.edustutor.com/";

export type Subject = {
  name: string;
  short: string;
  code: string;
  price: number; // USD per hour
  tint: string;
  icon: string;
  blurb: string;
  topics: string;
};

export const SUBJECTS: Subject[] = [
  {
    name: "Mathematics",
    short: "Maths",
    code: "0580",
    price: 20,
    tint: "#2563EB",
    icon: "🧮",
    blurb:
      "Build strong problem-solving skills, master formulas, and prepare confidently for Cambridge IGCSE / O-Level Mathematics.",
    topics: "Algebra · Geometry · Trigonometry · Graphs · Probability · Statistics",
  },
  {
    name: "English as a Second Language",
    short: "English ESL",
    code: "0510",
    price: 18,
    tint: "#06B6D4",
    icon: "📖",
    blurb:
      "Improve reading, writing, grammar, vocabulary, and exam communication for academic confidence.",
    topics: "Reading · Writing · Listening · Speaking · Exam strategy",
  },
  {
    name: "Biology",
    short: "Biology",
    code: "0610",
    price: 22,
    tint: "#22C55E",
    icon: "🧬",
    blurb:
      "Understand key biological concepts clearly and prepare structured exam answers backed by past-paper practice.",
    topics: "Cells · Genetics · Ecology · Human biology · Diagrams · Vocabulary",
  },
  {
    name: "Chemistry",
    short: "Chemistry",
    code: "0620",
    price: 24,
    tint: "#8B5CF6",
    icon: "🧪",
    blurb:
      "Master concepts, reactions, calculations, and practical-based questions with patient, step-by-step support.",
    topics: "Bonding · Acids & bases · Organic · Stoichiometry · Past papers",
  },
  {
    name: "Physics",
    short: "Physics",
    code: "0625",
    price: 24,
    tint: "#FACC15",
    icon: "⚛️",
    blurb:
      "Build clarity in concepts, formulas, and problem solving - with exam-style training every step of the way.",
    topics: "Mechanics · Electricity · Waves · Energy · Forces · Calculations",
  },
];

/* --------------------------------------------------------------- */
/* Reusable section header                                          */
/* --------------------------------------------------------------- */
export function SectionHead({
  eyebrow,
  title,
  emphasis,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
      }
    >
      <p className="eyebrow"><span className="dot" />{eyebrow}</p>
      <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
        {title}
        {emphasis ? (
          <>
            {" "}
            <em>{emphasis}</em>
          </>
        ) : null}
      </h2>
      {body ? (
        <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">{body}</p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Primary + secondary CTA row                                      */
/* --------------------------------------------------------------- */
export function MvCtaRow({
  align = "center",
  primary = "Start Learning with EDUS",
  secondary = "Talk to US",
  secondaryHref = "/contact",
}: {
  align?: "left" | "center";
  primary?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div
      className={`mt-8 flex flex-wrap gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <a
        href={MV_SIGNUP}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        {primary}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden
        >
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {secondaryHref.startsWith("/") ? (
        <Link href={secondaryHref} className="btn btn-yellow">
          {secondary}
        </Link>
      ) : (
        <a href={secondaryHref} className="btn btn-yellow">
          {secondary}
        </a>
      )}
    </div>
  );
}
