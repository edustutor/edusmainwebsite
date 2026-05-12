/**
 * Reusable JSON-LD primitives + page-specific schema builders.
 *
 * Every public route on EDUS gets one or more of these so Google can:
 *   - identify the organisation (Knowledge Panel)
 *   - mark up FAQs (rich result)
 *   - mark up breadcrumbs (rich result)
 *   - mark up programs / courses per market (rich result eligibility)
 *
 * Usage:
 *   import { JsonLdScript, breadcrumbList, faqPage, programOffer } from "@/components/layout/StructuredData";
 *   <JsonLdScript data={breadcrumbList([...])} />
 */

export const SITE_URL = "https://edustutor.com";

/* --------------------------------------------------------------- */
/* JSON-LD script wrapper                                            */
/* --------------------------------------------------------------- */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* --------------------------------------------------------------- */
/* BreadcrumbList — used on every non-home route                    */
/* --------------------------------------------------------------- */
export type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/* --------------------------------------------------------------- */
/* FAQPage — used on every page with a FAQ section                  */
/* --------------------------------------------------------------- */
export type FaqEntry = { q: string; a: string };

export function faqPage(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* --------------------------------------------------------------- */
/* EducationalOccupationalProgram — used per market page            */
/* Eligible for Google's "course" rich result preview.              */
/* --------------------------------------------------------------- */
export type ProgramOptions = {
  name: string;
  description: string;
  url: string; // absolute URL of the market page
  area: string; // e.g. "Sri Lanka", "Maldives"
  educationalLevel?: string; // e.g. "Grade 1 to A/L"
  occupationalCategory?: string;
};

export function educationalProgram(opts: ProgramOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "EducationalOrganization",
      name: "EDUS Online Tuition",
      url: SITE_URL,
    },
    educationalProgramMode: "online",
    ...(opts.educationalLevel ? { educationalLevel: opts.educationalLevel } : {}),
    ...(opts.occupationalCategory ? { occupationalCategory: opts.occupationalCategory } : {}),
    educationalCredentialAwarded: "Continued academic progress and exam preparation",
    availableLanguage: ["English", "Tamil", "Sinhala"],
    inLanguage: "en",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: opts.area,
    },
    isAccessibleForFree: false,
  };
}

/* --------------------------------------------------------------- */
/* JobPosting — used on the /teach page                              */
/* --------------------------------------------------------------- */
export function tutorJobPosting() {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Online Tutor - Cambridge, Edexcel, CBSE & National Syllabus",
    description:
      "Join EDUS as an online tutor. Teach students across Sri Lanka, India, Maldives, and global learners. Cambridge, Edexcel, IGCSE, O-Level, A-Level, CBSE, and National Syllabus subjects.",
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: ["PART_TIME", "CONTRACTOR"],
    hiringOrganization: {
      "@type": "Organization",
      name: "EDUS Online Tuition",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/edus-logo-blue.webp`,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: [
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Maldives" },
    ],
    directApply: false,
    url: `${SITE_URL}/teach`,
  };
}
