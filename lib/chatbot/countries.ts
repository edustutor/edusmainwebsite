/**
 * ISO countries dataset for the EDUS chatbot intake form.
 *
 * Purpose:
 *   - Power the searchable country dropdown in IntakeForm.
 *   - Carry the dialling code so the phone field can normalise input
 *     into the digits-only "country code + national number" shape the
 *     EDUS CRM stores (e.g. "94771178292", "971501234567").
 *
 * Ordering rule (locked with Tisankan):
 *   - PRIMARY block (always at the top, in this exact order):
 *       Sri Lanka, India, Maldives, United Kingdom, United States,
 *       Germany, Qatar, United Arab Emirates.
 *     These are the markets EDUS sells into today.
 *   - SECONDARY block: every other ISO country in alphabetical order.
 *
 * Why this lives in chatbot/ and not a global util:
 *   - The data is only consumed by the chatbot intake form right now.
 *     If a future feature (contact form / signup) needs the same list,
 *     promote it to lib/countries.ts at that point.
 *
 * Data shape:
 *   - code: ISO 3166-1 alpha-2, useful as React key and for flag emoji.
 *   - name: English label shown to the parent.
 *   - dial: E.164 country code WITHOUT the leading "+". So Sri Lanka is
 *           "94" (NOT "+94"). The intake form normalisation prepends
 *           this to the national number to form the final CRM value.
 *
 * Flag emoji rule: derived inside the component via codePointAt on the
 * 2-letter code (0x1F1E6 base + offset). Keeping the derivation in the
 * UI keeps THIS file pure data.
 */

export type Country = {
  /** ISO 3166-1 alpha-2 country code (uppercase). */
  code: string;
  /** Human-readable English country name. */
  name: string;
  /**
   * E.164 dialling code with NO leading "+". The intake form prepends
   * this to the digits-only national number when building the final
   * CRM phonenumber payload.
   */
  dial: string;
};

/**
 * Primary markets - kept in business-priority order at the top of the
 * dropdown. Tisankan's locked order:
 *   1. Sri Lanka    (94)
 *   2. India        (91)
 *   3. Maldives     (960)
 *   4. UK           (44)
 *   5. US           (1)
 *   6. Germany      (49)
 *   7. Qatar        (974)
 *   8. UAE / Dubai  (971)
 */
export const PRIMARY_COUNTRY_CODES = [
  "LK",
  "IN",
  "MV",
  "GB",
  "US",
  "DE",
  "QA",
  "AE",
] as const;

/**
 * Full ISO list. Sourced from the ITU-T E.164 numbering plan + ISO 3166.
 * Ordered alphabetically by name; the IntakeForm reorders the
 * primary block to the top at render time.
 *
 * Special cases handled inline:
 *   - "Hong Kong" / "Macao" use their own +852 / +853 dial codes (not +86).
 *   - "Taiwan" stays at +886.
 *   - "Kosovo" uses +383 (the ITU assignment since 2017).
 *   - Multi-code microstates (e.g. Vatican / Guernsey / Jersey) folded
 *     under their effective dialling code.
 */
export const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", dial: "93" },
  { code: "AL", name: "Albania", dial: "355" },
  { code: "DZ", name: "Algeria", dial: "213" },
  { code: "AS", name: "American Samoa", dial: "1684" },
  { code: "AD", name: "Andorra", dial: "376" },
  { code: "AO", name: "Angola", dial: "244" },
  { code: "AI", name: "Anguilla", dial: "1264" },
  { code: "AG", name: "Antigua and Barbuda", dial: "1268" },
  { code: "AR", name: "Argentina", dial: "54" },
  { code: "AM", name: "Armenia", dial: "374" },
  { code: "AW", name: "Aruba", dial: "297" },
  { code: "AU", name: "Australia", dial: "61" },
  { code: "AT", name: "Austria", dial: "43" },
  { code: "AZ", name: "Azerbaijan", dial: "994" },
  { code: "BS", name: "Bahamas", dial: "1242" },
  { code: "BH", name: "Bahrain", dial: "973" },
  { code: "BD", name: "Bangladesh", dial: "880" },
  { code: "BB", name: "Barbados", dial: "1246" },
  { code: "BY", name: "Belarus", dial: "375" },
  { code: "BE", name: "Belgium", dial: "32" },
  { code: "BZ", name: "Belize", dial: "501" },
  { code: "BJ", name: "Benin", dial: "229" },
  { code: "BM", name: "Bermuda", dial: "1441" },
  { code: "BT", name: "Bhutan", dial: "975" },
  { code: "BO", name: "Bolivia", dial: "591" },
  { code: "BA", name: "Bosnia and Herzegovina", dial: "387" },
  { code: "BW", name: "Botswana", dial: "267" },
  { code: "BR", name: "Brazil", dial: "55" },
  { code: "IO", name: "British Indian Ocean Territory", dial: "246" },
  { code: "VG", name: "British Virgin Islands", dial: "1284" },
  { code: "BN", name: "Brunei", dial: "673" },
  { code: "BG", name: "Bulgaria", dial: "359" },
  { code: "BF", name: "Burkina Faso", dial: "226" },
  { code: "BI", name: "Burundi", dial: "257" },
  { code: "KH", name: "Cambodia", dial: "855" },
  { code: "CM", name: "Cameroon", dial: "237" },
  { code: "CA", name: "Canada", dial: "1" },
  { code: "CV", name: "Cape Verde", dial: "238" },
  { code: "KY", name: "Cayman Islands", dial: "1345" },
  { code: "CF", name: "Central African Republic", dial: "236" },
  { code: "TD", name: "Chad", dial: "235" },
  { code: "CL", name: "Chile", dial: "56" },
  { code: "CN", name: "China", dial: "86" },
  { code: "CO", name: "Colombia", dial: "57" },
  { code: "KM", name: "Comoros", dial: "269" },
  { code: "CG", name: "Congo (Brazzaville)", dial: "242" },
  { code: "CD", name: "Congo (Kinshasa)", dial: "243" },
  { code: "CK", name: "Cook Islands", dial: "682" },
  { code: "CR", name: "Costa Rica", dial: "506" },
  { code: "CI", name: "Côte d'Ivoire", dial: "225" },
  { code: "HR", name: "Croatia", dial: "385" },
  { code: "CU", name: "Cuba", dial: "53" },
  { code: "CW", name: "Curaçao", dial: "599" },
  { code: "CY", name: "Cyprus", dial: "357" },
  { code: "CZ", name: "Czech Republic", dial: "420" },
  { code: "DK", name: "Denmark", dial: "45" },
  { code: "DJ", name: "Djibouti", dial: "253" },
  { code: "DM", name: "Dominica", dial: "1767" },
  { code: "DO", name: "Dominican Republic", dial: "1809" },
  { code: "EC", name: "Ecuador", dial: "593" },
  { code: "EG", name: "Egypt", dial: "20" },
  { code: "SV", name: "El Salvador", dial: "503" },
  { code: "GQ", name: "Equatorial Guinea", dial: "240" },
  { code: "ER", name: "Eritrea", dial: "291" },
  { code: "EE", name: "Estonia", dial: "372" },
  { code: "SZ", name: "Eswatini", dial: "268" },
  { code: "ET", name: "Ethiopia", dial: "251" },
  { code: "FK", name: "Falkland Islands", dial: "500" },
  { code: "FO", name: "Faroe Islands", dial: "298" },
  { code: "FJ", name: "Fiji", dial: "679" },
  { code: "FI", name: "Finland", dial: "358" },
  { code: "FR", name: "France", dial: "33" },
  { code: "GF", name: "French Guiana", dial: "594" },
  { code: "PF", name: "French Polynesia", dial: "689" },
  { code: "GA", name: "Gabon", dial: "241" },
  { code: "GM", name: "Gambia", dial: "220" },
  { code: "GE", name: "Georgia", dial: "995" },
  { code: "DE", name: "Germany", dial: "49" },
  { code: "GH", name: "Ghana", dial: "233" },
  { code: "GI", name: "Gibraltar", dial: "350" },
  { code: "GR", name: "Greece", dial: "30" },
  { code: "GL", name: "Greenland", dial: "299" },
  { code: "GD", name: "Grenada", dial: "1473" },
  { code: "GP", name: "Guadeloupe", dial: "590" },
  { code: "GU", name: "Guam", dial: "1671" },
  { code: "GT", name: "Guatemala", dial: "502" },
  { code: "GG", name: "Guernsey", dial: "44" },
  { code: "GN", name: "Guinea", dial: "224" },
  { code: "GW", name: "Guinea-Bissau", dial: "245" },
  { code: "GY", name: "Guyana", dial: "592" },
  { code: "HT", name: "Haiti", dial: "509" },
  { code: "HN", name: "Honduras", dial: "504" },
  { code: "HK", name: "Hong Kong", dial: "852" },
  { code: "HU", name: "Hungary", dial: "36" },
  { code: "IS", name: "Iceland", dial: "354" },
  { code: "IN", name: "India", dial: "91" },
  { code: "ID", name: "Indonesia", dial: "62" },
  { code: "IR", name: "Iran", dial: "98" },
  { code: "IQ", name: "Iraq", dial: "964" },
  { code: "IE", name: "Ireland", dial: "353" },
  { code: "IM", name: "Isle of Man", dial: "44" },
  { code: "IL", name: "Israel", dial: "972" },
  { code: "IT", name: "Italy", dial: "39" },
  { code: "JM", name: "Jamaica", dial: "1876" },
  { code: "JP", name: "Japan", dial: "81" },
  { code: "JE", name: "Jersey", dial: "44" },
  { code: "JO", name: "Jordan", dial: "962" },
  { code: "KZ", name: "Kazakhstan", dial: "7" },
  { code: "KE", name: "Kenya", dial: "254" },
  { code: "KI", name: "Kiribati", dial: "686" },
  { code: "XK", name: "Kosovo", dial: "383" },
  { code: "KW", name: "Kuwait", dial: "965" },
  { code: "KG", name: "Kyrgyzstan", dial: "996" },
  { code: "LA", name: "Laos", dial: "856" },
  { code: "LV", name: "Latvia", dial: "371" },
  { code: "LB", name: "Lebanon", dial: "961" },
  { code: "LS", name: "Lesotho", dial: "266" },
  { code: "LR", name: "Liberia", dial: "231" },
  { code: "LY", name: "Libya", dial: "218" },
  { code: "LI", name: "Liechtenstein", dial: "423" },
  { code: "LT", name: "Lithuania", dial: "370" },
  { code: "LU", name: "Luxembourg", dial: "352" },
  { code: "MO", name: "Macao", dial: "853" },
  { code: "MG", name: "Madagascar", dial: "261" },
  { code: "MW", name: "Malawi", dial: "265" },
  { code: "MY", name: "Malaysia", dial: "60" },
  { code: "MV", name: "Maldives", dial: "960" },
  { code: "ML", name: "Mali", dial: "223" },
  { code: "MT", name: "Malta", dial: "356" },
  { code: "MH", name: "Marshall Islands", dial: "692" },
  { code: "MQ", name: "Martinique", dial: "596" },
  { code: "MR", name: "Mauritania", dial: "222" },
  { code: "MU", name: "Mauritius", dial: "230" },
  { code: "YT", name: "Mayotte", dial: "262" },
  { code: "MX", name: "Mexico", dial: "52" },
  { code: "FM", name: "Micronesia", dial: "691" },
  { code: "MD", name: "Moldova", dial: "373" },
  { code: "MC", name: "Monaco", dial: "377" },
  { code: "MN", name: "Mongolia", dial: "976" },
  { code: "ME", name: "Montenegro", dial: "382" },
  { code: "MS", name: "Montserrat", dial: "1664" },
  { code: "MA", name: "Morocco", dial: "212" },
  { code: "MZ", name: "Mozambique", dial: "258" },
  { code: "MM", name: "Myanmar", dial: "95" },
  { code: "NA", name: "Namibia", dial: "264" },
  { code: "NR", name: "Nauru", dial: "674" },
  { code: "NP", name: "Nepal", dial: "977" },
  { code: "NL", name: "Netherlands", dial: "31" },
  { code: "NC", name: "New Caledonia", dial: "687" },
  { code: "NZ", name: "New Zealand", dial: "64" },
  { code: "NI", name: "Nicaragua", dial: "505" },
  { code: "NE", name: "Niger", dial: "227" },
  { code: "NG", name: "Nigeria", dial: "234" },
  { code: "NU", name: "Niue", dial: "683" },
  { code: "KP", name: "North Korea", dial: "850" },
  { code: "MK", name: "North Macedonia", dial: "389" },
  { code: "MP", name: "Northern Mariana Islands", dial: "1670" },
  { code: "NO", name: "Norway", dial: "47" },
  { code: "OM", name: "Oman", dial: "968" },
  { code: "PK", name: "Pakistan", dial: "92" },
  { code: "PW", name: "Palau", dial: "680" },
  { code: "PS", name: "Palestine", dial: "970" },
  { code: "PA", name: "Panama", dial: "507" },
  { code: "PG", name: "Papua New Guinea", dial: "675" },
  { code: "PY", name: "Paraguay", dial: "595" },
  { code: "PE", name: "Peru", dial: "51" },
  { code: "PH", name: "Philippines", dial: "63" },
  { code: "PL", name: "Poland", dial: "48" },
  { code: "PT", name: "Portugal", dial: "351" },
  { code: "PR", name: "Puerto Rico", dial: "1787" },
  { code: "QA", name: "Qatar", dial: "974" },
  { code: "RE", name: "Réunion", dial: "262" },
  { code: "RO", name: "Romania", dial: "40" },
  { code: "RU", name: "Russia", dial: "7" },
  { code: "RW", name: "Rwanda", dial: "250" },
  { code: "BL", name: "Saint Barthélemy", dial: "590" },
  { code: "SH", name: "Saint Helena", dial: "290" },
  { code: "KN", name: "Saint Kitts and Nevis", dial: "1869" },
  { code: "LC", name: "Saint Lucia", dial: "1758" },
  { code: "MF", name: "Saint Martin", dial: "590" },
  { code: "PM", name: "Saint Pierre and Miquelon", dial: "508" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dial: "1784" },
  { code: "WS", name: "Samoa", dial: "685" },
  { code: "SM", name: "San Marino", dial: "378" },
  { code: "ST", name: "São Tomé and Príncipe", dial: "239" },
  { code: "SA", name: "Saudi Arabia", dial: "966" },
  { code: "SN", name: "Senegal", dial: "221" },
  { code: "RS", name: "Serbia", dial: "381" },
  { code: "SC", name: "Seychelles", dial: "248" },
  { code: "SL", name: "Sierra Leone", dial: "232" },
  { code: "SG", name: "Singapore", dial: "65" },
  { code: "SX", name: "Sint Maarten", dial: "1721" },
  { code: "SK", name: "Slovakia", dial: "421" },
  { code: "SI", name: "Slovenia", dial: "386" },
  { code: "SB", name: "Solomon Islands", dial: "677" },
  { code: "SO", name: "Somalia", dial: "252" },
  { code: "ZA", name: "South Africa", dial: "27" },
  { code: "KR", name: "South Korea", dial: "82" },
  { code: "SS", name: "South Sudan", dial: "211" },
  { code: "ES", name: "Spain", dial: "34" },
  { code: "LK", name: "Sri Lanka", dial: "94" },
  { code: "SD", name: "Sudan", dial: "249" },
  { code: "SR", name: "Suriname", dial: "597" },
  { code: "SE", name: "Sweden", dial: "46" },
  { code: "CH", name: "Switzerland", dial: "41" },
  { code: "SY", name: "Syria", dial: "963" },
  { code: "TW", name: "Taiwan", dial: "886" },
  { code: "TJ", name: "Tajikistan", dial: "992" },
  { code: "TZ", name: "Tanzania", dial: "255" },
  { code: "TH", name: "Thailand", dial: "66" },
  { code: "TL", name: "Timor-Leste", dial: "670" },
  { code: "TG", name: "Togo", dial: "228" },
  { code: "TK", name: "Tokelau", dial: "690" },
  { code: "TO", name: "Tonga", dial: "676" },
  { code: "TT", name: "Trinidad and Tobago", dial: "1868" },
  { code: "TN", name: "Tunisia", dial: "216" },
  { code: "TR", name: "Turkey", dial: "90" },
  { code: "TM", name: "Turkmenistan", dial: "993" },
  { code: "TC", name: "Turks and Caicos Islands", dial: "1649" },
  { code: "TV", name: "Tuvalu", dial: "688" },
  { code: "UG", name: "Uganda", dial: "256" },
  { code: "UA", name: "Ukraine", dial: "380" },
  { code: "AE", name: "United Arab Emirates", dial: "971" },
  { code: "GB", name: "United Kingdom", dial: "44" },
  { code: "US", name: "United States", dial: "1" },
  { code: "UY", name: "Uruguay", dial: "598" },
  { code: "UZ", name: "Uzbekistan", dial: "998" },
  { code: "VU", name: "Vanuatu", dial: "678" },
  { code: "VA", name: "Vatican City", dial: "379" },
  { code: "VE", name: "Venezuela", dial: "58" },
  { code: "VN", name: "Vietnam", dial: "84" },
  { code: "WF", name: "Wallis and Futuna", dial: "681" },
  { code: "YE", name: "Yemen", dial: "967" },
  { code: "ZM", name: "Zambia", dial: "260" },
  { code: "ZW", name: "Zimbabwe", dial: "263" },
];

/**
 * Map from ISO code to country for O(1) lookup. Used by the IntakeForm
 * after the user picks a code in the searchable dropdown.
 */
const BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c] as const));

/** Look up a country by ISO 3166-1 alpha-2 code. Returns null on miss. */
export function findCountry(code: string): Country | null {
  return BY_CODE.get(code) ?? null;
}

/**
 * Ordered list ready for rendering in the dropdown.
 * Primary markets come first (in their locked business order), then the
 * remainder of the world alphabetically.
 */
export function orderedCountries(): Country[] {
  const primary: Country[] = [];
  const seen = new Set<string>();
  for (const code of PRIMARY_COUNTRY_CODES) {
    const c = BY_CODE.get(code);
    if (c) {
      primary.push(c);
      seen.add(c.code);
    }
  }
  const rest = COUNTRIES.filter((c) => !seen.has(c.code)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return [...primary, ...rest];
}

/**
 * Convert a 2-letter country code to the corresponding emoji flag.
 * Returns "" on invalid input. Used in the dropdown row + the trigger
 * button so the parent can scan the list visually.
 *
 * Implementation: each Regional Indicator Symbol Letter A-Z is at
 * Unicode U+1F1E6 + (letter - 'A'). Two of those combined render as
 * the country flag on every modern OS (iOS / Android / macOS) and on
 * Linux/Win where the noto-color-emoji font is installed.
 */
export function flagEmoji(isoCode: string): string {
  const code = isoCode.toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    base + code.charCodeAt(0) - 65,
    base + code.charCodeAt(1) - 65,
  );
}

/**
 * Normalise a raw user phone entry per the EDUS rule.
 *
 * Locked rules (Tisankan, 2026-01-16):
 *   - Digits only (0-9). Strip + / spaces / hyphens / parens / letters.
 *   - One number only. If the user types two, we keep the first run.
 *   - Must end up starting with the country code (no leading 0).
 *
 * Inputs we handle for a SL example (country dial code 94):
 *   "0707072525"          -> "94707072525"
 *   "707072525"           -> "94707072525"
 *   "94707072525"         -> "94707072525"  (already normalised)
 *   "+94 707 072 525"     -> "94707072525"
 *   "+94 (077) 117-8292"  -> "94771178292"
 *
 * Returns the digits-only E.164-without-plus form. Returns "" if the
 * input collapses to nothing (caller treats "" as invalid).
 */
export function normalisePhone(raw: string, dial: string): string {
  // 1. Strip everything that isn't a digit.
  let digits = (raw ?? "").replace(/\D+/g, "");
  if (!digits) return "";

  // 2. Strip leading zeros from the national part (matches "0707..." case).
  //    BUT only when the digits don't already start with the country code.
  if (!digits.startsWith(dial)) {
    digits = digits.replace(/^0+/, "");
  }

  // 3. Prepend the country code if it's not already there.
  if (!digits.startsWith(dial)) {
    digits = dial + digits;
  }

  return digits;
}

/**
 * Validate a NORMALISED phone string for storage. Used by both the
 * IntakeForm submit gate and the /api/lead server-side defence.
 *
 * Rules:
 *   - Digits only.
 *   - No leading zero (the normaliser strips them; defence-in-depth here).
 *   - Total length 7-15 (ITU-T E.164 numbering plan).
 */
export function isValidNormalisedPhone(phone: string): boolean {
  return /^[1-9]\d{6,14}$/.test(phone);
}
