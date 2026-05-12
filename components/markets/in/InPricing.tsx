import Link from "next/link";
import { PRICING, PRICING_INCLUDES } from "./InShared";

export function InPricing() {
  return (
    <section id="pricing" className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Fees & Payment Plan</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Premium learning. <em>Reasonable fees.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Transparent, affordable pricing for every CBSE family - premium-quality education that
            stays accessible.
          </p>
        </div>

        {/* Unified pricing panel */}
        <div className="mt-12 relative glass-strong rounded-[28px] overflow-hidden max-w-6xl mx-auto">
          <span aria-hidden className="blob" style={{ top: -80, right: -60, width: 320, height: 320, background: "#2563EB", opacity: 0.18 }} />
          <span aria-hidden className="blob" style={{ bottom: -80, left: -60, width: 320, height: 320, background: "#8B5CF6", opacity: 0.18 }} />

          <div className="relative p-6 md:p-10">
            {/* 3 pricing tiers */}
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(16,32,51,0.08)]">
              {PRICING.map((p) => (
                <div
                  key={p.tag}
                  className={`relative p-5 lg:px-7 ${p.featured ? "lg:bg-linear-to-b lg:from-[#8B5CF6]/8 lg:to-transparent rounded-2xl lg:rounded-none" : ""}`}
                >
                  {p.featured && (
                    <span
                      className="absolute -top-2 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-display font-700 text-[10px] tracking-[0.12em] uppercase shadow-[0_6px_14px_-6px_rgba(139,92,246,0.5)]"
                      style={{ background: "linear-gradient(90deg, #2563EB 0%, #6E5BC8 100%)" }}
                    >
                      ★ Best Value - Save ₹500
                    </span>
                  )}
                  <p
                    className="font-display font-700 text-[11px] tracking-[0.16em] uppercase"
                    style={{ color: p.tint }}
                  >
                    {p.tag}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <p className="font-display font-700 text-[34px] leading-none text-[#102033]">
                      {p.price}
                    </p>
                    <span className="text-[12px] text-[#5A6A82]">{p.unit}</span>
                  </div>
                  <p className="text-[12.5px] text-[#2B3950] mt-3 leading-[1.6]">{p.note}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-[rgba(16,32,51,0.10)]" />

            {/* Included */}
            <div>
              <p className="font-display font-700 text-[11px] tracking-[0.16em] uppercase text-[#2563EB]">
                Included in every plan
              </p>
              <p className="heading mt-2" style={{ fontSize: "18px" }}>
                Every enrolment includes the same premium standards.
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[13.5px]">
                {PRICING_INCLUDES.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-[#2B3950]">
                    <span className="inline-flex w-5 h-5 mt-0.5 rounded-full bg-[#2563EB]/15 items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3.5" aria-hidden>
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="leading-[1.55]">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="mt-8 pt-6 border-t border-[rgba(16,32,51,0.10)] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[13.5px] text-[#102033] font-display font-600">
                  Ready to start with a premium CBSE tutor?
                </p>
                <p className="text-[12px] text-[#5A6A82] mt-1">
                  Referral discount - ₹500 off when an existing student refers a new family.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://signup.edustutor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Enrol Now
                </a>
                <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
