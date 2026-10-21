import Link from "next/link";

/**
 * Renders an official EDUS student and parent rule document (the Group Class
 * Standards and the Individual Class Guidelines). All three languages are
 * server-rendered on one page, each in its own section with the right `lang`
 * attribute, and the switcher is plain anchor links so it works without JS.
 * The wording lives in the matching *Data.ts file, copied as issued by EDUS:
 * change the data file, never this component, when a new version is issued.
 */

export type GuidelineRule = {
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type GuidelineSection = {
  title: string;
  rules: GuidelineRule[];
};

export type GuidelineLanguage = {
  code: "en" | "ta" | "si";
  label: string;
  heading: string;
  introTitle?: string;
  intro: string[];
  stepsTitle?: string;
  steps?: { title: string; text: string }[];
  sections: GuidelineSection[];
  quickGuideTitle?: string;
  quickGuide?: { situation: string; treatment: string }[];
};

export type GuidelineDocumentData = {
  title: string;
  localTitles: string[];
  taglines: string[];
  versionLine: string;
  owner: string;
  languages: GuidelineLanguage[];
};

// Taglines are stored in the order the documents print them: English, Tamil, Sinhala.
const TAGLINE_LANGS = ["en", "ta", "si"];

export function GuidelineDocument({ doc }: { doc: GuidelineDocumentData }) {
  const year = new Date().getFullYear();

  return (
    <>
      {/* HERO - same pattern as the other legal pages */}
      <section className="relative pt-32 sm:pt-36 pb-10 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.2 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Students &amp; Parents</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-display)" }}>
            {doc.title}
          </h1>
          <div className="mt-4 space-y-1 text-[#2B3950] text-[15px]">
            {doc.localTitles.map((t, i) => (
              <p key={t} lang={i === 0 ? "ta" : "si"}>{t}</p>
            ))}
          </div>
          <div className="mt-5 space-y-0.5 text-[#5A6A82] text-[14px]">
            {doc.taglines.map((t, i) => (
              <p key={t} lang={TAGLINE_LANGS[i]}>{t}</p>
            ))}
          </div>
          <p className="text-[#5A6A82] text-[13px] mt-3">
            {doc.versionLine} - {doc.owner}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="relative pb-16 md:pb-20 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto text-[#2B3950] text-[15px] leading-[1.75]">
          <nav aria-label="Choose a language" className="flex flex-wrap justify-center gap-2">
            {doc.languages.map((lang) => (
              <a
                key={lang.code}
                href={`#${lang.code}`}
                lang={lang.code}
                className="rounded-full border border-[rgba(16,32,51,0.12)] bg-white px-4 py-1.5 text-[13.5px] font-600 text-[#102033] hover:border-[#2563EB]/40 hover:text-[#2563EB] transition"
              >
                {lang.label}
              </a>
            ))}
          </nav>

          <p className="mt-6 text-[13.5px] text-[#5A6A82] text-center">
            These rules form part of the EDUS{" "}
            <Link href="/terms" className="text-[#2563EB] hover:underline">Terms &amp; Conditions</Link>
            . Questions: EDUS Hotline{" "}
            <a href="tel:+94707072072" className="text-[#2563EB] hover:underline">+94 70 707 2072</a>
            {" "}or EDUS Connect Support Chat.
          </p>

          {doc.languages.map((lang) => (
            <LanguageBlock key={lang.code} lang={lang} />
          ))}

          <hr className="border-[rgba(16,32,51,0.08)] my-10" />
          <p className="text-[13px] text-[#5A6A82]">
            &copy; {year} EDUS Lanka (PVT) Ltd. All Rights Reserved.
          </p>
        </div>
      </section>
    </>
  );
}

function LanguageBlock({ lang }: { lang: GuidelineLanguage }) {
  return (
    <section id={lang.code} lang={lang.code} className="mt-12 scroll-mt-28">
      <h2 className="font-display font-700 text-[#102033] text-[26px] leading-[1.25] pb-3 border-b border-[rgba(16,32,51,0.10)]">
        {lang.heading}
      </h2>

      {lang.introTitle && <H3>{lang.introTitle}</H3>}
      <div className="space-y-3 mt-3">
        {lang.intro.map((p) => (
          <p key={p}>{withBold(p)}</p>
        ))}
      </div>

      {lang.steps && (
        <>
          <H3>{lang.stepsTitle}</H3>
          <ol className="mt-3 space-y-2 list-decimal pl-5">
            {lang.steps.map((s) => (
              <li key={s.title}>
                <strong className="text-[#102033]">{s.title}:</strong> {s.text}
              </li>
            ))}
          </ol>
        </>
      )}

      {lang.sections.map((section) => (
        <div key={section.title}>
          <H3>{section.title}</H3>
          <div className="mt-3 space-y-4">
            {section.rules.map((rule) => (
              <RuleItem key={rule.number} rule={rule} />
            ))}
          </div>
        </div>
      ))}

      {lang.quickGuide && (
        <>
          <H3>{lang.quickGuideTitle}</H3>
          <div className="mt-3 overflow-x-auto rounded-[14px] border border-[rgba(16,32,51,0.08)] bg-white">
            <table className="w-full text-left text-[14px]">
              <tbody className="divide-y divide-[rgba(16,32,51,0.07)]">
                {lang.quickGuide.map((row) => (
                  <tr key={row.situation}>
                    <th scope="row" className="px-4 py-2.5 font-600 text-[#102033] align-top w-[42%]">
                      {row.situation}
                    </th>
                    <td className="px-4 py-2.5">{row.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function RuleItem({ rule }: { rule: GuidelineRule }) {
  return (
    <div>
      <p className="font-display font-600 text-[#102033] text-[16px]">
        {rule.number}. {rule.title}
      </p>
      {rule.paragraphs?.map((p) => (
        <p key={p} className="mt-1">{withBold(p)}</p>
      ))}
      {rule.bullets && (
        <ul className="list-disc pl-5 mt-1.5 space-y-1">
          {rule.bullets.map((b) => (
            <li key={b}>{withBold(b)}</li>
          ))}
        </ul>
      )}
      {rule.note && <p className="mt-1.5 text-[14px] italic text-[#5A6A82]">{rule.note}</p>}
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display font-700 text-[#102033] text-[19px] leading-[1.3] mt-8">
      {children}
    </h3>
  );
}

// The source documents mark a few key facts (due date, hotline) with
// **double asterisks**. Odd-numbered parts after splitting are the bold ones.
function withBold(text: string) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-[#102033]">{part}</strong> : part,
  );
}
