/**
 * Tavily search helper - site-restricted web search for the EDUS chatbot.
 *
 * The bot uses this when a parent asks about content beyond the class
 * catalog (blog posts, gallery albums, partner info, news, founder bio,
 * etc.). All searches are restricted to the three EDUS apex domains so
 * results can NEVER pull from outside edus.lk / edus.edu.lk / edustutor.com.
 *
 * Why server-side?
 *   - TAVILY_API_KEY is a server-only secret. Browser callers would
 *     expose the quota to anyone with devtools.
 *   - Domain restriction is enforced HERE - if a future model
 *     hallucinates a wider domain list, this layer still clamps.
 *
 * Tavily docs: https://docs.tavily.com/docs/rest-api/search
 *
 * Returned shape is intentionally minimal - we strip Tavily's verbose
 * metadata down to title + url + content snippet so the LLM gets a
 * clean, scan-friendly result list without wasting tokens on
 * pagination cursors and image URLs we don't use.
 */

const TAVILY_ENDPOINT = "https://api.tavily.com/search";

/**
 * The three EDUS apex domains we accept hits from. www variants resolve
 * to the same content via the apex/www 308 redirect (set up earlier
 * via Vercel domain config), so Tavily indexes the apex form regardless.
 */
const EDUS_DOMAINS = [
  "edustutor.com",
  "edus.lk",
  "edus.edu.lk",
];

/** Maximum results to return to the LLM. 3 is plenty - the model picks
 *  one or two to cite, anything more dilutes the signal AND adds tokens
 *  to the round-2 prompt which slows down first-token latency on the
 *  resumed stream. (Was 5 - dropped for speed.) */
const MAX_RESULTS = 3;

/** Tavily timeout. Aggressive on purpose: the user is staring at a
 *  mid-stream pause while we run this fetch. A 4s ceiling means worst
 *  case we fail fast and let the LLM honestly say "no results" instead
 *  of holding the chat for 8 seconds. (Was 8000 - halved for speed.) */
const TIMEOUT_MS = 4000;

export type TavilyResult = {
  /** Page title from the HTML <title> or first H1. */
  title: string;
  /** Absolute URL on an EDUS apex domain. */
  url: string;
  /** ~200-char snippet, AI-friendly markdown. */
  content: string;
  /** Tavily's relevance score 0-1. Useful for the LLM to rank. */
  score: number;
};

/**
 * Run a site-restricted search.
 *
 * Returns the trimmed result list (or empty array on any failure).
 * Failures are LOGGED but never thrown - the calling /api/chat route
 * should degrade gracefully to a catalog-only answer instead of
 * surfacing a search outage to the parent.
 */
export async function searchEdus(query: string): Promise<TavilyResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("[tavily] TAVILY_API_KEY not configured - skipping search");
    return [];
  }

  // Defensive query trim. Tavily caps queries at 400 chars; longer
  // queries usually mean the bot pasted a whole user message verbatim.
  const trimmed = query.trim().slice(0, 400);
  if (!trimmed) return [];

  const payload = {
    query: trimmed,
    api_key: apiKey,
    // search_depth=basic is faster + cheaper (1 credit) than advanced
    // (2 credits). For the EDUS use case (looking up known content
    // on a small site), basic is sufficient.
    search_depth: "basic",
    include_domains: EDUS_DOMAINS,
    // Limits Tavily to apex domains - hits from www.* / subdomains
    // are reconciled by Tavily's URL canonicalisation.
    max_results: MAX_RESULTS,
    // include_answer:false because we want raw results the LLM can
    // synthesise from, not Tavily's pre-written answer. Cheaper too.
    include_answer: false,
    include_raw_content: false,
    include_images: false,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(TAVILY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        "[tavily] non-OK response:",
        res.status,
        errText.slice(0, 300),
      );
      return [];
    }

    const json = (await res.json()) as {
      results?: Array<{
        title?: string;
        url?: string;
        content?: string;
        score?: number;
      }>;
    };

    if (!Array.isArray(json.results)) return [];

    // Final domain check defence-in-depth. Tavily's include_domains
    // is reliable but URL parsing is cheap and pays the cost once.
    return json.results
      .filter((r) => {
        if (!r.url) return false;
        try {
          const host = new URL(r.url).hostname.toLowerCase();
          // Match apex OR www subdomain of any EDUS apex.
          return EDUS_DOMAINS.some(
            (d) => host === d || host === `www.${d}`,
          );
        } catch {
          return false;
        }
      })
      .map((r) => ({
        title: (r.title ?? "").slice(0, 200),
        url: r.url as string,
        content: (r.content ?? "").slice(0, 800),
        score: typeof r.score === "number" ? r.score : 0,
      }));
  } catch (err) {
    console.error("[tavily] fetch error:", err);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
