"use client";
import Image from "next/image";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";

/**
 * Accreditations & Partners section.
 *
 * SEO notes:
 * - Each partner logo uses a unique, keyword-rich `alt` so EDUS appears
 *   in Google image and brand searches alongside these organisations.
 * - File names are semantic (e.g. /microsoft-for-startups-edus-partner.webp)
 *   so image search engines have an extra signal.
 * - Inline JSON-LD `EducationalOrganization` block declares each partner as
 *   an `award` / `memberOf` / `sponsor` mention, reinforcing entity links.
 * - Section uses an aria-labelledby relationship for accessibility + crawler clarity.
 */

type Partner = {
  name: string;
  alt: string;
  src: string;
  href: string;
  tagline: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Microsoft for Startups",
    alt: "EDUS Online Tuition is a proud partner of Microsoft for Startups",
    src: "/microsoft-for-startups-edus-partner.webp",
    href: "https://www.microsoft.com/en-us/startups",
    tagline: "Founders Hub Partner",
  },
  {
    name: "ICTA Sri Lanka",
    alt: "EDUS recognised by ICTA, the Information and Communication Technology Agency of Sri Lanka",
    src: "/icta-sri-lanka-edus-partner.webp",
    href: "https://www.icta.lk/",
    tagline: "Ideas Actioned",
  },
  {
    name: "SLASSCOM",
    alt: "EDUS is a member of SLASSCOM, the Sri Lanka Association for Software and Services Companies",
    src: "/slasscom-edus-member.webp",
    href: "https://slasscom.lk/",
    tagline: "Industry Chamber",
  },
  {
    name: "Hemas Slingshot x Hatch",
    alt: "EDUS accelerated by Hemas Slingshot x Hatch startup programme in Sri Lanka",
    src: "/hemas-slingshot-hatch-edus-partner.webp",
    href: "https://www.hatch.lk/",
    tagline: "Accelerator Cohort",
  },
  {
    name: "Spiralation",
    alt: "EDUS selected for Spiralation, the flagship tech startup programme by ICTA Sri Lanka",
    src: "/spiralation-icta-edus-partner.webp",
    href: "https://www.icta.lk/projects/spiralation/",
    tagline: "Tech Startup Programme",
  },
  {
    name: "Yarl IT Hub",
    alt: "EDUS supported by Yarl IT Hub, the Jaffna technology and innovation hub in Sri Lanka",
    src: "/yarl-it-hub-edus-partner.webp",
    href: "https://yarlithub.org/",
    tagline: "Jaffna Innovation Hub",
  },
  {
    name: "Innovate Lanka",
    alt: "EDUS featured by Innovate Lanka, the Sri Lankan innovation network",
    src: "/innovate-lanka-edus-partner.webp",
    href: "https://innovatelanka.lk/",
    tagline: "Innovation Network",
  },
];

const HIGHLIGHTS = [
  { k: "5+",          v: "Years of Online Teaching" },
  { k: "7,000+",      v: "Students Reached" },
  { k: "4",           v: "Learning Markets" },
  { k: "Expert-Led",  v: "Live Online Classes" },
];

export function Accreditations() {
  // duplicate the list so the marquee loops seamlessly without a visible jump
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="recognitions"
      aria-labelledby="recognitions-heading"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="10%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="6%" right="-4%" size={220} color="#8B5CF6" opacity={[0.06, 0.14]} duration={26} delay={3} blur={80} />
      </div>

      {/* Inline JSON-LD - ecosystem affiliations (no overclaimed accreditation) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "EDUS Online Tuition",
            url: "https://edustutor.com",
            // affiliation = soft "we are part of this ecosystem" relationship.
            // Used for ecosystem programmes (Microsoft for Startups, Hemas Slingshot,
            // Spiralation) and industry/innovation networks (SLASSCOM, ICTA, Yarl IT
            // Hub, Innovate Lanka). Does not imply formal certification.
            affiliation: PARTNERS.map((p) => ({
              "@type": "Organization",
              name: p.name,
              url: p.href,
            })),
          }),
        }}
      />

      <div className="container-edge">
        {/* Heading block */}
        <m.div
          className="max-w-3xl mx-auto text-center"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Our Recognitions</p>
          <h2
            id="recognitions-heading"
            className="heading mt-4"
            style={{ fontSize: "var(--fs-display)" }}
          >
            Trusted online learning, built for{" "}
            <em>student success.</em>
          </h2>
          <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
            With 5+ years of online teaching experience, EDUS has supported thousands of students
            through expert tutors, structured live classes, progress tracking, and caring
            academic guidance, while growing through Sri Lanka&rsquo;s education, technology,
            and innovation ecosystem.
          </p>
        </m.div>

        {/* Stat highlights */}
        <m.dl
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.v}
              className="rounded-2xl bg-white border border-[rgba(16,32,51,0.08)] px-4 py-3 text-center shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
            >
              <dt
                className="font-display font-800 text-[22px] leading-none"
                style={{
                  background: "linear-gradient(90deg,#2563EB 0%,#6E5BC8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {h.k}
              </dt>
              <dd className="text-[11px] text-[#5A6A82] uppercase tracking-[0.08em] font-display font-600 mt-1">
                {h.v}
              </dd>
            </div>
          ))}
        </m.dl>

        {/* Marquee track - infinite seamless scroll */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 relative rounded-3xl"
        >
          {/* Edge fade masks - rounded to match the marquee container */}
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none rounded-l-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none rounded-r-3xl"
            style={{
              background:
                "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
          />

          <div className="accreditations-marquee overflow-hidden rounded-3xl">
            <ul className="accreditations-marquee-track flex items-stretch gap-4 sm:gap-5 py-2">
              {track.map((p, i) => (
                <li
                  key={`${p.name}-${i}`}
                  className="shrink-0 w-[220px] sm:w-[240px]"
                  aria-hidden={i >= PARTNERS.length}
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={p.name}
                    aria-label={p.alt}
                    tabIndex={i >= PARTNERS.length ? -1 : 0}
                    className="relative block bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 h-full shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)] hover:shadow-[0_18px_40px_-20px_rgba(37,99,235,0.25)] transition"
                  >
                    <div className="relative w-full aspect-video flex items-center justify-center">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={320}
                        height={180}
                        sizes="240px"
                        className="max-h-full max-w-full object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="mt-3 pt-3 border-t border-[rgba(16,32,51,0.06)]">
                      <p className="font-display font-700 text-[12.5px] text-[#102033] leading-tight truncate">
                        {p.name}
                      </p>
                      <p className="text-[10.5px] text-[#5A6A82] mt-0.5 uppercase tracking-[0.08em] font-display font-600">
                        {p.tagline}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </m.div>

        <p className="mt-6 text-center text-[8px] sm:text-[8.5px] text-[#A8B3C5] max-w-2xl mx-auto leading-[1.45] tracking-wide opacity-80">
          Logos and trademarks belong to their respective owners and are shown only to indicate
          programme participation, ecosystem association, membership, or partnership where
          applicable. They do not imply formal endorsement, certification, or accreditation
          unless expressly stated.
        </p>
      </div>

      {/* Marquee animation - infinite seamless scroll, paused on hover/focus,
          disabled when user prefers reduced motion. */}
      <style jsx>{`
        .accreditations-marquee-track {
          width: max-content;
          animation: accreditations-scroll 45s linear infinite;
          will-change: transform;
        }
        .accreditations-marquee:hover .accreditations-marquee-track,
        .accreditations-marquee:focus-within .accreditations-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .accreditations-marquee-track {
            animation: none;
          }
        }
        @keyframes accreditations-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
