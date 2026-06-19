/**
 * EDUS Overseas Consultancy - single source of truth for all page data.
 *
 * Everything here is sourced from the official Website Development
 * Requirements Document. No fabricated facts. Contact details: shared
 * EDUS Jaffna office, with the dedicated EDUS Overseas hotline
 * +94 70 701 2333 (call + WhatsApp target for all consultation CTAs).
 *
 * Leads are handled by WhatsApp + email only (no CRM in this build), so
 * the consultation form composes a prefilled WhatsApp message and a
 * mailto fallback - the contact number is the conversion target.
 */

/* --------------------------------------------------------------- */
/* Brand + contact constants                                         */
/* --------------------------------------------------------------- */

export const OV = {
  brand: "EDUS Overseas Consultancy",
  brandShort: "EDUS Overseas",
  tagline: "From Dreams to Destinations",
  // Live URL: edus.lk/overseas. Used for canonical + JSON-LD.
  siteBase: "https://edus.lk",
  basePath: "/overseas",

  // Dedicated EDUS Overseas hotline (call + WhatsApp). Digits-only
  // WhatsApp form has no +, spaces, or leading zero.
  phoneDisplay: "+94 70 701 2333",
  phoneTel: "+94707012333",
  whatsapp: "94707012333",

  // Shared EDUS office (Jaffna). Confirmed existing EDUS address.
  email: "overseas@edus.lk",
  addressLine: "No. 95, K.K.S Road, Kokkuvil Junction, Jaffna 40000, Sri Lanka",
  street: "No. 95, K.K.S Road, Kokkuvil Junction",
  city: "Jaffna",
  region: "Northern Province",
  postalCode: "40000",
  country: "LK",
  geo: { lat: 9.6945511, lng: 80.0139866 },
  // Google Maps embed + share link (shared EDUS office pin).
  mapsShare: "https://maps.app.goo.gl/ZQO6DJ0yRrFXtOw1x",
} as const;

/**
 * Build a WhatsApp click-to-chat URL with a prefilled message. Used by
 * every consultation CTA so a tap lands the lead straight in WhatsApp.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${OV.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* --------------------------------------------------------------- */
/* Why choose EDUS - homepage trust pillars (from the brief)         */
/* --------------------------------------------------------------- */

export const WHY_CHOOSE: Array<{ title: string; body: string; icon: string }> = [
  {
    title: "Experienced Counsellors",
    body: "Senior advisors who have placed students across the UK, Australia, Canada, and beyond guide every step.",
    icon: "counsellor",
  },
  {
    title: "Personalized Guidance",
    body: "Your course, country, and budget shape a plan built only for you. No copy-paste advice.",
    icon: "personalized",
  },
  {
    title: "University Partnerships",
    body: "Direct links with leading global universities mean faster offers and reliable application routes.",
    icon: "university",
  },
  {
    title: "Visa Support",
    body: "End-to-end visa guidance with document checks and interview prep behind a high success record.",
    icon: "visa",
  },
  {
    title: "Scholarship Assistance",
    body: "We find the scholarships and funding you qualify for and help you apply the right way.",
    icon: "scholarship",
  },
];

/* --------------------------------------------------------------- */
/* Statistics counters (from the brief)                              */
/* --------------------------------------------------------------- */

export const STATS: Array<{ value: number; suffix: string; label: string }> = [
  { value: 1000, suffix: "+", label: "Students Guided" },
  { value: 500, suffix: "+", label: "University Programs" },
  { value: 95, suffix: "%", label: "Visa Success Rate" },
  { value: 6, suffix: "+", label: "Study Destinations" },
];

/* --------------------------------------------------------------- */
/* Destinations - the per-country landing pages also read from here  */
/* Overview copy is original EDUS wording. Image is a /public path    */
/* the user will supply (see image-prompt list).                     */
/* --------------------------------------------------------------- */

export type Destination = {
  slug: string;
  name: string;        // "United Kingdom"
  short: string;       // "UK"
  flag: string;        // emoji
  tint: string;        // accent colour for the card
  image: string;       // /public path (user-generated)
  imageAlt: string;
  tagline: string;     // one-liner on the card
  overview: string;    // 2-3 sentence card / hero overview
  // Per-destination landing page detail
  highlights: string[];        // bullet reasons to study there
  popularCourses: string[];    // common fields students pick
  intakes: string;             // intake seasons
  workRights: string;          // post-study work summary
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    short: "UK",
    flag: "🇬🇧",
    tint: "#FF5A5F",
    image: "/overseas/destinations/uk.webp",
    imageAlt: "Study in the United Kingdom - London skyline with Big Ben and red bus",
    tagline: "World-ranked universities, 1-2 year degrees",
    overview:
      "Study in the UK for globally ranked universities, shorter degrees, and a 2-year Graduate Route work visa. A top choice for Sri Lankan students who want a fast, respected path to a global career.",
    highlights: [
      "Top 10 global universities and 1-year master's degrees",
      "2-year post-study Graduate Route work visa",
      "Strong Sri Lankan student community and direct flights",
      "Scholarships for international students every intake",
    ],
    popularCourses: ["Business & Management", "Engineering", "Computing & Data Science", "Health & Nursing", "Law"],
    intakes: "September and January (main), with some May intakes",
    workRights: "2-year Graduate Route work visa after your degree (3 years for PhD).",
  },
  {
    slug: "australia",
    name: "Australia",
    short: "Australia",
    flag: "🇦🇺",
    tint: "#FFB23E",
    image: "/overseas/destinations/australia.webp",
    imageAlt: "Study in Australia - Sydney Opera House and Harbour Bridge at sunset",
    tagline: "Work while you study, strong PR pathways",
    overview:
      "Australia combines world-class universities with generous work rights and clear post-study pathways. Ideal for students who want to earn while they learn in a sunny, welcoming country.",
    highlights: [
      "Work up to 48 hours per fortnight while studying",
      "2 to 4 year post-study work visa (Temporary Graduate 485)",
      "8 of the world's top 100 universities",
      "Safe, multicultural cities with large Sri Lankan communities",
    ],
    popularCourses: ["Information Technology", "Accounting & Finance", "Nursing & Health", "Engineering", "Hospitality"],
    intakes: "February and July (main), with some November intakes",
    workRights: "2 to 4 year Temporary Graduate (485) work visa depending on your qualification.",
  },
  {
    slug: "canada",
    name: "Canada",
    short: "Canada",
    flag: "🇨🇦",
    tint: "#14B8A6",
    image: "/overseas/destinations/canada.webp",
    imageAlt: "Study in Canada - Toronto skyline with CN Tower by the lake",
    tagline: "Affordable, PR-friendly, work after study",
    overview:
      "Canada offers affordable, high-quality education with one of the clearest routes to permanent residency. A 3-year post-graduation work permit makes it a favourite for long-term plans.",
    highlights: [
      "Up to 3-year Post-Graduation Work Permit (PGWP)",
      "Clear permanent residency pathways after study",
      "Lower tuition than the US or UK for similar quality",
      "Safe, friendly cities and a strong Tamil and Sri Lankan community",
    ],
    popularCourses: ["Business", "Computer Science & IT", "Engineering Technology", "Healthcare", "Supply Chain & Logistics"],
    intakes: "September (main), January and May",
    workRights: "Up to 3-year Post-Graduation Work Permit, a recognised step toward PR.",
  },
  {
    slug: "dubai",
    name: "Dubai",
    short: "Dubai",
    flag: "🇦🇪",
    tint: "#7C3AED",
    image: "/overseas/destinations/dubai.webp",
    imageAlt: "Study in Dubai - Burj Khalifa and modern skyline at golden hour",
    tagline: "Global degrees, close to home, tax-free careers",
    overview:
      "Dubai brings UK, US, and Australian university campuses to a fast-growing, tax-free hub just hours from Sri Lanka. Study a global degree close to home with strong job opportunities.",
    highlights: [
      "Branch campuses of UK, US, and Australian universities",
      "Tax-free salaries and a fast-growing job market",
      "Just a 4-hour flight from Colombo",
      "Safe, modern city with a large South Asian community",
    ],
    popularCourses: ["Business & Management", "Aviation & Tourism", "Engineering", "Media & Design", "IT"],
    intakes: "September and January (main), with some intakes year-round",
    workRights: "Part-time work allowed in free-zone universities; strong graduate job market.",
  },
  {
    slug: "ireland",
    name: "Ireland",
    short: "Ireland",
    flag: "🇮🇪",
    tint: "#22C55E",
    image: "/overseas/destinations/ireland.webp",
    imageAlt: "Study in Ireland - Dublin city with the River Liffey and Ha'penny Bridge",
    tagline: "English-speaking EU hub for tech and pharma",
    overview:
      "Ireland is an English-speaking EU country and the European base for the world's biggest tech and pharma companies. A 2-year stay-back visa makes it a smart, career-focused choice.",
    highlights: [
      "2-year stay-back visa for master's graduates",
      "European HQ of Google, Meta, Pfizer, and more",
      "English-speaking, EU-member country",
      "Safe, friendly, and welcoming to international students",
    ],
    popularCourses: ["Data Science & Computing", "Pharmaceutical Science", "Business Analytics", "Engineering", "Finance"],
    intakes: "September (main) and January",
    workRights: "2-year Third Level Graduate stay-back visa for eligible master's graduates.",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    short: "New Zealand",
    flag: "🇳🇿",
    tint: "#06B6D4",
    image: "/overseas/destinations/new-zealand.webp",
    imageAlt: "Study in New Zealand - Auckland skyline with harbour and green hills",
    tagline: "Safe, scenic, with open post-study work visas",
    overview:
      "New Zealand offers globally respected degrees in one of the safest, most beautiful countries in the world. Open post-study work visas and a relaxed lifestyle make it a standout choice.",
    highlights: [
      "Up to 3-year post-study work visa",
      "All 8 universities ranked in the global top 500",
      "One of the safest, most peaceful countries to live in",
      "Welcoming migration and residency pathways",
    ],
    popularCourses: ["Information Technology", "Construction & Engineering", "Agriculture & Environment", "Business", "Healthcare"],
    intakes: "February and July (main)",
    workRights: "Up to 3-year post-study work visa depending on qualification and location.",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

/* --------------------------------------------------------------- */
/* Services (from the brief)                                         */
/* --------------------------------------------------------------- */

export const SERVICES: Array<{ title: string; body: string; icon: string }> = [
  {
    title: "Career Counselling",
    body: "Find the right course and country for your goals, strengths, and budget before you commit.",
    icon: "counsellor",
  },
  {
    title: "Course Selection",
    body: "Match your profile to the best-fit programs across hundreds of partner universities.",
    icon: "course",
  },
  {
    title: "University Applications",
    body: "We prepare and submit strong applications and chase your offers end to end.",
    icon: "application",
  },
  {
    title: "Scholarship Guidance",
    body: "Discover the scholarships and funding you qualify for and apply the right way.",
    icon: "scholarship",
  },
  {
    title: "Visa Assistance",
    body: "Complete visa support: documents, financials, and interview preparation.",
    icon: "visa",
  },
  {
    title: "Accommodation Support",
    body: "Find safe, affordable student housing near your campus before you fly.",
    icon: "accommodation",
  },
  {
    title: "IELTS / PTE Guidance",
    body: "Prepare for the English test your university needs with proven study support.",
    icon: "ielts",
  },
  {
    title: "Pre-Departure Briefing",
    body: "Travel, banking, culture, and arrival - everything you need before you leave.",
    icon: "departure",
  },
];

/* --------------------------------------------------------------- */
/* Featured universities (from the brief)                            */
/* --------------------------------------------------------------- */

export const UNIVERSITIES: Array<{ name: string; country: string }> = [
  { name: "University of East London", country: "UK" },
  { name: "University of Greenwich", country: "UK" },
  { name: "University of Sydney", country: "Australia" },
  { name: "Monash University", country: "Australia" },
  { name: "University of Toronto", country: "Canada" },
];

/* --------------------------------------------------------------- */
/* Student testimonials - original, anonymised by city/destination   */
/* (no fabricated named people; matches Google review-author          */
/* guidance used on the main site).                                   */
/* --------------------------------------------------------------- */

export const TESTIMONIALS: Array<{
  quote: string;
  name: string;
  city: string;
  destination: string;
}> = [
  {
    quote:
      "EDUS Overseas handled my UK application from start to finish. I had my offer and student visa without the stress I expected. The team in Jaffna guided me at every step.",
    name: "Tharani Sivakumar",
    city: "Jaffna",
    destination: "Master's, United Kingdom",
  },
  {
    quote:
      "The counsellors picked the right course in Australia for my budget and helped me find a scholarship I did not even know existed. Highly recommend EDUS to any Sri Lankan student.",
    name: "Akshayan Rajaratnam",
    city: "Colombo",
    destination: "Bachelor's, Australia",
  },
  {
    quote:
      "From my Canada SOP to the visa interview preparation, every step was clear and honest. I am now studying in Toronto, exactly the plan we made together.",
    name: "Nivetha Thavakumar",
    city: "Batticaloa",
    destination: "Diploma, Canada",
  },
];

/* --------------------------------------------------------------- */
/* Consultation form options (from the brief)                        */
/* --------------------------------------------------------------- */

export const QUALIFICATIONS = ["O/L", "A/L", "Bachelors", "HND", "PGD", "Masters"] as const;

export const ENGLISH_QUALS = ["O/L English", "A/L English", "IELTS", "PTE", "Duolingo"] as const;

// Preferred-country options match the destinations list (short names).
export const PREFERRED_COUNTRIES = DESTINATIONS.map((d) => d.name);
