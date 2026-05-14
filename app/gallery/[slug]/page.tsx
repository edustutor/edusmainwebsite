import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLdScript,
  breadcrumbList,
  galleryAlbumSchema,
} from "@/components/layout/StructuredData";
import {
  PUBLISHED_ALBUMS,
  getAlbum,
  cloudinaryUrl,
  albumCover,
} from "@/components/gallery/GalleryData";

type Params = { slug: string };

export function generateStaticParams() {
  return PUBLISHED_ALBUMS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album || album.draft) {
    return { title: "Album not found - EDUS Gallery", robots: { index: false } };
  }

  const cover = albumCover(album, 1200);
  return {
    title: `${album.title} - EDUS Gallery`,
    description: album.description,
    alternates: { canonical: `/gallery/${album.slug}` },
    openGraph: {
      title: album.title,
      description: album.description,
      type: "article",
      publishedTime: album.datePublished,
      modifiedTime: album.dateModified ?? album.datePublished,
      images: [{ url: cover, width: 1200, height: 630, alt: album.title }],
    },
  };
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album || album.draft) notFound();

  // Pre-compute the related-album list (max 3, excluding the current).
  const related = PUBLISHED_ALBUMS.filter((a) => a.slug !== album.slug).slice(0, 3);

  // Cloudinary delivery URLs for the schema payload. We send the larger
  // 1600w variant so Google Images can request a high-quality crawl.
  const schemaPhotos = album.photos.map((p) => ({
    url: cloudinaryUrl(p.publicId, { width: 1600 }),
    width: p.width,
    height: p.height,
    caption: p.alt,
  }));

  const eventDateLabel = new Date(album.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
          { name: album.title, path: `/gallery/${album.slug}` },
        ])}
      />
      <JsonLdScript
        data={galleryAlbumSchema({
          title: album.title,
          description: album.description,
          slug: album.slug,
          datePublished: album.datePublished,
          dateModified: album.dateModified,
          eventDate: album.eventDate,
          location: album.location,
          photos: schemaPhotos,
        })}
      />

      {/* HEADER */}
      <section className="relative pt-32 sm:pt-36 pb-8 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="blob"
            style={{
              top: "-8%",
              left: "-8%",
              width: 380,
              height: 380,
              background: album.tint,
              opacity: 0.18,
            }}
          />
        </div>
        <div className="container-edge max-w-3xl mx-auto">
          <p
            className="font-display font-800 text-[11px] tracking-[0.16em] uppercase text-center"
            style={{ color: album.tint }}
          >
            {album.category} - EDUS Gallery
          </p>
          <h1 className="heading mt-3 text-center" style={{ fontSize: "var(--fs-display)" }}>
            {album.title}
          </h1>
          <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.65] text-center max-w-2xl mx-auto">
            {album.description}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[12.5px] text-[#5A6A82] flex-wrap">
            <time
              dateTime={album.eventDate}
              className="font-display font-700 text-[#102033]"
            >
              {eventDateLabel}
            </time>
            {album.location ? (
              <>
                <span aria-hidden>-</span>
                <span>{album.location}</span>
              </>
            ) : null}
            <span aria-hidden>-</span>
            <span>{album.photos.length} photos</span>
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      {album.photos.length > 0 ? (
        <section className="relative pb-12 overflow-hidden">
          <div className="container-edge">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {album.photos.map((p, i) => {
                const altText = p.alt ?? `${album.title} - photo ${i + 1}`;
                const previewUrl = cloudinaryUrl(p.publicId, { width: 800 });
                const fullUrl = cloudinaryUrl(p.publicId, { width: 1800 });
                return (
                  <li key={p.publicId}>
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-square rounded-xl overflow-hidden bg-[#F6F8FB] border border-[rgba(16,32,51,0.08)] shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
                      aria-label={`Open ${altText} in full size`}
                    >
                      <Image
                        src={previewUrl}
                        alt={altText}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : (
        <section className="relative pb-12 overflow-hidden">
          <div className="container-edge max-w-2xl mx-auto text-center">
            <p className="text-[14px] text-[#5A6A82] leading-[1.65]">
              Photos for this album are being uploaded. Check back shortly.
            </p>
          </div>
        </section>
      )}

      {/* BODY */}
      <article className="relative py-8 md:py-12 overflow-hidden">
        <div className="container-edge max-w-2xl mx-auto text-[#2B3950] text-[15.5px] leading-[1.8] space-y-5">
          {album.body.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-display font-700 text-[#102033] text-[22px] leading-[1.3] mt-8 mb-2"
                >
                  {para.replace(/^## /, "")}
                </h2>
              );
            }
            if (para.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="font-display font-700 text-[#102033] text-[17px] leading-[1.4] mt-5 mb-1"
                >
                  {para.replace(/^### /, "")}
                </h3>
              );
            }
            return (
              <p key={i} className="leading-[1.8]">
                {renderInline(para)}
              </p>
            );
          })}
        </div>
      </article>

      {/* RELATED ALBUMS */}
      {related.length > 0 ? (
        <section className="relative py-12 overflow-hidden">
          <div className="container-edge">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow">
                <span className="dot" />More from EDUS Gallery
              </p>
              <h2 className="heading mt-3" style={{ fontSize: "26px" }}>
                Other albums you might like.
              </h2>
            </div>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => {
                const cover = albumCover(r, 800);
                return (
                  <li key={r.slug}>
                    <Link
                      href={`/gallery/${r.slug}`}
                      className="group block bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full transition hover:-translate-y-0.5"
                    >
                      <div className="relative aspect-[16/10] bg-[#F6F8FB] overflow-hidden">
                        <Image
                          src={cover}
                          alt={`${r.title} - cover photo`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition group-hover:scale-105"
                        />
                        <span
                          aria-hidden
                          className="absolute top-0 left-0 h-1 w-full"
                          style={{ background: r.tint }}
                        />
                      </div>
                      <div className="p-5">
                        <p
                          className="font-display font-800 text-[10.5px] tracking-[0.12em] uppercase"
                          style={{ color: r.tint }}
                        >
                          {r.category}
                        </p>
                        <h3 className="mt-2 font-display font-700 text-[15px] text-[#102033] leading-tight group-hover:text-[#2563EB] transition-colors">
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FOOTER CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto">
          <div
            className="rounded-[28px] p-8 md:p-10 text-center"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}
          >
            <h2 className="heading" style={{ fontSize: "24px", color: "#fff" }}>
              Want to be part of the next chapter?
            </h2>
            <p className="mt-3 text-[14.5px] text-white/85 leading-[1.65] max-w-xl mx-auto">
              Whether you are a student, parent, or tutor - EDUS is built around the community
              you see in these photos. Get in touch and join the next milestone.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://signup.edustutor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                Register Now
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Contact EDUS
              </Link>
              <Link href="/gallery" className="btn btn-ghost">
                More albums
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Render a body paragraph with two inline marks:
 *   - **bold** → <strong>
 *   - https://... → <a>
 *
 * Mirrors the renderInline used on /blog/[slug] so the body voice stays
 * consistent across editorial pages.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const boldSplit = text.split(/(\*\*[^*]+\*\*)/g);
  let key = 0;

  for (const seg of boldSplit) {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      parts.push(
        <strong key={key++} className="font-display font-700 text-[#102033]">
          {seg.slice(2, -2)}
        </strong>,
      );
      continue;
    }
    const urlSplit = seg.split(/(https?:\/\/[^\s)]+)/g);
    for (const piece of urlSplit) {
      if (/^https?:\/\//.test(piece)) {
        const isInternal = piece.startsWith("https://edustutor.com/");
        parts.push(
          <a
            key={key++}
            href={piece}
            {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="text-[#2563EB] hover:underline break-words"
          >
            {piece}
          </a>,
        );
        continue;
      }
      parts.push(<span key={key++}>{piece}</span>);
    }
  }

  return parts;
}
