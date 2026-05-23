/**
 * Shared chatbot types - used by both the server-side /api/chat
 * + /api/lead routes and the client-side chat panel components.
 *
 * Kept in one file so the wire format between browser and server
 * stays in lockstep without import gymnastics.
 */

/** A single class entry sourced from /public/data/classes.json. */
export type ClassEntry = {
  classCode: string;
  grade: string;
  subject: string;
  medium: string;
  monthlyFee: number;
  teacher: string;
  tutorId: string;
  schedule: ScheduleSlot[];
};

/** One weekly slot. day = SUN..SAT, times in 24h "HH:MM" Asia/Colombo. */
export type ScheduleSlot = {
  day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  start: string;
  end: string;
};

/** Tutor profile sourced from /public/data/tutors.json. */
export type TutorProfile = {
  fullName: string;
  headline: string;
  experienceYears: number;
  languages: string[];
  mediums: string[];
  subjects: string[];
  avatarUrl: string;
};

/** Single message in the chat history. Sent both ways over the wire. */
export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

/** POST body shape the browser sends to /api/chat. */
export type ChatRequest = {
  messages: ChatMessage[];
};

/**
 * Lead payload captured at the end of a conversation. Posted from the
 * client (or server, depending on flow) to /api/lead, which forwards
 * to NEXT_PUBLIC_LEAD_ENDPOINT.
 *
 * Strictly minimal - only fields a parent should comfortably share
 * before the EDUS team contacts them. No DOB, no email if phone is
 * present, no payment data, no address.
 */
export type LeadPayload = {
  name: string;
  phone: string;
  country: string;
  grade: string;
  medium: string;
  subject: string;
  /** Optional context from the conversation - what the parent told the bot. */
  notes?: string;
  /** Optional - the class the bot recommended, if any. */
  recommendedClassCode?: string;
};
