"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IntakePayload } from "@/lib/chatbot/types";
import {
  flagEmoji,
  isValidNormalisedPhone,
  normalisePhone,
  orderedCountries,
  type Country,
} from "@/lib/chatbot/countries";

/**
 * Pre-chat intake form. Shown inside the chat panel BEFORE the
 * conversation begins. Captures the six facts the bot needs to skip
 * over the "what is your name / what grade / what medium" interrogation
 * and start with a useful recommendation:
 *
 *   1. Full name        (parent or student)
 *   2. Phone            (international format)
 *   3. Country          (Sri Lanka / India / Maldives / UK / UAE / ...)
 *   4. Syllabus         (National / Cambridge / Edexcel / CBSE / IGCSE / Other)
 *   5. Grade            (3 - A/L)
 *   6. Medium           (Tamil / English / Sinhala)
 *
 * Once submitted, the parent payload is handed to the chat panel, which
 * sends it server-side on every /api/chat request so the system prompt
 * can personalise the conversation.
 *
 * Why a form vs continued conversation?
 *   - Six form fields beats six conversational turns. Forms feel
 *     deliberate; chat-based intake feels like an interview.
 *   - Pre-collecting raw facts means the LLM never has to parse
 *     phone numbers or country names out of free-form text - eliminates
 *     a class of "I think they said +94 77 maybe" extraction failures.
 *   - The lead-capture endpoint receives a guaranteed-clean payload
 *     instead of trusting the LLM's free-form extraction.
 *
 * Accessibility:
 *   - Every input has a label, every required field has aria-required.
 *   - Submit button is disabled until validation passes (visible state).
 *   - Errors are announced via aria-describedby on the failing field.
 *
 * NO DEFAULTS POLICY:
 *   Per product decision, ZERO fields are pre-filled. Every dropdown
 *   starts on a "Select ..." placeholder; the medium row starts with
 *   nothing selected. The parent must actively choose every option.
 *   This prevents accidentally inheriting wrong defaults (e.g. a Tamil
 *   medium family clicking through with the English-medium default
 *   left selected). The "Start chat" button stays disabled until all
 *   six fields are filled.
 */

type Props = {
  onSubmit: (intake: IntakePayload) => void;
  /**
   * Why the parent panel opened.
   *   - "manual": user clicked the launcher - go straight to the form.
   *   - "auto":   the 30s auto-open timer fired - show a polite Yes/No
   *               consent question first ("Would you like to join EDUS
   *               Online classes?"). Only reveal the form on Yes.
   */
  openMode: "auto" | "manual";
  /**
   * Called when the parent declines the Yes/No prompt (or otherwise
   * wants out before submitting the form). The ChatBot uses this to
   * close the panel cleanly.
   */
  onDecline: () => void;
};

// Country list is sourced from lib/chatbot/countries.ts so the same
// data drives both the searchable picker AND the phone normaliser
// (so e.g. choosing "Sri Lanka" sets the dial prefix to "94" and
// the phone field auto-normalises any input to "947XXXXXXXX").
const SYLLABUSES = [
  "National Syllabus (Sri Lanka)",
  "Cambridge IGCSE / O-Level / A-Level",
  "Edexcel IGCSE / GCSE / A-Level",
  "CBSE (India)",
  "International Baccalaureate (IB)",
  "Other",
];

const GRADES = [
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "A/L 2026",
  "A/L 2027",
  "A/L 2028",
  "Other",
];

const MEDIUMS = ["Tamil", "English", "Sinhala"];

export function IntakeForm({ onSubmit, openMode, onDecline }: Props) {
  // All seven fields start empty - no defaults. The Start chat button
  // stays disabled until the parent has actively chosen every value.
  // Empty-string sentinel works for both inputs and selects (selects
  // render the disabled placeholder <option> when value="").
  //
  // Country state is split:
  //   - countryCode: ISO 3166-1 alpha-2 (e.g. "LK") - drives the phone
  //     dial prefix + normalisation
  //   - country:     human-readable name (e.g. "Sri Lanka") - what gets
  //     forwarded downstream so the chatbot prompt + CRM see a name
  //
  // Phone state is the RAW national-digits the parent typed. The final
  // CRM value is computed via normalisePhone() on submit, so the parent
  // can type "0707072525" / "707072525" / "+94 70 707 2525" and we
  // still end up storing "94707072525".
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [grade, setGrade] = useState("");
  const [medium, setMedium] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Ordered ISO country list (primary EDUS markets at the top, then
  // alphabetical). Memoised so re-renders don't re-sort 240+ entries.
  const allCountries = useMemo(() => orderedCountries(), []);

  // Dial code for the picked country, used both as a visual prefix
  // chip ("+94") and as the normaliser's country code.
  const dialCode = useMemo(() => {
    if (!countryCode) return "";
    return allCountries.find((c) => c.code === countryCode)?.dial ?? "";
  }, [allCountries, countryCode]);

  // Consent gate.
  //   - Auto-open: start with the gate visible so the parent sees the
  //     polite "Would you like to join EDUS Online classes?" prompt
  //     before being asked for personal details.
  //   - Manual open: the parent already clicked the launcher, so they
  //     have implicitly consented. Skip the gate.
  // Once Yes is pressed the form takes over for the rest of the session.
  const [showConsent, setShowConsent] = useState(openMode === "auto");

  // Phone normalisation happens at validation time so the live
  // disabled-button state reflects whether THE NORMALISED phone is
  // valid - matching what the server will see on submit.
  const normalisedPhone = useMemo(
    () => (dialCode ? normalisePhone(phone, dialCode) : ""),
    [phone, dialCode],
  );
  const isPhoneValid = isValidNormalisedPhone(normalisedPhone);
  const isNameValid = name.trim().length > 1;
  // canSubmit requires ALL seven fields to be valid. Server-side
  // sanitiseIntake in /api/chat enforces the same rule defensively;
  // the client check is purely so the disabled-button state is
  // visible feedback for the parent.
  const canSubmit =
    isNameValid &&
    isPhoneValid &&
    countryCode !== "" &&
    country !== "" &&
    syllabus !== "" &&
    grade !== "" &&
    medium !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      if (!isPhoneValid) {
        // Tailored message - the input field already shows the dial
        // prefix chip so "with country code" would be confusing.
        setPhoneError("Enter a valid phone number (digits only)");
      }
      return;
    }
    setPhoneError(null);
    // Submit the NORMALISED phone (e.g. "94771178292") so downstream
    // (chat prompt, CRM forward) always sees the canonical shape.
    onSubmit({
      name: name.trim(),
      phone: normalisedPhone,
      country,
      syllabus,
      grade,
      medium,
    });
  };

  // Auto-open consent gate. Shown FIRST when the panel popped up on
  // its own after the 30s timer; we want the parent to actively agree
  // before being asked for name + phone. The card matches the form
  // card's visual weight so the transition Yes -> form feels natural.
  if (showConsent) {
    return (
      // px-3 on tiny phones, px-4 from sm. Same applies to inner card
      // padding - 4 on mobile (16px) opens up to 5 on tablet+ (20px).
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 bg-[#F8FBFF]">
        <div className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 sm:p-5 shadow-[0_6px_18px_-10px_rgba(16,32,51,0.18)]">
          <p className="text-[22px]" aria-hidden>
            👋
          </p>
          <p className="font-display font-700 text-[15px] sm:text-[16px] text-[#102033] leading-snug mt-2">
            Would you like to join EDUS Online classes?
          </p>
          <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.5]">
            Tell me a little about your child and I&apos;ll match you to the
            right live online class. Takes about a minute.
          </p>

          {/* Stacked buttons at <sm (taller, easier thumb targets); side
              by side from sm+. The Yes button stays primary in both. */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setShowConsent(false)}
              className="flex-1 rounded-xl py-2.5 text-white text-[14px] font-display font-700 shadow-[0_6px_18px_-6px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45"
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
              }}
            >
              Yes, sounds good
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="rounded-xl px-4 py-2.5 text-[14px] font-display font-600 text-[#2B3950] bg-[#F4F8FF] border border-[rgba(16,32,51,0.10)] hover:border-[#2563EB]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45 transition"
            >
              Not now
            </button>
          </div>

          <p className="mt-3 text-[10.5px] text-[#5A6A82] leading-[1.5] text-center">
            You can come back anytime - I&apos;ll be right here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto px-4 py-4 bg-[#F8FBFF]"
      noValidate
    >
      <div className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_6px_18px_-10px_rgba(16,32,51,0.18)]">
        <p className="font-display font-700 text-[15px] text-[#102033] leading-snug">
          Quick start
        </p>
        <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
          Share a few details so I can match you to the right class faster.
        </p>

        <div className="mt-4 space-y-3">
          <Field id="intake-name" label="Full name">
            <input
              id="intake-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 120))}
              required
              aria-required
              placeholder="e.g. Suresh Kumar"
              className={inputClass}
            />
          </Field>

          {/* Field order is deliberate:
                1. Name
                2. Country  - picked FIRST because the Phone field below
                              is disabled until a country (and its dial
                              prefix) is chosen.
                3. Phone    - now meaningful, prefix is locked in.
                4. Grade + Syllabus  - paired on one row at sm+ to keep
                                       the form compact.
                5. Medium   - radio row at the bottom. */}
          <Field id="intake-country" label="Country">
            {/* Searchable country combobox. Renders the picked country
                AS A BUTTON; clicking opens a panel with a live-search
                input + scrollable list. Picking a row stores BOTH the
                ISO code (for the phone dial prefix) AND the display
                name (for downstream chatbot context + CRM). */}
            <CountryPicker
              id="intake-country"
              countries={allCountries}
              value={countryCode}
              onChange={(c) => {
                setCountryCode(c.code);
                setCountry(c.name);
                // Re-run validation: if the parent had typed digits
                // for the previous country, they may still be valid
                // under the new dial - just clear any visible error.
                if (phoneError) setPhoneError(null);
              }}
            />
          </Field>

          <Field
            id="intake-phone"
            label="Phone number"
            error={phoneError ?? undefined}
          >
            {/* Phone row: dial prefix chip + digits-only input.
                The chip is read-only - the actual country code comes
                from whichever country the parent picked ABOVE. Until
                a country is picked, the chip shows a muted placeholder
                so the user understands they have to choose one. */}
            <div className="flex items-stretch gap-2">
              <span
                aria-hidden
                className={[
                  "inline-flex items-center justify-center px-3 rounded-lg text-[14px] font-display font-700 border",
                  dialCode
                    ? "bg-[#F4F8FF] border-[rgba(16,32,51,0.12)] text-[#102033]"
                    : "bg-[#F4F8FF] border-[rgba(16,32,51,0.12)] text-[#5A6A82]/70",
                ].join(" ")}
              >
                {dialCode ? `+${dialCode}` : "+--"}
              </span>
              <input
                id="intake-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => {
                  // Strip every non-digit character live so the parent
                  // can NEVER end up with "+" / spaces / hyphens in the
                  // raw state. Length-capped to 20 (some long numbers
                  // like Bahamas mobile run 11+ digits after the code).
                  const digitsOnly = e.target.value.replace(/\D+/g, "").slice(0, 20);
                  setPhone(digitsOnly);
                  if (phoneError) setPhoneError(null);
                }}
                required
                aria-required
                aria-invalid={phoneError ? "true" : "false"}
                aria-describedby={phoneError ? "intake-phone-error" : undefined}
                placeholder={dialCode === "94" ? "771178292" : "Digits only"}
                disabled={!dialCode}
                className={[
                  inputClass,
                  "flex-1",
                  !dialCode ? "opacity-60 cursor-not-allowed" : "",
                ].join(" ")}
              />
            </div>
            {/* Tiny helper hint so the parent knows the format is
                handled for them - "0707072525" types in fine, we
                normalise. */}
            <p className="text-[10.5px] text-[#5A6A82] mt-1 leading-[1.4]">
              {dialCode
                ? `Enter digits only. Saved as +${dialCode}${phone ? "..." : ""}`
                : "Pick a country above to enable the phone field."}
            </p>
          </Field>

          {/* Grade + Syllabus pair. Stacked at <sm, side by side from
              sm+ to save vertical space without truncating the
              "Select grade" / "Select syllabus" placeholders. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field id="intake-grade" label="Grade">
              <select
                id="intake-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                aria-required
                className={selectClassFor(grade)}
              >
                <option value="" disabled>
                  Select grade
                </option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="intake-syllabus" label="Syllabus">
            <select
              id="intake-syllabus"
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              required
              aria-required
              className={selectClassFor(syllabus)}
            >
              <option value="" disabled>
                Select syllabus
              </option>
              {SYLLABUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            </Field>
          </div>

          <Field id="intake-medium" label="Medium">
            <div className="flex gap-2" role="radiogroup" aria-label="Medium">
              {MEDIUMS.map((m) => {
                // medium starts as "" so NO button is selected initially.
                // The parent must click one before submit becomes enabled.
                const selected = medium !== "" && medium === m;
                return (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMedium(m)}
                    className={[
                      "flex-1 px-3 py-2 rounded-lg text-[13.5px] font-display font-600 transition",
                      selected
                        ? "bg-[#2563EB] text-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)]"
                        : "bg-[#F4F8FF] text-[#2B3950] border border-[rgba(16,32,51,0.10)] hover:border-[#2563EB]/40",
                    ].join(" ")}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-5 w-full rounded-xl py-2.5 text-white text-[14px] font-display font-700 shadow-[0_6px_18px_-6px_rgba(37,99,235,0.55)] transition disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/45"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)",
          }}
        >
          Start chat
        </button>

        <p className="mt-3 text-[10.5px] text-[#5A6A82] leading-[1.5] text-center">
          By starting, you agree to share these details with the EDUS Student Consultants.
        </p>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- */
/* Internal field wrapper - keeps label + input + error in one place */
/* --------------------------------------------------------------- */
function Field({
  id,
  label,
  children,
  error,
  required = true,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  /** Show a red asterisk after the label. Defaults to true because
   *  every field on this intake form is required - if a future field
   *  becomes optional, pass required={false} to suppress the marker. */
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.1em] font-display font-700 text-[#5A6A82] mb-1"
      >
        {label}
        {required ? (
          // aria-hidden so screen readers don't say "asterisk" - the
          // accessible signal that the field is required already comes
          // from the aria-required attribute on the input/select itself.
          <span aria-hidden className="text-[#DC2626] ml-0.5">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[11px] text-[#DC2626] mt-1"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition placeholder:text-[#5A6A82]/60";

const selectBase =
  "w-full rounded-lg border border-[rgba(16,32,51,0.12)] bg-[#F4F8FF] px-3 py-2 text-[14px] focus:outline-none focus:border-[#2563EB] focus:bg-white transition";

/**
 * Apply muted placeholder colour when the select has no value chosen.
 * Browsers don't expose a CSS pseudo-class for "the disabled option is
 * showing", so we drive it from React state instead. Once the parent
 * picks a value, the text becomes the normal ink colour.
 */
function selectClassFor(value: string): string {
  return value === ""
    ? `${selectBase} text-[#5A6A82]/70`
    : `${selectBase} text-[#102033]`;
}

/* --------------------------------------------------------------- */
/* Searchable country combobox                                       */
/* --------------------------------------------------------------- */

/**
 * Country picker - click-to-open panel with a search input and a
 * scrollable list of every ISO country.
 *
 * Why custom and not a library?
 *   - One file, ~120 lines, zero deps. The intake form is shipped
 *     dynamically (ChatBotMount lazy import) so this code only loads
 *     after the launcher is clicked - it contributes nothing to LCP.
 *   - Tailwind tokens stay consistent with the rest of the chatbot UI.
 *
 * Search behaviour:
 *   - Matches the country NAME case-insensitively (e.g. "lan" -> Sri Lanka).
 *   - Matches the dial code prefix (e.g. "94" -> Sri Lanka).
 *   - Matches the ISO 2-letter code (e.g. "lk" -> Sri Lanka).
 *
 * Accessibility:
 *   - Trigger is a real <button>. Panel is rendered conditionally
 *     so it doesn't appear in the tab order until opened.
 *   - Search input gets autoFocus when the panel opens so power
 *     users can type immediately after clicking.
 *   - Each option is a <button type="button"> so Enter / Space select.
 *   - Outside-click + Escape close the panel.
 */
function CountryPicker({
  id,
  countries,
  value,
  onChange,
}: {
  id: string;
  countries: Country[];
  /** Currently selected ISO 3166-1 alpha-2 country code, or "". */
  value: string;
  onChange: (country: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const selected = useMemo(
    () => countries.find((c) => c.code === value) ?? null,
    [countries, value],
  );

  // Live-filter the country list by name / dial / ISO code. Keep the
  // primary-block ordering (countries arrive pre-sorted) so users see
  // SL / IN / etc. at the top even after filtering.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => {
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.dial.startsWith(q)) return true;
      if (c.code.toLowerCase().startsWith(q)) return true;
      return false;
    });
  }, [countries, query]);

  // Outside-click closes the panel.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (ev: MouseEvent) => {
      const root = wrapperRef.current;
      if (root && ev.target instanceof Node && !root.contains(ev.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Escape closes the panel + autoFocus the search on open.
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Triggered when the user picks a country. Reset the query so the
  // next open starts unfiltered.
  const pick = (c: Country) => {
    onChange(c);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger button - mirrors the select's visual weight. */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={[
          "w-full rounded-lg border bg-[#F4F8FF] px-3 py-2 text-[14px]",
          "border-[rgba(16,32,51,0.12)] focus:outline-none focus:border-[#2563EB] focus:bg-white",
          "transition flex items-center justify-between gap-2",
          selected ? "text-[#102033]" : "text-[#5A6A82]/70",
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-2 min-w-0">
          <span aria-hidden className="text-[16px] leading-none shrink-0">
            {selected ? flagEmoji(selected.code) : "🌐"}
          </span>
          <span className="truncate">
            {selected ? selected.name : "Select country"}
          </span>
          {selected ? (
            <span className="text-[12px] text-[#5A6A82]/80 shrink-0">
              +{selected.dial}
            </span>
          ) : null}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="shrink-0"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown panel. Positioned absolutely below the trigger.
          z-index higher than the chat panel header (z=60). */}
      {open ? (
        <div
          className="absolute left-0 right-0 mt-1 z-[70] rounded-lg border border-[rgba(16,32,51,0.12)] bg-white shadow-[0_18px_40px_-12px_rgba(16,32,51,0.3)] overflow-hidden"
          role="listbox"
          aria-label="Country list"
        >
          <div className="p-2 border-b border-[rgba(16,32,51,0.06)]">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 60))}
              placeholder="Search country or code..."
              className="w-full rounded-md border border-[rgba(16,32,51,0.12)] bg-white px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#2563EB]"
              aria-label="Search countries"
            />
          </div>
          {/* Scrollable list. max-h capped so the panel doesn't blow
              past the bottom of the chat panel on small screens. */}
          <ul className="max-h-[260px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-[12.5px] text-[#5A6A82]">
                No countries match &quot;{query}&quot;.
              </li>
            ) : (
              filtered.map((c) => {
                const isSelected = c.code === value;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => pick(c)}
                      className={[
                        "w-full text-left px-3 py-2 text-[13.5px] flex items-center gap-2 transition",
                        isSelected
                          ? "bg-[#EFF4FF] text-[#102033]"
                          : "text-[#2B3950] hover:bg-[#F4F8FF]",
                      ].join(" ")}
                    >
                      <span aria-hidden className="text-[16px] leading-none shrink-0">
                        {flagEmoji(c.code)}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-[12px] text-[#5A6A82] shrink-0">
                        +{c.dial}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
