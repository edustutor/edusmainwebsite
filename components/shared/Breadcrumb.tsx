import Link from "next/link";

/**
 * Reusable visible breadcrumb nav rendered above the page hero on the
 * deep pages (markets, blog, gallery, about, press, teach, blog posts,
 * gallery albums). Mirrors the BreadcrumbList JSON-LD already emitted
 * via the schema layer - having both visible and JSON-LD increases the
 * odds that Google renders the breadcrumb cell in SERP listings.
 *
 * Variants:
 *   - "standalone" (default) - reserves its own top padding to clear
 *     the fixed header. Use when the next section's pt-* is reset to
 *     a small value (e.g. pt-4) - pages like /about, /press, /blog
 *     where we control the next section directly.
 *   - "overlay" - uses absolute positioning so it sits INSIDE the
 *     hero's existing pt-32 padding instead of stacking on top of it.
 *     Use for pages whose Hero is an imported component we don't want
 *     to modify - /sl, /in, /mv, /global, /teach.
 */
export type Crumb = {
  /** Display label, e.g. "Sri Lanka". */
  label: string;
  /** Internal href starting with /. Last crumb's href is ignored. */
  href?: string;
};

export function Breadcrumb({
  items,
  variant = "standalone",
}: {
  items: Crumb[];
  variant?: "standalone" | "overlay";
}) {
  if (items.length === 0) return null;
  const navClassName =
    variant === "overlay"
      ? // Absolutely positions the breadcrumb inside the hero's pt-32
        // space. The parent must use `relative` (every market hero
        // already has `relative pt-32 sm:pt-36 ...`).
        "absolute top-0 inset-x-0 z-20 container-edge pt-24 sm:pt-28 pointer-events-none"
      : "container-edge pt-28 sm:pt-32 pb-2";

  return (
    <nav aria-label="Breadcrumb" className={navClassName}>
      <ol
        className={`flex items-center gap-2 text-[12.5px] text-[#5A6A82] font-display flex-wrap ${
          variant === "overlay" ? "pointer-events-auto" : ""
        }`}
      >
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          if (isLast) {
            return (
              <li
                key={c.label}
                className="text-[#102033] font-600 truncate max-w-[70vw] sm:max-w-none"
                aria-current="page"
              >
                {c.label}
              </li>
            );
          }
          return (
            <span key={c.label} className="contents">
              <li>
                <Link
                  href={c.href ?? "/"}
                  className="hover:text-[#2563EB] transition-colors"
                >
                  {c.label}
                </Link>
              </li>
              <li aria-hidden className="text-[#B8C2D1]">
                /
              </li>
            </span>
          );
        })}
      </ol>
    </nav>
  );
}
