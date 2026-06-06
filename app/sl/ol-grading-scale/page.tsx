import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FeatureIcon } from "@/components/effects/Icons";
import {
  JsonLdScript,
  breadcrumbList,
  faqPage,
  SITE_URL,
} from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";

/**
 * EDUS free reference asset: "Sri Lanka G.C.E O/L Grading Scale +
 * What 9A Means" explainer hub.
 *
 * WHY THIS PAGE EXISTS (backlink strategy, not a sales page):
 *   This is a linkable reference asset. Teachers, parent blogs, school
 *   sites, and forums need a single clean page that states the O/L
 *   grading scale (A/B/C/S/W), the 6 + 3 subject structure, and what
 *   "9A" / "8A" / "Distinction" actually mean. Pages like this earn
 *   backlinks passively because other sites cite the reference instead
 *   of re-typing it. The brand link is earned, never bought.
 *
 *   The facts here are STABLE and verifiable (Wikipedia, Nuffic,
 *   Scholaro all agree on the same scale). We deliberately do NOT print
 *   a specific exam date - exam dates shift year to year and a wrong
 *   date would damage the page's credibility (the opposite of what a
 *   reference asset is for). For the live exam timetable we link out to
 *   the official Department of Examinations site.
 *
 * Conversion is SECONDARY here. The page leads with genuine reference
 * value, then offers a soft EDUS path at the bottom (the 9A Project
 * class) for readers who arrived wanting to chase 9A.
 *
 * All copy is original EDUS wording. No third-party content is copied.
 */

const SIGNUP_URL = "https://signup.edustutor.com/";
const PHONE_DISPLAY = "070 707 2072";
const PHONE_TEL = "+94707072072";

/** Official source we link out to for the live exam timetable, so this
 *  page never has to hardcode a volatile exam date. */
const DOE_URL = "https://doenets.lk/";
const DOE_DISPLAY = "doenets.lk (Department of Examinations)";

/* --------------------------------------------------------------- */
/* The grading scale - the core reference table. Single source of    */
/* truth; the schema block below reads the same wording.             */
/* --------------------------------------------------------------- */

const GRADE_SCALE: Array<{
  grade: string;
  marks: string;
  label: string;
  meaning: string;
  tint: string;
}> = [
  {
    grade: "A",
    marks: "75 - 100",
    label: "Distinction",
    meaning:
      "Excellent mastery of the subject. An A grade is what students chasing a 9A result aim for in every subject.",
    tint: "#16A34A",
  },
  {
    grade: "B",
    marks: "65 - 74",
    label: "Very Good Pass",
    meaning: "Strong, consistent understanding of the subject. A clear, solid result.",
    tint: "#2563EB",
  },
  {
    grade: "C",
    marks: "55 - 64",
    label: "Credit Pass",
    meaning: "A good grasp of the subject, above an ordinary pass.",
    tint: "#0EA5E9",
  },
  {
    grade: "S",
    marks: "40 - 54",
    label: "Ordinary (Simple) Pass",
    meaning:
      "The minimum mark needed to pass a subject. A student must earn at least an S in their core subjects to qualify.",
    tint: "#CA8A04",
  },
  {
    grade: "W",
    marks: "0 - 39",
    label: "Weak (Fail)",
    meaning:
      "Below the pass mark, recorded as a fail in that subject. Sometimes shown as F.",
    tint: "#DC2626",
  },
];

/* The 6 + 3 subject structure. Group names kept general because the
 * exact optional baskets vary slightly by school stream; we describe
 * the structure, not a fixed subject list, to stay accurate. */
const SUBJECT_STRUCTURE: Array<{ title: string; body: string; icon: string; tint: string }> = [
  {
    title: "6 Compulsory Subjects",
    body: "Every O/L student sits the same core group: Religion, First Language (Sinhala or Tamil), English, Mathematics, Science, and History.",
    icon: "book-open",
    tint: "#2563EB",
  },
  {
    title: "3 Optional Subjects",
    body: "Students choose three more subjects from baskets such as a second language, technical, aesthetic, commerce, and applied subjects, depending on what the school offers.",
    icon: "target",
    tint: "#8B5CF6",
  },
  {
    title: "9 Subjects Total",
    body: "6 compulsory plus 3 optional makes 9 subjects in total. That is why the very best result a student can earn is 9A - an A grade in all nine.",
    icon: "graduation",
    tint: "#16A34A",
  },
];

/* "What does NA mean" quick-reference rows. Pure explainer value. */
const RESULT_MEANINGS: Array<{ code: string; meaning: string }> = [
  {
    code: "9A",
    meaning:
      "An A (Distinction) in all 9 subjects. The highest possible O/L result and the goal most top students set.",
  },
  {
    code: "8A",
    meaning:
      "An A in 8 of the 9 subjects. An outstanding result, one grade short of a full 9A.",
  },
  {
    code: "Distinction",
    meaning: "Another name for an A grade (75 marks and above) in a subject.",
  },
  {
    code: "Credit",
    meaning: "Commonly used for a C grade (55 to 64 marks) - a good pass in a subject.",
  },
  {
    code: "Passing O/L",
    meaning:
      "To qualify, a student generally needs to pass their core subjects, including a pass in Mathematics and the First Language. Always confirm the current rule on the official results portal.",
  },
];

/* Honest, useful study guidance for chasing top grades. Original EDUS
 * advice, not copied. This is the kind of content other sites link to. */
const NINE_A_STEPS: Array<{ title: string; body: string }> = [
  {
    title: "Start from the Grade 10 basics",
    body: "Most marks are lost because a Grade 10 foundation was shaky, not because Grade 11 was too hard. Close the Grade 10 gaps first, then build Grade 11 on top.",
  },
  {
    title: "Cover the full syllabus, then revise",
    body: "Finish the whole syllabus with time left for at least two full revision rounds. The last cycle is where A grades are won.",
  },
  {
    title: "Practise past papers under exam timing",
    body: "Work through past papers against the clock. Knowing the content is not enough; you must answer fast and cleanly under pressure.",
  },
  {
    title: "Sit mock exams and act on the feedback",
    body: "A graded mock exam shows exactly which subjects are below an A. Fix those subjects with focused, targeted practice.",
  },
];

/* FAQ doubles as FAQPage schema - this is the AEO / voice-search layer
 * and a strong reason other sites cite the page. */
const FAQ_ENTRIES: Array<{ q: string; a: string }> = [
  {
    q: "What is the G.C.E O/L grading scale in Sri Lanka?",
    a: "The Sri Lanka G.C.E Ordinary Level grading scale has five grades: A (Distinction) for 75 to 100 marks, B (Very Good Pass) for 65 to 74, C (Credit Pass) for 55 to 64, S (Ordinary Pass) for 40 to 54, and W (Weak or Fail) for 0 to 39 marks. The W grade is sometimes shown as F.",
  },
  {
    q: "What does 9A mean in O/L?",
    a: "9A means a student earned an A grade, a Distinction, in all 9 subjects of the G.C.E O/L examination. Because every student sits 9 subjects (6 compulsory and 3 optional), 9A is the highest possible result.",
  },
  {
    q: "How many subjects are there in the O/L exam?",
    a: "O/L students sit 9 subjects in total: 6 compulsory subjects (Religion, First Language, English, Mathematics, Science, and History) plus 3 optional subjects chosen from the baskets the school offers.",
  },
  {
    q: "What marks are needed for an A grade in O/L?",
    a: "An A grade, also called a Distinction, is awarded for 75 marks and above out of 100 in a subject.",
  },
  {
    q: "Is S a pass in O/L?",
    a: "Yes. An S grade (40 to 54 marks) is an Ordinary or Simple Pass, the minimum mark needed to pass a subject. A W grade (0 to 39) is a fail.",
  },
  {
    q: "What is the difference between A, B, C, and S grades?",
    a: "A (75 to 100) is a Distinction, B (65 to 74) is a Very Good Pass, C (55 to 64) is a Credit Pass, and S (40 to 54) is an Ordinary Pass. Below 40 is a W (fail).",
  },
  {
    q: "How can a student get 9A in O/L?",
    a: "Getting 9A means scoring 75 or more in all nine subjects. The reliable path is to close any Grade 10 gaps first, finish the full syllabus with time for two revision rounds, practise past papers under exam timing, and sit graded mock exams to find and fix weak subjects before the real exam.",
  },
];

/* --------------------------------------------------------------- */
/* Structured data                                                  */
/* --------------------------------------------------------------- */

const PAGE_URL = `${SITE_URL}/sl/ol-grading-scale`;

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Sri Lanka", path: "/sl" },
  { name: "O/L Grading Scale", path: "/sl/ol-grading-scale" },
];

/* An Article schema makes the page eligible to be treated as a citable
 * reference by search + AI engines. Author + publisher = EDUS so any
 * citation carries the brand. */
const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sri Lanka G.C.E O/L Grading Scale and What 9A Means",
  description:
    "A clear reference to the Sri Lanka G.C.E O/L grading scale (A, B, C, S, W), the 6 plus 3 subject structure, and what results like 9A, 8A, and Distinction mean.",
  inLanguage: "en",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  about: "G.C.E Ordinary Level grading system in Sri Lanka",
  author: {
    "@type": "Organization",
    name: "EDUS Online Institute",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "EDUS Online Institute",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/edus-logo.png`,
    },
  },
};

/* A DefinedTermSet expresses the grade scale as machine-readable
 * definitions - the cleanest schema for a glossary-style reference and
 * a strong AEO signal for "what does grade A mean" style questions. */
const GRADE_TERMSET_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Sri Lanka G.C.E O/L Grades",
  url: PAGE_URL,
  hasDefinedTerm: GRADE_SCALE.map((g) => ({
    "@type": "DefinedTerm",
    name: `Grade ${g.grade} (${g.label})`,
    description: `${g.marks} marks. ${g.meaning}`,
    inDefinedTermSet: PAGE_URL,
  })),
};

export const metadata = {
  // Title leads with the exact-match reference query parents and
  // teachers type ("O/L grading scale"), then the 9A hook, then brand.
  title: "O/L Grading Scale Sri Lanka + What 9A Means | EDUS",
  description:
    "Free reference: the Sri Lanka G.C.E O/L grading scale (A, B, C, S, W) with marks, the 6 + 3 subject structure, and what 9A, 8A, and Distinction mean. Clear and simple.",
  alternates: {
    canonical: "/sl/ol-grading-scale",
    languages: hreflangAlternates("/sl/ol-grading-scale"),
  },
  keywords: [
    // Exact-match reference queries (the backlink-magnet terms)
    "O/L grading scale",
    "O/L grading scale Sri Lanka",
    "O/L grading system",
    "G.C.E O/L grading system Sri Lanka",
    "O Level grades Sri Lanka",
    "OL marks and grades",
    "A B C S W grades O/L",
    "O/L grade marks",
    "what marks for A grade O/L",
    // 9A / result-meaning queries
    "what is 9A in O/L",
    "9A meaning O/L",
    "what does 9A mean",
    "8A O/L",
    "distinction O/L meaning",
    "credit pass O/L",
    "how to get 9A in O/L",
    // Subject structure
    "O/L subjects list",
    "how many subjects in O/L",
    "O/L compulsory subjects",
    "O/L optional subjects",
    "O/L 6 subjects 3 subjects",
    // Pass / qualify
    "how to pass O/L",
    "O/L pass mark",
    "is S a pass in O/L",
    "O/L qualifying criteria",
  ],
  openGraph: {
    title: "O/L Grading Scale Sri Lanka + What 9A Means",
    description:
      "The Sri Lanka G.C.E O/L grading scale (A, B, C, S, W) explained simply, with the 6 + 3 subject structure and what 9A and Distinction mean.",
    type: "article",
    siteName: "EDUS Online Institute",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "Sri Lanka O/L grading scale reference by EDUS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "O/L Grading Scale Sri Lanka + What 9A Means",
    description:
      "The Sri Lanka G.C.E O/L grading scale (A, B, C, S, W) explained, plus what 9A and Distinction mean.",
    images: ["/edus-og.jpg"],
  },
};

export default function OlGradingScalePage() {
  return (
    <>
      <JsonLdScript data={breadcrumbList(BREADCRUMBS)} />
      <JsonLdScript data={ARTICLE_SCHEMA} />
      <JsonLdScript data={GRADE_TERMSET_SCHEMA} />
      <JsonLdScript data={faqPage(FAQ_ENTRIES)} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Sri Lanka", href: "/sl" },
          { label: "O/L Grading Scale" },
        ]}
        variant="overlay"
      />

      <Hero />
      <GradeScaleTable />
      <SubjectStructure />
      <ResultMeanings />
      <NineAGuide />
      <OfficialNote />
      <FAQ />
      <SoftCta />
    </>
  );
}

/* --------------------------------------------------------------- */
/* Hero                                                              */
/* --------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-4 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="blob" style={{ top: "-10%", left: "-6%", width: 380, height: 380, background: "#2563EB", opacity: 0.22 }} />
        <span className="blob" style={{ top: "10%", right: "-8%", width: 360, height: 360, background: "#8B5CF6", opacity: 0.18 }} />
      </div>
      <div className="container-edge max-w-3xl mx-auto text-center">
        <p className="eyebrow justify-center">
          <span className="dot" />
          Free O/L Reference
        </p>
        <h1
          className="heading mt-5"
          style={{ fontSize: "var(--fs-display)", lineHeight: 1.12 }}
        >
          Sri Lanka O/L grading scale,{" "}
          <em>and what 9A really means.</em>
        </h1>
        <p className="mt-5 text-[#2B3950] text-[16px] leading-relaxed">
          A simple, accurate reference to the G.C.E Ordinary Level grading
          scale used in Sri Lanka: every grade, the marks behind it, the 6 + 3
          subject structure, and what results like 9A and Distinction mean.
          Free to read and free to share.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* The grading scale table - the core reference                      */
/* --------------------------------------------------------------- */

function GradeScaleTable() {
  return (
    <section id="grading-scale" className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        The Grading Scale
      </p>
      <h2 className="heading text-center mt-4" style={{ fontSize: "var(--fs-display)" }}>
        O/L grades, <em>marks, and meaning.</em>
      </h2>

      <div className="mt-10 max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(16,32,51,0.12)]">
              <th className="py-3 pr-4 font-display font-700 text-[13px] text-[#102033]">Grade</th>
              <th className="py-3 pr-4 font-display font-700 text-[13px] text-[#102033]">Marks</th>
              <th className="py-3 pr-4 font-display font-700 text-[13px] text-[#102033]">Meaning</th>
              <th className="py-3 font-display font-700 text-[13px] text-[#102033]">What it tells you</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_SCALE.map((g) => (
              <tr key={g.grade} className="border-b border-[rgba(16,32,51,0.07)] align-top">
                <td className="py-4 pr-4">
                  <span
                    className="inline-flex w-9 h-9 rounded-xl items-center justify-center font-display font-700 text-[16px] text-white"
                    style={{ background: g.tint }}
                  >
                    {g.grade}
                  </span>
                </td>
                <td className="py-4 pr-4 text-[14px] font-700 text-[#102033] whitespace-nowrap">
                  {g.marks}
                </td>
                <td className="py-4 pr-4 text-[14px] font-700" style={{ color: g.tint }}>
                  {g.label}
                </td>
                <td className="py-4 text-[13.5px] text-[#2B3950] leading-[1.7]">
                  {g.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-[12.5px] text-[#5A6A82] max-w-2xl mx-auto">
        Marks are out of 100 per subject. The W grade (a fail) is sometimes
        printed as F on results sheets.
      </p>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* The 6 + 3 subject structure                                       */
/* --------------------------------------------------------------- */

function SubjectStructure() {
  return (
    <section className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        Subject Structure
      </p>
      <h2 className="heading text-center mt-4" style={{ fontSize: "var(--fs-display)" }}>
        Why a perfect result is <em>9A.</em>
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
        {SUBJECT_STRUCTURE.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6">
            <FeatureIcon name={s.icon} tint={s.tint} size={22} />
            <h3 className="heading mt-4 text-[16px]">{s.title}</h3>
            <p className="mt-2 text-[13.5px] text-[#2B3950] leading-[1.7]">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* "What does NA mean" quick reference                               */
/* --------------------------------------------------------------- */

function ResultMeanings() {
  return (
    <section id="what-is-9a" className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        Results Explained
      </p>
      <h2 className="heading text-center mt-4" style={{ fontSize: "var(--fs-display)" }}>
        9A, 8A, Distinction: <em>what they mean.</em>
      </h2>

      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {RESULT_MEANINGS.map((r) => (
          <div key={r.code} className="glass rounded-2xl p-5 flex gap-4 items-start">
            <span className="inline-flex shrink-0 min-w-[64px] h-9 px-3 rounded-xl items-center justify-center font-display font-700 text-[14px] text-[#2563EB] bg-[#F4F8FF]">
              {r.code}
            </span>
            <p className="text-[13.5px] text-[#2B3950] leading-[1.7]">{r.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* How to chase 9A - honest study guidance                           */
/* --------------------------------------------------------------- */

function NineAGuide() {
  return (
    <section className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        Aiming for the Top
      </p>
      <h2 className="heading text-center mt-4" style={{ fontSize: "var(--fs-display)" }}>
        How students <em>reach 9A.</em>
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
        {NINE_A_STEPS.map((step, i) => (
          <div key={step.title} className="glass rounded-2xl p-6 flex gap-4 items-start">
            <span className="inline-flex shrink-0 w-9 h-9 rounded-full items-center justify-center font-display font-700 text-[15px] text-white bg-[#2563EB]">
              {i + 1}
            </span>
            <div>
              <h3 className="heading text-[15.5px]">{step.title}</h3>
              <p className="mt-2 text-[13.5px] text-[#2B3950] leading-[1.7]">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Official-source note - keeps the page accurate without            */
/* hardcoding a volatile exam date                                   */
/* --------------------------------------------------------------- */

function OfficialNote() {
  return (
    <section className="container-edge mt-16 sm:mt-20">
      <div className="max-w-3xl mx-auto glass rounded-2xl p-6 flex gap-4 items-start">
        <FeatureIcon name="shield" tint="#2563EB" size={20} />
        <div>
          <h3 className="heading text-[15px]">For exam dates and official rules</h3>
          <p className="mt-2 text-[13.5px] text-[#2B3950] leading-[1.7]">
            Exam dates, application deadlines, and the official results portal
            change each year. Always confirm the current G.C.E O/L examination
            timetable and qualifying rules on the official Department of
            Examinations website:{" "}
            <a
              href={DOE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-700 text-[#2563EB] underline"
            >
              {DOE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* FAQ - also emits FAQPage schema                                   */
/* --------------------------------------------------------------- */

function FAQ() {
  return (
    <section id="faq" className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        Frequently Asked Questions
      </p>
      <h2 className="heading text-center mt-4 max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        O/L grading, <em>answered simply.</em>
      </h2>

      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {FAQ_ENTRIES.map((f) => (
          <details key={f.q} className="glass rounded-2xl p-5 group cursor-pointer">
            <summary className="list-none flex items-center justify-between gap-3 cursor-pointer">
              <span className="font-display font-700 text-[14.5px] text-[#102033] leading-snug">
                {f.q}
              </span>
              <span
                aria-hidden
                className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-[#F4F8FF] text-[#2563EB] text-[16px] font-700 shrink-0 group-open:rotate-45 transition"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[13.5px] text-[#2B3950] leading-[1.7]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Soft CTA - the reference page earns the click, never forces it     */
/* --------------------------------------------------------------- */

function SoftCta() {
  return (
    <section className="container-edge mt-16 mb-16">
      <div className="relative rounded-[36px] glass-strong p-7 sm:p-12 overflow-hidden text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="blob" style={{ top: "-8%", left: "-4%", width: 220, height: 220, background: "#2563EB", opacity: 0.16 }} />
          <span className="blob" style={{ top: "-8%", right: "-4%", width: 220, height: 220, background: "#8B5CF6", opacity: 0.16 }} />
          <span className="blob" style={{ bottom: "-12%", left: "40%", width: 200, height: 200, background: "#16A34A", opacity: 0.14 }} />
        </div>

        <p className="eyebrow justify-center">
          <span className="dot" />
          Chasing 9A?
        </p>
        <h2 className="heading mt-5" style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.16 }}>
          EDUS runs a 6-month <em>O/L 2026 9A class.</em>
        </h2>
        <p className="mt-4 text-[#2B3950] text-[15px] max-w-2xl mx-auto leading-relaxed">
          Live online classes that cover the Grade 10 and Grade 11 syllabus,
          full revision, past papers, and mock exams. Built for students aiming
          for the top grades explained on this page.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/sl/9a-project" className="btn btn-primary">
            See the 9A Project Class
          </Link>
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-cyan">
            Enrol Online
          </a>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-yellow">
            Call {PHONE_DISPLAY}
          </a>
        </div>

        <p className="mt-6 text-[12.5px] text-[#5A6A82]">
          Prefer to browse first? See all{" "}
          <Link href="/sl" className="font-700 text-[#2563EB] underline">
            EDUS Sri Lanka online classes
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
