import Link from "next/link";
import { TeachHero } from "@/components/teach/TeachHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
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
import {
  JsonLdScript,
  breadcrumbList,
  tutorJobPosting,
  teachCollectionPage,
} from "@/components/layout/StructuredData";

export const metadata = {
  title: "Teach with EDUS - Online Tutor Jobs - SL, India, Maldives",
  description:
    "Become an EDUS online tutor and teach students across Sri Lanka, India, Maldives & globally. Apply now to join a quality-focused online learning platform.",
  alternates: { canonical: "/teach" },
  keywords: [
    // Primary
    "online tutor jobs",
    "online tutor jobs Sri Lanka",
    "online tutor jobs India",
    "online teaching jobs",
    "online teaching opportunities",
    "online tutoring jobs from home",
    "teach online with EDUS",
    "EDUS tutor recruitment",
    "tutor vacancies Sri Lanka",
    "tutor vacancies online",
    // Verbs / intent
    "become an online tutor",
    "how to become an online tutor",
    "how to teach online from home",
    "apply to teach online",
    "online tutor application",
    "online teaching job application",
    "earn from home as a tutor",
    "side income teaching online",
    // Syllabuses
    "Cambridge tutor jobs",
    "Cambridge IGCSE tutor jobs",
    "Edexcel tutor jobs",
    "CBSE online tutor",
    "CBSE tutor jobs Tamil Nadu",
    "IGCSE online tutor jobs",
    "international syllabus tutor jobs",
    // Mediums
    "Tamil medium online tutor",
    "English medium online tutor",
    "Sinhala medium online tutor",
    "online English tutor jobs",
    // Subjects
    "online Maths tutor jobs",
    "online Science tutor jobs",
    "online Physics tutor jobs",
    "online Chemistry tutor jobs",
    "online Biology tutor jobs",
    "ICT tutor jobs online",
    // Audience
    "tutor jobs for graduates",
    "tutor jobs for undergraduates",
    "tutor jobs for teachers",
    "part-time online teaching jobs",
    "freelance online tutor",
    "remote teaching jobs",
    // Locations
    "online tutor jobs Jaffna",
    "online tutor jobs Colombo",
    "online tutor jobs Chennai",
    "online tutor jobs Tamil Nadu",
  ],
  // Per-route OG card. Falls back to /edus-og.jpg until /public/og/teach.jpg exists.
  openGraph: {
    type: "website",
    title: "Teach with EDUS - Online Tutor Jobs - SL, India, Maldives",
    description:
      "Become an EDUS online tutor and teach students across Sri Lanka, India, Maldives and globally. Flexible hours, structured classes.",
    siteName: "EDUS Online Institute",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "Teach with EDUS - online tutor opportunities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teach with EDUS - Online Tutor Jobs",
    description:
      "Become an EDUS online tutor. Sri Lanka, India, Maldives, global. Flexible hours.",
    images: ["/edus-og.jpg"],
  },
};

export default function TeachWithEdusPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Teach with EDUS", path: "/teach" },
        ])}
      />
      <JsonLdScript data={tutorJobPosting()} />
      <JsonLdScript data={teachCollectionPage()} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Teach with EDUS" },
        ]}
        variant="overlay"
      />
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
