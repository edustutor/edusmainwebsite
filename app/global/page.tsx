import { GlHero } from "@/components/global/GlHero";
import { GlIntro } from "@/components/global/GlIntro";
import { GlPromise } from "@/components/global/GlPromise";
import { GlCurricula } from "@/components/global/GlCurricula";
import { GlSubjects } from "@/components/global/GlSubjects";
import { GlWhy } from "@/components/global/GlWhy";
import { GlHow } from "@/components/global/GlHow";
import { GlTutors } from "@/components/global/GlTutors";
import { GlLiveClass } from "@/components/global/GlLiveClass";
import { GlPricing } from "@/components/global/GlPricing";
import { GlReach } from "@/components/global/GlReach";
import { GlParents } from "@/components/global/GlParents";
import { GlCompare } from "@/components/global/GlCompare";
import { GlFindTutor } from "@/components/global/GlFindTutor";
import { GlBrand } from "@/components/global/GlBrand";
import { GlFAQ } from "@/components/global/GlFAQ";
import { GlCTA } from "@/components/global/GlCTA";

export const metadata = {
  title: "EDUS Global Online Tutoring | Cambridge, Edexcel & One-to-One Classes",
  description:
    "Join EDUS Global for personalized one-to-one online tutoring from expert tutors. Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level, and any syllabus support for students worldwide.",
  alternates: { canonical: "/global" },
  keywords: [
    "global online tutoring",
    "one to one online tutoring",
    "online tutoring for international students",
    "Cambridge online tutor",
    "Edexcel online tutor",
    "IGCSE online tuition",
    "GCSE online tutoring",
    "O Level online classes",
    "A Level online tutoring",
    "online maths tutor",
    "online science tutor",
    "online physics tutor",
    "online chemistry tutor",
    "online biology tutor",
    "online English tutor",
    "personalized online learning",
    "live online classes for students",
    "expert online tutors",
    "affordable online tuition",
    "EDUS Global online tutoring",
  ],
};

export default function GlobalPage() {
  return (
    <>
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
      <GlFindTutor />
      <GlBrand />
      <GlFAQ />
      <GlCTA />
    </>
  );
}
