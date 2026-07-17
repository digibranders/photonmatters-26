import type { MetadataRoute } from "next";

const BASE = "https://www.photonmatters.io";

/**
 * Only the production deployment on the canonical domain may be indexed.
 *
 * Vercel sets `VERCEL_ENV` to "production" exclusively for `main`-branch
 * production deploys (automatic deploys are disabled for every other branch in
 * vercel.json). Until the site is live on the canonical domain, we return a
 * blanket disallow so preview/development URLs never enter a search index.
 *
 * Host-level protection for `*.vercel.app` production aliases and the apex
 * domain is enforced separately via `X-Robots-Tag` in middleware.ts.
 */
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    // AI crawlers (GPTBot, CCBot, Google-Extended, PerplexityBot, ClaudeBot, …)
    // are intentionally allowed for GEO/AEO reach. Only the API is off-limits.
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
