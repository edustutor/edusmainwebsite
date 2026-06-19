import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/layout/StructuredData";
import { OvIcon } from "@/components/overseas/OvIcon";
import { OV, DESTINATIONS, SERVICES, getDestination, whatsappUrl } from "@/lib/overseas/data";
import {
  overseasOrganization,
  overseasBreadcrumb,
  overseasFaq,
  destinationService,
} from "@/lib/overseas/schema";

/**
 * EDUS Overseas - per-destination landing page (UK, Australia, Canada,
 * Dubai, Ireland, New Zealand). Deep-SEO pages targeting "study in <X>
 * from Sri Lanka". Data is read from lib/overseas/data.ts so the cards,
 * footer, and these pages never drift.
 *
 * Static params are generated for all six destinations; any other slug
 * 404s (no surprise pages).
 */

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ country: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const d = getDestination(country);
  if (!d) return {};

  const title = `Study in ${d.name} from Sri Lanka | EDUS Overseas`;
  const description = `${d.overview} Free guidance on universities, scholarships, and the ${d.name} student visa with EDUS Overseas Consultancy.`;

  return {
    metadataBase: new URL(OV.siteBase),
    title,
    description,
    alternates: { canonical: `/overseas/${d.slug}` },
    keywords: [
      `study in ${d.name} from Sri Lanka`,
      `study in ${d.short} from Sri Lanka`,
      `${d.name} student visa Sri Lanka`,
      `${d.name} universities for Sri Lankan students`,
      `${d.name} scholarships Sri Lanka`,
      `how to study in ${d.short}`,
      `${d.short} study abroad consultants Sri Lanka`,
      `cost of studying in ${d.short}`,
      "EDUS Overseas",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${OV.siteBase}/overseas/${d.slug}`,
      siteName: OV.brand,
      images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: d.imageAlt }],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const d = getDestination(country);
  if (!d) notFound();

  const others = DESTINATIONS.filter((x) => x.slug !== d.slug);
  const waMessage = `Hi EDUS Overseas, I would like a free consultation about studying in ${d.name}.`;

  const faq = [
    {
      q: `How can I study in ${d.name} from Sri Lanka?`,
      a: `EDUS Overseas guides you end to end: we shortlist the right ${d.name} universities and courses for your profile, prepare and submit your applications, help with scholarships, and support your ${d.name} student visa and pre-departure. Book a free consultation to start.`,
    },
    {
      q: `What are the intakes for ${d.name}?`,
      a: `${d.name} intakes: ${d.intakes}. We help you plan your application around the next available intake so you do not miss deadlines.`,
    },
    {
      q: `Can I work after studying in ${d.name}?`,
      a: d.workRights,
    },
    {
      q: `Does EDUS Overseas help with ${d.name} scholarships?`,
      a: `Yes. We identify the ${d.name} scholarships and funding you qualify for and help you apply correctly to improve your chances.`,
    },
  ];

  return (
    <>
      <JsonLdScript data={overseasOrganization()} />
      <JsonLdScript data={destinationService({
        name: d.name,
        country: d.name,
        path: `/overseas/${d.slug}`,
        description: `${d.overview} EDUS Overseas offers free guidance on ${d.name} universities, scholarships, and the student visa for Sri Lankan students.`,
      })} />
      <JsonLdScript data={overseasBreadcrumb([
        { name: "Home", path: "/overseas" },
        { name: `Study in ${d.short}`, path: `/overseas/${d.slug}` },
      ])} />
      <JsonLdScript data={overseasFaq(faq)} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-2">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="ov-blob" style={{ top: "-8%", left: "-6%", width: 360, height: 360, background: d.tint, opacity: 0.22 }} />
          <span className="ov-blob" style={{ bottom: "-10%", right: "-8%", width: 320, height: 320, background: "#14B8A6", opacity: 0.14 }} />
        </div>
        <div className="container-edge grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="text-[12.5px] text-[var(--ov-ink-mute)] mb-4">
              <Link href="/overseas" className="hover:text-[var(--ov-coral-deep)]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ov-ink-soft)] font-600">Study in {d.short}</span>
            </nav>
            <p className="ov-eyebrow"><span className="ov-dot" />{d.flag} {d.name}</p>
            <h1 className="ov-heading mt-4" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.06 }}>
              Study in <em>{d.name}</em> from Sri Lanka
            </h1>
            <p className="mt-5 text-[16px] text-[var(--ov-ink-soft)] leading-relaxed max-w-xl">{d.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/overseas#consultation" className="ov-btn ov-btn-primary text-[15px]">Book Free Consultation</Link>
              <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className="ov-btn ov-btn-teal text-[15px]">
                <OvIcon name="whatsapp" size={18} tint="#fff" />
                Ask about {d.short}
              </a>
            </div>
          </div>
          <div className="ov-glass-strong rounded-[28px] p-3 ov-zoom overflow-hidden">
            {/* USER-GENERATED IMAGE: /public/overseas/destinations/<slug>.webp */}
            <img src={d.image} alt={d.imageAlt} width={640} height={460} className="w-full h-auto rounded-[22px] object-cover" loading="eager" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-edge ov-section">
        <div className="text-center max-w-2xl mx-auto">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />Why {d.short}</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>Why study in <em>{d.name}?</em></h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {d.highlights.map((h) => (
            <div key={h} className="ov-glass ov-lift rounded-2xl p-5 flex items-start gap-3">
              <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center shrink-0" style={{ background: d.tint }}>
                <OvIcon name="check" size={18} tint="#fff" />
              </span>
              <p className="text-[14px] text-[var(--ov-ink-soft)] leading-[1.6]">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick facts */}
      <section className="container-edge ov-section">
        <div className="grid gap-4 sm:grid-cols-3">
          <FactCard icon="course" title="Popular courses" lines={d.popularCourses} tint="#FF5A5F" />
          <FactCard icon="counsellor" title="Intakes" lines={[d.intakes]} tint="#14B8A6" />
          <FactCard icon="visa" title="Work after study" lines={[d.workRights]} tint="#7C3AED" />
        </div>
      </section>

      {/* How EDUS helps */}
      <section className="container-edge ov-section">
        <div className="ov-glass-strong rounded-[28px] p-8 sm:p-10">
          <h2 className="ov-heading text-center" style={{ fontSize: "var(--fs-display)" }}>
            How EDUS helps you reach <em>{d.short}</em>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 8).map((s) => (
              <div key={s.title} className="flex items-start gap-3">
                <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.16), rgba(6,182,212,0.16))" }}>
                  <OvIcon name={s.icon} size={18} tint="var(--ov-teal-deep)" />
                </span>
                <div>
                  <p className="font-display font-700 text-[13.5px] text-[var(--ov-ink)]">{s.title}</p>
                  <p className="text-[12px] text-[var(--ov-ink-mute)] leading-[1.5] mt-0.5">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-edge ov-section">
        <div className="text-center max-w-2xl mx-auto">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />FAQ</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>Studying in {d.short}, <em>answered.</em></h2>
        </div>
        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {faq.map((f) => (
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

      {/* Other destinations */}
      <section className="container-edge ov-section">
        <div className="text-center max-w-2xl mx-auto">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />Explore More</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>Other <em>destinations.</em></h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {others.map((o) => (
            <Link key={o.slug} href={`/overseas/${o.slug}`} className="ov-glass ov-lift rounded-2xl p-5 text-center">
              <span className="text-[28px] leading-none">{o.flag}</span>
              <p className="mt-3 font-display font-700 text-[14px] text-[var(--ov-ink)]">{o.short}</p>
              <p className="text-[11.5px] text-[var(--ov-ink-mute)] mt-0.5">Study in {o.short}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge ov-section">
        <div className="relative rounded-[36px] p-8 sm:p-12 overflow-hidden text-center" style={{ background: `linear-gradient(135deg, ${d.tint} 0%, #F59E0B 75%, #14B8A6 140%)` }}>
          <h2 className="font-display font-800 text-white" style={{ fontSize: "clamp(24px,2.8vw,36px)", lineHeight: 1.16 }}>
            Ready to study in {d.name}?
          </h2>
          <p className="mt-3 text-white/90 text-[15px] max-w-xl mx-auto">
            Get a free, personalised plan for your {d.name} application today.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/overseas#consultation" className="ov-btn ov-btn-white text-[15px]">Book Free Consultation</Link>
            <a href={`tel:${OV.phoneTel}`} className="ov-btn text-[15px]" style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
              <OvIcon name="phone" size={16} tint="#fff" />
              {OV.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function FactCard({ icon, title, lines, tint }: { icon: string; title: string; lines: string[]; tint: string }) {
  return (
    <div className="ov-glass rounded-2xl p-6">
      <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center" style={{ background: tint }}>
        <OvIcon name={icon} size={22} tint="#fff" />
      </span>
      <p className="font-display font-700 text-[14px] text-[var(--ov-ink)] mt-3.5">{title}</p>
      {lines.length === 1 ? (
        <p className="mt-1.5 text-[13px] text-[var(--ov-ink-soft)] leading-[1.6]">{lines[0]}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {lines.map((l) => (
            <li key={l} className="text-[12.5px] text-[var(--ov-ink-soft)] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tint }} />
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
