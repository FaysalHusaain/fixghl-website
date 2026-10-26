import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// FixGHL wants to be found, cited and recommended, so search, AI answer and AI training crawlers are all allowed.
// Names checked against vendor documentation in October 2026: OpenAI, Anthropic, Perplexity, Google, Apple, Microsoft, Common Crawl, Meta.
const allowed = [
  "Googlebot", "Google-Extended", "Bingbot", "Applebot", "Applebot-Extended", "DuckDuckBot",
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "Claude-SearchBot", "Claude-User", "ClaudeBot",
  "PerplexityBot", "Perplexity-User",
  "CCBot", "meta-webindexer", "meta-externalagent", "facebookexternalhit",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...allowed.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
