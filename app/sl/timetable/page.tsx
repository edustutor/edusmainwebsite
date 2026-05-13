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
  title: "Time Table for Group Classes in Sri Lanka 2026 - EDUS",
  description:
    "EDUS Sri Lanka 2026 group class timetable. Grade 3 to G.C.E A/L live online classes in Tamil and English medium. Tutors, days, times, fees, admission info.",
  alternates: { canonical: "/sl/timetable" },
  keywords: [
    "EDUS timetable",
    "EDUS Sri Lanka timetable",
    "EDUS group classes timetable",
    "EDUS group class schedule 2026",
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
    "EDUS admission fee",
    "EDUS group class fee",
    "EDUS individual class schedule",
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
          name: "Time Table for Group Classes in Sri Lanka 2026 - EDUS",
          headline: "EDUS Sri Lanka Group Class Timetable 2026",
          description:
            "The 2026 timetable for EDUS Sri Lanka group classes. Times below apply only to group classes; individual one-to-one classes are scheduled flexibly per student. Includes admission fee, platform, and conduct rules.",
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
            Time Table for <em>Group Classes</em><br />available in Sri Lanka.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Your child&apos;s 2026 learning schedule, ready to go. Pick the grade and medium below
            to see the exact day, time, tutor, and monthly fee for every group class - and start
            building the academic habit that turns effort into results.
          </p>

          {/* Important context banner — explains group vs individual upfront */}
          <div
            role="note"
            className="mt-7 max-w-3xl mx-auto text-left bg-white border border-[#FACC15]/40 rounded-2xl px-5 py-4 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
          >
            <p className="flex items-start gap-3 text-[13.5px] text-[#2B3950] leading-[1.65]">
              <span
                aria-hidden
                className="inline-flex w-6 h-6 mt-0.5 rounded-full items-center justify-center shrink-0 bg-[#FACC15]/25 text-[#92400E] font-display font-700 text-[12px]"
              >
                !
              </span>
              <span>
                <strong className="font-display font-700 text-[#102033]">
                  These times apply to group classes only.
                </strong>{" "}
                Individual one-to-one classes are scheduled <em>flexibly per student</em>, around
                the student&apos;s preferred timing - any grade, any subject, any medium, no fixed
                timetable. From LKR 2,500 per hour. Reach out and we will match a tutor to your
                schedule.
              </span>
            </p>
          </div>

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
              Ask About Individual Classes
            </Link>
          </div>
        </div>
      </section>

      {/* TIMETABLE */}
      <SlTimetableView />

      {/* IMPORTANT TO KNOW - admission fee, platforms, individual flexibility */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Important to Know</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Three things <em>before you join</em>.
            </h2>
            <p className="text-[#2B3950] text-[15px] mt-4 leading-[1.7]">
              Quick essentials so you arrive on your first class ready, set up, and confident.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Admission fee */}
            <article
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: "#FACC15" }}
              />
              <p
                className="font-display font-800 text-[11px] tracking-[0.16em] uppercase"
                style={{ color: "#B45309" }}
              >
                Admission Fee
              </p>
              <h3 className="mt-2 font-display font-700 text-[20px] text-[#102033] leading-tight">
                LKR 1,000 - one time only
              </h3>
              <p className="mt-2 text-[14px] text-[#5A6A82] leading-[1.65]">
                A single one-time admission fee of{" "}
                <strong className="font-display font-700 text-[#102033]">LKR 1,000 per student</strong>{" "}
                - paid once when joining EDUS,{" "}
                <strong className="font-display font-700 text-[#102033]">
                  regardless of how many classes or subjects
                </strong>{" "}
                the student takes. Covers onboarding, account setup, and class allocation.
              </p>
            </article>

            {/* Delivery platform */}
            <article
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: "#2563EB" }}
              />
              <p
                className="font-display font-800 text-[11px] tracking-[0.16em] uppercase"
                style={{ color: "#2563EB" }}
              >
                How Classes Run
              </p>
              <h3 className="mt-2 font-display font-700 text-[20px] text-[#102033] leading-tight">
                EDUS App + Google Meet
              </h3>
              <p className="mt-2 text-[14px] text-[#5A6A82] leading-[1.65]">
                All classes are conducted through the{" "}
                <strong className="font-display font-700 text-[#102033]">
                  EDUS Student Mobile App
                </strong>{" "}
                and the{" "}
                <strong className="font-display font-700 text-[#102033]">EDUS Web App</strong>,
                with live class sessions delivered on{" "}
                <strong className="font-display font-700 text-[#102033]">Google Meet</strong>.
                Recordings, assignments, and parent updates all live inside the app.
              </p>
            </article>

            {/* Individual classes */}
            <article
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: "#06B6D4" }}
              />
              <p
                className="font-display font-800 text-[11px] tracking-[0.16em] uppercase"
                style={{ color: "#0E7490" }}
              >
                Individual Classes
              </p>
              <h3 className="mt-2 font-display font-700 text-[20px] text-[#102033] leading-tight">
                Scheduled for you
              </h3>
              <p className="mt-2 text-[14px] text-[#5A6A82] leading-[1.65]">
                Individual one-to-one classes are{" "}
                <strong className="font-display font-700 text-[#102033]">
                  not on this timetable
                </strong>{" "}
                - they are scheduled around the student&apos;s convenience and the tutor&apos;s
                availability. Any grade, any subject, any medium. From LKR 2,500 / hour.{" "}
                <Link href="/contact" className="text-[#2563EB] font-display font-700 hover:underline">
                  Talk to the team
                </Link>
                .
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* STUDENT CODE - rules every student accepts before joining */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="glass-strong rounded-[24px] p-6 md:p-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow"><span className="dot" />The EDUS Student Code</p>
              <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
                The standards <em>that build top students</em>.
              </h2>
              <p className="text-[#2B3950] text-[15px] mt-5 leading-[1.7]">
                Every EDUS student accepts these rules before joining their first class. They are
                non-negotiable, strictly maintained, and they exist for one reason:{" "}
                <strong className="font-display font-700 text-[#102033]">
                  students who follow them outperform students who do not.
                </strong>{" "}
                Academic excellence is built on consistent habits, and consistent habits are built
                on clear rules.
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
                    className="inline-flex w-6 h-6 mt-0.5 rounded-full items-center justify-center shrink-0 bg-[#2563EB]/15 text-[#2563EB] font-display font-700 text-[12px]"
                  >
                    {i + 1}
                  </span>
                  <p className="text-[13.5px] text-[#2B3950] leading-[1.55]">{rule}</p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-[13px] text-[#5A6A82] max-w-2xl mx-auto leading-[1.65] italic">
              By enrolling in any EDUS class, the student and parent confirm that they have read,
              understood, and accept these standards. EDUS reserves the right to remove students
              who repeatedly breach them - because every class belongs to the students who showed
              up to learn.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="rounded-[28px] p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}>
            <h2 className="heading" style={{ fontSize: "var(--fs-display)", color: "#fff" }}>
              Your seat is one click away.
            </h2>
            <p className="mt-4 text-[15.5px] text-white/90 max-w-2xl mx-auto leading-[1.7]">
              Pick the grade. Pick the subject. Register today and the EDUS academic team will
              confirm your placement within one business day - and your child will be in their
              first live class with a quality-checked tutor before the week is out.
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
              <Link href="/contact" className="btn btn-ghost">
                Ask About Individual Classes
              </Link>
              <Link href="/sl" className="btn btn-ghost">Back to Sri Lanka</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
