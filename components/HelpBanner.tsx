"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, scaleIn, inView } from "@/lib/motion";

export function HelpBanner() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-30, 30]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} className="relative py-10 md:py-14 overflow-hidden">
      <div className="container-edge">
        <m.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative glass-strong rounded-[28px] p-6 md:p-10 overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 -z-10">
            <m.div className="absolute inset-0" style={{ y: blobAY }}>
              <AmbientGlow top="-15%" left="-4%" size={180} color="#2563EB" opacity={[0.10, 0.18]} duration={18} blur={70} />
            </m.div>
            <m.div className="absolute inset-0" style={{ y: blobBY }}>
              <AmbientGlow bottom="-15%" right="-4%" size={180} color="#8B5CF6" opacity={[0.10, 0.18]} duration={22} delay={2} blur={70} />
            </m.div>
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
              <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Enrolment</a>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
