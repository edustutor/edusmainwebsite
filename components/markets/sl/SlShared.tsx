/**
 * Sri Lanka market - shared data tables used across SL sections.
 * Pure data only. No JSX, no client hooks.
 */

export const SUBJECTS_NATIONAL = [
  "Mathematics", "Science", "English", "Tamil", "Sinhala",
  "Environmental Studies", "History", "ICT", "Spoken English",
  "Elocution", "IQ", "Physics", "Chemistry", "Biology", "Combined Mathematics",
] as const;

export const SUBJECTS_INTL = [
  "Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology",
  "Economics", "Business Studies", "Accounting", "ICT", "English Language", "English Literature",
] as const;

export type PricingTier = {
  tag: string;
  price: string;
  unit: string;
  grades: string;
  bullets: string[];
  tint: string;
  featured?: boolean;
};

export const PRICING: PricingTier[] = [
  {
    tag: "Group - Primary",
    price: "From LKR 1,000",
    unit: "/ subject / month",
    grades: "Primary Classes",
    bullets: [
      "Core subjects from LKR 1,000",
      "English & IQ classes available",
      "Spoken English option available",
    ],
    tint: "#2563EB",
  },
  {
    tag: "Group - Secondary",
    price: "From LKR 1,000",
    unit: "/ subject / month",
    grades: "Grade 6 - 11 - O/L",
    bullets: [
      "Grades 6 - 9 from LKR 1,000",
      "Grades 10 - 11 from LKR 1,200",
      "Tamil & English medium classes",
    ],
    tint: "#8B5CF6",
    featured: true,
  },
  {
    tag: "Group - Advanced Level",
    price: "LKR 2,500",
    unit: "/ subject / month",
    grades: "G.C.E. A/L",
    bullets: [
      "Combined Maths, Physics & ICT",
      "Chemistry and Biology classes",
      "2026, 2027 & 2028 batches",
    ],
    tint: "#06B6D4",
  },
];

export type GroupHighlight = {
  icon: string;
  title: string;
  points: string[];
  tint: string;
};

export const GROUP_HIGHLIGHTS: GroupHighlight[] = [
  {
    icon: "👩‍🏫",
    title: "Expert Tutors for Every Subject",
    points: [
      "Carefully selected, experienced tutors",
      "Strong subject knowledge and exam expertise",
      "Proven teaching ability across grades",
      "Student-focused, supportive guidance",
    ],
    tint: "#2563EB",
  },
  {
    icon: "🎯",
    title: "Individual Attention in a Group Class",
    points: [
      "Attendance monitoring every class",
      "Regular class follow-ups for every student",
      "Doubt support and one-on-one Q&A",
      "Continuous progress observation",
    ],
    tint: "#8B5CF6",
  },
  {
    icon: "🕡",
    title: "Fixed Evening Timetable",
    points: [
      "Classes scheduled after 6.00 p.m.",
      "Easy to attend after school hours",
      "No disturbance to daily academic routine",
      "Consistent weekly schedule",
    ],
    tint: "#06B6D4",
  },
  {
    icon: "📈",
    title: "Term Exams & Progress Tracking",
    points: [
      "Regular term exams every term",
      "Assessments and performance reviews",
      "Clear progress understanding",
      "Confident exam preparation",
    ],
    tint: "#FACC15",
  },
];

export type HolisticFeature = {
  icon: string;
  title: string;
  body: string;
};

export const HOLISTIC_FEATURES: HolisticFeature[] = [
  {
    icon: "🏅",
    title: "Quality Course Content",
    body: "Access to quality contents developed in house for students to understand easily and effectively.",
  },
  {
    icon: "🗓️",
    title: "Flexible Timings",
    body: "The 1-1 interaction with our tutors makes it easy and you can schedule your lessons at a frequency and time that suits you.",
  },
  {
    icon: "🎯",
    title: "Individual Attention",
    body: "Every student is given individual attention to learn at their own pace.",
  },
  {
    icon: "👩‍🏫",
    title: "Qualified Tutors",
    body: "Learn from the Qualified Professionals to unlock the true potential of every individual.",
  },
];

export type Testimonial = {
  name: string;
  loc: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { name: "K. Ellakiya", loc: "Kandy", role: "Student", quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime." },
  { name: "P. Vijithan", loc: "Colombo", role: "Student", quote: "Their Cambridge courses are great, but the best part is the online forums and the community." },
  { name: "T. Kalaivani", loc: "Kalmunai", role: "Parent", quote: "EDUS is perfect for working moms. Their online platform lets my daughter learn anytime." },
  { name: "A. Chellakumar, LLB", loc: "Galle", role: "Parent", quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs." },
  { name: "C. Kajansika", loc: "Batticaloa", role: "Student", quote: "What I love about EDUS is the community. Even online, I feel connected to my peers." },
];
