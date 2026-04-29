"use client";
import { m } from "@/components/Motion";

/**
 * Animated background atmosphere — heavily blurred 3D blue spheres
 * drifting slowly across the viewport. Inspired by glassmorphism
 * reference compositions: large dimensional orbs with a directional
 * light highlight, sitting behind every glass card so the cards
 * pick up colour through their backdrop-filter.
 *
 * Pure transform + opacity animation on `position: fixed` divs:
 * GPU-only, no layout. Honours prefers-reduced-motion via the
 * global MotionConfig in <MotionProvider>.
 */

type Sphere = {
  /** Diameter in px. */
  size: number;
  /** Two-stop colour for the radial gradient. Top-left highlight to deep core. */
  colorLight: string;
  colorDeep: string;
  opacity: number;
  /** Initial position. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Drift envelope (px). 4 keyframes loop. */
  driftX: [number, number, number, number];
  driftY: [number, number, number, number];
  scale: [number, number, number, number];
  duration: number;
  delay: number;
  /** Blur amount. Bigger spheres get more. */
  blur: number;
};

const SPHERES: Sphere[] = [
  // Huge primary blue — top-right (the dominant orb in the ref)
  {
    size: 760,
    colorLight: "#A8C9FF",
    colorDeep: "#1E40AF",
    opacity: 0.55,
    top: "-12%",
    right: "-12%",
    driftX: [0, -50, 30, 0],
    driftY: [0, 60, -30, 0],
    scale: [1, 1.06, 0.94, 1],
    duration: 34,
    delay: 0,
    blur: 90,
  },
  // Large mid-blue — bottom-left
  {
    size: 620,
    colorLight: "#BFD7FF",
    colorDeep: "#2563EB",
    opacity: 0.50,
    bottom: "-15%",
    left: "-10%",
    driftX: [0, 50, -30, 0],
    driftY: [0, -40, 50, 0],
    scale: [1, 1.05, 0.95, 1],
    duration: 38,
    delay: 3,
    blur: 100,
  },
  // Small accent — top-left
  {
    size: 220,
    colorLight: "#DCEAFF",
    colorDeep: "#3B82F6",
    opacity: 0.65,
    top: "8%",
    left: "6%",
    driftX: [0, 30, -20, 0],
    driftY: [0, -30, 40, 0],
    scale: [1, 1.10, 0.92, 1],
    duration: 22,
    delay: 1,
    blur: 50,
  },
  // Floating mid-frame — center-right
  {
    size: 280,
    colorLight: "#C7DCFF",
    colorDeep: "#1D4ED8",
    opacity: 0.55,
    top: "42%",
    right: "26%",
    driftX: [0, -25, 25, 0],
    driftY: [0, 30, -30, 0],
    scale: [1, 0.93, 1.08, 1],
    duration: 26,
    delay: 4,
    blur: 60,
  },
  // Soft violet drift — middle
  {
    size: 480,
    colorLight: "#D6CCFF",
    colorDeep: "#7C3AED",
    opacity: 0.30,
    top: "55%",
    left: "30%",
    driftX: [0, 40, -50, 0],
    driftY: [0, -50, 30, 0],
    scale: [1, 1.06, 0.94, 1],
    duration: 32,
    delay: 2,
    blur: 110,
  },
  // Cyan tint — far right
  {
    size: 360,
    colorLight: "#BFEFFB",
    colorDeep: "#0891B2",
    opacity: 0.32,
    bottom: "10%",
    right: "8%",
    driftX: [0, -30, 40, 0],
    driftY: [0, 40, -30, 0],
    scale: [1, 1.05, 0.95, 1],
    duration: 28,
    delay: 5,
    blur: 80,
  },
  // Warm yellow accent — far left bottom (very subtle, breaks the all-blue mass)
  {
    size: 320,
    colorLight: "#FFF1B8",
    colorDeep: "#EAB308",
    opacity: 0.22,
    bottom: "20%",
    left: "20%",
    driftX: [0, 30, -30, 0],
    driftY: [0, -30, 30, 0],
    scale: [1, 1.04, 0.94, 1],
    duration: 30,
    delay: 6,
    blur: 90,
  },
];

/**
 * Sphere — radial gradient with a directional highlight at 30% 25%
 * (top-left), fading through a vivid mid-tone to a deep core. Strong
 * blur on top so it reads as a glassy 3D blob, not a flat circle.
 */
function Sphere({ s }: { s: Sphere }) {
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
            #FFFFFFCC 0%,
            ${s.colorLight} 18%,
            ${s.colorDeep} 60%,
            ${s.colorDeep}00 78%
          )
        `,
        mixBlendMode: "multiply",
        willChange: "transform",
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
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(1400px 1000px at 50% -10%, #EEF6FF 0%, transparent 60%), #F4F8FF",
      }}
    >
      {SPHERES.map((s, i) => (
        <Sphere key={i} s={s} />
      ))}

      {/* Faint film grain — kills banding without weight */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          opacity: 0.025,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
