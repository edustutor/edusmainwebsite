import Link from "next/link";
import { TeachHero } from "@/components/teach/TeachHero";
import { TeachVision } from "@/components/teach/TeachVision";
import { TeachStats } from "@/components/teach/TeachStats";
import { TeachWhy } from "@/components/teach/TeachWhy";
import { TeachWorkflow } from "@/components/teach/TeachWorkflow";
import { TeachCategories } from "@/components/teach/TeachCategories";
import { TeachSubjects } from "@/components/teach/TeachSubjects";
import { TeachRequirements } from "@/components/teach/TeachRequirements";
import { TeachRules } from "@/components/teach/TeachRules";
import { TeachQA } from "@/components/teach/TeachQA";
import { TeachGrowth } from "@/components/teach/TeachGrowth";
import { TeachPayments } from "@/components/teach/TeachPayments";
import { TeachConduct } from "@/components/teach/TeachConduct";
import { TeachApplyFlow } from "@/components/teach/TeachApplyFlow";
import { TeachDeclaration } from "@/components/teach/TeachDeclaration";
import { TeachFAQ } from "@/components/teach/TeachFAQ";
import { TeachCTA } from "@/components/teach/TeachCTA";

export const metadata = {
  title: "Teach with EDUS · Online Tutor Opportunities · Sri Lanka, India, Maldives & Global",
  description:
    "Join EDUS Online Institute as a tutor and teach students across Sri Lanka, India, Maldives, and global communities. Apply now to become part of a structured, quality-focused online learning platform.",
  alternates: { canonical: "/teach" },
  keywords: [
    "online tutor jobs Sri Lanka",
    "teach online with EDUS",
    "become an online tutor",
    "online teaching opportunities",
    "Cambridge tutor jobs",
    "Edexcel tutor jobs",
    "CBSE online tutor",
    "Tamil medium online tutor",
    "English medium online tutor",
  ],
};

export default function TeachWithEdusPage() {
  return (
    <>
      <TeachHero />
      <TeachVision />
      <TeachStats />
      <TeachWhy />
      <TeachWorkflow />
      <TeachCategories />
      <TeachSubjects />
      <TeachRequirements />
      <TeachRules />
      <TeachQA />
      <TeachGrowth />
      <TeachPayments />
      <TeachConduct />
      <TeachApplyFlow />
      <TeachDeclaration />
      <TeachFAQ />
      <TeachCTA />
    </>
  );
}
