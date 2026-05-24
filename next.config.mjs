import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Next 16's Turbopack doesn't pick up a parent lockfile
  turbopack: {
    root: __dirname,
  },
  // Higher-quality next/image output: try AVIF first (best compression),
  // fall back to WebP for browsers without AVIF.
  images: {
    // EMERGENCY OVERRIDE (locked 2026-05-24): the Vercel free-tier image
    // optimisation quota (1000 transformations / month) was exhausted, so
    // every /_next/image request was returning HTTP 402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED and the entire site
    // rendered with blank image placeholders. Setting unoptimized=true
    // makes next/image emit a plain <img> pointing straight at /public,
    // bypassing the metered optimiser entirely.
    //
    // Trade-offs we accept:
    //   - No automatic AVIF/WebP fallback chain - but ~95% of our images
    //     in /public are already hand-encoded WebPs.
    //   - No automatic responsive srcset - acceptable because most images
    //     are either small icons or fixed-aspect hero shots already sized
    //     reasonably (largest is 191 KB).
    //   - quality= prop becomes a no-op - fine because the source files
    //     are already at the quality we want.
    //
    // Remove this line + redeploy AFTER upgrading the Vercel plan to Pro
    // (5000 transformations / month included) or when the monthly quota
    // resets on the 1st of next month - whichever comes first.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every `quality={...}` value used in <Image /> to be
    // explicitly listed here. 75 is the framework default; 85 is used for
    // mid-density illustrations (e.g. LearningExperience hero); 95 is used
    // for the centerpiece photo + guaranteed-success stamp where crispness
    // matters most.
    qualities: [75, 85, 95],
    // Allow our high-quality device sizes - defaults stop at 3840 which
    // is fine, but we narrow the upstream variants Next generates so
    // smaller tiles get sharper assets when scaled by `sizes`.
    deviceSizes: [640, 750, 828, 1080, 1200, 1500, 1800, 2200, 2800, 3840],
    imageSizes: [16, 32, 64, 96, 128, 192, 256, 384, 512, 640, 768],
    // Allow-list for next/image proxy + optimization. Each host serving
    // user-facing images needs an entry here or next/image will refuse
    // to render it.
    remotePatterns: [
      {
        // Gallery photos uploaded to Cloudinary.
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        // Google reviewer avatars - returned by the Places API on
        // /sl. Google serves these from lh3, lh4, lh5, lh6 depending
        // on shard, so we wildcard the leading char.
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
