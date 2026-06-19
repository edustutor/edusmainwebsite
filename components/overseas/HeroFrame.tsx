"use client";

import { useState } from "react";
import { OvIcon } from "@/components/overseas/OvIcon";

/**
 * Hero / destination image frame for EDUS Overseas.
 *
 * The hero and destination photos load from /public/overseas/* which the
 * client supplies later. Until an image exists (or if one fails to load),
 * a plain <img> collapses to an ugly empty box. This frame fixes that:
 *
 *   - a FIXED aspect ratio so the layout never collapses or balloons,
 *   - a styled warm-gradient placeholder (globe + label) shown when the
 *     image is missing or errors, so it always looks intentional, and
 *   - the real image fades in over the placeholder once it loads.
 *
 * Children (floating cards) render above the frame via the parent's
 * relative wrapper, so they stay anchored to the image edge either way.
 */
export function HeroFrame({
  src,
  alt,
  ratio = "4 / 3.4",
  label = "Your journey abroad starts here",
  eager = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  label?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="ov-glass-strong rounded-[32px] p-3 overflow-hidden">
      <div
        className="relative w-full rounded-[24px] overflow-hidden ov-zoom"
        style={{ aspectRatio: ratio }}
      >
        {/* Placeholder - always rendered; the image fades in on top. */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
          style={{
            background:
              "linear-gradient(135deg, #FFE3D6 0%, #FFEFD2 45%, #D8F7F1 100%)",
          }}
          aria-hidden={loaded && !failed}
        >
          <span
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FF5A5F, #F59E0B)" }}
          >
            <OvIcon name="globe" size={32} tint="#fff" />
          </span>
          <p className="font-display font-700 text-[14px] text-[var(--ov-ink-soft)] max-w-[16rem]">
            {label}
          </p>
        </div>

        {/* Real image - only mounted if it has not errored.
            Eager (above-the-fold hero) images render fully opaque right
            away so there is no flash of the placeholder; lazy ones fade
            in once decoded. Either way the placeholder sits behind as the
            fallback if the image errors. */}
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: eager || loaded ? 1 : 0 }}
          />
        )}
      </div>
    </div>
  );
}
