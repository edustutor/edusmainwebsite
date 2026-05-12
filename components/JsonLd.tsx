/**
 * JSON-LD schema markup for EDUS homepage.
 * Includes Organization, WebSite, EducationalOrganization, and FAQPage.
 */

const ORG = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "EDUS",
  alternateName: "EDUS Tutor",
  url: "https://edustutor.com",
  logo: "https://edustutor.com/edus_logo_blue.webp",
  slogan: "Quality-Assured Online Live Learning Platform",
  description:
    "EDUS is the quality-assured online live learning platform. Live tuition, group and one to one classes, expert tutors, progress tracking, class recordings, exams, parent updates, and learning resources for school students.",
  sameAs: [],
  areaServed: ["Sri Lanka", "India", "Maldives", "Global"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EDUS Learning Paths",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Sri Lanka Classes",
        url: "https://edustutor.com/sl",
        description:
          "Live online group classes and one to one tuition for Sri Lankan school students from Grade 1 to G.C.E A/L.",
      },
      {
        "@type": "Offer",
        name: "India CBSE Classes 6 to 10",
        url: "https://edustutor.com/in",
        description:
          "Premium structured online CBSE tuition for English-medium students across Tamil Nadu and India for CBSE Classes 6 to 10. Three core subjects: Mathematics, Science, English. Middle Stage 6–8 and Secondary Stage 9–10.",
      },
      {
        "@type": "Offer",
        name: "Maldives Classes",
        url: "https://edustutor.com/mv",
        description:
          "Live English-medium online tuition for Maldivian school students. Cambridge IGCSE, Edexcel, and core academic subjects taught by qualified tutors.",
      },
      {
        "@type": "Offer",
        name: "Global One to One Classes",
        url: "https://edustutor.com/global",
        description:
          "Flexible one to one online tuition for international students with personal tutor matching and syllabus based support.",
      },
    ],
  },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EDUS",
  url: "https://edustutor.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://edustutor.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
        text: "The India launch focuses on English-medium CBSE Classes 6 to 10 across Tamil Nadu, with three core subjects: Mathematics, Science, and English. Classes 6–8 form the Middle Stage and Classes 9–10 form the Secondary Stage.",
      },
    },
    {
      "@type": "Question",
      name: "How do I enrol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose your region, select the class type, choose the grade and subject, submit parent details, and the EDUS team will guide you through the next step.",
      },
    },
  ],
};

export function HomeJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }}
      />
    </>
  );
}
