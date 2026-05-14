"use client";

/**
 * Footer-style button that re-opens the ConsentBanner preferences modal.
 *
 * Dispatches a window event `edus:consent-open` which ConsentBanner
 * listens for. Kept in its own client component so the surrounding
 * SiteFooter can stay a Server Component.
 */
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("edus:consent-open"))}
      className="text-[#5A6A82] hover:text-[#2563EB] transition-colors underline-offset-2 hover:underline"
    >
      Cookie Preferences
    </button>
  );
}
