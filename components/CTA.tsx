import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container-edge">
        <div className="relative rounded-[36px] glass-strong p-10 md:p-16 overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="glow" style={{ top: -150, right: -150, width: 480, height: 480, background: "#FFE08A", opacity: 0.55 }} />
            <div className="glow" style={{ bottom: -200, left: -100, width: 520, height: 520, background: "#9CC0FF", opacity: 0.6 }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow"><span className="dot" />Step 02 · Begin</p>
              <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
                A clearer path to better grades. <em>Open today.</em>
              </h2>
              <p className="text-[#2B3458] max-w-xl mt-5 text-[17px]">
                Pick your door, see the offer that's actually for you, and join with a guided five-step flow.
                No fragmented forms. No mismatched proof claims. Just one well-built education platform.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/signup" className="btn btn-primary">Sign Up</Link>
                <Link href="/#choose-region" className="btn btn-ghost">Choose region</Link>
                <Link href="/contact" className="btn btn-ghost">Book a consultation</Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "Sri Lanka", v: "Group · 1:1", href: "/sl" },
                  { k: "India · 6–10", v: "CBSE / NCERT", href: "/in" },
                  { k: "Global · 1:1", v: "30+ countries", href: "/global" },
                  { k: "Resource Vault", v: "Past papers", href: "/resources" },
                ].map((c) => (
                  <Link
                    key={c.k}
                    href={c.href}
                    className="rounded-2xl bg-white border border-[rgba(10,18,48,0.06)] p-5 hover:border-[rgba(10,18,48,0.18)]"
                  >
                    <p className="font-display text-xl text-[#0A1230]">{c.k}</p>
                    <p className="text-xs font-mono text-[#5C6485] mt-1 uppercase tracking-wider">{c.v}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#0A55F5]">
                      Open
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
