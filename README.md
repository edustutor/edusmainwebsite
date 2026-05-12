# EDUS Web

Next.js 16 (App Router) website for **EDUS Online Tuition** — live online classes
for Sri Lanka, India, Maldives, and global students.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS 3
- Framer Motion 12
- Poppins + Open Sans (`next/font/google`)

## Scripts

```bash
npm run dev      # start dev server (turbopack)
npm run build    # production build
npm run start    # serve the build
npm run lint     # eslint
```

## Folder structure

```
edus-web/
├── app/                          # Next.js App Router routes
│   ├── layout.tsx                # root layout + global metadata
│   ├── page.tsx                  # homepage
│   ├── robots.ts                 # robots.txt generator
│   ├── sitemap.ts                # sitemap.xml generator
│   ├── globals.css               # tailwind + custom globals
│   ├── sl/                       # Sri Lanka market page
│   ├── in/                       # India market page
│   ├── mv/                       # Maldives market page (composed)
│   ├── global/                   # Global market page (composed)
│   ├── teach/                    # Teach with EDUS (tutor recruitment)
│   ├── contact/                  # Contact form page
│   ├── how-it-works/             # The EDUS method
│   ├── success-stories/          # Student testimonials
│   └── privacy/ terms/ cookies/  # Legal pages
│       refunds/ safeguarding/
│       acceptable-use/
│
├── components/                   # All React components, grouped by concern
│   ├── layout/                   # Site chrome: header, footer, structured data
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── JsonLd.tsx
│   ├── home/                     # Homepage-only sections
│   │   ├── Hero.tsx
│   │   ├── RegionSelector.tsx
│   │   ├── WhyJoin.tsx
│   │   ├── QualifiedTutors.tsx
│   │   ├── LearningExperience.tsx
│   │   └── ParentTrust.tsx
│   ├── shared/                   # Reused across multiple pages
│   │   ├── CTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── Success.tsx
│   │   ├── ResourceSupport.tsx
│   │   ├── Accreditations.tsx
│   │   └── ContactForm.tsx
│   ├── effects/                  # Visual / motion primitives
│   │   ├── Motion.tsx            # Framer Motion provider
│   │   ├── ScrollProgress.tsx
│   │   ├── Atmosphere.tsx        # Site-wide ambient background
│   │   └── AmbientGlow.tsx       # Reusable glow component
│   ├── markets/                  # Per-market page builders
│   │   ├── sl/                   # Sri Lanka (Sl* components)
│   │   ├── in/                   # India (In* components)
│   │   ├── mv/                   # Maldives (Mv* components)
│   │   └── global/               # Global (Gl* components)
│   └── teach/                    # Teach-with-EDUS page builder (Teach* components)
│
├── lib/                          # Pure utilities / hooks
│   ├── motion.ts                 # Reusable motion variants
│   └── useIsMobile.ts
│
├── public/                       # Static assets
│   ├── edus_logo_blue.webp
│   ├── edus_favicon.webp
│   └── *-edus-partner.webp       # Accreditation partner logos (SEO-named)
│
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Path aliases

`@/*` resolves to the project root, so imports look like:

```ts
import { Hero } from "@/components/home/Hero";
import { CTA } from "@/components/shared/CTA";
import { GlHero } from "@/components/markets/global/GlHero";
import { useIsMobile } from "@/lib/useIsMobile";
```

## Naming conventions

- **Component files** — PascalCase, one default or named export per file: `Hero.tsx`, `RegionSelector.tsx`.
- **Per-market component prefix** — every Maldives component starts with `Mv`,
  every Global with `Gl`, every Teach with `Teach`. Shared utilities for that
  market live in `MvShared.tsx` / `GlobalShared.tsx` / `TeachShared.tsx`.
- **Hooks** — camelCase starting with `use`, in `lib/`: `useIsMobile.ts`.
- **Pages** — every Next.js route is `page.tsx`. Route folder names match the URL slug.
- **Public assets** — kebab-case, no spaces, no typos. Partner logos follow
  `<partner-name>-edus-partner.webp` for SEO image-search visibility.

## Adding a new page

1. Create `app/<slug>/page.tsx`.
2. Export `metadata` with at least `title`, `description`, and `alternates.canonical`.
3. If the page reuses sections, import from `@/components/shared/*` or `@/components/home/*`.
4. If it's a brand-new market or product page, create a folder under
   `components/markets/<code>/` (or a sibling top-level folder) with one component per section.
5. Add the route to `app/sitemap.ts`.

## Adding a new shared component

If a section is used on **two or more pages**, it belongs in `components/shared/`.
If it lives only on one page, it belongs in that page's folder
(`components/home/`, `components/markets/mv/`, etc.).
