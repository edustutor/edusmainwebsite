"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { FEATURED_VIDEOS } from "@/components/shared/VideosData";

/**
 * Featured videos from the EDUS YouTube channel (@edusonline).
 * Visible cards on the homepage - curated subset via the `featured` flag
 * in VideosData.ts. Each card links to YouTube in a new tab.
 *
 * The full VIDEOS list is always emitted in JSON-LD for AI/SERP coverage,
 * regardless of which subset shows visibly here.
 */

const CHANNEL_URL = "https://www.youtube.com/@edusonline";

export function VideoShowcase() {
  if (FEATURED_VIDEOS.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="10%" right="-5%" size={260} color="#DC2626" opacity={[0.06, 0.12]} duration={26} blur={90} />
        <AmbientGlow bottom="10%" left="-5%" size={220} color="#2563EB" opacity={[0.06, 0.12]} duration={22} delay={3} blur={90} />
      </div>

      <div className="container-edge">
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Watch & Learn</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              From the <em>EDUS YouTube channel</em>.
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
              Study tips, A/L exam strategy, and learning guidance from the EDUS Academic Team.
              Subscribe on YouTube for the full library - Tamil, Sinhala, and English.
            </p>
          </div>
        </m.div>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURED_VIDEOS.map((v) => (
            <m.li key={v.id} variants={fadeUp}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] hover:-translate-y-0.5 transition"
              >
                {/* Thumbnail with play overlay */}
                <div
                  className="relative aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)` }}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex w-14 h-14 rounded-full items-center justify-center bg-[#DC2626] group-hover:scale-110 transition shadow-[0_8px_24px_-8px_rgba(220,38,38,0.6)]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Title + meta */}
                <div className="p-5">
                  <h3 className="font-display font-700 text-[14.5px] text-[#102033] leading-[1.4] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[12px] text-[#5A6A82] flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-[#DC2626] shrink-0">
                      <path d="M23 7.2s-.2-1.5-.9-2.2c-.9-.9-1.9-.9-2.4-1C16.4 3.8 12 3.8 12 3.8s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.7 1 7.2 1 7.2S.8 9 .8 10.8v1.6C.8 14.2 1 16 1 16s.2 1.5.9 2.2c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.6c0-1.8-.2-3.6-.2-3.6zM9.7 14.5V8l5.7 3.3-5.7 3.2z" />
                    </svg>
                    Watch on YouTube
                  </p>
                </div>
              </a>
            </m.li>
          ))}
        </m.ul>

        {/* Channel CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[rgba(16,32,51,0.10)] text-[#102033] font-display font-700 text-[13.5px] shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)] hover:-translate-y-0.5 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#DC2626" aria-hidden>
              <path d="M23 7.2s-.2-1.5-.9-2.2c-.9-.9-1.9-.9-2.4-1C16.4 3.8 12 3.8 12 3.8s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.7 1 7.2 1 7.2S.8 9 .8 10.8v1.6C.8 14.2 1 16 1 16s.2 1.5.9 2.2c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.6c0-1.8-.2-3.6-.2-3.6zM9.7 14.5V8l5.7 3.3-5.7 3.2z" />
            </svg>
            Subscribe on YouTube
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
