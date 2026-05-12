import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EDUS Online Tuition",
    short_name: "EDUS",
    description:
      "EDUS is the quality-assured online live learning platform. Live tuition, group and one-to-one classes for school students across Sri Lanka, India, Maldives, and globally.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8FBFF",
    theme_color: "#2563EB",
    lang: "en",
    dir: "ltr",
    categories: ["education", "business", "productivity"],
    icons: [
      {
        src: "/edus-favicon.webp",
        sizes: "any",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/edus-logo-blue.webp",
        sizes: "180x56",
        type: "image/webp",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Sri Lanka Classes",
        short_name: "Sri Lanka",
        description: "Live online tuition for Sri Lankan students Grade 1 to A/L",
        url: "/sl",
      },
      {
        name: "India CBSE",
        short_name: "India CBSE",
        description: "CBSE online tuition for Classes 6 to 10 in Tamil Nadu",
        url: "/in",
      },
      {
        name: "Maldives IGCSE",
        short_name: "Maldives",
        description: "Cambridge IGCSE 1-to-1 online tuition for Grade 9 and 10",
        url: "/mv",
      },
      {
        name: "Global One-to-One",
        short_name: "Global",
        description: "Worldwide one-to-one online tutoring",
        url: "/global",
      },
    ],
  };
}
