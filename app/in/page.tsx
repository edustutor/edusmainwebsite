import { CTA } from "@/components/shared/CTA";
import { OtherMarkets } from "@/components/markets/OtherMarkets";
import { InHero } from "@/components/markets/in/InHero";
import { InPillars } from "@/components/markets/in/InPillars";
import { InAcademicStructure } from "@/components/markets/in/InAcademicStructure";
import { InPricing } from "@/components/markets/in/InPricing";

export const metadata = {
  title: "India Online Tuition · CBSE Classes 6–10 · Tamil Nadu",
  description:
    "Premium structured online CBSE tuition for Classes 6–10 in English medium. Mathematics, Science, and English with monthly parent reports and exam analytics.",
  alternates: { canonical: "/in" },
};

export default function IndiaPage() {
  return (
    <>
      <InHero />
      <InPillars />
      <InAcademicStructure />
      <InPricing />
      <OtherMarkets current="in" />
      <CTA />
    </>
  );
}
