/* ============================================================================
   Solution detail page content  verbatim from Repo A.
   Drives /solutions/[slug] via one shared template.
   ========================================================================== */

import type { SolutionSlug } from "@/lib/site";

export interface Capability {
  /** Lucide icon name resolved via getIcon() in the data/content layer. */
  icon: string;
  title: string;
  body: string;
}

export interface Step {
  n: string;
  title: string;
  body: string;
}

export interface OutcomeStat {
  value: string;
  label: string;
}

export interface CrossLink {
  slug: SolutionSlug | "gsm";
  name: string;
  blurb: string;
}

export interface SolutionPage {
  slug: SolutionSlug;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    /** Optional trailing fragment rendered as a Playfair accent. */
    titleAccent?: string;
    subtitle: string;
    image: string;
  };
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    checklist: { lead: string; text?: string }[];
    image: { src: string; caption: string };
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    subtitle?: string;
    cards: Capability[];
  };
  how: {
    eyebrow: string;
    heading: string;
    steps: Step[];
  };
  outcomes: {
    eyebrow: string;
    heading: string;
    stats: OutcomeStat[];
  };
  cta: {
    eyebrow: string;
    heading: string;
    /** Trailing fragment of the heading rendered as a Playfair gold accent. */
    headingAccent?: string;
    body: string;
    crossLinks: CrossLink[];
  };
  /** Optional interactive feature explorer ("What you can do"). */
  featureShowcase?: {
    eyebrow?: string;
    heading: string;
    items: { icon: string; title: string; body: string; visual: string }[];
  };
}

export const SOLUTION_PAGES: Record<SolutionSlug, SolutionPage> = {
  "loan-origination": {
    slug: "loan-origination",
    metaTitle: "Loan Origination",
    metaDescription:
      "Digital loan origination with eKYC, OCR document capture, a configurable product builder and a decision engine that pulls bureau and alternative data — from application to disbursement in minutes.",
    hero: {
      eyebrow: "Solutions · Origination",
      title: "Loan",
      titleAccent: "Origination",
      subtitle:
        "Take a borrower from application to disbursement in minutes — digital onboarding, eKYC, OCR capture and a rules engine that pulls bureau and alternative data to decide in real time.",
      image:
        "https://images.pexels.com/photos/4908621/pexels-photo-4908621.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "Overview",
      heading: "One front door for every lending product.",
      paragraphs: [
        "PhotonMatters origination handles the full intake journey across every channel a borrower might use — a web form, a mobile app, a USSD session on a feature phone, or an agent in a kiosk. The same configurable flow captures the application, verifies identity, scores the borrower and produces an offer.",
        "Because the product builder, rules and data pulls are all configurable, you launch a new loan product or enter a new market without re-coding the pipeline — and approve thin-file borrowers the old system would reject.",
      ],
      checklist: [
        { lead: "Web, mobile, USSD & agent channels" },
        { lead: "Configurable products, no re-coding" },
        { lead: "Bureau & alternative-data decisioning" },
        { lead: "Offer generation with e-sign" },
      ],
      image: {
        src: "https://images.pexels.com/photos/33763153/pexels-photo-33763153.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Onboarding session · Lagos, Nigeria",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Everything intake needs, in one module.",
      cards: [
        {
          icon: "Smartphone",
          title: "Digital onboarding",
          body: "A single application flow across web, mobile, USSD and agent channels — built for low-bandwidth markets.",
        },
        {
          icon: "ShieldCheck",
          title: "eKYC & AML",
          body: "Identity verification, sanctions and PEP screening, and watchlist checks wired into the journey.",
        },
        {
          icon: "ScanLine",
          title: "Document capture & OCR",
          body: "Snap an ID or payslip and the engine extracts, validates and files the data automatically.",
        },
        {
          icon: "SlidersHorizontal",
          title: "Configurable product builder",
          body: "Define amounts, tenors, pricing, fees and eligibility for a new product without engineering.",
        },
        {
          icon: "Workflow",
          title: "Decision & rules engine",
          body: "Pulls bureau and alternative data, then approves, declines or refers against your policy rules.",
        },
        {
          icon: "FileSignature",
          title: "Offer generation & e-sign",
          body: "Produce a compliant offer with terms the borrower accepts and signs digitally on the spot.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "Apply → Verify → Decide → Disburse.",
      steps: [
        {
          n: "01",
          title: "Apply",
          body: "The borrower starts on web, mobile, USSD or with an agent and submits the application.",
        },
        {
          n: "02",
          title: "Verify",
          body: "eKYC, AML screening and OCR document capture confirm identity and extract the data.",
        },
        {
          n: "03",
          title: "Decide",
          body: "The rules engine pulls bureau and alternative data and returns an approve, decline or refer.",
        },
        {
          n: "04",
          title: "Disburse",
          body: "The borrower e-signs the offer and funds release to bank, wallet or mobile money.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Faster decisions, fewer drop-offs, more approvals.",
      stats: [
        { value: "Minutes", label: "from application to a credit decision, not days" },
        { value: "More approvals", label: "of thin-file borrowers using alternative data" },
        { value: "Lower drop-off", label: "with a short, channel-native onboarding flow" },
      ],
    },
    cta: {
      eyebrow: "Explore the lifecycle",
      heading: "Origination is the first step. We run the rest too.",
      headingAccent: "We run the rest too.",
      body: "Pair origination with explainable scoring and full-lifecycle servicing to run the whole credit journey on one platform.",
      crossLinks: [
        {
          slug: "credit-scoring",
          name: "Credit Scoring",
          blurb: "Explainable AI scores from bureau, telco and cashflow data.",
        },
        {
          slug: "loan-management",
          name: "Loan Management",
          blurb: "Service every loan from disbursement through to closure.",
        },
      ],
    },
  },

  "loan-management": {
    slug: "loan-management",
    metaTitle: "Loan Management",
    metaDescription:
      "Full-lifecycle loan servicing  disbursement, repayment schedules and restructuring, interest and fee accruals, delinquency bucketing, multi-currency GL postings and borrower notifications.",
    hero: {
      eyebrow: "Solutions · Servicing",
      title: "Loan",
      titleAccent: "Management",
      subtitle:
        "Run every loan from disbursement to closure  schedules, restructures, accruals, delinquency buckets and multi-currency GL postings  on an engine that keeps your books accurate and your ops lean.",
      image:
        "https://images.pexels.com/photos/7640793/pexels-photo-7640793.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "Overview",
      heading: "The system of record for the whole loan life.",
      paragraphs: [
        "Once a loan is booked, PhotonMatters loan management owns its entire lifecycle. It disburses funds, builds and maintains the repayment schedule, accrues interest and fees, applies repayments, buckets delinquency, and posts every movement to the general ledger  across multiple currencies and books.",
        "Restructures, reschedules and write-offs are handled inside the same ledger, so the books stay accurate and auditable while your team spends far less time on manual reconciliation and spreadsheet corrections.",
      ],
      checklist: [
        { lead: "Disbursement to closure in one engine" },
        { lead: "Multi-currency GL postings" },
        { lead: "Restructures & reschedules built in" },
        { lead: "Automated borrower notifications" },
      ],
      image: {
        src: "https://images.pexels.com/photos/6077545/pexels-photo-6077545.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Servicing team at work",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Servicing, accounting and collections-ready in one place.",
      cards: [
        {
          icon: "Banknote",
          title: "Disbursement & funding",
          body: "Release funds to bank, wallet or mobile money and track funding lines against each loan.",
        },
        {
          icon: "CalendarClock",
          title: "Schedules & restructuring",
          body: "Generate repayment schedules and reschedule, top-up or restructure without breaking the books.",
        },
        {
          icon: "Percent",
          title: "Interest & fee accruals",
          body: "Accrue interest, penalties and fees on flexible day-count and pricing rules, daily and on demand.",
        },
        {
          icon: "Layers",
          title: "Delinquency bucketing",
          body: "Age past-due loans into buckets and trigger provisioning and collections workflows automatically.",
        },
        {
          icon: "BookOpen",
          title: "GL postings & multi-currency",
          body: "Double-entry postings to your general ledger across currencies, books and accounting periods.",
        },
        {
          icon: "BellRing",
          title: "Borrower notifications",
          body: "Automated due-date, receipt and arrears alerts over SMS, WhatsApp, email and voice.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "Disburse → Service → Collect → Close.",
      steps: [
        {
          n: "01",
          title: "Disburse",
          body: "Funds release and the loan books with its opening schedule and ledger entries.",
        },
        {
          n: "02",
          title: "Service",
          body: "Accruals run, repayments apply, and restructures and top-ups keep the schedule current.",
        },
        {
          n: "03",
          title: "Collect",
          body: "Past-due loans bucket and feed notifications and collections workflows automatically.",
        },
        {
          n: "04",
          title: "Close",
          body: "On full repayment or write-off the loan settles and the ledger closes out cleanly.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Automated lifecycle, accurate books, leaner ops.",
      stats: [
        { value: "Full lifecycle", label: "automated from disbursement to closure" },
        { value: "Accurate books", label: "real-time GL postings, audit-ready" },
        { value: "Fewer manual ops", label: "less spreadsheet work and reconciliation" },
      ],
    },
    cta: {
      eyebrow: "Connect the lifecycle",
      heading: "Service, recover and reconcile on one platform.",
      headingAccent: "on one platform.",
      body: "Feed booked loans straight from origination, push delinquent accounts into collections, and keep the ledger square with reconciliation AI.",
      crossLinks: [
        {
          slug: "loan-origination",
          name: "Loan Origination",
          blurb: "Book new loans straight into servicing.",
        },
        {
          slug: "debt-collection",
          name: "Debt Collection",
          blurb: "Recover delinquent accounts with AI-driven outreach.",
        },
        {
          slug: "reconciliation-ai",
          name: "Reconciliation AI",
          blurb: "Auto-match payments and settlements to keep books square.",
        },
      ],
    },
  },

  "credit-scoring": {
    slug: "credit-scoring",
    metaTitle: "Credit Scoring",
    metaDescription:
      "Explainable AI credit scoring that reads bureau, telco, cashflow and behavioural data to score thin-file and unbanked borrowers in sub-second time.",
    hero: {
      eyebrow: "Credit Scoring",
      title: "Score the borrowers",
      titleAccent: "the old models can’t see.",
      subtitle:
        "Explainable AI scoring that combines bureau, telco, cashflow and behavioural data to extend fair credit to thin-file and unbanked borrowers  with reason codes regulators can audit.",
      image:
        "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "The Overview",
      heading: "A risk model for people with no file.",
      paragraphs: [
        "Traditional scorecards need years of bureau history, payslips and collateral  exactly what a first-time borrower in an emerging market doesn’t have. PhotonMatters Credit Scoring reads the signals the legacy system ignores: airtime top-ups, mobile-money flows, repayment behaviour and device patterns, alongside any bureau data that exists.",
        "Every score ships with reason codes and feature contributions, so risk teams and regulators see exactly why a decision was made. Champion/challenger lets you test new models safely against live traffic  no black boxes, no surprises.",
      ],
      checklist: [
        { lead: "Thin-file ready", text: "score borrowers with little or no bureau history." },
        { lead: "Reason codes on every score", text: "fully explainable and auditable." },
        { lead: "Sub-second API", text: "scores returned in real time at 250k+ requests/hour." },
        { lead: "Champion/challenger", text: "test and promote models against live traffic." },
      ],
      image: {
        src: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Risk analytics in production",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Everything you need to score with confidence.",
      subtitle:
        "From raw data ingestion to a live scoring endpoint  the full pipeline, explainable end to end.",
      cards: [
        {
          icon: "Database",
          title: "Bureau + alternative data ingestion",
          body: "Pull credit bureau records and blend them with alternative sources through pre-built connectors and a clean ingestion layer.",
        },
        {
          icon: "Signal",
          title: "Telco & cashflow features",
          body: "Turn airtime top-ups, mobile-money inflows and recharge patterns into stable, predictive features for the unbanked.",
        },
        {
          icon: "Activity",
          title: "Behavioural & device signals",
          body: "Repayment history, application behaviour and device-level signals add a real-time risk dimension legacy models miss.",
        },
        {
          icon: "Lightbulb",
          title: "Explainable models with reason codes",
          body: "Every score returns ranked reason codes and feature contributions, so analysts and regulators see the why behind each decision.",
        },
        {
          icon: "FlaskConical",
          title: "Scorecards & champion/challenger",
          body: "Build configurable scorecards and run new models in shadow against the champion before promoting them safely to live.",
        },
        {
          icon: "Zap",
          title: "Real-time scoring API (sub-second)",
          body: "A single REST endpoint returns a score, band and reason codes in under a second  built for 250k+ requests/hour.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "From raw signals to a decision you can defend.",
      steps: [
        {
          n: "01",
          title: "Ingest data",
          body: "Pull bureau, telco, cashflow and application data through connectors into a unified, deduplicated record.",
        },
        {
          n: "02",
          title: "Engineer features",
          body: "Transform raw signals into hundreds of stable, monitored features  from repayment ratios to recharge cadence.",
        },
        {
          n: "03",
          title: "Score & explain",
          body: "Models return a score, risk band and ranked reason codes in sub-second time, every call fully traceable.",
        },
        {
          n: "04",
          title: "Decide",
          body: "Feed the score into origination policy  approve, price or refer  with a full audit trail for every outcome.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Score more people, faster, and prove it.",
      stats: [
        { value: "1 phone", label: "Score the unbanked from alternative data alone  no bureau file or payslip required." },
        { value: "250k+/hr", label: "Sub-second scoring at peak load, so decisioning never becomes the bottleneck." },
        { value: "100%", label: "Audit-ready and compliant  every score carries reason codes for regulators and risk teams." },
      ],
    },
    cta: {
      eyebrow: "Put scoring to work",
      heading: "See explainable scoring on your data.",
      headingAccent: "on your data.",
      body: "Bring a sample portfolio and we’ll show you the lift from alternative data and reason codes in a working demo.",
      crossLinks: [
        {
          slug: "loan-origination",
          name: "Loan Origination",
          blurb: "Feed scores straight into onboarding and approvals.",
        },
        {
          slug: "debt-collection",
          name: "Debt Collection",
          blurb: "Use risk signals to prioritise recovery and outreach.",
        },
      ],
    },
  },

  "debt-collection": {
    slug: "debt-collection",
    metaTitle: "Debt Collection",
    metaDescription:
      "AI-driven debt collection and recovery that segments accounts, prioritises strategy and automates omnichannel outreach to lift cure rates and cut cost-to-collect.",
    hero: {
      eyebrow: "Debt Collection",
      title: "Recover more,",
      titleAccent: "at a lower cost to collect.",
      subtitle:
        "AI-driven collections that segment every account by propensity to pay, choose the right strategy, and engage borrowers across SMS, WhatsApp, voice and agents  so the right action reaches the right account at the right time.",
      image:
        "https://images.pexels.com/photos/9487235/pexels-photo-9487235.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "The Overview",
      heading: "Stop treating every delinquent account the same.",
      paragraphs: [
        "Blanket call lists and one-size-fits-all reminders burn agent hours on accounts that would have self-cured, while genuinely at-risk borrowers slip into deeper arrears. PhotonMatters Debt Collection scores each account on propensity to pay, then routes it to the strategy and channel most likely to recover  automatically.",
        "Low-effort accounts get a gentle digital nudge; high-risk ones get prioritised agent and field action. Promise-to-pay is tracked end to end, settlements are managed in-platform, and every interaction feeds dashboards that show exactly what is working  by segment, channel and team.",
      ],
      checklist: [
        { lead: "Propensity-driven", text: "focus effort where recovery is most likely." },
        { lead: "Omnichannel", text: "SMS, WhatsApp, voice and agents from one strategy." },
        { lead: "Promise-to-pay tracking", text: "commitments followed up automatically." },
        { lead: "Live dashboards", text: "recovery, cure and cost-to-collect at a glance." },
      ],
      image: {
        src: "https://images.pexels.com/photos/8681899/pexels-photo-8681899.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Collections agent at work",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "A full recovery engine, end to end.",
      subtitle:
        "From segmentation to settlement  every stage of the collections journey in one platform.",
      cards: [
        {
          icon: "Users",
          title: "Account segmentation & propensity-to-pay",
          body: "Score every delinquent account on the likelihood it will pay, and cluster accounts into segments with shared risk and behaviour.",
        },
        {
          icon: "Target",
          title: "Prioritisation & strategy engine",
          body: "Rules and models decide which accounts to work first and which strategy to apply, so agent and channel capacity goes where it pays off.",
        },
        {
          icon: "MessagesSquare",
          title: "Omnichannel outreach",
          body: "Reach borrowers on SMS, WhatsApp, voice and live agents from a single orchestration layer  with channel chosen by propensity.",
        },
        {
          icon: "CalendarCheck",
          title: "Promise-to-pay tracking",
          body: "Capture commitments, schedule automatic follow-ups, and flag broken promises the moment a payment date is missed.",
        },
        {
          icon: "Headset",
          title: "Agent & field-collection workflows",
          body: "Queue work, script conversations and route field visits with mobile workflows that keep desk and field teams in sync.",
        },
        {
          icon: "LayoutDashboard",
          title: "Settlement & dashboards",
          body: "Negotiate and book settlements in-platform, and track recovery, cure rates and cost-to-collect on live dashboards.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "A closed loop from delinquency to recovery.",
      steps: [
        {
          n: "01",
          title: "Segment",
          body: "Score and cluster delinquent accounts by propensity to pay, balance, bucket and behaviour.",
        },
        {
          n: "02",
          title: "Prioritise",
          body: "The strategy engine ranks accounts and assigns the right treatment, channel and timing to each.",
        },
        {
          n: "03",
          title: "Engage",
          body: "Reach borrowers across SMS, WhatsApp, voice and agents, capturing promises to pay as you go.",
        },
        {
          n: "04",
          title: "Recover",
          body: "Book payments and settlements, then feed outcomes back to sharpen the next cycle’s strategy.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Better recovery economics, book after book.",
      stats: [
        { value: "Higher", label: "Cure rates  propensity targeting puts the right treatment on accounts most likely to recover." },
        { value: "Lower", label: "Cost-to-collect  digital channels handle self-curing accounts and free agents for the hard cases." },
        { value: "Fewer", label: "Roll-forwards  early, well-targeted action keeps accounts from sliding into deeper buckets." },
      ],
    },
    cta: {
      eyebrow: "Lift your recovery",
      heading: "See AI collections on your portfolio.",
      headingAccent: "on your portfolio.",
      body: "Share a sample of your delinquent book and we’ll model the cure-rate and cost-to-collect impact in a working demo.",
      crossLinks: [
        {
          slug: "collection-marketing-ai",
          name: "Collection Marketing AI",
          blurb: "Behaviour-driven nudges that turn reminders into repayments.",
        },
        {
          slug: "reconciliation-ai",
          name: "Reconciliation AI",
          blurb: "Match recovered payments to ledgers automatically.",
        },
      ],
    },
  },

  "reconciliation-ai": {
    slug: "reconciliation-ai",
    metaTitle: "Reconciliation AI",
    metaDescription:
      "AI auto-reconciliation that matches payments, ledgers and gateway settlements, flags breaks before they age, and closes the books faster.",
    hero: {
      eyebrow: "Reconciliation AI",
      title: "Books that",
      titleAccent: "balance themselves.",
      subtitle:
        "AI auto-reconciliation that matches payments, ledgers and gateway settlements at scale  flagging breaks before they age and turning month-end into a non-event.",
      image:
        "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "Overview",
      heading: "Every rupee, naira and dirham accounted for.",
      paragraphs: [
        "Lenders in emerging markets receive money through a tangle of channels  bank transfers, PSP gateways, mobile-money wallets and cash agents  each with its own file format, cut-off time and fee logic. Reconciliation AI ingests them all, matches each inflow to the right loan, instalment and ledger entry, and surfaces only the genuine exceptions.",
        "What used to take a team of analysts days of spreadsheet work now runs continuously in the background. Breaks are detected the moment they appear, aged automatically, and routed to the right resolution workflow  so leakage is caught early and the close happens on time.",
      ],
      checklist: [
        { lead: "Near-zero manual matching", text: "AI handles the long tail of partial, batched and out-of-order payments." },
        { lead: "Faster month-end close", text: "continuous reconciliation replaces the end-of-period scramble." },
        { lead: "Fewer leakages", text: "every break is aged, owned and resolved with a full audit trail." },
      ],
      image: {
        src: "https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Continuous, AI-driven reconciliation",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Everything you need to reconcile at scale.",
      subtitle:
        "From raw multi-source ingestion to a board-ready audit trail  one engine for the whole reconciliation lifecycle.",
      cards: [
        {
          icon: "Database",
          title: "Multi-source ingestion",
          body: "Bank statements, core-ledger entries and PSP / mobile-money settlement files  any format, any cadence, normalised on the way in.",
        },
        {
          icon: "GitCompareArrows",
          title: "AI auto-matching",
          body: "Models match one-to-one, one-to-many and many-to-many  handling fees, FX, partial and batched payments without rigid rules.",
        },
        {
          icon: "TriangleAlert",
          title: "Exception & break detection",
          body: "Unmatched, duplicated, short-paid and over-paid items are isolated instantly, so analysts only ever touch real discrepancies.",
        },
        {
          icon: "Timer",
          title: "Break aging & resolution",
          body: "Every break is aged into buckets, assigned an owner, and tracked through a configurable resolution workflow with SLAs.",
        },
        {
          icon: "FolderInput",
          title: "Allocation & suspense",
          body: "Payments are allocated to the correct loan and instalment; unidentified funds park in suspense and clear automatically when matched.",
        },
        {
          icon: "FileCheck",
          title: "Audit trail & reporting",
          body: "Immutable, time-stamped history of every match and adjustment  with reconciliation dashboards built for finance and auditors.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "Four steps, running continuously.",
      steps: [
        {
          n: "01",
          title: "Ingest",
          body: "Pull in bank statements, ledger entries and PSP / mobile-money settlements; normalise formats and currencies.",
        },
        {
          n: "02",
          title: "Match",
          body: "AI auto-matches inflows to loans, instalments and ledger lines across complex many-to-many relationships.",
        },
        {
          n: "03",
          title: "Flag exceptions",
          body: "Unmatched and discrepant items are isolated, aged and routed to the right owner with an SLA clock.",
        },
        {
          n: "04",
          title: "Resolve",
          body: "Workflows clear breaks, post adjustments and update the ledger  leaving a complete, auditable trail.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Less time reconciling. Less money lost.",
      stats: [
        { value: "~0", label: "Near-zero manual matching  analysts focus only on genuine exceptions instead of spreadsheets." },
        { value: "Days → hrs", label: "Faster month-end close  continuous reconciliation replaces the end-of-period scramble." },
        { value: "Fewer", label: "Fewer leakages  breaks are caught and aged early, before they become write-offs." },
      ],
    },
    cta: {
      eyebrow: "See it on your data",
      heading: "Reconcile a real settlement file with us.",
      headingAccent: "with us.",
      body: "Bring a day of your bank, PSP and mobile-money files. We’ll show you what auto-matches, what breaks, and how much faster your close could be.",
      crossLinks: [
        {
          slug: "loan-management",
          name: "Loan Management",
          blurb: "Schedules, accruals and payoffs that reconciliation feeds.",
        },
        {
          slug: "debt-collection",
          name: "Debt Collection",
          blurb: "Cleaner balances mean sharper recovery prioritisation.",
        },
      ],
    },
  },

  "collection-marketing-ai": {
    slug: "collection-marketing-ai",
    metaTitle: "Collection Marketing AI",
    metaDescription:
      "Behaviour-driven nudges that turn reminders into repayments  personalised self-cure journeys that lift recovery and cut collection cost.",
    hero: {
      eyebrow: "Collection Marketing AI",
      title: "Turn reminders into",
      titleAccent: "repayments.",
      subtitle:
        "Behaviour-driven nudges that reach the right borrower, on the right channel, at the right moment  so more of them self-cure before an agent ever has to call.",
      image:
        "https://images.pexels.com/photos/37274979/pexels-photo-37274979.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "Overview",
      heading: "Most overdue borrowers want to pay  they just need the right nudge.",
      paragraphs: [
        "Treating every missed instalment the same way wastes money and annoys good customers. Collection Marketing AI reads repayment behaviour and intent, then crafts a message  tone, offer, channel and timing  tuned to each individual. The result is a quiet, respectful nudge that gets paid, not an aggressive dunning call.",
        "By moving recovery upstream into self-cure, you keep expensive human agents and legal action for the small minority who truly need them  while everyone else clears their balance from the comfort of their own phone.",
      ],
      checklist: [
        { lead: "More self-cure", text: "borrowers repay on their own before manual collections kick in." },
        { lead: "Fewer DPD roll-forwards", text: "accounts cure early instead of sliding into deeper delinquency buckets." },
        { lead: "Lower collection cost", text: "automated nudges cost a fraction of agent calls and field visits." },
      ],
      image: {
        src: "https://images.pexels.com/photos/139387/pexels-photo-139387.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Self-cure, one nudge at a time · Kano",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "A marketing engine pointed at recovery.",
      subtitle:
        "Segmentation, personalisation and measurement  the full performance-marketing toolkit, purpose-built for collections.",
      cards: [
        {
          icon: "Users",
          title: "Behavioural segmentation",
          body: "Group borrowers by repayment history, channel response and intent signals  not just by days-past-due buckets.",
        },
        {
          icon: "Target",
          title: "Next-best-action engine",
          body: "For every account, the model picks the action most likely to drive payment  a reminder, an offer, a plan, or a pause.",
        },
        {
          icon: "Clock",
          title: "Channel & send-time optimisation",
          body: "Reach each borrower on the channel they respond to  SMS, WhatsApp, voice or missed call  at the hour they’re most likely to act.",
        },
        {
          icon: "Wand2",
          title: "Tone & offer personalisation",
          body: "Adapt language, empathy and incentives  a gentle nudge here, a settlement or part-payment offer there  to each segment.",
        },
        {
          icon: "TrendingUp",
          title: "A/B testing & uplift measurement",
          body: "Test messages, offers and timing against holdouts to prove genuine incremental recovery  not just activity.",
        },
        {
          icon: "Route",
          title: "Self-cure journeys",
          body: "Automated, multi-step journeys with payment links and plan options that let borrowers resolve overdue balances on their own.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "From signal to repayment in four steps.",
      steps: [
        {
          n: "01",
          title: "Understand",
          body: "Read repayment behaviour, intent and channel response to segment overdue accounts by likelihood to cure.",
        },
        {
          n: "02",
          title: "Personalise",
          body: "Choose the next-best action, then tailor tone, offer, channel and send-time to each borrower.",
        },
        {
          n: "03",
          title: "Nudge",
          body: "Deliver the message with a payment link or plan option, and run multi-step self-cure journeys automatically.",
        },
        {
          n: "04",
          title: "Convert",
          body: "Measure uplift against holdouts, learn what works, and re-target only the accounts that still need a human touch.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "More cures, earlier, for less.",
      stats: [
        { value: "More", label: "Self-cure rate  borrowers clear balances on their own, before manual collections begin." },
        { value: "Fewer", label: "DPD roll-forwards  accounts cure early instead of sliding into deeper delinquency." },
        { value: "Lower", label: "Cost to collect  automated nudges replace a large share of agent calls and field visits." },
      ],
    },
    cta: {
      eyebrow: "See the uplift",
      heading: "Run a self-cure pilot on your book.",
      headingAccent: "on your book.",
      body: "We’ll set up a behaviour-driven journey against a holdout group and measure the incremental recovery  so the uplift is proven, not assumed.",
      crossLinks: [
        {
          slug: "debt-collection",
          name: "Debt Collection",
          blurb: "Hand off the hard cases to AI-driven recovery and agent workflows.",
        },
        {
          slug: "campaign-management",
          name: "Campaign Management",
          blurb: "Orchestrate journeys across every channel from one console.",
        },
      ],
    },
  },

  "campaign-management": {
    slug: "campaign-management",
    metaTitle: "Campaign Management",
    metaDescription:
      "Design, target and automate lending campaigns across SMS, WhatsApp, email, voice and missed call  with consent, throttling and real-time attribution.",
    hero: {
      eyebrow: "Campaign Management",
      title: "Design, target and automate",
      titleAccent: "every lending campaign.",
      subtitle:
        "One console to build audiences, orchestrate journeys across SMS, WhatsApp, email, voice and missed call  and prove the ROI of every send.",
      image:
        "https://images.pexels.com/photos/9489091/pexels-photo-9489091.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    overview: {
      eyebrow: "Overview",
      heading: "From acquisition to lifecycle, all in one place.",
      paragraphs: [
        "Acquiring and retaining borrowers in emerging markets means meeting them where they already are  SMS, WhatsApp, voice and missed call. Campaign Management lets growth and lifecycle teams build precise audiences, design multi-step journeys, and launch across every channel without stitching together separate point tools.",
        "Consent, throttling and compliance are built in from the start, and real-time analytics tie every message back to applications, disbursals and repayments  so you can see which campaigns actually move the book, not just open rates.",
      ],
      checklist: [
        { lead: "Targeted acquisition", text: "reach the right segments with the right offer across every channel." },
        { lead: "Automated lifecycle comms", text: "onboarding, cross-sell, renewal and win-back journeys run themselves." },
        { lead: "Measurable ROI", text: "attribution links each campaign to applications, disbursals and repayments." },
      ],
      image: {
        src: "https://images.pexels.com/photos/9487241/pexels-photo-9487241.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Campaign planning · Lagos",
      },
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Everything a lending marketer needs.",
      subtitle:
        "Audience building, multi-channel orchestration, compliance and analytics  in a single, lending-aware platform.",
      cards: [
        {
          icon: "Users",
          title: "Audience builder & segmentation",
          body: "Compose precise audiences from demographic, behavioural, repayment and credit attributes with a visual rule builder.",
        },
        {
          icon: "Send",
          title: "Multi-channel delivery",
          body: "Reach borrowers over SMS, WhatsApp, email, voice and missed call  from one campaign, with channel fallback logic.",
        },
        {
          icon: "Workflow",
          title: "Journey & lifecycle automation",
          body: "Build branching, trigger-based journeys for onboarding, cross-sell, renewal and win-back that run without manual sends.",
        },
        {
          icon: "Gauge",
          title: "Throttling & send controls",
          body: "Rate-limit by channel and gateway, set quiet hours and frequency caps, and protect deliverability at high volume.",
        },
        {
          icon: "ShieldCheck",
          title: "Consent & compliance",
          body: "Honour opt-in / opt-out, DND registries and per-market regulations automatically, with a full consent audit log.",
        },
        {
          icon: "BarChart3",
          title: "Real-time analytics & attribution",
          body: "Live dashboards tie delivery, response and conversion back to applications, disbursals and repayments per campaign.",
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: "Launch in four steps.",
      steps: [
        {
          n: "01",
          title: "Build audience",
          body: "Define your target segment from demographic, behavioural and credit attributes with the visual builder.",
        },
        {
          n: "02",
          title: "Design journey",
          body: "Lay out the multi-step, multi-channel flow with triggers, branches, wait steps and channel fallbacks.",
        },
        {
          n: "03",
          title: "Launch",
          body: "Go live with consent checks, throttling and quiet-hours controls enforced automatically.",
        },
        {
          n: "04",
          title: "Measure",
          body: "Track delivery, response and conversion in real time, attribute ROI, and iterate on what works.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Campaigns that grow the book  provably.",
      stats: [
        { value: "Targeted", label: "Acquisition  the right offer reaches the right segment on the channel they use." },
        { value: "Automated", label: "Lifecycle comms  onboarding, renewal and win-back journeys run without manual sends." },
        { value: "Measurable", label: "ROI  every campaign is attributed to applications, disbursals and repayments." },
      ],
    },
    cta: {
      eyebrow: "Get started",
      heading: "Plan your first multi-channel campaign with us.",
      headingAccent: "with us.",
      body: "Tell us a segment and an offer. We’ll design the audience, the journey and the attribution model  and walk you through what to expect at launch.",
      crossLinks: [
        {
          slug: "collection-marketing-ai",
          name: "Collection Marketing AI",
          blurb: "Point the same channels at recovery and self-cure.",
        },
        {
          slug: "gsm",
          name: "GSM · Missed & Collect Call",
          blurb: "Zero-cost telecom channels for verification and opt-in.",
        },
      ],
    },
    featureShowcase: {
      eyebrow: "Features",
      heading: "What you can do.",
      items: [
        {
          icon: "Target",
          visual: "radar",
          title: "Lifecycle-Based Targeting",
          body: "Segment borrowers by behavior, credit score, tenure, and repayment patterns — and speak to them when it matters most.",
        },
        {
          icon: "Send",
          visual: "channels",
          title: "Multi-Channel Automation",
          body: "Run campaigns across email, SMS, WhatsApp, push notifications, and in-app — all from one place.",
        },
        {
          icon: "Wand2",
          visual: "offers",
          title: "Personalized Offers That Convert",
          body: "Deliver top-ups, pre-approved credit, EMI holidays, or rate drops — dynamically tailored to borrower profiles.",
        },
        {
          icon: "FlaskConical",
          visual: "ab",
          title: "A/B Testing & Real-Time Optimization",
          body: "Test messages, creatives, and channels — and optimize on the fly for higher ROI.",
        },
        {
          icon: "BarChart3",
          visual: "insights",
          title: "Live Campaign Insights",
          body: "Track engagement, conversions, and funnel performance with real-time analytics and a unified campaign dashboard.",
        },
      ],
    },
  },
};
