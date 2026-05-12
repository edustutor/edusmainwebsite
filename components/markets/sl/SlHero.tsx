import Link from "next/link";

export function SlHero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.30 }} />
        <div className="blob" style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#FACC15", opacity: 0.30 }} />
        <div className="blob" style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#06B6D4", opacity: 0.22 }} />
      </div>

      <div className="container-edge">
        <div className="flex justify-center px-3" data-anim>
          <Link
            href="/#regions"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full glass text-[11px] sm:text-[12.5px] font-medium text-[#2B3950] whitespace-nowrap max-w-full"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className="shrink-0">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All markets
            <span className="text-[#5A6A82]">·</span>
            <span className="text-[#2563EB]">🇱🇰 Sri Lanka</span>
          </Link>
        </div>

        <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
          <p className="eyebrow">🇱🇰 Sri Lanka · National Syllabus · Cambridge & Edexcel</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Quality Online tuition in Sri Lanka, <em>built for every student.</em>
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Top-notch online tutoring from qualified tutors at the comfort of your home.
            Grade 1 to G.C.E A/L. National Syllabus, Cambridge IGCSE and Edexcel,
            in <strong>Sinhala medium</strong>, <strong>Tamil medium</strong>,
            and <strong>English medium</strong>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
            <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Enrolment</a>
            <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
          </div>
        </div>

        {/* Two pillar cards */}
        <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto" data-anim="4">
          {[
            { icon: "👥", title: "Group Classes",      body: "Structured weekly classes by grade and subject - recordings, exams, and parent updates included.", tint: "#2563EB" },
            { icon: "👤", title: "Individual Classes", body: "One-to-one tutor matching with no fixed timetable. Pay per hour. Flexible across mediums and subjects.", tint: "#8B5CF6" },
          ].map((p) => (
            <div key={p.title} className="glass rounded-[24px] p-7 lift relative overflow-hidden">
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 180, height: 180, background: p.tint, opacity: 0.22 }} />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${p.tint}15`, border: `1px solid ${p.tint}25` }}
                >
                  {p.icon}
                </div>
                <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{p.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {[
            { k: "7000+", v: "Happy Students" },
            { k: "530+", v: "Live classes" },
            { k: "Grade 1 – A/L", v: "Coverage" },
            { k: "3 mediums", v: "Sinhala · Tamil · English" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-5 py-4 text-center">
              <p className="font-display font-700 text-[22px] tnum text-[#102033]">{s.k}</p>
              <p className="text-[11.5px] text-[#5A6A82] mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
