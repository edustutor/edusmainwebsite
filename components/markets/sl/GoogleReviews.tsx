import Image from "next/image";
import { getGoogleReviews } from "@/lib/googleReviews";

/**
 * Live Google reviews block for /sl. Server component - fetches the
 * top 5 most-relevant reviews from the EDUS Online Tuition listing on
 * every request (Next.js caches the underlying fetch for 24h via the
 * Data Cache, so this is one upstream Google call per server per day).
 *
 * Renders nothing if the API returns no reviews or the env vars are
 * missing. The existing curated SlTestimonials block sits underneath
 * and continues to render either way.
 *
 * SEO benefit: alongside the visible reviews, the page also emits
 * AggregateRating + Review JSON-LD in app/sl/page.tsx so Google can
 * surface the gold star rich-snippet for the /sl page in SERPs.
 */
export async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "12%", left: "-6%", width: 360, height: 360, background: "#2563EB", opacity: 0.10 }} />
        <div className="blob" style={{ bottom: "0%", right: "-6%", width: 320, height: 320, background: "#FACC15", opacity: 0.12 }} />
      </div>

      <div className="container-edge">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow inline-flex items-center gap-2">
            <GoogleGlyph />
            <span>Verified Google Reviews</span>
          </p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            <em>{data.rating.toFixed(1)}★</em> from {data.totalReviews} parents and students on Google.
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.65]">
            Live reviews pulled from{" "}
            <a
              href={data.mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline font-display font-600"
            >
              our public Google listing
            </a>
            . Updated daily.
          </p>
        </div>

        {/* Review cards */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.reviews.map((r, i) => (
            <article
              key={`${r.authorName}-${i}`}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] flex flex-col"
            >
              {/* Stars + Google badge row */}
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-display font-700 uppercase tracking-[0.08em] text-[#5A6A82]">
                  <GoogleGlyph size={12} />
                  Google
                </span>
              </div>

              {/* Body */}
              <p className="text-[#102033] text-[14px] mt-4 leading-[1.65] flex-1">
                &ldquo;{truncate(r.text, 240)}&rdquo;
              </p>

              {/* Footer - author + date */}
              <div className="mt-5 pt-4 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                {r.authorPhotoUrl ? (
                  <Image
                    src={r.authorPhotoUrl}
                    alt={`${r.authorName} on Google`}
                    width={40}
                    height={40}
                    className="rounded-full shrink-0"
                    unoptimized
                  />
                ) : (
                  <span
                    className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-display font-600 text-[13px] shrink-0"
                    style={{
                      background:
                        i % 3 === 0 ? "#2563EB" : i % 3 === 1 ? "#8B5CF6" : "#06B6D4",
                    }}
                  >
                    {initials(r.authorName)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-display font-600 text-[#102033] truncate">
                    {r.authorName}
                  </p>
                  <p className="text-[11.5px] text-[#5A6A82] flex items-center gap-1.5">
                    <span>
                      {r.publishTime ? (
                        <time dateTime={r.publishTime}>{r.relativeDate}</time>
                      ) : (
                        r.relativeDate
                      )}
                    </span>
                    {r.reviewUrl ? (
                      <>
                        <span aria-hidden>-</span>
                        <a
                          href={r.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2563EB] hover:underline"
                        >
                          View on Google
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Read all reviews CTA */}
        <div className="mt-10 text-center">
          <a
            href={data.mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-yellow inline-flex items-center gap-2"
          >
            <GoogleGlyph size={14} />
            Read all {data.totalReviews} reviews on Google
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Helpers - kept inline because they're only used by this file.    */
/* --------------------------------------------------------------- */

/** Trim review text to fit the card without breaking mid-word. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/** Build the avatar fallback initials from a display name. */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Yellow Google "G" SVG. Used in the section eyebrow + Google badge. */
function GoogleGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FBBC04"
        d="M43.6 20.5h-1.6V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#EA4335"
        d="M6.3 14.7L13 19.6C14.7 14.9 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.3 29.5 4 24 4 16.4 4 9.8 8.3 6.3 14.7z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.3 0 10.2-2 13.8-5.3l-6.4-5.4C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#4285F4"
        d="M43.6 20.5h-1.6V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.7l6.4 5.4c-.5.5 6.8-5 6.8-15.1 0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

/** 5-star row with partial fill for non-integer ratings. */
function Stars({ rating }: { rating: number }) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-0.5 text-[#FACC15] text-[16px] leading-none"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} aria-hidden>
          {i < Math.floor(rating) ? "★" : i < rating ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
