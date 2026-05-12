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
  keywords: [
    "CBSE online tuition for Classes 6 to 10",
    "CBSE online tuition Tamil Nadu",
    "CBSE Class 6 online tuition",
    "CBSE Class 7 online tuition",
    "CBSE Class 8 online tuition",
    "CBSE Class 9 online tuition",
    "CBSE Class 10 online tuition",
    "CBSE Mathematics online tuition",
    "CBSE Science online tuition",
    "CBSE English online tuition",
    "CBSE Middle Stage online tuition",
    "CBSE Secondary Stage online tuition",
    "online tuition Tamil Nadu",
    "online tuition for CBSE students",
    "English medium CBSE online tuition",
    "live online CBSE classes India",
  ],
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
