import { CTA } from "@/components/shared/CTA";
import { OtherMarkets } from "@/components/markets/OtherMarkets";
import { SlHero } from "@/components/markets/sl/SlHero";
import { SlCurricula } from "@/components/markets/sl/SlCurricula";
import { SlGroupClasses } from "@/components/markets/sl/SlGroupClasses";
import { SlIndividual } from "@/components/markets/sl/SlIndividual";
import { SlTestimonials } from "@/components/markets/sl/SlTestimonials";

export const metadata = {
  title: "Sri Lanka Online Tuition · National, Cambridge & Edexcel",
  description:
    "Live online classes for Grade 1 to A/L, Cambridge & Edexcel, in Sinhala, Tamil, and English medium. Group and individual tuition with expert tutors.",
  alternates: { canonical: "/sl" },
  keywords: [
    // Primary
    "online tuition Sri Lanka",
    "online tuition in Sri Lanka",
    "Sri Lanka online tuition",
    "online classes Sri Lanka",
    "best online tuition Sri Lanka",
    "best online tutors in Sri Lanka",
    "online tuition near me Sri Lanka",
    "online tuition for kids Sri Lanka",
    "online classes for school students Sri Lanka",
    // Mediums
    "Sinhala medium online tuition",
    "Tamil medium online tuition",
    "English medium online tuition Sri Lanka",
    "Tamil medium online classes for kids",
    "Sinhala medium online classes",
    // Syllabuses
    "Cambridge online tuition Sri Lanka",
    "Edexcel online tuition Sri Lanka",
    "Cambridge IGCSE tuition Sri Lanka",
    "Edexcel A Level tuition Sri Lanka",
    "international syllabus online classes Sri Lanka",
    "National Syllabus online classes",
    // Grades / Exams
    "G.C.E A/L online tuition",
    "G.C.E O/L online tuition",
    "A Level tuition online Sri Lanka",
    "O Level tuition online Sri Lanka",
    "Grade 6 online classes Sri Lanka",
    "Grade 7 online classes Sri Lanka",
    "Grade 8 online classes Sri Lanka",
    "Grade 9 online classes Sri Lanka",
    "Grade 10 online classes Sri Lanka",
    "Grade 11 online classes Sri Lanka",
    // Subjects
    "Combined Maths online tuition",
    "Mathematics online tuition Sri Lanka",
    "Physics online tuition Sri Lanka",
    "Chemistry online tuition Sri Lanka",
    "Biology online tuition Sri Lanka",
    "ICT online tuition Sri Lanka",
    "English online tuition Sri Lanka",
    "Spoken English classes online Sri Lanka",
    "Tamil tuition online Sri Lanka",
    "Sinhala tuition online Sri Lanka",
    // Tutor + intent queries
    "online tutors Sri Lanka",
    "private tutor online Sri Lanka",
    "home tuition online Sri Lanka",
    "best Cambridge tutors online Sri Lanka",
    "how to find an online tutor in Sri Lanka",
    "affordable online tuition Sri Lanka",
    "online group classes Sri Lanka",
    "one to one online tuition Sri Lanka",
    // Personal class
    "personal class online Sri Lanka",
    "personal classes Sri Lanka",
    "personal tuition Sri Lanka",
    "personal online tutor Sri Lanka",
    "personal class for A/L students",
    "personal class for O/L students",
    // Institute
    "best online institute Sri Lanka",
    "best online learning institute Sri Lanka",
    "best online tuition institute Sri Lanka",
    "top online tuition institute Sri Lanka",
    "online education institute Sri Lanka",
    // Best tutor
    "best online tutor Sri Lanka",
    "best tutor online Sri Lanka",
    "best A/L tutors Sri Lanka",
    "best O/L tutors Sri Lanka",
    "best Combined Maths tutor online",
    "best Physics tutor online Sri Lanka",
    "best Chemistry tutor online Sri Lanka",
    "best Biology tutor online Sri Lanka",
    "best English tutor online Sri Lanka",
    "top rated tutors Sri Lanka",
    // Results / outcomes
    "9A in O/L",
    "9A O/L Sri Lanka",
    "best results O/L Sri Lanka",
    "3A in A/L",
    "3A A/L Sri Lanka",
    "best results A/L Sri Lanka",
    "A pass A/L online tuition",
    "Distinction O/L online tuition",
    "tuition for top grades Sri Lanka",
    "tuition for high marks Sri Lanka",
    "exam toppers online tuition Sri Lanka",
    // Scholarship
    "Grade 5 scholarship online tuition",
    "Grade 5 scholarship exam preparation",
    "Grade 5 scholarship classes online",
    "scholarship exam tuition Sri Lanka",
    "online tuition for scholarship students",
  ],
};

export default function SriLankaPage() {
  return (
    <>
      <SlHero />
      <SlCurricula />
      <SlGroupClasses />
      <SlIndividual />
      <SlTestimonials />
      <OtherMarkets current="sl" />
      <CTA />
    </>
  );
}
