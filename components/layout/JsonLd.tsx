/**
 * JSON-LD schema markup for EDUS homepage.
 *
 * Emits three schema blocks:
 *   - EducationalOrganization (Knowledge Panel signal — entity, logo, address,
 *     contact point, area served, offer catalog)
 *   - WebSite (brand site identity)
 *   - FAQPage (homepage Q&A)
 *
 * Per-page schemas (BreadcrumbList, FAQPage, EducationalOccupationalProgram,
 * JobPosting) live in `StructuredData.tsx` and are emitted from each route.
 */

import { JsonLdScript } from "./StructuredData";

const SITE_URL = "https://edustutor.com";

const ORG = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "EDUS",
  alternateName: ["EDUS Online Tuition", "EDUS Tutor", "edustutor"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/edus-logo-blue.webp`,
    width: 180,
    height: 56,
  },
  image: `${SITE_URL}/edus-logo-blue.webp`,
  slogan: "Quality-Assured Online Live Learning Platform",
  description:
    "EDUS is the quality-assured online live learning platform. Live tuition, group and one to one classes, expert tutors, progress tracking, class recordings, exams, parent updates, and learning resources for school students.",
  // Add your social profile URLs here when public:
  sameAs: [
    // "https://www.facebook.com/edustutor",
    // "https://www.instagram.com/edustutor",
    // "https://www.linkedin.com/company/edus-online-tuition",
    // "https://www.youtube.com/@edustutor",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 95, K.K.S Road",
    addressLocality: "Jaffna",
    addressCountry: "LK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+94-70-707-2072",
      contactType: "customer support",
      areaServed: ["LK", "IN", "MV", "Worldwide"],
      availableLanguage: ["English", "Tamil", "Sinhala"],
      email: "hello@edustutor.com",
    },
  ],
  foundingDate: "2020",
  areaServed: [
    { "@type": "Country", name: "Sri Lanka" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Maldives" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsLanguage: ["English", "Tamil", "Sinhala"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EDUS Learning Paths",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Sri Lanka Classes",
        url: `${SITE_URL}/sl`,
        description:
          "Live online group classes and one to one tuition for Sri Lankan school students from Grade 1 to G.C.E A/L.",
      },
      {
        "@type": "Offer",
        name: "India CBSE Classes 6 to 10",
        url: `${SITE_URL}/in`,
        description:
          "Premium structured online CBSE tuition for English-medium students across Tamil Nadu and India for CBSE Classes 6 to 10. Three core subjects: Mathematics, Science, English.",
      },
      {
        "@type": "Offer",
        name: "Maldives Classes",
        url: `${SITE_URL}/mv`,
        description:
          "Live English-medium online tuition for Maldivian school students. Cambridge IGCSE, O-Level, and core academic subjects taught by qualified tutors.",
      },
      {
        "@type": "Offer",
        name: "Global One to One Classes",
        url: `${SITE_URL}/global`,
        description:
          "Flexible one to one online tuition for international students with personal tutor matching and syllabus based support.",
      },
    ],
  },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "EDUS",
  alternateName: "EDUS Online Tuition",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

const FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EDUS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EDUS is an online education platform that provides live online tuition, group classes, one to one learning, academic monitoring, learning resources, and parent updates for school students.",
      },
    },
    {
      "@type": "Question",
      name: "Who can join EDUS classes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students can join based on their region, grade, syllabus, subject, and learning need. EDUS currently supports Sri Lanka classes, India CBSE Classes 6 to 10, Maldives classes, and global one to one learning pathways.",
      },
    },
    {
      "@type": "Question",
      name: "Are classes conducted live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EDUS classes are conducted live online with trained tutors. Students can interact, ask questions, and follow a structured lesson plan.",
      },
    },
    {
      "@type": "Question",
      name: "Can parents track student progress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EDUS supports parent communication through attendance updates, progress reviews, exam feedback, and academic monitoring.",
      },
    },
    {
      "@type": "Question",
      name: "Are recordings available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Class recordings and learning resources may be provided depending on the class type and learning plan.",
      },
    },
    {
      "@type": "Question",
      name: "Does EDUS offer one to one tuition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EDUS offers one to one online tuition for students who need personalised support, flexible timing, and subject specific attention.",
      },
    },
    {
      "@type": "Question",
      name: "What subjects are available for India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The India launch focuses on English-medium CBSE Classes 6 to 10 across Tamil Nadu, with three core subjects: Mathematics, Science, and English. Classes 6 to 8 form the Middle Stage and Classes 9 to 10 form the Secondary Stage.",
      },
    },
    {
      "@type": "Question",
      name: "How do I enrol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Head to https://signup.edustutor.com/ to begin enrolment. Choose your region, grade, and subject, and the EDUS team will follow up to confirm your tutor and class plan.",
      },
    },
  ],
};

export function HomeJsonLd() {
  return (
    <>
      <JsonLdScript data={ORG} />
      <JsonLdScript data={WEBSITE} />
      <JsonLdScript data={FAQ} />
    </>
  );
}
