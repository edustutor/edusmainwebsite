import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  galleryItemList,
  speakableWebPage,
} from "@/components/layout/StructuredData";
import { PUBLISHED_ALBUMS, albumCover } from "@/components/gallery/GalleryData";
import { siteUrl, hreflangAlternates } from "@/lib/siteUrl";

/**
 * Host-aware metadata. Each of the 6 EDUS domains gets a self-canonical
 * pointing at its own /gallery URL, plus shared hreflang alternates so
 * Google understands the regional variants.
 */
export async function generateMetadata(): Promise<Metadata> {
  const url = await siteUrl("/gallery");
  const ogImage = await siteUrl("/edus-og.jpg");
  return {
    title: { absolute: "EDUS Gallery - Events, Awards & Milestone Photos" },
    description:
      "Browse EDUS Online Institute event albums - National ICT Award win, Jaffna office openings, Slingshot Demo Day, anniversaries, and community photos.",
    alternates: {
      canonical: "/gallery",
      languages: hreflangAlternates("/gallery"),
    },
    keywords: [
      "EDUS gallery",
      "EDUS Online Institute photos",
      "EDUS event albums",
      "EDUS milestones",
      "EDUS National ICT Award",
      "EDUS Jaffna office opening",
      "EDUS Yarl Ventures office",
      "Slingshot Sri Lanka accelerator",
      "Hemas Hatch Slingshot",
      "SLASSCOM Xcellerate",
      "Yarl IT Hub Innovation Festival",
      "Yarl Geek Challenge",
      "ICTA Spiralation finalist",
      "Sri Lanka edtech awards",
      "online tuition institute Sri Lanka",
      "EDUS community photos Jaffna",
    ],
    openGraph: {
      title: "EDUS Gallery - Events, Awards & Milestone Photos",
      description:
        "Browse EDUS event albums - awards, office openings, accelerator demos, and community photos from 2021 onwards.",
      type: "website",
      url,
      siteName: "EDUS Online Institute",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "EDUS Gallery" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "EDUS Gallery - Events, Awards & Milestone Photos",
      description:
        "EDUS event albums - awards, office openings, accelerator demos, and anniversary photos.",
      images: [ogImage],
    },
  };
}

export default function GalleryIndexPage() {
  const albums = PUBLISHED_ALBUMS;

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "EDUS Gallery - Events, Awards & Milestones Photo Albums",
          headline: "EDUS Gallery",
          description:
            "Photo albums from EDUS Online Institute - office openings, awards, anniversaries, and community events.",
          path: "/gallery",
        })}
      />
      {albums.length > 0 && (
        <JsonLdScript
          data={galleryItemList(
            albums.map((a) => ({
              slug: a.slug,
              title: a.title,
              description: a.description,
              datePublished: a.datePublished,
              cover: albumCover(a, 1200),
            })),
          )}
        />
      )}

      {/* VISIBLE BREADCRUMB - matches the JSON-LD BreadcrumbList for SERP
          + accessibility. */}
      <nav
        aria-label="Breadcrumb"
        className="container-edge pt-28 sm:pt-32 pb-2"
      >
        <ol className="flex items-center gap-2 text-[12.5px] text-[#5A6A82] font-display">
          <li>
            <Link href="/" className="hover:text-[#2563EB] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-[#B8C2D1]">/</li>
          <li className="text-[#102033] font-600">Gallery</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative pt-4 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#06B6D4", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />EDUS Gallery</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Milestones, awards, and <em>moments</em>.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            A visual record of the EDUS journey - office openings, national award wins,
            accelerator demos, anniversaries, and the community events that shaped the team.
          </p>
        </div>
      </section>

      {/* SEO COPY BLOCK - gives Google + AEO crawlers a textual anchor
          beyond the album cards. Mentions partner orgs by name so the
          index page ranks for branded combinations like
          "EDUS SLASSCOM Xcellerate" and "EDUS Slingshot demo day". */}
      <section className="relative pb-4 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto text-[#2B3950] text-[15px] leading-[1.75] space-y-4">
          <p>
            Since 2021, EDUS Online Institute has been recognised across Sri Lanka&apos;s
            education and technology ecosystem. The pages below document each milestone
            with photos and a short editorial recap - including our{" "}
            <Link href="/gallery/edus-wins-national-ict-award-education" className="text-[#2563EB] hover:underline">
              National ICT Award 2024 win in Education
            </Link>
            , the{" "}
            <Link href="/gallery/edus-yarl-ventures-jaffna-office-opening" className="text-[#2563EB] hover:underline">
              EDUS &amp; Yarl Ventures Jaffna front office opening
            </Link>
            , our{" "}
            <Link href="/gallery/edus-slingshot-accelerator-demo-day" className="text-[#2563EB] hover:underline">
              Slingshot Accelerator Demo Day pitch
            </Link>
            , and{" "}
            <Link href="/gallery/edus-slasscom-xcellerate-2023" className="text-[#2563EB] hover:underline">
              SLASSCOM Xcellerate 2023
            </Link>
            .
          </p>
          <p>
            EDUS partners and event hosts featured in these albums include{" "}
            <a href="https://www.yarlventures.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              Yarl Ventures
            </a>
            ,{" "}
            <a href="https://slasscom.lk/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              SLASSCOM
            </a>
            ,{" "}
            <a href="https://hatch.lk/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              Hatch
            </a>
            ,{" "}
            <a href="https://www.hemas.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              Hemas Holdings
            </a>
            ,{" "}
            <a href="https://www.icta.lk/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              ICTA Sri Lanka
            </a>
            , and{" "}
            <a href="https://yarlithub.org/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              Yarl IT Hub
            </a>
            .
          </p>
        </div>
      </section>

      {/* ALBUMS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          {albums.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[15.5px] text-[#5A6A82]">
                No albums published yet. Check back soon.
              </p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {albums.map((a) => {
                const cover = albumCover(a, 800);
                const dateLabel = new Date(a.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                const year = new Date(a.eventDate).getFullYear();
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/gallery/${a.slug}`}
                      className="group block bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full relative transition hover:-translate-y-0.5"
                    >
                      {/* Cover image */}
                      <div className="relative aspect-[16/10] bg-[#F6F8FB] overflow-hidden">
                        <Image
                          src={cover}
                          alt={`${a.title} - cover photo, ${a.location ?? "Sri Lanka"}, ${year}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition group-hover:scale-105"
                        />
                        <span
                          aria-hidden
                          className="absolute top-0 left-0 h-1 w-full"
                          style={{ background: a.tint }}
                        />
                        <span
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-display font-700 uppercase tracking-[0.08em] text-white"
                          style={{ background: `${a.tint}E6` }}
                        >
                          {a.category}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="p-5 md:p-6">
                        <h2 className="font-display font-700 text-[16px] text-[#102033] leading-tight group-hover:text-[#2563EB] transition-colors">
                          {a.title}
                        </h2>
                        <p className="text-[13px] text-[#5A6A82] mt-2 leading-[1.6] line-clamp-2">
                          {a.cardSubtitle}
                        </p>
                        <p className="mt-4 text-[11.5px] text-[#5A6A82] flex items-center gap-2 flex-wrap">
                          <time dateTime={a.eventDate}>{dateLabel}</time>
                          {a.location ? (
                            <>
                              <span aria-hidden>-</span>
                              <span>{a.location}</span>
                            </>
                          ) : null}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* RELATED EXPLORE - drives traffic from the gallery index into
          the commercial market pages + the editorial blog. */}
      <section className="relative pb-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <h2 className="font-display font-700 text-[#102033] text-[20px] mb-4">
            More to explore on EDUS
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <li>
              <Link href="/sl" className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30">
                <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                  Sri Lanka classes <span aria-hidden className="text-[#2563EB]">→</span>
                </p>
                <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                  Online tuition for Grade 1-13 and G.C.E. exams.
                </p>
              </Link>
            </li>
            <li>
              <Link href="/in" className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30">
                <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                  India CBSE classes <span aria-hidden className="text-[#2563EB]">→</span>
                </p>
                <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                  CBSE-aligned tutoring for Tamil-Nadu and CBSE students.
                </p>
              </Link>
            </li>
            <li>
              <Link href="/mv" className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30">
                <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                  Maldives Cambridge <span aria-hidden className="text-[#2563EB]">→</span>
                </p>
                <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                  Cambridge IGCSE & O-Level support for Maldivian students.
                </p>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30">
                <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                  EDUS Blog <span aria-hidden className="text-[#2563EB]">→</span>
                </p>
                <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                  Exam-prep guides, parent advice, and syllabus articles.
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
