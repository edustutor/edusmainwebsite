"use client";
import { useEffect, useState } from "react";
import { m } from "@/components/Motion";

type Props = {
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: number;
  opacity?: [number, number];
  scale?: [number, number];
  drift?: { x: [number, number]; y: [number, number] };
  duration?: number;
  delay?: number;
  blur?: number;
};

/**
 * AmbientGlow — small, refined section-level breathing orb.
 *
 * Mobile-tuned: filter blur is the heaviest paint cost on phones, so
 * we trim it ~45% on viewports ≤768px, drop the orb size, and skip
 * `mix-blend-mode` (also expensive). Result is buttery smooth scrolling
 * on iPhone Safari and mid-range Android.
 */
export function AmbientGlow({
  color,
  top, bottom, left, right,
  size = 240,
  opacity = [0.10, 0.18],
  scale = [0.97, 1.04],
  drift = { x: [-10, 10], y: [8, -8] },
  duration = 18,
  delay = 0,
  blur = 80,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mobile-tuned values
  const finalSize = isMobile ? Math.round(size * 0.7) : size;
  const finalBlur = isMobile ? Math.min(45, Math.round(blur * 0.55)) : blur;
  const driftScale = isMobile ? 0.6 : 1;

  return (
    <m.div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        width: finalSize,
        height: finalSize,
        background: `radial-gradient(circle at 32% 28%, ${color}D9, ${color}55 55%, transparent 78%)`,
        filter: `blur(${finalBlur}px)`,
        top, bottom, left, right,
        mixBlendMode: isMobile ? "normal" : "multiply",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      animate={{
        x: [drift.x[0] * driftScale, drift.x[1] * driftScale, drift.x[0] * driftScale],
        y: [drift.y[0] * driftScale, drift.y[1] * driftScale, drift.y[0] * driftScale],
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
