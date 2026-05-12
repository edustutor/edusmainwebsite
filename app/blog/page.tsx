import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  blogItemList,
  speakableWebPage,
} from "@/components/layout/StructuredData";
import { PUBLISHED_POSTS } from "@/components/blog/BlogData";

export const metadata = {
  title: "EDUS Blog - Online Tuition Guides, Exam Prep & Parent Advice",
  description:
    "Learning guides, exam prep tips, and parent advice from the EDUS Academic Team. Covering Sri Lanka, India CBSE, Maldives Cambridge, and global online tutoring.",
  alternates: { canonical: "/blog" },
  keywords: [
    "EDUS blog",
    "online tuition blog",
    "exam preparation guides",
    "Grade 5 scholarship preparation",
    "O/L exam tips",
    "A/L exam tips",
    "CBSE Class 10 study guide",
    "Cambridge IGCSE guide",
    "Edexcel IGCSE comparison",
    "online learning advice for parents",
    "Sri Lanka tuition blog",
    "India CBSE study tips",
    "Maldives Cambridge IGCSE",
  ],
};

export default function BlogIndexPage() {
  const posts = PUBLISHED_POSTS;

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "EDUS Blog - Online Tuition Guides, Exam Prep & Parent Advice",
          headline: "EDUS Blog",
          description:
            "Learning guides, exam prep tips, and parent advice from the EDUS Academic Team.",
          path: "/blog",
        })}
      />
      {posts.length > 0 && (
        <JsonLdScript
          data={blogItemList(
            posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description }))
          )}
        />
      )}

      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />EDUS Blog</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Guides, exam prep, and <em>parent advice</em>.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Practical articles from the EDUS Academic Team covering Sri Lanka National Syllabus,
            India CBSE, Maldives Cambridge IGCSE, and global online tutoring pathways.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          {posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[15.5px] text-[#5A6A82]">
                No posts published yet. Check back soon.
              </p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full overflow-hidden relative transition hover:-translate-y-0.5"
                  >
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                      style={{ background: p.marketTint }}
                    />
                    <p
                      className="font-display font-800 text-[11px] tracking-[0.16em] uppercase"
                      style={{ color: p.marketTint }}
                    >
                      {p.marketLabel}
                    </p>
                    <h2 className="mt-2 font-display font-700 text-[17px] text-[#102033] leading-tight group-hover:text-[#2563EB] transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-[13.5px] text-[#5A6A82] mt-3 leading-[1.65] line-clamp-3">
                      {p.description}
                    </p>
                    <p className="mt-4 text-[11.5px] text-[#5A6A82] flex items-center gap-2">
                      <time dateTime={p.datePublished}>
                        {new Date(p.datePublished).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <span aria-hidden>-</span>
                      <span>{p.readingMinutes} min read</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
