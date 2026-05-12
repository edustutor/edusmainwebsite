"use client";
/**
 * Re-export motion + reduced-motion safe primitives.
 *
 * Why centralise: every animated component imports from here, so we have
 * one place that respects prefers-reduced-motion (handled globally by
 * Framer's MotionConfig).
 */
import { LazyMotion, domAnimation, m, MotionConfig } from "framer-motion";

export { m, AnimatePresence } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
