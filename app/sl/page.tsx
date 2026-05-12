import { CTA } from "@/components/shared/CTA";
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
};

export default function SriLankaPage() {
  return (
    <>
      <SlHero />
      <SlCurricula />
      <SlGroupClasses />
      <SlIndividual />
      <SlTestimonials />
      <CTA />
    </>
  );
}
