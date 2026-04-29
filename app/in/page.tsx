import { MarketLanding, MarketConfig } from "@/components/MarketLanding";
import { CTA } from "@/components/CTA";

const cfg: MarketConfig = {
  code: "IN",
  flag: "🇮🇳",
  region: "India",
  url: "edustutor.com/in",
  ctaText: "Request consultation",
  hero: {
    eyebrow: "India · Launch · Grades 6–10 · CBSE / NCERT-aligned",
    title: "English-medium tuition,",
    titleEm: "built for Grades 6 to 10.",
    sub: "A focused launch product. Live online classes aligned to NCERT/CBSE for middle and secondary students. Parent-tracked, exam-ready.",
  },
  pillars: [
    { tag: "LIVE", title: "Live English-medium", body: "Interactive online lessons aligned to NCERT/CBSE syllabus, with recordings and homework feedback.", href: "/in/grades" },
    { tag: "PARENT", title: "Parent dashboards", body: "Continuous attendance, progress, and tutor-note visibility through the EDUS parent app.", href: "/in/parents" },
    { tag: "MATCH", title: "Subject specialist tutors", body: "Vetted tutors matched by subject expertise and student progress — not by location.", href: "/in/tutors" },
  ],
  filters: [
    { label: "Grade", options: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"] },
    { label: "Board", options: ["CBSE", "NCERT-aligned"] },
    { label: "Subjects", options: ["Mathematics", "Science", "English", "Social Science", "Hindi"] },
    { label: "Medium", options: ["English"] },
  ],
  facts: [
    { k: "Grades 6–10", v: "Launch scope" },
    { k: "CBSE", v: "Aligned to NCERT" },
    { k: "Live + recorded", v: "Every class" },
    { k: "Parent updates", v: "Each week" },
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
