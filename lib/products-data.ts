/* ============================================================================
   Product detail page content — sourced from the live photonmatters.com
   Products pages. Drives /products/[slug] via one shared template.
   ========================================================================== */

export type ProductSlug =
  | "micro-lending"
  | "consumer-retail-lending"
  | "core-commercial-lending"
  | "supply-chain-finance";

export interface Spec {
  label: string;
  value: string;
}

export interface ProductCategory {
  icon: string;
  title: string;
  description: string;
  specs: Spec[];
}

export interface Differentiator {
  icon: string;
  text: string;
}

export interface ProductExtra {
  icon: string;
  title: string;
  body: string;
}

export interface ProductCrossLink {
  slug: ProductSlug;
  name: string;
  blurb: string;
}

export interface ProductPage {
  slug: ProductSlug;
  name: string;
  /** Short blurb + icon for the Products index + nav. */
  blurb: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    subtitle: string;
    image: string;
  };
  explorer: {
    eyebrow: string;
    heading: string;
    categories: ProductCategory[];
  };
  extras?: {
    eyebrow: string;
    heading: string;
    items: ProductExtra[];
  };
  why?: {
    eyebrow: string;
    heading: string;
    items: Differentiator[];
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    crossLinks: ProductCrossLink[];
  };
}

export const PRODUCT_PAGES: Record<ProductSlug, ProductPage> = {
  "micro-lending": {
    slug: "micro-lending",
    name: "Micro Lending",
    blurb: "High-volume, low-value lending — micro personal, nano, enterprise, group and top-up loans, fully automated.",
    icon: "HandCoins",
    metaTitle: "Micro Lending",
    metaDescription:
      "A microfinance engine built for speed and scale — micro personal, nano/mobile-money, enterprise, top-up and group loans with simplified e-KYC and real-time decisioning.",
    hero: {
      eyebrow: "Products · Micro",
      title: "Micro",
      titleAccent: "Lending.",
      subtitle:
        "Built for speed and scale, our microfinance engine handles high-volume, low-value lending with seamless automation.",
      image:
        "https://images.pexels.com/photos/36096255/pexels-photo-36096255.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    explorer: {
      eyebrow: "Product menu",
      heading: "Every micro-credit product, one engine.",
      categories: [
        {
          icon: "HandCoins",
          title: "Micro Personal Loans",
          description:
            "Small-ticket loans (typically $50–$1,000) offered to individuals with limited credit history.",
          specs: [
            { label: "Tenure", value: "1 to 12 months" },
            { label: "Disbursement", value: "Instant or same day" },
            { label: "KYC", value: "Simplified e-KYC integration" },
            { label: "Use case", value: "Emergency, medical or short-term personal expenses" },
          ],
        },
        {
          icon: "Smartphone",
          title: "Mobile Money (Nano / PAYG)",
          description:
            "Ultralight credit (as low as $5–$100) embedded in digital ecosystems — wallets, telcos and gig platforms.",
          specs: [
            { label: "Repayment", value: "Daily / weekly via mobile" },
            { label: "Use cases", value: "Airtime, transport, food, mobile data" },
            { label: "Decisioning", value: "Real-time scoring + ML" },
            { label: "Audience", value: "Financially excluded users" },
          ],
        },
        {
          icon: "Building2",
          title: "Micro Enterprise Loans",
          description:
            "Working-capital loans for micro and nano businesses, vendors and informal-sector entrepreneurs.",
          specs: [
            { label: "Ticket size", value: "$200–$5,000" },
            { label: "Purpose", value: "Inventory, cash flow, asset purchase" },
            { label: "Underwriting", value: "Alt-data + business cash-flow scoring" },
          ],
        },
        {
          icon: "Repeat",
          title: "Top-Up & Repeat Loans",
          description:
            "Pre-approved or automated credit-line increases based on positive repayment behaviour and dynamic scoring.",
          specs: [
            { label: "STP eligible", value: "Yes" },
            { label: "Retention", value: "Loyalty & engagement-driven" },
            { label: "Integration", value: "Credit bureaus & repayment analytics" },
          ],
        },
        {
          icon: "Users",
          title: "Group Loans (JLG / SHG)",
          description:
            "Loans for self-help groups or joint-liability groups — promoting inclusion among women, rural communities and informal economies.",
          specs: [
            { label: "Model", value: "Peer-guaranteed" },
            { label: "Monitoring", value: "Group repayment analytics" },
            { label: "Channels", value: "Field agents or mobile onboarding" },
          ],
        },
      ],
    },
    extras: {
      eyebrow: "Specialized credit",
      heading: "Connectivity-native credit products.",
      items: [
        { icon: "Signal", title: "Airtime Credit", body: "Instant top-ups, repayable via mobile wallets or salary deduction." },
        { icon: "Wifi", title: "Data Credit", body: "Stay connected with micro-data loans tailored to usage patterns." },
        { icon: "Smartphone", title: "Device Financing", body: "Affordable smartphone and device ownership through flexible EMIs." },
      ],
    },
    cta: {
      eyebrow: "Get started",
      heading: "Launch micro-credit at scale.",
      body: "Design, launch and manage your micro-lending programs your way — API-first, AI-native and live in weeks.",
      crossLinks: [
        { slug: "consumer-retail-lending", name: "Consumer & Retail Lending", blurb: "Personal, BNPL, line of credit and durable financing." },
        { slug: "supply-chain-finance", name: "Supply Chain Finance", blurb: "Anchor-led financing across the supply chain." },
      ],
    },
  },

  "consumer-retail-lending": {
    slug: "consumer-retail-lending",
    name: "Consumer & Retail Lending",
    blurb: "Personal loans, BNPL, lines of credit and durable financing with real-time, AI-driven approvals.",
    icon: "CreditCard",
    metaTitle: "Consumer & Retail Lending",
    metaDescription:
      "An agile consumer lending suite — personal loans, BNPL, lines of credit, consumer-durable and medical financing with real-time approvals, embedded delivery and intelligent decisioning.",
    hero: {
      eyebrow: "Products · Consumer",
      title: "Consumer & Retail",
      titleAccent: "Lending.",
      subtitle:
        "Power every use case — from daily needs to life's big moments — with PhotonMatters' agile lending suite, built for real-time approvals, embedded delivery and intelligent decisioning.",
      image:
        "https://images.pexels.com/photos/9489091/pexels-photo-9489091.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    explorer: {
      eyebrow: "Product menu",
      heading: "Smart credit for every consumer moment.",
      categories: [
        {
          icon: "Wallet",
          title: "Personal Loans",
          description:
            "Unsecured credit up to $50,000 — approved in minutes. Perfect for education, travel, home upgrades or emergencies.",
          specs: [
            { label: "Tenure", value: "6–60 months" },
            { label: "Approval", value: "AI-driven, instant disbursal" },
          ],
        },
        {
          icon: "CreditCard",
          title: "Buy Now, Pay Later (BNPL)",
          description:
            "Flexible, zero-hassle financing at checkout — online or in-store, fully embedded.",
          specs: [
            { label: "Ticket size", value: "$50–$5,000" },
            { label: "Tenure", value: "3–12 months" },
            { label: "Risk", value: "Real-time segmentation" },
          ],
        },
        {
          icon: "Repeat",
          title: "Line of Credit",
          description:
            "Revolving, ready-to-use credit built for flexibility. Ideal for gig workers, freelancers and SMEs.",
          specs: [
            { label: "Access", value: "Draw anytime" },
            { label: "Interest", value: "Pay only on usage" },
            { label: "Pricing", value: "Dynamic repricing with usage insights" },
          ],
        },
        {
          icon: "Smartphone",
          title: "Consumer Durable Loans",
          description: "Low or zero-interest EMI plans for phones, appliances and more.",
          specs: [
            { label: "Tenure", value: "3–24 months" },
            { label: "Profiling", value: "AI-based affordability" },
            { label: "Partners", value: "OEMs, retailers, e-commerce" },
          ],
        },
        {
          icon: "HeartPulse",
          title: "Medical & Emergency Loans",
          description: "Fast-track financing for healthcare, insurance or urgent needs.",
          specs: [
            { label: "Disbursal", value: "Instant, via partner networks" },
            { label: "Channels", value: "Hospitals, insurers, employer platforms" },
            { label: "Pricing", value: "Risk-based with built-in intelligence" },
          ],
        },
      ],
    },
    why: {
      eyebrow: "Why PhotonMatters",
      heading: "Why lenders choose PhotonMatters.",
      items: [
        { icon: "Zap", text: "Instant AI-powered approvals" },
        { icon: "CreditCard", text: "Embedded lending (POS, BNPL, in-app)" },
        { icon: "ShieldCheck", text: "Fraud, KYC & bureau integrations" },
        { icon: "Activity", text: "Behavioural scoring & dynamic limits" },
        { icon: "Workflow", text: "Go live in under 8 weeks with plug-and-play APIs" },
      ],
    },
    cta: {
      eyebrow: "Get started",
      heading: "Embed lending into every journey.",
      body: "Design, launch and manage your consumer-credit products your way — API-first, AI-native and live in weeks.",
      crossLinks: [
        { slug: "micro-lending", name: "Micro Lending", blurb: "High-volume, low-value lending, fully automated." },
        { slug: "core-commercial-lending", name: "Core Commercial Lending", blurb: "Term loans, working capital and asset finance." },
      ],
    },
  },

  "core-commercial-lending": {
    slug: "core-commercial-lending",
    name: "Core Commercial Lending",
    blurb: "Term loans, working capital, overdrafts, invoice and asset finance for businesses of every size.",
    icon: "Landmark",
    metaTitle: "Core Commercial Lending",
    metaDescription:
      "Structured commercial credit — term loans, working capital, overdrafts, invoice financing, equipment and real-estate loans — with AI/ML scoring, embedded compliance and real-time monitoring.",
    hero: {
      eyebrow: "Products · Commercial",
      title: "Core Commercial",
      titleAccent: "Lending.",
      subtitle:
        "Structured credit for businesses — term loans, working capital, overdrafts, invoice and asset finance — with AI/ML scoring, embedded compliance and real-time monitoring.",
      image:
        "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    explorer: {
      eyebrow: "Product menu",
      heading: "The full commercial-credit toolkit.",
      categories: [
        {
          icon: "Landmark",
          title: "Term Loans",
          description: "Structured loans for CAPEX, expansion or strategic investments.",
          specs: [
            { label: "Tenure", value: "1 to 7 years" },
            { label: "Use cases", value: "Equipment, plant setup, infra development" },
            { label: "Repayment", value: "Flexible, ballooning & step-up EMIs" },
            { label: "Risk tools", value: "Cash-flow scoring + collateral valuation" },
          ],
        },
        {
          icon: "Banknote",
          title: "Working Capital Loans",
          description: "Short-term loans to manage cash-flow cycles, procurement or seasonal needs.",
          specs: [
            { label: "Tenure", value: "3 to 18 months" },
            { label: "Variants", value: "Invoice-based, demand loans, cash-credit limits" },
            { label: "Monitoring", value: "Real-time borrower cash-flow tracking" },
            { label: "Add-ons", value: "Top-up, auto-renewal, utilization alerts" },
          ],
        },
        {
          icon: "Wallet",
          title: "Overdrafts & Credit Lines",
          description: "Custom revolving credit products for recurring liquidity support.",
          specs: [
            { label: "Use", value: "Flexible drawdowns, interest on usage" },
            { label: "Ideal for", value: "Manufacturers, traders and service firms" },
            { label: "Controls", value: "Limit reassessment & usage monitoring" },
          ],
        },
        {
          icon: "FileText",
          title: "Invoice Financing / Bill Discounting",
          description: "Advance credit against unpaid invoices to boost working capital.",
          specs: [
            { label: "Tenure", value: "30 to 120 days" },
            { label: "Channel", value: "Direct or anchor-led SCF models" },
            { label: "Credit flow", value: "Seller- or buyer-initiated early payments" },
          ],
        },
        {
          icon: "Truck",
          title: "Equipment & Asset Finance",
          description: "Loans to finance commercial vehicles, machinery and technology assets.",
          specs: [
            { label: "Collateral", value: "Hypothecation or lease model" },
            { label: "Tracking", value: "Integrated with asset registries" },
            { label: "Variants", value: "Hire-purchase, sale-and-leaseback, usage-linked" },
          ],
        },
        {
          icon: "Building2",
          title: "Commercial Real Estate Loans",
          description: "Medium- to long-term financing for property acquisition, development or renovation.",
          specs: [
            { label: "Loan size", value: "$100K to multi-million" },
            { label: "Underwriting", value: "Income-based, rental yield or project cash flow" },
            { label: "Compliance", value: "Property, lien & registration checks" },
          ],
        },
      ],
    },
    why: {
      eyebrow: "Why PhotonMatters",
      heading: "Why PhotonMatters for commercial lending.",
      items: [
        { icon: "BarChart3", text: "AI/ML scoring models for business & financial data" },
        { icon: "Gauge", text: "SME risk grading & sectoral benchmarking" },
        { icon: "Workflow", text: "Custom workflows for lending, renewals & modifications" },
        { icon: "ShieldCheck", text: "Embedded KYC, KYB, credit-bureau & AML checks" },
        { icon: "Activity", text: "Real-time monitoring & early-warning systems" },
        { icon: "Database", text: "Integration with ERPs, GST, bank feeds & registries" },
      ],
    },
    cta: {
      eyebrow: "Get started",
      heading: "Power commercial credit end to end.",
      body: "Design, launch and manage your commercial-lending programs your way — API-first, AI-native and live in weeks.",
      crossLinks: [
        { slug: "supply-chain-finance", name: "Supply Chain Finance", blurb: "Anchor-led financing across the supply chain." },
        { slug: "consumer-retail-lending", name: "Consumer & Retail Lending", blurb: "Real-time, embedded consumer credit." },
      ],
    },
  },

  "supply-chain-finance": {
    slug: "supply-chain-finance",
    name: "Supply Chain Finance",
    blurb: "Anchor-led, ecosystem-integrated financing — invoice discounting, PO, vendor and distributor finance.",
    icon: "Handshake",
    metaTitle: "Supply Chain Finance",
    metaDescription:
      "Structured, anchor-led and ecosystem-integrated supply-chain financing — invoice discounting, PO, vendor (reverse-factoring), distributor and inventory finance — with real-time decisioning and document intelligence.",
    hero: {
      eyebrow: "Products · SCF",
      title: "Supply Chain",
      titleAccent: "Finance.",
      subtitle:
        "Working capital that moves with the supply chain. PhotonMatters enables structured, anchor-led and ecosystem-integrated financing across the entire supply chain — with real-time decisioning, document intelligence and repayment automation.",
      image:
        "https://images.pexels.com/photos/12478756/pexels-photo-12478756.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    explorer: {
      eyebrow: "Product menu",
      heading: "Financing for the whole supply chain.",
      categories: [
        {
          icon: "FileText",
          title: "Invoice Discounting",
          description: "Advance payment on raised invoices to improve supplier cash flow.",
          specs: [
            { label: "Ticket size", value: "$5,000 to $500,000" },
            { label: "Repayment", value: "At invoice maturity, by buyer" },
            { label: "Use case", value: "Post-shipment liquidity for vendors" },
            { label: "Validation", value: "Invoices via OCR + GST / B2B APIs" },
          ],
        },
        {
          icon: "FileCheck",
          title: "Purchase Order (PO) Financing",
          description: "Funding against confirmed orders to support production and delivery.",
          specs: [
            { label: "Stage", value: "Pre-shipment" },
            { label: "Borrowers", value: "SME manufacturers, MSME vendors" },
            { label: "Repayment", value: "From invoice proceeds after delivery" },
            { label: "Smart trigger", value: "Auto-risk on PO, vendor & buyer reliability" },
          ],
        },
        {
          icon: "Handshake",
          title: "Vendor Financing (Reverse Factoring)",
          description: "Suppliers get paid early by the lender; the buyer repays later.",
          specs: [
            { label: "Model", value: "Anchor-led, on buyer's credit strength" },
            { label: "Benefit", value: "Stronger supplier ties, less WC pressure" },
            { label: "Repayment", value: "Buyer pays the lender on the due date" },
            { label: "Digitization", value: "ERP integrations & anchor workflows" },
          ],
        },
        {
          icon: "Truck",
          title: "Distributor / Dealer Financing",
          description: "Credit to distributors or channel partners to purchase goods upfront.",
          specs: [
            { label: "Borrower", value: "Distributor / dealer" },
            { label: "Anchor", value: "Manufacturer or large brand" },
            { label: "Disbursal", value: "Against pro-forma invoice or agreement" },
            { label: "Repayment", value: "By sales velocity or collection cycle" },
          ],
        },
        {
          icon: "Boxes",
          title: "Inventory Financing / Stock Credit",
          description: "Short-term funding backed by stock or warehouse receipts.",
          specs: [
            { label: "Borrower", value: "Retailer or wholesaler" },
            { label: "Security", value: "Physical stock or third-party" },
            { label: "Repayment", value: "Structured EMI or bullet, post-sale" },
          ],
        },
        {
          icon: "Building2",
          title: "Commercial Real Estate Loans",
          description: "Medium- to long-term financing for property acquisition, development or renovation.",
          specs: [
            { label: "Loan size", value: "$100K to multi-million" },
            { label: "Underwriting", value: "Income-based, rental yield or project cash flow" },
            { label: "Compliance", value: "Property, lien & registration checks" },
          ],
        },
      ],
    },
    why: {
      eyebrow: "Why PhotonMatters",
      heading: "Why PhotonMatters for supply-chain finance.",
      items: [
        { icon: "Workflow", text: "Multi-party loan journeys (anchor–borrower–lender)" },
        { icon: "SlidersHorizontal", text: "Custom risk rules per anchor, PO or invoice" },
        { icon: "ScanLine", text: "Document intelligence for invoices, POs & delivery notes" },
        { icon: "Repeat", text: "Automated repayments via wallets or escrows" },
        { icon: "Database", text: "Fully API-ready for ERP, GST & supply-chain integrations" },
        { icon: "Zap", text: "Fast go-live — deploy new programs in 6–8 weeks" },
      ],
    },
    cta: {
      eyebrow: "Get started",
      heading: "Digitize your supply-chain financing.",
      body: "Design, launch and manage anchor-led programs your way — API-first, AI-native and live in 6–8 weeks.",
      crossLinks: [
        { slug: "core-commercial-lending", name: "Core Commercial Lending", blurb: "Term loans, working capital and asset finance." },
        { slug: "micro-lending", name: "Micro Lending", blurb: "High-volume, low-value lending, fully automated." },
      ],
    },
  },
};

export const PRODUCT_LIST: ProductPage[] = Object.values(PRODUCT_PAGES);
