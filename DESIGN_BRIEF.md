# PhotonMatters — Design Brief

> **Status:** Research complete · Awaiting answers to open questions before any page code is written.
> **Author:** Senior UI/UX + PM
> **Date:** 2026-06-26
> **Sources:** Repo A = `photonmaters-html-website/` (content source of truth) · Repo B = `photonmatter-revamp/` (design language source) · 7 reference SaaS sites.

---

## 0. Executive summary

PhotonMatters is an **AI-native lending & collections platform** for banks, NBFCs and telecom operators across **Africa, India and the Middle East**.

- **Repo A** is a complete, content-rich **13-page static HTML site** with a coherent, finished copy deck (homepage, about, products/solutions hub, industries, contact, + 8 product/solution detail pages). It uses a **blue + gold** fintech palette and Schibsted/Hanken Grotesk type. **This is the content source of truth.**
- **Repo B** is a **single-page React/Vite revamp** (Figma export, shadcn/ui + Tailwind v4 + lucide-react + framer-motion) with a distinctive **purple "eterna" palette**, a **serif-italic editorial type accent**, glassmorphism, a video hero and a bento grid. It is visually premium but **content-incomplete and partly inconsistent** (placeholder links, fake stats, anonymized testimonials, a stray "blockchain" claim, `.com` vs `.io`, © 2025). **This is the design language source.**

**The job:** rebuild PhotonMatters as a **premium multi-page Next.js site** that carries **all of Repo A's content** in **Repo B's elevated visual language**, on a proper token-based design system — resolving every conflict below first.

---

## 1. Reference-site research (design north stars)

> Method note: Linear/Vercel/Stripe/Resend/Raycast/Clerk/Liveblocks are client-rendered SPAs that don't yield useful static fetches; the notes below are distilled from established, current knowledge of each site's design system. Flag if you want me to capture live screenshots via the browser tools instead.

| Site | What to steal |
|---|---|
| **Linear.app** | Ruthless spacing discipline; tight-tracked grotesk display type; near-monochrome palette with one electric accent; subtle 1px borders instead of shadows; restrained fade-up-on-scroll. |
| **Vercel.com** | High-contrast black/white base; geometric precision; generous section padding; crisp mono/sans pairing; understated motion. |
| **Stripe.com** | Gradient craft done tastefully (the *only* place rainbow gradients are allowed); immaculate type scale; layered product UI mockups; gold-standard responsive grids. |
| **Resend.com** | Editorial restraint; small high-quality type; lots of negative space; one hero idea, executed cleanly. |
| **Raycast.com** | Dark-mode-first depth via subtle elevation; glassy surfaces; tasteful glow accents — relevant to B's dark sections. |
| **Clerk.dev** | Crisp component-library feel; consistent card radii and iconography; strong empty/hover/focus states. |
| **Liveblocks.io** | Confident color blocking; section rhythm (light→dark→light); illustrative-but-purposeful product visuals. |

**Synthesis for PhotonMatters:** keep B's distinctive purple + serif-italic signature (it's more ownable than A's generic fintech blue), but impose **Linear/Resend-grade spacing and type discipline** and **Stripe-grade mockup quality**, while stripping B's vibe-coded rough edges.

---

## 2. Content inventory — Repo A (source of truth)

**13 pages.** Brand consistently spelled **PhotonMatters**; domain `photonmatters.io`; email `hello@photonmatters.io`; phone `+971 526977485`; LinkedIn `/company/photonmatters`.

### Global navigation (from `assets/site.js`)
`Home` · `About` · **`Solutions`** (dropdown → Loan Origination, Loan Management, Credit Scoring, Debt Collection, Reconciliation AI, Collection Marketing AI, Campaign Management, divider, **GSM · Missed Call & Collect Call**, All solutions →) · `Industries` · `GSM` · `Contact` · button **`Book a demo`** (mailto).
Header is dark/glassy fixed bar; logo = blue starburst + small gold starburst, wordmark **Photon**(white) **Matters**(gold).

### Global footer (from `assets/site.js`)
4 columns: **Brand blurb** ("AI-native lending & collections technology for banks, NBFCs and telecom operators across Africa, India and the Middle East." + tagline "Built to Disrupt. Engineered for Scale. Designed to Empower.") · **Solutions** (8 links incl. "GSM Solutions") · **Company** (About, Industries, GSM, Contact, Careers→`mailto:careers@photonmatters.io`, LinkedIn) · **Offices** (Dubai · HQ, Ahmedabad, Johannesburg, New York). Legal bar: "© 2026 PhotonMatters. All rights reserved." · "Africa · India · Middle East & GCC".

### Page-by-page (headline → key blocks)

1. **index.html — Home** · `<title>` "PhotonMatters — AI-Native Lending & Collections Platform"
   - **Hero** eyebrow "Micro-finance, re-engineered"; H1 "AI Powered Lending reaching the last mile…" (gold accent); sub "AI-Powered platform for microlending and conventional consumer & commercial lending"; CTAs **Explore solutions →** (products) / **Book a demo** (contact); inline stats **8-week** go-live · **250k+** requests/hour · **3** regions; 4-image Pexels slideshow.
   - **Stats band:** 9 AI-native products · 250k+/hr · 8 wks · 3 regions (Africa·India·ME) · 99.9% availability.
   - **Solutions grid (9 cards):** Loan Origination, Loan Management, Credit Scoring, Debt Collection, Reconciliation AI, Collection Marketing AI, Campaign Management, **GSM · Missed Call & Collect Call [New]**, + dark CTA card "One platform. Every credit journey." → See all solutions.
   - **AI highlight band** "AI that decides, explains, and gets smarter." + 3 features (Real-time decisioning / Alternative data scoring / Explainable & compliant).
   - **Industries (3):** Banks · NBFCs & Lenders · Telecom Operators.
   - **Markets (3):** Africa (primary) · India · Middle East & GCC (HQ Dubai).
   - **Human-impact band** "1.4 billion adults are still locked out of finance." stats 1.4B unbanked · 1 phone.

2. **about.html — About** · Hero "We're banking the people the system forgot." · Mission "Unleashing a global revolution in lending technology." (2 paras) · **Values (3):** Built to Disrupt / Engineered for Scale / Designed to Empower · **Leadership (2):** Tahseen Jamal — Founder & CEO (23+ yrs, B.Tech, ISB MBA); Rohit Ahuja — Founder & CCO (25+ yrs, ex-Accenture, MBA) · Markets (3) · **Global presence (4):** UAE/Dubai [HQ], India/Ahmedabad, South Africa/Johannesburg, USA/New York.

3. **contact.html — Contact** · Hero "Let's build your next lending product." · **Form** (Full name, Work email, Company, Country select [Africa/India/Middle East/Other], message) → `contact.php`; success/error copy verbatim captured · **Details:** email/phone/LinkedIn + "Prefer a demo?" box · **Offices (4)** incl. full HQ address "Office 1701, Tower BB1, Mazaya Business Avenue, JLT, Dubai, UAE".

4. **products.html — Solutions hub** · Hero "The complete lending & collections stack." · **7 solution cards** (Learn more →) · **GSM band** (Missed Call / Collect Call / Operator-grade scale) · **How it fits together (4):** One connected data flow / API-first / On-prem or cloud / AI-native throughout · CTA "See the stack on your data."

5. **industries.html — Industries** · Hero "Built for the institutions that move credit." · **3 feature blocks** (Banks / NBFCs & Lenders / Telecom Operators) each with 3 checklist items + image · Markets (3) · Stats strip (250k+/hr · 8 wks · 99.9% · 3 regions).

6–12. **Solution detail pages** (consistent template: Hero → Overview + checklist + image → Capabilities (6 cards) → How it works (4 steps) → Outcomes (3 stats) → Cross-links + CTA):
   - **loan-origination.html** "Loan Origination" — Apply→Verify→Decide→Disburse.
   - **credit-scoring.html** "Score the borrowers the old models can't see." — explainable AI, reason codes, sub-second, champion/challenger.
   - **loan-management.html** "Loan Management" — Disburse→Service→Collect→Close; multi-currency GL.
   - **debt-collection.html** "Recover more, at a lower cost to collect." — propensity-to-pay, omnichannel.
   - **collection-marketing-ai.html** "Turn reminders into repayments." — behaviour-driven self-cure.
   - **reconciliation-ai.html** "Books that balance themselves." — AI auto-matching, break aging.
   - **campaign-management.html** "Design, target and automate every lending campaign." — multi-channel, consent/throttling, attribution.

13. **gsm.html — GSM** (`data-page="gsm"`, a "new division") · Hero "Missed Call & Collect Call, for telecom operators." · Why it matters · **Missed Call Service** (6 use-cases) · **Collect Call Service** (6 use-cases) · How it works (4) · Stats strip (Zero cost / Any 2G phone / No app, no data / Massive reach) · CTA.

> **No pricing tiers, no FAQ, no testimonials exist anywhere in Repo A.** All A imagery = Pexels/Wikimedia background URLs (no real product UI).

### Verified, reusable stats (from A)
`9 AI-native products` · `250k+ requests/hour` · `8-week go-live` · `3 regions` · `99.9% availability` · `1.4B unbanked adults` · `1 phone` to access credit.

---

## 3. Extracted design tokens — Repo B (design language)

### Color — the "eterna" purple system (from `globals.css`)
| Token | Hex | Role |
|---|---|---|
| `eterna-1` | `#E9A2F2` | light pink/lilac accent |
| `eterna-2` | `#7E49F2` | **primary** violet |
| `eterna-3` | `#1A1426` | near-black purple (dark-section base, body text) |
| `eterna-4` | `#38208C` | deep violet |
| `eterna-5` | `#F2CB07` | golden-yellow accent |
| semantic | `--primary #7E49F2`, `--muted #F3F0FF`, `--muted-foreground #6B6675`, `--border rgba(126,73,242,.15)`, `--input-background #F8F7FC`, `--radius .625rem` | shadcn semantic layer |

### Type (from `globals.css`)
- **Body/UI:** `Plus Jakarta Sans` (200–800).
- **Display accent:** `Playfair Display` serif — used as the signature **italic-light emphasis span** on one or two words per headline ("*Disrupt*", "*Scale*", "*Future of Credit*", "*lending edge*").
- Headlines: `font-medium` + `tracking-tighter` + gradient `bg-clip-text` fade (`from-white to-white/40` on dark, `from-eterna-3 to-eterna-3/60` on light). Scale used: `text-4xl`→`text-8xl`.

### Spacing / shape / motion
- Section padding alternates **`py-24` / `py-32`**; container `mx-auto px-4 md:px-8`.
- Radii are large and varied: `rounded-2xl`→`rounded-[3rem]`; pill buttons/chips (`rounded-full`).
- Surfaces: glassmorphism (`bg-white/5 border-white/10 backdrop-blur`), colored shadows (`shadow-eterna-2/20`), `grainy-gradients` noise texture.
- **Motion is minimal & uneven:** framer-motion appears in **Hero only** (one fade-up `y:20→0, 0.6s ease-out`); everything else is CSS hover (lift, grayscale→color reveal, translate-x). No scroll-stagger, no `whileInView` choreography below the fold.
- **Icons:** `lucide-react` (Menu, FileText, Layout, PieChart, Wallet, Megaphone, Smartphone, Building2, Landmark, Wifi, Factory, Zap, Download, ArrowRight, CheckCircle2, Shield, Quote, MapPin, Check, social icons…).
- **Dark/light rhythm:** Hero(dark/video) → Mission(light) → Solution(light+dark card) → **Features(dark)** → ProductLines(light bento) → PlatformCapabilities(light) → Testimonials(light) → **GlobalPresence(dark)** → **Footer(dark)**.

### Legacy tokens — Repo A's `config.js` (for reference only)
Blue/gold: `ink #0A1B33`, `brand #1E5EFF`, `gold #F59E0B`, `paper #F7F9FC`, `muted #5B6B86`; fonts Schibsted Grotesk + Hanken Grotesk; `maxWidth.wrap 1200px`.

---

## 4. Conflicts & ambiguities (MUST resolve before building)

### A. Brand identity conflicts
| # | Field | Repo A (live) | Repo B (revamp) | Folder |
|---|---|---|---|---|
| A1 | **Palette** | Blue `#1E5EFF` + Gold `#F59E0B` | Purple `#7E49F2` + Yellow `#F2CB07` | — |
| A2 | **Brand name** | "PhotonMatters" | Footer: "Photon Matters" (2 words) | "photonmaters" (1 t) |
| A3 | **Email** | `hello@photonmatters.io` | `business@photonmatters.com` | — |
| A4 | **Domain** | `.io` | `.com` | — |
| A5 | **Copyright** | © 2026 | © 2025 | — |
| A6 | **Fonts** | Schibsted + Hanken Grotesk | Plus Jakarta Sans + Playfair Display | — |
| A7 | **Logo** | Blue+gold dual starburst SVG | Figma raster PNG | — |

### B. Information-architecture conflicts
- **B1 — Nav taxonomy.** A: `Home / About / Solutions / Industries / GSM / Contact`. B: `Home / Platform / Products / Industries / About Us / Contact` — B splits "Platform" (LOS/LMS/Scoring/Collections/Campaigns) from "Products" (Micro/Consumer/Commercial/SCF lending *types*). **Which IA do we ship?**
- **B2 — "Products" as lending types.** B introduces a product-type axis (Micro-Lending, Consumer & Retail, Commercial Lending, Supply Chain Finance) absent from A's module-based IA.

### C. Net-new content in B not present/verified in A
- **C1 — Supply Chain Finance (SCF):** a whole product line in B; **does not exist in A.** Real offering or aspirational?
- **C2 — Extra industries:** B adds **"Manufacturers & Distributors"** and **"Power & Utility Providers"**; A only has Banks / NBFCs / Telecom. Keep?
- **C3 — Testimonials:** B has 3 (anonymized: "Chief Credit Officer, Zambia-based lending firm"; "Business Manager, Enterprise SCF Firm"; "CEO, Middle East Lending Firm"). **A has none.** Are these real/approved, or placeholder to drop?
- **C4 — "Blockchain" claim:** B footer: "We rebuilt financial markets… using blockchain technologies." Contradicts A's AI positioning — **drop as boilerplate?** (assumed yes)
- **C5 — Fake metric:** B shows "Approval Rate 85.4%" in a mockup. Use a real number or a neutral placeholder UI?

### D. Content gaps / omissions
- **D1 — GSM division** (a major, "New" offering in A — two services, 12 use-cases) is **entirely missing from B's design.** Must be designed fresh in the new language.
- **D2 — Reconciliation AI** present in A's nav/footer but **dropped from B's nav** ("Collections" only). Keep in IA? (assumed yes)
- **D3 — Leadership bios** (Tahseen Jamal, Rohit Ahuja) — keep on About? Add photos or keep initials-avatar?
- **D4 — Imagery:** A uses generic Pexels/Wikimedia stock with no `alt`; B uses Unsplash + 3 Figma rasters + a hero video + CSS mockups. **No real product screenshots exist.** Source new licensed imagery + build UI mockups, or reuse stock? Is the hero video (`hero video.mp4`) cleared for use?
- **D5 — Pricing & FAQ:** neither repo has them. Add (and with what content), or omit?
- **D6 — Contact form backend:** A posts to `contact.php`. Next.js has no PHP — need a route handler / form service (Resend, Formspree, etc.). Which?

### E. Copy conflicts (same idea, different words)
- Hero: A "AI Powered Lending reaching the last mile…" vs B "Built to Disrupt. Engineered for Scale." (A uses the latter as *values*, not hero). **Which is the hero headline?**
- Many CTAs diverge: A "Book a demo / Explore solutions / Learn more"; B "Download Brochure / Design your Lending Stack / Request Demo / Get Started". **Standardize to which set?** (A's is more consistent.)
- Office address: A full ("Office 1701, Tower BB1, Mazaya Business Avenue, JLT, Dubai, UAE") vs B abbreviated. Use A's full version? (assumed yes)

---

## 5. Proposed design direction (for approval)

> Recommendation as senior designer — adopt **Repo B's purple "eterna" language**, systematized and disciplined, carrying **all of Repo A's content**. Rationale: the revamp is the intended forward direction; purple + serif-italic is far more ownable and premium than generic fintech blue.

### Palette (token-based, semantic)
```
Brand:    primary #7E49F2 (eterna-2) · primary-deep #38208C (eterna-4) · accent #F2CB07 (eterna-5) · accent-soft #E9A2F2 (eterna-1)
Neutrals: near-black #1A1426 (eterna-3) · ink-700 #2A2238 · gray-500 #6B6675 · gray-200 #E6E1F0 · surface #FFFFFF · surface-muted #F3F0FF / #F8F7FC
Semantic: text-primary #1A1426 · text-secondary #4A4458 · text-muted #6B6675 · surface-base #FFFFFF · surface-raised #F8F7FC · border-default rgba(126,73,242,.15) · border-subtle rgba(26,20,38,.08) · success #16A34A · ring #7E49F2
```
*(Decision needed at A1: confirm purple, or keep legacy blue/gold, or a hybrid.)*

### Type scale (Plus Jakarta Sans + Playfair Display)
| Role | Family | Size (desktop→mobile) | Weight | LH | Tracking |
|---|---|---|---|---|---|
| Display | Jakarta + Playfair italic accent | 72→40px | 500 | 1.05 | -0.03em |
| H1 | Jakarta | 56→34px | 500 | 1.1 | -0.025em |
| H2 | Jakarta | 40→28px | 500 | 1.15 | -0.02em |
| H3 | Jakarta | 24→20px | 600 | 1.25 | -0.01em |
| Body-L | Jakarta | 20→18px | 400 | 1.6 | 0 |
| Body | Jakarta | 16px | 400 | 1.6 | 0 |
| Caption | Jakarta | 14px | 500 | 1.4 | 0 |
| Label/Eyebrow | Jakarta | 13px | 600 | 1.2 | 0.12em (uppercase) |

### Spacing scale (4px base)
`8 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128`. Section vertical rhythm: desktop **96/128**, tablet **80**, mobile **56/64**. Container `max-width 1200px`, gutters 16/24/32 (mobile/tablet/desktop). 12-col grid.

### Components & motion
- shadcn/ui base, re-skinned to tokens. Card radius standardized to **`xl` (16px)** for content cards, **`2xl`** for hero/feature panels (kill the random 2rem/2.5rem/3rem mix). Elevation via tokenized shadow + 1px token borders, not heavy drop shadows.
- **Icons: Lucide** (already in B), 20px feature / 18px nav / 16px inline — contextually mapped (e.g. `Landmark` banks, `Wifi`/`Smartphone` telecom, `Phone`/`PhoneMissed` GSM, `ShieldCheck` compliance, `Repeat`/`Scale` reconciliation).
- **Motion:** systematize the fade-up (24px Y, 400ms ease-out, 80ms stagger) via one `framer-motion` wrapper applied site-wide under `prefers-reduced-motion: no-preference`; keep one signature ambient hero treatment (video or animated starburst/gradient — TBD with imagery answers). Hover = transform/opacity/color only, 150–200ms.

### Tech stack
Next.js (App Router) · Tailwind v4 + token layer mapped to CSS variables · `next/font` (Jakarta + Playfair) · Lucide (tree-shaken) · framer-motion (entrance only) · `next/image`. Multi-page routes mirroring A's 13 pages.

---

## 6. Open questions (answer before building — grouped)

**Brand (blocking):**
1. **Palette:** ship B's **purple/eterna** (recommended), keep A's legacy **blue/gold**, or a hybrid?
2. Canonical **brand name** ("PhotonMatters"), **domain** (`.io` vs `.com`), and **contact email** (`hello@` vs `business@`)? (Recommend: PhotonMatters / .io / hello@.)
3. Keep **Plus Jakarta Sans + Playfair Display**, or revert to Schibsted/Hanken Grotesk?
4. Logo: re-skin the **starburst SVG** to purple, or supply a new mark?

**Scope & IA (blocking):**
5. **Multi-page** site mirroring A's 13 pages (recommended), or a **single premium landing page** (B's form)?
6. Nav taxonomy: A's (`Solutions/Industries/GSM`) or B's (`Platform/Products`) — or a merged structure?

**Content (blocking the affected sections only):**
7. **Supply Chain Finance** — real product? Include a page?
8. **Industries** — only Banks/NBFCs/Telecom (A), or also Manufacturers & Utilities (B)?
9. **Testimonials** — real/approved, rewrite, or omit until we have named quotes?
10. Confirm **drop the "blockchain" claim** and the **fake 85.4%** metric.
11. **GSM** — confirm it stays (recommended) and gets a full page in the new language.
12. **Pricing** and **FAQ** — add (with what content) or omit?
13. **Hero headline** — "AI Powered Lending reaching the last mile…" (A) or "Built to Disrupt. Engineered for Scale." (B)?
14. Standardize CTAs to A's set ("Book a demo" / "Explore solutions") — confirm?

**Assets & infra:**
15. **Imagery:** commission/license new photography + build real product-UI mockups, or reuse the existing Pexels/Unsplash stock? Is **`hero video.mp4`** cleared for production?
16. **Leadership** bios — keep, and with real headshots or initials avatars?
17. **Contact form** backend in Next.js — Resend, Formspree, a custom route + email, or other?
18. Deployment target (Vercel assumed) and analytics?

---

## 7. Build sequence (once approved)
1. `styles/tokens.css` — colors, type, spacing, radius (gate for approval).
2. Shared components — `Button`, `Badge`, `SectionHeader`, `NavBar`, `Footer`, `Card` (default/hover/focus/responsive states).
3. Pages in A's content order — Home → Solutions hub → 8 detail pages → Industries → About → Contact → GSM (layout confirmed per page before full build).
4. Cross-viewport QA @ 375 / 768 / 1280 / 1440.
