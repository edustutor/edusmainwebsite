"use client";
import { m } from "@/components/Motion";

type Props = {
  /** Hex color of the glow. */
  color: string;
  /** Inline-position style. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Diameter in px. */
  size?: number;
  /** Min/max opacity over the breathing cycle. */
  opacity?: [number, number];
  /** Min/max scale over the cycle. */
  scale?: [number, number];
  /** Subtle drift (px) on x and y. */
  drift?: { x: [number, number]; y: [number, number] };
  /** Loop duration in seconds. */
  duration?: number;
  delay?: number;
  blur?: number;
};

/**
 * AmbientGlow — a section-level decorative orb that gently breathes and
 * drifts. Pure transform/opacity animation. Use 1–2 per section behind
 * content; everything else is the global Atmosphere layer.
 */
export function AmbientGlow({
  color,
  top, bottom, left, right,
  size = 420,
  opacity = [0.15, 0.28],
  scale = [0.95, 1.08],
  drift = { x: [-15, 15], y: [10, -10] },
  duration = 14,
  delay = 0,
  blur = 100,
}: Props) {
  return (
    <m.div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, ${color}E6, ${color}66 50%, transparent 75%)`,
        filter: `blur(${blur}px)`,
        top, bottom, left, right,
        mixBlendMode: "multiply",
        willChange: "transform, opacity",
      }}
      animate={{
        x: [drift.x[0], drift.x[1], drift.x[0]],
        y: [drift.y[0], drift.y[1], drift.y[0]],
        scale: [scale[0], scale[1], scale[0]],
        opacity: [opacity[0], opacity[1], opacity[0]],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}
