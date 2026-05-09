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
    // Allow our high-quality device sizes — defaults stop at 3840 which
    // is fine, but we narrow the upstream variants Next generates so
    // smaller tiles get sharper assets when scaled by `sizes`.
    deviceSizes: [640, 750, 828, 1080, 1200, 1500, 1800, 2200, 2800, 3840],
    imageSizes: [16, 32, 64, 96, 128, 192, 256, 384, 512, 640, 768],
  },
};

export default nextConfig;
