/**
 * Success stories data - server-safe.
 *
 * Pure data module (no React, no `"use client"`) so both the client-side
 * `Success` carousel and the server-side `HomeJsonLd` schema emitter can
 * import the same source of truth.
 *
 * Labels use first-name + last-initial style. Add `Review` / `Person`
 * JSON-LD only once each entry is a real consented testimonial.
 */

export type Story = {
  market: "SL" | "IN" | "MV" | "GL";
  flag: string;
  country: string;
  label: string;
  quote: string;
  initials: string;
  tint: string;
};

export const STORIES: Story[] = [
  // Sri Lanka - mix of Sinhala, Tamil, and Muslim naming conventions
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Kavindi E. - Grade 11 - Kandy",
    quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime.",
    initials: "KE", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Pasindu V. - O/L Student - Colombo",
    quote: "The Cambridge classes are great. The best part is the online forums and the community.",
    initials: "PV", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Thanusha K. - Parent of Grade 8 - Kalmunai",
    quote: "EDUS is perfect for working parents. The online platform lets my daughter learn anytime.",
    initials: "TK", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Ashan C. - A/L Student - Galle",
    quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs.",
    initials: "AC", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Nimesha P. - Grade 10 - Jaffna",
    quote: "My Combined Maths tutor explains every step. I went from struggling to confident in one term.",
    initials: "NP", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Fathima R. - Parent of O/L - Batticaloa",
    quote: "The recordings let my son revise at his pace. Weekly tutor messages keep us in the loop.",
    initials: "FR", tint: "#2563EB",
  },

  // India - Tamil Nadu CBSE focus
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Ramesh M. - Parent of CBSE 10 - Coimbatore",
    quote: "Monthly parent updates kept us aligned. The tutor knew exactly where my child needed support.",
    initials: "RM", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Sanjay R. - CBSE Class 8 - Chennai",
    quote: "Maths became easier when I started learning with clear explanations and regular practice.",
    initials: "SR", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Priya B. - Parent of CBSE 7 - Madurai",
    quote: "The class structure, reminders, and progress updates helped us understand how our child was improving.",
    initials: "PB", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Karthik V. - CBSE Class 9 - Trichy",
    quote: "Science is no longer scary. The tutor draws diagrams live and answers my doubts right away.",
    initials: "KV", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Lakshmi N. - Parent of CBSE 6 - Salem",
    quote: "English speaking confidence has gone up so much. The small group keeps my daughter engaged.",
    initials: "LN", tint: "#8B5CF6",
  },

  // Maldives - IGCSE / O-Level
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Ahmed H. - Year 11 - Malé",
    quote: "Live online classes meant I didn't lose study time travelling between islands. The recordings helped a lot too.",
    initials: "AH", tint: "#22C55E",
  },
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Fathimath N. - Parent - Addu City",
    quote: "Cambridge tutors who understand the Maldivian school calendar made all the difference for my son.",
    initials: "FN", tint: "#22C55E",
  },
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Ibrahim S. - IGCSE Student - Hulhumalé",
    quote: "One-to-one Physics sessions cleared every doubt I had before mocks. My grade jumped two bands.",
    initials: "IS", tint: "#22C55E",
  },
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Aishath L. - Parent of Year 10 - Kulhudhuffushi",
    quote: "Living on an outer island used to mean no good tutors. EDUS changed that completely for us.",
    initials: "AL", tint: "#22C55E",
  },

  // Global - one-to-one international
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "Adaeze N. - One-to-One Student - Lagos",
    quote: "I had a tutor matched to my time zone quickly. The flexibility was the whole reason it worked.",
    initials: "AN", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "Sofia R. - A-Level Student - Madrid",
    quote: "One to one means the tutor adapts to me, not a class of 30 working at someone else's pace.",
    initials: "SR", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "Priya F. - Parent - Dubai",
    quote: "EDUS gave us a better way to manage online learning with proper class timing, support, and updates.",
    initials: "PF", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "James O. - IB Student - Toronto",
    quote: "My EDUS tutor helped me build a study plan that actually worked alongside my IB workload.",
    initials: "JO", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "Mei L. - Parent - Singapore",
    quote: "Personal attention, structured pacing, weekly feedback - exactly what my daughter needed.",
    initials: "ML", tint: "#06B6D4",
  },
];
