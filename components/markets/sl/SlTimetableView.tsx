"use client";
import { useMemo, useState } from "react";
import { m } from "@/components/effects/Motion";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";
import { TIMETABLE, type TimetableEntry } from "./TimetableData";

/**
 * Simple grade + medium dropdown timetable view.
 *
 * Two dropdowns: Grade and Medium. After both are selected, a single
 * clean table shows the subjects for that class. No class codes, no
 * search, no jump chips - just dropdowns and one table.
 *
 * Defaults to Grade 3 + Tamil so the first paint already shows real
 * content for SEO crawlers and AI-engine ingestion.
 */

type Medium = "Tamil" | "English";

type SubjectRow = {
  subject: string;
  effectiveMedium: TimetableEntry["medium"] | "Both";
  tutor: string;
  monthlyFee: string;
  sessions: { day: string; time: string }[];
};

/**
 * Build the unique grade list in the order they appear in the source data
 * (Primary -> Secondary -> A/L).
 */
function uniqueGrades(entries: TimetableEntry[]): string[] {
  const seen: string[] = [];
  for (const e of entries) {
    if (!seen.includes(e.grade)) seen.push(e.grade);
  }
  return seen;
}

const GRADES = uniqueGrades(TIMETABLE);
const MEDIUMS: Medium[] = ["Tamil", "English"];

/**
 * Return the subject rows for a given grade + medium. When Tamil and
 * English share the same tutor and identical sessions for a subject,
 * they are merged into one row tagged "Both" so the table doesn't
 * show duplicate rows.
 */
function rowsFor(grade: string, medium: Medium): SubjectRow[] {
  const items = TIMETABLE.filter((e) => e.grade === grade);
  if (items.length === 0) return [];

  // Bucket by subject preserving original order
  const subjectOrder: string[] = [];
  const bySubject = new Map<string, TimetableEntry[]>();
  for (const it of items) {
    if (!bySubject.has(it.subject)) {
      bySubject.set(it.subject, []);
      subjectOrder.push(it.subject);
    }
    bySubject.get(it.subject)!.push(it);
  }

  const rows: SubjectRow[] = [];
  for (const subject of subjectOrder) {
    const subjectEntries = bySubject.get(subject)!;

    // Find Tamil + English variants for this subject (if any)
    const tamil = subjectEntries.find((e) => e.medium === "Tamil");
    const english = subjectEntries.find((e) => e.medium === "English");

    // Pure Tamil-only subjects (e.g. Primary classes, A/L) - match on Tamil tab
    if (tamil && !english) {
      if (medium === "Tamil") {
        rows.push({
          subject: tamil.subject,
          effectiveMedium: tamil.medium,
          tutor: tamil.tutor,
          monthlyFee: tamil.monthlyFee,
          sessions: tamil.sessions.map((s) => ({ day: s.day, time: s.time })),
        });
      }
      continue;
    }

    // Pure English-only subject (rare - e.g. Grade 5 Spoken English) - match on English tab
    if (english && !tamil) {
      if (medium === "English") {
        rows.push({
          subject: english.subject,
          effectiveMedium: english.medium,
          tutor: english.tutor,
          monthlyFee: english.monthlyFee,
          sessions: english.sessions.map((s) => ({ day: s.day, time: s.time })),
        });
      }
      continue;
    }

    // Both variants exist - check if they should merge
    if (tamil && english) {
      const pick = medium === "Tamil" ? tamil : english;
      const other = medium === "Tamil" ? english : tamil;

      const sameTutor = pick.tutor === other.tutor;
      const sameSessions =
        pick.sessions.length === other.sessions.length &&
        pick.sessions.every((s, i) => {
          const o = other.sessions[i];
          return o && o.day === s.day && o.time === s.time;
        });

      rows.push({
        subject: pick.subject,
        effectiveMedium: sameTutor && sameSessions ? "Both" : pick.medium,
        tutor: pick.tutor,
        monthlyFee: pick.monthlyFee,
        sessions: pick.sessions.map((s) => ({ day: s.day, time: s.time })),
      });
    }
  }

  return rows;
}

/** Detect the level for a grade (used to label the table header) */
function levelFor(grade: string): TimetableEntry["level"] {
  return TIMETABLE.find((e) => e.grade === grade)?.level ?? "Secondary";
}

export function SlTimetableView() {
  const [grade, setGrade] = useState<string>(GRADES[0]);
  const [medium, setMedium] = useState<Medium>("Tamil");

  const rows = useMemo(() => rowsFor(grade, medium), [grade, medium]);
  const level = levelFor(grade);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="container-edge max-w-5xl mx-auto">
        {/* Dropdowns */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="glass-strong rounded-2xl p-5 md:p-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <DropdownField label="Grade">
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="form-field w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[14.5px] text-[#102033] font-display font-600 transition appearance-none"
                style={selectChevron}
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </DropdownField>

            <DropdownField label="Medium">
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value as Medium)}
                className="form-field w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-3 text-[14.5px] text-[#102033] font-display font-600 transition appearance-none"
                style={selectChevron}
              >
                {MEDIUMS.map((m) => (
                  <option key={m} value={m}>
                    {m} medium
                  </option>
                ))}
              </select>
            </DropdownField>
          </div>
        </m.div>

        {/* Single table for the selected class */}
        <m.div
          key={`${grade}-${medium}`}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
        >
          {/* Table header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#F4F8FF] border-b border-[rgba(16,32,51,0.08)] flex-wrap">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-display font-700 text-[18px] text-[#102033]">{grade}</h3>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[11px] font-display font-700"
                style={{
                  background: medium === "Tamil" ? "#2563EB15" : "#8B5CF615",
                  color: medium === "Tamil" ? "#2563EB" : "#8B5CF6",
                }}
              >
                {medium} medium
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
                {level}
              </span>
            </div>
            <span className="text-[11.5px] text-[#5A6A82] font-display font-600">
              {rows.length} {rows.length === 1 ? "class" : "classes"}
            </span>
          </div>

          {/* Body */}
          {rows.length === 0 ? (
            <div className="p-10 text-center text-[#5A6A82] text-[14px]">
              No classes available for {grade} in {medium} medium. Try the other medium, or browse a different grade.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr>
                    <Th>Subject</Th>
                    <Th>Tutor</Th>
                    <Th>Day &amp; Time</Th>
                    <Th align="right">Monthly Fee</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((s, i) => (
                    <tr
                      key={`${s.subject}-${i}`}
                      className="border-t border-[rgba(16,32,51,0.06)] hover:bg-[#F8FBFF] transition"
                    >
                      <Td>
                        <span className="font-display font-600 text-[#102033]">{s.subject}</span>
                      </Td>
                      <Td>{s.tutor}</Td>
                      <Td>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {s.sessions.map((sess, j) => (
                            <span key={j} className="whitespace-nowrap">
                              <span className="font-display font-600 text-[#102033]">{sess.day}</span>
                              <span className="text-[#5A6A82]"> · {sess.time}</span>
                            </span>
                          ))}
                        </div>
                      </Td>
                      <Td align="right" className="font-display font-700 text-[#102033]">
                        {s.monthlyFee}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </m.div>

        <p className="mt-6 text-[11.5px] text-[#5A6A82] text-center">
          All times are Sri Lanka local time (IST +05:30). Classes are conducted via EDUS Tutor Mobile &amp; Web App and Google Meet.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Primitives                                                        */
/* ---------------------------------------------------------------- */

const selectChevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A6A82' stroke-width='2.4'%3E%3Cpath d='M6 9l6 6 6-6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 1rem center" as const,
  paddingRight: "2.5rem",
};

function DropdownField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-[#5A6A82] font-display font-700 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-4 py-3 ${
        align === "right" ? "text-right" : "text-left"
      } text-[10.5px] uppercase tracking-widest text-[#5A6A82] font-display font-700 whitespace-nowrap`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 ${align === "right" ? "text-right" : "text-left"} text-[#2B3950] ${className}`}>
      {children}
    </td>
  );
}
