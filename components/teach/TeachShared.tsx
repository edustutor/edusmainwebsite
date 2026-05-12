"use client";
import Link from "next/link";

export const APPLY_URL = "https://forms.fillout.com/t/92n3HmsvkKus";

/* --------------------------------------------------------------- */
/* Reusable section header                                          */
/* --------------------------------------------------------------- */
export function SectionHead({
  eyebrow,
  title,
  emphasis,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "max-w-3xl mx-auto text-center"
          : "max-w-3xl"
      }
    >
      <p className="eyebrow"><span className="dot" />{eyebrow}</p>
      <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
        {title}
        {emphasis ? (
          <>
            {" "}
            <em>{emphasis}</em>
          </>
        ) : null}
      </h2>
      {body ? (
        <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">{body}</p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Primary + secondary CTA row used across sections                 */
/* --------------------------------------------------------------- */
export function ApplyCtaRow({
  align = "center",
  secondaryHref = "#requirements",
  secondaryLabel = "Tutor Requirements",
}: {
  align?: "left" | "center";
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div
      className={`mt-8 flex flex-wrap gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <a
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Apply to Teach with EDUS
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {secondaryHref.startsWith("/") ? (
        <Link href={secondaryHref} className="btn btn-yellow">{secondaryLabel}</Link>
      ) : (
        <a href={secondaryHref} className="btn btn-yellow">{secondaryLabel}</a>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Plain feature card                                               */
/* --------------------------------------------------------------- */
export function PlainCard({
  icon, title, body, tint = "#2563EB",
}: {
  icon: string;
  title: string;
  body: string;
  tint?: string;
}) {
  return (
    <article className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full">
      <span
        className="inline-flex w-10 h-10 rounded-xl items-center justify-center text-lg"
        style={{ background: `${tint}15`, border: `1px solid ${tint}25` }}
      >
        {icon}
      </span>
      <h3 className="mt-3 font-[family-name:var(--font-display)] font-700 text-[15px] text-[#102033] leading-tight">
        {title}
      </h3>
      <p className="text-[13px] text-[#5A6A82] mt-1.5 leading-[1.6]">{body}</p>
    </article>
  );
}
