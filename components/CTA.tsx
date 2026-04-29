import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)] glass-ink">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#D9A441]">
              <span className="font-display italic text-[#D9A441]">§ 10 ·</span> Begin
            </p>
            <h2 className="masthead text-[#F4F2ED] mt-7" style={{ fontSize: "var(--fs-mast)", lineHeight: 0.92 }}>
              A clearer path<br />
              <em className="text-[#D9A441]">to better grades.</em>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="text-[#F4F2ED]/70 text-[15.5px] leading-[1.65]">
              Pick your door, see the offer that's actually for you, and join with a guided five-step
              flow. Live online tuition that works.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-gold">Sign Up</Link>
              <Link href="/enrol" className="btn btn-ghost border-white/20 text-[#F4F2ED] hover:border-[#D9A441]">
                Enrol
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/15">
          {[
            { k: "Sri Lanka", v: "Group · 1:1 · National + Cambridge", href: "/sl" },
            { k: "India · Chennai", v: "Premium tuition · Grades 6–10", href: "/in" },
            { k: "Global · 1:1", v: "Cambridge · Edexcel · IB", href: "/global" },
            { k: "Resource Vault", v: "Past papers & study notes", href: "/resources" },
          ].map((c) => (
            <Link
              key={c.k}
              href={c.href}
              className="bg-[#0E1421] hover:bg-[#141B2C] p-7 transition group"
            >
              <p className="font-display text-[22px] text-[#F4F2ED]">{c.k}</p>
              <p className="text-[12px] font-mono text-[#F4F2ED]/55 mt-2 uppercase tracking-wider">
                {c.v}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[#D9A441]">
                Open <span className="font-display italic text-lg leading-none">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
