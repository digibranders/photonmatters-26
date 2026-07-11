/* ============================================================================
   Newsroom content: single source of truth for the press room.
   Consumed by app/newsroom/page.tsx (hub) and app/newsroom/[slug]/page.tsx
   (article). Announcements mirror the company MILESTONES in lib/site.ts; each
   article cross-links back to that milestone on the About "Our Journey" trace.
   Authored newest-first (the array order is the display order).
   ========================================================================== */

/** Announcement taxonomy: drives the hub filter chips and the article kicker. */
export type NewsCategory = "Company" | "Expansion" | "Deployment" | "Product";

/** The category filters, in display order (index 0 is the "All" catch-all). */
export const NEWS_CATEGORIES: readonly NewsCategory[] = [
  "Company",
  "Expansion",
  "Deployment",
  "Product",
] as const;

/** A single "At a glance" fact, rendered in the article facts rail. */
export interface NewsFact {
  label: string;
  value: string;
  /** Optional trailing fragment highlighted in brand purple. */
  unit?: string;
}

/** An optional pull-quote surfaced inside the article body. */
export interface NewsQuote {
  text: string;
  /** Optional 2–4 word fragment rendered as a Playfair accent inside the quote. */
  accent?: string;
  attribution: string;
  role?: string;
}

/** A newsroom announcement. */
export interface NewsItem {
  slug: string;
  category: NewsCategory;
  /** Short display date, e.g. "Jul 2025". */
  date: string;
  /** ISO date (first of the month) for <time>, sorting and JSON-LD. */
  dateISO: string;
  /** Optional place-line shown in the article kicker, e.g. "Dubai, UAE". */
  dateline?: string;
  /** Card + article headline. */
  title: string;
  /** Optional trailing Playfair accent fragment of the title. */
  titleAccent?: string;
  /** One-line teaser for cards and the hub lead. */
  excerpt: string;
  /** Lead paragraph (standfirst) shown under the article headline. */
  standfirst: string;
  /** Body paragraphs; the first is rendered with a drop-cap lede. */
  body: string[];
  /** Optional pull-quote. */
  quote?: NewsQuote;
  /** "At a glance" facts rail. */
  facts: NewsFact[];
  /** Lucide icon name (see lib/icons.ts) for the card and hero glyph. */
  icon: string;
  /** 0-based index into MILESTONES (lib/site.ts) for the About-journey link. */
  milestoneIndex: number;
  /** Estimated read time label, e.g. "3 min read". */
  readTime: string;
  /** Marks the lead announcement for the hub's featured slot. */
  featured?: boolean;
}

/**
 * The PhotonMatters press room, newest-first. Two announcements share Jul 2025;
 * the Dubai headquarters opening leads the hub as the flagship company story.
 */
export const NEWS: NewsItem[] = [
  {
    slug: "dubai-headquarters",
    category: "Company",
    date: "Jul 2025",
    dateISO: "2025-07-15",
    dateline: "Dubai, UAE",
    title: "PhotonMatters opens new Dubai headquarters to accelerate",
    titleAccent: "global growth",
    excerpt:
      "The new office in Jumeirah Lake Towers becomes the central hub for operations across the Middle East, Africa and Asia.",
    standfirst:
      "The new headquarters in Jumeirah Lake Towers strengthens the company's presence in one of the world's fastest-growing fintech hubs.",
    body: [
      "PhotonMatters announced the opening of its new headquarters in Jumeirah Lake Towers (JLT), Dubai, strengthening its presence in one of the world's fastest-growing fintech hubs.",
      "The new office represents an important milestone in the company's growth strategy and will serve as the central hub for operations across the Middle East, Africa, Asia and other international markets.",
      "Dubai's vibrant fintech ecosystem, global connectivity and innovation-driven business environment will enable PhotonMatters to work more closely with banks, NBFCs, fintech companies and strategic partners while expanding its regional presence.",
      "The company remains focused on delivering AI-powered lending technology that enables financial institutions to launch products faster, improve operational efficiency and scale with confidence across multiple regulatory environments.",
    ],
    facts: [
      { label: "Opened", value: "July 2025" },
      { label: "Location", value: "Jumeirah Lake Towers, Dubai" },
      { label: "Hub for", value: "Middle East · Africa · Asia" },
      { label: "Focus", value: "Global", unit: "growth" },
    ],
    icon: "Landmark",
    milestoneIndex: 5,
    readTime: "2 min read",
    featured: true,
  },
  {
    slug: "bnpl-for-two-nbfis",
    category: "Product",
    date: "Jul 2025",
    dateISO: "2025-07-01",
    title: "PhotonMatters enables Buy Now, Pay Later for two",
    titleAccent: "financial institutions",
    excerpt:
      "Two NBFIs launch flexible consumer financing on PhotonMatters: configurable credit, automated decisioning and real-time loan management.",
    standfirst:
      "Two Non-Banking Financial Institutions go live with configurable BNPL products on the unified PhotonMatters platform.",
    body: [
      "PhotonMatters announced the successful implementation of its Buy Now, Pay Later (BNPL) platform for two Non-Banking Financial Institutions (NBFIs), expanding its portfolio of digital lending solutions.",
      "The implementation enables the institutions to offer flexible consumer financing through configurable credit products, automated decisioning, digital onboarding and real-time loan management, all delivered through PhotonMatters' unified lending platform.",
      "As consumer demand for embedded finance and digital credit continues to grow, the deployment demonstrates PhotonMatters' capability to support modern lending models while maintaining operational efficiency and regulatory compliance.",
      "This milestone reflects the company's continued commitment to helping financial institutions introduce innovative lending products that improve customer experience and accelerate digital transformation.",
    ],
    facts: [
      { label: "Announced", value: "July 2025" },
      { label: "Clients", value: "Two", unit: "NBFIs" },
      { label: "Product", value: "Buy Now, Pay Later" },
      { label: "Delivered on", value: "Unified lending platform" },
    ],
    icon: "CreditCard",
    milestoneIndex: 4,
    readTime: "2 min read",
  },
  {
    slug: "zambia-six-products-live",
    category: "Deployment",
    date: "Mar 2025",
    dateISO: "2025-03-01",
    dateline: "Zambia",
    title: "Six lending products go live in Zambia in under",
    titleAccent: "eight weeks",
    excerpt:
      "A leading Zambian institution launches Micro, Consumer and Commercial lending across branch, web and mobile channels.",
    standfirst:
      "A leading financial institution launches six lending products across Micro, Consumer and Commercial segments on the PhotonMatters platform.",
    body: [
      "PhotonMatters announced the successful deployment of its digital lending platform for a leading financial institution in Zambia, enabling the launch of six lending products across Micro, Consumer and Commercial lending segments.",
      "Delivered in under eight weeks, the implementation provides a unified platform covering the complete lending lifecycle, including digital onboarding, automated credit decisioning, loan servicing, collections and customer engagement across branch, web and mobile channels.",
      "The implementation highlights PhotonMatters' ability to deliver enterprise-grade lending infrastructure while adapting to local regulatory and operational requirements.",
      "This achievement further strengthens the company's growing presence across Africa and reinforces its position as a trusted technology partner for financial institutions seeking to modernise their lending operations.",
    ],
    facts: [
      { label: "Go-live", value: "Under", unit: "8 weeks" },
      { label: "Products", value: "6", unit: "live" },
      { label: "Segments", value: "Micro · Consumer · Commercial" },
      { label: "Channels", value: "Branch · Web · Mobile" },
    ],
    icon: "Boxes",
    milestoneIndex: 3,
    readTime: "2 min read",
  },
  {
    slug: "first-deployment-in-africa",
    category: "Expansion",
    date: "Nov 2024",
    dateISO: "2024-11-01",
    title: "PhotonMatters expands into Africa with its first platform",
    titleAccent: "deployment",
    excerpt:
      "PhotonMatters onboards its first African customer, establishing the continent as a strategic market for AI-driven lending.",
    standfirst:
      "The company's first customer in Africa marks a significant milestone in its international growth journey.",
    body: [
      "PhotonMatters announced the successful onboarding of its first customer in Africa, marking a significant milestone in the company's international growth journey.",
      "The engagement demonstrates PhotonMatters' ability to deliver modern lending technology tailored to emerging financial markets. The platform enables lenders to automate loan origination, credit assessment, loan management, collections and regulatory workflows through a unified, cloud-first architecture.",
      "The company's expansion into Africa reinforces its commitment to supporting financial institutions with scalable, AI-driven lending infrastructure designed for rapid deployment and long-term growth.",
      "This milestone also establishes Africa as one of PhotonMatters' strategic markets as the company continues to expand its global footprint and empower lenders with faster, more intelligent digital lending solutions.",
    ],
    facts: [
      { label: "Announced", value: "November 2024" },
      { label: "Market", value: "Africa", unit: "first client" },
      { label: "Architecture", value: "Unified, cloud-first" },
      { label: "Scope", value: "Origination → collections" },
    ],
    icon: "Handshake",
    milestoneIndex: 2,
    readTime: "2 min read",
  },
  {
    slug: "photonmatters-launch",
    category: "Company",
    date: "Jul 2024",
    dateISO: "2024-07-01",
    dateline: "Dubai, UAE",
    title: "PhotonMatters launches with a vision to transform global",
    titleAccent: "lending technology",
    excerpt:
      "Founded in Dubai, PhotonMatters sets out to modernise lending for banks, NBFCs and fintechs with AI-powered decisioning.",
    standfirst:
      "The company begins its mission to redefine digital lending through intelligent, cloud-native technology built for the complete lending lifecycle.",
    body: [
      "PhotonMatters today announced its official launch, marking the beginning of its mission to redefine digital lending through intelligent, cloud-native technology. Established in Dubai, the company was founded to help banks, NBFCs, fintechs and financial institutions modernise lending operations with a faster, more scalable and compliance-ready platform.",
      "Built by experienced professionals from the financial technology industry, PhotonMatters combines AI-powered decisioning, configurable workflows and enterprise-grade architecture to simplify the complete lending lifecycle, from customer onboarding and underwriting to loan servicing and collections.",
      "With its launch, PhotonMatters set out to deliver a next-generation lending platform capable of supporting financial institutions across multiple geographies and lending segments, laying the foundation for global expansion in the years ahead.",
    ],
    quote: {
      text: "Our vision has always been to build a lending platform that enables financial institutions to innovate faster while remaining compliant across diverse markets. This milestone marks the beginning of that journey.",
      accent: "compliant across diverse markets",
      // TODO: confirm speaker before publishing (quote provided without attribution).
      attribution: "PhotonMatters",
      role: "Founding team",
    },
    facts: [
      { label: "Announced", value: "July 2024" },
      { label: "Headquarters", value: "Dubai, UAE" },
      { label: "Serves", value: "Banks · NBFCs · Fintechs" },
      { label: "Coverage", value: "Full lending", unit: "lifecycle" },
    ],
    icon: "Sparkles",
    milestoneIndex: 0,
    readTime: "3 min read",
  },
];

/** The featured lead announcement for the hub (falls back to the newest). */
export const FEATURED_NEWS: NewsItem = NEWS.find((n) => n.featured) ?? NEWS[0];

/** Every announcement except the featured lead, preserving newest-first order. */
export const NEWS_REST: NewsItem[] = NEWS.filter((n) => n !== FEATURED_NEWS);

/** Resolve an announcement by slug (undefined when not found). */
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}

/** Older and newer neighbours for the article prev/next rail. */
export function getNewsNeighbours(slug: string): {
  newer?: NewsItem;
  older?: NewsItem;
} {
  const i = NEWS.findIndex((n) => n.slug === slug);
  if (i === -1) return {};
  return { newer: NEWS[i - 1], older: NEWS[i + 1] };
}

/** Up to `count` other announcements, nearest neighbours first. */
export function getRelatedNews(slug: string, count = 2): NewsItem[] {
  const i = NEWS.findIndex((n) => n.slug === slug);
  if (i === -1) return NEWS.slice(0, count);
  return NEWS.filter((_, idx) => idx !== i)
    .sort(
      (a, b) =>
        Math.abs(NEWS.indexOf(a) - i) - Math.abs(NEWS.indexOf(b) - i),
    )
    .slice(0, count);
}
