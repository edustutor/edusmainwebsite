import { COUNTRIES } from "./ContactShared";

export function ContactCountries() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
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

        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          {COUNTRIES.map((c) => (
            <article
              key={c.code}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: c.tint }}
              />

              {/* Head */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl shrink-0"
                  style={{ background: c.tintSoft, border: `1px solid ${c.tint}20` }}
                >
                  {c.flag}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-700 text-[17px] text-[#102033] leading-tight">
                    {c.name}
                  </h3>
                  <p
                    className="text-[10.5px] uppercase tracking-widest font-display font-700 mt-0.5"
                    style={{ color: c.tint }}
                  >
                    EDUS · {c.code === "gl" ? "Worldwide" : c.code === "sl" ? "Sri Lanka" : c.code === "in" ? "India" : "Maldives"}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[13.5px] text-[#2B3950] leading-[1.6]">{c.region}</p>

              {/* Contact details */}
              <dl className="mt-5 space-y-2.5 text-[13px]">
                {c.phone && c.phoneHref && (
                  <ContactRow
                    label="Phone / WhatsApp"
                    value={c.phone}
                    href={c.phoneHref}
                    tint={c.tint}
                    icon="📞"
                  />
                )}
                <ContactRow
                  label="Email"
                  value={c.email}
                  href={`mailto:${c.email}`}
                  tint={c.tint}
                  icon="✉️"
                />
                {c.address && c.mapUrl && (
                  <ContactRow
                    label="Address"
                    value={c.address}
                    href={c.mapUrl}
                    external
                    tint={c.tint}
                    icon="📍"
                  />
                )}
                {c.hours && (
                  <ContactRow
                    label="Office Hours"
                    value={c.hours}
                    tint={c.tint}
                    icon="🕒"
                  />
                )}
              </dl>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label, value, href, external, tint, icon,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  tint: string;
  icon: string;
}) {
  const content = (
    <div className="flex items-start gap-2.5">
      <span className="text-[14px] shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
          {label}
        </p>
        <p className="text-[#102033] font-display font-600 mt-0.5 leading-[1.45]">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:translate-x-0.5 transition"
      style={{ color: tint }}
    >
      {content}
    </a>
  ) : (
    <a href={href} className="block hover:translate-x-0.5 transition" style={{ color: tint }}>
      {content}
    </a>
  );
}
