/**
 * India market - shared data tables used across IN sections.
 * Pure data only. No JSX, no client hooks.
 */

export const SUBJECTS = ["Mathematics", "Science", "English"] as const;

export type Grade = { g: string; tier: string; tint: string };
export const GRADES: Grade[] = [
  { g: "6",  tier: "Middle Stage",    tint: "#2563EB" },
  { g: "7",  tier: "Middle Stage",    tint: "#2563EB" },
  { g: "8",  tier: "Middle Stage",    tint: "#2563EB" },
  { g: "9",  tier: "Secondary Stage", tint: "#8B5CF6" },
  { g: "10", tier: "Secondary Stage", tint: "#8B5CF6" },
];

export type Slot = { slot: string; time: string; tint: string };
export const SCHEDULE: Slot[] = [
  { slot: "Slot 1",   time: "6:30 PM - 7:30 PM",  tint: "#2563EB" },
  { slot: "Slot 2",   time: "7:45 PM - 8:45 PM",  tint: "#8B5CF6" },
  { slot: "Optional", time: "9:00 PM - 10:00 PM", tint: "#06B6D4" },
];

export type PricingTier = {
  tag: string;
  price: string;
  unit: string;
  note: string;
  tint: string;
  featured?: boolean;
};

export const PRICING: PricingTier[] = [
  {
    tag: "Admission Fee",
    price: "₹2,000",
    unit: "one-time",
    note: "One-time fee for every student who joins EDUS - paid only once at the start.",
    tint: "#2563EB",
  },
  {
    tag: "Per Subject",
    price: "₹1,000",
    unit: "/ subject / month",
    note: "Standard monthly fee per individual subject. Pick the subjects your child needs.",
    tint: "#06B6D4",
  },
  {
    tag: "All 3 Subjects",
    price: "₹2,500",
    unit: "/ month",
    note: "Take all three core subjects together and save ₹500 - only ₹2,500 instead of ₹3,000.",
    tint: "#8B5CF6",
    featured: true,
  },
];

export const PRICING_INCLUDES = [
  "Onboarding & assessment",
  "Account setup & welcome pack",
  "2 hours / week per subject",
  "Live online + recorded sessions",
  "Individual attention in every class",
  "Performance monitoring",
  "Monthly parent reporting & progress reviews",
  "Anytime parent support",
];

export type Pillar = {
  icon: string;
  title: string;
  body: string;
  tint: string;
};

export const PILLARS: Pillar[] = [
  { icon: "📈", title: "Structured monitoring",      body: "Class observation, tutor feedback, and academic SOPs run every month - not as marketing, as process.", tint: "#2563EB" },
  { icon: "📋", title: "Monthly reporting",          body: "Attendance, homework, and topic-by-topic progress shared with parents every week. No black box.",       tint: "#8B5CF6" },
  { icon: "📊", title: "Exam analytics",             body: "Term and unit exams modelled on board paper structure, scored against subject benchmarks each month.",   tint: "#06B6D4" },
  { icon: "🛡️", title: "Disciplined tutor system", body: "Vetted, demo-tested, interviewed, trained. Always on time. Always on syllabus. Always accountable.",     tint: "#22C55E" },
];
