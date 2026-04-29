import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-edge">
        <div className="relative rounded-[36px] glass-strong p-8 md:p-14 overflow-hidden text-center">
          {/* Floating circles inside the CTA card */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="blob" style={{ top: "-10%", left: "-10%", width: 360, height: 360, background: "#2563EB", opacity: 0.30 }} />
            <div className="blob" style={{ top: "-10%", right: "-10%", width: 320, height: 320, background: "#8B5CF6", opacity: 0.30 }} />
            <div className="blob" style={{ bottom: "-15%", left: "30%", width: 380, height: 380, background: "#06B6D4", opacity: 0.25 }} />
            <div className="blob" style={{ bottom: "-15%", right: "20%", width: 280, height: 280, background: "#FACC15", opacity: 0.30 }} />
          </div>

          <p className="eyebrow"><span className="dot" />Ready when you are</p>
          <h2 className="heading mt-5" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
            A clearer path<br />
            to <em>better grades.</em>
          </h2>
          <p className="text-[#2B3950] text-[17px] max-w-xl mx-auto mt-6 leading-[1.7]">
            Pick your region, see the offer that's actually for you, and join with a guided
            five-step flow. No fragmented forms. Just one well-built education platform.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
            <Link href="/contact" className="btn btn-yellow">Book a Free Consultation</Link>
            <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { k: "Free", v: "Consultation" },
              { k: "48 hr", v: "Tutor matching" },
              { k: "Weekly", v: "Parent reports" },
              { k: "24 / 7", v: "Student support" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white/80 border border-white/80 px-3 py-3.5 text-center">
                <p className="font-[family-name:var(--font-display)] font-700 text-[18px] text-[#102033]">{s.k}</p>
                <p className="text-[11.5px] text-[#5A6A82] mt-0.5">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
