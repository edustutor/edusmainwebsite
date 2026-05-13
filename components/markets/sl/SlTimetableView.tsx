"use client";
import { useMemo, useState } from "react";
import { m } from "@/components/effects/Motion";
import { fadeUp, sectionRevealStrong, inView } from "@/lib/motion";
import { TIMETABLE, DAYS, type TimetableEntry, type Day } from "./TimetableData";

/**
 * Interactive timetable view. Filters by level (Primary / Secondary / A/L),
 * grade, and medium. Renders the table with one row per class session
 * (a class with two weekly sessions appears as two rows) so the day/time
 * is always cleanly readable on a single line.
 */

type Level = "All" | "Primary" | "Secondary" | "A/L";
type Medium = "All" | "Tamil" | "English";

const LEVELS: Level[] = ["All", "Primary", "Secondary", "A/L"];
const MEDIUMS: Medium[] = ["All", "Tamil", "English"];

type Row = TimetableEntry & { day: Day; time: string };

function flatten(entries: TimetableEntry[]): Row[] {
  const rows: Row[] = [];
  for (const e of entries) {
    for (const s of e.sessions) {
      rows.push({ ...e, day: s.day, time: s.time });
    }
  }
  // Sort by level -> grade number -> medium -> day order
  const dayIndex = (d: Day) => DAYS.indexOf(d);
  const gradeNum = (g: string) => {
    const m = g.match(/\d+/);
    return m ? parseInt(m[0], 10) : 99;
  };
  return rows.sort((a, b) => {
    if (a.level !== b.level) return ["Primary", "Secondary", "A/L"].indexOf(a.level) - ["Primary", "Secondary", "A/L"].indexOf(b.level);
    if (a.grade !== b.grade) return gradeNum(a.grade) - gradeNum(b.grade);
    if (a.medium !== b.medium) return a.medium.localeCompare(b.medium);
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    return dayIndex(a.day) - dayIndex(b.day);
  });
}

const ALL_ROWS = flatten(TIMETABLE);

export function SlTimetableView() {
  const [level, setLevel] = useState<Level>("All");
  const [medium, setMedium] = useState<Medium>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return ALL_ROWS.filter((r) => {
      if (level !== "All" && r.level !== level) return false;
      if (medium !== "All" && !r.medium.includes(medium)) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${r.code} ${r.subject} ${r.grade} ${r.tutor} ${r.day} ${r.time}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [level, medium, query]);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="container-edge">
        {/* Filter bar */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="glass-strong rounded-2xl p-4 md:p-5"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#5A6A82] font-display font-700 mr-1">
                Level
              </span>
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-3 py-1.5 rounded-full text-[12.5px] font-display font-600 transition ${
                    level === l
                      ? "bg-[#2563EB] text-white"
                      : "bg-white text-[#2B3950] border border-[rgba(16,32,51,0.10)] hover:border-[#2563EB]/40"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#5A6A82] font-display font-700 mr-1">
                Medium
              </span>
              {MEDIUMS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMedium(m)}
                  className={`px-3 py-1.5 rounded-full text-[12.5px] font-display font-600 transition ${
                    medium === m
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-white text-[#2B3950] border border-[rgba(16,32,51,0.10)] hover:border-[#8B5CF6]/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block">
              <span className="sr-only">Search timetable</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by subject, grade, tutor, day, or class code..."
                className="form-field w-full bg-white border border-[rgba(16,32,51,0.10)] rounded-xl px-4 py-2.5 text-[14px] text-[#102033] placeholder:text-[#5A6A82] transition"
              />
            </label>
          </div>

          <p className="mt-3 text-[12px] text-[#5A6A82]">
            Showing <span className="font-display font-700 text-[#102033]">{rows.length}</span> of {ALL_ROWS.length} class sessions
          </p>
        </m.div>

        {/* Table */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-6 bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead className="bg-[#F4F8FF] border-b border-[rgba(16,32,51,0.08)]">
                <tr>
                  <Th>Class Code</Th>
                  <Th>Subject</Th>
                  <Th>Grade</Th>
                  <Th>Medium</Th>
                  <Th>Tutor</Th>
                  <Th>Day</Th>
                  <Th>Time</Th>
                  <Th align="right">Monthly Fee</Th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-[#5A6A82]">
                      No classes match these filters. Try clearing the search or changing the level / medium.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    <tr
                      key={`${r.code}-${r.day}-${r.time}-${i}`}
                      className="border-b border-[rgba(16,32,51,0.06)] last:border-b-0 hover:bg-[#F8FBFF] transition"
                    >
                      <Td>
                        <code className="font-mono text-[12px] text-[#2563EB]">{r.code}</code>
                      </Td>
                      <Td className="font-display font-600 text-[#102033]">{r.subject}</Td>
                      <Td>{r.grade}</Td>
                      <Td>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[11px] font-display font-700"
                          style={{
                            background: r.medium === "Tamil" ? "#2563EB15" : "#8B5CF615",
                            color: r.medium === "Tamil" ? "#2563EB" : "#8B5CF6",
                          }}
                        >
                          {r.medium}
                        </span>
                      </Td>
                      <Td>{r.tutor}</Td>
                      <Td>{r.day}</Td>
                      <Td>{r.time}</Td>
                      <Td align="right" className="font-display font-700 text-[#102033]">
                        {r.monthlyFee}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </m.div>

        <p className="mt-4 text-[11.5px] text-[#5A6A82] text-center">
          All times are Sri Lanka local time (IST +05:30). Classes are conducted via EDUS Tutor Mobile &amp; Web App and Google Meet.
        </p>
      </div>
    </section>
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
    <td
      className={`px-4 py-3 ${align === "right" ? "text-right" : "text-left"} text-[#2B3950] whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
}
