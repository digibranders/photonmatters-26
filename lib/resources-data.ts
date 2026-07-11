/* ============================================================================
   Resource Centre content: downloadable brochures, datasheets and collateral.
   Files live in /public/downloads and are served directly from the repo. When
   the library grows, swap `file` for an object-storage URL; nothing else here
   or in the page needs to change.
   ========================================================================== */

/** Document taxonomy, used for the badge and (later) the type filter. */
export type ResourceType = "Brochure" | "Datasheet" | "Whitepaper" | "Case study";

export interface ResourceDoc {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  /** Public path to the file (served from /public). */
  file: string;
  /** Uppercase file format shown in the meta row, e.g. "PDF". */
  format: string;
  /** Human-readable file size, e.g. "161 KB". */
  size: string;
  /** Lucide icon name (see lib/icons.ts) for the cover glyph. */
  icon: string;
  /** Marks the flagship document for the featured slot. */
  featured?: boolean;
}

export const RESOURCES: ResourceDoc[] = [
  {
    slug: "photonmatters-brochure",
    title: "PhotonMatters Company Brochure",
    description:
      "A complete overview of the PhotonMatters lending and collections platform: products, architecture, deployment model and the markets we serve.",
    type: "Brochure",
    file: "/downloads/photonmatters-brochure.pdf",
    format: "PDF",
    size: "161 KB",
    icon: "BookOpen",
    featured: true,
  },
];
