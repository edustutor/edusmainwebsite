"use client";
import { useEffect, useState } from "react";

/**
 * Tiny mobile-detection hook for animation gating.
 * Matches the same breakpoint Tailwind uses for `md:` (768px).
 * SSR-safe: defaults to `false` until hydration.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
