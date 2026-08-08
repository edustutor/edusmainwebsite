/**
 * Status FAQ - server component, no client JS.
 *
 * Renders as native <details> so the questions and answers are in the
 * server HTML (crawlers and AI engines read them) and stay collapsible
 * without JavaScript. The `faq` class on the section matches the
 * speakable selectors in the FAQPage structured data. The item list is
 * passed in from the page so the visible text and the schema never drift.
 */
export function StatusFaq({ items }: { items: { q: string; a: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="faq container-edge pb-16">
      <h2 className="font-display font-700 text-[#102033] text-[clamp(20px,2.4vw,28px)] mb-5 text-center">
        Status FAQ
      </h2>
      <div className="space-y-3 max-w-3xl mx-auto">
        {items.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="group glass rounded-[16px] px-5 md:px-6 py-4"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-display font-600 text-[15px] text-[#102033]">
              {f.q}
              <span className="shrink-0 text-[#2563EB] transition-transform duration-200 group-open:rotate-180">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-[#2B3950] text-[14px] leading-[1.7]">
              {linkifyAnswer(f.a)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Turn plain email and phone strings in an answer into mailto / tel links.
// Answers stay plain text in the shared array (so the FAQPage schema keeps
// clean text); only the visible render gets clickable links.
function linkifyAnswer(text: string) {
  const pattern = /([\w.+-]+@[\w.-]+\.\w+|\+\d[\d\s]{6,}\d)/g;
  return text.split(pattern).map((part, i) => {
    if (!part) return null;
    if (/^[\w.+-]+@[\w.-]+\.\w+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[#2563EB] hover:underline font-600"
        >
          {part}
        </a>
      );
    }
    if (/^\+\d[\d\s]{6,}\d$/.test(part)) {
      return (
        <a
          key={i}
          href={`tel:${part.replace(/\s+/g, "")}`}
          className="text-[#2563EB] hover:underline font-600"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
