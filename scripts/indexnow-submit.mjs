#!/usr/bin/env node
/**
 * indexnow-submit.mjs
 *
 * Pings the IndexNow API (api.indexnow.org) with every URL from each
 * EDUS domain's sitemap. Bing, Yandex, DuckDuckGo, Seznam, and Naver
 * pick up the URL list within minutes - far faster than waiting for
 * their crawlers to discover changes via sitemap polling.
 *
 * Google does NOT participate in IndexNow yet. Google indexing is
 * handled separately via Search Console + the standard sitemap
 * submission. See README "Indexing" section for the Google path.
 *
 * Per IndexNow spec each domain hosts a verification file at
 *   https://<host>/<key>.txt
 * containing the key (and nothing else). The key + filename match
 * the constants below + the file under /public/.
 *
 * Run manually:
 *   npm run indexnow:submit
 *
 * Run from CI:
 *   .github/workflows/indexnow-weekly.yml every Monday 04:00 UTC
 *
 * Reads the URL list from each domain's live sitemap.xml so we never
 * fall out of sync with what's actually indexable.
 */

import { setTimeout as sleep } from "node:timers/promises";

/** IndexNow verification key. Same value as /public/<key>.txt. */
const INDEXNOW_KEY =
  "518080ca37ebe1a2c00b97095a87a81dab76a8591dff74910579c3797ca839b2";

/** All hosts that should be submitted. Each must serve the key file. */
const HOSTS = [
  "https://edustutor.com",
  "https://edus.lk",
  "https://edus.edu.lk",
];

/** IndexNow endpoint - any participating engine accepts the payload. */
const ENDPOINT = "https://api.indexnow.org/IndexNow";

/**
 * Pull the live sitemap.xml from one host and return the <loc> URLs
 * inside. Each EDUS domain has its OWN sitemap (per-host via the
 * Next.js app/sitemap.ts), so we hit each one separately.
 */
async function fetchSitemapUrls(host) {
  const url = `${host}/sitemap.xml`;
  const res = await fetch(url, { headers: { "User-Agent": "EDUSIndexNow/1.0" } });
  if (!res.ok) throw new Error(`Sitemap ${url} returned ${res.status}`);
  const xml = await res.text();
  // Simple regex extraction - works for the urlset format Next emits.
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return urls;
}

/**
 * POST a batch of URLs to IndexNow. The spec lets us submit up to 10k
 * URLs per request - we send all sitemap URLs in one call per host.
 *
 * `host` field must match the URLs' host. `keyLocation` declares where
 * the verification file lives.
 */
async function submitBatch(host, urls) {
  const hostname = new URL(host).hostname;
  const body = {
    host: hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "EDUSIndexNow/1.0",
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text().catch(() => "") };
}

async function main() {
  console.log("=== EDUS IndexNow submission ===\n");

  let totalSubmitted = 0;
  const summary = [];

  for (const host of HOSTS) {
    try {
      console.log(`Fetching ${host}/sitemap.xml ...`);
      const urls = await fetchSitemapUrls(host);
      if (urls.length === 0) {
        console.log(`  ⚠️  No URLs found in ${host}/sitemap.xml`);
        summary.push({ host, urls: 0, status: "no-urls" });
        continue;
      }
      console.log(`  → ${urls.length} URLs`);

      console.log(`Submitting to IndexNow ...`);
      const { status, text } = await submitBatch(host, urls);
      const ok = status >= 200 && status < 300;
      console.log(`  → HTTP ${status} ${ok ? "✓" : "✗"} ${text.slice(0, 120)}`);
      summary.push({ host, urls: urls.length, status });
      totalSubmitted += urls.length;
    } catch (err) {
      console.log(`  ✗ ${err.message}`);
      summary.push({ host, urls: 0, status: "error", error: err.message });
    }

    // Be polite - small delay between hosts so the IndexNow servers
    // don't see all 3 requests arrive in the same TCP window.
    await sleep(800);
  }

  console.log("\n=== Summary ===");
  for (const s of summary) {
    console.log(
      `  ${s.host.padEnd(28)} ${String(s.urls).padStart(3)} URLs  HTTP ${s.status}${s.error ? " (" + s.error + ")" : ""}`,
    );
  }
  console.log(`\nTotal URLs submitted: ${totalSubmitted}`);
  console.log(
    "\nBing + Yandex + DuckDuckGo typically re-crawl within minutes.",
  );
  console.log(
    "Google does NOT use IndexNow - rely on Search Console + sitemap.",
  );
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
