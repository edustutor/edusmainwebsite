import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLdScript,
  breadcrumbList,
  blogPosting,
} from "@/components/layout/StructuredData";
import { PUBLISHED_POSTS, getPost } from "@/components/blog/BlogData";

type Params = { slug: string };

export function generateStaticParams() {
  return PUBLISHED_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) {
    return { title: "Post not found · EDUS", robots: { index: false } };
  }
  return {
    title: `${post.title} · EDUS Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author.name],
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLdScript
        data={blogPosting({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: post.author,
          image: post.image,
        })}
      />

      {/* HEADER */}
      <section className="relative pt-32 sm:pt-36 pb-8 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 380, height: 380, background: post.marketTint, opacity: 0.18 }} />
        </div>
        <div className="container-edge max-w-3xl mx-auto">
          <p
            className="font-display font-800 text-[11px] tracking-[0.16em] uppercase text-center"
            style={{ color: post.marketTint }}
          >
            {post.marketLabel} · EDUS Blog
          </p>
          <h1 className="heading mt-3 text-center" style={{ fontSize: "var(--fs-display)" }}>
            {post.title}
          </h1>
          <p className="text-[#2B3950] text-[16px] mt-5 leading-[1.65] text-center max-w-2xl mx-auto">
            {post.description}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[12.5px] text-[#5A6A82]">
            <span className="font-display font-700 text-[#102033]">{post.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="relative pb-12 md:pb-20 overflow-hidden">
        <div className="container-edge max-w-2xl mx-auto text-[#2B3950] text-[15.5px] leading-[1.8] space-y-5">
          {post.body.map((para, i) => {
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
                {para}
              </p>
            );
          })}
        </div>
      </article>

      {/* FOOTER CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto">
          <div
            className="rounded-[28px] p-8 md:p-10 text-center"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}
          >
            <h2 className="heading" style={{ fontSize: "24px", color: "#fff" }}>
              Ready to start learning with EDUS?
            </h2>
            <p className="mt-3 text-[14.5px] text-white/85 leading-[1.65] max-w-xl mx-auto">
              Talk to the EDUS team to find the right class, tutor, or syllabus for your child.
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
              <Link href="/blog" className="btn btn-ghost">
                More posts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
