import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdScript } from "@/components/layout/StructuredData";
import { OvIcon } from "@/components/overseas/OvIcon";
import { HeroFrame } from "@/components/overseas/HeroFrame";
import { StatCounter } from "@/components/overseas/StatCounter";
import { ConsultationForm } from "@/components/overseas/ConsultationForm";
import {
  OV,
  WHY_CHOOSE,
  STATS,
  DESTINATIONS,
  SERVICES,
  UNIVERSITIES,
  TESTIMONIALS,
  whatsappUrl,
} from "@/lib/overseas/data";
import {
  overseasOrganization,
  overseasWebPage,
  overseasBreadcrumb,
  overseasService,
  overseasDestinationsList,
  overseasFaq,
} from "@/lib/overseas/schema";

/**
 * EDUS Overseas Consultancy - Home page.
 *
 * Built from the official requirements doc, in the scoped vibrant
 * `.overseas` theme. Sections (top to bottom):
 *   Hero -> Why Choose -> Stats -> Destinations -> Services ->
 *   Featured Universities -> Testimonials -> Consultation form -> FAQ
 *   -> Final CTA.
 *
 * SEO target: rank #1 in Sri Lanka for "study abroad consultants Sri
 * Lanka" and related queries. Full metadata + Organization / Service /
 * ItemList / FAQ / Breadcrumb JSON-LD.
 */

const PAGE_FAQ = [
  {
    q: "Which countries can I study in with EDUS Overseas Consultancy?",
    a: "EDUS Overseas helps Sri Lankan students study in the United Kingdom, Australia, Canada, Dubai, Ireland, and New Zealand. We guide you to the right country based on your budget, course, and career goals.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. Your first study abroad consultation with EDUS Overseas is completely free and carries no obligation. Book a call or message us on WhatsApp and a counsellor will guide you.",
  },
  {
    q: "What services does EDUS Overseas provide?",
    a: "We offer end-to-end support: career counselling, course selection, university applications, scholarship guidance, visa assistance, accommodation support, IELTS and PTE guidance, and a pre-departure briefing.",
  },
  {
    q: "Do I need IELTS or PTE to study abroad?",
    a: "Most universities ask for English proof such as IELTS, PTE, or Duolingo, but some accept your O/L or A/L English or offer their own test. We check the exact requirement for your chosen university and guide your English preparation.",
  },
  {
    q: "Can EDUS Overseas help me find scholarships?",
    a: "Yes. We identify the scholarships and funding you qualify for based on your academic record and chosen course, and we help you apply correctly to improve your chances.",
  },
  {
    q: "How do I get started?",
    a: `Call us on ${OV.phoneDisplay}, message us on WhatsApp, or fill in the free consultation form on this page. A counsellor will review your profile and recommend the best path within one working day.`,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(OV.siteBase),
  title: "Study Abroad Consultants in Sri Lanka | EDUS Overseas Consultancy",
  description:
    "EDUS Overseas Consultancy - Sri Lanka's trusted study abroad consultants. Free guidance for university admissions, scholarships, and student visas to the UK, Australia, Canada, Dubai, Ireland & New Zealand. Book a free consultation.",
  alternates: { canonical: "/overseas" },
  keywords: [
    "study abroad consultants Sri Lanka",
    "overseas education consultants Sri Lanka",
    "study abroad agency Sri Lanka",
    "education consultants Colombo",
    "education consultants Jaffna",
    "foreign education consultants Sri Lanka",
    "student visa consultants Sri Lanka",
    "study in UK from Sri Lanka",
    "study in Australia from Sri Lanka",
    "study in Canada from Sri Lanka",
    "study in Ireland from Sri Lanka",
    "study in New Zealand from Sri Lanka",
    "study in Dubai from Sri Lanka",
    "best study abroad consultants Sri Lanka",
    "university application help Sri Lanka",
    "scholarship guidance Sri Lanka",
    "IELTS PTE guidance Sri Lanka",
    "EDUS Overseas",
    "EDUS Overseas Consultancy",
  ],
  openGraph: {
    title: "EDUS Overseas Consultancy - Study Abroad Consultants in Sri Lanka",
    description:
      "Free guidance for university admissions, scholarships, and student visas to the UK, Australia, Canada, Dubai, Ireland & New Zealand. From Dreams to Destinations.",
    type: "website",
    url: `${OV.siteBase}/overseas`,
    siteName: OV.brand,
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "EDUS Overseas Consultancy - study abroad from Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDUS Overseas Consultancy - Study Abroad from Sri Lanka",
    description:
      "Free guidance for admissions, scholarships, and visas to the UK, Australia, Canada, Dubai, Ireland & New Zealand.",
    images: ["/edus-og.jpg"],
  },
};

export default function OverseasHome() {
  return (
    <>
      <JsonLdScript data={overseasOrganization()} />
      <JsonLdScript data={overseasWebPage({
        name: "Study Abroad Consultants in Sri Lanka - EDUS Overseas Consultancy",
        description:
          "Sri Lanka's trusted study abroad consultants. Free guidance for admissions, scholarships, and student visas to the UK, Australia, Canada, Dubai, Ireland & New Zealand.",
        path: "/overseas",
      })} />
      <JsonLdScript data={overseasBreadcrumb([{ name: "Home", path: "/overseas" }])} />
      <JsonLdScript data={overseasService()} />
      <JsonLdScript data={overseasDestinationsList()} />
      <JsonLdScript data={overseasFaq(PAGE_FAQ)} />

      <Hero />
      <WhyChoose />
      <Stats />
      <Destinations />
      <Services />
      <Universities />
      <Testimonials />
      <Consultation />
      <Faq />
      <FinalCta />
    </>
  );
}

/* --------------------------------------------------------------- */
/* Hero                                                              */
/* --------------------------------------------------------------- */

function Hero() {
  const waMessage = "Hi EDUS Overseas, I would like a free study abroad consultation.";
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-6">
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="ov-blob" style={{ top: "-6%", left: "-6%", width: 360, height: 360, background: "#FF5A5F", opacity: 0.22 }} />
        <span className="ov-blob" style={{ top: "8%", right: "-8%", width: 380, height: 380, background: "#FFB23E", opacity: 0.22 }} />
        <span className="ov-blob" style={{ bottom: "-12%", left: "35%", width: 320, height: 320, background: "#14B8A6", opacity: 0.16 }} />
      </div>

      <div className="container-edge grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Copy */}
        <div>
          <p className="ov-eyebrow"><span className="ov-dot" />{OV.tagline}</p>
          <h1 className="ov-heading mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.06 }}>
            Start your <span className="ov-shimmer">study abroad</span> journey with EDUS Overseas
          </h1>
          <p className="mt-5 text-[16.5px] text-[var(--ov-ink-soft)] leading-relaxed max-w-xl">
            Expert guidance for admissions, scholarships, visas, and
            international education opportunities. We turn your dream of
            studying abroad into a clear, step-by-step plan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#consultation" className="ov-btn ov-btn-primary text-[15px]">
              <OvIcon name="counsellor" size={18} tint="#fff" />
              Book Free Consultation
            </Link>
            <Link href="#destinations" className="ov-btn ov-btn-ghost text-[15px] group">
              Explore Destinations
              <OvIcon name="arrow" size={17} tint="var(--ov-coral-deep)" />
            </Link>
          </div>

          {/* Trust chips */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {[
              { icon: "shield", text: "95% visa success rate" },
              { icon: "trophy", text: "1000+ students guided" },
              { icon: "globe", text: "6+ study destinations" },
            ].map((t) => (
              <span key={t.text} className="inline-flex items-center gap-2 text-[13.5px] font-600 text-[var(--ov-ink-soft)]">
                <OvIcon name={t.icon} size={17} tint="var(--ov-coral-deep)" />
                {t.text}
              </span>
            ))}
          </div>
        </div>

        {/* Hero image - fixed aspect-ratio frame. The relative wrapper is
            exactly the image height (HeroFrame is aspect-locked), so the
            floating cards overlap the image edges. Extra bottom margin
            gives the hanging card room so it never collides with the next
            section. */}
        <div className="relative mt-4 lg:mt-0 mb-10 sm:mb-6">
          {/* USER-GENERATED IMAGE: /public/overseas/hero.webp (3:2 landscape) */}
          <HeroFrame
            src="/overseas/hero.webp"
            alt="Sri Lankan student ready to study abroad, surrounded by flags of the UK, Australia, Canada, Dubai, Ireland and New Zealand"
            ratio="3 / 2"
            label="From Dreams to Destinations"
            eager
          />
          {/* Free-counselling card - hangs off the bottom-left corner,
              overlapping the image edge. z-20 keeps it above the photo. */}
          <div className="absolute -bottom-5 left-3 sm:-left-3 z-20 ov-glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
            <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#14B8A6,#0E9488)" }}>
              <OvIcon name="check" size={20} tint="#fff" />
            </span>
            <div className="leading-tight">
              <p className="font-display font-800 text-[14.5px] text-[var(--ov-ink)]">Free counselling</p>
              <p className="text-[11.5px] text-[var(--ov-ink-mute)]">No obligation, expert advice</p>
            </div>
          </div>
          {/* Chat-now WhatsApp pill - hangs off the top-right corner,
              overlapping the image edge. */}
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -top-3.5 right-3 sm:-right-3 z-20 ov-glass-strong rounded-full pl-1.5 pr-4 py-1.5 inline-flex items-center gap-2 text-[12.5px] font-700 text-[var(--ov-ink)] shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
              <OvIcon name="whatsapp" size={15} tint="#fff" />
            </span>
            Chat now
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Why choose EDUS                                                   */
/* --------------------------------------------------------------- */

function WhyChoose() {
  return (
    <section className="container-edge ov-section">
      <SectionHead eyebrow="Why Choose EDUS" title={<>Your trusted partner, <em>every step abroad.</em></>}
        sub="From your first question to your arrival overseas, EDUS Overseas stays with you." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE.map((w) => (
          <div key={w.title} className="ov-glass ov-lift rounded-2xl p-6">
            <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,90,95,0.14), rgba(245,158,11,0.14))" }}>
              <OvIcon name={w.icon} size={24} tint="var(--ov-coral-deep)" />
            </span>
            <h3 className="ov-heading text-[17px] mt-4">{w.title}</h3>
            <p className="mt-2 text-[13.5px] text-[var(--ov-ink-soft)] leading-[1.7]">{w.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Stats band                                                        */
/* --------------------------------------------------------------- */

function Stats() {
  return (
    <section className="container-edge ov-section">
      <div className="ov-glass-strong rounded-[32px] p-8 sm:p-12 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="ov-blob" style={{ top: "-20%", left: "10%", width: 280, height: 280, background: "#FF5A5F", opacity: 0.16 }} />
          <span className="ov-blob" style={{ bottom: "-30%", right: "12%", width: 280, height: 280, background: "#14B8A6", opacity: 0.16 }} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="ov-heading" style={{ fontSize: "clamp(34px,4vw,52px)" }}>
                <span className="ov-shimmer"><StatCounter value={s.value} suffix={s.suffix} /></span>
              </p>
              <p className="mt-2 text-[13.5px] font-600 text-[var(--ov-ink-soft)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Popular destinations                                              */
/* --------------------------------------------------------------- */

function Destinations() {
  return (
    <section id="destinations" className="container-edge ov-section scroll-mt-24">
      <SectionHead eyebrow="Popular Study Destinations" title={<>Pick your <em>dream destination.</em></>}
        sub="Six of the world's best study-abroad countries, each with its own visa, work, and scholarship advantages." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((d) => (
          <Link key={d.slug} href={`/overseas/${d.slug}`} className="ov-glass ov-lift ov-zoom rounded-[24px] overflow-hidden group">
            <div
              className="relative h-44 overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${d.tint}33, ${d.tint}14)` }}
            >
              {/* Placeholder glyph behind the image - a missing
                  /public/overseas/destinations/<slug>.webp then shows a
                  tinted gradient with the flag instead of a broken icon. */}
              <span aria-hidden className="absolute text-[44px] opacity-30 select-none">{d.flag}</span>
              {/* USER-GENERATED IMAGE: /public/overseas/destinations/<slug>.webp */}
              <img src={d.image} alt={d.imageAlt} width={520} height={300} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(26,19,64,0.55))" }} />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-700 text-[var(--ov-ink)]">
                <span className="text-[15px] leading-none">{d.flag}</span> {d.short}
              </span>
              <p className="absolute bottom-3 left-4 right-4 text-white font-display font-800 text-[19px] leading-tight">
                {d.name}
              </p>
            </div>
            <div className="p-5">
              <p className="text-[12.5px] font-700" style={{ color: d.tint }}>{d.tagline}</p>
              <p className="mt-2 text-[13px] text-[var(--ov-ink-soft)] leading-[1.65] line-clamp-3">{d.overview}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-700 text-[var(--ov-coral-deep)] group-hover:gap-2.5 transition-all">
                Learn More <OvIcon name="arrow" size={15} tint="var(--ov-coral-deep)" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Services                                                          */
/* --------------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="container-edge ov-section scroll-mt-24">
      <SectionHead eyebrow="Our Services" title={<>End-to-end support, <em>start to arrival.</em></>}
        sub="Eight services that cover everything between your first question and your first day on campus." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <div key={s.title} className="ov-glass ov-lift rounded-2xl p-5">
            <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.14), rgba(6,182,212,0.14))" }}>
              <OvIcon name={s.icon} size={22} tint="var(--ov-teal-deep)" />
            </span>
            <h3 className="ov-heading text-[15.5px] mt-3.5">{s.title}</h3>
            <p className="mt-2 text-[12.5px] text-[var(--ov-ink-soft)] leading-[1.65]">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Featured universities                                             */
/* --------------------------------------------------------------- */

function Universities() {
  // Duplicate the list once so the marquee loops seamlessly.
  const row = [...UNIVERSITIES, ...UNIVERSITIES];
  return (
    <section className="ov-section">
      <div className="container-edge">
        <SectionHead eyebrow="Featured Universities" title={<>Partnered with <em>world-class universities.</em></>}
          sub="A few of the leading universities our students join across our destinations." />
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="ov-marquee px-4">
          {row.map((u, i) => (
            <div key={`${u.name}-${i}`} className="ov-glass rounded-2xl px-6 py-5 min-w-[230px] flex items-center gap-3 shrink-0">
              <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.14), rgba(255,90,95,0.14))" }}>
                <OvIcon name="university" size={20} tint="var(--ov-violet)" />
              </span>
              <div className="leading-tight">
                <p className="font-display font-700 text-[14px] text-[var(--ov-ink)]">{u.name}</p>
                <p className="text-[12px] text-[var(--ov-ink-mute)]">{u.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Testimonials                                                      */
/* --------------------------------------------------------------- */

function Testimonials() {
  return (
    <section className="container-edge ov-section">
      <SectionHead eyebrow="Student Success Stories" title={<>Students who <em>made it abroad.</em></>}
        sub="Real outcomes from students EDUS Overseas guided to their dream destinations." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="ov-glass rounded-2xl p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <OvIcon key={s} name="star" size={16} tint="#FFB23E" />
              ))}
            </div>
            <p className="mt-4 text-[14px] text-[var(--ov-ink-soft)] leading-[1.75]">“{t.quote}”</p>
            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-[var(--ov-rule)]">
              <span className="inline-flex w-10 h-10 rounded-full items-center justify-center font-display font-800 text-white" style={{ background: "linear-gradient(135deg,#FF5A5F,#F59E0B)" }}>
                {t.destination.charAt(0)}
              </span>
              <div className="leading-tight">
                <p className="font-display font-700 text-[13.5px] text-[var(--ov-ink)]">{t.label}</p>
                <p className="text-[12px] text-[var(--ov-ink-mute)]">{t.destination}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Consultation form                                                 */
/* --------------------------------------------------------------- */

function Consultation() {
  return (
    <section id="consultation" className="container-edge ov-section scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="lg:pt-6">
          <p className="ov-eyebrow"><span className="ov-dot" />Free Consultation</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Book your <em>free consultation</em> today.
          </h2>
          <p className="mt-4 text-[15px] text-[var(--ov-ink-soft)] leading-relaxed max-w-lg">
            Tell us a little about yourself and a senior counsellor will help
            you choose the right country, course, and funding. No charge, no
            obligation, just clear expert advice.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Personalised country and course shortlist",
              "Scholarship and budget guidance",
              "Visa document checklist and timeline",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14px] text-[var(--ov-ink-soft)]">
                <span className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#14B8A6,#0E9488)" }}>
                  <OvIcon name="check" size={14} tint="#fff" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-7 ov-glass rounded-2xl p-4 flex items-center gap-3">
            <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center" style={{ background: "linear-gradient(135deg,#FF5A5F,#F59E0B)" }}>
              <OvIcon name="phone" size={20} tint="#fff" />
            </span>
            <div className="leading-tight">
              <p className="text-[12px] text-[var(--ov-ink-mute)]">Prefer to talk now? Call or WhatsApp</p>
              <a href={`tel:${OV.phoneTel}`} className="font-display font-800 text-[18px] text-[var(--ov-ink)]">{OV.phoneDisplay}</a>
            </div>
          </div>
        </div>

        <ConsultationForm />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* FAQ                                                               */
/* --------------------------------------------------------------- */

function Faq() {
  return (
    <section className="container-edge ov-section">
      <SectionHead eyebrow="Frequently Asked Questions" title={<>Study abroad, <em>answered simply.</em></>} />
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {PAGE_FAQ.map((f) => (
          <details key={f.q} className="ov-glass rounded-2xl p-5 group">
            <summary className="list-none flex items-center justify-between gap-3 cursor-pointer">
              <span className="font-display font-700 text-[14.5px] text-[var(--ov-ink)] leading-snug">{f.q}</span>
              <span aria-hidden className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-white text-[var(--ov-coral-deep)] text-[16px] font-700 shrink-0 group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-[13.5px] text-[var(--ov-ink-soft)] leading-[1.7]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Final CTA                                                         */
/* --------------------------------------------------------------- */

function FinalCta() {
  const waMessage = "Hi EDUS Overseas, I would like a free study abroad consultation.";
  return (
    <section className="container-edge ov-section">
      <div className="relative rounded-[36px] p-8 sm:p-14 overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #FF5A5F 0%, #F59E0B 55%, #14B8A6 130%)" }}>
        <div aria-hidden className="absolute inset-0 -z-0 opacity-30" style={{ background: "radial-gradient(600px 300px at 20% 0%, rgba(255,255,255,0.5), transparent 60%)" }} />
        <div className="relative">
          <p className="font-display font-700 text-[12px] tracking-[0.16em] uppercase text-white/90">From Dreams to Destinations</p>
          <h2 className="font-display font-800 text-white mt-4" style={{ fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.14 }}>
            Your future abroad starts with one conversation.
          </h2>
          <p className="mt-4 text-white/90 text-[15px] max-w-2xl mx-auto leading-relaxed">
            Talk to an EDUS Overseas counsellor today. Free, friendly, and built
            entirely around your goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#consultation" className="ov-btn ov-btn-white text-[15px]">Book Free Consultation</Link>
            <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className="ov-btn text-[15px]" style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
              <OvIcon name="whatsapp" size={18} tint="#fff" />
              Chat on WhatsApp
            </a>
            <a href={`tel:${OV.phoneTel}`} className="ov-btn text-[15px]" style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
              <OvIcon name="phone" size={16} tint="#fff" />
              {OV.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Shared section heading                                            */
/* --------------------------------------------------------------- */

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="ov-eyebrow justify-center"><span className="ov-dot" />{eyebrow}</p>
      <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>{title}</h2>
      {sub && <p className="mt-4 text-[15px] text-[var(--ov-ink-soft)] leading-relaxed">{sub}</p>}
    </div>
  );
}
