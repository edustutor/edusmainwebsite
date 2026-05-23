/**
 * Shared chatbot types - used by both the server-side /api/chat
 * + /api/lead routes and the client-side chat panel components.
 *
 * Kept in one file so the wire format between browser and server
 * stays in lockstep without import gymnastics.
 */

/** A single class entry sourced from /public/data/classes.json.
 *
 * Two flavours of class share this shape:
 *   - GROUP: fixed weekly slots, multiple students, lower fee.
 *   - INDIVIDUAL: 1-on-1, parent picks a slot, higher fee, optional
 *     Cambridge / Edexcel syllabus support.
 *
 * The admission-fee tier the parent owes depends on which flavour(s)
 * they pick. Locked tiers (Sri Lanka offering):
 *   - GROUP only       -> LKR 1,000 one-time
 *   - INDIVIDUAL only  -> LKR 2,500 one-time
 *   - BOTH             -> LKR 3,500 one-time (saves LKR 0 vs sum but
 *                        signals a packaged path)
 *
 * `monthlyFee` semantics:
 *   - GROUP: per month, all sessions included.
 *   - INDIVIDUAL: per session base price (90-min default). EDUS team
 *     confirms the per-week cadence with the parent on follow-up.
 */
export type ClassEntry = {
  classCode: string;
  /** "GROUP" = open weekly class. "INDIVIDUAL" = 1-on-1 booking. */
  classType: "GROUP" | "INDIVIDUAL";
  grade: string;
  subject: string;
  medium: string;
  /** "National" | "Cambridge" | "Edexcel" | comma-joined for multi-syllabus. */
  syllabus: string;
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
  /**
   * Optional intake context. When present, the server injects it into
   * the system prompt so the bot doesn't re-ask facts the user already
   * shared via the pre-chat IntakeForm. Absent on the very first
   * exchange (if the form has not been completed yet) - in which case
   * the bot falls back to asking clarifying questions.
   */
  intake?: IntakePayload | null;
};

/**
 * Lead payload captured at the end of a conversation. Posted from the
 * client (or server, depending on flow) to /api/lead, which forwards
 * to NEXT_PUBLIC_LEAD_ENDPOINT.
 *
 * Strictly minimal - only fields a parent should comfortably share
 * before the EDUS team contacts them. No DOB, no email if phone is
 * present, no payment data, no address.
 *
 * `subject` is optional because the intake form collects only the
 * facts needed to start a useful conversation (name, country, syllabus,
 * grade, medium, phone). The specific subject often emerges from the
 * chat itself (e.g. "I want Maths for Grade 8" -> subject: "Maths").
 */
export type LeadPayload = {
  name: string;
  phone: string;
  country: string;
  syllabus: string;
  grade: string;
  medium: string;
  subject?: string;
  /** Optional context from the conversation - what the parent told the bot. */
  notes?: string;
  /** Optional - the class the bot recommended, if any. */
  recommendedClassCode?: string;
};

/**
 * Pre-chat intake captured by IntakeForm BEFORE the conversation begins.
 *
 * Functionally a subset of LeadPayload - same shape, no subject yet,
 * no notes / class code yet (those land when the chat completes a
 * useful match). We model it as its own type so the form component
 * doesn't have to know about lead-payload extras.
 */
export type IntakePayload = {
  name: string;
  phone: string;
  country: string;
  syllabus: string;
  grade: string;
  medium: string;
};
