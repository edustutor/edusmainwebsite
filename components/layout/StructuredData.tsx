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
/* BreadcrumbList - used on every non-home route                    */
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
/* FAQPage - used on every page with a FAQ section                  */
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
/* EducationalOccupationalProgram - used per market page            */
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
/* SiteNavigationElement - signals to Google which pages should     */
/* appear as sitelinks under the homepage result (like PrimeGlobal). */
/* --------------------------------------------------------------- */
export function siteNavigation() {
  const items = [
    { name: "Sri Lanka Classes",       path: "/sl" },
    { name: "India CBSE Classes 6-10", path: "/in" },
    { name: "Maldives Cambridge IGCSE", path: "/mv" },
    { name: "Global One-to-One Tuition", path: "/global" },
    { name: "Teach with EDUS",         path: "/teach" },
    { name: "About EDUS",              path: "/about" },
    { name: "EDUS Blog",               path: "/blog" },
    { name: "EDUS Press Kit",          path: "/press" },
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
/* ItemList of primary pages - secondary sitelinks signal           */
/* --------------------------------------------------------------- */
export function primaryPagesItemList() {
  const items = [
    { name: "Sri Lanka Online Tuition",  path: "/sl",      desc: "Live online classes for Grade 1 to A/L - National, Cambridge & Edexcel - Sinhala, Tamil, English medium" },
    { name: "India CBSE Online Tuition", path: "/in",      desc: "CBSE Classes 6 to 10 for Tamil Nadu students - Maths, Science, English - monthly parent reports" },
    { name: "Maldives Cambridge IGCSE",  path: "/mv",      desc: "Premium 1-to-1 Cambridge IGCSE and O-Level for Grade 9 and 10 Maldives students" },
    { name: "Global One-to-One Tuition", path: "/global",  desc: "Personalised online tutoring for international students - Cambridge, Edexcel, IGCSE, GCSE, IB" },
    { name: "Teach with EDUS",           path: "/teach",   desc: "Apply to become an EDUS tutor and teach students across Sri Lanka, India, Maldives, and globally" },
    { name: "About EDUS",                path: "/about",   desc: "EDUS Lanka (Pvt) Ltd - Founded 2020 - 7,000+ students - Backed by Microsoft for Startups, ICTA, SLASSCOM" },
    { name: "EDUS Blog",                 path: "/blog",    desc: "Exam preparation guides, study tips, and parent advice from the EDUS Academic Team" },
    { name: "EDUS Press Kit",            path: "/press",   desc: "Brand assets, logos, fact sheet, and media contact for journalists and partners" },
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
/* Service - broader rich-result coverage alongside Program          */
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
/* ContactPage - emitted from /contact for SERP relevance            */
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
/* Course - adds Google's "Course" rich result eligibility alongside */
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
    isAccessibleForFree: false,
  };
}

/* --------------------------------------------------------------- */
/* CollectionPage - emitted from /teach. Surfaces the subjects EDUS  */
/* tutors can apply to teach. Eligible for SERP "Subject chips" under */
/* the teach result in Google search.                                 */
/*                                                                    */
/* Subject list is the union of:                                      */
/*   - components/teach/TeachSubjects.tsx (recruitment scope)          */
/*   - public/llms-full.txt §Markets served + §Global syllabuses      */
/* All entries are real, deduplicated, alphabetised within sections.  */
/* --------------------------------------------------------------- */
export function teachCollectionPage() {
  const subjects = [
    // ============ Sri Lanka - National Syllabus ============
    // Primary (Grades 1-5)
    "Mathematics (Sri Lanka)",
    "English (Sri Lanka)",
    "Environmental Studies",
    "Tamil",
    "Sinhala",
    "IQ",
    "Spoken English",
    "Elocution",
    // Grades 6 to 11 / O/L
    "Science",
    "History",
    "ICT",
    "Commerce",
    "Business Studies",
    "Accounting",
    // G.C.E A/L
    "Combined Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "English Literature",
    "Economics",
    "Further Mathematics",
    "Exam Revision",

    // ============ India - CBSE Classes 6 to 10 ============
    "CBSE Mathematics (Classes 6-10)",
    "CBSE Science (Classes 6-10)",
    "CBSE English (Classes 6-10)",
    "CBSE Social Science",
    "Hindi",
    // Future expansion noted in TeachSubjects.tsx
    "CBSE (other classes, future expansion)",
    "ICSE (future expansion)",
    "State Board (future expansion)",

    // ============ Maldives - Cambridge IGCSE / O-Level (Grade 9 & 10) ============
    "Cambridge IGCSE Mathematics (0580)",
    "Cambridge IGCSE English as a Second Language (0510)",
    "Cambridge IGCSE Biology (0610)",
    "Cambridge IGCSE Chemistry (0620)",
    "Cambridge IGCSE Physics (0625)",

    // ============ Global - One-to-One, all syllabuses ============
    "Cambridge Primary",
    "Cambridge Lower Secondary",
    "Cambridge IGCSE",
    "Cambridge O-Level",
    "Cambridge AS Level",
    "Cambridge A-Level",
    "Edexcel IGCSE",
    "Edexcel International GCSE",
    "Edexcel GCSE",
    "Edexcel AS Level",
    "Edexcel A-Level",
    "Pearson Edexcel International Curriculum",
    "International Baccalaureate (IB) Diploma Programme",
    "Advanced Placement (AP)",
    "National curricula (any country, based on student requirement)",

    // ============ Computer Science / ICT (across syllabuses) ============
    "Computer Science",

    // ============ Languages (cross-market) ============
    "English Language",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/teach#subjects`,
    name: "Subjects EDUS Tutors Teach",
    headline: "Apply to teach with EDUS - full subject catalog across SL, IN, MV & Global",
    description:
      "Full catalog of subjects EDUS tutors are invited to teach: Sri Lankan National Syllabus (Primary, O/L, A/L), CBSE Classes 6-10 (India), Cambridge IGCSE / O-Level / AS / A-Level (Maldives & Global), Edexcel IGCSE / International GCSE / GCSE / AS / A-Level, International Baccalaureate (IB), Advanced Placement (AP), and other national curricula.",
    url: `${SITE_URL}/teach`,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: "Subjects available to teach",
      numberOfItems: subjects.length,
      itemListElement: subjects.map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
      })),
    },
  };
}

export function merchantReturnPolicy() {
  return {
    "@context": "https://schema.org",
    "@type": "MerchantReturnPolicy",
    "@id": `${SITE_URL}/refunds#policy`,
    name: "EDUS Refund Policy",
    description:
      "Refunds may be requested within 14 days of enrolment if no course materials or classes have been accessed. Approved refunds are processed within 7 business days to the original payment method.",
    url: `${SITE_URL}/refunds`,
    inLanguage: "en",
    applicableCountry: ["LK", "IN", "MV"],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    refundType: "https://schema.org/FullRefund",
    returnFees: "https://schema.org/FreeReturn",
    returnMethod: "https://schema.org/ReturnByMail",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* --------------------------------------------------------------- */
/* WebPage with speakable - voice-assistant friendly for legal /    */
/* policy pages. Tells Google Assistant which sections to read aloud. */
/* --------------------------------------------------------------- */
export type SpeakablePageOptions = {
  name: string;
  description: string;
  path: string; // e.g. "/privacy"
  headline?: string; // optional H1 mirror for richer SERP signals
  lastUpdated?: string; // ISO date string (YYYY-MM-DD)
};

export function speakableWebPage(opts: SpeakablePageOptions) {
  // Default to today if no lastUpdated supplied - keeps Google's freshness
  // signal current. Pages can override with their actual revision date.
  const dateModified = opts.lastUpdated ?? new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    headline: opts.headline ?? opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    dateModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "h3", "p"],
    },
  };
}

/* --------------------------------------------------------------- */
/* Organization reference - lightweight @id pointer for every page  */
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
/* ItemList of success stories - homepage social-proof block. Names */
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
        name: `${s.country} - ${s.label}`,
        text: s.quote,
        inLanguage: "en",
        about: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

/* --------------------------------------------------------------- */
/* JobPosting - used on the /teach page                              */
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

/* --------------------------------------------------------------- */
/* HowTo - how to enrol with EDUS. Eligible for Google's HowTo      */
/* rich result with step preview cards under the homepage result.    */
/* --------------------------------------------------------------- */
export function enrollmentHowTo() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to enrol with EDUS Online Tuition",
    description:
      "Step-by-step guide to enrol your child in EDUS live online classes across Sri Lanka, India, Maldives, or global one-to-one tutoring.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "LKR", value: "0" },
    supply: [
      { "@type": "HowToSupply", name: "Student's grade and syllabus" },
      { "@type": "HowToSupply", name: "Preferred subject and class type" },
      { "@type": "HowToSupply", name: "Parent contact details" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Any internet-connected device" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose your learning path",
        text: "Pick the EDUS path that matches your country and syllabus: Sri Lanka National Syllabus / Cambridge / Edexcel, India CBSE, Maldives Cambridge IGCSE, or Global one-to-one.",
        url: `${SITE_URL}/#regions`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Open the EDUS sign-up form",
        text: "Visit https://signup.edustutor.com/ and create your account with the parent or student email.",
        url: "https://signup.edustutor.com/",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Enter student details",
        text: "Share grade, syllabus, subjects, preferred medium (English / Tamil / Sinhala), and contact details.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Get matched and scheduled",
        text: "The EDUS academic team reviews your details, suggests a class or tutor, and confirms the schedule within one business day.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Start learning live online",
        text: "Join live classes from any device. Access recordings, practice tasks, exam prep, and weekly parent updates.",
      },
    ],
  };
}

/* --------------------------------------------------------------- */
/* BlogPosting - emitted per /blog/[slug] route. Eligible for the    */
/* Google "article" rich result and AI engine ingestion.             */
/* --------------------------------------------------------------- */
export type BlogPostSchemaOptions = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; role?: string };
  image?: string; // relative path under /public, e.g. "/blog/foo.jpg"
};

export function blogPosting(opts: BlogPostSchemaOptions) {
  const url = `${SITE_URL}/blog/${opts.slug}`;
  const imageUrl = opts.image
    ? `${SITE_URL}${opts.image}`
    : `${SITE_URL}/edus-og.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: imageUrl,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.author.name,
      ...(opts.author.role ? { jobTitle: opts.author.role } : {}),
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

/* --------------------------------------------------------------- */
/* Blog ItemList - for /blog index. Lists all posts as ListItem so   */
/* Google sees the blog as a structured archive, not random pages.   */
/* --------------------------------------------------------------- */
export type BlogIndexEntry = { slug: string; title: string; description: string };

export function blogItemList(posts: BlogIndexEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "EDUS Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Learning guides, exam preparation tips, and parent advice from the EDUS Academic Team covering Sri Lanka, India, Maldives, and global online tutoring.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };
}

/* --------------------------------------------------------------- */
/* WebApplication - the signup portal as a discoverable app entity.  */
/* Surfaces "EDUS App" in Google's App Pack when search intent       */
/* matches "edus app" / "edus signup" / "edus login".                */
/* --------------------------------------------------------------- */
export function signupWebApplication() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EDUS Sign-up Portal",
    description:
      "Online enrolment and account portal for EDUS students. Choose your region, syllabus, subject, and class type. Parent and student accounts supported.",
    url: "https://signup.edustutor.com/",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any (web)",
    browserRequirements: "Requires JavaScript. Modern browser recommended.",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    inLanguage: ["en"],
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
  };
}

/* --------------------------------------------------------------- */
/* InteractionCounter - surfaces the 7,000+ students stat as          */
/* parseable data alongside the visible homepage stat card.          */
/* --------------------------------------------------------------- */
export function studentInteractionCounter() {
  return {
    "@context": "https://schema.org",
    "@type": "InteractionCounter",
    interactionType: "https://schema.org/EnrollAction",
    userInteractionCount: 7000,
    name: "EDUS students enrolled",
    description:
      "Total cumulative students enrolled with EDUS Online Tuition across Sri Lanka, India, Maldives, and global markets.",
  };
}

/* --------------------------------------------------------------- */
/* VideoObject - featured videos from the EDUS Online Institute      */
/* YouTube channel (@edusonline). Titles + thumbnails are pulled    */
/* from YouTube's public oEmbed endpoint, so every field below is    */
/* verifiable against https://www.youtube.com/oembed?url=...         */
/*                                                                    */
/* Eligible for Google's "Videos" carousel and standalone video       */
/* rich result with thumbnail in SERP.                                */
/* --------------------------------------------------------------- */
export type EdusVideo = {
  id: string; // YouTube video ID
  title: string;
  description: string;
  uploadDate: string; // ISO YYYY-MM-DD - best-effort if known
};

const YT_CHANNEL_URL = "https://www.youtube.com/@edusonline";

export function videoObject(v: EdusVideo) {
  const watchUrl = `https://www.youtube.com/watch?v=${v.id}`;
  const embedUrl = `https://www.youtube.com/embed/${v.id}`;
  // hqdefault is what oEmbed returns and is guaranteed to exist for every
  // YouTube video. maxresdefault is higher quality but not always present.
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${watchUrl}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [thumb, `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`],
    uploadDate: v.uploadDate,
    contentUrl: watchUrl,
    embedUrl,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en", "ta", "si"],
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "WatchAction",
      target: watchUrl,
    },
  };
}

/* --------------------------------------------------------------- */
/* ItemList of all EDUS featured videos - gives Google a single      */
/* parseable carousel of the channel's hero content.                  */
/* --------------------------------------------------------------- */
export function edusVideoCarousel(videos: EdusVideo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EDUS Online Institute - Featured Videos",
    description:
      "Featured videos from the EDUS Online Institute YouTube channel covering study tips, exam preparation strategy, and Sri Lankan A/L paper guidance.",
    numberOfItems: videos.length,
    url: YT_CHANNEL_URL,
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      name: v.title,
    })),
  };
}
