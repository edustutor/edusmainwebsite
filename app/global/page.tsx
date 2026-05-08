import { MarketLanding, MarketConfig } from "@/components/MarketLanding";
import { CTA } from "@/components/CTA";

const cfg: MarketConfig = {
  code: "GL",
  flag: "🌐",
  region: "Global · One-to-One",
  url: "edustutor.com/global",
  ctaText: "Book a free demo",
  hero: {
    eyebrow: "Global · One-to-One · 30+ Countries",
    title: "Personal tutors,",
    titleEm: "matched to your syllabus and timezone.",
    sub: "One-to-one tuition for international students - Cambridge, Edexcel, IB, and more. A demo-first journey, with tutor-matching in 48 hours.",
  },
  pillars: [
    { tag: "MATCH", title: "Tutor matching", body: "Vetted tutors selected on syllabus, level, subject expertise, and your preferred timing window.", href: "/global/match" },
    { tag: "DEMO", title: "Demo before you commit", body: "Book a free demo class first. Decide if the tutor is right for your child before paying.", href: "/global/demo" },
    { tag: "FLEX", title: "Flexible timings", body: "Schedule across timezones with weekly or intensive packages. Reschedule when life happens.", href: "/global/timings" },
  ],
  filters: [
    { label: "Syllabus", options: ["Cambridge IGCSE", "Cambridge A-Level", "Edexcel", "IB Diploma", "ICSE", "AP", "National"] },
    { label: "Level", options: ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", "Year 13"] },
    { label: "Subjects", options: ["Maths", "Physics", "Chemistry", "Biology", "Economics", "Business", "English Lit", "Computer Science"] },
    { label: "Class Type", options: ["One-to-One", "Small Group (2–4)"] },
  ],
  facts: [
    { k: "30+", v: "Countries served" },
    { k: "48 hrs", v: "Tutor matching" },
    { k: "1:1", v: "Always individual" },
    { k: "97.6%", v: "Satisfaction" },
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
