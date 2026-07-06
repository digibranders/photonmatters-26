# PhotonMatters — Image Generation Prompts

> **Purpose:** Replace every placeholder image on the site with professional, on-brand, highly-relevant art.
> **For:** ChatGPT (GPT Image / DALL·E) or Google Gemini "Nano Banana" image generation & editing.
> **Author:** Senior graphic designer review, 2026-07-06.
>
> Every image currently live is a generic Pexels/Wikimedia placeholder — several are **reused across
> multiple pages**, none is art-directed to the brand, and many show cluttered shop/market backgrounds.
> This document gives one **ready-to-paste prompt per image slot**, organised by page and section, with the
> exact file path, display aspect ratio, and export size so each generated asset drops straight in.

---

## 0. How to use this document

1. **Each fenced prompt is fully self-contained.** The brand look, the color grade, the composition rules,
   the export size *and* the "do NOT include" guardrails are all baked into every single block — just copy
   one block and paste it straight into ChatGPT / Gemini. Nothing needs to be stitched together.
2. Every entry lists **where it goes** (file path + section + aspect ratio + export size), **what to fix**,
   the **PROMPT**, and the **Alt text** for the code.
3. Generate at the **export size** noted; if the tool only outputs squares, generate large and crop to the
   stated aspect ratio keeping the subject where the prompt says.
4. Save **local files** (`public/…`) as `.webp`. Replace the remote Pexels/Wikimedia URLs in the data files
   (`lib/solutions-data.ts`, `lib/products-data.ts`, `app/*/page.tsx`) with local `/…` paths once generated.
5. Keep the set **cohesive** — the same grade and lighting language sits in every prompt on purpose. That
   consistency is what makes a site look designed rather than stock-assembled.

Sections 1 is background reference only — you do **not** need to copy from it. Every prompt below already
contains everything.

---

## 1. House Style (reference only — already baked into every prompt below)

**Art direction:** premium **editorial fintech** — cinematic, confident, calm. Think Stripe / Ramp / a
top-tier bank's brand campaign, *not* stock photography.

**Brand color grade:** primary accent **violet `#7E49F2`** and soft **lilac `#E9A2F2`** as light/rim tones;
warm **gold `#F2CB07`** as a secondary spark; shadows fall to **near-black plum `#1A1426`**; heroes may sit
on cool **navy `#07101F`**. Controlled, slightly desaturated, one or two brand hues glowing — never rainbow.

**Backgrounds (the #1 rule):** clean, minimal, intentional, softly blurred (f/1.8–2.8). **Never** a shop,
market stall, signage, cluttered street or busy/irrelevant scene.

**People policy (important):** heroes and nearly every section are **abstract / product-render /
architectural — NO stock people, hands, faces or phones.** Real humans appear in only **two** places on the
whole site: the home "last mile" band (#7) and the real founder portraits (#10/#11). This is what keeps the
site looking like a premium tech brand (Linear/Vercel/Stripe) rather than stock photography.

**Two registers:** **RENDER** (abstract 3D light / product / UI / architecture on a dark brand-gradient void
— the default for this site) and **PHOTO** (used only for the two human moments above). Each prompt states
which it uses.

**Hero text-safe zone:** headline sits on the **left**, so the left third stays dark/empty and the subject
goes **center-right**.

---

## 2. HOME — `app/page.tsx` + `components/home/Hero.tsx`

### 2.1 Hero slideshow — slide 1 of 3

- **File:** `public/hero/slide-market.webp` · **Section:** top hero carousel · **Aspect:** 16:9 · **Export:** 2400×1350
- **Fix:** the 3 slides were too similar (all person-at-laptop). Now each slide is a **distinct concept**, telling a different part of the story: **① the human last mile · ② the AI platform · ③ reach across 3 regions.** Cohesive only through the violet + gold palette.

```
Professional editorial photograph for a fintech lending hero — the HUMAN last-mile story, on-brand for
"PhotonMatters" (photons = light), 16:9, 2400x1350. A dignified young entrepreneur or worker in an emerging
market (Africa / India), in warm cinematic light, looking down at a smartphone the moment a loan is
approved. On the phone screen, a small elegant four-point STARBURST glint of light — violet (#7E49F2) core
with a warm gold (#F2CB07) edge, the PhotonMatters "photon" mark — flares softly and casts a gentle
violet-and-gold glow up onto their hopeful face. Candid, three-quarter angle, natural, never posing at the
camera. Clean, softly blurred real-world background (no shop signage, no market stalls, no clutter).
Cinematic color grade built around the brand's violet + gold palette. The LEFT THIRD stays darker for
headline text; subject center-right. Aspirational, human, premium — light reaching the last mile.
Photorealistic, ultra-detailed, 8k.
Do NOT include: cheesy stock posing, smiling at the camera; shop signage, market stalls or clutter; outer
space, galaxy or nebula; oversized or cosmic starbursts (keep the glint small and on the phone); gibberish
on-screen text, logos or watermarks; distorted hands or faces; oversaturation.
```

- **Alt:** `Approved for a first fair loan — reaching the last mile`

### 2.2 Hero slideshow — slide 2 of 3

- **File:** `public/hero/slide-kiosk.webp` · **Aspect:** 16:9 · **Export:** 2400×1350
- **Fix:** distinct concept ② — the **AI platform** itself (dark product shot, no person). Deliberately different from slide 1's warm human shot.

```
Product-UI mockup for a fintech lending hero — the PLATFORM, 16:9, 2400x1350. A sleek modern laptop (or a
clean floating browser window) on the RIGHT showing a dark-mode lending dashboard: KPI cards, an "approved"
card, a small credit-score gauge and a disbursement chart with a violet-to-gold gradient. Dark plum
(#1A1426) studio background fading to near-black on the LEFT for headline text. Cool, tech-forward, minimal;
violet (#7E49F2) and gold (#F2CB07) accents, soft product lighting, a subtle reflection. Crisp modern UI
with short labels only. Sharp, high-resolution product shot. NO people.
Do NOT include: space, galaxy, nebula, stars, glowing starburst, light rays, lens flare, abstract light;
people or hands; gibberish or dense text; logos or watermarks; oversaturation or blur.
```

- **Alt:** `The AI-powered lending platform`

### 2.3 Hero slideshow — slide 3 of 3

- **File:** `public/hero/slide-shop-credit.webp` · **Aspect:** 16:9 · **Export:** 2400×1350
- **Fix:** distinct concept ③ — **scale & reach** across the 3 regions, as a stylized network map. Different world again from slides 1 and 2.

```
Stylized fintech data-visualization for a lending hero — SCALE & REACH, 16:9, 2400x1350. A clean, elegant
dark map of the platform's three regions — Africa, India and the Middle East — with softly glowing
connection nodes and thin arcing light lines linking cities, suggesting credit flowing at scale across the
regions. Deep plum (#1A1426)-to-navy background, violet (#7E49F2) network lines with warm gold (#F2CB07)
node highlights. Modern, premium, restrained fintech-infrastructure aesthetic — NOT outer space, NOT a
nebula, a MAP not a galaxy. The LEFT THIRD stays darker for headline text; the map is weighted center-right.
Sharp, high-resolution, 8k.
Do NOT include: outer space, galaxy, nebula, stars, cosmos, starburst, lens flare; people or hands;
gibberish text, country labels or logos; oversaturation or blur.
```

- **Alt:** `AI lending at scale across Africa, India and the Middle East`

### 2.4 Industries card — Banks

- **File:** `app/page.tsx` → `INDUSTRIES[0].image` (currently Nedbank / Wikimedia) · **Section:** "Built for the institutions that move credit" · **Aspect:** 16:10 · **Export:** 1600×1000

```
Premium editorial architectural PHOTO, 16:10 landscape, 1600x1000. A modern bank / financial
headquarters exterior at blue hour — clean glass-and-stone facade, strong geometric lines, a softly lit
lobby glowing behind the glass. Wide 24mm lens, perfectly level verticals, generous sky negative space.
No brand names, no signage, no people. Cool navy tones with a subtle violet (#7E49F2) reflection in the
glass and a warm gold (#F2CB07) glow from the interior lights. Understated corporate-prestige mood,
photorealistic, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; oversaturation, HDR halos, cheesy stock-photo look, low
resolution or motion blur.
```

- **Alt:** `Modern bank headquarters — digital-first credit`

### 2.5 Industries card — NBFCs & Lenders

- **File:** `app/page.tsx` → `INDUSTRIES[1].image` · **Aspect:** 16:10 · **Export:** 1600×1000

```
Premium fintech 3D RENDER, 16:10 landscape, 1600x1000. NO people. An elegant floating glassmorphic lending
dashboard — softly-glowing cards and alt-data light streams (cashflow, telco, repayment) feeding into a
clean approval panel, all rendered as light on a deep navy-to-plum studio backdrop. Volumetric violet
(#7E49F2) and gold (#F2CB07) lighting, soft reflections, premium product-render finish, no readable text.
Minimal, modern, high-end, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Configurable lending rails on an alternative-data engine`

### 2.6 Industries card — Telecom Operators

- **File:** `app/page.tsx` → `INDUSTRIES[2].image` · **Aspect:** 16:10 · **Export:** 1600×1000

```
Premium fintech 3D RENDER, 16:10 landscape, 1600x1000. NO people, NO phones. Abstract "airtime becomes
credit": a stream of glowing signal waves on the left converts into luminous coins / tokens of light on
the right, connected by flowing violet-gold light ribbons, over a soft out-of-focus network lattice. Deep
navy-to-plum backdrop, volumetric violet (#7E49F2) and gold (#F2CB07) light, one soft flare. Minimal,
premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Turning telecom subscribers into a financial-services base`

### 2.7 Human-impact / "The last mile"

- **File:** `public/hero/section-last-mile.webp` · **Section:** "1.4 billion adults are still locked out of finance" · **Aspect:** 4:3 · **Export:** 1600×1200

```
Premium emotive editorial PHOTO, 4:3 landscape, 1600x1200. A dignified market vendor or small
entrepreneur (any emerging-market region) looking at a smartphone with quiet hope, softly lit. Tight,
respectful framing on the person and phone; the background is entirely soft warm bokeh — clean and
abstract, no stalls, no signage, no clutter. 85mm at f/1.8. Natural warm skin tones with a gentle violet
(#7E49F2) rim light and a soft gold (#F2CB07) glow from the phone. Human, hopeful, premium documentary
style — never stocky. Photorealistic, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `A first fair loan, approved on a phone at the last mile`

---

## 3. ABOUT — `app/about/page.tsx`

### 3.1 Hero (dark, full-bleed)

- **File:** `app/about/page.tsx` → `HeroDark image=` (currently Pexels 30688593) · **Aspect:** 16:9 · **Export:** 2400×1350 · text overlays left

```
Abstract 3D brand RENDER, cinematic full-bleed hero for a company "About" page themed "banking the people
the system forgot". NO people, NO phones, NO devices. 16:9 landscape, 2400x1350. Across a dark
violet-to-black field, scattered dim points of light gently ignite one by one into a warm constellation,
linked by fine threads of violet-gold light radiating from a soft central STARBURST source — the unseen,
finally seen and connected. Volumetric haze, drifting motes, deep depth. Cool navy-to-plum grade (#07101F
to #1A1426), violet (#7E49F2) and gold (#F2CB07) light. LEFT THIRD pure near-black for headline text;
constellation weighted center-right. Mission-driven, poetic, expensive, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Banking the people the system forgot`

### 3.2 Mission figure

- **File:** `app/about/page.tsx` → mission `<Image src="…3894376…">` · **Section:** "Unleashing a global revolution in lending technology" · **Aspect:** 4:3 · **Export:** 1600×1200

```
Abstract 3D brand RENDER, 4:3 landscape, 1600x1200. NO people, NO hands. "Human-centered credit, built
together": two separate threads of light — one violet (#7E49F2, the institution) and one warm gold
(#F2CB07, the borrower) — curve toward each other and weave into a single brighter strand, with a soft
STARBURST SPARK at the join. Deep plum studio void, volumetric haze, elegant negative space, glassy
reflections. Optimistic, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Building human-centered credit, together`

### 3.3 & 3.4 Leadership portraits — Tahseen Jamal & Rohit Ahuja

- **Files:** `public/team/tahseen-jamal.png`, `public/team/rohit-ahuja.png` · **Aspect:** 1:1 square · **Export:** 1000×1000

> ⚠️ **These are real, named founders.** Do **not** generate fabricated faces of real people. Instead use
> their **actual professional headshots** and use Nano Banana's **image-edit** mode to standardise the
> background and lighting so both portraits match. Upload each real photo and paste this edit instruction:

```
EDIT this uploaded headshot. Keep the person's face, identity, age and likeness 100% unchanged — do not
alter their features. Replace only the background with a clean, seamless studio backdrop in deep
plum-to-charcoal (#1A1426) with a soft violet (#7E49F2) radial glow behind the shoulder, like a premium
executive headshot. Relight subtly with a soft key light and a gentle violet rim light on one side.
Natural skin texture, flattering but crisp retouch, square 1:1 crop, head-and-shoulders, eyes to camera.
Corporate-prestige editorial finish, ultra-detailed, 8k.
Do NOT include: any text, words, logos or watermarks; changed facial features, altered identity or age;
cluttered background; oversaturation, HDR halos, plastic skin, or low resolution.
```

- **Alt (Tahseen):** `Tahseen Jamal — Co-Founder & CEO`  ·  **Alt (Rohit):** `Rohit Ahuja — Co-Founder & CCO`

---

## 4. GSM — `app/gsm/page.tsx`

### 4.1 Hero (dark, full-bleed)

- **File:** `app/gsm/page.tsx` → `HeroDark image=` (Pexels 29488660) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Abstract 3D brand RENDER, cinematic full-bleed hero for a telecom "Missed Call & Collect Call" product.
NO people, NO phones, NO devices. 16:9 landscape, 2400x1350. Center-right: from a single luminous point,
clean concentric rings of gold-and-violet light pulse outward across a dark void — a "flash" / missed-call
signal reaching everyone at zero cost — the outermost rings dissolving into countless tiny distant light
points. Deep navy-to-plum grade, volumetric haze, violet (#7E49F2) and gold (#F2CB07) light, one soft
flare. LEFT THIRD dark and empty for headline text. Minimal, powerful, telecom-tech, ultra-detailed, 8k
octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `A signal pulsing out to reach every subscriber at zero cost`

### 4.2 "Why it matters" figure

- **File:** `app/gsm/page.tsx` → why `<Image src="…36096255…">` · **Section:** "In prepaid markets, the cheapest channel wins" · **Aspect:** 4:3 · **Export:** 1600×1200

```
Abstract 3D brand RENDER, 4:3 landscape, 1600x1200. NO people, NO phones. A single, elegant pulse of
light: one bright gold-violet point emits a clean expanding ring across a dark plum void — a minimal icon
of "the cheapest channel, a free flash." Volumetric haze, soft caustics, deep negative space, violet
(#7E49F2) and gold (#F2CB07) light. Minimal, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `A free flash — the cheapest channel, as a pulse of light`

---

## 5. INDUSTRIES — `app/industries/page.tsx`

### 5.1 Hero (dark, full-bleed)

- **File:** `HeroDark image=` (Standard Bank / Wikimedia) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium editorial architectural PHOTO, cinematic full-bleed hero, 16:9 landscape, 2400x1350. A
commanding modern financial-district skyline / bank tower at blue hour, glass facades catching light,
shot from a low heroic angle with clean sky negative space. No brand names, no signage, no people. Cool
navy grade with violet (#7E49F2) reflections in the glass and warm gold (#F2CB07) interior lights. LEFT
THIRD dark and empty for headline text. Institutional prestige, premium, photorealistic, ultra-detailed,
8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; oversaturation, HDR halos, cheesy stock-photo look, low
resolution or motion blur.
```

- **Alt:** `The institutions that move credit`

### 5.2 Feature block — Banks

- **File:** `BLOCKS[0].image` (Absa / Wikimedia) · **Aspect:** 4:3 · **Export:** 1600×1200

```
Premium editorial architectural PHOTO, 4:3 landscape, 1600x1200. A modern bank interior or facade detail
— clean architectural lines, a bright minimal banking hall or a glass-and-steel corner, softly lit, no
people, no signage, no clutter. 35mm, level verticals. Cool neutral palette with a subtle violet
(#7E49F2) accent light and a warm gold (#F2CB07) glow. Digital-first, contemporary, premium,
photorealistic, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; oversaturation, HDR halos, cheesy stock-photo look, low
resolution or motion blur.
```

- **Alt:** `Digital-first credit, free of legacy core constraints`

### 5.3 Feature block — NBFCs & Lenders

- **File:** `BLOCKS[1].image` (Pexels 9301316) · **Aspect:** 4:3 · **Export:** 1600×1200

```
Premium fintech 3D RENDER, 4:3 landscape, 1600x1200. NO people. A floating glassmorphic lending workspace
— softly-glowing product-builder cards and alt-data risk panels rendered as light on a deep navy-to-plum
backdrop, feeding a clean approval node. Volumetric violet (#7E49F2) and gold (#F2CB07) light, glassy
reflections, no readable text. Minimal, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Scaling alternative lending on configurable rails`

### 5.4 Feature block — Telecom Operators

- **File:** `BLOCKS[2].image` (Pexels 12478756) · **Aspect:** 4:3 · **Export:** 1600×1200

```
Premium fintech 3D RENDER, 4:3 landscape, 1600x1200. NO people, NO phones. Abstract connectivity-to-credit:
glowing signal waves flowing into luminous coins / tokens of light, linked by violet-gold ribbons over a
soft out-of-focus network lattice. Deep navy-to-plum backdrop, volumetric violet (#7E49F2) and gold
(#F2CB07) light. Minimal, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Turning a subscriber base into a financial-services business`

---

## 6. PRODUCTS — hub + 4 detail pages

### 6.1 Products hub hero

- **File:** `app/products/page.tsx` → `HeroDark image=` (Pexels 30688593) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium fintech 3D RENDER, cinematic hero suggesting "lending reimagined for every market", 16:9
landscape, 2400x1350. Center-right: an elegant abstract composition of floating, softly-glowing credit /
loan UI cards and coins of light arranged in a graceful arc, on a deep navy-to-plum studio backdrop.
Volumetric violet (#7E49F2) and gold (#F2CB07) lighting, soft reflections, premium product-render
finish. LEFT THIRD dark and empty for headline text; composition weighted center-right. Minimal, modern,
high-end, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Lending reimagined for every market and every need`

### 6.2 Micro Lending — hero

- **File:** `lib/products-data.ts` → `micro-lending.hero.image` (Pexels 36096255) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium fintech 3D RENDER, cinematic hero for micro-lending. NO people, NO phones. 16:9 landscape,
2400x1350. Center-right: a graceful cascade of many tiny luminous coins / tokens of light streaming and
scattering — high-volume, low-value micro-loans in motion, each a small violet-gold starburst — over a
deep navy-to-plum void with volumetric haze. Violet (#7E49F2) and gold (#F2CB07) light, one soft flare.
LEFT THIRD dark and empty for headline text. Fast, abundant, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Micro Lending — built for speed and scale`

### 6.3 Consumer & Retail Lending — hero

- **File:** `lib/products-data.ts` → `consumer-retail-lending.hero.image` (Pexels 9489091) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium fintech 3D RENDER, cinematic hero for consumer & retail lending / BNPL. NO people, NO phones. 16:9
landscape, 2400x1350. Center-right: a single bright stream of light elegantly splits into several equal
glowing segments that curve gracefully away — instalments / flexible credit made of light — with a soft
STARBURST SPARK at the split point, over a deep navy-to-plum studio void. Violet (#7E49F2) and gold
(#F2CB07) light, glassy reflections, one soft flare. LEFT THIRD dark and empty for headline text.
Effortless, modern, premium, ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Consumer & Retail Lending — real-time, embedded credit`

### 6.4 Core Commercial Lending — hero

- **File:** `lib/products-data.ts` → `core-commercial-lending.hero.image` (Pexels 577195) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium architectural RENDER, cinematic full-bleed hero for commercial / business lending. NO people. 16:9
landscape, 2400x1350. Center-right: the soaring glass atrium of a modern corporate tower shot from a low
heroic angle — structural geometry, clean lines receding into soft fog, a warm gold-lit interior deep
within. Cool navy-to-plum grade, violet (#7E49F2) reflections in the glass, warm gold (#F2CB07) interior
glow, volumetric haze, one soft flare. LEFT THIRD dark and empty for headline text. Institutional,
structured, expensive, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt:** `Core Commercial Lending — structured credit for business`

### 6.5 Supply Chain Finance — hero

- **File:** `lib/products-data.ts` → `supply-chain-finance.hero.image` (Pexels 12478756) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium fintech 3D RENDER, cinematic hero for supply-chain finance, 16:9 landscape, 2400x1350.
Center-right: an elegant abstract representation of a connected supply chain — softly glowing nodes
(anchor, supplier, distributor) linked by flowing light lines, with small stylised cargo / box and
invoice icons made of light, on a deep navy-to-plum studio backdrop. Volumetric violet (#7E49F2) and
gold (#F2CB07) lighting. LEFT THIRD dark and empty for headline text; composition weighted center-right.
Minimal, premium, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Supply Chain Finance — working capital that moves with the chain`

---

## 7. SOLUTIONS — hub

### 7.1 Solutions hub hero

- **File:** `app/solutions/page.tsx` → `HeroDark image=` (Pexels 577195) · **Aspect:** 16:9 · **Export:** 2400×1350 · text left

```
Premium fintech 3D RENDER, cinematic hero for "the complete lending & collections stack", 16:9
landscape, 2400x1350. Center-right: an abstract stack of softly-glowing translucent platform layers /
modules floating in space, each a thin glass panel with faint UI hints, connected by light — suggesting
a modular, API-first system. Deep navy-to-plum studio backdrop, volumetric violet (#7E49F2) and gold
(#F2CB07) lighting, premium glassmorphism. LEFT THIRD dark and empty for headline text; composition
weighted center-right. Minimal, modern, high-end, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `The complete lending and collections platform stack`

---

## 8. SOLUTION DETAIL PAGES — `lib/solutions-data.ts`

> Each solution page has **two** images: a **hero** (full-bleed, text on left → left dark, subject
> center-right) and an **overview banner** (wide cinematic stage; a frosted glass card covers the **left**
> and a purple gradient sits over it → **put the subject on the RIGHT third**, and match the caption city).
> Overview banners: **Aspect ~2:1 · Export 2400×1200.** Heroes: **16:9 · 2400×1350.**

### 8.1 Loan Origination

**Hero** — `loan-origination.hero.image` (Pexels 4908621)

```
Premium fintech 3D RENDER, cinematic hero for digital loan origination. NO people, NO phones. 16:9
landscape, 2400x1350. Center-right: a sleek floating glassmorphic onboarding flow — clean stacked
application / eKYC panels of light with a glowing verification STARBURST checkmark — on a deep
navy-to-plum studio void. Volumetric violet (#7E49F2) and gold (#F2CB07) light, glassy reflections, no
readable text. LEFT THIRD dark and empty for headline text. Frictionless, modern, premium, ultra-detailed,
8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

**Overview** — `loan-origination.overview.image.src` (Pexels 33763153) · caption "Onboarding session · Lagos, Nigeria" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. NO people, NO phones. On the
RIGHT: floating glassmorphic onboarding / eKYC panels of light — capture, verify, decide — with a glowing
verification STARBURST checkmark, on a deep plum void. The LEFT HALF is calm and darker and mostly empty
(a glass panel and purple gradient will overlay it). Volumetric violet (#7E49F2) and gold (#F2CB07) light,
glassy reflections, no readable text. Premium product render, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt (hero):** `Loan Origination — application to disbursement in minutes`

### 8.2 Loan Management

**Hero** — `loan-management.hero.image` (Pexels 7640793)

```
Premium fintech 3D RENDER, cinematic hero for loan servicing / management, 16:9 landscape, 2400x1350.
Center-right: an abstract loan-lifecycle ledger visual — clean floating panels showing subtle schedules,
accrual curves and a multi-currency motif, made of light on a deep navy-to-plum backdrop. Volumetric
violet (#7E49F2) and gold (#F2CB07) lighting, glassy reflections. LEFT THIRD dark and empty for headline
text; composition weighted center-right. Minimal, premium software render, ultra-detailed, 8k octane
render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**Overview** — `loan-management.overview.image.src` (Pexels 6077545) · caption "Servicing team at work" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. NO people. On the RIGHT:
floating glassmorphic servicing panels of light — a repayment schedule, an accrual curve and a
multi-currency ledger motif — on a deep plum void. The LEFT HALF is calm and darker and mostly empty for
the overlay card. Volumetric violet (#7E49F2) and gold (#F2CB07) light, glassy reflections, no readable
numbers. Premium product render, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt (hero):** `Loan Management — the system of record for the whole loan life`

### 8.3 Credit Scoring

**Hero** — `credit-scoring.hero.image` (Pexels 577210)

```
Premium fintech 3D RENDER, cinematic hero for explainable AI credit scoring, 16:9 landscape, 2400x1350.
Center-right: an elegant abstract visual of a credit score forming from many data streams — flowing
particles of light (telco, cashflow, bureau, behaviour) converging into a glowing score gauge with
subtle "reason-code" bars, all made of light. Deep navy-to-plum backdrop, volumetric violet (#7E49F2)
and gold (#F2CB07) lighting. LEFT THIRD dark and empty for headline text; composition weighted
center-right. Transparent / explainable feel, premium, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**Overview** — `credit-scoring.overview.image.src` (Pexels 97080) · caption "Risk analytics in production" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. On the RIGHT THIRD: an
abstract, elegant risk-analytics visualization — softly glowing charts, a score distribution curve and
ranked reason-code bars rendered as light on glass panels. The LEFT HALF is calm and darker and mostly
empty for the overlay card. Deep plum backdrop, violet (#7E49F2) and gold (#F2CB07) glow, glassy
reflections. Premium data-viz render, ultra-detailed, 8k.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Credit Scoring — score the borrowers the old models can't see`

### 8.4 Debt Collection

**Hero** — `debt-collection.hero.image` (Pexels 9487235)

```
Premium fintech 3D RENDER, cinematic hero for AI-driven debt collection, 16:9 landscape, 2400x1350.
Center-right: an abstract visual of accounts being intelligently segmented and routed — glowing nodes
sorted into priority streams flowing toward channels (message, voice, agent) as light paths, on a deep
navy-to-plum backdrop. Volumetric violet (#7E49F2) and gold (#F2CB07) lighting. LEFT THIRD dark and
empty for headline text; composition weighted center-right. Smart, efficient feel, premium,
ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**Overview** — `debt-collection.overview.image.src` (Pexels 8681899) · caption "Collections agent at work" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. NO people. On the RIGHT: an
elegant abstract of delinquent-account nodes being scored and routed into priority streams that flow
toward channel icons of light (message, voice, agent), the top-propensity path a bright gold STARBURST.
The LEFT HALF is calm and darker and mostly empty for the overlay card. Deep plum void, violet (#7E49F2)
and gold (#F2CB07) light, glassy reflections, no readable text. Premium data render, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt (hero):** `Debt Collection — recover more, at a lower cost to collect`

### 8.5 Reconciliation AI

**Hero** — `reconciliation-ai.hero.image` (Pexels 12969403)

```
Premium fintech 3D RENDER, cinematic hero for AI auto-reconciliation, 16:9 landscape, 2400x1350.
Center-right: an abstract visual of two streams of glowing data points (payments and ledger entries)
auto-matching into clean linked pairs, with a few flagged "breaks" highlighted in gold — all made of
light on a deep navy-to-plum backdrop. Volumetric violet (#7E49F2) and gold (#F2CB07) lighting. LEFT
THIRD dark and empty for headline text; composition weighted center-right. "Books that balance
themselves" feel, premium, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**Overview** — `reconciliation-ai.overview.image.src` (Pexels 106344) · caption "Continuous, AI-driven reconciliation" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. On the RIGHT THIRD: an
elegant abstract visualization of multi-source payments (bank, PSP, mobile-money) flowing in and
auto-matching to ledger lines, rendered as glowing light streams and glass panels. The LEFT HALF is calm
and darker and mostly empty for the overlay card. Deep plum backdrop, violet (#7E49F2) and gold
(#F2CB07) glow. Premium fintech data render, ultra-detailed, 8k.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Reconciliation AI — books that balance themselves`

### 8.6 Collection Marketing AI

**Hero** — `collection-marketing-ai.hero.image` (Pexels 37274979)

```
Premium fintech 3D RENDER, cinematic hero for behaviour-driven collection nudges. NO people, NO phones.
16:9 landscape, 2400x1350. Center-right: a soft, friendly pulse of violet-gold light travels gently along
a fine light-path toward a distant account-node that warms and blooms into a gold STARBURST as it
"self-cures" — quiet, respectful, no pressure. Deep navy-to-plum void, volumetric haze, violet (#7E49F2)
and gold (#F2CB07) light, one soft flare. LEFT THIRD dark and empty for headline text. Gentle, premium,
ultra-detailed, 8k octane render.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

**Overview** — `collection-marketing-ai.overview.image.src` (Pexels 139387) · caption "Self-cure, one nudge at a time · Kano" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. NO people, NO phones. On the
RIGHT: a glowing self-cure journey path of light stepping toward a bright payment-link node that blooms
into a gold STARBURST — the moment a balance clears on its own. The LEFT HALF is calm and darker and
mostly empty for the overlay card. Deep plum void, violet (#7E49F2) and gold (#F2CB07) light, glassy
reflections, no readable text. Premium product render, ultra-detailed, 8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt (hero):** `Collection Marketing AI — turn reminders into repayments`

### 8.7 Campaign Management

**Hero** — `campaign-management.hero.image` (Pexels 9489091)

```
Premium fintech 3D RENDER, cinematic hero for multi-channel campaign management, 16:9 landscape,
2400x1350. Center-right: an abstract visual of one campaign fanning out across channels — a central
glowing hub sending light paths to SMS, WhatsApp, email, voice and missed-call icon-nodes made of light,
on a deep navy-to-plum backdrop. Volumetric violet (#7E49F2) and gold (#F2CB07) lighting. LEFT THIRD
dark and empty for headline text; composition weighted center-right. Orchestrated, measurable feel,
premium, ultra-detailed, 8k octane render.
Do NOT include: any readable text, words, numbers, logos, watermarks or UI labels; shop signage or
photographic clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**Overview** — `campaign-management.overview.image.src` (Pexels 9487241) · caption "Campaign planning · Lagos" · subject on RIGHT

```
Premium fintech 3D RENDER, wide cinematic banner, 2:1 landscape, 2400x1200. NO people. On the RIGHT: an
elegant campaign journey rendered as light — a branching multi-step flow fanning to channel-nodes (SMS,
WhatsApp, email, voice) and curving back into a glowing results funnel, a gold STARBURST at conversion.
The LEFT HALF is calm and darker and mostly empty for the overlay card. Deep plum void, violet (#7E49F2)
and gold (#F2CB07) light, glassy reflections, no readable text. Premium product render, ultra-detailed,
8k.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, market stalls,
crowded streets or cluttered backgrounds; distorted hands, extra fingers or deformed faces;
oversaturation, HDR halos, cheesy stock-photo posing, low resolution or motion blur.
```

- **Alt (hero):** `Campaign Management — design, target and automate every campaign`

---

## 9. Summary table — every slot at a glance

| #  | Page       | Section                   | File / data key                                | Aspect | Export     | Register        |
| -- | ---------- | ------------------------- | ---------------------------------------------- | ------ | ---------- | --------------- |
| 1  | Home       | Hero slide 1              | `public/hero/slide-market.webp`              | 16:9   | 2400×1350 | PHOTO           |
| 2  | Home       | Hero slide 2              | `public/hero/slide-kiosk.webp`               | 16:9   | 2400×1350 | PHOTO           |
| 3  | Home       | Hero slide 3              | `public/hero/slide-shop-credit.webp`         | 16:9   | 2400×1350 | PHOTO           |
| 4  | Home       | Industries · Banks       | `app/page.tsx INDUSTRIES[0]`                 | 16:10  | 1600×1000 | PHOTO           |
| 5  | Home       | Industries · NBFCs       | `app/page.tsx INDUSTRIES[1]`                 | 16:10  | 1600×1000 | PHOTO           |
| 6  | Home       | Industries · Telecom     | `app/page.tsx INDUSTRIES[2]`                 | 16:10  | 1600×1000 | PHOTO           |
| 7  | Home       | Last mile                 | `public/hero/section-last-mile.webp`         | 4:3    | 1600×1200 | PHOTO           |
| 8  | About      | Hero                      | `about HeroDark image`                       | 16:9   | 2400×1350 | PHOTO           |
| 9  | About      | Mission                   | `about mission Image`                        | 4:3    | 1600×1200 | PHOTO           |
| 10 | About      | Portrait · Tahseen       | `public/team/tahseen-jamal.png`              | 1:1    | 1000×1000 | EDIT real photo |
| 11 | About      | Portrait · Rohit         | `public/team/rohit-ahuja.png`                | 1:1    | 1000×1000 | EDIT real photo |
| 12 | GSM        | Hero                      | `gsm HeroDark image`                         | 16:9   | 2400×1350 | PHOTO           |
| 13 | GSM        | Why it matters            | `gsm why Image`                              | 4:3    | 1600×1200 | PHOTO           |
| 14 | Industries | Hero                      | `industries HeroDark image`                  | 16:9   | 2400×1350 | PHOTO           |
| 15 | Industries | Block · Banks            | `industries BLOCKS[0]`                       | 4:3    | 1600×1200 | PHOTO           |
| 16 | Industries | Block · NBFCs            | `industries BLOCKS[1]`                       | 4:3    | 1600×1200 | PHOTO           |
| 17 | Industries | Block · Telecom          | `industries BLOCKS[2]`                       | 4:3    | 1600×1200 | PHOTO           |
| 18 | Products   | Hub hero                  | `products HeroDark image`                    | 16:9   | 2400×1350 | RENDER          |
| 19 | Products   | Micro Lending hero        | `micro-lending.hero.image`                   | 16:9   | 2400×1350 | PHOTO           |
| 20 | Products   | Consumer hero             | `consumer-retail-lending.hero.image`         | 16:9   | 2400×1350 | PHOTO           |
| 21 | Products   | Commercial hero           | `core-commercial-lending.hero.image`         | 16:9   | 2400×1350 | PHOTO           |
| 22 | Products   | SCF hero                  | `supply-chain-finance.hero.image`            | 16:9   | 2400×1350 | RENDER          |
| 23 | Solutions  | Hub hero                  | `solutions HeroDark image`                   | 16:9   | 2400×1350 | RENDER          |
| 24 | Solution   | Loan Origination hero     | `loan-origination.hero.image`                | 16:9   | 2400×1350 | PHOTO           |
| 25 | Solution   | Loan Origination overview | `loan-origination.overview.image.src`        | 2:1    | 2400×1200 | PHOTO           |
| 26 | Solution   | Loan Management hero      | `loan-management.hero.image`                 | 16:9   | 2400×1350 | RENDER          |
| 27 | Solution   | Loan Management overview  | `loan-management.overview.image.src`         | 2:1    | 2400×1200 | PHOTO           |
| 28 | Solution   | Credit Scoring hero       | `credit-scoring.hero.image`                  | 16:9   | 2400×1350 | RENDER          |
| 29 | Solution   | Credit Scoring overview   | `credit-scoring.overview.image.src`          | 2:1    | 2400×1200 | RENDER          |
| 30 | Solution   | Debt Collection hero      | `debt-collection.hero.image`                 | 16:9   | 2400×1350 | RENDER          |
| 31 | Solution   | Debt Collection overview  | `debt-collection.overview.image.src`         | 2:1    | 2400×1200 | PHOTO           |
| 32 | Solution   | Reconciliation hero       | `reconciliation-ai.hero.image`               | 16:9   | 2400×1350 | RENDER          |
| 33 | Solution   | Reconciliation overview   | `reconciliation-ai.overview.image.src`       | 2:1    | 2400×1200 | RENDER          |
| 34 | Solution   | Collection Mktg hero      | `collection-marketing-ai.hero.image`         | 16:9   | 2400×1350 | PHOTO           |
| 35 | Solution   | Collection Mktg overview  | `collection-marketing-ai.overview.image.src` | 2:1    | 2400×1200 | PHOTO           |
| 36 | Solution   | Campaign Mgmt hero        | `campaign-management.hero.image`             | 16:9   | 2400×1350 | RENDER          |
| 37 | Solution   | Campaign Mgmt overview    | `campaign-management.overview.image.src`     | 2:1    | 2400×1200 | PHOTO           |

**37 image slots total.** Notes:

- The current site **reuses** the same placeholder across several slots (e.g. Pexels 30688593 on both About
  hero and Products hero; 12478756 on Home telecom, Industries telecom and SCF; 9489091 on Consumer hero and
  Campaign hero; 577195 on Solutions hero and Commercial hero; 36096255 on GSM and Micro). The prompts above
  give each slot a **unique, section-specific** image so nothing repeats.
- Where a literal photo would look generic for a software capability (AI scoring, reconciliation, campaign
  fan-out, the platform stack), the prompt uses the **RENDER** register — it reads as more premium and more
  relevant than another laptop-on-a-desk photo.
- Keep one consistent grade across all 37 and the site will finally look art-directed instead of assembled.
- **People policy applied:** every hero and section is now **abstract / product-render / architectural (no
  people)** except **#7 (last mile)** and **#10/#11 (founder photos)**. The `Register` column above predates
  this revision — treat all slots as **RENDER** except #7 (PHOTO) and #10/#11 (EDIT real photos).
- **Overview caption note:** solution "overview" banners (#25, #27, #31, #35, #37) are now abstract, so the
  city captions in `lib/solutions-data.ts` (e.g. `"Onboarding session · Lagos, Nigeria"`, `"… · Kano"`,
  `"Campaign planning · Lagos"`) no longer match — change those `caption` values to concept labels (e.g.
  "Digital onboarding", "Continuous servicing", "Self-cure journey") or I can update them for you.

---

## 10. Creative Director's Cut — enhanced, art-directed prompts

> Section 2–8 are the **clean, safe** set. This section is the **elevated** set: a single campaign idea with
> signature motifs so the whole site reads like **one owned brand film**, not 37 separate stock shots. Each
> prompt below is still fully self-contained (concept + cinematography + size + guardrails). Use these when
> you want more art-direction and distinctiveness; mix-and-match with the base set as you like.

### The campaign idea — **"The Spark of Credit"**

PhotonMatters = *photons* = **light**, and the logo is a **starburst**. So light is the through-line of the
whole visual system. Every image carries one deliberate **spark** — a small, precise burst/glint of
**violet-and-gold** light that marks the exact instant something happens: a loan is *approved*, data
*resolves*, a connection *lands*, a person is *seen* by the system for the first time. That single recurring
motif is what will make this site instantly recognisable as PhotonMatters.

**Signature motifs (weave 1–2 into every image, never all at once):**

- **The Spark** — a four-point starburst glint of violet `#7E49F2` core + gold `#F2CB07` edge, tiny and
  intentional, at the moment of value (on a screen, a fingertip, a data node).
- **Light-as-data** — thin ribbons/particles of violet-gold light standing in for money, signals, decisions.
- **Human dignity** — emerging-market protagonists shot like the leads of a premium brand film: Rembrandt
  key light, honest skin, quiet confidence — never "beneficiary" clichés.
- **Architected calm** — for institutional pages: brutalist-minimal geometry, one hero object, vast negative
  space, fog-lit depth.

**Shared cinematic grammar (already written into each prompt below):** cinematic anamorphic framing; subtle
horizontal lens flare in brand hues; a teal-shadow / plum-and-violet color science with warm gold accents;
volumetric atmospheric haze for depth; tactile premium materials (frosted glass, brushed dark metal, matte
stone); shot like an Apple / Stripe brand film — restrained, confident, expensive.

---

### 10.A HOME

**#1 · Home hero slide 1** — `public/hero/slide-market.webp` · 16:9 · 2400×1350 · text-left

```
UI screenshot of a modern fintech lending dashboard, dark mode — a clean product-design mockup of a real
SaaS web app (Stripe / Ramp / Mercury / Linear style). A flat 2D interface shown as a single rounded app
window filling the RIGHT two-thirds of the frame, on a plain dark plum (#1A1426) background that fades to
near-black on the LEFT (empty space for a headline). The interface contains: a slim left nav rail with
simple line icons; a top row of 3 KPI stat cards; a large highlighted "Loan Approved" card with a green
check and a bold amount; a small circular credit-score gauge; and a wide line/area chart of disbursements
with a violet-to-gold gradient fill. Rounded corners, soft subtle shadows, crisp modern sans-serif, violet
(#7E49F2) primary accents, small gold (#F2CB07) highlights, generous whitespace, only short 1–2 word labels
and a few numbers. Sharp, high-resolution, professional product screenshot. 16:9, 2400x1350.
Do NOT include: space, galaxy, nebula, stars, cosmos, glowing starburst, light rays, lens flare, energy
beams or abstract light; any people or hands; photographic or cinematic 3D backgrounds; long paragraphs or
gibberish text; real company logos or watermarks.
```

- **Alt:** `The PhotonMatters lending dashboard — instant loan approvals`

**#2 · Home hero slide 2** — `public/hero/slide-kiosk.webp` · 16:9 · 2400×1350 · text-left

```
UI screenshot of a credit-scoring / decisioning screen in a modern fintech web app, dark mode — a clean
product-design mockup (Stripe / Ramp / Linear style). A flat 2D interface shown as a single rounded app
window filling the RIGHT two-thirds of the frame, on a plain dark plum (#1A1426) background that fades to
near-black on the LEFT (empty space for a headline). The interface contains: a large circular credit-score
gauge showing a sample score; a vertical list of 4 "reason-code" rows, each a short label with a small icon
and a mini progress bar; an approve / decline pill toggle; and a row of small data-source chips (Bureau,
Telco, Cashflow). Rounded cards, soft subtle shadows, crisp modern sans-serif, violet (#7E49F2) accents,
small gold (#F2CB07) highlights, generous whitespace, only short labels and a few numbers. Sharp,
high-resolution, professional product screenshot. 16:9, 2400x1350.
Do NOT include: space, galaxy, nebula, stars, cosmos, glowing starburst, light rays, lens flare, energy
beams or abstract light; any people or hands; photographic or cinematic 3D backgrounds; long paragraphs or
gibberish text; real company logos or watermarks.
```

- **Alt:** `Explainable AI credit scoring with reason codes`

**#3 · Home hero slide 3** — `public/hero/slide-shop-credit.webp` · 16:9 · 2400×1350 · text-left

```
UI screenshot of a portfolio-analytics dashboard in a modern fintech web app, dark mode — a clean
product-design mockup (Stripe / Ramp / Mercury / Linear style). A flat 2D interface shown as a single
rounded app window filling the RIGHT two-thirds of the frame, on a plain dark plum (#1A1426) background that
fades to near-black on the LEFT (empty space for a headline). The interface contains: a large rising area
chart of portfolio growth with a violet-to-gold gradient fill; a row of 3–4 KPI stat cards (Disbursed,
Active loans, Recovery %); and a small segmented "regions" control reading Africa · India · ME. Rounded
cards, soft subtle shadows, crisp modern sans-serif, violet (#7E49F2) accents, small gold (#F2CB07)
highlights, generous whitespace, only short labels and a few numbers. Sharp, high-resolution, professional
product screenshot. 16:9, 2400x1350.
Do NOT include: space, galaxy, nebula, stars, cosmos, glowing starburst, light rays, lens flare, energy
beams or abstract light; any people or hands; photographic or cinematic 3D backgrounds; long paragraphs or
gibberish text; real company logos or watermarks.
```

- **Alt:** `Portfolio growth across Africa, India and the Middle East`

**#4 · Home — Industries · Banks** — `INDUSTRIES[0]` · 16:10 · 1600×1000

```
Architected-calm brand still, 16:10, 1600x1000. A monumental modern bank facade shot from a low hero angle at
blue hour, brutalist glass-and-stone geometry receding into fog, one warm gold-lit lobby glowing deep inside
like a single spark in the structure. Vast sky negative space, perfectly level verticals, atmospheric haze,
subtle violet (#7E49F2) reflection sliding across the glass, a faint horizontal lens flare. No people, no
signage. Cool cinematic plum-navy grade, quietly powerful. Photorealistic, ultra-detailed, 8k. Shot on ARRI Alexa 65 with an anamorphic prime lens, A24 brand-film color grade.
Do NOT include: any text, words, logos, watermarks or brand names; signage or clutter; oversaturation, HDR
halos, low resolution or motion blur.
```

- **Alt:** `Modern bank headquarters — digital-first credit`

**#5 · Home — Industries · NBFCs** — `INDUSTRIES[1]` · 16:10 · 1600×1000

```
Premium 3D brand-film RENDER, cinematic, 16:10, 1600x1000. NO people. An elegant floating glassmorphic
lending workspace — softly-glowing product-builder cards and alt-data risk panels (cashflow, telco,
repayment) feeding a clean approval node, all made of light, with one small violet-gold STARBURST SPARK the
instant a decision lands. Deep plum-teal void, volumetric haze, one horizontal anamorphic flare, glassy
reflections, no readable text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24
brand-film color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Configurable lending rails on an alternative-data engine`

**#6 · Home — Industries · Telecom** — `INDUSTRIES[2]` · 16:10 · 1600×1000

```
Conceptual 3D brand-film RENDER, cinematic, 16:10, 1600x1000. NO people, NO phones. A luminous point emits a
violet-gold STARBURST that radiates concentric rings of light-as-data, dissolving into an abstract
out-of-focus lattice of glowing signal towers far behind — "airtime becomes credit." Deep plum-navy grade,
volumetric haze, one horizontal anamorphic flare, gold accents on the ring edges. Minimal, premium.
Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Turning telecom subscribers into a financial-services base`

**#7 · Home — The last mile** — `public/hero/section-last-mile.webp` · 4:3 · 1600×1200

```
Emotive brand-film portrait, 4:3, 1600x1200. A dignified small entrepreneur, half in shadow, turns toward a
soft light as a first loan approves on the phone in their hands — a tiny violet-gold STARBURST SPARK on the
screen lights their face from below like hope made literal. Rembrandt key, violet rim, warm honest skin, the
entire background pure atmospheric plum haze and bokeh — no place, no clutter. 85mm anamorphic feel, filmic
grain. Cinematic, respectful, quietly moving — never a "beneficiary" cliché. Photorealistic, ultra-detailed,
8k. Shot on ARRI Alexa 65 with an anamorphic prime lens, A24 brand-film color grade.
Do NOT include: any text, words, numbers, logos, watermarks or UI labels; shop signage, stalls or clutter;
distorted hands or deformed faces; oversaturation, HDR halos, stock-photo posing, low resolution or motion
blur.
```

- **Alt:** `A first fair loan, approved on a phone at the last mile`

---

### 10.B ABOUT

**#8 · About hero** — `about HeroDark image` · 16:9 · 2400×1350 · text-left

```
Abstract 3D brand-film RENDER, cinematic anamorphic hero, 16:9, 2400x1350. NO people, NO phones. Themed "the
people the system couldn't see, finally seen": across a dark violet-to-black field, scattered dim points of
light ignite one by one into a warm constellation, linked by fine threads of light-as-data radiating from a
soft central STARBURST source, one resolving into a bright gold SPARK. Vast dark negative space on the LEFT
for headline text; constellation center-right. Volumetric haze, anamorphic flare, plum-teal grade, filmic
grain. Mission-driven, poetic, expensive. Ultra-detailed, 8k octane render. Apple-keynote product-film
finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Banking the people the system forgot`

**#9 · About — Mission figure** — `about mission Image` · 4:3 · 1600×1200

```
Abstract 3D brand-film RENDER, cinematic, 4:3, 1600x1200. NO people, NO hands. "Human-centered credit, built
together": two separate threads of light — one violet (#7E49F2, the institution), one warm gold (#F2CB07,
the borrower) — curve toward each other and weave into a single brighter strand, a small STARBURST SPARK at
the join marking the moment trust becomes credit. Deep plum void, one warm accent, atmospheric haze, glassy
reflections, elegant negative space. Optimistic, tactile, premium. Ultra-detailed, 8k octane render.
Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces or hands; any text, numbers, logos, watermarks or UI; signage or clutter;
oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Building human-centered credit, together`

**#10 & #11 · Founder portraits** — `public/team/*.png` · 1:1 · 1000×1000 · **EDIT real photos only**

```
EDIT this uploaded founder headshot. Keep the face, identity, age and likeness 100% UNCHANGED. Rebuild only
the lighting and background into a cinematic executive portrait: a deep plum-to-charcoal (#1A1426) seamless
backdrop with a soft violet (#7E49F2) radial glow behind one shoulder and a whisper of gold (#F2CB07) rim
light on the opposite edge, like the poster of a premium brand film. Add gentle volumetric haze for depth,
a Rembrandt key on the face, natural skin texture, flattering crisp retouch. Square 1:1, head-and-shoulders,
eyes to camera. Both founders must match exactly in light and tone. Ultra-detailed, 8k. Cinematic executive-portrait finish, ARRI Alexa look, A24 color grade.
Do NOT include: any text, words, logos or watermarks; changed facial features, altered identity or age;
background clutter; oversaturation, HDR halos, plastic skin, or low resolution.
```

- **Alt (Tahseen):** `Tahseen Jamal — Co-Founder & CEO` · **Alt (Rohit):** `Rohit Ahuja — Co-Founder & CCO`

---

### 10.C GSM

**#12 · GSM hero** — `gsm HeroDark image` · 16:9 · 2400×1350 · text-left

```
Abstract 3D brand-film RENDER, cinematic conceptual hero, 16:9, 2400x1350. NO people, NO phones. Center-right:
a single luminous point detonates a violet-gold STARBURST and sends clean concentric rings of light-as-data
expanding across the frame — "zero-cost reach that touches everyone" — the outermost rings dissolving into
countless tiny distant light points. Deep plum void, atmospheric haze, one horizontal flare, gold spark,
violet rings, filmic grain. Left third near-black for headline text. Minimal, powerful, telecom-tech.
Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `A signal pulsing out to reach every subscriber at zero cost`

**#13 · GSM — Why it matters** — `gsm why Image` · 4:3 · 1600×1200

```
Abstract 3D brand-film RENDER, cinematic, 4:3, 1600x1200. NO people, NO phones. A single elegant pulse of
light: one bright gold-violet point lifts a tiny STARBURST SPARK and emits a clean expanding ring across a
dark plum void — a minimal icon of "the cheapest channel, a free flash." Volumetric haze, soft caustics,
deep negative space, filmic grain. Tactile, premium. Ultra-detailed, 8k octane render. Apple-keynote
product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `A free flash — the cheapest channel, as a pulse of light`

---

### 10.D INDUSTRIES

**#14 · Industries hero** — `industries HeroDark image` · 16:9 · 2400×1350 · text-left

```
Architected-calm cinematic hero, 16:9, 2400x1350. A financial-district skyline at blue hour rendered as
sculptural silhouettes in fog, one tower center-right catching a violet-gold edge of light like a single
spark among the institutions. Vast atmospheric negative space, low hero angle, anamorphic horizontal flare,
plum-navy grade, gold interior glimmers deep in the glass. No brand names, no people, no signage. Institutional
gravity, expensive restraint. Photorealistic, ultra-detailed, 8k. Shot on ARRI Alexa 65 with an anamorphic prime lens, A24 brand-film color grade.
Do NOT include: any text, words, logos, watermarks or brand names; signage or clutter; oversaturation, HDR
halos, low resolution or motion blur.
```

- **Alt:** `The institutions that move credit`

**#15 · Industries — Banks block** — `BLOCKS[0]` · 4:3 · 1600×1200

```
Architected-calm still, 4:3, 1600x1200. An interior detail of a modern banking hall reduced to pure geometry —
a sweep of pale stone, a rhythm of glass fins, a shaft of daylight cutting through volumetric haze, and one
small violet-gold STARBURST SPARK of reflected light where the planes meet. No people, no signage, no clutter.
Minimalist, calm, prestigious. Cool plum grade with a warm gold accent. Photorealistic, ultra-detailed, 8k. Shot on ARRI Alexa 65 with an anamorphic prime lens, A24 brand-film color grade.
Do NOT include: any text, words, logos, watermarks or brand names; signage or clutter; oversaturation, HDR
halos, low resolution or motion blur.
```

- **Alt:** `Digital-first credit, free of legacy core constraints`

**#16 · Industries — NBFCs block** — `BLOCKS[1]` · 4:3 · 1600×1200

```
Premium 3D brand-film RENDER, cinematic, 4:3, 1600x1200. NO people. A floating glassmorphic lending
workspace — product-builder cards and alt-data risk panels of light — with a small violet-gold STARBURST
SPARK flaring as an approval resolves. Deep plum-teal void, atmospheric haze, one horizontal flare, glassy
reflections, no readable text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24
brand-film color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Scaling alternative lending on configurable rails`

**#17 · Industries — Telecom block** — `BLOCKS[2]` · 4:3 · 1600×1200

```
Conceptual 3D brand-film RENDER, cinematic, 4:3, 1600x1200. NO people, NO phones. A luminous point emits a
violet-gold STARBURST that unfurls into elegant light-as-data ribbons weaving toward a distant, out-of-focus
glowing network lattice — connectivity turning into credit. Deep plum-navy grade, volumetric haze, gold
ribbon highlights, one horizontal flare. Minimal, premium. Ultra-detailed, 8k octane render. Apple-keynote
product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Turning a subscriber base into a financial-services business`

---

### 10.E PRODUCTS

**#18 · Products hub hero (RENDER)** — `products HeroDark image` · 16:9 · 2400×1350 · text-left

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: a slow-motion "explosion-assembly" of
translucent frosted-glass credit cards, coins and loan tiles suspended in mid-air, each catching violet
(#7E49F2) and gold (#F2CB07) volumetric light, all orbiting a single bright STARBURST SPARK at the core —
"one platform, every lending product." Deep plum studio void, atmospheric haze, soft caustic reflections,
anamorphic flare. Left third dark and empty for headline text. Apple-keynote-grade product render,
ultra-detailed, 8k octane render. A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; photographic clutter or signage;
oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Lending reimagined for every market and every need`

**#19 · Micro Lending hero** — `micro-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Cinematic 3D brand-film hero, 16:9, 2400x1350. NO people, NO hands, NO phones. Center-right: a graceful
cascade of many tiny luminous coins and tokens of pure light streaming and scattering — high-volume
micro-loans in motion, each a small violet-gold STARBURST SPARK trailing quick ripples of light-as-data.
Deep plum void, atmospheric haze, one horizontal anamorphic flare, filmic grain. Left third near-black for
headline text. Fast, abundant, expensive. Ultra-detailed, 8k octane render. Apple-keynote product-film
finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Micro Lending — built for speed and scale`

**#20 · Consumer & Retail Lending hero** — `consumer-retail-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Cinematic 3D brand-film hero, 16:9, 2400x1350. NO people, NO hands, NO phones. Center-right: a single bright
stream of light hits a soft violet-gold STARBURST SPARK and splits into elegant light-ribbon instalments
that curve gracefully away in equal segments — effortless, embedded credit. Deep plum-teal grade, gold
accents, atmospheric haze, anamorphic flare, glassy reflections. Left third dark for headline text.
Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Consumer & Retail Lending — real-time, embedded credit`

**#21 · Core Commercial Lending hero** — `core-commercial-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Architected-calm cinematic 3D hero, 16:9, 2400x1350. NO people. Center-right: the soaring glass atrium of a
fog-lit corporate tower seen from a low heroic angle, a large translucent light-panel deep within where a
commercial deal resolves into a single gold STARBURST SPARK. Structural, composed, powerful. Deep plum-navy
grade, violet reflections in the glass, volumetric haze, anamorphic flare. Left third dark for headline text.
Institutional, expensive, restrained. Ultra-detailed, 8k octane render. Apple-keynote product-film finish,
A24 brand-film color grade.
Do NOT include: any people, faces, text, numbers, logos, watermarks, brand names or signage; clutter;
oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Core Commercial Lending — structured credit for business`

**#22 · Supply Chain Finance hero (RENDER)** — `supply-chain-finance.hero.image` · 16:9 · 2400×1350 · text-left

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: an elegant supply chain rendered as glowing
glass nodes — anchor, supplier, distributor — linked by flowing gold-and-violet light-rivers of working
capital, with a bright STARBURST SPARK igniting at each hand-off where finance unlocks. Stylised frosted cargo
and invoice forms float as light. Deep plum studio void, volumetric haze, caustic reflections, anamorphic
flare. Left third dark for headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; photographic clutter or signage;
oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `Supply Chain Finance — working capital that moves with the chain`

---

### 10.F SOLUTIONS HUB

**#23 · Solutions hub hero (RENDER)** — `solutions HeroDark image` · 16:9 · 2400×1350 · text-left

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: a modular platform rendered as a stack of
floating frosted-glass layers — originate, manage, score, collect, reconcile — each a thin luminous slab that
locks into the next, a violet-gold STARBURST SPARK flaring at every join where data passes cleanly through.
API light-threads stitch the layers together. Deep plum studio void, volumetric haze, glassmorphism, caustic
reflections, anamorphic flare. Left third dark for headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; photographic clutter or signage;
oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt:** `The complete lending and collections platform stack`

---

### 10.G SOLUTION DETAIL PAGES

> Reminder: heroes = 16:9 (subject center-right, left dark for text); overview banners = 2:1 · 2400×1200
> (**subject on the RIGHT**, left half calm for the glass overlay card, match the caption city).

**#24 · Loan Origination hero** — `loan-origination.hero.image` · 16:9

```
Cinematic 3D brand-film hero, 16:9, 2400x1350. NO people, NO phones. Center-right: a sleek floating
glassmorphic onboarding flow — stacked application and eKYC panels of light — as a verification check
completes and a violet-gold STARBURST SPARK confirms identity, light-as-data motes rising around it. Deep
plum void, glassmorphism, atmospheric haze, anamorphic flare. Left third dark for headline text.
Frictionless, premium. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film
color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**#25 · Loan Origination overview** — `loan-origination.overview.image.src` · 2:1 · subject RIGHT · "Lagos, Nigeria"

```
Cinematic 3D brand-film banner, 2:1, 2400x1200. NO people, NO phones. On the RIGHT: floating glassmorphic
onboarding and eKYC panels of light — capture, verify, decide — with a glowing verification STARBURST
checkmark as approval lands. The LEFT HALF falls to calm plum shadow and haze, mostly empty for the overlay
card. Glassmorphism, anamorphic flare, filmic grain, violet-and-gold volumetric light, no readable text.
Premium product render. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Loan Origination — application to disbursement in minutes`

**#26 · Loan Management hero (RENDER)** — `loan-management.hero.image` · 16:9

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: a loan's whole life rendered as a luminous
ribbon looping through floating frosted-glass ledger panels — disburse, service, collect, close — accruals
blooming as soft light along the curve, a gold STARBURST SPARK at each posting. Multi-currency coins of light
orbit quietly. Deep plum void, volumetric haze, glassmorphism, anamorphic flare. Left third dark for headline
text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

**#27 · Loan Management overview** — `loan-management.overview.image.src` · 2:1 · subject RIGHT · "Servicing team"

```
Cinematic 3D brand-film banner, 2:1, 2400x1200. NO people. On the RIGHT: floating glassmorphic servicing
panels of light — a repayment schedule, an accrual curve and a multi-currency ledger motif — with a small
violet-gold STARBURST SPARK as the books reconcile true. The LEFT HALF sinks to plum shadow and haze, mostly
empty for the overlay card. Glassmorphism, anamorphic flare, filmic grain, no readable numbers. Competent,
premium. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Loan Management — the system of record for the whole loan life`

**#28 · Credit Scoring hero (RENDER)** — `credit-scoring.hero.image` · 16:9

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: hundreds of light-as-data streams — telco,
cashflow, bureau, behaviour — pour in from the dark and converge, resolving into a single luminous score
gauge; the instant it settles, a violet-gold STARBURST SPARK fires and clean "reason-code" light-bars fan out
beside it. "Explainable, not a black box." Deep plum void, volumetric haze, caustics, anamorphic flare. Left
third dark for headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

**#29 · Credit Scoring overview (RENDER)** — `credit-scoring.overview.image.src` · 2:1 · subject RIGHT

```
Premium 3D data-viz render, cinematic banner, 2:1, 2400x1200. On the RIGHT: an elegant floating cluster of
frosted-glass analytics panels — a score distribution curve, ranked reason-code bars, a champion/challenger
split — all rendered as glowing light, a gold STARBURST SPARK at the decision point. The LEFT HALF is calm
plum void and haze for the overlay card. Violet-and-gold volumetric light, glassmorphism, anamorphic flare.
No readable numbers. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Credit Scoring — score the borrowers the old models can't see`

**#30 · Debt Collection hero (RENDER)** — `debt-collection.hero.image` · 16:9

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: a field of glowing account-nodes
intelligently self-sorting into priority streams that flow toward channel icons of light — message, voice,
agent — the highest-propensity path igniting a gold STARBURST SPARK. "The right action, to the right account,
at the right time." Deep plum void, volumetric haze, violet-gold light, anamorphic flare. Left third dark for
headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

**#31 · Debt Collection overview** — `debt-collection.overview.image.src` · 2:1 · subject RIGHT · "Collections agent"

```
Cinematic 3D brand-film banner, 2:1, 2400x1200. NO people. On the RIGHT: delinquent-account nodes of light
are scored and routed into priority streams flowing toward channel icons — message, voice, agent — a soft
violet-gold STARBURST SPARK marking a promise-to-pay captured. The LEFT HALF sinks to plum shadow and haze
for the overlay card. Violet-and-gold volumetric light, glassmorphism, anamorphic flare, filmic grain, no
readable text. Respectful, premium. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film
color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Debt Collection — recover more, at a lower cost to collect`

**#32 · Reconciliation AI hero (RENDER)** — `reconciliation-ai.hero.image` · 16:9

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: two rivers of glowing data — payments and
ledger entries — flow toward each other and auto-match into clean linked pairs of light, snapping together
with tiny violet-gold STARBURST SPARKS; a few unmatched "breaks" hover apart, flagged in warm gold. "Books
that balance themselves." Deep plum void, volumetric haze, caustics, anamorphic flare. Left third dark for
headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

**#33 · Reconciliation AI overview (RENDER)** — `reconciliation-ai.overview.image.src` · 2:1 · subject RIGHT

```
Premium 3D data render, cinematic banner, 2:1, 2400x1200. On the RIGHT: multi-source settlement streams —
bank, PSP, mobile-money — pour into a luminous matching engine and resolve into neat paired light-lines, one
gold STARBURST SPARK where a break clears. The LEFT HALF is calm plum void and haze for the overlay card.
Frosted-glass panels, violet-gold volumetric light, anamorphic flare. No readable numbers. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Reconciliation AI — books that balance themselves`

**#34 · Collection Marketing AI hero** — `collection-marketing-ai.hero.image` · 16:9

```
Cinematic 3D brand-film hero, 16:9, 2400x1350. NO people, NO phones. Center-right: a soft, friendly pulse of
violet-gold light travels along a fine light-path toward a distant account-node that warms and blooms into a
gentle STARBURST SPARK as the balance self-cures — no dunning, no pressure. Deep plum bokeh, warm key, violet
rim, atmospheric haze, anamorphic flare. "Turn reminders into repayments." Left third dark for headline text.
Gentle, respectful, premium. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24
brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any text, numbers, logos, watermarks or UI;
signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

**#35 · Collection Marketing AI overview** — `collection-marketing-ai.overview.image.src` · 2:1 · subject RIGHT · "Kano"

```
Cinematic 3D brand-film banner, 2:1, 2400x1200. NO people, NO phones. On the RIGHT: a glowing self-cure
journey path of light steps toward a bright payment-link node that blooms into a gold STARBURST SPARK — the
moment a balance clears on its own. The LEFT HALF falls to warm plum shadow and haze, mostly empty for the
overlay card. Golden-violet volumetric light, glassmorphism, anamorphic flare, filmic grain, no readable
text. Dignified, premium. Ultra-detailed, 8k. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any people, faces, hands, phones or devices; any readable text, numbers, logos, watermarks or
UI; signage or clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Collection Marketing AI — turn reminders into repayments`

**#36 · Campaign Management hero (RENDER)** — `campaign-management.hero.image` · 16:9

```
Premium 3D brand render, cinematic, 16:9, 2400x1350. Center-right: one glowing campaign hub fires a
violet-gold STARBURST SPARK that fans out into elegant light-paths reaching channel-nodes of light — SMS,
WhatsApp, email, voice, missed-call — each pulsing as it lands, then curving back as measurable results.
"Design, target, automate, prove." Deep plum void, volumetric haze, caustics, anamorphic flare. Left third
dark for headline text. Ultra-detailed, 8k octane render. Apple-keynote product-film finish, A24 brand-film color grade.
Do NOT include: any readable text, numbers, logos, watermarks or UI labels; clutter or signage; oversaturation,
HDR halos, low resolution or motion blur.
```

**#37 · Campaign Management overview** — `campaign-management.overview.image.src` · 2:1 · subject RIGHT · "Lagos"

```
Cinematic 3D brand-film banner, 2:1, 2400x1200. NO people. On the RIGHT: a campaign journey rendered as light
— a branching multi-step flow fanning to channel-nodes (SMS, WhatsApp, email, voice) and curving back into a
glowing results funnel, a gold STARBURST SPARK flaring at conversion as the journey goes live. The LEFT HALF
sinks to plum shadow and haze, mostly empty for the overlay card. Glassmorphism, anamorphic flare, filmic
grain, no readable text. Modern, premium. Ultra-detailed, 8k. Apple-keynote product-film finish, A24
brand-film color grade.
Do NOT include: any people, faces or hands; any readable text, numbers, logos, watermarks or UI; signage or
clutter; oversaturation, HDR halos, low resolution or motion blur.
```

- **Alt (hero):** `Campaign Management — design, target and automate every campaign`

---

### 10.H Consistency checklist (so the elevated set stays one campaign)

- ✅ Exactly **one STARBURST SPARK** per image — the brand's signature "moment of value." Never scatter many.
- ✅ Same **color science** everywhere: plum/teal shadows, violet `#7E49F2` mid-light, gold `#F2CB07` accent.
- ✅ Same **atmosphere**: volumetric haze + one subtle horizontal anamorphic flare. It glues photos to renders.
- ✅ **People** always shot with dignity (Rembrandt key + violet rim), never as clichés, never over-posed.
- ✅ **RENDER** slots (AI, platform, reconciliation, campaign, SCF, loan management) stay abstract glass-and-
  light; **PHOTO** slots stay human. Don't blend a literal office into a render.
- ✅ Heroes keep the **left third dark**; overview banners keep the **subject on the right**.
- ✅ The film-grade camera line (*ARRI Alexa 65 · anamorphic prime · A24 brand-film color grade*, or the
  *Apple-keynote product-film finish* on RENDER slots) is now **baked into every prompt above** — nothing
  to add manually.

```

```
