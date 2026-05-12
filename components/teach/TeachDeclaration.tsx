"use client";
import { useState } from "react";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { sectionRevealStrong, inView } from "@/lib/motion";
import { APPLY_URL } from "./TeachShared";

const DECLARATIONS = [
  "I have strong knowledge in the subject I am applying to teach.",
  "I can conduct online classes professionally.",
  "I have a stable internet connection and proper teaching setup.",
  "I can follow EDUS class schedules and academic instructions.",
  "I agree not to privately take EDUS students outside the institute.",
  "I agree to EDUS QA reviews and monthly performance monitoring.",
  "I agree to maintain student safety, privacy, and professionalism.",
];

export function TeachDeclaration() {
  const [checked, setChecked] = useState<boolean[]>(() => DECLARATIONS.map(() => false));
  const allChecked = checked.every(Boolean);

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <section id="apply" className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="10%" left="20%" size={260} color="#2563EB" opacity={[0.10, 0.18]} duration={22} blur={80} />
        <AmbientGlow bottom="0%" right="20%" size={220} color="#8B5CF6" opacity={[0.08, 0.16]} duration={26} delay={2} blur={80} />
      </div>

      <div className="container-edge">
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center">
            <p className="eyebrow"><span className="dot" />Before You Apply</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Confirm your <em>commitment.</em>
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
              Please apply only if you can honestly agree to each of the points below.
            </p>
          </div>

          <div className="mt-8 rounded-[24px] glass-strong p-6 md:p-8">
            <ul className="space-y-3">
              {DECLARATIONS.map((d, i) => (
                <li key={d}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <span
                      className={`inline-flex w-6 h-6 rounded-md items-center justify-center shrink-0 mt-0.5 border transition ${
                        checked[i]
                          ? "bg-[#2563EB] border-[#2563EB]"
                          : "bg-white border-[rgba(16,32,51,0.18)] group-hover:border-[#2563EB]"
                      }`}
                    >
                      {checked[i] && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden>
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => toggle(i)}
                      className="sr-only"
                      aria-label={d}
                    />
                    <span className="text-[13.5px] text-[#102033] leading-[1.55]">{d}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[12.5px] text-[#5A6A82]">
                {checked.filter(Boolean).length} of {DECLARATIONS.length} confirmed.
              </p>
              {allChecked ? (
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  I Agree & Proceed to Application
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled
                  className="btn btn-primary opacity-50 cursor-not-allowed"
                >
                  Check all to proceed
                </button>
              )}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
