"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { COUNTRIES } from "./ContactShared";

/**
 * Country contact cards. Visual language matches the /global page card
 * pattern: white card, top accent bar, soft border + soft shadow,
 * Framer Motion fadeUp on enter, tinted icon tile, structured contact rows.
 */

const REGION_LABEL: Record<string, string> = {
  sl: "Sri Lanka",
  in: "India",
  mv: "Maldives",
  gl: "Worldwide",
};

export function ContactCountries() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Country Contacts</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Contact EDUS by{" "}
              <em>country.</em>
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
              Each market has its own contact route, support hours, and team. Pick the office
              closest to your child&apos;s learning needs.
            </p>
          </div>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 gap-4"
        >
          {COUNTRIES.map((c) => (
            <m.article
              key={c.code}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: c.tint }}
              />

              {/* Header — icon tile + name + region kicker */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl shrink-0"
                  style={{ background: `${c.tint}15`, border: `1px solid ${c.tint}25` }}
                  aria-hidden
                >
                  {c.flag}
                </span>
                <div className="min-w-0">
                  <p
                    className="font-display font-800 text-[11px] tracking-[0.16em] uppercase"
                    style={{ color: c.tint }}
                  >
                    EDUS · {REGION_LABEL[c.code]}
                  </p>
                  <h3 className="mt-0.5 font-display font-700 text-[18px] text-[#102033] leading-tight">
                    {c.name}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-[13.5px] text-[#5A6A82] leading-[1.65]">{c.region}</p>

              {/* Contact rows */}
              <div className="mt-5 space-y-3">
                {c.phone && c.phoneHref && (
                  <ContactRow
                    label="Phone"
                    value={c.phone}
                    href={c.phoneHref}
                    tint={c.tint}
                    icon={<IconPhone />}
                  />
                )}
                <ContactRow
                  label="Email"
                  value={c.email}
                  href={`mailto:${c.email}`}
                  tint={c.tint}
                  icon={<IconMail />}
                />
                {c.address && c.mapUrl && (
                  <ContactRow
                    label="Address"
                    value={c.address}
                    href={c.mapUrl}
                    external
                    tint={c.tint}
                    icon={<IconPin />}
                  />
                )}
                {c.hours && (
                  <ContactRow
                    label="Office Hours"
                    value={c.hours}
                    tint={c.tint}
                    icon={<IconClock />}
                  />
                )}
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Row primitive                                                      */
/* ---------------------------------------------------------------- */

function ContactRow({
  label, value, href, external, tint, icon,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  tint: string;
  icon: React.ReactNode;
}) {
  const body = (
    <div className="flex items-start gap-3">
      <span
        className="inline-flex w-8 h-8 rounded-lg items-center justify-center shrink-0 mt-0.5"
        style={{ background: `${tint}12`, color: tint }}
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
          {label}
        </p>
        <p className="text-[13.5px] text-[#102033] font-display font-600 mt-0.5 leading-[1.45] break-words">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return body;

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:translate-x-0.5 transition"
    >
      {body}
    </a>
  ) : (
    <a href={href} className="block hover:translate-x-0.5 transition">
      {body}
    </a>
  );
}

/* ---------------------------------------------------------------- */
/* Inline icons — small, consistent stroke                            */
/* ---------------------------------------------------------------- */

function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
