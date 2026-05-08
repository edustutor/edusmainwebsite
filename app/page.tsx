import { Hero } from "@/components/Hero";
import { RegionSelector } from "@/components/RegionSelector";
import { WhyJoin } from "@/components/WhyJoin";
import { LearningExperience } from "@/components/LearningExperience";
import { Subjects } from "@/components/Subjects";
import { ParentTrust } from "@/components/ParentTrust";
import { Success } from "@/components/Success";
import { JoinFlow } from "@/components/JoinFlow";
import { ResourceSupport } from "@/components/ResourceSupport";
import { FAQ } from "@/components/FAQ";
import { HelpBanner } from "@/components/HelpBanner";
import { CTA } from "@/components/CTA";
import { HomeJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      {/* 1. Hero */}
      <Hero />
      {/* 2. Region Chooser */}
      <RegionSelector />
      {/* 3. Why Choose EDUS */}
      <WhyJoin />
      {/* 4. How Learning Works */}
      <LearningExperience />
      {/* 5. Subjects */}
      <Subjects />
      {/* 6. Parent Trust */}
      <ParentTrust />
      {/* 7. Success Stories */}
      <Success />
      {/* 8. Enrolment Flow */}
      {/* <JoinFlow /> */}
      {/* 9. Resource & Learning Support */}
      <ResourceSupport />
      {/* 10. FAQ */}
      <FAQ />
      {/* 11. Help banner - separate from footer */}
      {/* <HelpBanner /> */}
      {/* 12. Final CTA */}
      <CTA />
      {/* 13. Footer is in layout */}
    </>
  );
}
