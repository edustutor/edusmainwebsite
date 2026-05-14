import type { MetadataRoute } from "next";
import { getCurrentHost } from "@/lib/siteUrl";

/**
 * Robots policy: open to ALL reputable crawlers, AI engines, and answer engines.
 *
 * `User-agent: *` already implicitly allows everything, but listing each bot
 * explicitly:
 *   1. Signals intent to platforms that surface allow-lists in their dashboards
 *   2. Keeps the policy auditable
 *   3. Lets us tune disallow rules per bot in future if needed
 *
 * Categories covered: AI/LLM crawlers - search engines - answer engines -
 * SEO/marketing crawlers - social-preview bots - academic/research crawlers -
 * archival bots - regional engines.
 *
 * Host-aware: each of the 6 EDUS domains gets its own robots.txt where the
 * `host` directive AND the sitemap URL point at THAT domain. Each domain is
 * an independent Search Console property and needs its own sitemap declared.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = await getCurrentHost();
  const origin = `https://${host}`;
  const allow = "/";
  const bot = (userAgent: string) => ({ userAgent, allow });

  return {
    rules: [
      // Universal allow
      { userAgent: "*", allow, disallow: ["/api/", "/_next/"] },

      // ============== AI / LLM training & answer engines ==============
      // OpenAI
      bot("GPTBot"),
      bot("OAI-SearchBot"),
      bot("ChatGPT-User"),
      bot("ChatGPT-User/2.0"),
      // Anthropic
      bot("ClaudeBot"),
      bot("Claude-Web"),
      bot("Claude-SearchBot"),
      bot("Claude-User"),
      bot("anthropic-ai"),
      // Google AI
      bot("Google-Extended"),
      bot("GoogleOther"),
      bot("GoogleOther-Image"),
      bot("GoogleOther-Video"),
      // Perplexity
      bot("PerplexityBot"),
      bot("Perplexity-User"),
      // Microsoft / Bing AI / Copilot
      bot("BingAI"),
      bot("CopilotBot"),
      // Apple Intelligence
      bot("Applebot-Extended"),
      // Meta AI
      bot("Meta-ExternalAgent"),
      bot("Meta-ExternalFetcher"),
      bot("FacebookBot"),
      bot("facebookcatalog"),
      // xAI (Grok)
      bot("xAI-Bot"),
      bot("Grok"),
      // Cohere
      bot("cohere-ai"),
      bot("cohere-training-data-crawler"),
      // Mistral
      bot("MistralAI-User"),
      bot("MistralAI"),
      // DeepSeek
      bot("DeepSeekBot"),
      // Other AI / answer engines
      bot("YouBot"),                  // You.com
      bot("PhindBot"),                // Phind
      bot("KagiBot"),                 // Kagi
      bot("NeevaBot"),                // Neeva (archived but listed)
      bot("Andibot"),                 // Andi
      bot("Komo"),                    // Komo
      bot("Ai2Bot"),                  // Allen Institute for AI
      bot("Ai2Bot-Dolma"),
      bot("Diffbot"),
      bot("Bytespider"),              // TikTok / ByteDance
      bot("ByteDance"),
      bot("DuckAssistBot"),           // DuckDuckGo AI Assist
      bot("Amazonbot"),               // Amazon (Alexa, Rufus AI)
      bot("img2dataset"),             // LAION-style scrapers
      bot("ImagesiftBot"),
      bot("omgili"),
      bot("omgilibot"),
      bot("Webzio-Extended"),

      // ============== Search engines (classic) ==============
      bot("Googlebot"),
      bot("Googlebot-Image"),
      bot("Googlebot-News"),
      bot("Googlebot-Video"),
      bot("Googlebot-Mobile"),
      bot("AdsBot-Google"),
      bot("AdsBot-Google-Mobile"),
      bot("Mediapartners-Google"),
      bot("APIs-Google"),
      bot("FeedFetcher-Google"),
      bot("Storebot-Google"),
      bot("DuplexWeb-Google"),
      bot("Bingbot"),
      bot("BingPreview"),
      bot("MSNBot"),
      bot("MSNBot-Media"),
      bot("Applebot"),
      bot("DuckDuckBot"),
      bot("DuckDuckGo-Favicons-Bot"),
      bot("YandexBot"),
      bot("YandexImages"),
      bot("YandexMobileBot"),
      bot("YandexAccessibilityBot"),
      bot("YandexMetrika"),
      bot("Baiduspider"),
      bot("Baiduspider-image"),
      bot("Baiduspider-mobile"),
      bot("Baiduspider-news"),
      bot("Baiduspider-video"),
      bot("Sogou web spider"),
      bot("Sogou inst spider"),
      bot("Sogou Pic Spider"),
      bot("Exabot"),
      bot("MojeekBot"),
      bot("SeznamBot"),
      bot("PetalBot"),                // Huawei
      bot("Qwantify"),                // Qwant
      bot("StartpageBot"),
      bot("EcosiaBot"),
      bot("BraveBot"),                // Brave Search
      bot("MarginaliaBot"),
      bot("BlexBot"),
      bot("CocCocBot"),               // Vietnam
      bot("Naverbot"),                // Naver (Korea)
      bot("Yeti"),                    // Naver Yeti
      bot("Daum"),                    // Daum (Korea)

      // ============== SEO / marketing / analytics crawlers ==============
      bot("AhrefsBot"),
      bot("AhrefsSiteAudit"),
      bot("SemrushBot"),
      bot("SemrushBot-SA"),
      bot("SemrushBot-BA"),
      bot("SemrushBot-CT"),
      bot("MJ12bot"),                 // Majestic
      bot("rogerbot"),                // Moz
      bot("dotbot"),                  // Moz
      bot("Screaming Frog SEO Spider"),
      bot("SiteAuditBot"),
      bot("Sitebulb"),
      bot("DataForSeoBot"),
      bot("BLEXBot"),
      bot("SerpstatBot"),
      bot("Mangools"),

      // ============== Social / preview bots ==============
      bot("facebookexternalhit"),
      bot("Facebot"),
      bot("Twitterbot"),
      bot("LinkedInBot"),
      bot("Slackbot"),
      bot("Slack-ImgProxy"),
      bot("WhatsApp"),
      bot("TelegramBot"),
      bot("Discordbot"),
      bot("Pinterestbot"),
      bot("Pinterest"),
      bot("redditbot"),
      bot("Tumblr"),
      bot("vkShare"),
      bot("Embedly"),
      bot("Iframely"),
      bot("Bitlybot"),
      bot("OutbrainBot"),
      bot("TaboolaBot"),

      // ============== Academic / research / archival ==============
      bot("CCBot"),                   // Common Crawl
      bot("ia_archiver"),             // Internet Archive (legacy)
      bot("archive.org_bot"),
      bot("Wayback"),
      bot("WaybackMachine"),
      bot("ResearchScan"),
      bot("BUbiNG"),
      bot("OpenAlex"),
      bot("Heritrix"),
      bot("ScholarUniverse"),

      // ============== Validation / accessibility / dev tools ==============
      bot("W3C_Validator"),
      bot("Validator.nu"),
      bot("Lighthouse"),
      bot("Chrome-Lighthouse"),
      bot("GTmetrix"),
      bot("PageSpeed"),
      bot("WebPageTest"),
      bot("Pingdom"),
      bot("UptimeRobot"),
      bot("StatusCake"),

      // ============== Regional / specialised ==============
      bot("ChinasoSpider"),
      bot("Sosospider"),
      bot("YoudaoBot"),
      bot("EasouSpider"),
      bot("LinkdexBot"),
      bot("LinkExaminer"),
    ],
    sitemap: [`${origin}/sitemap.xml`],
    host: origin,
  };
}
