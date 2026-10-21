import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";
import { GuidelineDocument } from "@/components/legal/GuidelineDocument";
import { GROUP_CLASS_STANDARDS } from "@/components/legal/GroupClassStandardsData";

const DESCRIPTION =
  "EDUS group class rules for students and parents: attendance, homework and exams, safe platform use, monthly fees due by the 5th, and official support channels.";

export const metadata = {
  title: "Group Class Standards for Students and Parents",
  description: DESCRIPTION,
  alternates: {
    canonical: "/group-class-standards",
    languages: hreflangAlternates("/group-class-standards"),
  },
};

export default function GroupClassStandardsPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
          { name: "Group Class Standards", path: "/group-class-standards" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "EDUS Student Success, Safety & Learning Standards",
          headline: "EDUS Group Class Standards - Attendance, Safety, Fees",
          description: DESCRIPTION,
          path: "/group-class-standards",
          lastUpdated: "2026-10-21",
        })}
      />
      <GuidelineDocument doc={GROUP_CLASS_STANDARDS} />
    </>
  );
}
