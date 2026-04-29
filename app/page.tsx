import { Hero } from "@/components/Hero";
import { WhatIsEdus } from "@/components/WhatIsEdus";
import { Offer } from "@/components/Offer";
import { WhyJoin } from "@/components/WhyJoin";
import { Success } from "@/components/Success";
import { JoinFlow } from "@/components/JoinFlow";
import { LearningExperience } from "@/components/LearningExperience";
import { Onboarding } from "@/components/Onboarding";
import { Accreditations } from "@/components/Accreditations";
import { Marquee } from "@/components/Marquee";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsEdus />
      <Offer />
      <Marquee />
      <WhyJoin />
      <LearningExperience />
      <Onboarding />
      <Success />
      <Accreditations />
      <JoinFlow />
      <CTA />
    </>
  );
}
