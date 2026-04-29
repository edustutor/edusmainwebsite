import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
      {/* Blurred floating circles */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.35 }} />
        <div className="blob" style={{ top: "10%", right: "-10%", width: 480, height: 480, background: "#8B5CF6", opacity: 0.30 }} />
        <div className="blob" style={{ top: "55%", left: "30%", width: 420, height: 420, background: "#06B6D4", opacity: 0.25 }} />
        <div className="blob" style={{ top: "20%", right: "30%", width: 280, height: 280, background: "#FACC15", opacity: 0.30 }} />
        <div className="blob" style={{ bottom: "-10%", left: "20%", width: 380, height: 380, background: "#22C55E", opacity: 0.20 }} />
      </div>

      <div className="container-edge">
        {/* Badge */}
        <div className="flex justify-center" data-anim>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            Live · Term 2 · 2026 enrolments open
            <span className="text-[#5A6A82]">·</span>
            <span className="text-[#2563EB] font-semibold">English-medium</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-8 text-center max-w-5xl mx-auto" data-anim="2">
          <h1 className="heading" style={{ fontSize: "var(--fs-hero)" }}>
            Learn the <em>right syllabus</em>,<br />
            in the <em>right format</em>,<br />
            with the <em>right support</em>.
          </h1>
        </div>

        <div className="mt-7 max-w-2xl mx-auto text-center" data-anim="3">
          <p className="text-[#2B3950] text-[17px] leading-[1.65]">
            Premium online tuition for students under 18 — taught live, in English, by qualified
            tutors. Choose your country below and start with a free consultation.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="mt-9 flex flex-wrap justify-center gap-3" data-anim="4">
          <Link href="#regions" className="btn btn-primary">
            Explore Classes
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact" className="btn btn-yellow">Book a Free Consultation</Link>
          <Link href="/enrol" className="btn btn-ghost">Start Enrolment</Link>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto" data-anim="5">
          {[
            { k: "5+", v: "Years of experience" },
            { k: "530+", v: "Live classes" },
            { k: "Grade 1 – A/L", v: "Full coverage" },
            { k: "24 / 7", v: "Student support" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-5 py-5 text-center">
              <p className="font-[family-name:var(--font-display)] font-700 text-[26px] tnum text-[#102033]">{s.k}</p>
              <p className="text-[12px] text-[#5A6A82] mt-1.5 font-medium">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Hero card preview — featured visual */}
        <div className="mt-16 max-w-5xl mx-auto" data-anim="6">
          <div className="relative glass-strong rounded-[28px] p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎓",
                  k: "Live Classes",
                  v: "Interactive lessons with qualified tutors. Recordings available 24/7.",
                  tint: "#2563EB",
                },
                {
                  icon: "👨‍👩‍👧",
                  k: "Parent Updates",
                  v: "Weekly progress reports — attendance, homework, and exam results delivered.",
                  tint: "#8B5CF6",
                },
                {
                  icon: "📚",
                  k: "Resource Vault",
                  v: "Past papers, study notes, and an AI Study Buddy for revision between classes.",
                  tint: "#06B6D4",
                },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl bg-white/80 border border-white/80 p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${c.tint}1A`, color: c.tint }}
                  >
                    {c.icon}
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-display)] font-600 text-[17px] text-[#102033]">{c.k}</p>
                  <p className="text-[13.5px] text-[#5A6A82] mt-1.5 leading-relaxed">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
