import Link from "next/link";
import { PRICING, GROUP_HIGHLIGHTS } from "./SlShared";

export function SlGroupClasses() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ bottom: "5%", left: "-10%", width: 460, height: 460, background: "#22C55E", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow"><span className="dot" />Group Classes</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Affordable Group Classes. <em>Powerful Learning. Proven Progress.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Join happy learning here at EDUS with expert-led live group classes, fixed evening
            timetables, individual attention, regular term exams, and continuous academic support
            designed to help every student learn confidently and perform better.
          </p>
        </div>

        {/* Unified group classes panel */}
        <div className="mt-12 relative glass-strong rounded-[28px] p-6 md:p-10 overflow-hidden max-w-6xl mx-auto">
          <span aria-hidden className="blob" style={{ top: -80, right: -60, width: 320, height: 320, background: "#2563EB", opacity: 0.18 }} />
          <span aria-hidden className="blob" style={{ bottom: -80, left: -60, width: 320, height: 320, background: "#8B5CF6", opacity: 0.18 }} />

          <div className="relative">
            {/* 3 pricing tier rows */}
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(16,32,51,0.08)]">
              {PRICING.map((p) => (
                <div key={p.tag} className="p-5 lg:px-7 lg:py-2 first:pt-2 lg:first:pl-0 last:pb-2 lg:last:pr-0">
                  <p
                    className="font-display font-700 text-[11px] tracking-[0.16em] uppercase"
                    style={{ color: p.tint }}
                  >
                    {p.tag}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <p className="font-display font-700 text-[24px] leading-tight text-[#102033]">
                      {p.price}
                    </p>
                    <span className="text-[11.5px] text-[#5A6A82]">{p.unit}</span>
                  </div>
                  <p className="text-[12.5px] font-display font-600 text-[#102033] mt-1.5">
                    {p.grades}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[12.5px]">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[#2B3950]">
                        <span
                          className="inline-flex w-4 h-4 mt-0.5 rounded-full items-center justify-center shrink-0"
                          style={{ background: `${p.tint}1A` }}
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={p.tint} strokeWidth="3.5" aria-hidden>
                            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="leading-[1.55]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-[rgba(16,32,51,0.10)]" />

            {/* 4 highlights row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
              {GROUP_HIGHLIGHTS.map((h, i) => (
                <div key={h.title}>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex w-10 h-10 rounded-2xl items-center justify-center text-xl shrink-0"
                      style={{ background: `${h.tint}15`, border: `1px solid ${h.tint}25` }}
                    >
                      {h.icon}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-display font-700 text-[11px] tracking-[0.16em] uppercase"
                        style={{ color: h.tint }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] text-[#5A6A82]">·</span>
                      <h3 className="heading text-[13.5px] leading-tight">{h.title}</h3>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[12px]">
                    {h.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[#2B3950]">
                        <span
                          className="inline-flex w-3.5 h-3.5 mt-[3px] rounded-full items-center justify-center shrink-0"
                          style={{ background: `${h.tint}1A` }}
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={h.tint} strokeWidth="3.5" aria-hidden>
                            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="leading-normal">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-8 pt-6 border-t border-[rgba(16,32,51,0.10)] flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-[#2B3950]">
                Ready to start? Choose your subjects and enrol in minutes.
              </p>
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
