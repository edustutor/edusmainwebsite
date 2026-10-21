import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";
import { GuidelineDocument } from "@/components/legal/GuidelineDocument";
import { INDIVIDUAL_CLASS_GUIDELINES } from "@/components/legal/IndividualClassGuidelinesData";

const DESCRIPTION =
  "EDUS individual class rules for students and parents: the 30-day class cycle, advance payment, timetable changes, absences, cancellations and renewal.";

export const metadata = {
  title: "Individual Class Guidelines for Students and Parents",
  description: DESCRIPTION,
  alternates: {
    canonical: "/individual-class-guidelines",
    languages: hreflangAlternates("/individual-class-guidelines"),
  },
};

export default function IndividualClassGuidelinesPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
          { name: "Individual Class Guidelines", path: "/individual-class-guidelines" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "EDUS Individual Class Student and Parent Guidelines",
          headline: "EDUS Individual Class Guidelines - Cycle, Payment, Attendance",
          description: DESCRIPTION,
          path: "/individual-class-guidelines",
          lastUpdated: "2026-10-21",
        })}
      />
      <GuidelineDocument doc={INDIVIDUAL_CLASS_GUIDELINES} />
    </>
  );
}
