# PhotonMatters: Image Generation Prompts

> **Purpose:** Replace every placeholder image on the site with professional, on-brand, highly-relevant art.
> **For:** ChatGPT (GPT Image), Google Gemini "Nano Banana", or any modern image model.
> **One prompt per image slot.** Each is self-contained: copy the fenced block straight into the tool.

---

## 0. How to use

1. Every fenced block is a complete, ready-to-paste prompt: brand look, palette, composition, size and the
   "do NOT include" guardrails are all baked in.
2. Each entry lists **where it goes** (file path / data key + aspect ratio + export size), a one-line
   **concept**, the **PROMPT**, and suggested **Alt** text.
3. Generate at the stated **export size**; if the tool only outputs squares, generate large and crop to the
   aspect ratio, keeping the subject where the prompt says.
4. Save local files (`public/…`) as `.webp`; swap the remote URLs in the data files for the new local paths.
5. **Generate 3–4 of each and pick**: results vary run to run.

---

## 1. Brand context & art-direction system

**Who they are.** **PhotonMatters** is an **AI-native lending & collections platform** for **banks, NBFCs and
telecom operators** across **Africa, India and the Middle East / GCC** (HQ Dubai). Zero to live lending in
**8 weeks**, **250k+ requests/hour**, scoring the borrowers legacy models can't see. Tagline: *Built to
Disrupt · Engineered for Scale · Designed to Empower.*

**The brand idea: light.** *Photons = light.* The logo is a **starburst**. The signature motif across the
set is a small **four-point violet-and-gold starburst glint: the "photon mark"**: at the **moment of
value** (a loan approved, a decision made, credit reaching someone). Keep it **small and intentional**: it
is NOT a cosmic explosion.

**Palette (use these hexes in every prompt).**

- Primary violet **`#7E49F2`** · warm gold accent **`#F2CB07`** · soft lilac **`#E9A2F2`**
- Deep plum (dark base) **`#1A1426`** · cool navy (hero base) **`#07101F`**
- Slightly desaturated, premium: one or two brand hues glowing in the light, never rainbow.

**The image mix (this is deliberate: the site is human-led, not a wall of dashboards).**

- **PHOTO: people & editorial** *(the majority)*: the human, emotional, real-world moments: borrowers,
  lenders, teams, customers: shot editorially, candid, never stocky.
- **PHOTO: architecture**: institutional weight (banks, financial districts).
- **PRODUCT-UI** *(accent: ~10 slots only)*: clean dark-mode app screens, to show the real platform where it
  adds proof. **Never more than one per page.** Lead the prompt with *"UI screenshot / product mockup."*
- **DATAVIZ** *(rare: 2 slots)*: flat maps / flow diagrams, only for genuine "reach" or "multi-party flow".

**Composition.** Heroes (16:9, 2400×1350): headline on the **LEFT** → keep the left third darker/empty,
subject **center-right**. Overview banners (2:1, 2400×1200): a glass card covers the **left half** → put the
subject on the **RIGHT**.

**Universal negative (baked into each prompt).**

```
no outer space, galaxy, nebula or cosmic scenes; no giant/cosmic starburst or lens-flare fields; no gibberish
or dense text, no real logos or watermarks; no cheesy stock posing or smiling at the camera; no shop signage,
market stalls or clutter; no distorted hands or faces; no oversaturation, HDR or blur
```

---

## 2. HOME: `app/page.tsx` + `components/home/Hero.tsx`

> The hero carousel is **three distinct concepts**: **① the human last mile · ② the AI platform · ③ reach
> across 3 regions.** Cohesive only through the violet + gold palette.

### 2.1 Hero slide 1: ① The human last mile · PHOTO

- **File:** `public/hero/slide-market.webp` · 16:9 · 2400×1350 · text-left

```
Professional editorial photograph for a fintech lending hero, on-brand for "PhotonMatters" (photons = light),
16:9, 2400x1350. A dignified young entrepreneur or worker in an emerging market (Africa / India), in warm
cinematic light, looking down at a smartphone the moment a loan is approved. On the phone screen a small,
elegant four-point violet-and-gold STARBURST glint: the PhotonMatters photon mark, violet (#7E49F2) core,
warm gold (#F2CB07) edge: flares softly and casts a gentle glow up onto their hopeful face. Candid,
three-quarter angle, natural, never posing at the camera. Clean, softly blurred real-world background.
Cinematic grade on the brand's violet + gold palette. LEFT THIRD darker for headline text; subject
center-right. Aspirational, human, premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space, galaxy or nebula; any giant/cosmic starburst (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, market stalls or clutter; gibberish
on-screen text, logos or watermarks; distorted hands or faces; oversaturation or blur.
```

- **Alt:** `A first fair loan approved on a phone: light reaching the last mile`

### 2.2 Hero slide 2: ② The AI platform · PRODUCT-UI

- **File:** `public/hero/slide-kiosk.webp` · 16:9 · 2400×1350 · text-left

```
UI screenshot / product mockup of a modern fintech lending platform, dark mode, 16:9, 2400x1350. A sleek
laptop (or a clean floating browser window) on the RIGHT showing a lending dashboard: a top row of KPI cards,
a highlighted "Loan Approved" card with a green check and a small violet-and-gold starburst success glint, a
circular credit-score gauge, and a disbursement chart with a violet-to-gold gradient. Dark plum (#1A1426)
studio background fading to near-black on the LEFT for headline text. Cool, tech-forward, minimal; violet
(#7E49F2) accents, small gold (#F2CB07) highlights, soft product lighting, subtle reflection. Crisp modern
sans-serif UI, short labels only. Sharp, high-resolution product shot. NO people.
Do NOT include: outer space, galaxy or nebula; giant/cosmic starburst, light rays or lens-flare fields;
people or hands; gibberish or dense text, logos or watermarks; oversaturation, HDR or blur.
```

- **Alt:** `The AI-powered PhotonMatters lending platform`

### 2.3 Hero slide 3: ③ Reach across 3 regions · DATAVIZ

- **File:** `public/hero/slide-shop-credit.webp` · 16:9 · 2400×1350 · text-left

```
Flat stylized fintech data-visualization for a lending hero: SCALE & REACH, 16:9, 2400x1350. A clean, dark
infographic-style MAP (not a 3D globe, not space) of the platform's three regions: Africa, India and the
Middle East: with softly glowing city nodes and thin arcing connection lines suggesting credit flowing at
scale, and a few small violet-and-gold starburst node accents (the photon mark). Deep plum (#1A1426)-to-navy
(#07101F) background, violet (#7E49F2) network lines, warm gold (#F2CB07) node highlights. Modern, premium,
restrained fintech-infrastructure aesthetic. LEFT THIRD darker for headline text; map weighted center-right.
Sharp, high-resolution, 8k.
Do NOT include: outer space, galaxy, nebula or stars; a realistic 3D earth or globe; giant cosmic starbursts
or lens-flare fields; people or hands; country name labels, gibberish text, logos or watermarks;
oversaturation or blur.
```

- **Alt:** `AI lending at scale across Africa, India and the Middle East`

### 2.4 Industries card: Banks · PHOTO (architecture)

- **File:** `app/page.tsx → INDUSTRIES[0].image` · 16:10 · 1600×1000

```
Premium architectural photograph, 16:10, 1600x1000. A modern bank / financial headquarters exterior at blue
hour: clean glass-and-stone facade, strong geometric lines, a warm gold-lit lobby glowing behind the glass.
Wide 24mm lens, level verticals, generous sky. No brand names, no signage, no people. Cool navy tones with a
subtle violet (#7E49F2) reflection in the glass and a warm gold (#F2CB07) interior glow. Understated
corporate-prestige mood, photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; brand names, signage, logos or watermarks; people; clutter;
oversaturation, HDR or blur.
```

- **Alt:** `Modern bank headquarters: digital-first credit`

### 2.5 Industries card: NBFCs & Lenders · PHOTO (people)

- **File:** `app/page.tsx → INDUSTRIES[1].image` · 16:10 · 1600×1000

```
Professional editorial photograph, 16:10, 1600x1000. A modern lending / fintech team collaborating in a
bright, minimal office: two professionals focused on a laptop showing a simple lending view, calm and
competent, candid (not posing at the camera). 35mm at f/2.2, shallow depth of field, clean out-of-focus
contemporary office, no signage, no clutter. Neutral palette with a soft violet (#7E49F2) screen accent and
warm natural window light. Confident, premium, human, photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; cheesy stock posing or smiling at the camera; shop signage or
clutter; gibberish on-screen text, logos or watermarks; distorted hands or faces; oversaturation or blur.
```

- **Alt:** `A lending team scaling alternative credit`

### 2.6 Industries card: Telecom Operators · PHOTO (infrastructure)

- **File:** `app/page.tsx → INDUSTRIES[2].image` · 16:10 · 1600×1000

```
Premium editorial photograph, 16:10, 1600x1000. A sleek modern telecom cell tower / network mast against a
clean blue-hour sky, shot from a low heroic angle with atmospheric depth: connectivity as infrastructure. No
signage, no people, no clutter. Cool navy tones with a subtle violet (#7E49F2) glow on the antennas and a
small warm gold (#F2CB07) accent light. Minimal, premium, tech-infrastructure mood. Photorealistic,
ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people; signage, logos or watermarks;
clutter; oversaturation, HDR or blur.
```

- **Alt:** `Telecom networks becoming a financial-services base`

### 2.7 Human-impact / "The last mile" · PHOTO

- **File:** `public/hero/section-last-mile.webp` · 4:3 · 1600×1200

```
Emotive editorial photograph, 4:3, 1600x1200. A dignified small entrepreneur or worker in an emerging market,
softly lit, looking at a smartphone with quiet hope as a first loan is approved: a small violet-and-gold
starburst glint (photon mark) on the screen lighting their face from below. Tight, respectful framing; the
background pure soft warm bokeh, no stalls, no signage, no clutter. 85mm at f/1.8, warm honest skin, gentle
violet (#7E49F2) rim light, soft gold (#F2CB07) glow. Human, hopeful, premium documentary style: never
stocky. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, market stalls or clutter; distorted
hands or faces; gibberish on-screen text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `A first fair loan, approved on a phone at the last mile`

---

## 3. ABOUT: `app/about/page.tsx`

### 3.1 Hero: "banking the people the system forgot" · PHOTO

- **File:** `app/about HeroDark image` · 16:9 · 2400×1350 · text-left

```
Cinematic editorial photograph for an "About" hero themed "banking the people the system forgot", on-brand
for PhotonMatters (photons = light), 16:9, 2400x1350. Center-right: a person in an emerging market steps out
of soft shadow into a warm shaft of light, holding a phone whose screen shows a small violet-and-gold
starburst glint (photon mark) that lights their hopeful face: the unseen, finally seen. Deeply cinematic,
softly blurred clean background, no clutter. Cool navy (#07101F)-to-plum (#1A1426) grade, violet (#7E49F2)
rim light, faint gold (#F2CB07) accent. LEFT THIRD dark and empty for headline text. Mission-driven, human,
premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space, galaxy or nebula; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, stalls or clutter; distorted hands or
faces; gibberish text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Banking the people the system forgot`

### 3.2 Mission figure: "human-centered credit, built together" · PHOTO

- **File:** `app/about mission Image` · 4:3 · 1600×1200

```
Warm editorial photograph representing "human-centered credit, built together", 4:3, 1600x1200. A genuine
moment of trust between a lender / advisor and a customer in a bright, modern, minimal space: a handshake or
a shared look at a tablet showing a simple approval with a small violet-and-gold starburst success glint. 35mm
at f/2, clean out-of-focus background, no clutter, no signage. Natural light with a subtle violet (#7E49F2)
accent and warm gold (#F2CB07) highlight. Optimistic, premium, human, candid (never posing at the camera),
photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage, stalls or clutter; distorted hands or faces; gibberish text, logos or watermarks;
oversaturation or blur.
```

- **Alt:** `Building human-centered credit, together`

### 3.3 & 3.4 Founder portraits: Tahseen Jamal & Rohit Ahuja · EDIT real photos

- **Files:** `public/team/tahseen-jamal.png`, `public/team/rohit-ahuja.png` · 1:1 · 1000×1000

> ⚠️ **Real, named founders: do NOT generate fabricated faces.** Use their **actual headshots** and Nano
> Banana's **image-edit** mode. Paste on each uploaded photo:

```
EDIT this uploaded headshot. Keep the person's face, identity, age and likeness 100% unchanged: do not alter
their features. Replace only the background with a clean, seamless studio backdrop in deep plum-to-charcoal
(#1A1426) with a soft violet (#7E49F2) radial glow behind one shoulder and a whisper of gold (#F2CB07) rim
light on the opposite edge, like a premium executive portrait. Relight subtly with a soft key light and a
gentle violet rim light. Natural skin texture, flattering crisp retouch, square 1:1 crop, head-and-shoulders,
eyes to camera. Both founders must match in light and tone. Ultra-detailed, 8k.
Do NOT include: any change to facial features, identity or age; text, logos or watermarks; background
clutter; cosmic backgrounds; oversaturation, HDR, plastic skin or low resolution.
```

- **Alt (Tahseen):** `Tahseen Jamal: Co-Founder & CEO` · **Alt (Rohit):** `Rohit Ahuja: Co-Founder & CCO`

---

## 4. GSM: `app/gsm/page.tsx`

### 4.1 Hero: Missed Call & Collect Call · PHOTO

- **File:** `app/gsm HeroDark image` · 16:9 · 2400×1350 · text-left

```
Cinematic editorial photograph for a telecom "Missed Call & Collect Call" product hero, 16:9, 2400x1350.
Center-right: a clean close-up of a hand holding a simple older feature phone (2G handset with a physical
keypad) mid-call, and a small controlled ring of violet-and-gold light: the photon "flash": radiating just
from the earpiece to suggest a free missed call connecting. Everything else deep smooth bokeh, no signage, no
clutter. Cool navy (#07101F)-to-plum (#1A1426) grade, violet (#7E49F2) glow, small gold (#F2CB07) accent.
LEFT THIRD dark and empty for headline text. Premium, minimal, telecom-tech, photorealistic, ultra-detailed,
8k.
Do NOT include: outer space, galaxy or nebula; giant cosmic starbursts, big light rays or lens-flare fields
(keep the ring small at the earpiece); cheesy stock posing; shop signage, stalls or clutter; distorted hands;
gibberish text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Zero-cost missed-call engagement on any 2G phone`

### 4.2 "Why it matters" figure: the cheapest channel wins · PHOTO

- **File:** `app/gsm why Image` · 4:3 · 1600×1200

```
Respectful editorial macro photograph, 4:3, 1600x1200. Weathered hands pressing a single key on a basic
feature phone; at the keypress a tiny controlled violet-and-gold starburst glint lifts off the button: the
free "flash." Warm low-key light, subtle violet (#7E49F2) rim, background pure soft plum bokeh: no place, no
clutter. 85mm, tactile, human, premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing; shop signage,
stalls or clutter; distorted hands or extra fingers; gibberish text, logos or watermarks; oversaturation or
blur.
```

- **Alt:** `A free flash: the cheapest channel for prepaid markets`

---

## 5. INDUSTRIES: `app/industries/page.tsx`

### 5.1 Hero: institutions that move credit · PHOTO (architecture)

- **File:** `app/industries HeroDark image` · 16:9 · 2400×1350 · text-left

```
Cinematic architectural photograph, 16:9, 2400x1350. A commanding modern financial-district skyline / bank
tower at blue hour, glass facades catching light, shot from a low heroic angle with clean sky negative space
and soft atmospheric depth. No brand names, no signage, no people. Cool navy (#07101F) grade with violet
(#7E49F2) reflections in the glass and warm gold (#F2CB07) interior lights; one small violet-and-gold
starburst glint deep in the glass as a brand accent. LEFT THIRD dark and empty for headline text.
Institutional prestige, premium, photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts or lens-flare fields; brand names,
signage, logos or watermarks; people; clutter; oversaturation, HDR or blur.
```

- **Alt:** `The institutions that move credit`

### 5.2 Feature block: Banks · PHOTO (architecture)

- **File:** `industries BLOCKS[0].image` · 4:3 · 1600×1200

```
Premium architectural photograph, 4:3, 1600x1200. A modern bank interior reduced to clean geometry: a sweep
of pale stone, a rhythm of glass fins, a shaft of daylight through soft haze, no people, no signage, no
clutter. 35mm, level verticals. Cool neutral palette with a subtle violet (#7E49F2) accent light and a warm
gold (#F2CB07) glow. Digital-first, contemporary, prestigious, photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; brand names, signage, logos or
watermarks; people; clutter; oversaturation, HDR or blur.
```

- **Alt:** `Digital-first credit, free of legacy core constraints`

### 5.3 Feature block: NBFCs & Lenders · PHOTO (people)

- **File:** `industries BLOCKS[1].image` · 4:3 · 1600×1200

```
Professional editorial photograph, 4:3, 1600x1200. A focused lender / analyst at work in a bright modern
office, reviewing a simple lending view on a laptop, calm and competent: candid, three-quarter angle, never
posing at the camera. 35mm at f/2.2, clean out-of-focus office, no clutter, no signage. Neutral palette with
a soft violet (#7E49F2) screen glow and warm window light. Confident, premium, human, photorealistic,
ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; cheesy stock posing or smiling at the camera; shop signage or
clutter; gibberish on-screen text, logos or watermarks; distorted hands or faces; oversaturation or blur.
```

- **Alt:** `Scaling alternative lending on configurable rails`

### 5.4 Feature block: Telecom Operators · PHOTO (mobile money)

- **File:** `industries BLOCKS[2].image` · 4:3 · 1600×1200

```
Professional editorial photograph, 4:3, 1600x1200. A close, clean shot of a person using mobile money on a
simple phone in a bright modern setting: a small violet-and-gold starburst glint on the screen as a transfer
or airtime-to-credit action completes. Candid framing on the hands and phone; softly blurred clean
background, no stalls, no signage, no clutter. 50mm at f/1.8. Warm skin tones with a subtle violet (#7E49F2)
accent and gold (#F2CB07) glow. Human, premium, uncluttered. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing; shop signage, market stalls or clutter; distorted hands or extra fingers;
gibberish on-screen text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Turning a subscriber base into a financial-services business`

---

## 6. PRODUCTS: hub + 4 detail heroes

### 6.1 Products hub hero: lending for every market · PRODUCT-UI

- **File:** `app/products HeroDark image` · 16:9 · 2400×1350 · text-left

```
UI screenshot / product mockup of a modular fintech lending platform, dark mode, 16:9, 2400x1350. On the
RIGHT, a neat composition of a few floating dark-mode app screens overlapping in gentle perspective: a
micro-loan card, a consumer-credit checkout, and a business-loan summary: one showing a small violet-and-gold
starburst success glint. Dark plum (#1A1426) background fading to near-black on the LEFT for headline text.
Violet (#7E49F2) accents, gold (#F2CB07) highlights, rounded cards, soft shadows, crisp sans-serif, short
labels only. Sharp, premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

- **Alt:** `Lending reimagined for every market and every need`

### 6.2 Micro Lending: hero · PHOTO (people)

- **File:** `lib/products-data.ts → micro-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Professional editorial photograph for a micro-lending hero, 16:9, 2400x1350. A micro-entrepreneur: a market
vendor, small-shop owner or artisan (Africa / India): in warm light, checking an approved micro-loan on a
phone with a hopeful, capable expression, a small violet-and-gold starburst glint on the screen. Candid,
three-quarter angle, never posing at the camera; clean, softly blurred background, no stalls, no signage, no
clutter. Warm grade with violet (#7E49F2) rim light and gold (#F2CB07) glow. LEFT THIRD darker for headline
text; subject center-right. High-volume, human, aspirational. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, market stalls or clutter; distorted hands
or faces; gibberish on-screen text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Micro Lending: instant credit for small entrepreneurs`

### 6.3 Consumer & Retail Lending: hero · PHOTO (people)

- **File:** `lib/products-data.ts → consumer-retail-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Professional editorial photograph for a consumer / retail lending hero, 16:9, 2400x1350. A modern everyday
consumer completing an effortless purchase: paying or accepting instant credit on a phone at a sleek retail
counter or at home: a soft "approved" moment with a small violet-and-gold starburst glint on the screen.
Candid, warm, aspirational; softly blurred minimal setting, no signage, no clutter. 35mm at f/2, violet
(#7E49F2) and gold (#F2CB07) accents. LEFT THIRD darker for headline text; subject center-right. Premium,
effortless modern retail finance. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, market stalls or clutter; distorted hands
or faces; gibberish on-screen text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Consumer & Retail Lending: real-time, embedded credit`

### 6.4 Core Commercial Lending: hero · PHOTO (people)

- **File:** `lib/products-data.ts → core-commercial-lending.hero.image` · 16:9 · 2400×1350 · text-left

```
Professional editorial photograph for a commercial / business lending hero, 16:9, 2400x1350. A confident SME
business owner in their own setting: a modern workshop, small factory floor or business office: reviewing
financing on a tablet, composed and credible (or two business partners mid-decision). Candid, never posing at
the camera; clean, softly blurred background, no clutter, no signage. Cool premium grade with violet (#7E49F2)
and warm gold (#F2CB07) accents. LEFT THIRD darker for headline text; subject center-right. Structured,
institutional, human. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt:** `Core Commercial Lending: structured credit for business`

### 6.5 Supply Chain Finance: hero · DATAVIZ

- **File:** `lib/products-data.ts → supply-chain-finance.hero.image` · 16:9 · 2400×1350 · text-left

```
Flat stylized fintech flow diagram for supply-chain finance, dark mode, 16:9, 2400x1350. On the RIGHT, an
elegant infographic of a connected supply chain: clean icon nodes for Anchor, Supplier and Distributor
linked by a flowing violet-to-gold "working capital" light line, with a small violet-and-gold starburst
accent at each financing hand-off, plus small stylised invoice / cargo glyphs. Dark plum (#1A1426)-to-navy
background, violet (#7E49F2) lines, gold (#F2CB07) node highlights. LEFT THIRD dark for headline text.
Minimal, premium fintech-diagram style. NO people.
Do NOT include: outer space, galaxy or nebula; a realistic 3D globe; giant cosmic starbursts or lens-flare
fields; people or hands; gibberish text, logos or watermarks; oversaturation or blur.
```

- **Alt:** `Supply Chain Finance: working capital that moves with the chain`

---

## 7. SOLUTIONS: hub

### 7.1 Solutions hub hero: the complete stack · PRODUCT-UI

- **File:** `app/solutions HeroDark image` · 16:9 · 2400×1350 · text-left

```
UI screenshot / product mockup of a modular fintech platform, dark mode, 16:9, 2400x1350. On the RIGHT, a
tidy stack of a few overlapping dark-mode module screens in gentle perspective: origination, scoring and
collections: connected by thin violet API lines, one panel showing a small violet-and-gold starburst success
glint. Dark plum (#1A1426) background fading to near-black on the LEFT for headline text. Violet (#7E49F2)
accents, gold (#F2CB07) highlights, glassy panels, soft shadows, crisp sans-serif, short labels only. Sharp,
premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

- **Alt:** `The complete lending and collections platform stack`

---

## 8. SOLUTION DETAIL PAGES: `lib/solutions-data.ts`

> Each page = **one product screen + one human moment** (never two dashboards). The **hero** shows the module
> UI (PRODUCT-UI, 16:9, text-left); the **overview banner** is a real person in context (PHOTO, 2:1,
> **subject on the RIGHT**, left half calm for the glass overlay card). The code's city captions
> (`lib/solutions-data.ts`) fit again: no caption change needed.

### 8.1 Loan Origination

**Hero · PRODUCT-UI**: `loan-origination.hero.image` · 16:9

```
UI screenshot / product mockup of a loan-origination flow in a fintech app, dark mode, 16:9, 2400x1350. On
the RIGHT: a clean multi-step onboarding view: application → eKYC verification → decision: with a
verification card marked done and a small violet-and-gold starburst success glint on the "Approved" step.
Dark plum (#1A1426) background fading to near-black on the LEFT for headline text. Violet (#7E49F2) accents,
gold (#F2CB07) highlights, rounded cards, crisp sans-serif, short labels only. Frictionless, premium product
shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `loan-origination.overview.image.src` · 2:1 · subject RIGHT · caption "Onboarding session · Lagos, Nigeria"

```
Warm editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: an agent or loan officer in Lagos
helping a first-time borrower complete an application on a tablet, both focused on the screen with trust; a
small violet-and-gold starburst glint on the tablet marks the approval. Candid, never posing at the camera;
clean, softly blurred professional background, no stalls, no signage, no clutter. The LEFT HALF is calm and
darker, mostly empty for a glass overlay card. Cool grade with a violet (#7E49F2) glow. Human, premium
documentary style. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage, stalls or clutter; distorted hands or faces; gibberish on-screen text, logos or
watermarks; oversaturation or blur.
```

- **Alt (hero):** `Loan Origination: application to disbursement in minutes`

### 8.2 Loan Management

**Hero · PRODUCT-UI**: `loan-management.hero.image` · 16:9

```
UI screenshot / product mockup of a loan-servicing / management screen in a fintech app, dark mode, 16:9,
2400x1350. On the RIGHT: a repayment-schedule table, an accrual curve chart with a violet-to-gold gradient, a
multi-currency ledger summary, and a small violet-and-gold starburst accent on a posted payment. Dark plum
(#1A1426) background fading to near-black on the LEFT for headline text. Violet (#7E49F2) accents, gold
(#F2CB07) highlights, rounded cards, crisp sans-serif, short labels only. Precise, premium product shot. NO
people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `loan-management.overview.image.src` · 2:1 · subject RIGHT · caption "Servicing team at work"

```
Editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: a focused loan-servicing / operations
professional at a clean modern desk reviewing accounts on a laptop, calm and precise, candid (never posing at
the camera). Softly blurred minimal office background, no clutter, no signage. The LEFT HALF is calm and
darker, mostly empty for a glass overlay card. Cool grade with a soft violet (#7E49F2) screen glow. Competent,
premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt (hero):** `Loan Management: the system of record for the whole loan life`

### 8.3 Credit Scoring

**Hero · PRODUCT-UI**: `credit-scoring.hero.image` · 16:9

```
UI screenshot / product mockup of an explainable AI credit-scoring screen in a fintech app, dark mode, 16:9,
2400x1350. On the RIGHT: a large circular credit-score gauge with a small violet-and-gold starburst accent, a
vertical list of "reason-code" rows (short label + icon + mini bar), an approve / decline pill, and a row of
data-source chips (Bureau, Telco, Cashflow). Dark plum (#1A1426) background fading to near-black on the LEFT
for headline text. Violet (#7E49F2) accents, gold (#F2CB07) highlights, rounded cards, crisp sans-serif,
short labels only. Transparent, premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `credit-scoring.overview.image.src` · 2:1 · subject RIGHT · caption "Risk analytics in production"

```
Editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: a risk / data analyst studying a scoring
dashboard on a monitor, thoughtful and expert, lit by a cool violet screen glow; candid, never posing at the
camera. Softly blurred clean data-team environment, no clutter, no signage. The LEFT HALF is calm and darker,
mostly empty for a glass overlay card. Cool grade with a violet (#7E49F2) accent. Credible, premium.
Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt (hero):** `Credit Scoring: score the borrowers the old models can't see`

### 8.4 Debt Collection

**Hero · PRODUCT-UI**: `debt-collection.hero.image` · 16:9

```
UI screenshot / product mockup of an AI debt-collections screen in a fintech app, dark mode, 16:9, 2400x1350.
On the RIGHT: a prioritised collections queue: account rows grouped by propensity-to-pay, small channel
icons (message, voice, agent), a strategy panel, and a small violet-and-gold starburst accent on a "promise
to pay" captured. Dark plum (#1A1426) background fading to near-black on the LEFT for headline text. Violet
(#7E49F2) accents, gold (#F2CB07) highlights, rounded cards, crisp sans-serif, short labels only. Smart,
efficient, premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `debt-collection.overview.image.src` · 2:1 · subject RIGHT · caption "Collections agent at work"

```
Editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: an empathetic contact-centre / collections
agent in a headset at a clean modern workstation, composed and human, a subtle violet dashboard glow on the
screen; candid, never posing at the camera. Softly blurred minimal office background, no clutter, no signage.
The LEFT HALF is calm and darker, mostly empty for a glass overlay card. Cool grade with a violet (#7E49F2)
accent. Respectful, premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt (hero):** `Debt Collection: recover more, at a lower cost to collect`

### 8.5 Reconciliation AI

**Hero · PRODUCT-UI**: `reconciliation-ai.hero.image` · 16:9

```
UI screenshot / product mockup of an AI reconciliation screen in a fintech app, dark mode, 16:9, 2400x1350.
On the RIGHT: an auto-matching view: two columns of items (payments and ledger entries) linked into matched
pairs, a few flagged "breaks" highlighted in gold, and a small violet-and-gold starburst accent on a cleared
match. Dark plum (#1A1426) background fading to near-black on the LEFT for headline text. Violet (#7E49F2)
accents, gold (#F2CB07) highlights, rounded cards, crisp sans-serif, short labels only. "Books that balance
themselves" feel, premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `reconciliation-ai.overview.image.src` · 2:1 · subject RIGHT · caption "Continuous, AI-driven reconciliation"

```
Editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: a finance-operations professional at a clean
desk reviewing reconciled ledgers on a laptop, calm and precise, candid (never posing at the camera). Softly
blurred minimal finance-office background, no clutter, no signage. The LEFT HALF is calm and darker, mostly
empty for a glass overlay card. Cool grade with a soft violet (#7E49F2) screen glow. Accurate, premium.
Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt (hero):** `Reconciliation AI: books that balance themselves`

### 8.6 Collection Marketing AI

**Hero · PRODUCT-UI**: `collection-marketing-ai.hero.image` · 16:9

```
UI screenshot / product mockup of a self-cure / collection-marketing screen in a fintech app, dark mode, 16:9,
2400x1350. On the RIGHT: a friendly self-cure journey builder: a gentle reminder step, a payment-link step,
and a small violet-and-gold starburst accent on a "balance cleared" state: plus a small uplift chart. Dark
plum (#1A1426) background fading to near-black on the LEFT for headline text. Violet (#7E49F2) accents, gold
(#F2CB07) highlights, rounded cards, crisp sans-serif, short labels only. Gentle, respectful, premium product
shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `collection-marketing-ai.overview.image.src` · 2:1 · subject RIGHT · caption "Self-cure, one nudge at a time · Kano"

```
Warm editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: a relaxed person at home in Kano
resolving an overdue balance from their own phone, quiet relief on their face, a small violet-and-gold
starburst glint on the screen as the balance clears. Candid, never posing at the camera; clean, softly
blurred warm background, no stalls, no signage, no clutter. The LEFT HALF is calm and darker, mostly empty
for a glass overlay card. Warm grade with a violet (#7E49F2) glow and gold (#F2CB07) accent. Dignified,
human, premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts (keep the glint small and on the
phone); cheesy stock posing or smiling at the camera; shop signage, stalls or clutter; distorted hands or
faces; gibberish on-screen text, logos or watermarks; oversaturation or blur.
```

- **Alt (hero):** `Collection Marketing AI: turn reminders into repayments`

### 8.7 Campaign Management

**Hero · PRODUCT-UI**: `campaign-management.hero.image` · 16:9

```
UI screenshot / product mockup of a multi-channel campaign builder in a fintech app, dark mode, 16:9,
2400x1350. On the RIGHT: a visual journey canvas: a start node branching to channel nodes (SMS, WhatsApp,
email, voice, missed call) with connecting lines, an audience panel, and a small violet-and-gold starburst
accent at a conversion node. Dark plum (#1A1426) background fading to near-black on the LEFT for headline
text. Violet (#7E49F2) accents, gold (#F2CB07) highlights, rounded nodes, crisp sans-serif, short labels
only. Orchestrated, measurable, premium product shot. NO people.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; people or hands; gibberish or dense
text, logos or watermarks; oversaturation, HDR or blur.
```

**Overview · PHOTO**: `campaign-management.overview.image.src` · 2:1 · subject RIGHT · caption "Campaign planning · Lagos"

```
Editorial photograph, wide banner, 2:1, 2400x1200. On the RIGHT: a growth / lifecycle marketer in Lagos
planning a campaign at a clean modern desk, focused and creative, a journey / funnel softly visible on the
laptop; candid, never posing at the camera. Softly blurred minimal office background, no clutter, no signage.
The LEFT HALF is calm and darker, mostly empty for a glass overlay card. Cool grade with a violet (#7E49F2)
screen glow. Modern, premium. Photorealistic, ultra-detailed, 8k.
Do NOT include: outer space or cosmic scenes; giant cosmic starbursts; cheesy stock posing or smiling at the
camera; shop signage or clutter; distorted hands or faces; gibberish on-screen text, logos or watermarks;
oversaturation or blur.
```

- **Alt (hero):** `Campaign Management: design, target and automate every campaign`

---

## 9. Summary table: every slot at a glance

| #  | Page       | Section                   | File / data key                                | Aspect | Export     | Register        |
| -- | ---------- | ------------------------- | ---------------------------------------------- | ------ | ---------- | --------------- |
| 1  | Home       | Hero ① last mile         | `public/hero/slide-market.webp`              | 16:9   | 2400×1350 | PHOTO (person)  |
| 2  | Home       | Hero ② platform          | `public/hero/slide-kiosk.webp`               | 16:9   | 2400×1350 | PRODUCT-UI      |
| 3  | Home       | Hero ③ reach             | `public/hero/slide-shop-credit.webp`         | 16:9   | 2400×1350 | DATAVIZ         |
| 4  | Home       | Industries · Banks       | `app/page.tsx INDUSTRIES[0]`                 | 16:10  | 1600×1000 | PHOTO (arch)    |
| 5  | Home       | Industries · NBFCs       | `app/page.tsx INDUSTRIES[1]`                 | 16:10  | 1600×1000 | PHOTO (people)  |
| 6  | Home       | Industries · Telecom     | `app/page.tsx INDUSTRIES[2]`                 | 16:10  | 1600×1000 | PHOTO (infra)   |
| 7  | Home       | Last mile band            | `public/hero/section-last-mile.webp`         | 4:3    | 1600×1200 | PHOTO (person)  |
| 8  | About      | Hero                      | `about HeroDark image`                       | 16:9   | 2400×1350 | PHOTO (person)  |
| 9  | About      | Mission                   | `about mission Image`                        | 4:3    | 1600×1200 | PHOTO (people)  |
| 10 | About      | Portrait · Tahseen       | `public/team/tahseen-jamal.png`              | 1:1    | 1000×1000 | EDIT real photo |
| 11 | About      | Portrait · Rohit         | `public/team/rohit-ahuja.png`                | 1:1    | 1000×1000 | EDIT real photo |
| 12 | GSM        | Hero                      | `gsm HeroDark image`                         | 16:9   | 2400×1350 | PHOTO (person)  |
| 13 | GSM        | Why it matters            | `gsm why Image`                              | 4:3    | 1600×1200 | PHOTO (person)  |
| 14 | Industries | Hero                      | `industries HeroDark image`                  | 16:9   | 2400×1350 | PHOTO (arch)    |
| 15 | Industries | Block · Banks            | `industries BLOCKS[0]`                       | 4:3    | 1600×1200 | PHOTO (arch)    |
| 16 | Industries | Block · NBFCs            | `industries BLOCKS[1]`                       | 4:3    | 1600×1200 | PHOTO (people)  |
| 17 | Industries | Block · Telecom          | `industries BLOCKS[2]`                       | 4:3    | 1600×1200 | PHOTO (person)  |
| 18 | Products   | Hub hero                  | `products HeroDark image`                    | 16:9   | 2400×1350 | PRODUCT-UI      |
| 19 | Products   | Micro Lending hero        | `micro-lending.hero.image`                   | 16:9   | 2400×1350 | PHOTO (person)  |
| 20 | Products   | Consumer hero             | `consumer-retail-lending.hero.image`         | 16:9   | 2400×1350 | PHOTO (person)  |
| 21 | Products   | Commercial hero           | `core-commercial-lending.hero.image`         | 16:9   | 2400×1350 | PHOTO (person)  |
| 22 | Products   | SCF hero                  | `supply-chain-finance.hero.image`            | 16:9   | 2400×1350 | DATAVIZ         |
| 23 | Solutions  | Hub hero                  | `solutions HeroDark image`                   | 16:9   | 2400×1350 | PRODUCT-UI      |
| 24 | Solution   | Loan Origination hero     | `loan-origination.hero.image`                | 16:9   | 2400×1350 | PRODUCT-UI      |
| 25 | Solution   | Loan Origination overview | `loan-origination.overview.image.src`        | 2:1    | 2400×1200 | PHOTO (people)  |
| 26 | Solution   | Loan Management hero      | `loan-management.hero.image`                 | 16:9   | 2400×1350 | PRODUCT-UI      |
| 27 | Solution   | Loan Management overview  | `loan-management.overview.image.src`         | 2:1    | 2400×1200 | PHOTO (person)  |
| 28 | Solution   | Credit Scoring hero       | `credit-scoring.hero.image`                  | 16:9   | 2400×1350 | PRODUCT-UI      |
| 29 | Solution   | Credit Scoring overview   | `credit-scoring.overview.image.src`          | 2:1    | 2400×1200 | PHOTO (person)  |
| 30 | Solution   | Debt Collection hero      | `debt-collection.hero.image`                 | 16:9   | 2400×1350 | PRODUCT-UI      |
| 31 | Solution   | Debt Collection overview  | `debt-collection.overview.image.src`         | 2:1    | 2400×1200 | PHOTO (person)  |
| 32 | Solution   | Reconciliation hero       | `reconciliation-ai.hero.image`               | 16:9   | 2400×1350 | PRODUCT-UI      |
| 33 | Solution   | Reconciliation overview   | `reconciliation-ai.overview.image.src`       | 2:1    | 2400×1200 | PHOTO (person)  |
| 34 | Solution   | Collection Mktg hero      | `collection-marketing-ai.hero.image`         | 16:9   | 2400×1350 | PRODUCT-UI      |
| 35 | Solution   | Collection Mktg overview  | `collection-marketing-ai.overview.image.src` | 2:1    | 2400×1200 | PHOTO (person)  |
| 36 | Solution   | Campaign Mgmt hero        | `campaign-management.hero.image`             | 16:9   | 2400×1350 | PRODUCT-UI      |
| 37 | Solution   | Campaign Mgmt overview    | `campaign-management.overview.image.src`     | 2:1    | 2400×1200 | PHOTO (person)  |

**Balance:** ~23 human/editorial photos · 5 architecture · **10 product-UI (accents, one per page max)** · 2
data-viz · 2 founder edits. Human-led, with the platform shown as punctuation and the violet-gold photon-mark
glint tying all 37 together.

**Tips**

- Product-UI text will garble: keep labels short; the headline scrim covers it. For crisp real labels, a
  quick Figma mock beats AI.
- If a model drifts to space on slides 3 / 22, add `flat infographic, no 3D, no background artwork`.
- Art-direct people to be **candid, three-quarter, never smiling at the camera**: that's what avoids the
  stock-photo look. Generate 3–4 per slot and pick.
