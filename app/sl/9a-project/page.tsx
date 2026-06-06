import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FeatureIcon } from "@/components/effects/Icons";
import {
  JsonLdScript,
  breadcrumbList,
  faqPage,
  tuitionCourse,
  SITE_URL,
} from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";

/**
 * EDUS G.C.E O/L 2026 - 6 Months 9A Project Class landing page.
 *
 * Target audience: parents of Sri Lankan Grade 11 students sitting the
 * G.C.E O/L 2026 examination who fear their child missed Grade 10
 * basics OR want a structured revision + 9A push.
 *
 * Conversion strategy (top to bottom):
 *   1. Hero with the "Grade 10 missed? Still dreaming of 9A?" hook
 *      and the F-result refund promise loud + clear.
 *   2. Two-option cards (Regular Rs.1200 vs Project Rs.1500).
 *   3. "Full 9A Success Package" upsell row (Rs.2000 combo).
 *   4. What the student receives (8-tile feature grid).
 *   5. 5A Confidence + F Refund double-banner.
 *   6. Refund terms + conditions (10 bullet checklist - transparent).
 *   7. Project class timetable table (TM + EM side by side).
 *   8. Regular Grade 11 timetables (TM + EM).
 *   9. Fee summary table.
 *   10. Who should join.
 *   11. FAQ - duplicates as FAQPage schema.
 *   12. Final CTA banner with phone + signup link.
 *
 * All copy is sourced verbatim from the EDUS marketing brief (with
 * minor cleanups for HTML rendering - the original PDF had garbled
 * Tamil unicode in a few places; we keep English copy authoritative).
 */

const PHONE_DISPLAY = "070 707 2072";
const PHONE_TEL = "+94707072072";
const SIGNUP_URL = "https://signup.edustutor.com/";
const BANK_URL = "https://fees.edustutor.com/";
const WEBSITE_DISPLAY = "www.edus.lk";
const WEBSITE_URL = "https://www.edus.lk";

/** Quick facts shown right under the hero - mirrors the metadata
 *  bullet block at the top of the marketing brief. Single source of
 *  truth so the page header banner + the final CTA print the same
 *  values. */
const QUICK_FACTS = [
  { label: "Start Date", value: "June 2026" },
  { label: "End Date", value: "30 November 2026" },
  { label: "Duration", value: "6 Months" },
  { label: "Subjects", value: "Tamil, English, Maths, Science, History" },
  { label: "Medium", value: "Tamil Medium & English Medium" },
  { label: "Class Mode", value: "Live Online Classes" },
  { label: "Website", value: WEBSITE_DISPLAY },
  { label: "Contact", value: PHONE_DISPLAY },
];

export const metadata = {
  // Title formula: primary exact-match keyword first (G.C.E O/L 2026 9A),
  // then differentiator (6 Months Project), then brand (EDUS). Under 60
  // chars to avoid SERP truncation. The "2026" year token + "9A" digit
  // pair both stand out in SERP snippets and align with how parents
  // search ("o/l 2026 classes", "9A project class").
  title: "G.C.E O/L 2026 9A Project Class - 6 Months Online | EDUS",
  description:
    "Aim for 9A in G.C.E O/L 2026. EDUS 6-month live online project class covers Grade 10 + Grade 11 syllabus, full revision, past papers, mock exams. Tamil + English medium. F-result refund promise. From Rs. 1,500/month. Call 070 707 2072.",
  alternates: {
    canonical: "/sl/9a-project",
    languages: hreflangAlternates("/sl/9a-project"),
  },
  // Keyword set ordered by search volume + intent:
  // exact-match brand-aligned terms first, then the modifier variations
  // parents actually type, then the long-tail recovery / refund angles.
  keywords: [
    // Exact-match high-intent (rank-1 targets)
    "G.C.E O/L 2026",
    "GCE OL 2026",
    "O/L 2026",
    "O Level 2026 Sri Lanka",
    "9A class O/L",
    "9A class Sri Lanka",
    "9A project class",
    "9A challenge",
    "Grade 11 9A class",
    // Online + Sri Lanka modifiers
    "G.C.E O/L 2026 online classes",
    "O/L 2026 online classes Sri Lanka",
    "O Level online classes Sri Lanka",
    "Grade 11 online tuition Sri Lanka",
    "Grade 11 online classes Sri Lanka",
    "O/L online tuition Sri Lanka",
    // Recovery + revision intent
    "O/L recovery class",
    "O/L revision class Sri Lanka",
    "Grade 10 catch up classes",
    "Grade 10 syllabus revision online",
    "Grade 11 revision online",
    "O/L past paper class online",
    "O/L mock exam class",
    "O/L paper class Sri Lanka",
    // Medium + subject variants
    "O/L Tamil medium online classes",
    "O/L English medium online classes",
    "O/L Maths online class",
    "O/L Science online class",
    "O/L English online class",
    "O/L History online class",
    "O/L Tamil online class",
    // Result / outcome intent
    "how to get 9A in O/L",
    "best O/L tuition Sri Lanka",
    "best O/L class for 9A",
    "best 9A class online",
    // Refund / guarantee angle (unique to EDUS)
    "O/L class with money back guarantee",
    "O/L refund promise",
    "EDUS 9A Project Class",
    "EDUS O/L 2026",
  ],
  openGraph: {
    title: "G.C.E O/L 2026 9A Project Class - EDUS Sri Lanka",
    description:
      "6-month live online program for Grade 11. Grade 10 + Grade 11 coverage, past papers, mock exams, F-result refund promise. From Rs. 1,500/month. Tamil + English medium.",
    type: "website",
    url: `${SITE_URL}/sl/9a-project`,
    siteName: "EDUS Online Tuition",
    locale: "en_LK",
    // Pull the 9A Challenge banner so the SERP share preview shows the
    // students-with-trophy image instead of the generic site OG fallback.
    images: [
      {
        url: `${SITE_URL}/edus-9a-challenge-popup.webp`,
        width: 1200,
        height: 675,
        alt: "EDUS 9A Challenge - G.C.E O/L 2026 - 6 Months Online Project Class",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G.C.E O/L 2026 9A Project Class - EDUS",
    description:
      "6-month live online Grade 11 program. Tamil + English medium. F-result refund promise. From Rs. 1,500/month/subject.",
    images: [`${SITE_URL}/edus-9a-challenge-popup.webp`],
  },
  // Make sure search engines + AI crawlers know this is fresh, indexable,
  // and a primary marketing landing page.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* --------------------------------------------------------------- */
/* Data - single source of truth for both the visible tables and    */
/* the schema generators below.                                      */
/* --------------------------------------------------------------- */

/** Project class slots per subject (TM + EM where available). */
const PROJECT_TIMETABLE: Array<{
  subject: string;
  tamilMedium: string;
  englishMedium: string;
  tutor: string;
}> = [
  {
    subject: "Tamil",
    tamilMedium: "Thursday 4.30 - 6.00 AM",
    englishMedium: "Thursday 4.30 - 6.00 AM",
    tutor: "Mr. Niththyanantha Muthulingam, BA Hons (Niththi)",
  },
  {
    subject: "English",
    tamilMedium: "Sunday 4.30 - 6.00 PM",
    englishMedium: "Sunday 4.30 - 6.00 PM",
    tutor: "Mrs. Fathima Afnaa, MEd in English Language Teaching",
  },
  {
    subject: "Maths",
    tamilMedium: "Sunday 7.00 - 8.30 PM",
    englishMedium: "Tuesday 10.00 - 11.30 PM",
    tutor:
      "TM: Mr. Ainkaran Vallipuram / EM: Ms. Uthayadharshini Sasikumar, BICT Hons",
  },
  {
    subject: "Science",
    tamilMedium: "Tuesday 6.30 - 8.00 PM",
    englishMedium: "Saturday 6.30 - 8.00 PM",
    tutor: "TM: Mr. Rajendran Suthakaran, BEd Hons / EM: Ms. Kobitha",
  },
  {
    subject: "History",
    tamilMedium: "Friday 6.00 - 7.30 PM",
    englishMedium: "Friday 6.00 - 7.30 PM",
    tutor: "Mr. Jenil Jeyanthan, BA Hons",
  },
];

const REGULAR_TM_TIMETABLE = [
  {
    code: "GT11Tamil",
    subject: "Tamil",
    teacher: "Niththi",
    days: "Thursday 8.30 - 9.30 PM / Friday 9.00 - 10.00 PM",
  },
  {
    code: "GT11English",
    subject: "English",
    teacher: "Sumeerjitha",
    days: "Tuesday 8.00 - 9.00 PM / Wednesday 6.45 - 7.45 PM",
  },
  {
    code: "GT11History",
    subject: "History",
    teacher: "Jenil Jeyanthan",
    days: "Wednesday 8.00 - 9.00 PM / Thursday 6.45 - 7.45 PM",
  },
  {
    code: "GT11Maths",
    subject: "Maths",
    teacher: "Ainkaran",
    days: "Monday 8.00 - 9.00 PM / Saturday 6.45 - 7.45 PM",
  },
  {
    code: "GT11Science",
    subject: "Science",
    teacher: "Suthakaran",
    days: "Monday 6.45 - 7.45 PM / Saturday 8.00 - 9.00 PM",
  },
];

const REGULAR_EM_TIMETABLE = [
  {
    code: "GE11Tamil",
    subject: "Tamil",
    teacher: "Niththi",
    days: "Thursday 8.30 - 9.30 PM / Friday 9.00 - 10.00 PM",
  },
  {
    code: "GE11English",
    subject: "English",
    teacher: "Sumeerjitha",
    days: "Tuesday 8.00 - 9.00 PM / Wednesday 6.45 - 7.45 PM",
  },
  {
    code: "GE11History",
    subject: "History",
    teacher: "Jenil Jeyanthan",
    days: "Wednesday 8.00 - 9.00 PM / Thursday 6.45 - 7.45 PM",
  },
  {
    code: "GE11Maths",
    subject: "Maths",
    teacher: "Uthayatharshini",
    days: "Monday 9.00 - 10.00 PM / Wednesday 9.00 - 10.00 PM",
  },
  {
    code: "GE11Science",
    subject: "Science",
    teacher: "Mayoory",
    days: "Tuesday 6.45 - 7.45 PM / Friday 8.00 - 9.00 PM",
  },
];

/** What the student receives - kept as a list so the JSX renders a
 *  consistent grid + the schema picks them up as a HasOffer features. */
const RECEIVES: Array<{
  icon: string;
  tint: string;
  title: string;
  body: string;
}> = [
  {
    icon: "live-class",
    tint: "#2563EB",
    title: "Quality Online Learning",
    body: "Experience high-quality, uninterrupted live online learning from anywhere in Sri Lanka.",
  },
  {
    icon: "expert-tutor",
    tint: "#8B5CF6",
    title: "Individual Attention",
    body: "Every student gets personal attention from our O/L expert tutors during and outside class.",
  },
  {
    icon: "class-recording",
    tint: "#06B6D4",
    title: "Class Recordings",
    body: "All class recordings provided for revision so a missed class is never a lost class.",
  },
  {
    icon: "assignment",
    tint: "#EC4899",
    title: "Practice + Continuous Assessments",
    body: "Unit exams, weekly assignments, model papers, and continuous assessment so progress is measured every step.",
  },
  {
    icon: "syllabus",
    tint: "#F59E0B",
    title: "Complete Syllabus Coverage",
    body: "Grade 10 + Grade 11 syllabus covered properly across the 6-month program.",
  },
  {
    icon: "exam",
    tint: "#16A34A",
    title: "Past Paper Practice",
    body: "Students are trained to face exam-style questions with confidence using past papers + model papers.",
  },
  {
    icon: "target",
    tint: "#DC2626",
    title: "Exam Techniques",
    body: "Special focus on answering methods, time management, and scoring strategies tailored to the O/L paper.",
  },
  {
    icon: "resources",
    tint: "#0EA5E9",
    title: "Free PDF Study Resources",
    body: "All papers, notes, and study resources are provided as PDFs free of charge.",
  },
  {
    icon: "progress",
    tint: "#6E5BC8",
    title: "Progress Monitoring",
    body: "Student progress monitored through assessments, homework, assignments, and class participation - reported back to parents.",
  },
];

const REFUND_TERMS = [
  "The student must study with EDUS continuously for the full 6 months.",
  "Monthly fees must be paid on or before the 5th of every month.",
  "The student must attend all classes regularly without unnecessary absence.",
  "If a class is missed due to a valid reason, the recording must be watched and the lesson must be completed.",
  "All exams, assignments, homework, and practice papers must be completed on time.",
  "The student must respond to teachers during class and actively participate.",
  "Full attention during class is compulsory.",
  "The student must follow all academic instructions given by the tutor and EDUS academic team.",
  "Refund applies only if the student receives an \"F\" result in the enrolled subject.",
  "Refund applies only to tuition fees paid for the eligible subject. Admission fee, mock exam fees, or other external charges are not included.",
];

const FAQ_ENTRIES = [
  {
    q: "What is the EDUS 6 Months 9A Project Class?",
    a: "A 6-month live online recovery and revision program for Sri Lankan Grade 11 students sitting the G.C.E O/L 2026 examination. The first 3 months cover the Grade 10 syllabus (foundation recovery); the next 3 months cover the Grade 11 syllabus, full revision, past paper discussions, and mock exam preparation.",
  },
  {
    q: "When does the G.C.E O/L 2026 9A Project Class start?",
    a: "The 6-month program runs from June 2026 to 30 November 2026, aligned with the G.C.E O/L 2026 examination timetable.",
  },
  {
    q: "Who should join this class?",
    a: "Grade 11 students preparing for G.C.E O/L 2026 - especially those who missed Grade 10 lessons, are weak in basics, or want to push from average marks to 5A / 7A / 9A results. Parents looking for a structured, result-focused online institute will find this ideal.",
  },
  {
    q: "How much does the 9A Project Class cost?",
    a: "Rs. 1,500 per month per subject for the 9A Project Class only. Rs. 1,200 per month per subject for the Regular Grade 11 class only. Rs. 2,000 per month per subject for the Full Package (Regular + Project - most recommended). A one-time non-refundable admission fee of Rs. 1,000 per student applies.",
  },
  {
    q: "Is there a refund if my child doesn't pass?",
    a: "Yes. The EDUS F-Result Refund Promise: if a student fully follows the 6-month system (full attendance, completed assignments, monthly fees on time, continuous enrolment) and still receives an F result in the enrolled subject, EDUS refunds the full tuition fees paid for that eligible subject. The admission fee and mock exam fees are excluded. See full Terms in the Refund Eligibility section above.",
  },
  {
    q: "What subjects are covered in the 9A Project Class?",
    a: "Tamil, English, Maths, Science, and History - the five core G.C.E O/L subjects. Available in both Tamil medium and English medium.",
  },
  {
    q: "How are the classes delivered?",
    a: "Live online via Google Meet on the EDUS Student Mobile App and EDUS Web App. Each project class runs 1.5 hours per week per subject. Recordings are provided after every class for revision so a missed class is never a lost class.",
  },
  {
    q: "What is the difference between the Regular Class and the 9A Project Class?",
    a: "The Regular Grade 11 class (Rs. 1,200/month/subject) covers the Grade 11 syllabus only with revision. The 9A Project Class (Rs. 1,500/month/subject) is a special 6-month program that ALSO covers Grade 10 recovery in the first 3 months + Grade 11 + intensive past paper practice + mock exams. The Full Package (Rs. 2,000/month/subject) combines both - most recommended for serious 9A students.",
  },
  {
    q: "Are mock exams included in the fee?",
    a: "Mock examinations will be conducted where necessary to prepare students for the real O/L examination environment. The mock exam fee is charged separately and the exact amount plus dates will be informed during the course.",
  },
  {
    q: "Will my child get individual attention in the online class?",
    a: "Yes. Every student receives personal attention from our O/L expert tutors during and outside class. Progress is monitored through assessments, homework, assignments, and class participation - with regular reports back to parents.",
  },
  {
    q: "Can my child catch up if Grade 10 was missed?",
    a: "Yes - that is exactly what this program is designed for. The first 3 months of the 9A Project Class cover the complete Grade 10 syllabus from foundation level. Students who missed Grade 10 lessons, basics, formulas, or grammar can recover everything before moving into the Grade 11 deep dive.",
  },
  {
    q: "What medium are the classes taught in?",
    a: "Tamil medium and English medium. The Project Class is delivered in both mediums for all five subjects (Tamil, English, Maths, Science, History). The Regular Grade 11 class is also available in both Tamil medium and English medium.",
  },
  {
    q: "How do I enrol in the 9A Project Class?",
    a: "Three ways: 1) Self sign-up online at https://signup.edustutor.com/ (takes about 3 minutes). 2) Pay by bank / online at https://fees.edustutor.com/ - our Student Consultants will guide the next steps. 3) Call us directly on 070 707 2072.",
  },
];

const COURSE_URL = `${SITE_URL}/sl/9a-project`;
// breadcrumbList helper expects { name, path } where path is the
// suffix appended to SITE_URL. Root = "" -> SITE_URL itself.
const BREADCRUMBS = [
  { name: "EDUS", path: "" },
  { name: "Sri Lanka", path: "/sl" },
  { name: "9A Project Class - O/L 2026", path: "/sl/9a-project" },
];

/* --------------------------------------------------------------- */
/* Page-specific richer schemas - inline because they're unique to  */
/* this campaign and not reused elsewhere. Bundle:                  */
/*   1. EducationalOccupationalProgram - dates + duration eligibility*/
/*      for Google's "course" rich result.                          */
/*   2. AggregateOffer - the three price tiers grouped so Google    */
/*      can show "from LKR 1,200 - 2,000" in the SERP.              */
/*   3. ItemList of subjects - eligible for SERP carousel.          */
/*   4. HowTo - the enrolment flow, AEO-friendly for ChatGPT et al. */
/* --------------------------------------------------------------- */

const PROGRAM_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "@id": `${COURSE_URL}#program`,
  name: "EDUS G.C.E O/L 2026 - 6 Months 9A Project Class",
  description:
    "Six-month live online recovery and revision program for Sri Lankan Grade 11 students sitting the G.C.E O/L 2026 examination. Covers Grade 10 syllabus (first 3 months), Grade 11 syllabus + full revision + past papers + mock exams (next 3 months). Tamil medium and English medium. Includes EDUS F-Result Refund Promise.",
  url: COURSE_URL,
  programType: "ExamPreparationProgram",
  educationalProgramMode: "online",
  timeToComplete: "P6M",
  startDate: "2026-06-01",
  endDate: "2026-11-30",
  applicationStartDate: "2026-04-01",
  applicationDeadline: "2026-06-30",
  numberOfCredits: 0,
  occupationalCategory: "Secondary education",
  educationalCredentialAwarded: "G.C.E Ordinary Level (Sri Lanka) preparation",
  inLanguage: ["en", "ta"],
  availableLanguage: ["English", "Tamil"],
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "EDUS Online Tuition",
    url: SITE_URL,
  },
  hasCourse: { "@id": `${COURSE_URL}#course` },
  offers: { "@id": `${COURSE_URL}#aggregateOffer` },
};

const AGGREGATE_OFFER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  "@id": `${COURSE_URL}#aggregateOffer`,
  priceCurrency: "LKR",
  lowPrice: "1200",
  highPrice: "2000",
  offerCount: "3",
  availability: "https://schema.org/InStock",
  url: COURSE_URL,
  validFrom: "2026-04-01",
  priceValidUntil: "2026-11-30",
  offeredBy: { "@id": `${SITE_URL}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "Regular Grade 11 Class only",
      price: "1200",
      priceCurrency: "LKR",
      description: "Standard Grade 11 class - syllabus completion + revision. Per month, per subject.",
      category: "Subscription",
      availability: "https://schema.org/InStock",
      url: COURSE_URL,
    },
    {
      "@type": "Offer",
      name: "9A Project Class only",
      price: "1500",
      priceCurrency: "LKR",
      description: "6-month recovery + revision project class. Per month, per subject.",
      category: "Subscription",
      availability: "https://schema.org/InStock",
      url: COURSE_URL,
    },
    {
      "@type": "Offer",
      name: "Full 9A Package (Regular + Project)",
      price: "2000",
      priceCurrency: "LKR",
      description: "Most recommended - both classes for maximum support. Per month, per subject.",
      category: "Subscription",
      availability: "https://schema.org/InStock",
      url: COURSE_URL,
    },
  ],
};

const SUBJECTS_ITEMLIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${COURSE_URL}#subjects`,
  name: "Subjects covered in the EDUS G.C.E O/L 2026 9A Project Class",
  numberOfItems: 5,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tamil (Tamil medium + English medium)" },
    { "@type": "ListItem", position: 2, name: "English (Tamil medium + English medium)" },
    { "@type": "ListItem", position: 3, name: "Mathematics (Tamil medium + English medium)" },
    { "@type": "ListItem", position: 4, name: "Science (Tamil medium + English medium)" },
    { "@type": "ListItem", position: 5, name: "History (Tamil medium + English medium)" },
  ],
};

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${COURSE_URL}#howto`,
  name: "How to enrol in the EDUS G.C.E O/L 2026 9A Project Class",
  description:
    "Enrol in the EDUS 6 Months 9A Project Class for Sri Lankan Grade 11 students sitting the G.C.E O/L 2026 examination.",
  totalTime: "PT3M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "LKR",
    value: "1000",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Pick your plan",
      text: "Choose Regular Grade 11 Class only (LKR 1,200/month), 9A Project Class only (LKR 1,500/month), or the Full Package combining both (LKR 2,000/month). All prices are per subject per month.",
      url: `${COURSE_URL}#fees`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose your subjects",
      text: "Pick from Tamil, English, Maths, Science, and History. Available in Tamil medium and English medium.",
      url: `${COURSE_URL}#timetable`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Sign up online or pay by bank",
      text: "Self sign-up at https://signup.edustutor.com/ (takes about 3 minutes) OR pay by bank / online at https://fees.edustutor.com/ - EDUS Student Consultants will guide the next steps. You can also call 070 707 2072.",
      url: "https://signup.edustutor.com/",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Pay the one-time admission fee",
      text: "LKR 1,000 per student, paid only once when joining EDUS. Covers any number of group classes within the program.",
      url: `${COURSE_URL}#fees`,
    },
  ],
};

const REFUND_OFFER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${COURSE_URL}#refund-promise`,
  name: "EDUS F-Result Refund Promise",
  serviceType: "Tuition refund guarantee",
  description:
    "If a student fully follows the EDUS 6 Months 9A Project Class system and still receives an F result in the enrolled subject, EDUS refunds the full tuition fees paid for that eligible subject. Terms apply.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Sri Lankan Grade 11 students sitting G.C.E O/L 2026",
  },
};

/* --------------------------------------------------------------- */
/* Page                                                              */
/* --------------------------------------------------------------- */

export default function NinePerformanceProjectPage() {
  return (
    <>
      {/* Schema bundle (order matters for Google's parsing):
            1. BreadcrumbList - tells Google the page's place in the
               site hierarchy + powers the SERP breadcrumb display.
            2. Course - the canonical educational offering. The @id
               is referenced by the program schema below.
            3. EducationalOccupationalProgram - augments Course with
               dates, application window, duration, language. Eligible
               for Google's course rich result with dates shown.
            4. AggregateOffer - the three price tiers grouped so Google
               can show "from LKR 1,200" pricing in SERP.
            5. ItemList of subjects - eligible for SERP carousel.
            6. HowTo - the enrolment flow. AEO-friendly: ChatGPT /
               Perplexity / Gemini cite HowTo schemas verbatim when
               users ask "how do I enrol in EDUS 9A class".
            7. Service - the F-Result Refund Promise as a discrete
               schema so AI engines can answer the refund question.
            8. FAQPage - all FAQ Q+As, eligible for SERP FAQ accordion. */}
      <JsonLdScript data={breadcrumbList(BREADCRUMBS)} />
      <JsonLdScript
        data={{
          ...tuitionCourse({
            name: "EDUS G.C.E O/L 2026 - 6 Months 9A Project Class",
            description:
              "A 6-month live online recovery and achievement program for Sri Lankan Grade 11 students preparing for the G.C.E O/L 2026 examination. Covers Grade 10 + Grade 11 syllabus, full revision, past papers, mock exams, and individual attention. Includes an F-result refund promise.",
            url: COURSE_URL,
            area: "Sri Lankan Grade 11 students preparing for G.C.E O/L 2026",
          }),
          // Stable @id so the program schema below can reference this
          // Course node without duplicating data (graph-style linking).
          "@id": `${COURSE_URL}#course`,
        }}
      />
      <JsonLdScript data={PROGRAM_SCHEMA} />
      <JsonLdScript data={AGGREGATE_OFFER_SCHEMA} />
      <JsonLdScript data={SUBJECTS_ITEMLIST_SCHEMA} />
      <JsonLdScript data={HOWTO_SCHEMA} />
      <JsonLdScript data={REFUND_OFFER_SCHEMA} />
      <JsonLdScript data={faqPage(FAQ_ENTRIES.map((f) => ({ q: f.q, a: f.a })))} />

      {/* Breadcrumb uses the "overlay" variant so it sits inside the
          hero's pt-32 instead of stacking. Matches the pattern used on
          /sl + other market pages. */}
      <div className="relative">
        <Breadcrumb
          variant="overlay"
          items={[
            { label: "Sri Lanka", href: "/sl" },
            { label: "9A Project Class - O/L 2026" },
          ]}
        />
        <Hero />
      </div>

      <QuickFacts />
      <WhyThisProgram />
      <ProgramObjectives />
      <TwoOptions />
      <FullPackageBanner />
      <Receives />
      <DoublePromise />
      <RefundTerms />
      <ProjectTimetable />
      <RegularTimetables />
      <FeeSummary />
      <WhoShouldJoin />
      <FAQ />
      <RelatedLinks />
      <FinalCTA />
    </>
  );
}

/* --------------------------------------------------------------- */
/* Hero                                                              */
/* --------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob"
          style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.32 }}
        />
        <div
          className="blob"
          style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#FACC15", opacity: 0.30 }}
        />
        <div
          className="blob"
          style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#EF4444", opacity: 0.22 }}
        />
      </div>

      <div className="container-edge">
        <div className="flex justify-center px-3" data-anim>
          <Link
            href="/sl"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full glass text-[12px] sm:text-[12.5px] font-medium text-[#2B3950] max-w-full flex-wrap justify-center"
          >
            <span className="inline-flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className="shrink-0">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Sri Lanka
            </span>
            <span aria-hidden className="text-[#5A6A82] hidden sm:inline">-</span>
            <span className="text-[#2563EB] whitespace-nowrap">🇱🇰 O/L 2026 9A Project</span>
          </Link>
        </div>

        <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
          <p className="eyebrow">
            <span className="dot" />
            G.C.E O/L 2026 - 6 Months Online - Limited Seats
          </p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Grade 10 missed? Basics not strong?{" "}
            <em>Still dreaming of 9A&apos;s?</em>
          </h1>
          <p className="font-display font-700 text-[15px] sm:text-[17px] text-[#2563EB] mt-4">
            EDUS is ready to take responsibility.
          </p>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            The EDUS <strong>G.C.E O/L 2026 - 6 Months 9A Project Class</strong>{" "}
            is a complete result-focused recovery and revision program. We cover
            the full <strong>Grade 10 + Grade 11 syllabus</strong>, past papers,
            mock exams, and individual attention - in Tamil medium and English
            medium. Live online from anywhere in Sri Lanka.
          </p>

          {/* The refund promise. Centre-stage. Uses the same tinted
              square + FeatureIcon idiom the rest of the site uses for
              pillar cards (see SlHero "Group Classes" / "Individual"). */}
          <div className="mt-7 mx-auto max-w-3xl glass rounded-[24px] p-5 sm:p-6 relative overflow-hidden">
            <span
              aria-hidden
              className="blob"
              style={{ top: -50, right: -50, width: 200, height: 200, background: "#22C55E", opacity: 0.25 }}
            />
            <div className="relative flex flex-col sm:flex-row items-center gap-4 text-left">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                <FeatureIcon name="shield" tint="#16A34A" size={22} />
              </div>
              <div>
                <p className="font-display font-700 text-[#102033] text-[16px] sm:text-[17px] leading-snug">
                  EDUS F-Result Refund Promise
                </p>
                <p className="text-[13.5px] text-[#2B3950] mt-1 leading-[1.6]">
                  If a student fully follows the EDUS 6 Months 9A Project Plan
                  and still receives an <strong>&ldquo;F&rdquo;</strong> result
                  in the enrolled subject,{" "}
                  <strong>EDUS will refund the full tuition fees</strong> paid
                  for that eligible subject.{" "}
                  <a href="#refund-terms" className="text-[#2563EB] underline underline-offset-2 hover:opacity-80">
                    Terms apply
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Start Enrolment
            </a>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-yellow">
              Call {PHONE_DISPLAY}
            </a>
            <Link href="#timetable" className="btn btn-cyan">
              View Fees & Timetable
            </Link>
          </div>

          {/* Trust strip - quick stats. */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {[
              { value: "6", label: "Months" },
              { value: "5", label: "Subjects" },
              { value: "TM + EM", label: "Mediums" },
              { value: "9A", label: "Target" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl py-3 px-2 text-center"
              >
                <p className="font-display font-700 text-[18px] sm:text-[20px] text-[#102033]">
                  {s.value}
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#5A6A82] uppercase tracking-[0.1em] mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Why this program                                                  */
/* --------------------------------------------------------------- */

function WhyThisProgram() {
  // Three "we understand" beats - each beat is a small visual card
  // with an icon tile, problem name, and one tight sentence. Replaces
  // the two long prose paragraphs that read as a wall of text.
  const beats = [
    {
      icon: "alert",
      tint: "#DC2626",
      title: "Missed Grade 10",
      body: "Lessons skipped, basics shaky, formulas + grammar gaps - we cover Grade 10 again from scratch in the first 3 months.",
    },
    {
      icon: "syllabus",
      tint: "#2563EB",
      title: "Foundation to Final",
      body: "Grade 10 recovery, Grade 11 syllabus, full revision, past papers, mock exams - one structured plan, 6 months.",
    },
    {
      icon: "expert-tutor",
      tint: "#8B5CF6",
      title: "Step-by-step Guidance",
      body: "Live online teaching, weekly assessments, paper practice, and individual attention from O/L expert tutors.",
    },
  ];

  return (
    <Section eyebrow="Why EDUS 9A Project Class">
      <h2
        className="heading text-center max-w-3xl mx-auto"
        style={{ fontSize: "var(--fs-display)" }}
      >
        Built for students who <em>missed Grade 10.</em>
      </h2>
      <p className="text-center text-[#2B3950] text-[15.5px] leading-[1.7] max-w-2xl mx-auto mt-5">
        Many Grade 11 students step into the O/L year unprepared. EDUS built
        this 6-month program to fix that - from foundation level to final exam
        readiness.
      </p>

      {/* Three-beat card row - visual hooks instead of prose. Same idiom
          as the Receives + Two Options cards so the page reads as one
          design system. items-stretch keeps card heights equal. */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4 items-stretch max-w-4xl mx-auto">
        {beats.map((b) => (
          <div
            key={b.title}
            className="glass rounded-2xl p-5 lift h-full flex flex-col"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: `${b.tint}15`, border: `1px solid ${b.tint}25` }}
            >
              <FeatureIcon name={b.icon} tint={b.tint} size={20} />
            </div>
            <h3 className="font-display font-700 text-[15px] text-[#102033] mt-3.5 leading-snug">
              {b.title}
            </h3>
            <p className="text-[13px] text-[#2B3950] mt-2 leading-[1.6]">
              {b.body}
            </p>
          </div>
        ))}
      </div>

      {/* Compact trust strip - one tight sentence + brand-blue icon tile.
          Sits flush at the bottom of the section as a tagline. Replaces
          the heavy 3-line trust card that broke the page rhythm. */}
      <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 px-5 py-4 rounded-[20px] bg-[#EFF4FF] border border-[#2563EB]/15">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)" }}
        >
          <FeatureIcon name="shield" tint="#2563EB" size={20} />
        </div>
        <p className="text-[14px] text-[#2B3950] leading-[1.6] text-center sm:text-left">
          <strong className="text-[#102033]">
            Not just another online class.
          </strong>{" "}
          A complete <strong className="text-[#102033]">result-focused O/L
          recovery and achievement program</strong> - backed by the EDUS
          F-Result Refund Promise.
        </p>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Quick facts row - mirrors the metadata bullet block at the top   */
/* of the marketing brief (Start Date, End Date, Duration, ...).    */
/* --------------------------------------------------------------- */

function QuickFacts() {
  return (
    <section className="container-edge mt-10">
      <div className="max-w-5xl mx-auto glass rounded-[24px] p-5 sm:p-6">
        <p className="eyebrow mb-4 text-center">
          <span className="dot" />
          Program Snapshot
        </p>
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-xl bg-[#F4F8FF] p-3 border border-[rgba(37,99,235,0.10)]"
            >
              <dt className="text-[10.5px] uppercase tracking-[0.1em] text-[#5A6A82] font-display font-700">
                {f.label}
              </dt>
              <dd className="font-display font-700 text-[#102033] text-[13.5px] mt-1.5 leading-snug">
                {f.label === "Website" ? (
                  <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline underline-offset-2"
                  >
                    {f.value}
                  </a>
                ) : f.label === "Contact" ? (
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-[#2563EB] hover:underline underline-offset-2"
                  >
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Program objectives                                                */
/* --------------------------------------------------------------- */

function ProgramObjectives() {
  const objectives = [
    "Complete missed Grade 10 syllabus areas.",
    "Build strong subject foundations.",
    "Complete the Grade 11 syllabus with proper understanding.",
    "Revise all important units before the examination.",
    "Practise past papers and model questions.",
    "Improve answer-writing techniques.",
    "Face the final O/L exam with confidence.",
    "Aim for 9A results through disciplined learning.",
  ];
  return (
    <Section eyebrow="Program Objectives">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Eight outcomes, <em>one disciplined plan.</em>
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {objectives.map((o, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-4 flex items-start gap-3 lift"
          >
            <span
              className="inline-flex w-7 h-7 rounded-full items-center justify-center font-display font-700 text-[12px] text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}
              aria-hidden
            >
              {i + 1}
            </span>
            <p className="text-[14px] text-[#2B3950] leading-[1.55]">{o}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Two options - Regular vs Project                                  */
/* --------------------------------------------------------------- */

function TwoOptions() {
  return (
    <Section eyebrow="Two Class Options Available">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Pick the path that <em>fits your child.</em>
      </h2>
      {/* items-stretch on the grid + h-full on each card + mt-auto on
          each price block keeps the "Monthly fee" / "Project class only"
          rows aligned at the same vertical position even when the body
          content above has different heights (Option 1 has a 7-item
          checklist; Option 2 has a 2-card phase grid + duration line).
          Without this, the price blocks slide to different baselines
          and the row looks broken. */}
      <div className="mt-10 grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto items-stretch">
        {/* Option 1: Regular */}
        <div className="glass rounded-[24px] p-6 lift relative overflow-hidden h-full">
          <span
            aria-hidden
            className="blob"
            style={{ top: -50, right: -50, width: 180, height: 180, background: "#2563EB", opacity: 0.22 }}
          />
          <div className="relative flex flex-col h-full">
            <p className="eyebrow">Option 1 - Standard</p>
            <h3 className="heading mt-3" style={{ fontSize: "22px" }}>
              Regular Grade 11 Class
            </h3>
            <p className="text-[14px] text-[#2B3950] mt-2 leading-[1.6]">
              Normal Grade 11 class structure - last stage of the Grade 11
              syllabus and complete revision.
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px] text-[#2B3950]">
              {[
                "Grade 11 syllabus completion",
                "Complete subject-wise revision",
                "Two classes per week",
                "Continuous learning support",
                "Recordings for revision",
                "Unit-wise exams and practice",
                "Guidance from experienced EDUS tutors",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span aria-hidden className="text-[#2563EB] mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {/* mt-auto pushes the price block to the bottom of the
                card regardless of how many bullets are above. */}
            <div className="mt-auto pt-5 border-t border-[rgba(16,32,51,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#5A6A82] font-display font-700">
                Monthly fee
              </p>
              <p className="font-display font-700 text-[26px] text-[#102033] mt-1">
                Rs. 1,200{" "}
                <span className="text-[14px] text-[#5A6A82] font-400">/ month / subject</span>
              </p>
            </div>
          </div>
        </div>

        {/* Option 2: Project - highlighted as MOST POPULAR */}
        <div className="glass-strong rounded-[24px] p-6 lift relative overflow-hidden border-2 border-[#2563EB]/30 h-full">
          <span
            aria-hidden
            className="blob"
            style={{ top: -50, right: -50, width: 200, height: 200, background: "#6E5BC8", opacity: 0.28 }}
          />
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10.5px] font-display font-700 uppercase tracking-[0.08em] shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)]">
            Most Recommended
          </div>
          <div className="relative flex flex-col h-full">
            <p className="eyebrow">Option 2 - Special</p>
            <h3 className="heading mt-3" style={{ fontSize: "22px" }}>
              6 Months 9A Project Class
            </h3>
            <p className="text-[14px] text-[#2B3950] mt-2 leading-[1.6]">
              Stronger support - Grade 10 + Grade 11 coverage, full revision,
              past paper discussions, model paper practice, and mock exam
              preparation.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#F4F8FF] p-3 border border-[rgba(37,99,235,0.15)]">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-700">
                  First 3 months
                </p>
                <p className="text-[13px] text-[#2B3950] mt-1.5 leading-[1.55]">
                  Complete coverage of the Grade 10 syllabus.
                </p>
              </div>
              <div className="rounded-xl bg-[#F4F8FF] p-3 border border-[rgba(37,99,235,0.15)]">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6A82] font-display font-700">
                  Next 3 months
                </p>
                <p className="text-[13px] text-[#2B3950] mt-1.5 leading-[1.55]">
                  Grade 11 + full revision + past papers + mock exams.
                </p>
              </div>
            </div>
            <p className="text-[12.5px] text-[#5A6A82] mt-3 inline-flex items-center gap-1.5">
              <FeatureIcon name="clock" tint="#5A6A82" size={14} />
              1.5 hours per week per subject
            </p>
            {/* mt-auto pins the price row to the bottom so it lines up
                with the Option 1 price row across the row. */}
            <div className="mt-auto pt-5 border-t border-[rgba(16,32,51,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#5A6A82] font-display font-700">
                Project class only
              </p>
              <p className="font-display font-700 text-[26px] text-[#102033] mt-1">
                Rs. 1,500{" "}
                <span className="text-[14px] text-[#5A6A82] font-400">/ month / subject</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Full Package banner                                               */
/* --------------------------------------------------------------- */

function FullPackageBanner() {
  // Matches the canonical site CTA pattern (see components/shared/CTA.tsx):
  // glass-strong card with corner blobs in brand colours, eyebrow with
  // dot, heading + body + buttons. No bespoke gradient panels - we keep
  // the visual language uniform across every market and feature page.
  return (
    <section className="container-edge mt-12">
      <div className="relative rounded-[36px] glass-strong p-7 sm:p-12 overflow-hidden text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span
            className="blob"
            style={{ top: "-8%", left: "-4%", width: 220, height: 220, background: "#2563EB", opacity: 0.18 }}
          />
          <span
            className="blob"
            style={{ top: "-8%", right: "-4%", width: 220, height: 220, background: "#8B5CF6", opacity: 0.18 }}
          />
          <span
            className="blob"
            style={{ bottom: "-12%", left: "35%", width: 220, height: 220, background: "#06B6D4", opacity: 0.15 }}
          />
          <span
            className="blob"
            style={{ bottom: "-12%", right: "20%", width: 180, height: 180, background: "#FACC15", opacity: 0.18 }}
          />
        </div>

        <p className="eyebrow">
          <span className="dot" />
          Full 9A Success Package
        </p>
        <h2
          className="heading mt-5"
          style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15 }}
        >
          Regular Class + Project Class,{" "}
          <em>one powerful plan.</em>
        </h2>
        <p className="text-[#2B3950] text-[15.5px] max-w-2xl mx-auto mt-5 leading-[1.7]">
          Maximum support for students serious about 9A&apos;s - full syllabus
          completion, revision, unit exams, paper practice, and final exam
          confidence. The most recommended path through the program.
        </p>
        <p className="font-display font-700 text-[36px] sm:text-[44px] mt-6 text-[#102033]">
          Rs. 2,000{" "}
          <span className="text-[16px] sm:text-[18px] font-400 text-[#5A6A82]">
            / month / subject
          </span>
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Start Enrolment
          </a>
          <a
            href={BANK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cyan"
          >
            Pay by Bank / Online
          </a>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-yellow">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* What students receive                                             */
/* --------------------------------------------------------------- */

function Receives() {
  return (
    <Section eyebrow="What Students Will Receive">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Nine things every <em>9A Project student gets</em>.
      </h2>
      {/* 3-column grid at lg+ so the 9 cards lay out as a clean 3x3.
          Previously was 4-col which left one orphan card on its own row. */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {RECEIVES.map((r) => (
          <div key={r.title} className="glass rounded-2xl p-5 lift h-full flex flex-col">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: `${r.tint}15`, border: `1px solid ${r.tint}25` }}
            >
              <FeatureIcon name={r.icon} tint={r.tint} size={20} />
            </div>
            <h3 className="font-display font-700 text-[15px] text-[#102033] mt-3.5 leading-snug">
              {r.title}
            </h3>
            <p className="text-[13px] text-[#2B3950] mt-2 leading-[1.6]">
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Double promise - 5A confidence + F refund                         */
/* --------------------------------------------------------------- */

function DoublePromise() {
  return (
    <Section eyebrow="Special EDUS Result Promise">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Two promises. <em>Both backed in writing.</em>
      </h2>
      <div className="mt-10 grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
        <div className="glass rounded-[24px] p-6 lift relative overflow-hidden">
          <span
            aria-hidden
            className="blob"
            style={{ top: -50, right: -50, width: 180, height: 180, background: "#FACC15", opacity: 0.25 }}
          />
          <div className="relative">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(250,204,21,0.15)", border: "1px solid rgba(250,204,21,0.30)" }}
            >
              <FeatureIcon name="star" tint="#CA8A04" size={22} />
            </div>
            <h3 className="heading mt-4" style={{ fontSize: "22px" }}>
              5A Confidence Guarantee
            </h3>
            <p className="text-[14px] text-[#2B3950] mt-2 leading-[1.6]">
              A student who attends properly, studies continuously, completes
              all exams, and follows the teacher&apos;s guidance is set up for
              strong results. EDUS guides every committed student towards at
              least <strong>5A-level performance</strong>, while pushing
              high-performing students towards <strong>9A achievement</strong>.
            </p>
          </div>
        </div>
        <div className="glass rounded-[24px] p-6 lift relative overflow-hidden">
          <span
            aria-hidden
            className="blob"
            style={{ top: -50, right: -50, width: 180, height: 180, background: "#22C55E", opacity: 0.25 }}
          />
          <div className="relative">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <FeatureIcon name="shield" tint="#16A34A" size={22} />
            </div>
            <h3 className="heading mt-4" style={{ fontSize: "22px" }}>
              F-Result Refund Promise
            </h3>
            <p className="text-[14px] text-[#2B3950] mt-2 leading-[1.6]">
              If a student fully follows the EDUS 6 Months 9A Project Class
              system and still receives an <strong>&ldquo;F&rdquo;</strong>{" "}
              result in the enrolled subject,{" "}
              <strong>EDUS will refund the full tuition fees</strong> paid for
              that eligible subject.{" "}
              <a
                href="#refund-terms"
                className="text-[#2563EB] underline underline-offset-2 hover:opacity-80"
              >
                See terms
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Refund terms                                                      */
/* --------------------------------------------------------------- */

function RefundTerms() {
  return (
    <Section eyebrow="Refund Eligibility - Terms" id="refund-terms">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Transparent rules. <em>No fine print.</em>
      </h2>
      <p className="text-center text-[#2B3950] text-[14.5px] mt-4 max-w-3xl mx-auto leading-[1.65]">
        To qualify for the F-result refund, the student must strictly follow all
        ten conditions below. Everything we ask is what serious 9A students
        already do.
      </p>
      <div className="mt-8 max-w-3xl mx-auto glass rounded-[24px] p-5 sm:p-7">
        <ol className="space-y-3">
          {REFUND_TERMS.map((t, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="inline-flex w-6 h-6 rounded-full items-center justify-center font-display font-700 text-[11px] text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-[13.5px] text-[#2B3950] leading-[1.6]">{t}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mock exam note */}
      <div className="mt-6 max-w-3xl mx-auto rounded-2xl p-4 sm:p-5 bg-[#FFF9E6] border border-[#FACC15]/40 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(250,204,21,0.20)", border: "1px solid rgba(250,204,21,0.35)" }}
        >
          <FeatureIcon name="exam" tint="#CA8A04" size={18} />
        </div>
        <div>
          <p className="font-display font-700 text-[14px] text-[#102033]">
            Mock Exams
          </p>
          <p className="text-[13px] text-[#2B3950] mt-1 leading-[1.6]">
            Mock examinations will be conducted where necessary to prepare
            students for the real O/L examination environment. The mock exam
            fee is charged separately - exact fee and dates will be informed
            during the classes.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Project timetable                                                 */
/* --------------------------------------------------------------- */

function ProjectTimetable() {
  return (
    <Section eyebrow="Project Class Timetable" id="timetable">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        9A Project Class - <em>weekly slots.</em>
      </h2>
      <p className="text-center text-[12.5px] text-[#5A6A82] mt-3">
        All times Asia/Colombo. Tutor lineup confirmed by EDUS academic team.
      </p>
      <div className="mt-8 max-w-5xl mx-auto overflow-x-auto rounded-[24px] glass">
        <table className="w-full text-left text-[13px] sm:text-[14px] min-w-[640px]">
          <thead className="bg-[#F4F8FF] text-[#102033]">
            <tr className="border-b border-[rgba(16,32,51,0.08)]">
              <th className="px-4 py-3 font-display font-700">Subject</th>
              <th className="px-4 py-3 font-display font-700">Tamil Medium</th>
              <th className="px-4 py-3 font-display font-700">English Medium</th>
              <th className="px-4 py-3 font-display font-700">Tutor</th>
            </tr>
          </thead>
          <tbody>
            {PROJECT_TIMETABLE.map((row) => (
              <tr
                key={row.subject}
                className="border-b border-[rgba(16,32,51,0.06)] last:border-0 hover:bg-[#F8FBFF] transition"
              >
                <td className="px-4 py-3.5 font-display font-700 text-[#2563EB]">
                  {row.subject}
                </td>
                <td className="px-4 py-3.5 text-[#2B3950]">{row.tamilMedium}</td>
                <td className="px-4 py-3.5 text-[#2B3950]">
                  {row.englishMedium}
                </td>
                <td className="px-4 py-3.5 text-[12.5px] text-[#5A6A82] leading-[1.5]">
                  {row.tutor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Regular Grade 11 timetables                                       */
/* --------------------------------------------------------------- */

function RegularTimetables() {
  return (
    <Section eyebrow="Regular Grade 11 Timetables">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Regular Grade 11 - <em>weekly schedule.</em>
      </h2>
      <p className="text-center text-[12.5px] text-[#5A6A82] mt-3">
        Add the Project Class for the full 9A push (Rs. 2,000 / month / subject).
      </p>

      <h3 className="font-display font-700 text-[18px] text-[#102033] mt-10 text-center">
        Tamil Medium
      </h3>
      <RegularTimetableTable rows={REGULAR_TM_TIMETABLE} />

      <h3 className="font-display font-700 text-[18px] text-[#102033] mt-10 text-center">
        English Medium
      </h3>
      <RegularTimetableTable rows={REGULAR_EM_TIMETABLE} />
    </Section>
  );
}

function RegularTimetableTable({
  rows,
}: {
  rows: typeof REGULAR_TM_TIMETABLE;
}) {
  return (
    <div className="mt-5 max-w-5xl mx-auto overflow-x-auto rounded-[24px] glass">
      <table className="w-full text-left text-[13px] sm:text-[14px] min-w-[640px]">
        <thead className="bg-[#F4F8FF] text-[#102033]">
          <tr className="border-b border-[rgba(16,32,51,0.08)]">
            <th className="px-4 py-3 font-display font-700">Class Code</th>
            <th className="px-4 py-3 font-display font-700">Subject</th>
            <th className="px-4 py-3 font-display font-700">Monthly Fee</th>
            <th className="px-4 py-3 font-display font-700">Teacher</th>
            <th className="px-4 py-3 font-display font-700">Days & Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.code}
              className="border-b border-[rgba(16,32,51,0.06)] last:border-0 hover:bg-[#F8FBFF] transition"
            >
              <td className="px-4 py-3.5 font-mono text-[12px] text-[#5A6A82]">
                {row.code}
              </td>
              <td className="px-4 py-3.5 font-display font-700 text-[#2563EB]">
                {row.subject}
              </td>
              <td className="px-4 py-3.5 text-[#2B3950] font-display font-600">
                Rs. 1,200
              </td>
              <td className="px-4 py-3.5 text-[#2B3950]">{row.teacher}</td>
              <td className="px-4 py-3.5 text-[#2B3950]">{row.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Fee summary                                                       */
/* --------------------------------------------------------------- */

function FeeSummary() {
  return (
    <Section eyebrow="Fee Summary" id="fees">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Pick the plan that <em>fits your goal.</em>
      </h2>
      <div className="mt-10 max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {[
          {
            title: "Regular Class Only",
            fee: "Rs. 1,200",
            unit: "/ month / subject",
            tint: "#2563EB",
            tag: "Standard",
          },
          {
            title: "Project Class Only",
            fee: "Rs. 1,500",
            unit: "/ month / subject",
            tint: "#6E5BC8",
            tag: "Recovery focus",
          },
          {
            title: "Full Package (Both)",
            fee: "Rs. 2,000",
            unit: "/ month / subject",
            tint: "#EC4899",
            tag: "Most Recommended",
            primary: true,
          },
        ].map((row) => (
          <div
            key={row.title}
            className={[
              "glass rounded-[20px] p-5 lift relative overflow-hidden h-full",
              row.primary ? "border-2 border-[#EC4899]/30" : "",
            ].join(" ")}
          >
            <span
              aria-hidden
              className="blob"
              style={{ top: -40, right: -40, width: 140, height: 140, background: row.tint, opacity: 0.25 }}
            />
            <div className="relative flex flex-col h-full">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#5A6A82] font-display font-700">
                {row.tag}
              </p>
              <h3 className="font-display font-700 text-[16px] text-[#102033] mt-2 leading-snug">
                {row.title}
              </h3>
              <div className="mt-auto pt-3">
                <p className="font-display font-700 text-[28px] text-[#102033]">
                  {row.fee}
                </p>
                <p className="text-[12px] text-[#5A6A82] mt-1">{row.unit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[12.5px] text-[#5A6A82] inline-flex items-center justify-center gap-1.5 w-full">
        <FeatureIcon name="checkmark" tint="#5A6A82" size={14} />
        <span>
          One-time admission fee:{" "}
          <strong className="text-[#102033]">Rs. 1,000 per student</strong>{" "}
          (non-refundable).
        </span>
      </p>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Who should join                                                   */
/* --------------------------------------------------------------- */

function WhoShouldJoin() {
  const personas = [
    "Grade 11 students preparing for G.C.E O/L 2026",
    "Students who missed Grade 10 lessons",
    "Students weak in basics or formulas",
    "Students aiming to lift marks from low to 5A / 7A / 9A",
    "Parents looking for a structured, responsible, result-focused online institute",
    "Students who need revision, past paper practice, and personal guidance",
  ];
  return (
    <Section eyebrow="Who Should Join">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Built for <em>students who mean it.</em>
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {personas.map((p) => (
          <div
            key={p}
            className="glass rounded-2xl p-4 flex items-start gap-3 lift"
          >
            <span aria-hidden className="text-[#22C55E] text-[18px] shrink-0">
              ✓
            </span>
            <p className="text-[14px] text-[#2B3950] leading-[1.55]">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* RelatedLinks - internal link equity flow + AEO context.          */
/* Tells search engines AND AI engines what other EDUS pages are    */
/* contextually related to the 9A Project page, helping the whole   */
/* /sl cluster rank as a coherent topic.                             */
/* --------------------------------------------------------------- */

function RelatedLinks() {
  const links = [
    {
      href: "/sl",
      title: "Sri Lanka Online Tuition",
      desc: "Full EDUS Sri Lanka programme - Grade 1 to A/L, all subjects, group + individual.",
    },
    {
      href: "/sl/ol-grading-scale",
      title: "O/L Grading Scale and 9A Explained",
      desc: "Free reference: every O/L grade with marks, the 6 + 3 subject structure, and what 9A really means.",
    },
    {
      href: "/sl/timetable",
      title: "2026 Group Class Timetable",
      desc: "Browse the full 2026 group class schedule for every grade and subject.",
    },
  ];
  return (
    <Section eyebrow="Related on EDUS">
      <h2
        className="heading text-center max-w-3xl mx-auto"
        style={{ fontSize: "var(--fs-display)" }}
      >
        Explore <em>more EDUS resources.</em>
      </h2>
      <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto items-stretch">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="glass rounded-2xl p-5 lift h-full flex flex-col group"
          >
            <p className="font-display font-700 text-[15px] text-[#102033] leading-snug group-hover:text-[#2563EB] transition-colors">
              {l.title}
            </p>
            <p className="text-[13px] text-[#2B3950] mt-2 leading-[1.6]">
              {l.desc}
            </p>
            <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[12.5px] text-[#2563EB] font-display font-700">
              Open
              <FeatureIcon name="map" tint="#2563EB" size={12} />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* FAQ                                                               */
/* --------------------------------------------------------------- */

function FAQ() {
  return (
    <Section eyebrow="Frequently Asked Questions" id="faq">
      <h2 className="heading text-center max-w-3xl mx-auto" style={{ fontSize: "var(--fs-display)" }}>
        Common questions, <em>clear answers.</em>
      </h2>
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {FAQ_ENTRIES.map((f) => (
          <details
            key={f.q}
            className="glass rounded-2xl p-5 group cursor-pointer"
          >
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
            <p className="mt-3 text-[13.5px] text-[#2B3950] leading-[1.7]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- */
/* Final CTA banner                                                  */
/* --------------------------------------------------------------- */

function FinalCTA() {
  // Mirrors the canonical site CTA pattern (components/shared/CTA.tsx):
  // glass-strong card with brand-coloured corner blobs, eyebrow with
  // dot, heading + body + btn-primary / btn-yellow / btn-cyan buttons.
  // No bespoke dark-navy panels here - the rest of the site never uses
  // them and they'd break uniformity at section transitions.
  return (
    <section className="container-edge mt-16 mb-16">
      <div className="relative rounded-[36px] glass-strong p-7 sm:p-14 overflow-hidden text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span
            className="blob"
            style={{ top: "-8%", left: "-4%", width: 240, height: 240, background: "#2563EB", opacity: 0.18 }}
          />
          <span
            className="blob"
            style={{ top: "-8%", right: "-4%", width: 240, height: 240, background: "#8B5CF6", opacity: 0.18 }}
          />
          <span
            className="blob"
            style={{ bottom: "-12%", left: "35%", width: 240, height: 240, background: "#06B6D4", opacity: 0.16 }}
          />
          <span
            className="blob"
            style={{ bottom: "-12%", right: "20%", width: 200, height: 200, background: "#FACC15", opacity: 0.18 }}
          />
        </div>

        <p className="eyebrow">
          <span className="dot" />
          Ready to Enrol
        </p>
        <h2
          className="heading mt-5"
          style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15 }}
        >
          Your child&apos;s O/L 2026{" "}
          <em>9A plan</em> starts here.
        </h2>

        {/* Special EDUS promise repeated for the closer. */}
        <div className="mt-7 max-w-2xl mx-auto rounded-2xl bg-white/70 border border-[rgba(34,197,94,0.25)] p-5 flex items-start gap-3 text-left">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            <FeatureIcon name="shield" tint="#16A34A" size={18} />
          </div>
          <div>
            <p className="font-display font-700 text-[14.5px] text-[#102033] leading-snug">
              Special EDUS Promise
            </p>
            <p className="text-[13.5px] text-[#2B3950] mt-1 leading-[1.65]">
              If a student fully follows our 6-month learning system and still
              receives an <strong>F result</strong>, EDUS will refund the full
              tuition fees paid for that eligible subject.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Start Enrolment
          </a>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-yellow">
            Call {PHONE_DISPLAY}
          </a>
          <a
            href={BANK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cyan"
          >
            Pay by Bank / Online
          </a>
        </div>

        <p className="text-[11.5px] text-[#5A6A82] mt-7">
          Terms and conditions apply. EDUS - the trusted choice for serious
          Sri Lankan students.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Layout helpers                                                    */
/* --------------------------------------------------------------- */

function Section({
  eyebrow,
  children,
  id,
}: {
  eyebrow: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="container-edge mt-16 sm:mt-20">
      <p className="eyebrow text-center">
        <span className="dot" />
        {eyebrow}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
