"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { staggerContainer, fadeUp, floatingBlob, inViewClose } from "@/lib/motion";

export function CTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-edge">
        <m.div
          className="relative rounded-[36px] glass-strong p-8 md:p-14 overflow-hidden text-center"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={inViewClose}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* Floating blobs */}
          <div aria-hidden className="absolute inset-0 -z-10">
            {[
              { top: "-10%", left: "-10%", w: 360, h: 360, c: "#2563EB", o: 0.30, delay: 0 },
              { top: "-10%", right: "-10%", w: 320, h: 320, c: "#8B5CF6", o: 0.30, delay: 2 },
              { bottom: "-15%", left: "30%", w: 380, h: 380, c: "#06B6D4", o: 0.25, delay: 4 },
              { bottom: "-15%", right: "20%", w: 280, h: 280, c: "#FACC15", o: 0.30, delay: 1 },
            ].map((b, i) => (
              <m.div
                key={i}
                className="blob"
                style={{
                  ...b,
                  width: b.w,
                  height: b.h,
                  background: b.c,
                  opacity: b.o,
                  left: b.left as string | undefined,
                  right: b.right as string | undefined,
                  top: b.top as string | undefined,
                  bottom: b.bottom as string | undefined,
                }}
                variants={floatingBlob(b.delay)}
                initial="initial"
                animate="animate"
              />
            ))}
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inViewClose}
          >
            <m.p variants={fadeUp} className="eyebrow"><span className="dot" />Ready when you are</m.p>
            <m.h2 variants={fadeUp} className="heading mt-5" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
              A clearer path<br />
              to <em>better grades.</em>
            </m.h2>
            <m.p variants={fadeUp} className="text-[#2B3950] text-[17px] max-w-xl mx-auto mt-6 leading-[1.7]">
              Pick your region, see the offer that's actually for you, and join with a guided
              five-step flow. No fragmented forms. Just one well-built education platform.
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-yellow">Book a Free Consultation</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {[
                { k: "Free", v: "Consultation" },
                { k: "48 hr", v: "Tutor matching" },
                { k: "Weekly", v: "Parent reports" },
                { k: "24 / 7", v: "Student support" },
              ].map((s) => (
                <m.div
                  key={s.v}
                  variants={fadeUp}
                  className="rounded-2xl bg-white/80 border border-white/80 px-3 py-3.5 text-center"
                >
                  <p className="font-[family-name:var(--font-display)] font-700 text-[18px] text-[#102033]">{s.k}</p>
                  <p className="text-[11.5px] text-[#5A6A82] mt-0.5">{s.v}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
