"use client";
import { useScroll, useSpring } from "framer-motion";
import { m } from "@/components/effects/Motion";

/**
 * Top scroll progress bar.
 * Uses scaleX on a fixed bar - GPU-only, zero layout cost.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-60 h-[3px] origin-left bg-linear-to-r from-[#2563EB] via-[#8B5CF6] to-[#06B6D4]"
    />
  );
}
