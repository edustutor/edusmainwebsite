import Link from "next/link";
import { HOLISTIC_FEATURES } from "./SlShared";

export function SlIndividual() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", left: "-6%", width: 360, height: 360, background: "#2563EB", opacity: 0.18 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="heading" style={{ fontSize: "var(--fs-display)" }}>
            One-to-one tuition, <em>at your own pace.</em>
          </h2>
        </div>

        {/* Individual class card with holistic features inside */}
        <div className="relative glass-strong rounded-[28px] p-8 md:p-12 overflow-hidden mt-10">
          <span aria-hidden className="blob" style={{ top: -80, right: -60, width: 320, height: 320, background: "#2563EB", opacity: 0.20 }} />
          <span aria-hidden className="blob" style={{ bottom: -80, left: -60, width: 320, height: 320, background: "#8B5CF6", opacity: 0.20 }} />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-display font-700 text-[11px] tracking-[0.16em] uppercase shadow-[0_6px_14px_-6px_rgba(37,99,235,0.45)]"
                style={{ background: "linear-gradient(90deg, #2563EB 0%, #4F6DDB 60%, #6E5BC8 100%)" }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80" />
                Individual · 1:1
              </span>
              <h3 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
                &ldquo;Providing a <em>Holistic</em> Education&rdquo;
              </h3>
              <p className="text-[#2B3950] text-[16px] mt-4 leading-[1.65] max-w-xl">
                Personal tutor matching with no fixed timetable. Pay per hour. Flexible across
                every grade, syllabus, medium, and subject - built around your child&apos;s
                schedule and learning pace.
              </p>

              <ul className="mt-6 space-y-2.5 text-[14px]">
                {[
                  "No fixed timetable - schedule that suits you",
                  "Tutor matched to student",
                  "Pay-as-you-go · Starting from LKR 2,500 / hour",
                  "All grades · all subjects · all mediums",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[#2B3950]">
                    <span className="inline-flex w-5 h-5 mt-0.5 rounded-full bg-[#2563EB]/15 items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3.5" aria-hidden>
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://signup.edustutor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book One-to-One Tuition
                </a>
                <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
              </div>
            </div>

            {/* Holistic features - 2×2 grid */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
              {HOLISTIC_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.08)] p-5 shadow-[0_8px_24px_-12px_rgba(16,32,51,0.12)]"
                >
                  <div className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-2xl bg-[#EEF6FF] border border-[#2563EB]/20">
                    {f.icon}
                  </div>
                  <h4 className="heading mt-4" style={{ fontSize: "15px" }}>{f.title}</h4>
                  <p className="text-[#2B3950] text-[12.5px] mt-2 leading-[1.55]">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
