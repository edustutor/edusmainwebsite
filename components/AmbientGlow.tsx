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
 * AmbientGlow — small, refined section-level breathing orb.
 *
 * Defaults are deliberately tiny and slow so they read as ambient texture,
 * not animation. Tighter scale (0.97–1.04), small drift (±10–14px),
 * narrow opacity envelope (0.10–0.18), and a heavier blur so the orb is
 * a soft halo rather than a circle.
 *
 * Pure transform + opacity. GPU-only. Honours prefers-reduced-motion via
 * the global MotionConfig in <MotionProvider>.
 */
export function AmbientGlow({
  color,
  top, bottom, left, right,
  size = 280,
  opacity = [0.10, 0.18],
  scale = [0.97, 1.04],
  drift = { x: [-10, 10], y: [8, -8] },
  duration = 18,
  delay = 0,
  blur = 90,
}: Props) {
  return (
    <m.div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 32% 28%, ${color}D9, ${color}55 55%, transparent 78%)`,
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
