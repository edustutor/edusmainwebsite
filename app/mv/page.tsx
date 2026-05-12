import { MarketLanding, type MarketConfig } from "@/components/MarketLanding";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Maldives - Online Tuition for School Students · EDUS",
  description:
    "Live online tuition for Maldivian school students. English-medium classes, Cambridge & Edexcel international syllabuses, expert tutors, and parent updates.",
};

const cfg: MarketConfig = {
  code: "GL", // Maldives is served via the global one-to-one infrastructure
  flag: "🇲🇻",
  region: "Maldives",
  url: "edustutor.com/mv",
  ctaText: "Talk to US",
  hero: {
    eyebrow: "Maldives · English Medium · Cambridge & Edexcel",
    title: "Premium online tuition,",
    titleEm: "delivered to every island.",
    sub: "Live online classes for Maldivian school students. Cambridge IGCSE, Edexcel, and core academic subjects taught by qualified tutors - with parent updates and recordings included.",
  },
  pillars: [
    {
      tag: "LIVE",
      title: "Live English-medium classes",
      body: "Interactive online lessons aligned to Cambridge / Edexcel and core school subjects, with recordings and homework feedback.",
      href: "/mv/classes",
    },
    {
      tag: "MATCH",
      title: "Personal tutor matching",
      body: "Tutors matched to your child's syllabus, level, and timezone. Demo first, commit later.",
      href: "/mv/tutors",
    },
    {
      tag: "PARENT",
      title: "Parent updates",
      body: "Weekly attendance, progress, and tutor notes - straight to parents through the EDUS app.",
      href: "/mv/parents",
    },
  ],
  filters: [
    { label: "Grade / Year", options: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Year 11", "Year 12", "Year 13"] },
    { label: "Syllabus", options: ["Cambridge IGCSE", "Cambridge A-Level", "Edexcel"] },
    { label: "Subjects", options: ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "ICT"] },
    { label: "Class Type", options: ["One-to-One", "Small Group"] },
  ],
  facts: [
    { k: "Live", v: "Online classes" },
    { k: "Cambridge", v: "+ Edexcel support" },
    { k: "1:1", v: "Tutor matching" },
    { k: "Parent", v: "Weekly updates" },
  ],
};

export default function Page() {
  return (
    <>
      <MarketLanding cfg={cfg} />
      <CTA />
    </>
  );
}
