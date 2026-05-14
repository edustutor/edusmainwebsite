"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  readConsent,
  writeConsent,
  applyStoredConsent,
  FULL_CONSENT,
  DEFAULT_CONSENT,
  type ConsentCategories,
} from "@/lib/consent";

/**
 * EDUS cookie consent banner. Renders a bottom-of-screen toast on
 * first visit with three actions:
 *   - Accept all       -> grants Analytics + Advertising
 *   - Reject all       -> only Necessary stays
 *   - Customise        -> opens an inline panel with per-category toggles
 *
 * The banner disappears after a decision is stored. To re-open the
 * preferences modal later, render a "Cookie Preferences" link anywhere
 * on the site that dispatches the `edus:consent-open` window event -
 * see SiteFooter for the wired-in link.
 *
 * State flow:
 *   1. On mount, read localStorage. If a fresh decision exists, push it
 *      into Consent Mode v2 (so previously-allowed trackers fire on
 *      this page load) and DON'T show the banner.
 *   2. If no decision (or it expired), show the banner with denied
 *      defaults already in effect from <ConsentDefaults> in <head>.
 *   3. On any button click, persist to localStorage + push the matching
 *      Consent Mode v2 update + hide the banner. Other components react
 *      to the `edus:consent-update` window event.
 */
export function ConsentBanner() {
  // `null` => still figuring out whether to show; "closed" => hidden;
  // "banner" => first-load toast; "modal" => customise panel open.
  const [view, setView] = useState<null | "closed" | "banner" | "modal">(null);
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT_CONSENT);

  useEffect(() => {
    // On first paint, decide whether to show the banner at all.
    const stored = readConsent();
    if (stored) {
      applyStoredConsent();
      setCategories(stored.categories);
      setView("closed");
    } else {
      setView("banner");
    }

    // Allow other parts of the site to reopen the customise modal.
    const onOpen = () => {
      const cur = readConsent();
      setCategories(cur?.categories ?? DEFAULT_CONSENT);
      setView("modal");
    };
    window.addEventListener("edus:consent-open", onOpen as EventListener);
    return () =>
      window.removeEventListener("edus:consent-open", onOpen as EventListener);
  }, []);

  if (view === null || view === "closed") return null;

  const acceptAll = () => {
    writeConsent(FULL_CONSENT);
    setCategories(FULL_CONSENT);
    setView("closed");
  };
  const rejectAll = () => {
    writeConsent(DEFAULT_CONSENT);
    setCategories(DEFAULT_CONSENT);
    setView("closed");
  };
  const saveCustom = () => {
    writeConsent(categories);
    setView("closed");
  };

  return (
    <>
      {/* Modal backdrop for the customise view */}
      {view === "modal" ? (
        <div
          aria-hidden
          className="fixed inset-0 z-[60] bg-[#102033]/40 backdrop-blur-sm"
          onClick={() => setView("banner")}
        />
      ) : null}

      <div
        role="dialog"
        aria-label="Cookie preferences"
        aria-modal={view === "modal" ? "true" : "false"}
        className={`fixed inset-x-0 bottom-0 z-[70] ${
          view === "modal" ? "px-4 pb-4 sm:px-6 sm:pb-6 max-w-2xl mx-auto" : "px-4 pb-4 sm:px-6 sm:pb-5"
        }`}
      >
        <div
          className={`mx-auto rounded-2xl border border-[rgba(16,32,51,0.10)] bg-white shadow-[0_24px_60px_-24px_rgba(16,32,51,0.30)] ${
            view === "modal" ? "max-w-2xl" : "max-w-5xl"
          }`}
        >
          {view === "banner" ? (
            <BannerView
              onAccept={acceptAll}
              onReject={rejectAll}
              onCustomise={() => setView("modal")}
            />
          ) : (
            <ModalView
              categories={categories}
              onChange={setCategories}
              onAcceptAll={acceptAll}
              onRejectAll={rejectAll}
              onSave={saveCustom}
              onClose={() => setView("banner")}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------------- */
/* Sub-views                                                         */
/* --------------------------------------------------------------- */

function BannerView({
  onAccept,
  onReject,
  onCustomise,
}: {
  onAccept: () => void;
  onReject: () => void;
  onCustomise: () => void;
}) {
  return (
    <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <div className="flex items-start gap-3 md:flex-1 min-w-0">
        <span
          aria-hidden
          className="inline-flex w-9 h-9 rounded-full items-center justify-center shrink-0"
          style={{ background: "rgba(37,99,235,0.10)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="10" r="1" fill="#2563EB" />
            <circle cx="15" cy="13" r="1.5" fill="#2563EB" />
            <circle cx="11" cy="15" r="1" fill="#2563EB" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-display font-700 text-[14px] text-[#102033] leading-tight">
            We use cookies to improve your experience.
          </p>
          <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">
            Essential cookies are always on. We use optional analytics and
            advertising cookies to understand usage and improve the site.
            See our{" "}
            <Link href="/cookies" className="text-[#2563EB] hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-2.5 md:shrink-0">
        <button type="button" onClick={onReject} className="btn btn-ghost text-[12.5px] px-4 py-2">
          Reject all
        </button>
        <button type="button" onClick={onCustomise} className="btn btn-ghost text-[12.5px] px-4 py-2">
          Customise
        </button>
        <button type="button" onClick={onAccept} className="btn btn-primary text-[12.5px] px-4 py-2">
          Accept all
        </button>
      </div>
    </div>
  );
}

function ModalView({
  categories,
  onChange,
  onAcceptAll,
  onRejectAll,
  onSave,
  onClose,
}: {
  categories: ConsentCategories;
  onChange: (next: ConsentCategories) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="p-5 md:p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow"><span className="dot" />Cookie Preferences</p>
          <h2 className="font-display font-700 text-[18px] text-[#102033] mt-2">
            Choose which cookies EDUS may set.
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preferences"
          className="text-[#5A6A82] hover:text-[#102033] transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <p className="text-[13px] text-[#5A6A82] mt-3 leading-[1.6]">
        Read the full details in our{" "}
        <Link href="/cookies" className="text-[#2563EB] hover:underline">
          Cookie Policy
        </Link>
        . You can change these choices anytime via the Cookie Preferences
        link in the footer.
      </p>

      <div className="mt-5 space-y-3">
        <CategoryRow
          title="Necessary"
          description="Required for the site to function: page navigation, account login, security. Always on."
          checked
          disabled
          onChange={() => {}}
        />
        <CategoryRow
          title="Analytics"
          description="Google Analytics 4 and Microsoft Clarity. Helps us understand which pages students and parents use, so we can improve them."
          checked={categories.analytics}
          onChange={(v) => onChange({ ...categories, analytics: v })}
        />
        <CategoryRow
          title="Advertising"
          description="Personalised advertising on platforms like Google Ads and Meta. EDUS does not currently run paid ads, but these cookies would be used if we do."
          checked={categories.advertising}
          onChange={(v) => onChange({ ...categories, advertising: v })}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5 justify-end">
        <button type="button" onClick={onRejectAll} className="btn btn-ghost text-[12.5px] px-4 py-2">
          Reject all
        </button>
        <button type="button" onClick={onAcceptAll} className="btn btn-ghost text-[12.5px] px-4 py-2">
          Accept all
        </button>
        <button type="button" onClick={onSave} className="btn btn-primary text-[12.5px] px-4 py-2">
          Save choices
        </button>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border border-[rgba(16,32,51,0.10)] p-4 transition ${
        disabled ? "bg-[#F6F8FB] cursor-not-allowed" : "bg-white cursor-pointer hover:border-[#2563EB]/30"
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={(e) => !disabled && onChange(e.target.checked)}
      />
      <span
        aria-hidden
        className={`mt-0.5 inline-flex w-9 h-5 rounded-full transition shrink-0 ${
          checked ? "bg-[#2563EB]" : "bg-[#D6DCE6]"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <span
          className={`inline-block w-4 h-4 mt-0.5 rounded-full bg-white shadow-sm transition ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-700 text-[14px] text-[#102033]">
          {title}
          {disabled ? (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-display font-700 uppercase tracking-[0.08em] bg-[rgba(34,197,94,0.12)] text-[#16a34a]">
              Always on
            </span>
          ) : null}
        </p>
        <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">{description}</p>
      </div>
    </label>
  );
}
