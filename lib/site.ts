/* ============================================================================
   Site-wide content & configuration — single source of truth.
   All values are verbatim from the PhotonMatters content inventory (Repo A).
   ========================================================================== */

export const SITE = {
  name: "PhotonMatters",
  domain: "photonmatters.io",
  url: "https://www.photonmatters.io",
  email: "hello@photonmatters.io",
  careersEmail: "careers@photonmatters.io",
  phone: "+971 526977485",
  phoneHref: "tel:+971526977485",
  linkedin: "https://www.linkedin.com/company/photonmatters",
  tagline: "Built to Disrupt. Engineered for Scale. Designed to Empower.",
  blurb:
    "AI-native lending & collections technology for banks, NBFCs and telecom operators across Africa, India and the Middle East.",
  regions: "Africa · India · Middle East & GCC",
} as const;

/** Lucide icon name per solution (contextually mapped). */
export type SolutionSlug =
  | "loan-origination"
  | "loan-management"
  | "credit-scoring"
  | "debt-collection"
  | "reconciliation-ai"
  | "collection-marketing-ai"
  | "campaign-management";

export interface SolutionLink {
  slug: SolutionSlug;
  name: string;
  /** Short description used in nav dropdown + footer + hub cards. */
  blurb: string;
  icon: string; // lucide-react icon name
}

/** Ordered exactly as in the live site nav/footer. */
export const SOLUTIONS: SolutionLink[] = [
  {
    slug: "loan-origination",
    name: "Loan Origination",
    blurb:
      "Digital onboarding, KYC/AML, configurable workflows and AI-assisted approvals across every product.",
    icon: "FileText",
  },
  {
    slug: "loan-management",
    name: "Loan Management",
    blurb:
      "The full lifecycle from disbursement to closure — schedules, accruals, restructures and payoffs.",
    icon: "Wallet",
  },
  {
    slug: "credit-scoring",
    name: "Credit Scoring",
    blurb:
      "Explainable AI scores from bureau, telco, cashflow and alternative data for thin-file borrowers.",
    icon: "Gauge",
  },
  {
    slug: "debt-collection",
    name: "Debt Collection",
    blurb:
      "AI-driven recovery that segments, prioritises and automates outreach to lift cure rates.",
    icon: "HandCoins",
  },
  {
    slug: "reconciliation-ai",
    name: "Reconciliation AI",
    blurb:
      "Auto-matches payments, ledgers and gateway settlements — flags breaks before they age.",
    icon: "Scale",
  },
  {
    slug: "collection-marketing-ai",
    name: "Collection Marketing AI",
    blurb:
      "Behaviour-driven nudges and offers that turn reminders into repayments, channel by channel.",
    icon: "BellRing",
  },
  {
    slug: "campaign-management",
    name: "Campaign Management",
    blurb:
      "Design, target and automate lending campaigns across SMS, WhatsApp, email and voice.",
    icon: "Megaphone",
  },
];

export const GSM = {
  href: "/gsm",
  name: "GSM · Missed Call & Collect Call",
  shortName: "GSM",
  blurb:
    "Zero-cost engagement for operators — verification, opt-in and reminders by missed & collect call.",
  icon: "PhoneCall",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "GSM", href: "/gsm" },
  { label: "Contact", href: "/contact" },
];

export interface Office {
  country: string;
  city: string;
  badge?: string;
  description: string;
  address?: string;
}

export const OFFICES: Office[] = [
  {
    country: "UAE",
    city: "Dubai",
    badge: "HQ",
    description: "Headquarters — commercial, partnerships and Middle East delivery.",
    address: "Office 1701, Tower BB1, Mazaya Business Avenue, JLT, Dubai, UAE",
  },
  {
    country: "India",
    city: "Ahmedabad",
    description: "Engineering and product — the build heart of the platform.",
    address: "Engineering & delivery hub — the build heart of the platform.",
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    description: "Africa hub — market delivery and operator partnerships.",
    address: "Africa market delivery & operator partnerships hub.",
  },
  {
    country: "USA",
    city: "New York",
    description: "Strategy and capital — investor relations and global partnerships.",
    address: "Strategy, capital & global partnerships office.",
  },
];

export interface Market {
  name: string;
  description: string;
}

export const MARKETS: Market[] = [
  {
    name: "Africa",
    description:
      "Our primary market — mobile-money native lending across West, East and Southern Africa.",
  },
  {
    name: "India",
    description: "MSME, consumer and supply-chain credit with NBFC and bank partners.",
  },
  {
    name: "Middle East & GCC",
    description: "HQ in Dubai — Shariah-aware and digital lending for the Gulf.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

/** Homepage stats band (verbatim). */
export const PLATFORM_STATS: Stat[] = [
  { value: "9", label: "AI-native products" },
  { value: "250k+/hr", label: "Requests at peak scale" },
  { value: "8 wks", label: "From kickoff to go-live" },
  { value: "3", label: "Regions: Africa · India · ME" },
  { value: "99.9%", label: "Platform availability" },
];

/** Footer link columns. */
export const FOOTER_COLUMNS = {
  solutions: [
    ...SOLUTIONS.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
    { label: "GSM Solutions", href: "/gsm" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "GSM", href: "/gsm" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: `mailto:${SITE.careersEmail}` },
    { label: "LinkedIn", href: SITE.linkedin },
  ],
  offices: [
    { label: "Dubai · HQ", href: "/contact" },
    { label: "Ahmedabad", href: "/contact" },
    { label: "Johannesburg", href: "/contact" },
    { label: "New York", href: "/contact" },
  ],
} as const;
