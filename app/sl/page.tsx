import { MarketLanding, MarketConfig } from "@/components/MarketLanding";
import { CTA } from "@/components/CTA";

const cfg: MarketConfig = {
  code: "SL",
  flag: "🇱🇰",
  region: "Sri Lanka",
  url: "edustutor.com/sl",
  ctaText: "Enrol now",
  hero: {
    eyebrow: "Sri Lanka · National Syllabus",
    title: "National-syllabus group",
    titleEm: "tuition that scales with your child.",
    sub: "Live online classes for Grade 1 to A/L, in Sinhala, Tamil, and English medium — plus one-to-one for personalised support.",
  },
  pillars: [
    { tag: "GROUP", title: "Group Classes", body: "Structured weekly classes by grade and subject, with recordings, exams, and revision timelines.", href: "/sl/group" },
    { tag: "1:1", title: "Individual Classes", body: "One-to-one tutor matching for focused support — across all grades, mediums, and subjects.", href: "/sl/individual" },
    { tag: "VAULT", title: "Resource Vault", body: "Past papers and filtered notes by provider, medium, subject, and grade — owned by EDUS.", href: "/resources" },
  ],
  filters: [
    { label: "Grade", options: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "G.C.E. O/L", "Grade 12", "G.C.E. A/L"] },
    { label: "Medium", options: ["Sinhala", "Tamil", "English"] },
    { label: "Class Type", options: ["Group", "Individual"] },
    { label: "Subjects", options: ["Maths", "Science", "ICT", "English", "Combined Maths", "Physics", "Chemistry", "Biology"] },
  ],
  facts: [
    { k: "5,200+", v: "Sri Lankan learners" },
    { k: "98.4%", v: "O/L pass rate" },
    { k: "3", v: "Mediums supported" },
    { k: "Grade 1 – A/L", v: "Coverage" },
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
