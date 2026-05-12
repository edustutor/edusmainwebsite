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
      <GlBrand />
      <GlFAQ />
      <GlCTA />
    </>
  );
}
