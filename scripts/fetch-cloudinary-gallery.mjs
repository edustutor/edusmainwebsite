#!/usr/bin/env node
/**
 * fetch-cloudinary-gallery.mjs
 *
 * Pulls every image from each mapped Cloudinary folder and writes the
 * discovered public IDs into components/gallery/GalleryData.ts.
 *
 * The Cloudinary folders are NOT named the same as the album slugs (they
 * use long Title_Case_With_Underscores), so the mapping below pairs each
 * Cloudinary folder path to the album slug it should populate.
 *
 * Run after uploading new album photos:
 *
 *     npm run gallery:fetch
 *
 * Reads credentials from .env.local (loaded by `node --env-file`):
 *   - CLOUDINARY_CLOUD_NAME   (e.g. "yarlventures")
 *   - CLOUDINARY_API_KEY      (15-digit number)
 *   - CLOUDINARY_API_SECRET   (the secret)
 *
 * Optional:
 *   - DRY_RUN=1   (print results, don't rewrite the file)
 *
 * The script only edits each album's `photos: [...]` block in
 * GalleryData.ts. Everything else (titles, descriptions, body copy)
 * is left untouched.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GALLERY_FILE = path.join(ROOT, "components", "gallery", "GalleryData.ts");

/* ----------------------- env + arg parsing ----------------------- */
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;
const DRY_RUN = process.env.DRY_RUN === "1";

if (!CLOUD || !KEY || !SECRET) {
  console.error(
    "Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local before running.",
  );
  process.exit(1);
}

const AUTH = "Basic " + Buffer.from(`${KEY}:${SECRET}`).toString("base64");
const BASE = `https://api.cloudinary.com/v1_1/${CLOUD}`;

/* ----------------------- Folder → slug map ----------------------- */
/**
 * Pairs each Cloudinary folder path to the album slug it populates in
 * GalleryData.ts. The folder names were created by the original WordPress
 * Cloudinary upload integration and use a long Title_Case format, so they
 * cannot be derived programmatically from the kebab-case slugs.
 *
 * If a new folder is added, append a row here and re-run the fetch.
 */
const FOLDER_TO_SLUG = [
  {
    folder: "EDUS__Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office",
    slug: "edus-yarl-ventures-jaffna-office-opening",
  },
  {
    folder: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning_",
    slug: "edus-landmark-achievement-online-learning-innovation",
  },
  {
    folder: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education",
    slug: "edus-wins-national-ict-award-education",
  },
  {
    folder:
      "We’re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi",
    slug: "edus-yarl-it-hub-innovation-festival-2024",
  },
  {
    folder: "Slingshot_Accelerator_demo_day",
    slug: "edus-slingshot-accelerator-demo-day",
  },
  {
    folder: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude",
    slug: "edus-1st-year-anniversary",
  },
  {
    folder: "YGC_Innovation_Festival_’23!",
    slug: "edus-ygc-innovation-festival-2023",
  },
  {
    folder: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups",
    slug: "hemas-hatch-slingshot-launch-2023",
  },
  {
    folder: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam",
    slug: "edus-honors-kokuvil-hindu-primary-grade-5-scholarship",
  },
  {
    folder: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023",
    slug: "edus-slasscom-xcellerate-2023",
  },
  {
    folder: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success",
    slug: "edus-spiralation-2022-finalist",
  },
  {
    folder: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment",
    slug: "edus-2nd-year-anniversary",
  },
  {
    folder: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna",
    slug: "edus-first-office-opening-jaffna-2021",
  },
];

/* ----------------------- Cloudinary API ------------------------- */

/**
 * List EVERY image asset in the cloud and return them keyed by
 * `asset_folder`. We do one full pass (paginated) instead of one request
 * per album because Cloudinary's `prefix` filter does NOT survive folder
 * names that contain smart quotes, exclamation marks, or Unicode
 * private-use characters - several of our folders do. Asset-folder names
 * also start with characters that don't sort cleanly under the prefix
 * query, so listing by prefix silently returns 0 even when the folder
 * has 40+ images.
 *
 * The cloud has ~150 total assets across 13 folders so the full pass is
 * effectively free.
 */
async function indexAssetsByFolder() {
  const byFolder = new Map();
  let nextCursor = null;
  let total = 0;

  do {
    const params = new URLSearchParams({
      type: "upload",
      max_results: "500",
    });
    if (nextCursor) params.set("next_cursor", nextCursor);

    const url = `${BASE}/resources/image?${params.toString()}`;
    const res = await fetch(url, { headers: { Authorization: AUTH } });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Cloudinary resources list failed (${res.status}): ${body}`);
    }
    const data = await res.json();
    for (const asset of data.resources || []) {
      if (asset.resource_type !== "image") continue;
      const folder = asset.asset_folder ?? "";
      if (!byFolder.has(folder)) byFolder.set(folder, []);
      byFolder.get(folder).push(asset);
      total++;
    }
    nextCursor = data.next_cursor || null;
  } while (nextCursor);

  console.log(
    `  → indexed ${total} assets across ${byFolder.size} folder(s).\n`,
  );
  return byFolder;
}

/**
 * Resolve assets for one album by exact folder name.
 * Sorts by `created_at` ascending so the slideshow order is stable.
 */
function photosForFolder(byFolder, folderName) {
  const assets = byFolder.get(folderName) ?? [];
  return assets
    .slice()
    .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    .map((a) => ({
      publicId: a.public_id,
      width: a.width,
      height: a.height,
    }));
}

/* ----------------------- File rewriting -------------------------- */

/**
 * For each album folder discovered in Cloudinary, splice the new
 * `photos: [...]` array into GalleryData.ts. The album slug is the
 * Cloudinary sub-folder name.
 */
function buildPhotosLiteral(photos) {
  if (!photos.length) return "[]";
  const items = photos
    .map(
      (p) =>
        `      { publicId: "${p.publicId}", width: ${p.width}, height: ${p.height} },`,
    )
    .join("\n");
  return `[\n${items}\n    ]`;
}

/**
 * Replace the existing `photos: [...]` block for one slug with the
 * rebuilt literal. Matches the slug declaration line, then finds the
 * nearest `photos: [` ... `]` on the following lines.
 */
function spliceAlbum(source, slug, literal) {
  const slugAnchor = `slug: "${slug}",`;
  const startIdx = source.indexOf(slugAnchor);
  if (startIdx === -1) {
    console.warn(`  ⚠️  slug "${slug}" not found in GalleryData.ts - skipping`);
    return source;
  }

  // Find the `photos: [` that follows the slug anchor (must be inside
  // the same object literal, so it's the first photos: after the anchor).
  const photosKey = "photos: [";
  const photosStart = source.indexOf(photosKey, startIdx);
  if (photosStart === -1) {
    console.warn(`  ⚠️  photos: [ not found after slug "${slug}" - skipping`);
    return source;
  }

  // Find the matching `]` for the photos array. Walk forward counting
  // bracket depth so we tolerate nested objects inside the array.
  let depth = 0;
  let i = photosStart + photosKey.length - 1; // points at the `[`
  for (; i < source.length; i++) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) {
    console.warn(`  ⚠️  unmatched [ for slug "${slug}" - skipping`);
    return source;
  }

  const before = source.slice(0, photosStart);
  const after = source.slice(i + 1);
  return `${before}photos: ${literal}${after}`;
}

/* ----------------------- main ------------------------------------ */

async function main() {
  console.log(`Fetching gallery photos from Cloudinary cloud "${CLOUD}"...`);

  const byFolder = await indexAssetsByFolder();

  let source = await fs.readFile(GALLERY_FILE, "utf8");
  const summary = [];

  for (const entry of FOLDER_TO_SLUG) {
    const photos = photosForFolder(byFolder, entry.folder);
    process.stdout.write(`  • ${entry.slug.padEnd(60)} ${photos.length} photos\n`);
    summary.push({ slug: entry.slug, count: photos.length });
    const literal = buildPhotosLiteral(photos);
    source = spliceAlbum(source, entry.slug, literal);
  }

  // Surface any folders Cloudinary has that we DON'T have mapped, so the
  // operator knows to extend FOLDER_TO_SLUG or rename the upload.
  const mapped = new Set(FOLDER_TO_SLUG.map((e) => e.folder));
  const unmapped = [...byFolder.keys()].filter(
    (f) => f && !mapped.has(f) && byFolder.get(f).length > 0,
  );
  if (unmapped.length) {
    console.log("\n⚠️  Cloudinary folders not mapped to any album slug:");
    unmapped.forEach((f) => console.log(`    ${f} (${byFolder.get(f).length} photos)`));
  }

  if (DRY_RUN) {
    console.log("\nDRY_RUN=1 - GalleryData.ts NOT written.");
    return;
  }

  await fs.writeFile(GALLERY_FILE, source, "utf8");
  console.log(`\n✓ GalleryData.ts updated. Run npm run build to verify.\n`);
  console.log("Summary:");
  summary.forEach((s) => {
    console.log(`  ${s.slug.padEnd(60)} ${s.count} photos`);
  });
}

main().catch((err) => {
  console.error("\nFetch failed:", err.message);
  process.exit(1);
});
