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
  type GalleryAlbum,
} from "@/components/gallery/GalleryData";
import { getPost } from "@/components/blog/BlogData";
import { siteUrl, hreflangAlternates } from "@/lib/siteUrl";

type Params = { slug: string };

export function generateStaticParams() {
  return PUBLISHED_ALBUMS.map((a) => ({ slug: a.slug }));
}

/**
 * Per-album metadata. Title length is capped at ~60 chars including the
 * EDUS suffix so it survives SERP truncation. We bypass the root layout's
 * "%s - EDUS" template via `title.absolute` to keep full control over
 * total length. Description capped at ~155 chars. Keywords are per-album.
 */
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album || album.draft) {
    return {
      title: { absolute: "Album not found - EDUS Gallery" },
      robots: { index: false },
    };
  }

  const cover = albumCover(album, 1200);
  // Compose the final SERP title without the root layout template suffix.
  // Pattern: "<album.title> - EDUS" when total length <= 60, otherwise
  // just the album title (which is already the recognisable phrase).
  const candidate = `${album.title} - EDUS`;
  const absoluteTitle = candidate.length <= 60 ? candidate : album.title;
  // Host-aware URLs - self-canonical to the served domain, hreflang lists
  // all 6 EDUS domains as regional variants for the same album.
  const url = await siteUrl(`/gallery/${album.slug}`);

  return {
    title: { absolute: absoluteTitle },
    description: album.description,
    alternates: {
      canonical: `/gallery/${album.slug}`,
      languages: hreflangAlternates(`/gallery/${album.slug}`),
    },
    keywords: album.keywords,
    openGraph: {
      title: album.title,
      description: album.description,
      type: "article",
      url,
      siteName: "EDUS Online Institute",
      publishedTime: album.datePublished,
      modifiedTime: album.dateModified ?? album.datePublished,
      images: [{ url: cover, width: 1200, height: 630, alt: album.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: album.title,
      description: album.description,
      images: [cover],
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

  // Resolve the optional related blog post once so we don't crash if the
  // referenced slug was retired without updating the album.
  const relatedBlog = album.relatedBlogSlug ? getPost(album.relatedBlogSlug) : undefined;

  // Cloudinary delivery URLs for the schema payload. We send the larger
  // 1600w variant so Google Images can request a high-quality crawl.
  // Each photo gets a contextual caption (album + position + location +
  // year) so the ImageObject nodes carry semantic, ranking-friendly text.
  const yearLabel = new Date(album.eventDate).getFullYear();
  const photoCaption = (i: number) => buildPhotoAlt(album, i, yearLabel);

  const schemaPhotos = album.photos.map((p, i) => ({
    url: cloudinaryUrl(p.publicId, { width: 1600 }),
    width: p.width,
    height: p.height,
    caption: p.alt ?? photoCaption(i),
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
          keywords: album.keywords,
          mentions: album.externalLinks?.map((l) => ({ name: l.label, url: l.url })),
          photos: schemaPhotos,
        })}
      />

      {/* VISIBLE BREADCRUMB - mirrors BreadcrumbList JSON-LD and helps both
          accessibility and SERP-style nav-cell rendering. */}
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
          <li>
            <Link href="/gallery" className="hover:text-[#2563EB] transition-colors">
              Gallery
            </Link>
          </li>
          <li aria-hidden className="text-[#B8C2D1]">/</li>
          <li className="text-[#102033] font-600 truncate max-w-[60vw] sm:max-w-none">
            {album.title}
          </li>
        </ol>
      </nav>

      {/* HEADER */}
      <section className="relative pt-4 pb-8 overflow-hidden">
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
            <span aria-hidden>-</span>
            <span>EDUS Online Institute</span>
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      {album.photos.length > 0 ? (
        <section className="relative pb-12 overflow-hidden">
          <div className="container-edge">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {album.photos.map((p, i) => {
                const altText = p.alt ?? photoCaption(i);
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
            <p className="mt-5 text-center text-[11.5px] text-[#5A6A82]">
              Photos © EDUS Online Institute. Tap any image to open the full-size version.
            </p>
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

      {/* RELATED BLOG POST - drives readers from event recap into evergreen
          editorial. Only renders when the album has a relatedBlogSlug. */}
      {relatedBlog ? (
        <section className="relative py-8 md:py-12 overflow-hidden">
          <div className="container-edge max-w-2xl mx-auto">
            <Link
              href={`/blog/${relatedBlog.slug}`}
              className="group block rounded-2xl border border-[rgba(16,32,51,0.10)] bg-white p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] transition hover:-translate-y-0.5"
            >
              <p
                className="font-display font-800 text-[10.5px] tracking-[0.16em] uppercase"
                style={{ color: relatedBlog.marketTint }}
              >
                Related guide - EDUS Blog
              </p>
              <h3 className="mt-2 font-display font-700 text-[18px] text-[#102033] leading-tight group-hover:text-[#2563EB] transition-colors">
                {relatedBlog.title}
              </h3>
              <p className="text-[13.5px] text-[#5A6A82] mt-2 leading-[1.6]">
                {relatedBlog.description}
              </p>
              <p className="mt-4 text-[11.5px] text-[#5A6A82] flex items-center gap-2">
                <span className="font-display font-700 text-[#102033]">
                  {relatedBlog.marketLabel}
                </span>
                <span aria-hidden>-</span>
                <span>{relatedBlog.readingMinutes} min read</span>
                <span aria-hidden className="ml-auto text-[#2563EB] font-700">
                  Read guide →
                </span>
              </p>
            </Link>
          </div>
        </section>
      ) : null}

      {/* MORE FROM EDUS - internal cross-links to commercial pages so this
          content-rich page passes link equity to the funnel. */}
      {album.internalLinks && album.internalLinks.length > 0 ? (
        <section className="relative py-8 md:py-12 overflow-hidden">
          <div className="container-edge max-w-3xl mx-auto">
            <h2 className="font-display font-700 text-[#102033] text-[20px] mb-4">
              More from EDUS
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {album.internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30"
                  >
                    <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                      {link.label}
                      <span aria-hidden className="text-[#2563EB]">→</span>
                    </p>
                    <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                      {link.context}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* REFERENCES - outbound authority links. Builds topical trust for
          E-E-A-T. Uses rel="noopener" (no "nofollow") for trusted partners. */}
      {album.externalLinks && album.externalLinks.length > 0 ? (
        <section className="relative py-8 md:py-12 overflow-hidden">
          <div className="container-edge max-w-3xl mx-auto">
            <h2 className="font-display font-700 text-[#102033] text-[20px] mb-4">
              References & partners
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {album.externalLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-[rgba(16,32,51,0.10)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#2563EB]/30"
                  >
                    <p className="font-display font-700 text-[14px] text-[#102033] group-hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                      {link.label}
                      <span aria-hidden className="text-[#2563EB]">↗</span>
                    </p>
                    <p className="text-[12.5px] text-[#5A6A82] mt-1 leading-[1.5]">
                      {link.context}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

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
 * Build a contextual alt for one photo in the album. The pattern is
 *   "<album title> - photo <n> of <total> - <location> - <year>"
 * which gives the photo a real semantic anchor (event + place + time)
 * rather than the bare "photo N" we shipped initially. This is the alt
 * Google Images indexes against, so it directly affects discoverability.
 */
function buildPhotoAlt(album: GalleryAlbum, i: number, year: number): string {
  const parts = [
    album.title,
    `photo ${i + 1} of ${album.photos.length}`,
    album.location,
    String(year),
  ].filter(Boolean) as string[];
  return parts.join(" - ");
}

/**
 * EDUS internal hosts - any of these triggers an in-tab anchor instead
 * of opening a new tab. Covers all 6 production domains + the Vercel
 * preview URL so dev/preview environments behave the same.
 */
const INTERNAL_HOST_RE =
  /^https:\/\/(?:www\.)?(?:edustutor\.com|edus\.edu\.lk|edus\.lk|edusmainwebsite\.vercel\.app)\//;

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
        // Treat any of the 6 EDUS domains as in-site so blog/gallery body
        // text links don't open a new tab between domain variants.
        const isInternal = INTERNAL_HOST_RE.test(piece);
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
