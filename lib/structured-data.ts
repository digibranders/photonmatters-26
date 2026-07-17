/* ============================================================================
   Structured-data (schema.org / JSON-LD) builders  single source of truth.
   Keep every @type here so markup stays consistent across routes.
   ========================================================================== */

import { SITE } from "@/lib/site";

const AREA_SERVED = ["Africa", "India", "Middle East", "GCC"] as const;

/** A crawlable breadcrumb trail. Home is prepended automatically. */
export function breadcrumbList(
  items: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** A B2B service / platform module (solutions and products). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${SITE.url}${opts.path}`,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: [...AREA_SERVED],
  };
}
