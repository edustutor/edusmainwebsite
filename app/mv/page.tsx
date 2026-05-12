import { MvHero } from "@/components/markets/mv/MvHero";
import { MvWhy } from "@/components/markets/mv/MvWhy";
import { MvSubjects } from "@/components/markets/mv/MvSubjects";
import { MvLearningFlow } from "@/components/markets/mv/MvLearningFlow";
import { MvTutors } from "@/components/markets/mv/MvTutors";
import { MvAudience } from "@/components/markets/mv/MvAudience";
import { MvIslands } from "@/components/markets/mv/MvIslands";
import { MvExamPrep } from "@/components/markets/mv/MvExamPrep";
import { MvSubjectDetails } from "@/components/markets/mv/MvSubjectDetails";
import { MvFAQ } from "@/components/markets/mv/MvFAQ";
import { MvCTA } from "@/components/markets/mv/MvCTA";
import { OtherMarkets } from "@/components/markets/OtherMarkets";

export const metadata = {
  title:
    "Cambridge IGCSE & O-Level Online Classes in Maldives | EDUS",
  description:
    "Premium 1-to-1 Cambridge IGCSE and O-Level online classes for Maldives students. Learn Mathematics, English, Biology, Chemistry and Physics with expert EDUS tutors from home.",
  alternates: { canonical: "/mv" },
  keywords: [
    // Primary
    "Cambridge IGCSE online classes Maldives",
    "online tuition Maldives",
    "online classes Maldives",
    "O Level tuition Maldives",
    "best online tuition Maldives",
    "best Cambridge tutors Maldives",
    "online classes for kids Maldives",
    "online tuition for school students Maldives",
    // 1-to-1 + private
    "1 to 1 online tuition Maldives",
    "one to one online tutoring Maldives",
    "private online tutoring Maldives",
    "private tutor Maldives",
    "personal tutor online Maldives",
    "home tutor online Maldives",
    // Grades + exams
    "Grade 9 online classes Maldives",
    "Grade 10 online classes Maldives",
    "Cambridge IGCSE Grade 9 Maldives",
    "Cambridge IGCSE Grade 10 Maldives",
    "O Level Grade 10 tuition Maldives",
    "IGCSE exam preparation Maldives",
    "Cambridge exam preparation Maldives",
    "past paper practice Maldives IGCSE",
    // Subjects
    "IGCSE Mathematics Maldives",
    "IGCSE Maths tutor Maldives",
    "IGCSE Physics Maldives",
    "IGCSE Chemistry Maldives",
    "IGCSE Biology Maldives",
    "IGCSE English Maldives",
    "English as a Second Language Maldives",
    "English ESL online classes Maldives",
    "online Maths tutor Maldives",
    "online Science tutor Maldives",
    "online English tutor Maldives",
    // Locations across Maldives
    "online tuition Malé",
    "online tuition Hulhumalé",
    "online tuition Addu",
    "online tuition Fuvahmulah",
    "online tuition Kulhudhuffushi",
    "Cambridge tuition Maldives islands",
    // Human / intent
    "how to find Cambridge tutor in Maldives",
    "affordable online tuition Maldives",
    "online tuition for Cambridge students Maldives",
    "live online classes Maldives",
    "online tutor for IGCSE Maldives",
    // Personal class
    "personal class online Maldives",
    "personal classes Maldives",
    "personal class for IGCSE students",
    "personal class for Grade 10 Maldives",
    "personal online tutor Maldives",
    "personal tuition Maldives",
    // Institute
    "best online institute Maldives",
    "best online tuition institute Maldives",
    "best Cambridge institute Maldives",
    "top online learning institute Maldives",
    "trusted IGCSE institute Maldives",
    // Best tutor
    "best Cambridge tutor Maldives",
    "best IGCSE tutor Maldives",
    "best Maths tutor Maldives",
    "best Physics tutor Maldives",
    "best Chemistry tutor Maldives",
    "best Biology tutor Maldives",
    "best English tutor Maldives",
    "top rated IGCSE tutors Maldives",
    "experienced Cambridge tutors Maldives",
    // Results / outcomes
    "IGCSE A star online tuition",
    "IGCSE 9A Maldives",
    "Cambridge IGCSE top scorer Maldives",
    "best results IGCSE Maldives",
    "best results O Level Maldives",
    "high scoring IGCSE classes Maldives",
    "Cambridge exam toppers Maldives",
    // Scholarship
    "Cambridge scholarship preparation Maldives",
    "IGCSE scholarship tuition Maldives",
    "scholarship exam online tuition Maldives",
  ],
};

export default function MaldivesPage() {
  return (
    <>
      <MvHero />
      <MvWhy />
      <MvSubjects />
      <MvLearningFlow />
      <MvTutors />
      <MvAudience />
      <MvIslands />
      <MvExamPrep />
      <MvSubjectDetails />
      <MvFAQ />
      <OtherMarkets current="mv" />
      <MvCTA />
    </>
  );
}
