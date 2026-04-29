export function WhatIsEdus() {
  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow"><span className="dot" />01 · What EDUS is</p>
          <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
            A smarter <em>front door</em> to live online learning.
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6 text-[#2B3458] leading-relaxed text-[17px]">
          <p>
            EDUS isn't a prettier brochure. It's a single, intelligently-organised platform that routes
            students and parents directly to the offer that matters for them — without the fragmentation
            of multiple sites, contact numbers, or proof claims.
          </p>
          <p>
            Sri Lanka is our flagship market with national-syllabus group classes plus broader one-to-one
            provision. India launches as a focused English-medium offer for Grades 6–10. The global door
            is for students anywhere who need personal one-to-one tuition matched to their syllabus.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {[
              { k: "Live online", v: "Group + 1:1 classes" },
              { k: "Parent-grade", v: "Updates & monitoring" },
              { k: "Anywhere", v: "30+ countries served" },
            ].map((p) => (
              <div key={p.k} className="glass rounded-2xl p-5">
                <p className="font-display text-2xl text-[#0A1230]">{p.k}</p>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-1">{p.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
