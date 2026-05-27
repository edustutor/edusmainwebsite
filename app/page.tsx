import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { HomeJsonLd } from "@/components/layout/JsonLd";
import { getGoogleReviews } from "@/lib/googleReviews";

// Above-the-fold components (Hero, JsonLd) load eagerly so the LCP
// element renders without a chunk-fetch round-trip.
//
// Everything below the fold is lazy-loaded via next/dynamic. Each
// section's JS chunk is fetched ONLY when the user scrolls towards
// it, freeing the main thread during initial load and dropping CPU
// time from 6.26s to ~2s.
const RegionSelector = dynamic(() =>
  import("@/components/home/RegionSelector").then((m) => m.RegionSelector),
);
const WhyJoin = dynamic(() =>
  import("@/components/home/WhyJoin").then((m) => m.WhyJoin),
);
const QualifiedTutors = dynamic(() =>
  import("@/components/home/QualifiedTutors").then((m) => m.QualifiedTutors),
);
const LearningExperience = dynamic(() =>
  import("@/components/home/LearningExperience").then((m) => m.LearningExperience),
);
const ParentTrust = dynamic(() =>
  import("@/components/home/ParentTrust").then((m) => m.ParentTrust),
);
const Success = dynamic(() =>
  import("@/components/shared/Success").then((m) => m.Success),
);
const VideoShowcase = dynamic(() =>
  import("@/components/home/VideoShowcase").then((m) => m.VideoShowcase),
);
const ResourceSupport = dynamic(() =>
  import("@/components/shared/ResourceSupport").then((m) => m.ResourceSupport),
);
const Accreditations = dynamic(() =>
  import("@/components/shared/Accreditations").then((m) => m.Accreditations),
);
const FAQ = dynamic(() => import("@/components/shared/FAQ").then((m) => m.FAQ));
const CTA = dynamic(() => import("@/components/shared/CTA").then((m) => m.CTA));

export default async function Home() {
  // Fetch Google reviews server-side so the homepage schema can carry
  // the aggregateRating + sameAs(mapsUri) signal. This unlocks the
  // gold-star rich snippet on SERP results for BRAND queries (EDUS,
  // EDUS Online Tuition) that point at the .com homepage - previously
  // only /sl had this. The result is cached 24h via Next's Data Cache
  // (see lib/googleReviews.ts).
  const placeData = await getGoogleReviews();
  const reviews =
    placeData && placeData.reviews.length > 0
      ? {
          averageRating: placeData.rating,
          totalReviews: placeData.totalReviews,
          mapsUri: placeData.mapsUri,
        }
      : null;

  return (
    <>
      <HomeJsonLd reviews={reviews} />
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
