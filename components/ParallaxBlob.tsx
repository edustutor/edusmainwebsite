"use client";
import { useRef, type CSSProperties } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";

type Props = {
  /** Px or % offset from container edges */
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  size: number;
  color: string;
  opacity?: number;
  /** Vertical drift in px across the section (0 → end) */
  drift?: number;
  /** Subtle scale change as section enters/exits */
  scaleRange?: [number, number];
  className?: string;
};

/**
 * Scroll-linked floating blob.
 * Listens to its parent section's scroll progress and translates Y + scales
 * via transform - GPU-only, no reflow. Respects prefers-reduced-motion via
 * MotionConfig.
 */
export function ParallaxBlob({
  top, bottom, left, right,
  size, color, opacity = 0.3,
  drift = 60, scaleRange = [0.95, 1.08],
}: Props) {
  // Each blob tracks the nearest section's scroll progress.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-drift / 2, drift / 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]]);

  const style: CSSProperties = {
    width: size,
    height: size,
    background: color,
    opacity,
    top, bottom, left, right,
  };

  return (
    <m.div ref={ref} aria-hidden className="blob" style={{ ...style, y, scale }} />
  );
}
