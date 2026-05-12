import { WHY_CONTACT } from "./ContactShared";

export function ContactWhy() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow"><span className="dot" />Why Contact</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Why families contact{" "}
            <em>EDUS.</em>
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CONTACT.map((w) => (
            <article
              key={w.title}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <span
                className="inline-flex w-11 h-11 rounded-xl items-center justify-center text-xl"
                style={{ background: `${w.tint}15`, border: `1px solid ${w.tint}25` }}
              >
                {w.icon}
              </span>
              <h3 className="mt-4 font-display font-700 text-[14.5px] text-[#102033] leading-tight">
                {w.title}
              </h3>
              <p className="text-[12.5px] text-[#5A6A82] mt-2 leading-[1.6]">{w.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
