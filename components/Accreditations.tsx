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
    <section className="relative py-20 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="kicker">
              <span className="kicker-num">§ 09</span>
              Accreditations / Partners & recognition
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-display)" }}>
              Recognised. <em className="accent">Verified.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pb-3">
            <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
              EDUS is recognised by Sri Lanka's leading technology, innovation, and ICT bodies.
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {PARTNERS.map((p, i) => (
            <li
              key={p}
              className={`px-4 py-10 flex items-center justify-center text-[#0E1421] font-display text-[20px] tracking-[-0.02em]
                border-b border-[rgba(14,20,33,0.10)]
                ${i !== 0 ? "border-l border-[rgba(14,20,33,0.10)]" : ""}
                lg:border-b-0
              `}
            >
              {p}
            </li>
          ))}
        </ul>
        <div className="rule-strong" />
      </div>
    </section>
  );
}
