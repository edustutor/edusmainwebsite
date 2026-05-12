import type { MetadataRoute } from "next";

/**
 * Robots policy: open to all reputable crawlers, including AI engines.
 *
 * Why explicit AI bot allow-listings?
 * - GPTBot (OpenAI / ChatGPT search), PerplexityBot, ClaudeBot (Anthropic),
 *   Google-Extended (Gemini training), Bingbot, Applebot-Extended,
 *   YandexBot, DuckDuckBot, and Bytespider (TikTok) all benefit EDUS visibility
 *   when they ingest content. Allow them explicitly.
 * - The sitemap and llms.txt are advertised in the response so every crawler
 *   gets a canonical map of the content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // AI / answer-engine crawlers (explicit allow keeps them sticky)
      { userAgent: "GPTBot",             allow: "/" },
      { userAgent: "OAI-SearchBot",      allow: "/" },
      { userAgent: "ChatGPT-User",       allow: "/" },
      { userAgent: "PerplexityBot",      allow: "/" },
      { userAgent: "Perplexity-User",    allow: "/" },
      { userAgent: "ClaudeBot",          allow: "/" },
      { userAgent: "Claude-Web",         allow: "/" },
      { userAgent: "anthropic-ai",       allow: "/" },
      { userAgent: "Google-Extended",    allow: "/" },
      { userAgent: "Googlebot",          allow: "/" },
      { userAgent: "Googlebot-Image",    allow: "/" },
      { userAgent: "Googlebot-News",     allow: "/" },
      { userAgent: "AdsBot-Google",      allow: "/" },
      { userAgent: "Bingbot",            allow: "/" },
      { userAgent: "BingPreview",        allow: "/" },
      { userAgent: "Applebot",           allow: "/" },
      { userAgent: "Applebot-Extended",  allow: "/" },
      { userAgent: "DuckDuckBot",        allow: "/" },
      { userAgent: "YandexBot",          allow: "/" },
      { userAgent: "Baiduspider",        allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot",         allow: "/" },
      { userAgent: "LinkedInBot",        allow: "/" },
      { userAgent: "Slackbot",           allow: "/" },
      { userAgent: "WhatsApp",           allow: "/" },
      { userAgent: "TelegramBot",        allow: "/" },
      { userAgent: "Bytespider",         allow: "/" },
      { userAgent: "Amazonbot",          allow: "/" },
      { userAgent: "CCBot",              allow: "/" },
      { userAgent: "Diffbot",            allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      { userAgent: "cohere-ai",          allow: "/" },
      { userAgent: "MistralAI-User",     allow: "/" },
    ],
    sitemap: [
      "https://edustutor.com/sitemap.xml",
    ],
    host: "https://edustutor.com",
  };
}
