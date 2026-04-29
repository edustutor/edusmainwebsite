const PARTNERS = [
  "Microsoft",
  "ICTA",
  "SLASSCOM",
  "HEMAS",
  "Spiralation",
  "Innovate",
  "YITHUB",
];

export function Accreditations() {
  return (
    <section className="relative py-20 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="eyebrow"><span className="dot" />Accreditations & partners</p>
            <h2 className="display mt-3" style={{ fontSize: "var(--fs-h2)" }}>
              Trusted, recognised, <em>verified.</em>
            </h2>
          </div>
          <p className="text-[#5C6485] max-w-sm text-[14.5px]">
            EDUS is recognised by Sri Lanka's leading technology, innovation, and ICT bodies.
          </p>
        </div>

        <div className="rounded-3xl border border-[rgba(10,18,48,0.06)] bg-white/60 backdrop-blur-sm overflow-hidden">
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {PARTNERS.map((p, i) => (
              <li
                key={p}
                className={`px-4 py-7 flex items-center justify-center text-[#2B3458] font-display text-[20px] tracking-tight
                  ${i % 4 !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""}
                  ${i >= 4 ? "border-t border-[rgba(10,18,48,0.06)] sm:border-t-0" : ""}
                  lg:border-t-0 lg:border-l lg:first:border-l-0
                `}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
