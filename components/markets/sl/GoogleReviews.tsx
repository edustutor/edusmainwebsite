import { getGoogleReviews } from "@/lib/googleReviews";
import { GoogleReviewsClient } from "./GoogleReviewsClient";

/**
 * Server wrapper for the live Google reviews block on /sl.
 *
 * Responsibilities:
 *   - Read the committed reviews snapshot (data/google-reviews.json).
 *   - Apply the 3-5 star filter (drop 1-2 star reviews).
 *   - Bucket reviews by exact star count so the client can render a
 *     three-tier expand: 5* first, then 4*, then 3*, then redirect to
 *     Google Maps for the long tail of all 77 reviews.
 *   - Render nothing if the snapshot is missing - the curated
 *     SlTestimonials block below carries the page in that case.
 *
 * Tiered expand model:
 *   - Tier 1 (default visible):  5-star reviews
 *   - Tier 2 (View more #1):     + 4-star reviews
 *   - Tier 3 (View more #2):     + 3-star reviews
 *   - Final CTA after Tier 3:    "View all 77 on Google Maps"
 *
 * The actual UI (cards + expand state machine) lives in
 * GoogleReviewsClient.tsx because the tiered expand needs state.
 */
export async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  // 3-5 star filter. We do this server-side so the client bundle never
  // sees the dropped 1-2 star reviews (smaller payload + faster paint).
  const fiveStar = data.reviews.filter((r) => r.rating === 5);
  const fourStar = data.reviews.filter((r) => r.rating === 4);
  const threeStar = data.reviews.filter((r) => r.rating === 3);

  if (fiveStar.length + fourStar.length + threeStar.length === 0) return null;

  return (
    <GoogleReviewsClient
      placeName={data.placeName}
      rating={data.rating}
      totalReviews={data.totalReviews}
      mapsUri={data.mapsUri}
      fiveStar={fiveStar}
      fourStar={fourStar}
      threeStar={threeStar}
    />
  );
}
