# EDUS Web

Next.js 16 (App Router) website for **EDUS Online Tuition** — live online classes
for Sri Lanka, India, Maldives, and global students.

The codebase is built around three principles:

1. **Multi-domain SEO** — the same code serves 6 production domains
   (`edustutor.com`, `edus.lk`, `edus.edu.lk` + www variants) with
   per-host canonical, hreflang, sitemap, and robots.
2. **AEO / GEO** — every page emits rich JSON-LD (FAQPage, LocalBusiness,
   AggregateRating, Course, EventSeries, ImageGallery, BlogPosting) so
   ChatGPT, Claude, Perplexity, Google AI Overviews and voice assistants
   can ingest the content directly.
3. **Performance-first** — fonts loaded with `display: swap` and no
   preload, GTM + GA4 deferred to `lazyOnload`, below-fold sections
   lazy-loaded via `next/dynamic`, hero images served as 89 KB WebP.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Node 24) |
| Language | TypeScript 6 |
| Styling | Tailwind v4 + `globals.css` |
| Animation | Framer Motion 12 (via `@/components/effects/Motion`) |
| Fonts | Poppins + Open Sans (`next/font/google`) |
| Icons | Lucide React |
| Email | Nodemailer + AWS SES (via `/api/contact`) |
| Images | Cloudinary (gallery), `/public` (everything else) |
| Analytics | Vercel Analytics + Google Analytics 4 + Google Tag Manager |
| Reviews | Google Places API (New) — Sunday cron refreshes weekly |

---

## Scripts

```bash
npm run dev            # start dev server (Turbopack)
npm run build          # production build
npm run start          # serve the build
npm run lint           # eslint
npm run gallery:fetch  # pull gallery images from Cloudinary
npm run reviews:fetch  # pull latest Google reviews into data/google-reviews.json
```

`gallery:fetch` and `reviews:fetch` both load env vars from `.env.local` via
Node's `--env-file` flag.

---

## Folder structure

```
edus-web/
├── app/                                # Next.js App Router routes
│   ├── layout.tsx                      # root layout + per-host metadata
│   ├── page.tsx                        # homepage (dynamic imports below the fold)
│   ├── robots.ts                       # per-host robots.txt
│   ├── sitemap.ts                      # per-host sitemap.xml + image sitemap
│   ├── globals.css                     # Tailwind + custom globals
│   ├── api/
│   │   └── contact/route.ts            # contact form -> AWS SES via Nodemailer
│   ├── sl/                             # Sri Lanka market + /sl/timetable
│   ├── in/                             # India CBSE market
│   ├── mv/                             # Maldives Cambridge market
│   ├── global/                         # Global international market
│   ├── teach/                          # Tutor recruitment
│   ├── contact/                        # Contact form page
│   ├── about/                          # Company / mission / accreditations
│   ├── press/                          # Press kit + media contact
│   ├── blog/
│   │   ├── page.tsx                    # Blog index
│   │   └── [slug]/page.tsx             # Per-post detail (8 posts shipped)
│   ├── gallery/
│   │   ├── page.tsx                    # Gallery index (14 albums)
│   │   └── [slug]/page.tsx             # Per-album with photo grid + lightbox
│   └── privacy/ terms/ cookies/        # Legal pages
│       refunds/ safeguarding/
│       acceptable-use/
│
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx              # Fixed top nav (host-aware)
│   │   ├── SiteFooter.tsx              # Footer with consent revisit link
│   │   ├── JsonLd.tsx                  # Homepage HomeJsonLd aggregator
│   │   └── StructuredData.tsx          # 30+ schema builders (single source)
│   ├── analytics/
│   │   ├── ConsentDefaults.tsx         # Inline Consent Mode v2 default state
│   │   ├── ConsentBanner.tsx           # GDPR consent banner + customise modal
│   │   ├── CookiePreferencesLink.tsx   # Footer "reopen preferences" button
│   │   ├── DeferredAnalytics.tsx       # GTM + GA4 with strategy="lazyOnload"
│   │   └── AnalyticsClickTracker.tsx   # Global delegated GA4 event listener
│   ├── home/                           # Above-the-fold homepage sections
│   │   ├── Hero.tsx                    # Hero + audience rotator
│   │   ├── RegionSelector.tsx          # 4-market path picker
│   │   ├── WhyJoin.tsx
│   │   ├── QualifiedTutors.tsx
│   │   ├── LearningExperience.tsx      # "How learning works" orbital diagram
│   │   ├── ParentTrust.tsx
│   │   └── VideoShowcase.tsx
│   ├── shared/                         # Reused across multiple pages
│   │   ├── CTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── Breadcrumb.tsx              # Visible breadcrumb (standalone + overlay variants)
│   │   ├── Success.tsx
│   │   ├── SuccessData.ts
│   │   ├── ResourceSupport.tsx
│   │   ├── Accreditations.tsx
│   │   ├── ContactForm.tsx
│   │   └── VideosData.ts
│   ├── effects/
│   │   ├── Motion.tsx                  # Framer Motion provider
│   │   ├── Icons.tsx                   # FeatureIcon Lucide mapper
│   │   ├── ScrollProgress.tsx
│   │   ├── Atmosphere.tsx              # Site-wide ambient background
│   │   └── AmbientGlow.tsx
│   ├── markets/
│   │   ├── OtherMarkets.tsx            # Cross-market link block
│   │   ├── sl/                         # Sri Lanka (Sl* + GoogleReviews + GoogleReviewsClient)
│   │   ├── in/                         # India (In*)
│   │   ├── mv/                         # Maldives (Mv*)
│   │   └── global/                     # Global (Gl*)
│   ├── blog/
│   │   └── BlogData.ts                 # 8 posts (slug, title, market, body[])
│   ├── gallery/
│   │   └── GalleryData.ts              # 14 albums (slug, title, photos[], SEO copy)
│   ├── contact/
│   │   ├── ContactHero.tsx
│   │   ├── ContactMap.tsx
│   │   └── ContactShared.tsx
│   └── teach/                          # Teach-with-EDUS sections (Teach*)
│
├── lib/                                # Pure utilities / hooks
│   ├── siteUrl.ts                      # Host-aware URLs + hreflang + GA/GTM ID switch
│   ├── analytics.ts                    # Typed GA4 event helpers
│   ├── consent.ts                      # localStorage consent + Consent Mode v2 bridge
│   ├── googleReviews.ts                # Reads data/google-reviews.json snapshot
│   ├── motion.ts                       # Reusable Framer Motion variants
│   └── useIsMobile.ts
│
├── data/
│   └── google-reviews.json             # Weekly snapshot from Sunday cron
│
├── public/
│   ├── edus-logo-blue.webp
│   ├── edus-favicon.webp
│   ├── edus-og.jpg                     # Brand OG fallback
│   ├── edus-how-learning-works.webp    # Optimised hero image (89 KB)
│   ├── *-edus-partner.webp             # Accreditation partner logos
│   ├── llms.txt + llms-full.txt        # AI engine ingestion signals
│   └── manifest.webmanifest
│
├── scripts/
│   ├── fetch-cloudinary-gallery.mjs    # Sync gallery photos from Cloudinary folders
│   └── fetch-google-reviews.mjs        # Sync top 5 most-relevant Google reviews
│
├── .github/workflows/
│   └── google-reviews-cron.yml         # Weekly Sunday 03:00 UTC reviews refresh
│
├── middleware.ts                       # edus.lk/ + edus.edu.lk/ -> /sl 308 redirect
├── vercel.json                         # Security headers + cache policies
├── next.config.mjs                     # remotePatterns (Cloudinary + Google avatars)
├── tsconfig.json
└── package.json
```

---

## Multi-domain setup

The same Next.js build serves 6 production domains. `lib/siteUrl.ts` is the
single source of truth — it reads the inbound `Host` header on every request
and routes the right canonical / hreflang / GA4 / GTM IDs.

| Domain | Role | Hreflang | GA4 | GTM |
|---|---|---|---|---|
| `edustutor.com` | International primary | `en` | `G-TDTGSZ3JKP` | `GTM-PRCZXRWT` |
| `www.edustutor.com` | International (www) | `en` | `G-TDTGSZ3JKP` | `GTM-PRCZXRWT` |
| `edus.lk` | Sri Lanka short | `en-LK` | `G-CR35WZ2QEY` | `GTM-564N63N7` |
| `www.edus.lk` | Sri Lanka (www) | `en-LK` | `G-CR35WZ2QEY` | `GTM-564N63N7` |
| `edus.edu.lk` | Sri Lanka academic | `en-LK` | `G-CR35WZ2QEY` | `GTM-564N63N7` |
| `www.edus.edu.lk` | Sri Lanka academic (www) | `en-LK` | `G-CR35WZ2QEY` | `GTM-564N63N7` |

### Middleware

`middleware.ts` runs at the Vercel edge on the homepage path only. When the
host is a `.lk` domain, it 308-redirects `/` to `/sl` so Sri Lankan visitors
land on the Sri Lanka content directly. All other paths bypass the middleware.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. **`.env.local` is
gitignored** — never commit it.

### Required for the website (Vercel Production / Preview / Development)

```bash
# AWS SES (contact form -> Nodemailer)
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=<aws-ses-smtp-user>
SMTP_PASS=<aws-ses-smtp-password>
CONTACT_FROM_EMAIL=no-replay@edus.edu.lk
CONTACT_FROM_NAME=EDUS Inquiries
CONTACT_TO_EMAIL=<destination-inbox>

# Cloudinary (gallery images served via next/image proxy)
CLOUDINARY_CLOUD_NAME=yarlventures
NEXT_PUBLIC_CLOUDINARY_CLOUD=yarlventures   # shipped to browser
# CLOUDINARY_API_KEY + SECRET are LOCAL ONLY (used by gallery:fetch script)
```

### Required for local scripts only (NOT on Vercel)

```bash
CLOUDINARY_API_KEY=<15-digit>
CLOUDINARY_API_SECRET=<secret>
GOOGLE_PLACES_API_KEY=<server-only key>
GOOGLE_PLACES_PLACE_ID=ChIJJYuL7oNV_joRwjWmwWbSDQo
```

### Required as GitHub Actions secrets

The weekly cron at `.github/workflows/google-reviews-cron.yml` needs:

- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACES_PLACE_ID`

Set them at **Repo → Settings → Secrets and variables → Actions → New repository secret**.

---

## Analytics + tracking

| Layer | What | Where |
|---|---|---|
| **Vercel Analytics** | Cookieless page-view counter | Only mounts when `process.env.VERCEL` is set |
| **Google Analytics 4** | Page views + 11 custom events | `lazyOnload` via `<DeferredAnalytics>` |
| **Google Tag Manager** | Tag orchestration (Microsoft Clarity loads here) | `lazyOnload` via `<DeferredAnalytics>` |
| **Microsoft Clarity** | Session replay + heatmaps | Loaded inside the GTM container, not in code |
| **Consent Mode v2** | Cookie consent defaults + user choice | `<ConsentDefaults>` (head) + `<ConsentBanner>` (body) |

### Custom GA4 events (see `lib/analytics.ts`)

Fired automatically via the global click delegator (`<AnalyticsClickTracker>`)
or manually from specific components. Every event carries `market` (sl / in /
mv / global / homepage) and `surface` (hero / footer / cta_section / etc.)
params for funnel segmentation.

| Event | Trigger |
|---|---|
| `signup_click` | Any link to `signup.edustutor.com` |
| `contact_form_submit` | Successful `/api/contact` 2xx |
| `contact_form_error` | Failed `/api/contact` request |
| `region_select` | Clicks on a market tile in RegionSelector / OtherMarkets |
| `google_review_click` | "View on Google" links from review cards or "View all" CTA |
| `view_more_reviews` | "View more reviews" expand button |
| `blog_post_click` | Any link to `/blog/<slug>` |
| `gallery_album_click` | Any link to `/gallery/<slug>` |
| `teach_apply_click` | "Apply to Teach" Fillout link |
| `social_click` | Footer social icon clicks |
| `contact_channel_click` | Phone / email / WhatsApp links on /contact |

Mark these as Conversions in **GA4 → Admin → Events** after 24 hours of data.

### Surface labels

To enrich the `surface` param on events, add `data-track-surface="<surface>"`
to the nearest semantic ancestor of the CTA. Allowed values:

```
hero · header · footer · cta_section · region_selector ·
other_markets · card · faq · pricing · inline
```

The click tracker walks up the DOM until it finds the attribute. No prop
threading needed.

---

## SEO infrastructure

### Per-page

- **Canonical** — host-aware, points at the served domain (not always edustutor.com)
- **hreflang** — `en` + `en-LK` + `x-default` block on every page, generated by `hreflangAlternates(path)`
- **OpenGraph** — full `og:title` / `og:description` / `og:url` / `og:image` / `og:type`
- **Twitter Card** — `summary_large_image` on every page
- **Visible breadcrumbs** — `<Breadcrumb>` component with `BreadcrumbList` JSON-LD
- **JSON-LD** — see `components/layout/StructuredData.tsx` for 30+ schema builders

### Site-wide

- **`robots.ts`** — per-host robots.txt with 150+ AI / search / SEO bots allow-listed
- **`sitemap.ts`** — per-host sitemap.xml with image sitemap extension for gallery photos
- **`llms.txt`** + **`llms-full.txt`** — AI engine ingestion (ChatGPT, Perplexity, Claude, Gemini)
- **`security.txt`** + **`humans.txt`** — trust signals
- **`manifest.webmanifest`** — PWA readiness

### Schema graph (per `StructuredData.tsx`)

```
EducationalOrganization (root)
├── LocalBusiness (with AggregateRating from Google reviews)
├── WebSite
├── FAQPage (homepage + per-market + Google reviews Q&A)
├── BreadcrumbList (every page)
├── BlogPosting (per blog post)
├── ImageGallery (per gallery album with creator + copyrightHolder)
├── Course + CourseInstance (per market)
├── EducationalOccupationalProgram (per market)
├── Service (per market)
├── EventSeries (Sri Lanka timetable)
├── Event + Place (gallery albums tied to physical events)
├── Review[] (from Google Places API)
├── HowTo (enrolment flow)
├── JobPosting (Teach with EDUS)
├── CollectionPage (Teach + Sri Lanka timetable)
├── WebApplication (signup portal)
├── InteractionCounter (7,000+ students)
├── MerchantReturnPolicy (refunds page)
├── VideoObject + VideoCarousel
├── SpeakableSpecification (homepage FAQ + legal pages)
├── SiteNavigationElement
└── ItemList (regions + success stories + blog index + gallery index)
```

---

## Google reviews integration

Live reviews from the EDUS Online Tuition listing
(`ChIJJYuL7oNV_joRwjWmwWbSDQo`) display on `/sl` above the curated
testimonials block.

### Data flow

```
Sunday 03:00 UTC
   │
   ▼
GitHub Actions cron (.github/workflows/google-reviews-cron.yml)
   │
   ▼
scripts/fetch-google-reviews.mjs
   │  uses GOOGLE_PLACES_API_KEY + GOOGLE_PLACES_PLACE_ID
   ▼
data/google-reviews.json (committed to repo)
   │
   ▼
Vercel auto-deploys
   │
   ▼
lib/googleReviews.ts reads JSON at build time
   │
   ▼
components/markets/sl/GoogleReviews.tsx
   ├── Filters reviews >= 3 stars
   ├── Buckets into 5*, 4*, 3*
   └── Passes to GoogleReviewsClient (expand UI)
```

**Cost**: 1 API call per week × 52 weeks = 52 calls/year × $0.025 (Pro SKU)
= ~$1.30/year, well inside Google's $200/month free credit. Runtime API
calls = zero.

### Manual refresh

```bash
npm run reviews:fetch
```

---

## Gallery (Cloudinary)

14 albums covering events from 2021 to 2025. Each album is a folder in the
`yarlventures` Cloudinary account. Images are NOT stored in `/public` — they
load through `next/image` proxy from `res.cloudinary.com`.

### Manual sync after uploading new photos

```bash
npm run gallery:fetch
```

This reads the explicit `FOLDER_TO_SLUG` map in `scripts/fetch-cloudinary-gallery.mjs`,
fetches every image's public ID + dimensions, and rewrites the `photos: [...]`
block for each album in `components/gallery/GalleryData.ts`. Run it any time
you add or remove photos in Cloudinary.

---

## Performance budget

Mobile Lighthouse (simulated 4× CPU + 3G) — Last measured May 2026:

| Metric | Target | Current |
|---|---|---|
| Performance score | ≥ 80 | **88** |
| Accessibility | 100 | **100** |
| Best Practices | 100 | **77** (gated by Clarity in GTM — see below) |
| SEO | 100 | **100** |
| LCP | ≤ 2.5s | 3.5s |
| FCP | ≤ 1.8s | 2.1s |
| CLS | ≤ 0.10 | **0.01** |
| TBT | ≤ 200ms | **60ms** |
| Speed Index | ≤ 3.4s | **2.7s** |

Desktop scores **100/100 Performance** with all CWV in the "Good" range.

### Why Best Practices is 77 not 100

Microsoft Clarity drops 3rd-party cookies via your GTM container. To close
this, configure each Clarity tag inside GTM with:

- **Advanced Settings → Consent Settings → Require additional consent → tick `analytics_storage`**

After publishing the GTM container, Clarity only loads when the user accepts
in the cookie banner, dropping the Best Practices score to 100/100.

---

## Path aliases

`@/*` resolves to the project root.

```ts
import { Hero } from "@/components/home/Hero";
import { CTA } from "@/components/shared/CTA";
import { GlHero } from "@/components/markets/global/GlHero";
import { siteUrl, hreflangAlternates } from "@/lib/siteUrl";
import { trackSignupClick } from "@/lib/analytics";
```

---

## Naming conventions

- **Component files** — PascalCase, one default or named export per file: `Hero.tsx`, `RegionSelector.tsx`.
- **Per-market prefix** — every Maldives component starts with `Mv`, every
  Global with `Gl`, every India with `In`, every Sri Lanka with `Sl`,
  every Teach-with-EDUS with `Teach`. Shared utilities for that market
  live in `MvShared.tsx` / `GlobalShared.tsx` etc.
- **Hooks** — camelCase starting with `use`, in `lib/`: `useIsMobile.ts`.
- **Pages** — every Next.js route is `page.tsx`. Route folder names match the URL slug.
- **Public assets** — kebab-case, no spaces. Partner logos follow
  `<partner-name>-edus-partner.webp` for image-search visibility.
- **Schema builders** — camelCase functions in `components/layout/StructuredData.tsx`,
  one per entity type (e.g. `blogPosting()`, `galleryAlbumSchema()`).

---

## Adding a new page

1. Create `app/<slug>/page.tsx`.
2. Export `metadata` (or async `generateMetadata` for host-aware pages) with
   at least `title`, `description`, and `alternates.canonical`. For multi-domain
   support add `alternates.languages: hreflangAlternates("/<slug>")`.
3. Emit JSON-LD via `<JsonLdScript data={...}>` — use a schema builder
   from `@/components/layout/StructuredData`.
4. Add a visible breadcrumb via `<Breadcrumb items={[...]}>`.
5. If the page reuses sections, import from `@/components/shared/*` or
   `@/components/home/*`.
6. If it's a brand-new market or product page, create a folder under
   `components/markets/<code>/` with one component per section.
7. Add the route to `app/sitemap.ts`.

---

## Adding a new blog post

1. Edit `components/blog/BlogData.ts`.
2. Append a new entry to the `POSTS` array:
   ```ts
   {
     slug: "your-post-slug",
     title: "Post Title - 50-65 chars",
     description: "Meta description - 150-160 chars with a verb.",
     market: "SL",                       // or "IN" | "MV" | "GL" | "ALL"
     marketLabel: "Sri Lanka",
     marketTint: "#2563EB",
     author: { name: "...", role: "..." },
     datePublished: "2026-MM-DD",
     readingMinutes: 8,
     body: [
       "Opening paragraph...",
       "## H2 section",
       "Section paragraph...",
       "### H3 subsection",
       "..."
     ],
   }
   ```
3. The new post auto-appears at `/blog` and `/blog/<slug>` with
   BlogPosting JSON-LD. Sitemap, RSS, and search indexing happen automatically
   on the next deploy.

---

## Adding a new gallery album

1. Upload photos to a Cloudinary folder in the `yarlventures` account.
2. Add a row to `FOLDER_TO_SLUG` in `scripts/fetch-cloudinary-gallery.mjs`
   mapping the folder name to a kebab-case album slug.
3. Add the album metadata + body to `components/gallery/GalleryData.ts`.
4. Run `npm run gallery:fetch` to populate the photo IDs.

---

## Search engine indexing

### How indexing works for EDUS

Each domain (`edustutor.com`, `edus.lk`, `edus.edu.lk`) is a **separate**
property in Google Search Console + Bing Webmaster Tools. Each domain
serves its own per-host sitemap.xml listing only its own URLs.

| Search engine | Submission method | Crawl latency |
|---|---|---|
| **Google** | Search Console + sitemap.xml | 1 day – 4 weeks |
| **Bing** | IndexNow API + Webmaster Tools sitemap | Minutes |
| **Yandex** | IndexNow API | Minutes |
| **DuckDuckGo** | IndexNow API (uses Bing's index) | Minutes |
| **Seznam, Naver** | IndexNow API | Hours |

### IndexNow (instant indexing for non-Google engines)

The codebase already ships everything needed:

1. **Verification key**: `/public/518080ca37ebe1a2c00b97095a87a81dab76a8591dff74910579c3797ca839b2.txt`
   — every domain serves this file at `https://<host>/<key>.txt`, proving
   ownership for IndexNow.
2. **Submitter script**: `scripts/indexnow-submit.mjs` — fetches each
   domain's live `sitemap.xml`, extracts all `<loc>` URLs, posts to
   `api.indexnow.org`.
3. **Weekly cron**: `.github/workflows/indexnow-weekly.yml` runs every
   Monday 04:00 UTC.

#### Run manually

```bash
npm run indexnow:submit
```

#### When to run

- After any production deploy that adds or removes routes
- After publishing a blog post or new gallery album
- Otherwise the Monday cron handles weekly re-submission automatically

### Google Search Console — one-time setup per domain

For each domain `edustutor.com`, `edus.lk`, `edus.edu.lk`:

1. Open https://search.google.com/search-console
2. **Add property** → **URL prefix** → enter `https://<domain>`
3. Verify ownership via HTML tag, DNS TXT, or domain registrar lookup
4. After verification, click into the property → **Sitemaps** (left sidebar)
5. **Add new sitemap** → enter `sitemap.xml` → Submit
6. Wait 24-48 hours for Google to read the sitemap

After this, Google crawls on its own schedule. To prioritise specific URLs,
use the manual **Request Indexing** flow (see below).

### Manual GSC "Request Indexing" (priority URLs)

GSC lets you manually request indexing for up to ~10 URLs per property per
day. Use this for high-priority pages immediately after deploy.

**Priority list per domain** (submit in this order, one URL at a time):

```
https://<domain>/
https://<domain>/sl
https://<domain>/in
https://<domain>/mv
https://<domain>/global
https://<domain>/about
https://<domain>/blog
https://<domain>/gallery
https://<domain>/teach
https://<domain>/contact
```

Then the next day, submit:
```
https://<domain>/sl/timetable
https://<domain>/press
https://<domain>/blog/<post-slug>            # for each of 8 blog posts
https://<domain>/gallery/<album-slug>        # for each of 14 albums
```

#### How to request indexing

1. GSC → top search bar → paste the URL
2. Click **Request Indexing** (button appears after URL inspection completes)
3. Wait ~30 seconds for Google to attempt a live crawl
4. Repeat for the next URL

Per Google's docs, requested URLs are typically indexed within 24-48 hours.

### Bing Webmaster Tools

1. Open https://www.bing.com/webmasters
2. Sign in with the same Google account (Bing accepts Google verification)
3. **Add a site** → enter `https://edustutor.com`
4. Click **Import from Google Search Console** → auto-imports verification + sitemap
5. Repeat for `https://edus.lk` and `https://edus.edu.lk`

Bing also reads IndexNow submissions, so once IndexNow is wired (already
done in this codebase), Bing crawls within minutes of submission.

### Verifying indexing status

| Check | Command |
|---|---|
| Google's index | `site:edustutor.com` in google.com search |
| Bing's index | `site:edustutor.com` in bing.com search |
| Sitemap reachable | `curl -I https://edustutor.com/sitemap.xml` (expect 200) |
| IndexNow key reachable | `curl -I https://edustutor.com/<key>.txt` (expect 200) |
| Latest IndexNow ping status | GitHub Actions tab → "Ping IndexNow weekly" → latest run |

---

## Deployment

### Production

`main` branch is the production branch. Vercel auto-deploys on every push.

### Required Vercel env vars

Same as `.env.local` minus `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
(local-only). Set them at **Vercel → Project → Settings → Environment
Variables** for all 3 environments (Production / Preview / Development).

### Required GitHub Actions secrets

For the Sunday cron to run, add at **Repo → Settings → Secrets**:
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACES_PLACE_ID`

### After deploy checklist

1. Open https://edustutor.com — visually verify Hero, RegionSelector, footer
2. Open https://edustutor.com/sl — verify Google reviews render
3. Open https://edus.lk/ — verify 308 redirect to /sl
4. https://pagespeed.web.dev/?url=https%3A%2F%2Fedustutor.com — verify CWV
5. GA4 → Realtime → confirm pageview events are firing
6. Search Console → submit `/sitemap.xml` for each domain property

---

## Local dev

```bash
git clone <repo>
cd edus-web
npm install
cp .env.example .env.local
# fill in env vars in .env.local
npm run dev
```

Open http://localhost:3000.

### Simulating a specific domain locally

Use `curl -H "Host: edus.lk"` to test the .lk-domain routing without DNS:

```bash
curl -sH "Host: edus.lk" http://localhost:3000/sl
```

Or override locally via `/etc/hosts`:

```
127.0.0.1 edus.lk
127.0.0.1 edustutor.com
```

Then visit `http://edus.lk:3000/` to test the middleware redirect.
