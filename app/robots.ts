import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all standard search engine crawlers
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block AI training crawlers — allow search indexing (Googlebot) separately
        userAgent: ["GPTBot", "Google-Extended", "Bytespider", "CCBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://www.photonmatters.io/sitemap.xml",
  };
}
