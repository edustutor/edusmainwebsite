import { GlHero } from "@/components/markets/global/GlHero";
import { GlIntro } from "@/components/markets/global/GlIntro";
import { GlPromise } from "@/components/markets/global/GlPromise";
import { GlCurricula } from "@/components/markets/global/GlCurricula";
import { GlSubjects } from "@/components/markets/global/GlSubjects";
import { GlWhy } from "@/components/markets/global/GlWhy";
import { GlHow } from "@/components/markets/global/GlHow";
import { GlTutors } from "@/components/markets/global/GlTutors";
import { GlLiveClass } from "@/components/markets/global/GlLiveClass";
import { GlPricing } from "@/components/markets/global/GlPricing";
import { GlReach } from "@/components/markets/global/GlReach";
import { GlParents } from "@/components/markets/global/GlParents";
import { GlCompare } from "@/components/markets/global/GlCompare";
import { GlBrand } from "@/components/markets/global/GlBrand";
import { GlFAQ } from "@/components/markets/global/GlFAQ";
import { GlCTA } from "@/components/markets/global/GlCTA";
import { OtherMarkets } from "@/components/markets/OtherMarkets";
import {
  JsonLdScript,
  breadcrumbList,
  educationalProgram,
  tuitionCourse,
  tuitionService,
  SITE_URL,
} from "@/components/layout/StructuredData";

export const metadata = {
  title: "Global Online Tutoring · Cambridge, Edexcel, IGCSE · EDUS",
  description:
    "Personalised one-to-one online tutoring for international students. Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level & any syllabus, worldwide.",
  alternates: { canonical: "/global" },
  keywords: [
    // Primary
    "global online tutoring",
    "one to one online tutoring",
    "online tutoring for international students",
    "best online tutors for international students",
    "private online tutor",
    "private online tutoring",
    "personal online tutor",
    "online tuition for international students",
    "best online tutoring service",
    "EDUS Global online tutoring",
    // Syllabuses
    "Cambridge online tutor",
    "Edexcel online tutor",
    "IGCSE online tuition",
    "GCSE online tutoring",
    "O Level online classes",
    "A Level online tutoring",
    "IB online tuition",
    "best Cambridge tutor online",
    "best Edexcel tutor online",
    "IGCSE tutor near me",
    "GCSE tutor near me",
    "A Level tutor near me",
    // Subjects
    "online maths tutor",
    "online science tutor",
    "online physics tutor",
    "online chemistry tutor",
    "online biology tutor",
    "online English tutor",
    "online further maths tutor",
    "online economics tutor",
    "online business studies tutor",
    "online accounting tutor",
    "online ICT tutor",
    "online English literature tutor",
    // Audience / human queries
    "personalized online learning",
    "live online classes for students",
    "expert online tutors",
    "affordable online tuition",
    "how to find an online tutor",
    "best online tutor for my child",
    "online tutor for IGCSE Maths",
    "online tutor for A Level Physics",
    "tutor for international school students",
    "online tutoring for expat students",
    // Locations EDUS Global serves (high opportunity)
    "online tuition UAE",
    "online tuition Dubai",
    "online tuition Qatar",
    "online tuition Saudi Arabia",
    "online tuition Singapore",
    "online tuition Malaysia",
    "online tuition Australia",
    "online tuition Canada",
    "online tuition UK",
    "online tuition USA",
    "online tutor for Sri Lankan diaspora",
    // Personal class
    "personal class online",
    "personal online classes",
    "personal class for international students",
    "personal class for IGCSE",
    "personal class for GCSE",
    "personal class for A Level",
    "personal online tutor for international students",
    "personal tuition for expat students",
    // Institute
    "best online institute for international students",
    "best Cambridge online institute",
    "best Edexcel online institute",
    "top online learning institute",
    "leading online education platform",
    "trusted online tuition for expat families",
    // Best tutor
    "best online tutor",
    "best Cambridge online tutor",
    "best Edexcel online tutor",
    "best IGCSE tutor online",
    "best GCSE tutor online",
    "best A Level tutor online",
    "best Maths tutor online",
    "best Physics tutor online",
    "best Chemistry tutor online",
    "best Biology tutor online",
    "best English tutor online",
    "top rated online tutors",
    "experienced Cambridge tutors online",
    // Results / outcomes
    "IGCSE A star online tuition",
    "IGCSE 9A online tuition",
    "GCSE 9 grade online tuition",
    "A Level A star online tuition",
    "Distinction online tuition",
    "online tuition for top grades",
    "online tuition for top scorers",
    "high scoring online classes",
    "tuition for IGCSE A star results",
    "tuition for A Level top grades",
    "exam toppers online tuition",
    // Scholarship
    "scholarship exam online tuition",
    "online tuition for scholarship students",
    "Cambridge scholarship preparation online",
    "international scholarship exam tuition",
  ],
};

export default function GlobalPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Global", path: "/global" },
        ])}
      />
      <JsonLdScript
        data={educationalProgram({
          name: "EDUS Global One-to-One Online Tutoring",
          description:
            "Personalised one-to-one online tutoring for students worldwide. Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level, IB, and national syllabuses.",
          url: `${SITE_URL}/global`,
          area: "Worldwide",
          educationalLevel: "Cambridge · Edexcel · IGCSE · GCSE · O-Level · A-Level · IB",
        })}
      />
      <JsonLdScript
        data={tuitionService({
          name: "Global One-to-One Online Tutoring — EDUS",
          description:
            "Worldwide one-to-one online tutoring for international students. Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level, IB, and national curricula in English medium.",
          url: `${SITE_URL}/global`,
          area: "Worldwide",
        })}
      />
      <JsonLdScript
        data={tuitionCourse({
          name: "EDUS Global One-to-One Online Tutoring",
          description:
            "Personalised one-to-one online tutoring for international students. Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level, IB, and any national curriculum support.",
          url: `${SITE_URL}/global`,
          area: "Worldwide",
        })}
      />
      <GlHero />
      <GlIntro />
      <GlPromise />
      <GlCurricula />
      <GlSubjects />
      <GlWhy />
      <GlHow />
      <GlTutors />
      <GlLiveClass />
      <GlPricing />
      <GlReach />
      <GlParents />
      <GlCompare />
      <GlBrand />
      <GlFAQ />
      <OtherMarkets current="gl" />
      <GlCTA />
    </>
  );
}
