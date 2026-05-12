import Link from "next/link";

export function InHero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#FACC15", opacity: 0.30 }} />
        <div className="blob" style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#8B5CF6", opacity: 0.30 }} />
        <div className="blob" style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#2563EB", opacity: 0.22 }} />
      </div>

      <div className="container-edge">
        <div className="flex justify-center" data-anim>
          <Link href="/#regions" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All markets
            <span className="text-[#5A6A82]">·</span>
            <span className="text-[#8B5CF6]">🇮🇳 India · Tamil Nadu · CBSE</span>
          </Link>
        </div>

        <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
          <p className="eyebrow">🇮🇳 Premium CBSE Online Tuition · Classes 6–10</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Structured tuition. <em>Disciplined monitoring. Real progress.</em>
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Premium CBSE-aligned, quality-assured live online classes from expert tutors for Tamil Nadu families, delivering measurable progress in
            <br />
            Classes 6–10 Maths, Science &amp; English.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
            <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Learning with EDUS</a>
            <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto" data-anim="4">
          {[
            { k: "CBSE",         v: "Syllabus aligned" },
            { k: "Class 6 – 10", v: "Coverage" },
            { k: "3",            v: "Core subjects" },
            { k: "Monthly",      v: "Parent updates" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-5 py-4 text-center">
              <p className="font-[family-name:var(--font-display)] font-700 text-[22px] tnum text-[#102033]">{s.k}</p>
              <p className="text-[11.5px] text-[#5A6A82] mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
