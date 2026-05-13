export function ContactMap() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow"><span className="dot" />Find Us</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Visit or reach our country{" "}
            <em>offices.</em>
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
            Our Sri Lanka head office is in Jaffna, with online support routes for India,
            Maldives, and global students.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {/* Sri Lanka map (live embed) */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-white border border-[rgba(16,32,51,0.08)] shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]">
            <div className="relative w-full aspect-16/10">
              <iframe
                title="EDUS Sri Lanka head office - Kokkuvil Junction, Jaffna"
                src="https://www.google.com/maps?q=EDUS+Online+Tuition,+No+95+K.K.S+Road,+Kokkuvil+Junction,+Jaffna&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="font-display font-700 text-[14px] text-[#102033]">
                  🇱🇰 EDUS Sri Lanka Head Office
                </p>
                <p className="text-[12px] text-[#5A6A82] mt-0.5">
                  No. 95, K.K.S Road, Kokkuvil Junction, Jaffna 40000
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/EDUS+Online+Tuition/@9.6945511,80.0139866,1102m/data=!3m1!1e3!4m6!3m5!1s0x3afe5583ee8b8b25:0xa0dd266c1a635c2!8m2!3d9.6945511!4d80.0139866!16s%2Fg%2F11rxydcz_s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-display font-700 text-[#2563EB] hover:underline"
              >
                Get directions
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* India / Maldives / Global online cards */}
          <div className="space-y-4">
            <RemoteCard
              flag="🇮🇳"
              title="India - Online Support"
              body="Students and parents in Tamil Nadu and across India are served through online support, with admissions and academic help handled remotely."
              tint="#8B5CF6"
            />
            <RemoteCard
              flag="🇲🇻"
              title="Maldives - Online Support"
              body="Maldivian families across every island connect with EDUS online for one-to-one Cambridge IGCSE and O-Level tuition."
              tint="#22C55E"
            />
            <RemoteCard
              flag="🌐"
              title="Global - Online Support"
              body="Students from any other country reach EDUS through email and the online inquiry form. Our team responds within one business day with class options and tutor matching."
              tint="#06B6D4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RemoteCard({
  flag, title, body, tint,
}: {
  flag: string;
  title: string;
  body: string;
  tint: string;
}) {
  return (
    <article className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl shrink-0">{flag}</span>
        <h3 className="font-display font-700 text-[14px] text-[#102033] leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-[12.5px] text-[#5A6A82] mt-3 leading-[1.6]">{body}</p>
      <p
        className="mt-3 text-[10.5px] uppercase tracking-[0.08em] font-display font-700"
        style={{ color: tint }}
      >
        Online support only
      </p>
    </article>
  );
}
