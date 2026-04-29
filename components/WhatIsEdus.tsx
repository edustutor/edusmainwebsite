export function WhatIsEdus() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-wide">
        {/* Section head */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="kicker">
              <span className="kicker-num">§ 02</span>
              About / What EDUS Is
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Not a prettier brochure.<br />
              <em className="accent">A smarter front door.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
              §02.01 Statement of intent
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <div className="grid grid-cols-12 gap-x-10 gap-y-10 mt-12">
          <div className="col-span-12 lg:col-span-7 space-y-5 text-[#2C334A] text-[16px] leading-[1.7]">
            <p>
              EDUS is a single, intelligently-organised platform that routes students and parents
              directly to the offer that matters for them — without the fragmentation of multiple
              sites, contact numbers, or proof claims.
            </p>
            <p>
              Sri Lanka is our flagship market with national-syllabus group classes plus broader
              one-to-one provision. India launches as a focused English-medium tuition for Grades
              6–10, built for Chennai families. The global door is for students anywhere who need
              personal one-to-one tuition matched to their syllabus.
            </p>
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <div className="border-l border-[#0E1421] pl-6 py-2">
              <p className="font-display italic text-[28px] leading-[1.15] text-[#0E1421]">
                "The most futuristic education website is the one that removes doubt the fastest."
              </p>
              <p className="mt-4 font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
                — EDUS Design Brief, 2026
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
