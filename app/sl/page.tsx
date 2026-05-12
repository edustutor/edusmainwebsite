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
    "online tuition Sri Lanka",
    "Sri Lanka online tuition",
    "online classes Sri Lanka",
    "Sinhala medium online tuition",
    "Tamil medium online tuition",
    "English medium online tuition Sri Lanka",
    "Cambridge online tuition Sri Lanka",
    "Edexcel online tuition Sri Lanka",
    "G.C.E A/L online tuition",
    "G.C.E O/L online tuition",
    "Combined Maths online tuition",
    "Physics online tuition Sri Lanka",
    "Chemistry online tuition Sri Lanka",
    "Biology online tuition Sri Lanka",
    "ICT online tuition Sri Lanka",
    "Mathematics online tuition Sri Lanka",
    "English online tuition Sri Lanka",
    "online tutors Sri Lanka",
    "Grade 6 online classes Sri Lanka",
    "Grade 10 online classes Sri Lanka",
    "Grade 11 online classes Sri Lanka",
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
