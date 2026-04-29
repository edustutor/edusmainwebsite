"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { fadeUp, sectionReveal, inView } from "@/lib/motion";

export function HelpBanner() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="container-edge">
        <m.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative glass-strong rounded-[28px] p-6 md:p-10 overflow-hidden"
        >
          {/* gentle floating accents */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="blob" style={{ top: "-20%", left: "-8%", width: 280, height: 280, background: "#2563EB", opacity: 0.20 }} />
            <div className="blob" style={{ bottom: "-30%", right: "-6%", width: 260, height: 260, background: "#8B5CF6", opacity: 0.20 }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            <m.div variants={fadeUp} className="md:col-span-2">
              <p className="eyebrow"><span className="dot" />Need Help</p>
              <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
                Need help choosing the <em>right class?</em>
              </h3>
              <p className="text-[#2B3950] text-[14.5px] mt-2 max-w-xl leading-[1.65]">
                Our team is happy to walk you through Sri Lanka classes, India tuition, and global one
                to one options — with no pressure.
              </p>
            </m.div>
            <m.div variants={fadeUp} className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
