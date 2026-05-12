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
/* SiteNavigationElement — signals to Google which pages should     */
/* appear as sitelinks under the homepage result (like PrimeGlobal). */
/* --------------------------------------------------------------- */
export function siteNavigation() {
  const items = [
    { name: "Sri Lanka Classes",       path: "/sl" },
    { name: "India CBSE Classes 6-10", path: "/in" },
    { name: "Maldives Cambridge IGCSE", path: "/mv" },
    { name: "Global One-to-One Tuition", path: "/global" },
    { name: "Teach with EDUS",         path: "/teach" },
    { name: "Contact EDUS",            path: "/contact" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": items.map((it) => ({
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}${it.path}`,
      name: it.name,
      url: `${SITE_URL}${it.path}`,
    })),
  };
}

/* --------------------------------------------------------------- */
/* ItemList of primary pages — secondary sitelinks signal           */
/* --------------------------------------------------------------- */
export function primaryPagesItemList() {
  const items = [
    { name: "Sri Lanka Online Tuition",  path: "/sl",      desc: "Live online classes for Grade 1 to A/L · National, Cambridge & Edexcel · Sinhala, Tamil, English medium" },
    { name: "India CBSE Online Tuition", path: "/in",      desc: "CBSE Classes 6 to 10 for Tamil Nadu students · Maths, Science, English · monthly parent reports" },
    { name: "Maldives Cambridge IGCSE",  path: "/mv",      desc: "Premium 1-to-1 Cambridge IGCSE and O-Level for Grade 9 and 10 Maldives students" },
    { name: "Global One-to-One Tuition", path: "/global",  desc: "Personalised online tutoring for international students · Cambridge, Edexcel, IGCSE, GCSE, IB" },
    { name: "Teach with EDUS",           path: "/teach",   desc: "Apply to become an EDUS tutor and teach students across Sri Lanka, India, Maldives, and globally" },
    { name: "Contact EDUS",              path: "/contact", desc: "Talk to the EDUS team to find the right class, subject, or tutor for your child" },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EDUS Learning Paths",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${it.path}`,
      name: it.name,
      description: it.desc,
    })),
  };
}

/* --------------------------------------------------------------- */
/* Service — broader rich-result coverage alongside Program          */
/* --------------------------------------------------------------- */
export function tuitionService({
  name, description, url, area,
}: {
  name: string;
  description: string;
  url: string;
  area: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: "Online Tuition",
    provider: {
      "@type": "EducationalOrganization",
      name: "EDUS Online Tuition",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: area },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
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
