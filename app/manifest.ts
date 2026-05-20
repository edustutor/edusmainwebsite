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
    // Icon array for PWA installability + home-screen / launcher icons.
    //
    // Chrome's installability check requires PNG icons at EXACTLY
    // 192x192 AND 512x512 (with `purpose: "any maskable"`) before it
    // surfaces the "Install app" prompt. WebP icons satisfy iOS Safari
    // and most Android browsers but Chrome strictly requires PNG at
    // those two sizes - drop the PNGs at /public/icons/icon-192.png
    // and /public/icons/icon-512.png to unlock the install prompt.
    //
    // Order matters: browsers pick the first icon that matches their
    // requested size + purpose, so the maskable variants come first
    // (Android adaptive icons), then any-purpose, then legacy webp.
    icons: [
      // Two entries per size - one `any`, one `maskable`. The W3C
      // manifest spec accepts a space-separated `purpose` string
      // ("any maskable") but Next's TypeScript types only allow a
      // single literal per entry, so we split them. Browsers pick
      // the right entry based on context (launcher icon = maskable;
      // browser tab / share = any).
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      // Legacy webp variants for browsers that prefer webp + iOS
      // Safari's home-screen icon. Kept after the PNG entries so they
      // act as fallbacks, not the primary install icon source.
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
