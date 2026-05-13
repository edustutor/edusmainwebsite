import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  speakableWebPage,
  classEventSeries,
  timetableCollectionPage,
} from "@/components/layout/StructuredData";
import { TIMETABLE, CONDUCT_RULES } from "@/components/markets/sl/TimetableData";
import { SlTimetableView } from "@/components/markets/sl/SlTimetableView";

export const metadata = {
  title: "EDUS Sri Lanka Timetable 2026 - Class Schedule, Tutors & Fees",
  description:
    "Full 2026 timetable for EDUS Sri Lanka. Grade 3 to G.C.E A/L live online classes. Tamil & English medium. Days, times, tutors, and monthly fees.",
  alternates: { canonical: "/sl/timetable" },
  keywords: [
    "EDUS timetable",
    "EDUS Sri Lanka timetable",
    "EDUS class schedule 2026",
    "EDUS online classes timetable",
    "EDUS Grade 5 timetable",
    "EDUS Grade 6 timetable",
    "EDUS Grade 7 timetable",
    "EDUS Grade 8 timetable",
    "EDUS Grade 9 timetable",
    "EDUS Grade 10 timetable",
    "EDUS Grade 11 timetable",
    "EDUS O/L timetable",
    "EDUS A/L timetable",
    "EDUS A/L 2026 schedule",
    "EDUS A/L 2027 schedule",
    "EDUS A/L 2028 schedule",
    "EDUS Combined Maths timetable",
    "EDUS Physics A/L timetable",
    "EDUS Chemistry A/L timetable",
    "EDUS Biology A/L timetable",
    "EDUS ICT timetable",
    "Tamil medium online class timetable",
    "English medium online class timetable",
    "online tuition schedule Sri Lanka",
    "online class schedule Jaffna",
    "online tuition fees Sri Lanka",
  ],
};

// Cap how many Event schemas we emit per page to keep the JSON-LD payload
// reasonable. Each entry can have multiple sessions, so we flatten then cap.
const EVENT_CAP = 80;

export default function SlTimetablePage() {
  const totalSessions = TIMETABLE.reduce((sum, e) => sum + e.sessions.length, 0);

  // Build EventSeries schemas from real timetable data
  const eventSchemas = [];
  let count = 0;
  for (const entry of TIMETABLE) {
    if (count >= EVENT_CAP) break;
    for (const session of entry.sessions) {
      if (count >= EVENT_CAP) break;
      eventSchemas.push(
        classEventSeries({
          code: entry.code,
          subject: entry.subject,
          grade: entry.grade,
          medium: entry.medium,
          level: entry.level,
          tutor: entry.tutor,
          monthlyFee: entry.monthlyFee,
          day: session.day,
          time: session.time,
        }),
      );
      count++;
    }
  }

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Sri Lanka", path: "/sl" },
          { name: "Timetable 2026", path: "/sl/timetable" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "EDUS Sri Lanka Timetable 2026",
          headline: "EDUS Sri Lanka Class Timetable 2026",
          description:
            "Full 2026 class timetable for EDUS Sri Lanka. Grade 3 to G.C.E A/L live online classes in Tamil and English medium.",
          path: "/sl/timetable",
        })}
      />
      <JsonLdScript data={timetableCollectionPage(totalSessions)} />
      {eventSchemas.map((s, i) => (
        <JsonLdScript key={i} data={s} />
      ))}

      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-8 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />EDUS Sri Lanka - 2026</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Class <em>timetable 2026</em>.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Complete schedule for EDUS Sri Lanka live online classes. Grade 3 through G.C.E A/L,
            Tamil and English medium. Filter by level, medium, or search by subject, tutor, or day.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="https://signup.edustutor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Register Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link href="/contact" className="btn btn-yellow">
              Ask the EDUS team
            </Link>
          </div>
        </div>
      </section>

      {/* TIMETABLE */}
      <SlTimetableView />

      {/* CONDUCT */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="glass-strong rounded-[24px] p-6 md:p-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow"><span className="dot" />Class Conduct</p>
              <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
                Class rules <em>students must follow</em>.
              </h2>
              <p className="text-[#2B3950] text-[15px] mt-4 leading-[1.7]">
                Quality classes depend on quality conduct. These are the standards every EDUS
                student is expected to meet.
              </p>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {CONDUCT_RULES.map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-4 py-3 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
                >
                  <span
                    aria-hidden
                    className="inline-flex w-6 h-6 mt-0.5 rounded-full items-center justify-center shrink-0 bg-[#2563EB]/15 text-[#2563EB]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[13.5px] text-[#2B3950] leading-[1.55]">{rule}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="rounded-[28px] p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}>
            <h2 className="heading" style={{ fontSize: "var(--fs-display)", color: "#fff" }}>
              Ready to start? Pick your class and enrol.
            </h2>
            <p className="mt-4 text-[15.5px] text-white/85 max-w-2xl mx-auto leading-[1.7]">
              Find your grade and subject in the timetable above. Register online and the EDUS team
              will confirm your placement within one business day.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="https://signup.edustutor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                Register as a Student
              </a>
              <Link href="/sl" className="btn btn-ghost">Back to Sri Lanka</Link>
              <Link href="/contact" className="btn btn-ghost">Contact EDUS</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
