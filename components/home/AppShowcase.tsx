"use client";

import Link from "next/link";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { sectionRevealStrong, fadeUp, staggerContainer, inView } from "@/lib/motion";
import { FeatureIcon } from "@/components/effects/Icons";

/**
 * Home-page LMS / app showcase.
 *
 * A bold split section: on the left, the pitch + the official Google Play
 * and App Store badges + a "Get the web app" link, and a small secondary
 * "Browse all features" button to /lms-platform. On the right, the EDUS
 * child-with-phone illustration on a glass device card, ringed by
 * feature-highlight pills. Matches the main site theme (blue/violet
 * glass, FeatureIcon, motion reveals).
 */

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.edus.edustutor";
const APP_STORE_URL = "https://apps.apple.com/lk/app/edus-tutor/id6742735384";
const WEB_APP_URL = "https://lms.edustutor.com";

// The most important student-facing features, as quick highlight pills.
const HIGHLIGHTS: Array<{ icon: string; tint: string; label: string }> = [
  { icon: "live-classes", tint: "#2563EB", label: "Live classes" },
  { icon: "calendar", tint: "#0EA5E9", label: "Timetable & join" },
  { icon: "assignment", tint: "#F59E0B", label: "Homework" },
  { icon: "class-recordings", tint: "#EF4444", label: "Recordings" },
  { icon: "resources", tint: "#22C55E", label: "Study resources" },
  { icon: "monitoring", tint: "#8B5CF6", label: "Attendance" },
  { icon: "message", tint: "#EC4899", label: "Class chat" },
  { icon: "card", tint: "#06B6D4", label: "Payments & wallet" },
];

export function AppShowcase() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="8%" left="-4%" size={260} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={90} />
        <AmbientGlow bottom="6%" right="-4%" size={240} color="#8B5CF6" opacity={[0.06, 0.14]} duration={26} delay={3} blur={90} />
      </div>

      <div className="container-edge">
        <m.div
          className="glass-strong rounded-[36px] p-7 sm:p-10 lg:p-14 relative overflow-hidden"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div aria-hidden className="absolute inset-0 -z-10">
            <span className="blob" style={{ top: "-12%", left: "-6%", width: 260, height: 260, background: "#2563EB", opacity: 0.14 }} />
            <span className="blob" style={{ bottom: "-14%", right: "-6%", width: 260, height: 260, background: "#06B6D4", opacity: 0.12 }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT - copy + CTAs */}
            <div>
              <p className="eyebrow"><span className="dot" />The EDUS LMS</p>
              <p className="mt-3 text-[12px] font-700 uppercase tracking-[0.14em] text-[#5A6A82]">
                Introducing the new EDUS Learning App
              </p>
              <h2 className="heading mt-3" style={{ fontSize: "var(--fs-display)", lineHeight: 1.1 }}>
                Learn Live. Revise Anytime. <em>Achieve More.</em>
              </h2>
              <p className="mt-4 text-[#2B3950] text-[15.5px] leading-relaxed max-w-lg">
                Your classes, recordings, learning materials, homework, assessments
                and academic progress are now available in one simple learning space.
              </p>
              <p className="mt-3 text-[#2B3950] text-[15.5px] leading-relaxed max-w-lg">
                The new EDUS Learning App is designed to make your learning journey
                easier, more organized and more engaging - wherever you are.
              </p>

              {/* Feature highlight pills */}
              <m.div
                className="mt-6 flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={inView}
              >
                {HIGHLIGHTS.map((h) => (
                  <m.span
                    key={h.label}
                    variants={fadeUp}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-[rgba(16,32,51,0.08)] px-3 py-1.5 text-[12.5px] font-600 text-[#102033]"
                  >
                    <FeatureIcon name={h.icon} tint={h.tint} size={15} />
                    {h.label}
                  </m.span>
                ))}
              </m.div>

              {/* App store badges */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Get EDUS on Google Play" className="transition-transform hover:-translate-y-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/badges/google-play.png" alt="Get it on Google Play" width={216} height={64} className="h-[50px] w-auto" />
                </a>
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download EDUS on the App Store" className="transition-transform hover:-translate-y-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/badges/app-store.png" alt="Download on the App Store" width={216} height={64} className="h-[50px] w-auto" />
                </a>
              </div>

              {/* Web app + browse features */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[14px] font-700 text-[#2563EB] hover:underline">
                  <FeatureIcon name="global" tint="#2563EB" size={17} />
                  Open the web app
                </a>
                <Link href="/lms-platform" className="btn btn-outline text-[13.5px] !py-2 !px-4">
                  Browse all features
                  {/* Plain glyph so it inherits the button text colour and
                      turns white on hover along with the label. */}
                  <span aria-hidden className="text-[16px] leading-none font-500">+</span>
                </Link>
              </div>
            </div>

            {/* RIGHT - the LMS hero illustration. DESKTOP ONLY (hidden on
                mobile per request) - the rich portrait scene needs the
                space, and the left column already carries the section on
                small screens. The floating badges live inside this column
                so they are hidden on mobile too. */}
            <div className="relative hidden lg:flex justify-end">
              {/* The frame IS the positioning context. overflow-hidden keeps
                  the image corners rounded; the floating badges are placed
                  INSIDE it (inset from the edges) so they sit ON the image,
                  and clip cleanly to the rounded frame. */}
              {/* Grid overlay so the badges anchor to the same box as the
                  image without depending on the image establishing a
                  containing block. The image and the badge layer share cell
                  1/1; the badge layer is a flex column that pins one badge to
                  the top and one to the bottom - reliable regardless of how
                  the image sizes. */}
              <div className="glass rounded-[32px] p-2.5 w-full max-w-[440px]">
                <div className="grid rounded-[24px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/edus-lms-hero.webp"
                    alt="EDUS student learning on the EDUS Learning App, surrounded by live classes, recordings, resources, assessments, progress and community features"
                    width={900}
                    height={1350}
                    className="w-full h-auto object-cover"
                    style={{ gridArea: "1 / 1" }}
                  />

                  {/* Badge layer - same grid cell as the image, flex column
                      spreading top badge and bottom badge. pointer-events
                      stay on the links only. */}
                  <div
                    className="flex flex-col justify-between p-4 pointer-events-none"
                    style={{ gridArea: "1 / 1" }}
                  >
                    {/* TOP-left - languages */}
                    <div className="animate-floaty self-start glass-strong rounded-full px-3.5 py-1.5 inline-flex items-center gap-2 text-[12px] font-700 text-[#102033] shadow-lg">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" />
                      EN · தமிழ் · සිංහල
                    </div>
                    {/* BOTTOM-right - learn anywhere */}
                    <div className="animate-floaty2 self-end glass-strong rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-lg">
                      <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>
                        <FeatureIcon name="mobile" tint="#fff" size={16} />
                      </span>
                      <div className="leading-tight">
                        <p className="font-display font-800 text-[13px] text-[#102033]">Learn anywhere</p>
                        <p className="text-[11px] text-[#5A6A82]">Fast on mobile data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
