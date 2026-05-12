/**
 * Blog post data — pure TS module. Add posts by appending to POSTS.
 *
 * Each post renders at /blog/[slug] with BlogPosting JSON-LD. The body
 * uses a small subset of "marks" (string array → paragraphs) so we don't
 * pull in MDX or markdown-to-html until volume demands it.
 *
 * IMPORTANT: until real authors are assigned, posts use the "EDUS Academic
 * Team" byline. Replace with named authors once tutor / academic head bios
 * exist. Same applies to images — drop in /public/blog/<slug>.jpg when
 * available; otherwise the brand OG image stays as the fallback.
 */

export type Author = {
  name: string;
  role: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  market: "SL" | "IN" | "MV" | "GL" | "ALL";
  marketLabel: string;
  marketTint: string;
  author: Author;
  datePublished: string; // ISO YYYY-MM-DD
  dateModified?: string; // ISO YYYY-MM-DD
  readingMinutes: number;
  image?: string; // path under /public, e.g. "/blog/cbse-tn.jpg"
  draft?: boolean;
  // Body paragraphs. Use double-newline inside a string for hard breaks
  // within a single paragraph. Headings start with "## ".
  body: string[];
};

const DEFAULT_AUTHOR: Author = {
  name: "EDUS Academic Team",
  role: "Editorial",
};

export const POSTS: BlogPost[] = [
  {
    slug: "grade-5-scholarship-exam-2026-guide",
    title: "Grade 5 Scholarship Exam 2026 — A Practical Guide for Parents",
    description:
      "What the Grade 5 Scholarship exam in Sri Lanka tests, how to plan revision, and how online tuition can help your child prepare without burnout.",
    market: "SL",
    marketLabel: "Sri Lanka",
    marketTint: "#2563EB",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-15",
    readingMinutes: 6,
    draft: true,
    body: [
      "## What the exam tests",
      "The Grade 5 Scholarship exam (often called the Year 5 Scholarship) is a national examination held by Sri Lanka's Department of Examinations. It tests reasoning, mathematics, and language at a level designed to select students for popular secondary schools.",
      "The paper structure is consistent year-on-year: Part I covers reasoning, Part II covers mathematics applied to short scenarios, and Part III is a language paper in the medium of instruction.",
      "## How to plan revision",
      "Most families start serious preparation in Grade 4. The goal isn't to finish a syllabus — it's to build comfort with the question format. Daily practice for short sessions (30–45 minutes) beats marathon weekend sessions.",
      "Cover one section per week. Rotate. Review wrong answers before moving on.",
      "## Where EDUS fits",
      "EDUS runs structured online classes for Grade 5 Scholarship preparation in Sinhala, Tamil, and English medium. Classes are live with a fixed lesson plan, and recordings are available for revision. Parents receive weekly progress updates so you know what your child has covered and where attention is needed.",
      "If you'd like to enrol, head to https://signup.edustutor.com/ or contact the EDUS team.",
    ],
  },
  {
    slug: "cbse-class-10-maths-tamil-nadu-prep-strategy",
    title: "CBSE Class 10 Mathematics — A Prep Strategy for Tamil Nadu Students",
    description:
      "How to structure CBSE Class 10 Maths revision for board exam success. Topic-by-topic priority list, time allocation, and how online tuition helps.",
    market: "IN",
    marketLabel: "India",
    marketTint: "#8B5CF6",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-22",
    readingMinutes: 7,
    draft: true,
    body: [
      "## Why Class 10 Maths matters",
      "CBSE Class 10 board results follow the student to higher secondary stream selection and competitive entrance exams. Mathematics is the highest-weight subject in most stream allocations, and the paper rewards consistent practice over crammed memorisation.",
      "## Topics in priority order",
      "Based on the last five years of CBSE board papers, the highest-yield chapters are: Quadratic Equations, Arithmetic Progressions, Coordinate Geometry, Triangles (similarity proofs), Surface Areas and Volumes, and Statistics. Real Numbers and Polynomials carry fewer marks but trip up students who skip them.",
      "Allocate revision time proportional to paper weight, not chapter length.",
      "## Where online tuition helps",
      "EDUS CBSE Class 10 Maths runs as a live online class with structured topic coverage, weekly mock practice, and individual doubt-clearing. Tutors are trained on the CBSE board paper structure and benchmark against actual cut-offs from previous years.",
      "Monthly parent reports show topic completion, mock scores, and weak areas — you see real progress instead of just attendance.",
    ],
  },
  {
    slug: "cambridge-igcse-maldives-subject-choice-guide",
    title: "Cambridge IGCSE in Maldives — How to Choose the Right Subjects",
    description:
      "A guide to Cambridge IGCSE subject selection for Maldives students. Compulsory subjects, recommended electives, and how 1-to-1 online tutoring can help.",
    market: "MV",
    marketLabel: "Maldives",
    marketTint: "#22C55E",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-29",
    readingMinutes: 5,
    draft: true,
    body: [
      "## The IGCSE framework",
      "Cambridge IGCSE is a two-year programme typically taken in Grades 9 and 10. Students sit between five and ten subjects, with grades awarded from A* down to G. Most Maldivian schools require a core set and let students choose electives.",
      "## What to pick",
      "Maths, English Language, and at least one science (Biology, Chemistry, or Physics) are non-negotiable for most higher-secondary pathways. Beyond that, the choice depends on whether the student is leaning toward sciences, business, or humanities at A-Level or O-Level.",
      "Avoid taking too many subjects. Five strong grades beat eight weak ones for university applications.",
      "## How 1-to-1 online tutoring works",
      "EDUS offers 1-to-1 Cambridge IGCSE tuition for Maldivian students living anywhere — on Malé or any outer island. Live sessions, recordings for revision, and tutor matching based on the specific subjects the student is preparing for.",
      "Sessions are scheduled around the Maldivian school calendar so they complement rather than clash with school work.",
    ],
  },
  {
    slug: "cambridge-vs-edexcel-igcse-which-to-choose",
    title: "Cambridge vs Edexcel IGCSE — Which Should Your Child Take?",
    description:
      "A side-by-side comparison of Cambridge IGCSE and Edexcel International GCSE. Differences in grading, paper structure, and which is best for university applications.",
    market: "GL",
    marketLabel: "Global",
    marketTint: "#06B6D4",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-05-06",
    readingMinutes: 6,
    draft: true,
    body: [
      "## The same destination, two roads",
      "Cambridge IGCSE and Edexcel International GCSE both lead to the same place — university admission, A-Levels, IB diploma. Both are recognised globally. The choice usually comes down to school availability and subject preference, not academic prestige.",
      "## Key differences",
      "Cambridge IGCSE uses A* to G grading with the option of an extended paper for higher-achieving students. Edexcel International GCSE uses 9 to 1 grading aligned to the UK domestic GCSE.",
      "Paper structure differs by subject. Cambridge tends to favour structured question banks; Edexcel often gives slightly longer applied questions. Neither is harder — they just test the same skills differently.",
      "## Which to pick",
      "Pick based on (1) what your child's school offers, (2) the textbook your child is most comfortable with, and (3) which subject specifications align with their strengths. For students planning UK university applications, either is fully accepted.",
      "EDUS Global offers 1-to-1 tutoring for both boards. Pick the syllabus and the tutor is matched to the specific board paper structure.",
    ],
  },
];

export const PUBLISHED_POSTS = POSTS.filter((p) => !p.draft);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
