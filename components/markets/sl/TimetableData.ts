/**
 * EDUS Sri Lanka — 2026 timetable.
 *
 * Source: EDUS Online Institute Timetable 2026 PDF (uploaded by user).
 * Every entry is verbatim from the PDF — no fabrication. Tutor numeric IDs
 * are internal references kept here for traceability but NOT surfaced
 * prominently in the UI.
 *
 * Times use 24h ranges as published. Days mirror the PDF columns.
 *
 * When the timetable changes, update this file and the schedule rebuilds
 * on next deploy. The Event JSON-LD is generated automatically from this
 * data, so no schema edits needed.
 */

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type ClassSession = {
  day: Day;
  time: string; // verbatim from PDF, e.g. "7.30-8.30 PM", "6.45-7.45 PM"
};

export type TimetableEntry = {
  code: string; // e.g. "GT6Maths"
  subject: string;
  grade: string;
  medium: "Tamil" | "English" | "Tamil & English";
  level: "Primary" | "Secondary" | "A/L";
  tutor: string; // tutor name as published (without internal ID number)
  monthlyFee: string; // e.g. "Rs. 1,000"
  sessions: ClassSession[];
};

/* =====================================================================
 * PRIMARY — Tamil Medium (Grade 3, 4, 5)
 * ===================================================================== */
const PRIMARY: TimetableEntry[] = [
  {
    code: "GT3Tamil",  subject: "Tamil",                grade: "Grade 3", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT3Env",    subject: "Environmental Studies", grade: "Grade 3", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT3Maths",  subject: "Mathematics",          grade: "Grade 3", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Friday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT3English", subject: "English",             grade: "Grade 3", medium: "Tamil", level: "Primary",
    tutor: "Fathima Nihadha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "5-6 PM" }, { day: "Saturday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT3IQ",     subject: "IQ",                   grade: "Grade 3", medium: "Tamil", level: "Primary",
    tutor: "Mathiruban", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "6.15 PM" }, { day: "Friday", time: "6.15 PM" }],
  },
  {
    code: "GT4Tamil",  subject: "Tamil",                grade: "Grade 4", medium: "Tamil", level: "Primary",
    tutor: "Kajani", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT4Env",    subject: "Environmental Studies", grade: "Grade 4", medium: "Tamil", level: "Primary",
    tutor: "Kajani", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT4Maths",  subject: "Mathematics",          grade: "Grade 4", medium: "Tamil", level: "Primary",
    tutor: "Kajani", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Saturday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT4English", subject: "English",             grade: "Grade 4", medium: "Tamil", level: "Primary",
    tutor: "Fathima Nihadha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "7.30-8.30 PM" }, { day: "Friday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT4IQ",     subject: "IQ",                   grade: "Grade 4", medium: "Tamil", level: "Primary",
    tutor: "Mathiruban", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "6.30-7.30 PM" }, { day: "Saturday", time: "6.30-7.30 PM" }],
  },
  {
    code: "GT5Tamil",  subject: "Tamil",                grade: "Grade 5", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT5Env",    subject: "Environmental Studies", grade: "Grade 5", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT5Maths",  subject: "Mathematics",          grade: "Grade 5", medium: "Tamil", level: "Primary",
    tutor: "Rajamanohary", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Saturday", time: "7.30-8.30 PM" }],
  },
  {
    code: "GT5English", subject: "English",             grade: "Grade 5", medium: "Tamil", level: "Primary",
    tutor: "Fathima Nihadha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "6.15-7.15 PM" }, { day: "Thursday", time: "6.15-7.15 PM" }],
  },
  {
    code: "GT5IQ",     subject: "IQ",                   grade: "Grade 5", medium: "Tamil", level: "Primary",
    tutor: "Mathiruban", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "6.30-7.30 PM" }, { day: "Saturday", time: "6.30-7.30 PM" }],
  },
  {
    code: "GE5SpokenEnglish", subject: "Spoken English", grade: "Grade 5", medium: "English", level: "Primary",
    tutor: "Farhana Hanifa", monthlyFee: "Rs. 1,500",
    sessions: [{ day: "Tuesday", time: "6-7 PM" }, { day: "Friday", time: "6-7 PM" }],
  },
];

/* =====================================================================
 * SECONDARY — Grade 6 to 11 (Tamil + English medium)
 * ===================================================================== */
const SECONDARY: TimetableEntry[] = [
  // Grade 6 — Tamil Medium
  { code: "GT6Tamil",   subject: "Tamil",   grade: "Grade 6", medium: "Tamil",   level: "Secondary", tutor: "Shabna",   monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GT6English", subject: "English", grade: "Grade 6", medium: "Tamil",   level: "Secondary", tutor: "Afnaa",    monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "8-9 PM" }] },
  { code: "GT6History", subject: "History", grade: "Grade 6", medium: "Tamil",   level: "Secondary", tutor: "Lukshana", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }] },
  { code: "GT6Maths",   subject: "Mathematics", grade: "Grade 6", medium: "Tamil", level: "Secondary", tutor: "Sarmily", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "6.45-7.45 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GT6Science", subject: "Science", grade: "Grade 6", medium: "Tamil",   level: "Secondary", tutor: "Sarmily", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "6.45-7.45 PM" }, { day: "Friday", time: "8-9 PM" }] },
  { code: "GT6ICT",     subject: "ICT",     grade: "Grade 6", medium: "Tamil",   level: "Secondary", tutor: "Sarmily", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "6.45-7.45 PM" }] },

  // Grade 6 — English Medium
  { code: "GE6Tamil",   subject: "Tamil",   grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Shabna",   monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE6English", subject: "English", grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Afnaa",    monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "8-9 PM" }] },
  { code: "GE6History", subject: "History", grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Lukshana", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }] },
  { code: "GE6Maths",   subject: "Mathematics", grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Shovenja", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "6.45-7.45 PM" }, { day: "Friday", time: "8-9 PM" }] },
  { code: "GE6Science", subject: "Science", grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Vithursika", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "7-8 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GE6ICT",     subject: "ICT",     grade: "Grade 6", medium: "English", level: "Secondary", tutor: "Vithurshan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Saturday", time: "6.45-7.45 PM" }] },

  // Grade 7 — Tamil Medium
  { code: "GT7Tamil",   subject: "Tamil",   grade: "Grade 7", medium: "Tamil",   level: "Secondary", tutor: "Yathurshini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "8-9 PM" }] },
  { code: "GT7English", subject: "English", grade: "Grade 7", medium: "Tamil",   level: "Secondary", tutor: "Nazath Amaniya", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "6.45-7.45 PM" }, { day: "Friday", time: "6.30-7.30 PM" }] },
  { code: "GT7History", subject: "History", grade: "Grade 7", medium: "Tamil",   level: "Secondary", tutor: "Lukshana", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Friday", time: "8-9 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GT7Maths",   subject: "Mathematics", grade: "Grade 7", medium: "Tamil", level: "Secondary", tutor: "Suventhiran", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GT7Science", subject: "Science", grade: "Grade 7", medium: "Tamil",   level: "Secondary", tutor: "Suthakaran", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Saturday", time: "6.45-7.45 PM" }] },
  { code: "GT7ICT",     subject: "ICT",     grade: "Grade 7", medium: "Tamil",   level: "Secondary", tutor: "Sarmily", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "6.45-7.45 PM" }] },

  // Grade 7 — English Medium
  { code: "GE7Tamil",   subject: "Tamil",   grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Yathurshini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "8-9 PM" }] },
  { code: "GE7English", subject: "English", grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Nazath Amaniya", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "6.45-7.45 PM" }, { day: "Friday", time: "6.30-7.30 PM" }] },
  { code: "GE7History", subject: "History", grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Lakshana", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Friday", time: "8-9 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GE7Maths",   subject: "Mathematics", grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Uthayatharshini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GE7Science", subject: "Science", grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Vithursika", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE7ICT",     subject: "ICT",     grade: "Grade 7", medium: "English", level: "Secondary", tutor: "Abdul Razazak", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Saturday", time: "7-8 PM" }] },

  // Grade 8 — Tamil Medium
  { code: "GT8Tamil",   subject: "Tamil",   grade: "Grade 8", medium: "Tamil",   level: "Secondary", tutor: "Kajananthini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "8-9 PM" }, { day: "Friday", time: "6.30-7.30 PM" }] },
  { code: "GT8English", subject: "English", grade: "Grade 8", medium: "Tamil",   level: "Secondary", tutor: "Afnaan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "6.45-7.45 PM" }, { day: "Friday", time: "7.30-8.30 PM" }] },
  { code: "GT8History", subject: "History", grade: "Grade 8", medium: "Tamil",   level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "6.45-7.45 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GT8Maths",   subject: "Mathematics", grade: "Grade 8", medium: "Tamil", level: "Secondary", tutor: "Suganjan Senthilkumaran", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "7-8 PM" }] },
  { code: "GT8Science", subject: "Science", grade: "Grade 8", medium: "Tamil",   level: "Secondary", tutor: "Suthakaran", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "6.45-7.45 PM" }] },
  { code: "GT8ICT",     subject: "ICT",     grade: "Grade 8", medium: "Tamil",   level: "Secondary", tutor: "Vithurshan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }] },

  // Grade 8 — English Medium
  { code: "GE8Tamil",   subject: "Tamil",   grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Kajananthini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "8-9 PM" }, { day: "Friday", time: "6.30-7.30 PM" }] },
  { code: "GE8English", subject: "English", grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Afnaan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "6.45-7.45 PM" }, { day: "Friday", time: "7.30-8.30 PM" }] },
  { code: "GE8History", subject: "History", grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "6.45-7.45 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GE8Maths",   subject: "Mathematics", grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Abinaya", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE8Science", subject: "Science", grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Vithursika", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "6.45-7.45 PM" }] },
  { code: "GE8ICT",     subject: "ICT",     grade: "Grade 8", medium: "English", level: "Secondary", tutor: "Fathima Farha", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }] },

  // Grade 9 — Tamil Medium
  { code: "GT9Tamil",   subject: "Tamil",   grade: "Grade 9", medium: "Tamil",   level: "Secondary", tutor: "Kajananthiny", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Friday", time: "8-9 PM" }, { day: "Saturday", time: "7-8 PM" }] },
  { code: "GT9English", subject: "English", grade: "Grade 9", medium: "Tamil",   level: "Secondary", tutor: "Afnaan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "7-8 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GT9History", subject: "History", grade: "Grade 9", medium: "Tamil",   level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GT9Maths",   subject: "Mathematics", grade: "Grade 9", medium: "Tamil", level: "Secondary", tutor: "Shovenja", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "7-8 PM" }] },
  { code: "GT9Science", subject: "Science", grade: "Grade 9", medium: "Tamil",   level: "Secondary", tutor: "Suthakaran", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "8.15-9.15 PM" }, { day: "Friday", time: "6.45-7.45 PM" }] },
  { code: "GT9ICT",     subject: "ICT",     grade: "Grade 9", medium: "Tamil",   level: "Secondary", tutor: "Vithurshan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }] },

  // Grade 9 — English Medium
  { code: "GE9Tamil",   subject: "Tamil",   grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Kajananthiny", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Friday", time: "8-9 PM" }, { day: "Saturday", time: "7-8 PM" }] },
  { code: "GE9English", subject: "English", grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Afnaan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "7-8 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE9History", subject: "History", grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GE9Maths",   subject: "Mathematics", grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Uthayatharshini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "7-8 PM" }] },
  { code: "GE9Science", subject: "Science", grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Mayoory", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Thursday", time: "8.15-9.15 PM" }, { day: "Friday", time: "6.45-7.45 PM" }] },
  { code: "GE9ICT",     subject: "ICT",     grade: "Grade 9", medium: "English", level: "Secondary", tutor: "Uthayatharshini", monthlyFee: "Rs. 1,000",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }] },

  // Grade 10 — Tamil Medium
  { code: "GT10Tamil",   subject: "Tamil",   grade: "Grade 10", medium: "Tamil",   level: "Secondary", tutor: "Niththi", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "9-10 PM" }, { day: "Sunday", time: "7-8 PM" }] },
  { code: "GT10English", subject: "English", grade: "Grade 10", medium: "Tamil",   level: "Secondary", tutor: "Sumeerjitha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "8.15-9.15 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GT10History", subject: "History", grade: "Grade 10", medium: "Tamil",   level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GT10Maths",   subject: "Mathematics", grade: "Grade 10", medium: "Tamil", level: "Secondary", tutor: "Suganjan Senthilkumaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "7-8 PM" }, { day: "Thursday", time: "8-9 PM" }] },
  { code: "GT10Science", subject: "Science", grade: "Grade 10", medium: "Tamil",   level: "Secondary", tutor: "Suthakaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "9-10 PM" }, { day: "Friday", time: "8-9 PM" }] },
  { code: "GT10ICT",     subject: "ICT",     grade: "Grade 10", medium: "Tamil",   level: "Secondary", tutor: "Suganjan Senthilkumaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Saturday", time: "9-10 PM" }] },

  // Grade 10 — English Medium
  { code: "GE10Tamil",   subject: "Tamil",   grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Niththi", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "9-10 PM" }, { day: "Sunday", time: "7-8 PM" }] },
  { code: "GE10English", subject: "English", grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Sumeerjitha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "8.15-9.15 PM" }, { day: "Tuesday", time: "6.45-7.45 PM" }] },
  { code: "GE10History", subject: "History", grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE10Maths",   subject: "Mathematics", grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Uthayatharshini", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Friday", time: "7-8 PM" }, { day: "Saturday", time: "6.45-7.45 PM" }] },
  { code: "GE10Science", subject: "Science", grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Mayoory", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "9-10 PM" }, { day: "Thursday", time: "6.45-7.45 PM" }] },
  { code: "GE10ICT",     subject: "ICT",     grade: "Grade 10", medium: "English", level: "Secondary", tutor: "Razak", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Saturday", time: "8-9 PM" }] },

  // Grade 11 — Tamil Medium (NEW)
  { code: "GT11Tamil",   subject: "Tamil",   grade: "Grade 11", medium: "Tamil",   level: "Secondary", tutor: "Niththi", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Thursday", time: "8.30-9.30 PM" }, { day: "Friday", time: "9-10 PM" }] },
  { code: "GT11English", subject: "English", grade: "Grade 11", medium: "Tamil",   level: "Secondary", tutor: "Sumeerjitha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GT11History", subject: "History", grade: "Grade 11", medium: "Tamil",   level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "6.45-7.45 PM" }] },
  { code: "GT11Maths",   subject: "Mathematics", grade: "Grade 11", medium: "Tamil", level: "Secondary", tutor: "Ainkaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Saturday", time: "6.45-7.45 PM" }] },
  { code: "GT11Science", subject: "Science", grade: "Grade 11", medium: "Tamil",   level: "Secondary", tutor: "Suthakaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "6.45-7.45 PM" }, { day: "Saturday", time: "8-9 PM" }] },
  { code: "GT11ICT",     subject: "ICT",     grade: "Grade 11", medium: "Tamil",   level: "Secondary", tutor: "Suganjan Senthilkumaran", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "9-10 PM" }, { day: "Wednesday", time: "9-10 PM" }] },

  // Grade 11 — English Medium
  { code: "GE11Tamil",   subject: "Tamil",   grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Niththi", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Thursday", time: "8.30-9.30 PM" }, { day: "Friday", time: "9-10 PM" }] },
  { code: "GE11English", subject: "English", grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Sumeerjitha", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "8-9 PM" }, { day: "Wednesday", time: "6.45-7.45 PM" }] },
  { code: "GE11History", subject: "History", grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Jenil Jeyanthan", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Wednesday", time: "8-9 PM" }, { day: "Thursday", time: "6.45-7.45 PM" }] },
  { code: "GE11Maths",   subject: "Mathematics", grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Uthayatharshini", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "9-10 PM" }, { day: "Wednesday", time: "9-10 PM" }] },
  { code: "GE11Science", subject: "Science", grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Mayoory", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Tuesday", time: "6.45-7.45 PM" }, { day: "Friday", time: "8-9 PM" }] },
  { code: "GE11ICT",     subject: "ICT",     grade: "Grade 11", medium: "English", level: "Secondary", tutor: "Sajeth", monthlyFee: "Rs. 1,200",
    sessions: [{ day: "Monday", time: "8-9 PM" }, { day: "Saturday", time: "8-9 PM" }] },
];

/* =====================================================================
 * G.C.E A-L — Tamil Medium (2026, 2027, 2028 cohorts)
 * ===================================================================== */
const AL: TimetableEntry[] = [
  // A/L 2026 cohort
  { code: "GT26Physics(R)", subject: "Physics (Revision)", grade: "A/L 2026", medium: "Tamil", level: "A/L", tutor: "A. Kabilthas", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Monday", time: "7.30-9 PM" }, { day: "Wednesday", time: "7.30-9 PM" }] },

  // A/L 2027 cohort
  { code: "GT27Maths", subject: "Combined Mathematics", grade: "A/L 2027", medium: "Tamil", level: "A/L", tutor: "Muhthaseem", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Tuesday", time: "7-9 PM" }, { day: "Thursday", time: "7-9 PM" }] },
  { code: "GT27Physics", subject: "Physics", grade: "A/L 2027", medium: "Tamil", level: "A/L", tutor: "Jeyasuthan", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Monday", time: "7-8.30 PM" }, { day: "Friday", time: "7-8.30 PM" }] },
  { code: "GT27ICT", subject: "ICT", grade: "A/L 2027", medium: "Tamil", level: "A/L", tutor: "Sajeth", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Wednesday", time: "8.30-10 PM" }, { day: "Friday", time: "8.30-10 PM" }] },

  // A/L 2028 cohort
  { code: "GT28CMaths235", subject: "Combined Mathematics", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "V. Ranjithkumara", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Monday", time: "7-8.30 PM" }, { day: "Wednesday", time: "8.30-10 PM" }] },
  { code: "GT28ICT243", subject: "ICT", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "Sajeth", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Thursday", time: "8.30-9.30 PM" }, { day: "Saturday", time: "7-8 PM" }] },
  { code: "GT28CPhysics096", subject: "Physics", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "A. Jeyasuthan", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Tuesday", time: "7-8.30 PM" }, { day: "Thursday", time: "7-8.30 PM" }] },
  { code: "GT28CPhysics250", subject: "Physics", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "A. Kabilthas", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Thursday", time: "7-8.30 PM" }, { day: "Friday", time: "7-8.30 PM" }] },
  { code: "GT28Chemistry256", subject: "Chemistry", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "S. Sharujan", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Friday", time: "9-10.30 PM" }, { day: "Saturday", time: "7-8.30 PM" }] },
  { code: "GT28Biology251", subject: "Biology", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "A. Tharsan", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Monday", time: "7-8.30 PM" }, { day: "Wednesday", time: "7-8.30 PM" }] },
  { code: "GT28CMaths255", subject: "Combined Mathematics", grade: "A/L 2028", medium: "Tamil", level: "A/L", tutor: "Mayooran", monthlyFee: "Rs. 2,500",
    sessions: [{ day: "Monday", time: "9-10.30 PM" }, { day: "Wednesday", time: "9-10.30 PM" }] },
];

export const TIMETABLE: TimetableEntry[] = [...PRIMARY, ...SECONDARY, ...AL];

/* --------------------------------------------------------------- */
/* Conduct rules - shown on the timetable page, taken verbatim from */
/* the 2026 timetable PDF.                                           */
/* --------------------------------------------------------------- */
export const CONDUCT_RULES: string[] = [
  "Proper internet and device to study.",
  "Must turn on video when studying unless its culturally impossible.",
  "Sitting for exams and completing all assignments, home works are mandatory.",
  "Should respond to tutors queries during class. Non respondants will be removed from class.",
  "Regular attendance is important. If continuously absent for 3 classes, student will be removed from class and cannot join back.",
  "Classes are conducted via EDUS Tutor Mobile & Web App and Google Meet only.",
];
