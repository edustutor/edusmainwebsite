import { CTA } from "@/components/shared/CTA";
import { OtherMarkets } from "@/components/markets/OtherMarkets";
import { InHero } from "@/components/markets/in/InHero";
import { InPillars } from "@/components/markets/in/InPillars";
import { InAcademicStructure } from "@/components/markets/in/InAcademicStructure";
import { InPricing } from "@/components/markets/in/InPricing";
import { InFAQ } from "@/components/markets/in/InFAQ";
import {
  JsonLdScript,
  breadcrumbList,
  educationalProgram,
  tuitionCourse,
  tuitionService,
  SITE_URL,
} from "@/components/layout/StructuredData";

export const metadata = {
  title: "India Online Tuition · CBSE Classes 6–10 · Tamil Nadu",
  description:
    "Premium structured online CBSE tuition for Classes 6–10 in English medium. Mathematics, Science, and English with monthly parent reports and exam analytics.",
  alternates: { canonical: "/in" },
  keywords: [
    // Primary
    "CBSE online tuition for Classes 6 to 10",
    "CBSE online tuition Tamil Nadu",
    "CBSE online classes Tamil Nadu",
    "best CBSE online tuition India",
    "best CBSE tutors online",
    "online tuition for CBSE students",
    "online CBSE classes for kids",
    "online tuition India",
    "online tuition Tamil Nadu",
    "online classes Chennai",
    "online tuition Chennai CBSE",
    // Per class
    "CBSE Class 6 online tuition",
    "CBSE Class 7 online tuition",
    "CBSE Class 8 online tuition",
    "CBSE Class 9 online tuition",
    "CBSE Class 10 online tuition",
    "online tuition for CBSE Class 9",
    "online tuition for CBSE Class 10",
    "CBSE Middle Stage online tuition",
    "CBSE Secondary Stage online tuition",
    // Subjects
    "CBSE Mathematics online tuition",
    "CBSE Science online tuition",
    "CBSE English online tuition",
    "online Maths tuition for CBSE",
    "online Science tuition for CBSE",
    "online English tuition for CBSE",
    "CBSE Class 10 Maths online tuition",
    "CBSE Class 10 Science online tuition",
    "CBSE Class 10 English online tuition",
    // Intent / human queries
    "best online tutors for CBSE Tamil Nadu",
    "how to find a CBSE tutor online",
    "online tuition for CBSE board exam",
    "CBSE board exam preparation online",
    "affordable CBSE online tuition",
    "live online CBSE classes India",
    "English medium CBSE online tuition",
    "CBSE tutor for Class 10 online",
    "private online tutor CBSE India",
    "monthly parent reports CBSE tuition",
    "exam-focused CBSE tuition online",
    // Personal class
    "personal class online CBSE",
    "personal class for CBSE students",
    "personal class CBSE Class 10",
    "personal online tutor CBSE",
    "personal tuition Tamil Nadu",
    "personal class online Tamil Nadu",
    // Institute
    "best online institute CBSE",
    "best CBSE online institute Tamil Nadu",
    "top online learning institute India",
    "best CBSE tuition institute online",
    "trusted online tuition institute India",
    // Best tutor
    "best CBSE tutor online",
    "best CBSE Maths tutor",
    "best CBSE Science tutor",
    "best CBSE English tutor",
    "top CBSE tutors India",
    "experienced CBSE tutors online",
    "best teacher for CBSE Class 10",
    "best teacher for CBSE Class 9",
    // Results / outcomes
    "CBSE Class 10 top scorer",
    "CBSE Class 10 90 percent",
    "CBSE Class 10 95 percent",
    "CBSE Class 10 100 percent",
    "CBSE board exam topper",
    "best results CBSE Class 10",
    "best marks CBSE Class 10",
    "high scoring CBSE tuition",
    "CBSE board exam preparation online",
    "CBSE board exam toppers tuition",
    // Scholarship
    "CBSE scholarship online tuition",
    "scholarship exam CBSE online classes",
    "merit scholarship CBSE tuition",
  ],
};

export default function IndiaPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "India", path: "/in" },
        ])}
      />
      <JsonLdScript
        data={educationalProgram({
          name: "EDUS India CBSE Online Tuition (Classes 6 to 10)",
          description:
            "Premium structured online CBSE tuition for English-medium Tamil Nadu students. Mathematics, Science, and English for CBSE Classes 6 to 10 with monthly parent reports.",
          url: `${SITE_URL}/in`,
          area: "India",
          educationalLevel: "CBSE Classes 6 to 10",
        })}
      />
      <JsonLdScript
        data={tuitionService({
          name: "CBSE Online Tuition Tamil Nadu — EDUS",
          description:
            "Live online CBSE classes for Tamil Nadu students. Mathematics, Science, and English for CBSE Classes 6 to 10 in English medium with monthly parent reports and exam analytics.",
          url: `${SITE_URL}/in`,
          area: "India",
        })}
      />
      <JsonLdScript
        data={tuitionCourse({
          name: "EDUS India CBSE Classes 6 to 10",
          description:
            "Structured live online CBSE course for English-medium students across Tamil Nadu. Mathematics, Science, and English for Classes 6 to 10 with monthly parent reports.",
          url: `${SITE_URL}/in`,
          area: "India",
        })}
      />
      <InHero />
      <InPillars />
      <InAcademicStructure />
      <InPricing />
      <InFAQ />
      <OtherMarkets current="in" />
      <CTA />
    </>
  );
}
