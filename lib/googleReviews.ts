/**
 * Google reviews data source - reads the committed JSON snapshot at
 * data/google-reviews.json. The snapshot is updated weekly by a GitHub
 * Actions cron job (.github/workflows/google-reviews-cron.yml) which
 * runs scripts/fetch-google-reviews.mjs once per Sunday, commits the
 * file, and triggers a Vercel auto-deploy.
 *
 * Zero runtime API calls => zero ongoing Google bill.
 *
 * To refresh manually:  npm run reviews:fetch
 */
import { promises as fs } from "node:fs";
import path from "node:path";

/** One review surfaced to the UI. Mirrors the JSON schema written by the fetch script. */
export type GoogleReview = {
  authorName: string;
  authorPhotoUrl: string | null;
  authorProfileUrl: string | null;
  rating: number;
  relativeDate: string;
  publishTime: string;
  text: string;
  reviewUrl: string | null;
};

export type GooglePlaceData = {
  placeName: string;
  rating: number;
  totalReviews: number;
  mapsUri: string;
  reviews: GoogleReview[];
  /** ISO timestamp of the most recent successful Places API fetch. */
  fetchedAt?: string;
};

/**
 * Resolve the committed reviews snapshot. Returns `null` if the file
 * does not exist yet (first-run before the cron has populated it) so
 * the calling page can fall back to the curated SlTestimonials block
 * without breaking.
 *
 * The read happens at build time (server component on /sl renders once
 * per ISR window). Cheap and synchronous-ish - one disk read per server
 * cold start.
 */
export async function getGoogleReviews(): Promise<GooglePlaceData | null> {
  const file = path.join(process.cwd(), "data", "google-reviews.json");
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as GooglePlaceData;
  } catch {
    return null;
  }
}
