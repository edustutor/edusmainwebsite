import Image from "next/image";
import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  galleryItemList,
  speakableWebPage,
} from "@/components/layout/StructuredData";
import { PUBLISHED_ALBUMS, albumCover } from "@/components/gallery/GalleryData";

export const metadata = {
  title: "EDUS Gallery - Events, Awards & Milestones Photo Albums",
  description:
    "Photo albums from EDUS Online Institute - office openings, national awards, anniversary celebrations, accelerator demo days, and community events from 2021 onwards.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "EDUS gallery",
    "EDUS event photos",
    "EDUS milestones",
    "EDUS National ICT Award",
    "EDUS Jaffna office opening",
    "EDUS Yarl Ventures",
    "EDUS Slingshot accelerator",
    "EDUS Spiralation finalist",
    "EDUS anniversary photos",
    "EDUS community events",
    "Yarl IT Hub Innovation Festival",
    "online tuition institute Sri Lanka",
  ],
};

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

      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
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
                          alt={`${a.title} - cover photo`}
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
    </>
  );
}
