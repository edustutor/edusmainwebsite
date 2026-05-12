import { MvHero } from "@/components/mv/MvHero";
import { MvWhy } from "@/components/mv/MvWhy";
import { MvSubjects } from "@/components/mv/MvSubjects";
import { MvLearningFlow } from "@/components/mv/MvLearningFlow";
import { MvTutors } from "@/components/mv/MvTutors";
import { MvAudience } from "@/components/mv/MvAudience";
import { MvIslands } from "@/components/mv/MvIslands";
import { MvExamPrep } from "@/components/mv/MvExamPrep";
import { MvSubjectDetails } from "@/components/mv/MvSubjectDetails";
import { MvFAQ } from "@/components/mv/MvFAQ";
import { MvCTA } from "@/components/mv/MvCTA";

export const metadata = {
  title:
    "Cambridge IGCSE & O-Level Online Classes in Maldives | EDUS",
  description:
    "Premium 1-to-1 Cambridge IGCSE and O-Level online classes for Maldives students. Learn Mathematics, English, Biology, Chemistry and Physics with expert EDUS tutors from home.",
  alternates: { canonical: "/mv" },
  keywords: [
    "Cambridge IGCSE online classes Maldives",
    "O Level tuition Maldives",
    "Online tuition Maldives",
    "IGCSE Mathematics Maldives",
    "IGCSE Physics Maldives",
    "IGCSE Chemistry Maldives",
    "IGCSE Biology Maldives",
    "English ESL online classes Maldives",
    "1 to 1 online tuition Maldives",
    "Private online tutoring Maldives",
    "Grade 9 online classes Maldives",
    "Grade 10 online classes Maldives",
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
      <MvCTA />
    </>
  );
}
