#!/usr/bin/env node
/**
 * fetch-google-reviews.mjs
 *
 * Hits Google Places API (New) once, fetches up to 5 most-relevant reviews
 * for the EDUS Online Tuition listing, and writes the result to
 * data/google-reviews.json.
 *
 * Run manually:    npm run reviews:fetch
 * Run from CI:     same script, called by .github/workflows/google-reviews-cron.yml
 *                  every Sunday at 03:00 UTC. The action commits the updated
 *                  file back to main, which triggers a Vercel deploy.
 *
 * Strategy:
 *   - 1 API call per run. Cron is weekly => ~4 calls/month => $0 cost
 *     against Google's $200/month free credit.
 *   - The page reads the committed JSON at build time (never at runtime).
 *     Zero runtime API calls = zero Google bill.
 *   - 3-5 star filter is applied client-side in the page component, not
 *     here, so the cached payload retains everything for transparency.
 *
 * Env (loaded from .env.local in dev, GitHub secrets in CI):
 *   GOOGLE_PLACES_API_KEY    server-side API key with Places API (New) access
 *   GOOGLE_PLACES_PLACE_ID   ChIJ... place ID for EDUS Online Tuition
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "data", "google-reviews.json");

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

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

if (!apiKey || !placeId) {
  console.error(
    "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACES_PLACE_ID in environment.",
  );
  process.exit(1);
}

console.log(`Fetching reviews for place ${placeId}...`);

const url = `${ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=en`;
const res = await fetch(url, {
  headers: {
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": FIELD_MASK,
  },
});

if (!res.ok) {
  const body = await res.text().catch(() => "<no body>");
  console.error(`Places API ${res.status}: ${body.slice(0, 500)}`);
  process.exit(1);
}

const data = await res.json();

const reviews = (data.reviews ?? []).map((r) => ({
  authorName: r.authorAttribution?.displayName ?? "Google reviewer",
  authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
  authorProfileUrl: r.authorAttribution?.uri ?? null,
  rating: r.rating ?? 5,
  relativeDate: r.relativePublishTimeDescription ?? "",
  publishTime: r.publishTime ?? "",
  text: r.text?.text ?? r.originalText?.text ?? "",
  reviewUrl: r.googleMapsUri ?? null,
}));

const payload = {
  fetchedAt: new Date().toISOString(),
  placeName: data.displayName?.text ?? "EDUS Online Tuition",
  rating: data.rating ?? 0,
  totalReviews: data.userRatingCount ?? 0,
  mapsUri:
    data.googleMapsUri ??
    `https://www.google.com/maps/place/?q=place_id:${placeId}`,
  reviews,
};

await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
await fs.writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(`✓ Wrote ${reviews.length} reviews to ${path.relative(ROOT, OUTPUT)}`);
console.log(`  Rating: ${payload.rating} / 5 from ${payload.totalReviews} total reviews`);
for (const [i, r] of reviews.entries()) {
  console.log(`  [${i + 1}] ${r.authorName} - ${r.rating}* - ${r.relativeDate}`);
}
