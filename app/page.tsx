import { Hero } from "@/components/home/Hero";
import { RegionSelector } from "@/components/home/RegionSelector";
import { WhyJoin } from "@/components/home/WhyJoin";
import { QualifiedTutors } from "@/components/home/QualifiedTutors";
import { LearningExperience } from "@/components/home/LearningExperience";
import { ParentTrust } from "@/components/home/ParentTrust";
import { Success } from "@/components/shared/Success";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { ResourceSupport } from "@/components/shared/ResourceSupport";
import { Accreditations } from "@/components/shared/Accreditations";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/shared/CTA";
import { HomeJsonLd } from "@/components/layout/JsonLd";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <RegionSelector />
      <WhyJoin />
      <QualifiedTutors />
      <LearningExperience />
      <ParentTrust />
      <Success />
      
      <ResourceSupport />
      <Accreditations />
      <FAQ />
      <VideoShowcase />
      <CTA />
    </>
  );
}
