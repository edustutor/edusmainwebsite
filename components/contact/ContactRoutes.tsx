import Link from "next/link";
import { ROUTES } from "./ContactShared";

export function ContactRoutes() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow"><span className="dot" />Quick Route</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Find the right EDUS team{" "}
            <em>faster.</em>
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
            Choose the most suitable contact path and our team will guide you clearly.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROUTES.map((r) => {
            const inner = (
              <>
                <span
                  className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl"
                  style={{ background: `${r.tint}15`, border: `1px solid ${r.tint}25` }}
                >
                  {r.icon}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-700 text-[15.5px] text-[#102033] leading-tight">
                  {r.title}
                </h3>
                <p className="text-[12.5px] text-[#5A6A82] mt-2 leading-[1.6] flex-1">{r.body}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-[family-name:var(--font-display)] font-700"
                  style={{ color: r.tint }}
                >
                  {r.buttonLabel}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className="group-hover:translate-x-0.5 transition">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </>
            );
            const className =
              "group relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)] hover:shadow-[0_18px_40px_-20px_rgba(37,99,235,0.18)] hover:-translate-y-0.5 transition flex flex-col h-full";
            return r.external ? (
              <a key={r.title} href={r.buttonHref} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            ) : (
              <Link key={r.title} href={r.buttonHref} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
