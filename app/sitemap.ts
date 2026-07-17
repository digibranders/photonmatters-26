import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/lib/site";
import { PRODUCT_LIST } from "@/lib/products-data";
import { NEWS } from "@/lib/news-data";

const BASE = "https://www.photonmatters.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gsm`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/newsroom`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCT_LIST.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = NEWS.map((n) => ({
    url: `${BASE}/newsroom/${n.slug}`,
    // Use the article's own publish date so crawlers see accurate freshness.
    lastModified: new Date(n.dateISO),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...solutionRoutes, ...productRoutes, ...newsRoutes];
}
