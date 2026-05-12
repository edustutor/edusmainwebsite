"use client";
import Link from "next/link";

export const GL_SIGNUP = "https://signup.edustutor.com/";

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
        align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
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
/* Apply CTA row                                                    */
/* --------------------------------------------------------------- */
export function GlCtaRow({
  align = "center",
  primary = "Start Learning with EDUS",
  secondary = "Talk to US",
  secondaryHref = "/contact",
}: {
  align?: "left" | "center";
  primary?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div
      className={`mt-8 flex flex-wrap gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <a
        href={GL_SIGNUP}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        {primary}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden
        >
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {secondaryHref.startsWith("/") ? (
        <Link href={secondaryHref} className="btn btn-yellow">
          {secondary}
        </Link>
      ) : (
        <a href={secondaryHref} className="btn btn-yellow">
          {secondary}
        </a>
      )}
    </div>
  );
}
