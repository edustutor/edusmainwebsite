/**
 * Self-contained JSON-LD builders for EDUS Overseas Consultancy.
 *
 * These intentionally do NOT reuse components/layout/StructuredData.tsx,
 * because that module is hardcoded to the tuition brand (edustutor.com,
 * EDUS Online Tuition). EDUS Overseas is a distinct service on edus.lk,
 * so it gets its own Organization / Service / FAQ / Breadcrumb graph
 * anchored at edus.lk/overseas#organization.
 *
 * Every fact below is sourced from the requirements doc + the confirmed
 * contact details. No fabricated claims.
 */

import { OV, DESTINATIONS, SERVICES } from "@/lib/overseas/data";

const BASE = `${OV.siteBase}${OV.basePath}`; // https://edus.lk/overseas
const ORG_ID = `${BASE}#organization`;

const SAME_AS = [
  "https://www.facebook.com/edusonline",
  "https://www.instagram.com/edus_online/",
  "https://www.tiktok.com/@edusonline",
  "https://lk.linkedin.com/company/edusonline",
];

/** JSON-LD script tag (same pattern as the tuition site). */
export function ovJsonLd(data: object) {
  return JSON.stringify(data);
}

/** The EDUS Overseas organization entity - the spine of every page graph. */
export function overseasOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "ProfessionalService"],
    "@id": ORG_ID,
    name: OV.brand,
    alternateName: "EDUS Overseas",
    slogan: OV.tagline,
    url: BASE,
    description:
      "EDUS Overseas Consultancy is a Sri Lankan overseas education consultancy offering end-to-end guidance for studying abroad: university selection, applications, scholarships, student visas, and pre-departure support for the UK, Australia, Canada, Dubai, Ireland, and New Zealand.",
    logo: `${OV.siteBase}/edus-logo-blue.webp`,
    image: `${OV.siteBase}/edus-og.jpg`,
    telephone: OV.phoneTel,
    email: OV.email,
    priceRange: "Free consultation",
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    address: {
      "@type": "PostalAddress",
      streetAddress: OV.street,
      addressLocality: OV.city,
      addressRegion: OV.region,
      postalCode: OV.postalCode,
      addressCountry: OV.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OV.geo.lat,
      longitude: OV.geo.lng,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: OV.phoneTel,
      contactType: "customer service",
      areaServed: "LK",
      availableLanguage: ["English", "Tamil", "Sinhala"],
    },
    sameAs: SAME_AS,
    parentOrganization: {
      "@type": "Organization",
      name: "EDUS Lanka (Pvt) Ltd.",
      url: OV.siteBase,
    },
  };
}

/** WebSite/WebPage wrapper for a given overseas page. */
export function overseasWebPage(opts: { name: string; description: string; path: string }) {
  const url = `${OV.siteBase}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE}#website` },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb for overseas pages (edus.lk base). */
export function overseasBreadcrumb(crumbs: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${OV.siteBase}${c.path}`,
    })),
  };
}

/** FAQPage for overseas pages. */
export function overseasFaq(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The full consultancy service offering as a Service with an itemList. */
export function overseasService() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Overseas Education Consultancy",
    serviceType: "Study abroad consultancy",
    url: BASE,
    description:
      "End-to-end overseas education guidance for Sri Lankan students: career counselling, course selection, university applications, scholarship guidance, visa assistance, accommodation support, IELTS/PTE guidance, and pre-departure briefing.",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    audience: {
      "@type": "Audience",
      audienceType: "School leavers, undergraduates, postgraduates, working professionals",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EDUS Overseas Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
  };
}

/** ItemList of study destinations - sitelinks + topical anchoring. */
export function overseasDestinationsList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular Study Destinations - EDUS Overseas",
    itemListElement: DESTINATIONS.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Study in ${d.name}`,
      url: `${OV.siteBase}${OV.basePath}/${d.slug}`,
    })),
  };
}

/** Per-destination Service node for the country landing pages. */
export function destinationService(opts: {
  name: string;
  description: string;
  path: string;
  country: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Study in ${opts.country} - EDUS Overseas`,
    serviceType: "Study abroad consultancy",
    url: `${OV.siteBase}${opts.path}`,
    description: opts.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    audience: { "@type": "Audience", audienceType: `Students aiming to study in ${opts.country}` },
  };
}

export { BASE as OVERSEAS_BASE, ORG_ID as OVERSEAS_ORG_ID };
