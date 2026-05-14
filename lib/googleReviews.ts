/**
 * Google Places API (New) - fetch reviews for the EDUS Online Tuition
 * listing and surface them on /sl as live social proof.
 *
 * - Server-only (key never reaches the browser).
 * - 24-hour cache via Next.js `fetch` revalidate. One call/day per server
 *   instance => ~$0.75/month at the Pro SKU price; well inside the
 *   Google Cloud $200/month free credit.
 * - Returns "most relevant" reviews (the API default) - ToS-safe; we do
 *   not filter or hide negative reviews.
 * - Falls back to `null` on any error so the UI can degrade to the
 *   existing curated SlTestimonials block without breaking the page.
 *
 * Env:
 *   GOOGLE_PLACES_API_KEY      server-side API key with Places API (New)
 *   GOOGLE_PLACES_PLACE_ID     ChIJ... place ID for EDUS Online Tuition
 */

const ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews.rating",
  "reviews.relativePublishTimeDescription",
  "reviews.publishTime",
  "reviews.text",
  "reviews.originalText",
  "reviews.authorAttribution.displayName",
  "reviews.authorAttribution.photoUri",
  "reviews.authorAttribution.uri",
  "reviews.googleMapsUri",
].join(",");

/** One review surfaced to the UI. Subset of the upstream Google response. */
export type GoogleReview = {
  /** "Abisha Vildon" - displayed under the avatar. */
  authorName: string;
  /** Google avatar URL - rendered through next/image. May be null. */
  authorPhotoUrl: string | null;
  /** Google Maps profile URL for the reviewer. */
  authorProfileUrl: string | null;
  /** 1-5 stars. Always present. */
  rating: number;
  /** "2 months ago" - localised by the API. */
  relativeDate: string;
  /** ISO datetime - used for <time dateTime>. */
  publishTime: string;
  /** Review body (English-preferred). May be empty if reviewer didn't write text. */
  text: string;
  /** Direct deep link to this specific review on Google Maps. */
  reviewUrl: string | null;
};

/** Combined place + reviews payload. */
export type GooglePlaceData = {
  placeName: string;
  /** Aggregate star rating 0-5 (decimal). */
  rating: number;
  /** Total number of reviews on the listing (not just the 5 returned). */
  totalReviews: number;
  /** Public Google Maps URL for the full listing - used for the "Read all reviews" CTA. */
  mapsUri: string;
  /** Up to 5 most-relevant reviews. Sorted by Google's relevance algorithm. */
  reviews: GoogleReview[];
};

/**
 * Fetch EDUS place + reviews. Returns `null` on any failure so the
 * calling page can decide whether to render the fallback testimonials.
 *
 * Cached for 24h via Next.js Data Cache. Subsequent calls within 24h
 * return the cached payload without hitting Google.
 */
export async function getGoogleReviews(): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const url = `${ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=en`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      // 24-hour ISR cache. Vercel + dev both honour this.
      next: { revalidate: 86400, tags: ["google-reviews"] },
    });
  } catch {
    return null;
  }

  if (!res.ok) {
    // Surface the upstream error in build logs so missing API access
    // is easy to diagnose - but never throw, never break the page.
    if (process.env.NODE_ENV !== "production") {
      const body = await res.text().catch(() => "<no body>");
      console.warn(`[googleReviews] Places API ${res.status}: ${body.slice(0, 200)}`);
    }
    return null;
  }

  type ApiResponse = {
    displayName?: { text?: string };
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviews?: Array<{
      rating?: number;
      relativePublishTimeDescription?: string;
      publishTime?: string;
      text?: { text?: string };
      originalText?: { text?: string };
      googleMapsUri?: string;
      authorAttribution?: {
        displayName?: string;
        photoUri?: string;
        uri?: string;
      };
    }>;
  };

  let data: ApiResponse;
  try {
    data = (await res.json()) as ApiResponse;
  } catch {
    return null;
  }

  const reviews: GoogleReview[] = (data.reviews ?? []).slice(0, 5).map((r) => ({
    authorName: r.authorAttribution?.displayName ?? "Google reviewer",
    authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
    authorProfileUrl: r.authorAttribution?.uri ?? null,
    rating: r.rating ?? 5,
    relativeDate: r.relativePublishTimeDescription ?? "",
    publishTime: r.publishTime ?? "",
    text: r.text?.text ?? r.originalText?.text ?? "",
    reviewUrl: r.googleMapsUri ?? null,
  }));

  return {
    placeName: data.displayName?.text ?? "EDUS Online Tuition",
    rating: data.rating ?? 0,
    totalReviews: data.userRatingCount ?? 0,
    mapsUri: data.googleMapsUri ?? "https://www.google.com/maps",
    reviews,
  };
}
