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
/* ContactPage — emitted from /contact for SERP relevance            */
/* --------------------------------------------------------------- */
export function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EDUS Online Tuition",
    url: `${SITE_URL}/contact`,
    description:
      "Contact EDUS for online classes, admissions, one-to-one tutoring, group classes, student support, and global learning inquiries. Reach EDUS Sri Lanka, India, Maldives, or Global Support.",
    isPartOf: {
      "@type": "WebSite",
      name: "EDUS Online Tuition",
      url: SITE_URL,
    },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: `${SITE_URL}/edus-logo-blue.webp`,
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/* --------------------------------------------------------------- */
/* Course — adds Google's "Course" rich result eligibility alongside */
/* the existing EducationalOccupationalProgram per market page.      */
/* --------------------------------------------------------------- */
export type CourseOptions = {
  name: string;
  description: string;
  url: string;
  area: string;
};

export function tuitionCourse(opts: CourseOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "EducationalOrganization",
      name: "EDUS Online Tuition",
      url: SITE_URL,
      sameAs: SITE_URL,
    },
    educationalCredentialAwarded: "Continued academic progress and exam preparation",
    inLanguage: ["en", "ta", "si"],
    availableLanguage: ["English", "Tamil", "Sinhala"],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: opts.area,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT2H",
      inLanguage: ["en", "ta", "si"],
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: {
        "@type": "VirtualLocation",
        url: SITE_URL,
      },
    },
    offers: {
      "@type": "Offer",
      category: "Online tuition",
      availability: "https://schema.org/InStock",
      url: "https://signup.edustutor.com/",
    },
  };
}

/* --------------------------------------------------------------- */
/* WebPage with speakable — voice-assistant friendly for legal /    */
/* policy pages. Tells Google Assistant which sections to read aloud. */
/* --------------------------------------------------------------- */
export type SpeakablePageOptions = {
  name: string;
  description: string;
  path: string; // e.g. "/privacy"
};

export function speakableWebPage(opts: SpeakablePageOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "h3", "p"],
    },
  };
}

/* --------------------------------------------------------------- */
/* Organization reference — lightweight @id pointer for every page  */
/* so non-homepage routes still carry the brand entity in their      */
/* JSON-LD graph.                                                    */
/* --------------------------------------------------------------- */
export function organizationReference() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "EDUS Online Tuition",
    url: SITE_URL,
    logo: `${SITE_URL}/edus-logo-blue.webp`,
    sameAs: [
      "https://www.facebook.com/edusonline",
      "https://www.instagram.com/edus_online/",
      "https://www.tiktok.com/@edusonline",
      "https://www.youtube.com/@edusonline/",
      "https://lk.linkedin.com/company/edusonline",
      "https://share.google/ZQO6DJ0yRrFXtOw1x",
      "https://maps.app.goo.gl/ZQO6DJ0yRrFXtOw1x",
    ],
  };
}

/* --------------------------------------------------------------- */
/* ItemList of success stories — homepage social-proof block. Names */
/* are intentionally anonymised (no Person/Review schema) to comply  */
/* with Google's 2024 review-author identity guidance.               */
/* --------------------------------------------------------------- */
export type StoryEntry = { country: string; label: string; quote: string };

export function successStoriesItemList(stories: StoryEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EDUS Student & Parent Success Stories",
    description:
      "Anonymised testimonials from EDUS students and parents across Sri Lanka, India, Maldives, and global markets.",
    numberOfItems: stories.length,
    itemListElement: stories.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: `${s.country} — ${s.label}`,
        text: s.quote,
        inLanguage: "en",
        about: { "@id": `${SITE_URL}/#organization` },
      },
    })),
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
