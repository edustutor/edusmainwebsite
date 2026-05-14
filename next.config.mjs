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
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every `quality={...}` value used in <Image /> to be
    // explicitly listed here. 75 is the framework default; 95 is used for
    // the centerpiece photo + guaranteed-success stamp where crispness matters.
    qualities: [75, 95],
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
