import { TESTIMONIALS } from "./SlShared";

export function SlTestimonials() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-6%", width: 380, height: 380, background: "#FACC15", opacity: 0.18 }} />
      </div>
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Sri Lankan Families</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            From Jaffna to Anywhere. <em>Real stories.</em>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <article key={t.name} className="glass rounded-[24px] p-6 lift">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🇱🇰</span>
                <span className="text-[#FACC15] text-lg leading-none">★★★★★</span>
              </div>
              <p className="text-[#102033] text-[15px] mt-5 leading-[1.65]">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                <span
                  className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-[family-name:var(--font-display)] font-600 text-[13px]"
                  style={{ background: i % 3 === 0 ? "#2563EB" : i % 3 === 1 ? "#8B5CF6" : "#06B6D4" }}
                >
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-[14px] font-[family-name:var(--font-display)] font-600 text-[#102033]">{t.name}</p>
                  <p className="text-[12px] text-[#5A6A82]">{t.role} · {t.loc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
