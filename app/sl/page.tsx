import { CTA } from "@/components/shared/CTA";
import { RegionSelector } from "@/components/home/RegionSelector";
import { SlHero } from "@/components/markets/sl/SlHero";
import { SlCurricula } from "@/components/markets/sl/SlCurricula";
import { SlGroupClasses } from "@/components/markets/sl/SlGroupClasses";
import { SlIndividual } from "@/components/markets/sl/SlIndividual";
import { SlTestimonials } from "@/components/markets/sl/SlTestimonials";
import { SlFAQ } from "@/components/markets/sl/SlFAQ";
import { GoogleReviews } from "@/components/markets/sl/GoogleReviews";
import {
  JsonLdScript,
  breadcrumbList,
  educationalProgram,
  tuitionCourse,
  tuitionService,
  googleAggregateRating,
  SITE_URL,
} from "@/components/layout/StructuredData";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata = {
  title: "Sri Lanka Online Tuition - National, Cambridge & Edexcel",
  description:
    "Live online group classes (fixed timetable) & flexible 1-to-1 tuition, Grade 1 to A/L. National Syllabus, Cambridge, Edexcel. Sinhala, Tamil, English medium.",
  alternates: { canonical: "/sl" },
  keywords: [
    // Primary
    "online tuition Sri Lanka",
    "online tuition in Sri Lanka",
    "Sri Lanka online tuition",
    "online classes Sri Lanka",
    "best online tuition Sri Lanka",
    "best online tutors in Sri Lanka",
    "online tuition near me Sri Lanka",
    "online tuition for kids Sri Lanka",
    "online classes for school students Sri Lanka",
    // Mediums
    "Sinhala medium online tuition",
    "Tamil medium online tuition",
    "English medium online tuition Sri Lanka",
    "Tamil medium online classes for kids",
    "Sinhala medium online classes",
    // Syllabuses
    "Cambridge online tuition Sri Lanka",
    "Edexcel online tuition Sri Lanka",
    "Cambridge IGCSE tuition Sri Lanka",
    "Edexcel A Level tuition Sri Lanka",
    "international syllabus online classes Sri Lanka",
    "National Syllabus online classes",
    // Grades / Exams
    "G.C.E A/L online tuition",
    "G.C.E O/L online tuition",
    "A Level tuition online Sri Lanka",
    "O Level tuition online Sri Lanka",
    "Grade 6 online classes Sri Lanka",
    "Grade 7 online classes Sri Lanka",
    "Grade 8 online classes Sri Lanka",
    "Grade 9 online classes Sri Lanka",
    "Grade 10 online classes Sri Lanka",
    "Grade 11 online classes Sri Lanka",
    // Subjects
    "Combined Maths online tuition",
    "Mathematics online tuition Sri Lanka",
    "Physics online tuition Sri Lanka",
    "Chemistry online tuition Sri Lanka",
    "Biology online tuition Sri Lanka",
    "ICT online tuition Sri Lanka",
    "English online tuition Sri Lanka",
    "Spoken English classes online Sri Lanka",
    "Tamil tuition online Sri Lanka",
    "Sinhala tuition online Sri Lanka",
    // Tutor + intent queries
    "online tutors Sri Lanka",
    "private tutor online Sri Lanka",
    "home tuition online Sri Lanka",
    "best Cambridge tutors online Sri Lanka",
    "how to find an online tutor in Sri Lanka",
    "affordable online tuition Sri Lanka",
    "online group classes Sri Lanka",
    "one to one online tuition Sri Lanka",
    // Personal class
    "personal class online Sri Lanka",
    "personal classes Sri Lanka",
    "personal tuition Sri Lanka",
    "personal online tutor Sri Lanka",
    "personal class for A/L students",
    "personal class for O/L students",
    // Institute
    "best online institute Sri Lanka",
    "best online learning institute Sri Lanka",
    "best online tuition institute Sri Lanka",
    "top online tuition institute Sri Lanka",
    "online education institute Sri Lanka",
    // Best tutor
    "best online tutor Sri Lanka",
    "best tutor online Sri Lanka",
    "best A/L tutors Sri Lanka",
    "best O/L tutors Sri Lanka",
    "best Combined Maths tutor online",
    "best Physics tutor online Sri Lanka",
    "best Chemistry tutor online Sri Lanka",
    "best Biology tutor online Sri Lanka",
    "best English tutor online Sri Lanka",
    "top rated tutors Sri Lanka",
    // Results / outcomes
    "9A in O/L",
    "9A O/L Sri Lanka",
    "best results O/L Sri Lanka",
    "3A in A/L",
    "3A A/L Sri Lanka",
    "best results A/L Sri Lanka",
    "A pass A/L online tuition",
    "Distinction O/L online tuition",
    "tuition for top grades Sri Lanka",
    "tuition for high marks Sri Lanka",
    "exam toppers online tuition Sri Lanka",
    // Scholarship
    "Grade 5 scholarship online tuition",
    "Grade 5 scholarship exam preparation",
    "Grade 5 scholarship classes online",
    "scholarship exam tuition Sri Lanka",
    "online tuition for scholarship students",
    // Timetable + delivery
    "EDUS group class timetable",
    "EDUS Sri Lanka timetable 2026",
    "online class schedule Sri Lanka",
    "EDUS class fees Sri Lanka",
    "EDUS admission fee",
    "EDUS app online classes",
    "EDUS Google Meet classes",
    "individual online tuition Sri Lanka flexible timing",
    "flexible online tutoring schedule Sri Lanka",
  ],
};

export default async function SriLankaPage() {
  // Fetch Google reviews once at render time. Cached 24h via Next's
  // Data Cache (see lib/googleReviews.ts). If fetch fails we still
  // render the page - only the GoogleReviews block + schema disappear.
  const placeData = await getGoogleReviews();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Sri Lanka", path: "/sl" },
        ])}
      />
      {/* AggregateRating + Review schema - lets Google show the gold-star
          rich snippet for /sl in search results. Only emitted when the
          API actually returned reviews. */}
      {placeData && placeData.reviews.length > 0 ? (
        <JsonLdScript
          data={googleAggregateRating({
            averageRating: placeData.rating,
            totalReviews: placeData.totalReviews,
            mapsUri: placeData.mapsUri,
            reviews: placeData.reviews.map((r) => ({
              authorName: r.authorName,
              rating: r.rating,
              publishTime: r.publishTime,
              text: r.text,
            })),
          })}
        />
      ) : null}
      <JsonLdScript
        data={educationalProgram({
          name: "EDUS Sri Lanka Online Tuition",
          description:
            "Live online tuition for Sri Lankan students from Grade 1 to G.C.E A/L. National Syllabus, Cambridge IGCSE, and Edexcel in Sinhala, Tamil, and English medium. Group classes follow a fixed weekly timetable (https://edustutor.com/sl/timetable); individual one-to-one classes are scheduled flexibly per student.",
          url: `${SITE_URL}/sl`,
          area: "Sri Lanka",
          educationalLevel: "Grade 1 to G.C.E A/L",
        })}
      />
      <JsonLdScript
        data={tuitionService({
          name: "Online Tuition Sri Lanka - EDUS",
          description:
            "Live online group classes (fixed timetable, from LKR 1,000/subject/month, plus a single LKR 1,000 one-time admission fee per student regardless of how many classes or subjects they take) and flexible one-to-one tutoring (from LKR 2,500/hour) for Sri Lankan school students. National Syllabus, Cambridge IGCSE, and Edexcel in Sinhala, Tamil, and English medium. Delivered via EDUS Student Mobile App, EDUS Web App, and Google Meet.",
          url: `${SITE_URL}/sl`,
          area: "Sri Lanka",
        })}
      />
      <JsonLdScript
        data={tuitionCourse({
          name: "EDUS Sri Lanka Live Online Classes",
          description:
            "Live online tuition course for Sri Lankan students from Grade 1 to G.C.E A/L. Group classes on a fixed weekly timetable, plus flexible one-to-one tutoring scheduled per student. National Syllabus, Cambridge IGCSE, Edexcel. Sinhala, Tamil, English medium.",
          url: `${SITE_URL}/sl`,
          area: "Sri Lanka",
        })}
      />
      <SlHero />
      <SlCurricula />
      <SlGroupClasses />
      <SlIndividual />
      {/* Live Google reviews first - verified social proof. The block
          renders null if the Places API call fails, so the curated
          SlTestimonials below always carries the page. */}
      <GoogleReviews />
      <SlTestimonials />
      <SlFAQ />
      {/* Full 4-market RegionSelector instead of OtherMarkets, because
          visitors landing on .lk domains hit /sl directly via middleware
          308 - they never see the homepage RegionSelector, so we surface
          the full path picker here. */}
      <RegionSelector />
      <CTA />
    </>
  );
}
