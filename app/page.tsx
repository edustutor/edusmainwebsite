import { Hero } from "@/components/Hero";
import { RegionSelector } from "@/components/RegionSelector";
import { WhyJoin } from "@/components/WhyJoin";
import { LearningExperience } from "@/components/LearningExperience";
import { Subjects } from "@/components/Subjects";
import { Success } from "@/components/Success";
import { JoinFlow } from "@/components/JoinFlow";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
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
      {/* 6. Success Stories */}
      <Success />
      {/* 7. Enrolment Flow */}
      <JoinFlow />
      {/* 8. FAQ */}
      <FAQ />
      {/* 9. Final CTA */}
      <CTA />
      {/* 10. Footer is in layout */}
    </>
  );
}
