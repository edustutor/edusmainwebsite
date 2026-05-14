/**
 * Blog post data - pure TS module. Add posts by appending to POSTS.
 *
 * Each post renders at /blog/[slug] with BlogPosting JSON-LD. The body
 * uses a small subset of "marks" (string array → paragraphs) so we don't
 * pull in MDX or markdown-to-html until volume demands it.
 *
 * Posts use the "EDUS Academic Team" byline until named authors are
 * assigned. The brand OG image stays as the fallback when a post has
 * no custom image - drop in /public/blog/<slug>.jpg to override.
 *
 * Editorial style:
 *   - Title 50-65 chars (Google SERP truncation)
 *   - Description 150-160 chars with a verb-led CTA
 *   - Body opens with a direct answer paragraph (featured snippet bait)
 *   - H2 every 200-300 words for skimmability
 *   - End with internal links to relevant EDUS pages
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
  // Body paragraphs. Headings start with "## ". Inline links use plain URL
  // text (rendered as-is in the simple paragraph renderer).
  body: string[];
};

const DEFAULT_AUTHOR: Author = {
  name: "EDUS Academic Team",
  role: "Editorial",
};

const TODAY = "2026-05-13";

export const POSTS: BlogPost[] = [
  /* =====================================================================
   * SRI LANKA - Grade 5 Scholarship preparation guide
   * ===================================================================== */
  {
    slug: "grade-5-scholarship-exam-2026-guide",
    title: "Grade 5 Scholarship Exam 2026 - Practical Guide for Parents",
    description:
      "Plan your child's Grade 5 Scholarship Exam preparation in 2026. Exam structure, paper-by-paper strategy, study schedule, and where online tuition fits.",
    market: "SL",
    marketLabel: "Sri Lanka",
    marketTint: "#2563EB",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-15",
    dateModified: TODAY,
    readingMinutes: 11,
    image: "/edus-og.jpg",
    body: [
      "The Grade 5 Scholarship Exam in Sri Lanka is one of the most consequential tests a primary-school child sits. A strong result opens doors to popular national secondary schools. A weak result doesn't close them, but it does narrow the path. Most families spend at least one full year preparing, and the difference between a confident pass and a stressful one usually comes down to how that year is structured - not how many hours the child works.",
      "This guide walks through the exam framework, how the paper actually breaks down, a workable revision schedule, the most common mistakes parents and tutors make, and where structured online tuition fits the preparation plan.",

      "## What is the Grade 5 Scholarship Exam?",
      "The Grade 5 Scholarship Exam is a national examination held annually by Sri Lanka's Department of Examinations for students in Year 5 (Grade 5) of primary school. Students who score above the scholarship cut-off - which varies year-on-year and by district - qualify for placement at popular government secondary schools, and a smaller number also qualify for a scholarship stipend.",
      "The exam is held in the medium of instruction the student is studying in (Sinhala, Tamil, or English) and consists of two papers, both written on the same day.",

      "## How the paper is structured",
      "The exam is split into two papers of 45 minutes each, separated by a short break.",
      "Paper 1 contains 40 multiple-choice questions covering general intelligence, reasoning, and language. Roughly half the paper tests verbal and non-verbal reasoning (number sequences, pattern recognition, classification, analogies, basic arithmetic logic), and the other half tests language comprehension in the medium of instruction (vocabulary, grammar, short reading passages).",
      "Paper 2 contains 20 structured questions covering mathematics and applied problem-solving. Topics are drawn from the primary mathematics syllabus - number operations, fractions, decimals, measurement, basic geometry, time, money, and word problems - but the framing is consistently scenario-based. Students don't just compute; they have to read a short situation and decide what to compute.",

      "## What scoring well actually requires",
      "Across both papers, three skills account for almost all the mark variance between high and average scorers:",
      "First, **reading speed in the medium of instruction**. A student who can read a 4-sentence Paper 2 word problem in 15 seconds finishes the paper. A student who takes 60 seconds reads, re-reads, and runs out of time. Reading fluency in Sinhala, Tamil, or English (whichever is the medium) is the foundation.",
      "Second, **fast arithmetic under timed conditions**. Not advanced - just confident. A child who can do two-digit multiplication or fraction comparison without writing it down saves 30-60 seconds per question, which translates to 10-15 minutes of extra time across the paper.",
      "Third, **pattern familiarity**. Reasoning questions repeat patterns year after year - sequences with one rule, pairs that share a relationship, the odd-one-out, the next-in-series. Children who have practised these for 6+ months pattern-match in seconds. Children who haven't waste time trying to derive the logic from scratch.",

      "## A realistic 12-month revision plan",
      "Most families that produce strong results follow some version of this shape:",

      "### Months 1-3 - Foundations",
      "Cover the Grade 5 mathematics syllabus end-to-end at school pace. Don't rush ahead. The goal at this stage is comprehension, not speed. Daily 20-30 minute practice sessions, one topic per week. Read aloud in the medium of instruction every day - newspaper headlines, short story books, anything that builds fluency.",

      "### Months 4-7 - Pattern building",
      "Switch from textbook practice to past-paper practice on reasoning sections. Work through 5-7 sets of reasoning questions per week. Children begin to recognise question types. Maths practice continues but shifts toward applied word problems with the scenario framing the actual exam uses.",

      "### Months 8-10 - Full-paper practice",
      "Start timed full-paper sessions. One per fortnight initially, then one per week. After each paper, spend 30-45 minutes reviewing wrong answers and the reasoning behind the right answers. The review is more valuable than the paper itself.",

      "### Months 11-12 - Sharpening and rest",
      "Two timed papers per week, alternating with light revision and proper sleep. The final month is not for cramming new content - it's for keeping the child confident, well-rested, and used to the exam rhythm. Burnout in the final weeks costs more marks than any amount of last-minute revision saves.",

      "## Common mistakes parents make",
      "**Starting too late.** Beginning serious preparation only in Term 3 of Grade 5 forces a child to learn content and exam technique simultaneously. The result is anxiety, not mastery.",
      "**Over-loading hours.** Three hours of focused practice produces better results than six hours of distracted practice. Children at this age cap out at around 60-90 minutes of focused study before the brain stops absorbing.",
      "**Skipping the language paper.** Many parents over-invest in maths and assume language will take care of itself. It won't. Language carries roughly half of Paper 1 - neglecting it is a 20-25 mark gift to the average student.",
      "**Not reviewing wrong answers.** A wrong answer that's never reviewed will repeat. Building a small notebook of recurring mistake types is one of the highest-leverage habits in the entire preparation cycle.",

      "## Choosing a tuition path",
      "Children prepare for the Grade 5 Scholarship in three common ways: at school only, in offline tuition classes, or online with a structured tutor. Each has trade-offs.",
      "**School-only preparation** is free but inconsistent - the depth depends entirely on the class teacher's experience with the scholarship exam.",
      "**Offline tuition** offers focused practice with peers but requires travel time, fixed schedules, and large class sizes that limit individual attention.",
      "**Online tuition with a structured tutor** - what EDUS offers - combines the focus of dedicated scholarship preparation with the flexibility to study from home, in any medium, with class recordings for revision. Parents receive weekly progress updates so you can see exactly which topics your child has covered and where attention is still needed.",
      "EDUS runs Grade 5 Scholarship preparation classes in Sinhala, Tamil, and English medium, with separate streams for Paper 1 reasoning and Paper 2 mathematics. Classes are live and structured to the actual exam format, not generic primary-school revision.",

      "## Final thoughts",
      "The Grade 5 Scholarship Exam rewards consistency over intensity. A child who spends 45 minutes a day for 12 months will outperform a child who spends 4 hours a day for the last 2 months, almost without exception. Build the habit early, focus on the three skills that move marks (reading speed, arithmetic fluency, pattern familiarity), and treat exam technique as a separate skill to practise - not something that happens automatically.",
      "EDUS has a long history of honouring Grade 5 Scholarship achievers in the Northern Province community - you can see photos from one of those small ceremonies at https://edustutor.com/gallery/edus-honors-kokuvil-hindu-primary-grade-5-scholarship and browse other EDUS milestones in the wider https://edustutor.com/gallery archive.",
      "If you'd like to enrol your child in a structured Grade 5 Scholarship class, visit https://signup.edustutor.com/ and choose your preferred medium. The EDUS academic team will follow up to confirm the right class and tutor within one business day.",
      "You can also see all our Sri Lanka classes at https://edustutor.com/sl or contact the team at https://edustutor.com/contact for personalised guidance.",
    ],
  },

  /* =====================================================================
   * INDIA - CBSE Class 10 Mathematics board preparation
   * ===================================================================== */
  {
    slug: "cbse-class-10-maths-tamil-nadu-prep-strategy",
    title: "CBSE Class 10 Mathematics - Prep Strategy for Tamil Nadu Students",
    description:
      "Topic-priority revision plan, board paper structure, common mistakes, and study schedule for CBSE Class 10 Maths. Tamil Nadu-specific guidance.",
    market: "IN",
    marketLabel: "India",
    marketTint: "#8B5CF6",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-22",
    dateModified: TODAY,
    readingMinutes: 12,
    image: "/edus-og.jpg",
    body: [
      "CBSE Class 10 Mathematics is one of the highest-leverage subjects in a student's school career. The board result follows the student into higher-secondary stream selection, scholarship applications, and competitive entrance preparation. For Tamil Nadu CBSE students specifically, the result also opens or closes doors to specific Plus One streams at sought-after schools and colleges across Chennai, Coimbatore, Madurai, Trichy, and Salem.",
      "This guide is a working strategy - not a syllabus summary. It assumes the student has access to the standard CBSE textbook and NCERT exemplar, and focuses on how to spend the available preparation time to maximise the board score.",

      "## How the CBSE Class 10 Maths paper is structured",
      "The CBSE Class 10 Mathematics board paper is 80 marks (with 20 internal-assessment marks bringing the total to 100). Time allowed is 3 hours. The paper is split across four sections of increasing question weight:",
      "**Section A** contains 20 multiple-choice and very short answer questions worth 1 mark each. Quick recall, definitions, formulae, basic computation. **Section B** has 5 short-answer questions worth 2 marks each. **Section C** has 6 short-answer questions worth 3 marks each. **Section D** has 4 long-answer questions worth 5 marks each. **Section E** has 3 case-study questions worth 4 marks each (each case has 3 sub-parts).",
      "Understanding the section weights is the single most useful preparation step. Most students under-prepare for Section A - the 20 one-markers - and lose 5-10 easy marks they should have banked.",

      "## Topic priority by board paper weight",
      "Across the last 5 years of CBSE Class 10 Maths papers, certain chapters appear with much higher weight than others. Use this as your revision priority order:",

      "### Tier 1 - High weight, must master",
      "**Quadratic Equations** (typically 8-10 marks). Factorisation, completing the square, quadratic formula, discriminant analysis, word problems involving quadratic relationships. Almost guaranteed to appear in Section C or D.",
      "**Arithmetic Progressions** (typically 6-8 marks). nth term, sum of n terms, applied word problems. Mechanical once practised - high return for time invested.",
      "**Triangles** (similarity theorems, 7-10 marks). Basic Proportionality Theorem, criteria for similarity, area ratios, Pythagoras applications. Proof-writing technique matters here - partial marks are common for students who set up the proof correctly even if they don't finish.",
      "**Coordinate Geometry** (6-8 marks). Distance formula, section formula, area of triangles, midpoint, applications. Highly formulaic - practice yields fast gains.",

      "### Tier 2 - Medium weight, solid grounding required",
      "**Surface Areas and Volumes** (5-7 marks). Combinations of solids - frustum, hemisphere on cylinder, cone on cube. Visualisation is key; many students lose marks not in the calculation but in identifying which formula applies.",
      "**Statistics** (5-6 marks). Mean, median, mode for grouped data, ogives, cumulative frequency. Procedural - practise the format until it's automatic.",
      "**Probability** (3-5 marks). Theoretical probability of single events, combined events using sample-space enumeration.",
      "**Trigonometry** including heights and distances (6-8 marks). Standard angle values, identities, and angle-of-elevation/depression word problems.",

      "### Tier 3 - Lower weight, don't skip",
      "**Real Numbers** (3-4 marks). Euclid's division lemma, fundamental theorem of arithmetic, irrationality proofs. Often a Section A or B question - easy marks if you've reviewed the chapter.",
      "**Polynomials** (3-5 marks). Relationship between zeros and coefficients, division algorithm. Quick to revise.",
      "**Pair of Linear Equations in Two Variables** (5-7 marks). Substitution, elimination, graphical interpretation, consistency check.",
      "**Circles, Constructions, Areas Related to Circles** - appear inconsistently. Cover the basics but don't over-invest.",

      "## A 16-week revision plan",
      "Working backwards from the board exam, here's a sustainable plan that produces consistent results:",

      "### Weeks 1-6 - Syllabus completion",
      "Finish all 14 chapters from the NCERT textbook at school pace. Don't skip any chapter - even the low-weight ones often appear in Section A. Complete every NCERT exercise. The NCERT exemplar problems can wait until later.",

      "### Weeks 7-10 - Topic mastery",
      "Work through the NCERT exemplar problems chapter-by-chapter, prioritising Tier 1 chapters. The exemplar problems are harder than the textbook and closer to board paper standard. Don't rush - spend 3-4 days per chapter, including reviewing wrong answers in detail.",

      "### Weeks 11-13 - Sample papers",
      "Start solving CBSE sample papers and previous-year board papers in timed conditions. One paper per week, gradually moving to one paper every 4-5 days. After each paper, identify the chapter behind every wrong answer and revisit that chapter's exemplar problems.",

      "### Weeks 14-16 - Refinement",
      "Two timed papers per week. Use the remaining time to revise formulae, theorem statements, and proof structures. Maintain a one-page formula sheet - write it from memory once a week.",

      "## What separates 95+ scorers from 85 scorers",
      "Across years of board results, the top scorers tend to share four habits:",
      "**They revise the chapter behind every wrong answer.** Not the question - the chapter. A wrong probability question often means the whole probability chapter needs another pass.",
      "**They write proofs in full sentences.** Two-mark proofs lose marks not because the maths is wrong but because the reasoning is illegible. Examiners can't award marks for what they can't read.",
      "**They attempt every question.** A blank 5-mark question is 5 zero marks. A partial attempt that sets up the equation correctly often picks up 1-2 marks even if the final answer is wrong.",
      "**They sleep before the exam.** The night before a 3-hour maths paper is not when new content gets absorbed - it's when accuracy collapses. Top scorers go to bed at a normal time and trust their preparation.",

      "## Where structured online tuition fits",
      "Self-study with NCERT works for highly self-directed students. For most, the difference between an 82 and a 92 comes down to having a structured tutor who: corrects proof-writing weekly, points out which chapters need more work after each mock, and explains why a method was wrong rather than just marking it red.",
      "EDUS CBSE Class 10 Mathematics runs as a live online class with structured chapter coverage, weekly mock practice, and individual doubt-clearing. Tutors are trained on the CBSE board paper structure and benchmark against actual cut-offs from previous years. Monthly parent reports show topic completion, mock scores, and chapters needing attention - you see real progress instead of just attendance.",
      "Classes run Monday to Saturday across three slots (6:30 PM, 7:45 PM, and an optional 9:00 PM slot), with 2 hours per week per subject. Pricing is ₹1,000 per subject per month, with a ₹2,500 monthly bundle covering Maths, Science, and English together.",

      "## Final thoughts",
      "CBSE Class 10 Mathematics is a paper that rewards process over inspiration. Cover the syllabus thoroughly, prioritise revision time by chapter weight, write clear and complete answers, and attempt every question. The students who score 95+ aren't smarter - they're better-prepared.",
      "If you'd like to enrol your child in EDUS CBSE Class 10 Maths, visit https://signup.edustutor.com/ or browse all our India CBSE classes at https://edustutor.com/in. The academic team will confirm the right class and start date within one business day.",
    ],
  },

  /* =====================================================================
   * MALDIVES - Cambridge IGCSE subject choice
   * ===================================================================== */
  {
    slug: "cambridge-igcse-maldives-subject-choice-guide",
    title: "Cambridge IGCSE Subject Choice - A Guide for Maldives Students",
    description:
      "How to pick Cambridge IGCSE subjects in Maldives. Compulsory subjects, electives, paper codes, and how 1-to-1 online tutoring closes weak areas.",
    market: "MV",
    marketLabel: "Maldives",
    marketTint: "#22C55E",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-04-29",
    dateModified: TODAY,
    readingMinutes: 10,
    image: "/edus-og.jpg",
    body: [
      "Cambridge IGCSE subject selection is one of the most important decisions a Maldivian Grade 9 or 10 student makes. The subjects taken now shape what's available at A-Level or O-Level, which in turn shapes university applications and career direction. The decision is harder than it looks because most schools offer 12 or more options, but only 5-9 are typically taken to exam, and the right combination depends on the student's strengths, school availability, and intended pathway.",
      "This guide is written specifically for Maldivian students and parents. It covers how IGCSE actually works, which subjects are non-negotiable, how to pick electives, common mistakes, and how 1-to-1 online tutoring helps close the gaps that classroom teaching leaves.",

      "## What Cambridge IGCSE is",
      "Cambridge IGCSE (International General Certificate of Secondary Education) is a two-year academic programme taken in Grades 9 and 10 (sometimes Year 10 and 11 in international schools). It's set and assessed by Cambridge Assessment International Education and is recognised by universities and employers in over 160 countries - including all major universities in the UK, US, Australia, Singapore, India, Malaysia, and across Europe.",
      "Students typically sit between 5 and 10 IGCSE subjects, with grades awarded from A* (highest) down to G. Most universities require at least 5 IGCSEs at grade C or above, including English and Mathematics.",

      "## Compulsory subjects - the non-negotiable core",
      "Three subjects are effectively required for almost any higher-education pathway:",
      "**Mathematics (Cambridge IGCSE Mathematics 0580)** - required by virtually every university and most A-Level science streams. Take Extended tier if aiming for sciences or engineering; Core tier is acceptable only for non-quantitative pathways.",
      "**English Language** - either Cambridge IGCSE First Language English (0500) for native or near-native speakers, or English as a Second Language (0510) for students taught primarily in another language. Universities accept both. Most Maldivian students take 0510, which EDUS specifically supports.",
      "**At least one science** - Biology (0610), Chemistry (0620), or Physics (0625). One is the minimum; two or three are required if aiming for medicine, engineering, or pure-science A-Levels.",

      "## How to pick the rest",
      "Beyond the core, students typically take 2-6 additional subjects. The right mix depends on the intended A-Level / O-Level pathway:",

      "### For science / medicine pathway",
      "Triple science (Biology, Chemistry, Physics) is non-negotiable. Add Mathematics Extended (or Additional Mathematics 0606 if offered). One humanity or language to round out the application - universities like to see breadth.",

      "### For business / economics pathway",
      "Mathematics Extended, Business Studies (0450), Economics (0455), Accounting (0452), and one science to demonstrate analytical breadth. A second language is increasingly valued by international business schools.",

      "### For humanities / law / arts pathway",
      "English Literature (0475), History (0470), Geography (0460), Sociology (0495), and a second language. At least one science is still useful to keep options open.",

      "### For computing / engineering pathway",
      "Mathematics Extended, Physics, Computer Science (0478), and ideally Additional Mathematics. ICT (0417) is useful but less academically weighted than Computer Science.",

      "## How many subjects to take",
      "Five strong grades almost always beat eight weak ones for university applications. UK universities in particular look at the highest 5-6 IGCSE grades, not the total count. Taking 9-10 subjects only makes sense if the student can confidently target A* or A in all of them - otherwise the marginal subjects pull the overall profile down.",
      "For most Maldivian students, the sweet spot is 6-7 subjects: the three core (Maths, English, one science) plus 3-4 carefully chosen electives that match the intended A-Level pathway.",

      "## Common mistakes",
      "**Taking subjects based on what friends are taking.** A student who hates History will struggle with it regardless of how much help they get. Pick based on interest and aptitude, not social factors.",
      "**Avoiding Mathematics Extended out of fear.** Core Mathematics caps the top grade at C in some specifications and limits A-Level options severely. If there's any chance of science or business A-Levels, Extended is the right call.",
      "**Picking subjects the school doesn't teach well.** A weakly-taught Chemistry class produces weak Chemistry grades regardless of student effort. If your school's track record in a subject is poor, either change the subject or supplement with structured outside tutoring.",
      "**Over-loading the timetable.** Eight or nine subjects across two years leaves no time for deep revision in the run-up to exams. Quality beats quantity.",

      "## Where 1-to-1 online tutoring closes the gap",
      "Classroom teaching in Maldives - whether on Malé or on outer islands - works at the pace of the average student. For some subjects in some schools, that pace is right. For others, the gap between what's taught and what the IGCSE board paper actually asks is significant.",
      "Common reasons families choose 1-to-1 IGCSE tutoring:",
      "**Chemistry and Physics** are taught in large classes with limited lab time at most schools. A 1-to-1 tutor can work through specific paper-style questions, common error patterns, and pace topics to the student's understanding rather than the class average.",
      "**Mathematics Extended** moves faster than Core and includes content (advanced algebra, functions, vectors, calculus introduction) that some teachers cover lightly. Targeted 1-to-1 sessions close those gaps cleanly.",
      "**Outer-island students** often have limited access to specialist subject teachers. Online tutoring removes the geography problem - a student in Addu, Fuvahmulah, or Kulhudhuffushi accesses the same tutor as a student in Malé.",
      "EDUS offers 1-to-1 Cambridge IGCSE tutoring for Maldivian students across all islands. Current subjects cover Mathematics 0580 (USD 20/hour), English as a Second Language 0510 (USD 18/hour), Biology 0610 (USD 22/hour), Chemistry 0620 (USD 24/hour), and Physics 0625 (USD 24/hour). Live sessions, recordings for revision, and tutor matching based on the student's specific subjects.",

      "## Final thoughts",
      "Cambridge IGCSE subject choice is a two-year commitment that shapes the next decade of a student's life. Pick the three core subjects (Maths, English, one science) confidently, then build the electives around a clear A-Level pathway. Take fewer subjects done well over more subjects done poorly. Use targeted tutoring for the subjects where your school's teaching isn't getting the student to A or A*.",
      "If you'd like to discuss the right subject combination for your child, contact the EDUS Maldives team at https://edustutor.com/contact, or browse our full Cambridge IGCSE Maldives offering at https://edustutor.com/mv.",
    ],
  },

  /* =====================================================================
   * GLOBAL - Cambridge vs Edexcel IGCSE comparison
   * ===================================================================== */
  {
    slug: "cambridge-vs-edexcel-igcse-which-to-choose",
    title: "Cambridge vs Edexcel IGCSE - Which Should Your Child Take?",
    description:
      "Cambridge IGCSE vs Edexcel International GCSE compared. Grading, paper structure, university acceptance, subject availability, and how to choose.",
    market: "GL",
    marketLabel: "Global",
    marketTint: "#06B6D4",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-05-06",
    dateModified: TODAY,
    readingMinutes: 11,
    image: "/edus-og.jpg",
    body: [
      "Cambridge IGCSE and Edexcel International GCSE are the two most widely used international secondary qualifications worldwide. They look almost identical from the outside - same age group, same exam timing, same recognition by universities - but parents and students researching the two often find conflicting opinions about which is harder, which is preferred by universities, and which is the right choice for a specific student.",
      "This guide is a direct, practical comparison. The short answer is that both qualifications are fully equivalent for university admissions, and the right choice for most families depends on three things: what your school offers, what subjects your child wants to take, and which paper style suits your child's strengths. The detail below explains how to make that decision properly.",

      "## What Cambridge IGCSE is",
      "Cambridge IGCSE (International General Certificate of Secondary Education) is set by Cambridge Assessment International Education (a department of the University of Cambridge). It was created in 1988 specifically as an international qualification and has been the dominant choice in international schools across Asia, the Middle East, Africa, and Latin America ever since.",
      "Cambridge IGCSE offers over 70 subjects and is taken in over 160 countries.",

      "## What Edexcel International GCSE is",
      "Edexcel International GCSE (sometimes called iGCSE, Pearson Edexcel International GCSE, or simply IGCSE) is set by Pearson Edexcel, the UK's largest awarding body. It's the international version of the UK's domestic GCSE - same standard, adapted for non-UK schools.",
      "Edexcel International GCSE offers fewer subjects than Cambridge (around 40+), but those subjects are essentially identical to the UK GCSE specifications, which gives Edexcel an edge for students later moving into UK schools or A-Levels.",

      "## How the grading scales differ",
      "**Cambridge IGCSE** uses the traditional A* to G grading scale (A*, A, B, C, D, E, F, G). Most schools and universities treat C and above as a pass. Cambridge also offers an Extended tier (full A*-G range) and a Core tier (capped at C) for some subjects, allowing schools to match the paper to student ability.",
      "**Edexcel International GCSE** uses the 9-1 grading scale aligned to the UK domestic GCSE reforms from 2017. Grade 9 is highest (more selective than A*), grade 1 is lowest. Grades 9-7 roughly correspond to A*-A in the old scale, grades 6-4 to B-C, and grades 3-1 to D-G.",
      "Universities treat the two scales as equivalent. A grade 7 in Edexcel is treated the same as an A in Cambridge.",

      "## How the papers differ",
      "**Cambridge IGCSE papers** tend to use clearly delineated question banks. Multiple-choice sections are common in sciences. Short-answer sections are tightly structured with explicit mark allocations per sub-part. Mark schemes reward specific keywords and step-by-step working. Cambridge papers are generally seen as more predictable in structure - students who practise past papers thoroughly know exactly what to expect.",
      "**Edexcel International GCSE papers** tend to favour slightly longer applied questions, especially in sciences and mathematics. Mark schemes give more weight to applied reasoning and methodology, less to keyword matching. Edexcel maths papers in particular often include unfamiliar context wrapping that requires the student to extract the underlying mathematical task.",
      "Neither is universally harder. They test the same skills differently. Some students thrive on Cambridge's structured predictability; others find Edexcel's applied framing more engaging. The honest answer is that the difference matters less than how well the student is taught and how thoroughly past papers are practised.",

      "## University recognition - fully equivalent",
      "Every major UK university (Oxford, Cambridge, Imperial, UCL, the Russell Group), every US university that accepts international qualifications, every Australian and Canadian university, and every European university that requires school-leaving certificates accepts both Cambridge IGCSE and Edexcel International GCSE as fully equivalent secondary-school qualifications.",
      "There is no university that prefers one over the other. Universities care about the grades, not the awarding body. A student with 8 grade-9s in Edexcel and a student with 8 A*s in Cambridge are treated identically.",

      "## When Cambridge is the better choice",
      "Cambridge IGCSE makes more sense in three scenarios:",
      "**The student's current school teaches Cambridge.** Switching boards mid-stream is almost always a mistake. The teachers are trained on Cambridge mark schemes, the textbooks align with Cambridge specifications, and past-paper practice resources are calibrated to Cambridge papers.",
      "**The student wants subjects only Cambridge offers.** Cambridge has a wider catalogue, particularly in regional languages, religious studies, and some humanities. If your child wants to take, say, Travel and Tourism or Marine Science, Cambridge is more likely to offer it.",
      "**The student plans to take Cambridge A-Levels afterwards.** Continuity matters. A Cambridge IGCSE → Cambridge A-Level pathway is smoother than mixing boards.",

      "## When Edexcel is the better choice",
      "Edexcel International GCSE makes more sense in three scenarios:",
      "**The student plans to move to a UK school for A-Levels.** UK schools teach UK domestic GCSE content, which Edexcel International GCSE mirrors more closely than Cambridge. The transition is essentially seamless.",
      "**The student is targeting UK university medicine, law, or oxbridge.** UK admissions tutors are most familiar with the 9-1 grade scale. An Edexcel International GCSE transcript with 9s reads identically to a domestic GCSE transcript with 9s - no mental conversion required.",
      "**The student's current school teaches Edexcel.** Same logic as Cambridge - don't switch boards mid-stream.",

      "## Common misconceptions",
      "**\"Cambridge is harder.\"** Not consistently. Cambridge papers are more predictable in structure; Edexcel papers test more applied reasoning. Top scorers exist in both. The board is not the bottleneck - preparation is.",
      "**\"Edexcel is preferred for UK universities.\"** Only marginally, and only because the 9-1 grading is more familiar to UK admissions tutors. The actual acceptance rate is identical.",
      "**\"Cambridge has more subjects so it's better.\"** More options can mean dilution rather than depth. Pick the qualification with the subjects the student actually needs.",
      "**\"You can mix the two.\"** Technically yes, but practically it's harder for schools to support and for tutors to coach. Stick with one board across all subjects unless there's a specific reason not to.",

      "## How to decide - the practical checklist",
      "Ask these five questions in order. Stop at the first clear answer.",
      "1. What does the student's current school teach? If only one board is offered, the decision is made.",
      "2. What does the student want to do at A-Level? Cambridge IGCSE pairs naturally with Cambridge A-Level; Edexcel International GCSE pairs naturally with Edexcel International A-Level or UK domestic A-Levels.",
      "3. Which subjects does the student want to take? If a critical subject is only offered by one board, that's the answer.",
      "4. Where does the student plan to attend university? UK universities accept both equally, but Edexcel reads more naturally on a UK admissions transcript. International universities don't distinguish.",
      "5. Which paper style does the student find more comfortable? This only matters if all the above are tied. In that case, try past papers from both boards and see which the student handles better.",

      "## Where 1-to-1 online tutoring fits",
      "Both Cambridge and Edexcel are taught at varying quality across international schools and home-school setups worldwide. The single biggest predictor of a top grade is not which board the student is on but how well they're prepared for the specific paper structure of that board.",
      "EDUS Global offers 1-to-1 online tutoring for both Cambridge IGCSE and Edexcel International GCSE. Tutors are matched to the specific board the student is sitting, so the practice papers, mark schemes, and methodology all align with the actual exam. Sessions are scheduled around the student's time zone - anywhere in the world.",

      "## Final thoughts",
      "Cambridge IGCSE and Edexcel International GCSE are equivalents, not competitors. The right choice depends on your child's school, intended A-Level pathway, and target university - not on which qualification is \"better.\" Pick based on context, prepare thoroughly for the specific paper structure of the chosen board, and use targeted tutoring to close any gaps the school doesn't close.",
      "Contact EDUS Global at https://edustutor.com/contact to discuss the right preparation path, or visit https://edustutor.com/global to see our full international tutoring offering.",
    ],
  },

  /* =====================================================================
   * SRI LANKA - G.C.E O/L exam preparation strategy
   * ===================================================================== */
  {
    slug: "gce-ol-exam-preparation-strategy-sri-lanka",
    title: "G.C.E O/L Exam Preparation - Strategy for Grade 10 & 11 Students",
    description:
      "G.C.E O/L preparation plan for Sri Lankan students. Subject priority, revision timeline, paper structure tips, and where online tuition helps.",
    market: "SL",
    marketLabel: "Sri Lanka",
    marketTint: "#2563EB",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-05-08",
    dateModified: TODAY,
    readingMinutes: 11,
    image: "/edus-og.jpg",
    body: [
      "The G.C.E Ordinary Level examination is the gateway to A-Level streams in Sri Lanka. Strong O/L results - 9 A passes or A passes in the core subjects - open Mathematics-Science, Bio-Science, Commerce, and Arts streams at any school. Weak results force a stream change, sometimes mid-year, and can close doors to preferred career paths years later.",
      "This guide is a working preparation strategy for Grade 10 and Grade 11 students sitting G.C.E O/L. It covers subject priority, a realistic two-year plan, paper-style preparation, and the difference between students who score 9 As and those who don't.",

      "## How G.C.E O/L is structured",
      "Students sit 9 subjects across approximately two weeks of examinations. Six subjects are core (compulsory): Mathematics, Science, English, Sinhala/Tamil (first language), Religion, and History. The remaining three are chosen from baskets covering second languages, aesthetic subjects, technological subjects, commerce, and additional sciences.",
      "Each subject is graded A, B, C, S, or W. A and B are credit passes. C is a simple pass. S is below pass but counted toward the 6-credit-pass A-Level eligibility threshold. W is fail.",
      "To qualify for an A-Level stream, students need at least 6 credit passes (S or above in 6 subjects) plus credit passes in Mathematics, Science, and First Language for science streams. The actual A-Level stream available also depends on individual subject grades - a B in Maths may keep a student out of Mathematics-Science even if they have 9 credit passes overall.",

      "## Subject priority",
      "All subjects matter, but they don't all carry equal weight in determining the A-Level pathway. Use this priority order for revision allocation:",

      "### Tier 1 - Stream-determining subjects",
      "**Mathematics** - the single most important O/L subject for a science or commerce A-Level. An A in Maths opens every stream; a C or S closes Mathematics-Science and limits commerce options.",
      "**Science** - equally critical for Bio-Science and Mathematics-Science streams. The integrated Science paper covers physics, chemistry, and biology at O/L level.",
      "**English** - increasingly important for both university entrance and employability. Strong O/L English makes A-Level and degree-level study significantly easier.",

      "### Tier 2 - Required passes",
      "**First Language (Sinhala or Tamil)** - must pass; significant grade impact for arts streams.",
      "**Religion** - must pass; relatively predictable paper structure.",
      "**History** - must pass; rewards consistent revision.",

      "### Tier 3 - Optional subjects",
      "Choose the three optional subjects based on (a) school availability, (b) genuine interest, (c) intended A-Level direction. Common strong choices include Information Communication Technology (ICT), Business and Accounting Studies, Commerce, Geography, Civic Education, and aesthetic subjects.",

      "## A two-year preparation plan",
      "G.C.E O/L is sat at the end of Grade 11, but serious preparation needs to start in Grade 10. Here's a sustainable structure:",

      "### Grade 10 - Foundation year",
      "Cover the syllabus end-to-end at school pace. Don't rush ahead of teachers - instead, deepen understanding of what's been taught. Practice past papers from previous years, one subject at a time, focusing on understanding mark schemes rather than chasing marks.",
      "End of Grade 10 should leave the student with a clear self-assessment: which subjects are A-territory already, which need consistent work, and which are weak.",

      "### Grade 11 - Term 1: Targeted revision",
      "Revisit weak topics from each subject systematically. Two hours per day after school, rotating subjects. Aim for full chapter coverage by mid-term, with targeted past-paper practice on identified weak areas.",

      "### Grade 11 - Term 2: Paper-based practice",
      "Start working through full past papers in timed conditions. Two papers per subject per month minimum. After each paper, spend 30-45 minutes on the review - wrong-answer analysis is more valuable than the paper itself.",

      "### Grade 11 - Term 3: Final sharpening",
      "Three to four papers per week across all subjects. Maintain a one-page revision sheet per subject - formulae, key dates, definitions, theorem statements. The final 4-6 weeks are not for new content; they're for keeping the student confident and used to the exam rhythm.",

      "## What separates 9-A students from average performers",
      "Across years of O/L results, students who achieve 9 A passes share four habits:",
      "**They revise the chapter behind every wrong answer**, not just the question itself. A wrong probability question in a Maths paper often means the whole probability chapter needs a second pass.",
      "**They write structured answers.** Examiners can only award marks for what they can clearly identify. Numbered points, clear working, and labelled diagrams pick up marks even when the final answer is wrong.",
      "**They sleep before each paper.** O/L runs over two weeks. Burnout in week one costs marks in week two. Top scorers manage energy, not just content.",
      "**They use a structured tutor for at least one or two weak subjects.** Self-study works for strong subjects. For weak ones, a structured tutor identifies what the student doesn't know - which the student usually can't see themselves.",

      "## Where structured online tuition fits",
      "School teaching covers the syllabus but rarely covers the gap between syllabus content and exam paper expectation. That gap is where 1-to-1 or small-group online tuition adds the most value.",
      "EDUS offers G.C.E O/L preparation in Sinhala, Tamil, and English medium across all core subjects - Mathematics, Science, English, ICT, and Commerce / Business Studies / Accounting for relevant optional baskets. Group classes start from LKR 1,200 per subject per month for Grade 10-11, with one-to-one tuition starting from LKR 2,500 per hour.",
      "Classes are live, structured to the actual O/L paper format, and benchmarked against past-paper standards. Recordings are available for revision. Parents receive regular progress updates showing topic completion, mock scores, and weak areas.",

      "## Final thoughts",
      "G.C.E O/L preparation rewards consistency over intensity. Start in Grade 10, cover the syllabus thoroughly, then spend Grade 11 on targeted revision and paper-based practice. Focus revision time proportional to subject weight in stream selection. Use structured tutoring for weak subjects rather than spreading the same hours across everything.",
      "If you'd like to enrol in EDUS G.C.E O/L classes, visit https://signup.edustutor.com/ or browse our full Sri Lanka offering at https://edustutor.com/sl. The academic team will confirm the right class and tutor within one business day.",
    ],
  },

  /* =====================================================================
   * INDIA - CBSE Class 9 to Class 10 transition guide
   * ===================================================================== */
  {
    slug: "cbse-class-9-to-class-10-transition-guide",
    title: "CBSE Class 9 to Class 10 Transition - What Parents Should Know",
    description:
      "The CBSE Class 9 to Class 10 transition explained. Workload jump, board exam impact, subject prep, and how online tuition smooths the change.",
    market: "IN",
    marketLabel: "India",
    marketTint: "#8B5CF6",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-05-10",
    dateModified: TODAY,
    readingMinutes: 9,
    image: "/edus-og.jpg",
    body: [
      "The shift from CBSE Class 9 to Class 10 is the single biggest academic transition most Indian students experience before higher secondary. Class 9 is the foundation year for board content; Class 10 ends with the all-India board examination that determines higher-secondary stream selection. Many students who coasted comfortably through Class 9 find themselves struggling by mid-Class 10 - not because the content is impossible, but because they didn't adjust their study habits in time.",
      "This guide explains what changes between Class 9 and Class 10, what the workload jump actually feels like, what parents should watch for, and how to prepare for the transition without burning out the student.",

      "## What changes between Class 9 and Class 10",
      "Three things change simultaneously:",
      "**The board exam appears at the end of the year.** Class 9 is school-assessed only. Class 10 ends with the CBSE All-India Secondary School Examination - a centrally set, externally graded paper that follows the student into stream selection and college admissions for the rest of their school career.",
      "**The syllabus depth increases significantly.** Many topics introduced in Class 9 are revisited in Class 10 with greater rigour - quadratic equations, advanced trigonometry, similar triangles, mole concept in Chemistry, electricity and magnetism in Physics. The pace also increases; chapters are completed faster and revision happens earlier.",
      "**Internal assessment carries higher stakes.** Class 10 internal assessment is worth 20 marks out of every subject's 100 - and unlike Class 9, those marks are reported on the final board transcript. Periodic tests, notebook submission, subject enrichment activities, and multiple assessments all count.",

      "## The workload reality",
      "Most CBSE Class 10 students need 3-4 hours of focused after-school study per day for steady progress, rising to 5-6 hours per day in the final term before boards. By comparison, Class 9 students can usually maintain good results on 1.5-2 hours per day.",
      "The jump is significant. Students who don't adjust their schedule consciously tend to fall behind in October-November of Class 10, then panic-prepare in January-February, then under-perform on the boards in March. The solution is to build the higher-workload habit early in Class 10 - ideally in the first month - rather than waiting for grades to slip.",

      "## Subject-by-subject preparation",
      "Each subject has a specific Class 9 → Class 10 transition pattern worth understanding:",

      "### Mathematics",
      "Class 10 Maths builds heavily on Class 9 foundations. Number Systems and Linear Equations from Class 9 underpin Real Numbers, Polynomials, and Pair of Linear Equations in Class 10. Coordinate Geometry deepens significantly. Trigonometry is introduced - entirely new content for most students, requiring memorisation of standard angle values and identities.",
      "Recommendation: revise Class 9 Maths in the summer before Class 10 starts. A weak Class 9 foundation makes Class 10 unforgiving.",

      "### Science",
      "Class 10 Science combines Physics, Chemistry, and Biology in one paper. Each section builds on Class 9 content but introduces substantially harder material - light and reflection in Physics, chemical reactions and acids/bases in Chemistry, life processes and reproduction in Biology.",
      "Recommendation: identify which of the three streams the student finds hardest in Class 9 and target extra preparation there in the summer.",

      "### English",
      "Class 10 English (Language and Literature) introduces longer literary texts and more demanding writing tasks - formal letters, articles, analytical paragraph responses. Reading comprehension grows longer. Grammar weight stays similar but vocabulary expectations rise.",
      "Recommendation: build reading habit through Class 9. Daily English newspaper reading or one short story per week pays off hugely in Class 10.",

      "### Social Science",
      "History, Geography, Political Science, and Economics each carry equal weight in Class 10. Class 9 covers more breadth; Class 10 covers more depth. Map work, chronology, and case-study application become important.",
      "Recommendation: build the habit of summary notes in Class 9 so the same notebooks can be reused for Class 10 revision.",

      "## Internal assessment - don't neglect it",
      "Internal assessment in CBSE Class 10 is worth 20 marks per subject, broken down across three periodic tests, multiple assessments, subject enrichment activities, and notebook submission. A consistent 18-19 out of 20 across all subjects translates into a 4-5 mark boost on the final grade - often enough to push a student from one grade band to another.",
      "Students who treat internal assessment as a chore usually lose 4-6 marks per subject across all five subjects - a total of 20-30 marks they didn't need to lose. Approach periodic tests with the same seriousness as board prep.",

      "## What parents should watch for",
      "Three early warning signs that the transition isn't going well:",
      "**Declining periodic test scores in Term 1.** Class 9 results aren't a reliable predictor of Class 10 results. The first periodic test in Class 10 is the real signal. A drop of more than 10% from Class 9 averages means the student hasn't adjusted to the new pace yet.",
      "**Inconsistent homework completion.** Class 10 requires daily homework engagement. Skipping homework even occasionally creates compounding gaps that show up months later.",
      "**Anxiety or withdrawal.** Some Class 10 students react to the increased pressure by either over-working to exhaustion or quietly disengaging. Both need attention before they affect results.",

      "## How online tuition supports the transition",
      "Many families add structured online tuition specifically at the Class 9 to Class 10 transition point. The reasoning is usually one of three:",
      "**To close gaps from Class 9** before they compound in Class 10. A tutor can identify specifically which Class 9 chapters were weakly learned and target revision there.",
      "**To stay on board-paper standard.** School teaching covers the syllabus, but doesn't always practise the specific question style and depth that the CBSE board paper demands. Targeted past-paper practice with a tutor closes that gap.",
      "**To manage workload across subjects.** A tutor handling Maths, Science, and English means three subjects move forward consistently without the parent needing to coordinate three different revision plans.",
      "EDUS CBSE Class 10 classes cover Mathematics, Science, and English in English medium, with 2 hours per week per subject across live online classes plus recordings. Pricing is ₹1,000 per subject per month, or ₹2,500 per month for all three subjects bundled together (a ₹500 saving). Monthly parent reports show topic completion and mock scores so you can track real progress.",

      "## Final thoughts",
      "The CBSE Class 9 to Class 10 transition is real, but it's manageable. Build the higher-workload habit in the first month of Class 10 rather than waiting for grades to slip. Revise Class 9 foundations in the summer. Take internal assessment seriously. Watch for early warning signs in Term 1 periodic tests. Use structured tutoring to close gaps and stay on board-paper standard.",
      "To enrol your child in EDUS CBSE Class 10 classes, visit https://signup.edustutor.com/ or see all our India offerings at https://edustutor.com/in. The academic team confirms placement within one business day.",
    ],
  },

  /* =====================================================================
   * GLOBAL - A-Level subject choice guide
   * ===================================================================== */
  {
    slug: "a-level-subject-choice-guide-international-students",
    title: "A-Level Subject Choice - Guide for International Students",
    description:
      "How to choose A-Level subjects as an international student. Career-pathway matching, university entry requirements, and 1-to-1 tutoring support.",
    market: "GL",
    marketLabel: "Global",
    marketTint: "#06B6D4",
    author: DEFAULT_AUTHOR,
    datePublished: "2026-05-12",
    dateModified: TODAY,
    readingMinutes: 10,
    image: "/edus-og.jpg",
    body: [
      "A-Level subject choice is one of the most consequential decisions a 16-year-old makes. Unlike IGCSE - where students typically take 5-9 subjects - A-Level students usually take only 3 or 4 subjects over two years, and those specific subjects act as direct gatekeepers to university courses and career paths.",
      "This guide is written for international students taking Cambridge International A-Level, Edexcel International A-Level, or UK domestic A-Levels. It covers how subject choice maps to university courses, what universities actually require, common combinations that work, common mistakes, and where 1-to-1 online tutoring helps when school options are limited.",

      "## How A-Level subject choice differs from IGCSE",
      "At IGCSE, students take a broad spread to demonstrate general competence. At A-Level, students specialise. Most A-Level students take 3 subjects in depth; some take 4 - particularly if planning competitive university applications like Oxbridge or US Ivy League.",
      "Each A-Level subject is studied at significantly greater depth than its IGCSE equivalent. The two-year A-Level course covers material that, in many cases, overlaps the first year of a university degree in the same discipline.",
      "Universities use A-Level subject combinations to filter applications. A course like Medicine essentially requires Chemistry plus another science. A course like Law has no specific subject requirements but cares about grades. An engineering course requires Mathematics and Physics. Picking the wrong subjects can close doors regardless of grades.",

      "## Subject choice by university pathway",
      "Use this as a starting framework. Specific universities may have additional requirements - always check the target course's entry requirements page directly.",

      "### Medicine / Dentistry / Veterinary",
      "**Chemistry is essentially required by every UK medical school.** Most also require Biology, and many strongly prefer or require a third science (Physics) or Mathematics. Take Chemistry + Biology + one of (Maths / Physics) as the safe combination. Some schools accept Chemistry + Biology + a humanities subject, but the science-heavy combination opens more options.",

      "### Engineering",
      "**Mathematics is essential for every engineering course.** Most also require Physics. Many top universities prefer or require Further Mathematics for engineering. Take Maths + Physics + Further Maths (if available) or Maths + Physics + Chemistry as the standard combinations.",

      "### Pure sciences (Physics, Chemistry, Biology, Biochemistry)",
      "Take the target subject plus two related sciences plus Maths where relevant. For Physics-related degrees, Maths is essentially required. For Biology and Biochemistry, Chemistry is essentially required.",

      "### Mathematics / Statistics / Data Science / Computer Science",
      "**Mathematics is essential.** Further Mathematics is strongly preferred by top universities. Take Maths + Further Maths + one of (Physics / Computer Science / Economics). Computer Science courses also accept Maths + Physics + another science.",

      "### Economics / Business / Finance / Accounting",
      "**Most universities require or strongly prefer Mathematics for Economics.** Business courses are more flexible. Take Maths + Economics + one of (Further Maths / a science / a humanities) for Economics. For Business or Management, Maths + Business Studies + a third subject of choice works.",

      "### Law",
      "**No specific subject requirements.** Law admissions tutors care about grades, written reasoning ability, and (often) a strong essay subject. Take a combination of subjects you'll get top grades in. Common strong combinations include History + English + Politics, or Maths + History + a third subject.",

      "### Psychology",
      "**Some universities require a science.** Biology or Psychology itself is the safest science option. Take Psychology + Biology + one of (Maths / English / Sociology).",

      "### Humanities (History, English, Politics, Philosophy)",
      "Subject-specific requirements are common - History needs History at A-Level for top universities, English needs English. Take the target subject + two complementary subjects from (History / English / Politics / Philosophy / a foreign language).",

      "### Architecture / Art / Design",
      "Often requires Art at A-Level plus a portfolio. Some architecture courses require Mathematics or Physics in addition to Art.",

      "### Modern Languages",
      "Requires the target language at A-Level. Other subjects flexible - often paired with another language, English, or History.",

      "## How many A-Levels to take",
      "**Three A-Levels** is the standard. Top grades (A*A*A or AAA) in three subjects opens essentially every UK university course outside Oxbridge medicine and a handful of other ultra-competitive courses.",
      "**Four A-Levels** is worth considering only if (a) you're targeting Oxbridge, Imperial, LSE, or US Ivy League, AND (b) you can confidently achieve A or A* in all four. A weak fourth subject pulls the application down rather than strengthening it. The standard four-subject combination for competitive applications is Maths + Further Maths + 2 other subjects.",
      "**More than four A-Levels** is generally counterproductive. Universities want depth, not breadth. The time invested in a fifth subject would produce better outcomes spent on the other four.",

      "## Common mistakes",
      "**Taking subjects to match friends.** Two years of A-Level study is too much to spend on subjects the student doesn't enjoy. Interest and aptitude drive top grades; social factors don't.",
      "**Avoiding Mathematics out of difficulty fears.** Maths A-Level is required or preferred by a huge range of university courses. Avoiding it closes more doors than any other single decision.",
      "**Taking Further Mathematics when not needed.** Further Maths is essential for top-tier engineering, maths, and physics applications. For everything else, it adds workload without adding university acceptance odds. Take it only if the target course requires or prefers it.",
      "**Picking unfamiliar new subjects.** A-Level Psychology, Sociology, Politics, or Philosophy are appealing because they're new - but the workload and abstract reasoning required are often underestimated. Investigate the actual syllabus before committing.",
      "**Ignoring the school's track record.** A weakly-taught A-Level subject produces weak grades regardless of student effort. If your school's track record in your chosen subject is poor, either change subject or supplement with structured external tutoring.",

      "## Where 1-to-1 online tutoring helps",
      "A-Level subject teaching varies widely across schools, even within the same country. The depth of preparation needed for top grades is also significantly higher than at IGCSE - past-paper practice, exam technique, and proof-writing in subjects like Maths and Further Maths all require focused attention that classroom teaching rarely provides at the necessary depth.",
      "Common reasons international students choose 1-to-1 online tutoring at A-Level:",
      "**Subjects not offered by the school.** If a student wants to take Further Mathematics or Computer Science but the school doesn't offer it, online 1-to-1 tutoring fills the gap entirely.",
      "**Tutor specialisation by board.** Cambridge International A-Level papers differ from Edexcel International A-Level papers. A tutor specifically trained on the board the student is sitting can practise the exact paper structure and mark scheme that will appear on exam day.",
      "**Time-zone flexibility.** Students living outside major education hubs often have limited access to specialist subject teachers. Online tutoring removes the geography problem completely.",
      "EDUS Global offers 1-to-1 online A-Level tutoring across Cambridge, Edexcel, IB, AP, and national curricula. Tutors are matched to the specific board and subjects the student is taking. Live sessions, recordings for revision, and scheduling around the student's time zone.",

      "## Final thoughts",
      "A-Level subject choice should be driven by three questions in order: what university course is the student targeting, what subjects does that course require, and which of the required subjects will the student score top grades in. Pick three subjects with depth rather than four with stretch. Avoid common traps like avoiding Maths or taking unfamiliar subjects without research. Use structured online tutoring where school provision is limited.",
      "If you'd like to discuss A-Level subject combinations and tutoring options, contact EDUS Global at https://edustutor.com/contact, or visit https://edustutor.com/global to see our full international tutoring offering.",
    ],
  },
];

export const PUBLISHED_POSTS = POSTS.filter((p) => !p.draft);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
