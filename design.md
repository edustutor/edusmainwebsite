# EDUS Design System

The complete design specification for the EDUS online tuition platform.
This is the single source of truth for color, typography, spacing, motion,
and component patterns used across the site.

> **Stack:** Next.js 14 App Router · Tailwind CSS · Framer Motion (via
> `@/components/Motion`) · Google Fonts (Poppins + Open Sans).

---

## 1. Brand Foundation

### Audience

- **Primary** — Parents of school-age students (Grade 1 → A-Level).
- **Secondary** — Students under 18 making the choice with their parents.
- **Tertiary** — Tutors and education partners.

### Voice & tone

| Trait                     | What it means                                                      |
| ------------------------- | ------------------------------------------------------------------ |
| Clear                     | Short sentences, active voice, plain English.                      |
| Professional              | No hype, no fake claims, no gamified urgency.                      |
| Parent friendly           | Trust signals, transparency, no jargon.                            |
| Student friendly          | Modern, calm, never patronising.                                   |
| Conversion focused        | Every CTA points to *Enrol*, *Free Consultation*, or *Talk to us*. |

### Brand pillars (visible across the design)

1. Live online classes
2. Expert tutors
3. Structured learning
4. Parent updates
5. Recordings
6. Progress tracking

---

## 2. Color System

### Primary palette

| Token        | Hex       | Use                                                          |
| ------------ | --------- | ------------------------------------------------------------ |
| `--bg`       | `#F8FBFF` | Page background (cool near-white).                           |
| `--bg-2`     | `#EEF6FF` | Soft tinted surfaces (badges, alt panels).                   |
| `--ink`      | `#102033` | Primary text + dark CTA backgrounds.                         |
| `--ink-soft` | `#2B3950` | Body copy.                                                   |
| `--ink-mute` | `#5A6A82` | Captions, microcopy, footer text.                            |
| `--blue`     | `#2563EB` | Primary brand color · accent links · primary buttons · SL.   |
| `--cyan`     | `#06B6D4` | Secondary accent · Global pathway · resource cards.          |
| `--violet`   | `#8B5CF6` | Tertiary accent · India pathway · gradient endpoint.         |
| `--green`    | `#22C55E` | Success state · live status · check marks.                   |
| `--yellow`   | `#FACC15` | Conversion accent · `btn-yellow` (Book a Free Consultation). |

### Pathway tints

| Pathway      | Tint      | Soft tint   | Used in                              |
| ------------ | --------- | ----------- | ------------------------------------ |
| Sri Lanka    | `#2563EB` | `#EEF6FF`   | Region card 01, country chip, glows. |
| India        | `#8B5CF6` | `#F4EEFF`   | Region card 02, country chip, glows. |
| Global · 1:1 | `#06B6D4` | `#E6FAFD`   | Region card 03, country chip, glows. |

### Borders & rules

| Token             | Value                       | Use                              |
| ----------------- | --------------------------- | -------------------------------- |
| `--rule`          | `rgba(16,32,51,0.08)`       | Hairline borders inside cards.   |
| `--rule-strong`   | `rgba(16,32,51,0.14)`       | Strong dividers between rows.    |
| Card border       | `rgba(16,32,51,0.10)`       | Standard inner card / tile.      |
| Glass card border | `rgba(255,255,255,0.7)`     | Outer rim on `.glass` surfaces.  |

### Selection & focus

- Selection: `background: #FACC15; color: #102033`
- Focus ring: `outline: 2px solid #2563EB; outline-offset: 3px`

---

## 3. Typography

Two Google fonts loaded via `next/font` for zero CLS, swap fallback,
self-hosted.

| Family    | Use         | Weights used     | CSS var           |
| --------- | ----------- | ---------------- | ----------------- |
| Poppins   | Headings    | 400, 500, 600, 700, 800 | `--font-display` |
| Open Sans | Body        | 300, 400, 500, 600, 700 | `--font-sans`    |

### Heading utility — `.heading`

```css
.heading {
  font-family: var(--font-display), "Poppins", sans-serif;
  color: #102033;
  letter-spacing: -0.025em;
  line-height: 1.08;
  font-weight: 700;
}
.heading em {
  /* Three-stop gradient for italic emphasis */
  background: linear-gradient(90deg, #2563EB 0%, #4F6DDB 60%, #6E5BC8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 700;
}
```

### Eyebrow — `.eyebrow`

```css
.eyebrow {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #2563EB;
}
.eyebrow .dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 999px;
  background: #2563EB;
  margin-right: 8px;
  box-shadow: 0 0 0 4px rgba(37,99,235,0.15);
}
```

### Type scale (fluid)

| Token            | Min – Max               | Use                              |
| ---------------- | ----------------------- | -------------------------------- |
| `--fs-hero`      | `clamp(34px, 5vw, 68px)` | H1 hero, page-level masthead.   |
| `--fs-display`   | `clamp(28px, 3.4vw, 48px)` | Section H2 headings.          |
| `--fs-h2`        | `clamp(24px, 2.4vw, 36px)` | Sub-section H2.               |
| `--fs-h3`        | `clamp(18px, 1.4vw, 22px)` | Card H3 / sub-headings.       |
| `--fs-body`      | `15.5px`                  | Body copy.                     |
| `--fs-small`     | `13px`                    | Captions, microcopy.           |

### Text patterns

- **Body:** `text-[#2B3950] text-[15.5px] leading-[1.65]`
- **Caption:** `text-[#5A6A82] text-[12.5px]`
- **Microcopy on glass:** `text-[#5A6A82] text-[11.5px]`

---

## 4. Spacing & Layout

### Container

```css
.container-edge {
  max-width: 80rem;     /* 1280px */
  margin-inline: auto;
  padding-inline: 1.25rem;       /* mobile */
}
@media (min-width: 768px)  { padding-inline: 2rem; }
@media (min-width: 1280px) { padding-inline: 2.5rem; }
```

### Section rhythm

| Type              | Padding                         |
| ----------------- | ------------------------------- |
| Standard section  | `py-20 md:py-28`                |
| Hero              | `pt-32 sm:pt-36 pb-20`          |
| Help banner       | `py-10 md:py-14`                |
| Inner page hero   | `pt-32 sm:pt-36 pb-12`          |

### Vertical rhythm rules

- **Section title block:** `mt-4` between eyebrow and H2, `mt-4` between H2 and body.
- **Section title → grid:** `mt-12` (mobile drops to `mt-10`).
- **CTA cluster:** `mt-9` from headline, `gap-3` between buttons.
- **Card grid gap:** `gap-4` for tight grids, `gap-5` for region selector.

### Border radius scale

| Token         | Value | Use                                  |
| ------------- | ----- | ------------------------------------ |
| Pill          | `999px` | Buttons, badges, filter pills.     |
| Standard card | `24px` | Most glass cards.                  |
| Wide card     | `28px` | Region cards, dashboard preview.   |
| Hero card     | `36px` | Final CTA panel.                   |
| Inner tile    | `16px` | Stat tiles, schedule rows.         |

---

## 5. Liquid Glass System

The signature material across the entire site.

### Three glass variants

```css
/* .glass — standard glass card */
background: linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.55));
backdrop-filter: blur(22px) saturate(170%);
border: 1px solid rgba(255,255,255,0.7);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.95),    /* top sheen */
  0 1px 1px rgba(16,32,51,0.04),           /* contact shadow */
  0 12px 36px -16px rgba(16,32,51,0.12);    /* soft drop */

/* .glass-strong — featured/hero panels */
backdrop-filter: blur(28px) saturate(180%);
background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74));
box-shadow: 0 30px 80px -28px rgba(37,99,235,0.18);

/* .glass-tint-blue — region accent panels */
background: linear-gradient(180deg, rgba(238,246,255,0.9), rgba(238,246,255,0.6));
border: 1px solid rgba(37,99,235,0.10);
```

### Glass top sheen (pseudo-element)

All three variants apply a `::after` overlay:

```css
.glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.6), transparent 35%);
  mix-blend-mode: overlay;
  opacity: 0.55;
}
```

### Inner tiles inside glass cards

When placing solid surfaces inside glass cards (stat tiles, feature
chips, mockup rows), use:

```
bg-white/85 border border-[rgba(16,32,51,0.10)]
shadow-[0_2px_8px_-4px_rgba(16,32,51,0.06)]
```

**Avoid `border-white/80`** — it disappears on white cards.

---

## 6. Buttons

All buttons share the `.btn` base: `border-radius: 999px`, Poppins 500,
14.5px, smooth `.2s` color transitions on hover.

| Class         | Bg                               | Text       | Use                       |
| ------------- | -------------------------------- | ---------- | ------------------------- |
| `btn-primary` | Linear gradient `#3B82F6 → #2563EB` | white   | Primary CTA (Sign Up, Enrol). |
| `btn-yellow`  | Linear gradient `#FDE047 → #FACC15` | `#102033` | Conversion CTA (Book a Free Consultation). |
| `btn-cyan`    | Linear gradient `#22D3EE → #06B6D4` | white   | Global pathway accent.    |
| `btn-ghost`   | `rgba(255,255,255,0.7)` glass   | `#102033` | Secondary actions.        |
| `btn-outline` | transparent + 1.5px blue border | `#2563EB` | Tertiary actions.         |

### Button rules

- **Hover lift:** `transform: translateY(-1px)` plus deeper shadow.
- **Inner highlight:** `inset 0 1px 0 rgba(255,255,255,0.4)` for gloss.
- **Drop shadow:** Tinted to button color (e.g. blue button → blue shadow).
- **Inline arrow:** 14×14 SVG, `strokeWidth="2.4"`, animates `x: 4` on parent hover.

---

## 7. Background Atmosphere

Two layers of color glow, both pure transform/opacity (GPU-only).

### Layer 1 — `<Atmosphere />` (page-wide, fixed)

Four well-separated spheres drift slowly across the viewport. `position: fixed`,
`z-index: 0`, `pointer-events: none`.

| Sphere         | Size  | Color                          | Opacity | Loop  |
| -------------- | ----- | ------------------------------ | ------- | ----- |
| Top-right blue | 620px | `#BFD7FF → #2563EB`            | 0.32    | 36s   |
| Bottom-left   | 540px | `#C7DCFF → #1D4ED8`            | 0.28    | 40s   |
| Centre violet  | 420px | `#D6CCFF → #8B5CF6`            | 0.22    | 44s   |
| Top-left yellow | 360px | `#FFF1B8 → #EAB308`           | 0.14    | 38s   |

Each sphere has a 4-keyframe drift on x/y (±40-60px), plus scale 0.95–1.05.
`mixBlendMode: multiply` so it tints the white base correctly.

### Layer 2 — `<AmbientGlow />` (per-section)

Small, refined breathing orbs (200–240px, blur 80px, opacity 0.06–0.16)
behind every section. Each one breathes opacity + scale on a 22–26s loop.
Two per section by default.

```tsx
<AmbientGlow
  top="14%" left="-4%"
  size={240}
  color="#2563EB"
  opacity={[0.08, 0.16]}
  duration={22}
  blur={80}
/>
```

Many ambient glows are wrapped in a parallax `<m.div>` that translates Y
based on scroll position so they drift as the user scrolls.

### Hero — special treatment

Hero gets 5 `ParallaxedGlow`s instead of `AmbientGlow`s — each is bigger
(300–500px), more saturated (0.16–0.36 opacity), and parallax-translates
across the hero scroll range.

---

## 8. Motion System

Centralised in `lib/motion.ts`. All variants use `[0.2, 0.7, 0.2, 1]` (easeOut)
for a single coherent feel.

### Variants

| Variant                | Use                                         | Duration |
| ---------------------- | ------------------------------------------- | -------- |
| `fadeUp`               | Default reveal — title, paragraph, item.    | 0.55s    |
| `staggerContainer`     | Wrap a list of children to stagger them.    | 70ms apart |
| `fastStagger`          | Tight stagger for chips/microcopy.          | 30ms apart |
| `sectionReveal`        | Section heading reveal.                     | 0.6s     |
| `sectionRevealStrong`  | Hero/section heading with stronger lift.    | 0.7s     |
| `slideInLeft`          | Asymmetric reveal from the left.            | 0.6s     |
| `slideInRight`         | Asymmetric reveal from the right.           | 0.6s     |
| `scaleIn`              | Final CTA card / banner emphasis.           | 0.55s    |
| `glassHover`           | Card lift on `whileHover`.                  | 0.25s    |
| `floatingBlob(delay)`  | Slow ambient drift (background blobs).      | 18s loop |
| `buttonGlow`           | Delayed hero CTA reveal.                    | 0.5s     |
| `stepReveal(i)`        | Indexed reveal — flow steps, story cards.   | 0.5s     |
| `accordionMotion`      | FAQ open/close.                             | 0.3-0.4s |

### Default viewport options

```ts
inView      = { once: true, amount: 0.2 }
inViewClose = { once: true, amount: 0.35 }
```

### Hero animation orchestration

1. `staggerContainer` on hero root, `initial="hidden" animate="show"`.
2. Children reveal: badge → headline → subheading → CTAs → supporting list → trust line.
3. CTAs use `buttonGlow` (0.35s delay) for delayed glow-in feel.
4. Dashboard preview floats up with `y: [0, -8, 0]` on a 6s ease-in-out loop.
5. Scroll parallax: hero content scrolls up faster than dashboard, creating depth.

### Respect reduced-motion

The global `<MotionProvider>` wraps everything in `<MotionConfig reducedMotion="user">`.
No further per-component handling needed — all animations skip when
`prefers-reduced-motion: reduce` is set.

---

## 9. Page Architecture

### Homepage section order

1. **Hero** — H1, subhead, primary CTAs, supporting list, trust line, dashboard preview.
2. **RegionSelector** — 3 path cards (Sri Lanka / India / Global).
3. **WhyJoin** — 6 benefit cards.
4. **LearningExperience** — 6 process steps with progress dots.
5. **Subjects** — 3-tab pathway switcher with grade-grouped subject lists.
6. **ParentTrust** — 6 trust points + Talk to EDUS Team CTA.
7. **Success** — Country-tagged testimonials with filter (All / SL / IN / GL).
8. **JoinFlow** — 5 enrolment steps (sticky title + scroll-driven progress line).
9. **ResourceSupport** — 4 resource cards (Vault / Recordings / AI / Exams).
10. **FAQ** — 8 questions with smooth glass accordion.
11. **HelpBanner** — Need help choosing? CTA.
12. **CTA** — Final glass card with 4 supporting stats.
13. **Footer** — Compact 3-column with Quick Links / Learning Paths / Legal.

### Inner pages

| Path                | Hero pattern                       |
| ------------------- | ---------------------------------- |
| `/sl`               | Pathway hero + curricula list + pricing tiers + testimonials. |
| `/in`               | Pathway hero + 4 pillars + grade tier grid + pricing. |
| `/global`           | `<MarketLanding>` shared template. |
| `/how-it-works`     | Slim hero → LearningExperience + JoinFlow. |
| `/success-stories`  | Slim hero → Success grid.          |
| `/enrol`            | Multi-step form with stepper pill. |

---

## 10. Component Patterns

### Region card pattern

```
glass · rounded-[28px] · p-7 · overflow-hidden

[icon-tile 56×56 (tintSoft bg)] [N° / 03]
[H3 title]
[Body text]
[Suitable for · color label]
[5-item bullet list with tinted check rings]
[Hairline divider]
[CTA arrow with translateX hover]
```

Hover: `glassHover` variant — `y: -4`.

### Step / number card pattern

```
glass · rounded-[24px] · p-6 · overflow-hidden

[Color circle 36×36 with index number] [Tag label]
[H3 title]
[Body text]
[6-segment progress bar]
```

Step numbers scale-in on view (`stepReveal`); progress bars fill left-to-right.

### Stat tile pattern

```
bg-white/85 · rounded-2xl · px-3 py-3.5
border: rgba(16,32,51,0.10)
shadow: 0 2px 8px -4px rgba(16,32,51,0.06)

[Big stat — Poppins 700]
[Caption — 11.5px ink-mute]
```

Always use the ink-tinted border, never `border-white/80`.

### Testimonial card pattern

```
glass · rounded-[24px] · p-7

[Country chip (tinted bg)] [★★★★★ yellow]
[Italic quote — 15.5px Poppins]
[Hairline divider]
[Avatar circle (initials, tint bg)] [Name + role]
```

### Filter pill pattern

```
inline-flex · glass · rounded-full · p-1.5 · gap-1
  [button — text only when inactive]
  [button — Framer layoutId="filter-pill" sliding background when active]
```

The active pill is animated with `<m.span layoutId>` so changing filters
slides the dark pill smoothly between options.

### Accordion pattern

```
glass · rounded-[20px] · overflow-hidden
[Button — full width, flex justify-between]
  [Question heading]
  [Animated +/− icon (rotates 180 + bg color flip on open)]
[AnimatePresence + accordionMotion variant — height auto/0]
```

---

## 11. SEO & Schema

### Metadata pattern

Every page uses the `metadata` API with title template `"%s · EDUS"`,
keyword arrays, OpenGraph, and Twitter card.

### JSON-LD on homepage

`<HomeJsonLd />` injects three schema blocks:
- `EducationalOrganization` with `hasOfferCatalog` listing all three pathways.
- `WebSite` with `SearchAction`.
- `FAQPage` with all 8 FAQ Q&As.

### Image alt text rules

- Logo: `alt="EDUS"`
- Decorative orbs/glows: `aria-hidden`
- Feature icons (emojis): wrapped in icon tile, `aria-hidden` (described by adjacent heading).

---

## 12. Responsive Rules

### Breakpoints

| Tailwind | Min width | Use                                       |
| -------- | --------- | ----------------------------------------- |
| `sm`     | 640px     | Slight padding/spacing tightening.        |
| `md`     | 768px     | Multi-column grids start.                 |
| `lg`     | 1024px    | Full multi-column layouts.                |
| `xl`     | 1280px    | Full container padding.                   |

### Mobile-first patterns

- Hero CTAs wrap to vertical at <640px.
- Region cards: `md:grid-cols-3` (stacks single-column on mobile).
- Why/Learning grids: `md:grid-cols-2 lg:grid-cols-3`.
- Footer columns: `grid-cols-2 sm:grid-cols-3` (Legal stacks last).
- Filter pills wrap (`flex-wrap`) when too narrow.

### Mobile sheet menu

Header collapses to a hamburger button at `<lg`. Tapping opens an
animated `glass-strong` sheet below the pill, with all nav links and
both CTAs.

---

## 13. Accessibility

### Focus

```css
:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 3px;
  border-radius: 6px;
}
```

### ARIA & semantics

- `<header>`, `<main>`, `<footer>`, `<section id>` for jump-link nav.
- All decorative orbs `aria-hidden`.
- FAQ buttons set `aria-expanded`.
- Filter pills are `<button>` (not links) since they don't navigate.
- Logo link has `aria-label="EDUS"` since the image alt is short.

### Reduced motion

- Honoured globally via `MotionConfig reducedMotion="user"`.
- All variants degrade to instant state when set.
- Background atmosphere stops animating but stays positioned.

### Color contrast

- Primary text `#102033` on `#F8FBFF` → AAA at body sizes.
- Body text `#2B3950` on glass cards → AA.
- Mute `#5A6A82` reserved for text ≥ 12px (still AA).

---

## 14. Performance Rules

- **Fonts** loaded via `next/font/google` → self-hosted, swap fallback, zero CLS.
- **All transforms only** for animation. No `top/left/width/height` keyframes.
- **`willChange: transform`** on background spheres; nothing else (don't promote
  too many layers).
- **`mix-blend-mode: multiply`** on glows so they tint without needing extra opacity layers.
- **Images** via `next/image` (logo) — sized exactly, lazy by default, priority on hero logo.
- **Splash content** above the fold uses `priority` for fonts and images.
- **Build target:** All routes static (`○ Static`) wherever possible.

---

## 15. Don't / Do

| ✗ Don't                                              | ✓ Do                                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| `border-white/80` on white cards                     | `border-[rgba(16,32,51,0.10)]`                            |
| Hard-shadow drop CTAs                                | Tinted soft drops matching button color                  |
| Animated `top`/`left`/`width`                        | Animated `transform`/`opacity`                           |
| Stack glass cards directly with no internal contrast | Use `bg-white/85` inner tiles with ink borders inside    |
| Long line breaks (`<br/>`) in headlines              | Let lines wrap naturally; control width with max-w       |
| Many quick scattered animations                      | One orchestrated reveal + ambient breathing on loop      |
| Inter / Roboto / Arial generic fonts                 | Poppins (display) + Open Sans (body)                     |
| Solid sterile white background                       | `#F8FBFF` with the animated atmosphere layered above    |

---

## 16. File Map

```
edus-web/
├─ app/
│  ├─ globals.css               ← All CSS tokens + glass + button utilities
│  ├─ layout.tsx                ← Fonts, MotionProvider, Atmosphere, ScrollProgress
│  ├─ page.tsx                  ← Homepage section composition
│  ├─ sl/page.tsx               ← Sri Lanka pathway page
│  ├─ in/page.tsx               ← India pathway page
│  ├─ global/page.tsx           ← Global pathway via MarketLanding
│  ├─ how-it-works/page.tsx
│  ├─ success-stories/page.tsx
│  └─ enrol/page.tsx
├─ components/
│  ├─ Motion.tsx                ← LazyMotion wrapper + m, AnimatePresence re-exports
│  ├─ Atmosphere.tsx            ← Page-wide animated spheres (4 sphere config)
│  ├─ AmbientGlow.tsx           ← Per-section breathing glow primitive
│  ├─ ParallaxBlob.tsx          ← Reusable scroll-linked blob
│  ├─ ScrollProgress.tsx        ← Top-of-page progress bar
│  ├─ SiteHeader.tsx            ← Sticky pill nav with scroll-driven glass
│  ├─ SiteFooter.tsx            ← Compact 3-column footer
│  ├─ Hero.tsx                  ← Homepage hero
│  ├─ RegionSelector.tsx        ← 3 pathway cards
│  ├─ WhyJoin.tsx               ← 6 benefit cards
│  ├─ LearningExperience.tsx    ← 6-step process grid
│  ├─ Subjects.tsx              ← 3-tab subject browser
│  ├─ ParentTrust.tsx           ← 6 trust points
│  ├─ Success.tsx               ← Country-filtered testimonials
│  ├─ JoinFlow.tsx              ← 5-step enrolment with scroll line
│  ├─ ResourceSupport.tsx       ← 4 resource cards
│  ├─ FAQ.tsx                   ← Accordion
│  ├─ HelpBanner.tsx            ← Need help choosing? Banner
│  ├─ CTA.tsx                   ← Final CTA glass panel
│  ├─ JsonLd.tsx                ← Structured data injection
│  └─ MarketLanding.tsx         ← Reusable pathway template (used by /global)
├─ lib/
│  └─ motion.ts                 ← All Variants + viewport options + easings
├─ public/
│  ├─ edus_logo_blue.webp       ← Site logo
│  └─ edus_favicon.webp         ← Favicon
└─ design.md                    ← This document
```

---

## 17. Changelog

- **v1.0** — Initial bright premium glassmorphism system with Poppins +
  Open Sans, exact `#F8FBFF / #2563EB / #06B6D4 / #8B5CF6 / #22C55E /
  #FACC15 / #102033` palette.
- **v1.1** — Added Framer Motion variants library; added scroll-progress
  bar; added scroll-parallax blobs.
- **v1.2** — Added `<Atmosphere />` (4 spheres) + `<AmbientGlow />` per-section
  breathing glows; tightened ambient defaults to 200–240px / 0.06–0.16 opacity.
- **v1.3** — Country-tagged testimonials with All/SL/IN/GL filter; pathway
  Subjects switcher with grade-grouped lists.
- **v1.4** — Help banner extracted from footer; legal column added; footer compacted.
- **v1.5** — Heading gradient softened to three-stop blue→navy→violet;
  CTA headline scale tightened.
- **v1.6** — Inner tile borders fixed (`rgba(16,32,51,0.10)` not `white/80`).
