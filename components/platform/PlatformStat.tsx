"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up number for the LMS platform stat band. Animates 0 -> value
 * once when it first scrolls into view. Respects prefers-reduced-motion
 * by showing the final value immediately.
 */
export function PlatformStat({
  value,
  suffix,
  durationMs = 1200,
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      {display}
      {suffix}
    </span>
  );
}
