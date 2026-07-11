/* ============================================================================
   Site-wide content & configuration  single source of truth.
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
      "The full lifecycle from disbursement to closure, schedules, accruals, restructures and payoffs.",
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
      "Auto-matches payments, ledgers and gateway settlements  flags breaks before they age.",
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
    "Zero-cost engagement for operators  verification, opt-in and reminders by missed & collect call.",
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
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "GSM", href: "/gsm" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact", href: "/contact" },
];

export interface Office {
  country: string;
  city: string;
  badge?: string;
  description: string;
  address?: string;
  /** [longitude, latitude]  drives the global-presence map markers. */
  coordinates: [number, number];
}

export const OFFICES: Office[] = [
  {
    country: "UAE",
    city: "Dubai",
    badge: "HQ",
    description: "Headquarters  commercial, partnerships and Middle East delivery.",
    address: "Office 1701, Tower BB1, Mazaya Business Avenue, JLT, Dubai, UAE",
    coordinates: [55.27, 25.2],
  },
  {
    country: "India",
    city: "Ahmedabad",
    description: "Engineering and product  the build heart of the platform.",
    address: "Engineering & delivery hub  the build heart of the platform.",
    coordinates: [72.58, 23.03],
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    description: "Africa hub  market delivery and operator partnerships.",
    address: "Africa market delivery & operator partnerships hub.",
    coordinates: [28.04, -26.2],
  },
  {
    country: "USA",
    city: "New York",
    description: "Strategy and capital  investor relations and global partnerships.",
    address: "Strategy, capital & global partnerships office.",
    coordinates: [-74.01, 40.71],
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
      "Our primary market  mobile-money native lending across West, East and Southern Africa.",
  },
  {
    name: "India",
    description: "MSME, consumer and supply-chain credit with NBFC and bank partners.",
  },
  {
    name: "Middle East & GCC",
    description: "HQ in Dubai  Shariah-aware and digital lending for the Gulf.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

/**
 * Homepage hero stats. Order matters for the mobile 2·2·1 rail: the final entry
 * spans the full-width centred row, so the longest label ("Requests at peak
 * scale") is placed last to give its two-line text room to breathe.
 */
export const PLATFORM_STATS: Stat[] = [
  { value: "9", label: "AI-native products" },
  { value: "8 wks", label: "From kickoff to go-live" },
  { value: "3", label: "Regions: Africa · India · ME" },
  { value: "99.9%", label: "Platform availability" },
  { value: "250k+/hr", label: "Requests at peak scale" },
];

export interface Testimonial {
  /** Full quote, verbatim from the live site. */
  quote: string;
  /** Speaker role / title. */
  role: string;
  /** Anonymised company descriptor. */
  company: string;
  /** Short region/segment tag shown as a chip. */
  region: string;
}

/** Client voices  verbatim from photonmatters.com. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PhotonMatters transformed our lending operations. We launched Micro, Consumer, and Commercial products in under six weeks thanks to their flexible platform. More than just a tech vendor, they've proven to be a responsive, strategic partner we count on.",
    role: "Chief Credit Officer",
    company: "Zambia-based lending firm",
    region: "Zambia",
  },
  {
    quote:
      "PhotonMatters scaled effortlessly with our B2B, B2C, and e-commerce lending. It's a world-class platform backed by a responsive, expert team  a true partner in global supply chain finance.",
    role: "Business Manager",
    company: "Enterprise SCF firm",
    region: "Supply Chain Finance",
  },
  {
    quote:
      "PhotonMatters moves fast  and pushes you to move faster. Their platform adapted seamlessly to our complex products and aggressive growth. They didn't just meet expectations  they outpaced them.",
    role: "CEO",
    company: "Middle East lending firm",
    region: "Middle East",
  },
];

/** A single milestone on the "Our Journey" timeline (About page). */
export interface Milestone {
  /** Short display date, e.g. "Jul 2024". */
  date: string;
  /** Headline for the milestone (kept punchy for the node). */
  title: string;
  /** One-sentence expansion shown in the milestone card. */
  body: string;
  /** Lucide icon name (see lib/icons.ts). */
  icon: string;
  /** Optional metric surfaced as a count-up stat, e.g. { value: "6", label: "products live" }. */
  metric?: { value: string; label: string };
  /** Marks the closing milestone so the timeline can ignite gold at the crescendo. */
  climax?: boolean;
}

/**
 * The PhotonMatters story, Jul 2024 → Jun 2026. Ordered oldest-first; the
 * cadence deliberately tightens toward the present, which the Journey
 * timeline section on the About page presents as a spine that draws in.
 */
export const MILESTONES: Milestone[] = [
  {
    date: "Jul 2024",
    title: "Incorporated in Dubai",
    body: "Our journey began with the incorporation of the company in Dubai, UAE, establishing a strong foundation for innovation in digital financial services.",
    icon: "Building2",
  },
  {
    date: "Sep 2024",
    title: "First lending platform live",
    body: "Within months we launched our first lending platform, marking our entry into the fintech ecosystem.",
    icon: "Wallet",
  },
  {
    date: "Nov 2024",
    title: "First client in Africa",
    body: "We secured our first client in Africa, validating our vision and laying the groundwork for regional expansion.",
    icon: "Handshake",
  },
  {
    date: "Mar 2025",
    title: "Six products live in Zambia",
    body: "Momentum accelerated as six products went live in Zambia, demonstrating our ability to deliver at scale.",
    icon: "Boxes",
    metric: { value: "6", label: "products live" },
  },
  {
    date: "Jul 2025",
    title: "BNPL for two NBFIs",
    body: "We empowered two NBFIs with Buy Now, Pay Later capabilities, expanding our portfolio of innovative lending solutions.",
    icon: "CreditCard",
  },
  {
    date: "Jul 2025",
    title: "Dubai office fully operational",
    body: "Our Dubai office became fully operational, strengthening our global presence and operational capabilities.",
    icon: "Landmark",
  },
  {
    date: "Oct 2025",
    title: "First Mobile Money client",
    body: "We signed our first Mobile Money client, marking our strategic expansion into the digital payments ecosystem.",
    icon: "Smartphone",
  },
  {
    date: "Jan 2026",
    title: "New GSM business vertical",
    body: "We launched a new GSM business vertical, broadening our technology offerings and unlocking new growth opportunities.",
    icon: "RadioTower",
  },
  {
    date: "Feb 2026",
    title: "Mobile Money platform live",
    body: "Our Mobile Money platform went live, delivering secure, scalable and seamless digital payment capabilities.",
    icon: "Zap",
  },
  {
    date: "Mar 2026",
    title: "Team of 50 strong",
    body: "Our team grew to 50 talented professionals, reflecting the rapid pace of our business growth and execution.",
    icon: "Users",
    metric: { value: "50", label: "people" },
  },
  {
    date: "Jun 2026",
    title: "Next-generation platform",
    body: "We unveiled our best-in-class next-generation platform, bringing together cutting-edge technology, scalability and innovation to power the future of digital financial services.",
    icon: "Sparkles",
    climax: true,
  },
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
    { label: "Newsroom", href: "/newsroom" },
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
