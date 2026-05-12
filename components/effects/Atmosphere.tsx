"use client";
import { useEffect, useState } from "react";
import { m } from "@/components/effects/Motion";

/**
 * Animated background atmosphere - heavily blurred 3D blue spheres
 * drifting slowly across the viewport.
 *
 * Mobile-optimised:
 * - Detects viewport width once and serves a lighter sphere config to
 *   phones (smaller, fewer, less blur, no mix-blend) - `filter: blur()`
 *   on huge layers is the single biggest paint cost on mobile.
 * - Pure transform/opacity. GPU-only, no layout thrash.
 * - Honours prefers-reduced-motion via global MotionConfig.
 */

type Sphere = {
  size: number;
  colorLight: string;
  colorDeep: string;
  opacity: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  driftX: [number, number, number, number];
  driftY: [number, number, number, number];
  scale: [number, number, number, number];
  duration: number;
  delay: number;
  blur: number;
};

const DESKTOP_SPHERES: Sphere[] = [
  {
    size: 620,
    colorLight: "#BFD7FF",
    colorDeep: "#2563EB",
    opacity: 0.32,
    top: "-10%",
    right: "-10%",
    driftX: [0, -40, 30, 0],
    driftY: [0, 50, -30, 0],
    scale: [1, 1.05, 0.95, 1],
    duration: 36,
    delay: 0,
    blur: 110,
  },
  {
    size: 540,
    colorLight: "#C7DCFF",
    colorDeep: "#1D4ED8",
    opacity: 0.28,
    bottom: "-12%",
    left: "-8%",
    driftX: [0, 40, -25, 0],
    driftY: [0, -35, 45, 0],
    scale: [1, 1.04, 0.96, 1],
    duration: 40,
    delay: 4,
    blur: 120,
  },
  {
    size: 420,
    colorLight: "#D6CCFF",
    colorDeep: "#8B5CF6",
    opacity: 0.22,
    top: "45%",
    left: "55%",
    driftX: [0, -35, 35, 0],
    driftY: [0, 35, -35, 0],
    scale: [1, 1.05, 0.95, 1],
    duration: 44,
    delay: 8,
    blur: 130,
  },
  {
    size: 360,
    colorLight: "#FFF1B8",
    colorDeep: "#EAB308",
    opacity: 0.14,
    top: "20%",
    left: "10%",
    driftX: [0, 25, -25, 0],
    driftY: [0, -25, 25, 0],
    scale: [1, 1.04, 0.96, 1],
    duration: 38,
    delay: 12,
    blur: 110,
  },
];

/** Mobile build - fewer spheres, smaller, much less blur. */
const MOBILE_SPHERES: Sphere[] = [
  {
    size: 360,
    colorLight: "#BFD7FF",
    colorDeep: "#2563EB",
    opacity: 0.30,
    top: "-8%",
    right: "-8%",
    driftX: [0, -20, 15, 0],
    driftY: [0, 25, -15, 0],
    scale: [1, 1.03, 0.97, 1],
    duration: 36,
    delay: 0,
    blur: 50,
  },
  {
    size: 320,
    colorLight: "#C7DCFF",
    colorDeep: "#1D4ED8",
    opacity: 0.26,
    bottom: "-8%",
    left: "-6%",
    driftX: [0, 20, -15, 0],
    driftY: [0, -20, 25, 0],
    scale: [1, 1.03, 0.97, 1],
    duration: 40,
    delay: 4,
    blur: 50,
  },
  {
    size: 240,
    colorLight: "#D6CCFF",
    colorDeep: "#8B5CF6",
    opacity: 0.18,
    top: "45%",
    left: "55%",
    driftX: [0, -15, 15, 0],
    driftY: [0, 15, -15, 0],
    scale: [1, 1.03, 0.97, 1],
    duration: 44,
    delay: 8,
    blur: 50,
  },
];

function Sphere({ s, isMobile }: { s: Sphere; isMobile: boolean }) {
  return (
    <m.div
      className="absolute rounded-full"
      style={{
        width: s.size,
        height: s.size,
        top: s.top,
        bottom: s.bottom,
        left: s.left,
        right: s.right,
        opacity: s.opacity,
        filter: `blur(${s.blur}px)`,
        background: `
          radial-gradient(circle at 30% 25%,
            #FFFFFFB3 0%,
            ${s.colorLight} 20%,
            ${s.colorDeep} 65%,
            ${s.colorDeep}00 80%
          )
        `,
        // mix-blend-mode is expensive on mobile; skip it there.
        mixBlendMode: isMobile ? "normal" : "multiply",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      animate={{
        x: s.driftX,
        y: s.driftY,
        scale: s.scale,
      }}
      transition={{
        duration: s.duration,
        delay: s.delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.33, 0.66, 1],
      }}
    />
  );
}

export function Atmosphere() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spheres = isMobile ? MOBILE_SPHERES : DESKTOP_SPHERES;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(1400px 1000px at 50% -20%, #F0F6FF 0%, transparent 60%), #F8FBFF",
      }}
    >
      {spheres.map((s, i) => (
        <Sphere key={i} s={s} isMobile={isMobile} />
      ))}

      {/* Faint film grain - desktop only (mobile skips this layer). */}
      {!isMobile && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            opacity: 0.02,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </div>
  );
}
