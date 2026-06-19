"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up number for the EDUS Overseas stats band. Animates from 0 to
 * `value` when it first scrolls into view (IntersectionObserver), once.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function StatCounter({
  value,
  suffix,
  durationMs = 1400,
}: {
  value: number;
  suffix: string;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / durationMs, 1);
            // easeOutCubic for a natural settle.
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tnum">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
