/**
 * Gallery / event-album data - pure TS module. Add albums by appending to
 * ALBUMS, then run `npm run gallery:fetch` to repopulate the `photos` array
 * from the matching Cloudinary folder.
 *
 * Each album renders at /gallery/[slug] with ImageGallery + BreadcrumbList
 * + Speakable JSON-LD. Photos are served straight from Cloudinary so we
 * pay zero bytes in the Next.js bundle for the media itself.
 *
 * Editorial style mirrors components/blog/BlogData.ts:
 *   - Title 50-65 chars (Google SERP truncation)
 *   - Description 150-160 chars with a verb-led intro
 *   - Body opens with a direct paragraph that answers "what was this?"
 *   - H2 every 200-300 words for skimmability
 *   - End paragraph ties back to EDUS today (anchor link or CTA hint)
 */

/* --------------------------------------------------------------- */
/* Cloudinary base                                                  */
/* --------------------------------------------------------------- */
/**
 * Cloudinary delivery base used by Image src URLs. Filenames live on the
 * album record, so a global folder rename is one edit here.
 *
 * The cloud name is read from the public env (NEXT_PUBLIC_CLOUDINARY_CLOUD)
 * so it ships to the client, but falls back to a literal during build so
 * static export still works if env injection is missed.
 */
export const CLOUDINARY_CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ?? "edus-cloud";

export const CLOUDINARY_GALLERY_FOLDER = "edus-gallery";

/**
 * Build a delivery URL for a photo inside an album. Uses Cloudinary's
 * automatic format + automatic quality so the browser receives the best
 * format it supports without us having to upload AVIF/WebP variants.
 *
 * The `c_limit,w_<width>` transform asks Cloudinary to scale down (never
 * up) to the requested width, which is the cheapest responsive variant.
 */
export function cloudinaryUrl(
  publicId: string,
  options: { width?: number } = {},
): string {
  const transforms: string[] = ["f_auto", "q_auto"];
  if (options.width) transforms.push(`c_limit,w_${options.width}`);
  const t = transforms.join(",");
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${t}/${publicId}`;
}

/* --------------------------------------------------------------- */
/* Types                                                            */
/* --------------------------------------------------------------- */
export type GalleryPhoto = {
  /** Cloudinary public ID, e.g. "edus-gallery/jaffna-office-2025/IMG_001". */
  publicId: string;
  /** Optional alt - falls back to "<album title> - photo N" in the renderer. */
  alt?: string;
  /** Original width in pixels. Required for next/image. */
  width: number;
  /** Original height in pixels. Required for next/image. */
  height: number;
};

export type ExternalLink = {
  /** Display label, e.g. "SLASSCOM". */
  label: string;
  /** Full https URL. Opens in a new tab on the page. */
  url: string;
  /** Short reason this link is here - rendered as muted helper text. */
  context: string;
};

export type InternalLink = {
  /** Display label. */
  label: string;
  /** Internal href starting with /. */
  href: string;
  /** Helper text describing why the page is relevant. */
  context: string;
};

export type GalleryAlbum = {
  /** URL slug under /gallery/. Lowercase, kebab-case. */
  slug: string;
  /** Full SEO title (50-65 chars for SERP). */
  title: string;
  /** Meta description (150-160 chars). */
  description: string;
  /** Short heading used on the index card (under the title). */
  cardSubtitle: string;
  /** Category label shown as the eyebrow on the card + detail page. */
  category: "Milestones" | "Awards" | "Events" | "Press" | "Anniversary";
  /** Brand tint applied to the card and detail-page accents. */
  tint: string;
  /** ISO date for the underlying event. */
  eventDate: string;
  /** ISO date the album was first published on the site. */
  datePublished: string;
  /** Optional ISO date of the last gallery update. */
  dateModified?: string;
  /** Geographic context shown next to the date. */
  location?: string;
  /** Hide from /gallery index without deleting the data. */
  draft?: boolean;
  /**
   * Per-album SEO keywords. Mixed with the brand-level keywords on the
   * detail page <meta name="keywords">. Be specific (event name, partner
   * names, location). 6-12 entries.
   */
  keywords?: string[];
  /**
   * Optional Cloudinary public ID to use as the index-card thumbnail
   * and OG image. When unset, the first photo in `photos` is used.
   * Editorial override for albums where the first chronological photo
   * isn't the most visually striking.
   */
  coverPublicId?: string;
  /**
   * Trusted outbound authority links - partner orgs, award bodies,
   * Wikipedia, gov sources. Rendered in a "References" block below
   * the article body. Builds topical trust for E-E-A-T.
   */
  externalLinks?: ExternalLink[];
  /**
   * Internal EDUS cross-links to drive link equity into commercial
   * pages from this content-heavy gallery page. Rendered as a
   * "More from EDUS" block on the detail page.
   */
  internalLinks?: InternalLink[];
  /**
   * Optional slug of a related blog post. Rendered as a featured
   * card under the gallery photos so readers move from event recap
   * into evergreen content.
   */
  relatedBlogSlug?: string;
  /** Body paragraphs - "## " for H2, "### " for H3, plain otherwise. */
  body: string[];
  /**
   * Cloudinary photos for this album. Populated either manually or by
   * running scripts/fetch-cloudinary-gallery.mjs against the folder
   * `<CLOUDINARY_GALLERY_FOLDER>/<slug>/`.
   */
  photos: GalleryPhoto[];
};

/* --------------------------------------------------------------- */
/* Albums                                                           */
/* --------------------------------------------------------------- */
/**
 * Each album includes a full editorial body even though the visual
 * focus is the photo grid. Search engines (and ChatGPT / Gemini /
 * Perplexity, which scrape exactly this kind of page) need readable
 * context, not just a stack of images. The copy is 300-500 words
 * with H2 sections so the page ranks for the event name.
 *
 * Order: newest first. New albums prepend.
 */
export const ALBUMS: GalleryAlbum[] = [
  /* =====================================================================
   * 2025 - Jaffna front office opening (with Yarl Ventures)
   * ===================================================================== */
  {
    slug: "edus-yarl-ventures-jaffna-office-opening",
    title:
      "EDUS & Yarl Ventures Open New Front Office in Jaffna",
    description:
      "Photos from the EDUS and Yarl Ventures Jaffna front office opening - chief guest moments, the team, and a tour of the new student-facing space.",
    cardSubtitle: "A new student-facing home in the heart of Jaffna",
    category: "Milestones",
    tint: "#2563EB",
    eventDate: "2025-07-17",
    datePublished: "2025-07-17",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "EDUS Jaffna office",
      "EDUS Yarl Ventures",
      "EDUS front office opening",
      "online tuition institute Jaffna",
      "EDUS Sri Lanka office",
      "Northern Province education",
      "Jaffna tutoring",
      "EDUS online institute",
    ],
    externalLinks: [
      {
        label: "Yarl Ventures",
        url: "https://www.yarlventures.com/",
        context: "Joint-opening partner and EDUS's investor in Jaffna.",
      },
      {
        label: "Jaffna - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Jaffna",
        context: "Background on Jaffna, the host city of the new front office.",
      },
    ],
    internalLinks: [
      {
        label: "EDUS Sri Lanka classes",
        href: "/sl",
        context: "Online classes for Sri Lankan students from this Jaffna base.",
      },
      {
        label: "About EDUS",
        href: "/about",
        context: "The story behind EDUS Online Institute.",
      },
      {
        label: "Contact EDUS",
        href: "/contact",
        context: "Visit the new front office or schedule a call with the team.",
      },
    ],
    body: [
      "On 17 July 2025, EDUS Online Institute and Yarl Ventures opened the doors of a new front office in Jaffna - a physical home for students, parents, and tutors who have been part of our online community since 2021. The opening brought together academic staff, tutors, partners, and the families who have studied with EDUS across Sri Lanka, India, and the Maldives.",
      "The day was led by chief guest Dr. Bavanantharaja, former Deputy Director of the Teaching Hospital in Jaffna. His remarks set the tone for what the office represents - a meeting point where digital learning, in-person support, and community service sit side by side.",

      "## Why a front office matters for an online institute",
      "EDUS has always been online-first. Students join live classes from their homes in Colombo, Chennai, Male, Doha, and London. But online-only has limits. Parents like to put a face to the institute their child studies with. New tutors prefer to walk in for orientation. Partners want a physical address to sit across from a real desk.",
      "The Jaffna office answers that. It is a place where parents can ask questions about their child's progress, students can drop in for academic guidance, and tutors can use a quiet, well-equipped room for live classes when home isn't ideal.",

      "## What the new space offers",
      "The office is built around three functions. The first is personalized student support - one-to-one conversations with EDUS coordinators about syllabus choice, tutor matching, and scheduling. The second is a partner-friendly meeting space for the schools, training institutes, and education startups EDUS works with across the Northern Province. The third is a quiet teaching corner with reliable internet, good lighting, and a clean background - the practical things every online tutor needs but doesn't always have at home.",

      "## A milestone, not an end",
      "Opening a front office is not a pivot away from online learning. It is the opposite - it is what online learning looks like once it grows past a certain size. A community needs somewhere to gather. A team needs a base. And a brand built on student trust needs an address you can walk into.",
      "Thank you to everyone who joined us on 17 July - especially Dr. Bavanantharaja for being our chief guest, and the Yarl Ventures team for sharing this milestone with us. If you are in Jaffna, the doors are open. Come and visit.",
    ],
    photos: [
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_3_sucequ", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_2_imermt", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_6_frj1xp", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_5_yjgixz", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_4_zjcvig", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_7_zy2s89", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_9_i5c0ka", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_8_dtlvx3", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_11_hhlpch", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_10_nchbhz", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_12_jky0w7", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_14_swu1ic", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_13_pphijz", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_16_hz7bui", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_15_kigyrd", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_18_tgnugy", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_17_g19cxx", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_20_umropp", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_19_br9xsi", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_22_h822vp", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_21_yguceu", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_23_b8ufkd", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_25_l3av8z", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_24_aeihks", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_27_csr9as", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_26_h6sd5d", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_29_sxvpqn", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_28_qe84ac", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_31_birygm", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_30_t1erpq", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_32_r46spb", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_34_soedhr", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_33_waxjcd", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_36_dz6ura", width: 1024, height: 768 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_35_jnllay", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_38_faau3p", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_37_bmshj7", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_39_qwygvx", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_41_q1mu2b", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_40_je59et", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_43_jqb1ru", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_42_m775i8", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_45_luscee", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_44_nmm79n", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_47_atg5u9", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_46_gvrg4q", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_49_fcjzeg", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_48_mecfjp", width: 1024, height: 683 },
      { publicId: "EDUS___Yarl_Ventures_Mark_A_New_Milestone_With_Grand_Opening_Of_Jaffna_Front_Office_50_tywfe4", width: 1024, height: 683 },
    ],
  },

  /* =====================================================================
   * 2025 - Landmark achievement / innovation milestone
   * ===================================================================== */
  {
    slug: "edus-landmark-achievement-online-learning-innovation",
    title:
      "EDUS Landmark Achievement - Innovation in Online Learning",
    description:
      "Photos from the EDUS team celebration of a major innovation milestone - what was achieved, who was there, and what comes next for students.",
    cardSubtitle: "Celebrating a major innovation milestone with the team",
    category: "Milestones",
    tint: "#06B6D4",
    eventDate: "2025-02-07",
    datePublished: "2025-02-07",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "EDUS innovation milestone",
      "online learning Sri Lanka",
      "EDUS Online Institute",
      "edtech Sri Lanka",
      "structured online tuition",
      "EDUS Academic Team",
    ],
    internalLinks: [
      {
        label: "Why EDUS",
        href: "/#why",
        context: "What makes EDUS's online learning model different.",
      },
      {
        label: "EDUS Global Tutoring",
        href: "/global",
        context: "One-to-one online classes for students worldwide.",
      },
      {
        label: "About EDUS",
        href: "/about",
        context: "The full EDUS journey since 2021.",
      },
    ],
    body: [
      "On 7 February 2025, the EDUS team gathered to mark a milestone four years in the making - a structured online learning platform that now serves students across Sri Lanka, India, the Maldives, and the global diaspora. This album captures the celebration, the team, and the quiet recognition of work that started as a small Jaffna-based experiment in 2021.",

      "## What the achievement actually represents",
      "Online tuition is not new. What is new is doing it with structure - the lesson plan, the parent updates, the topic-wise revision, the recorded backup, the assigned subject coordinator. That is the EDUS difference, and it is what this milestone celebrates. Building a learning system, not just running a class.",
      "Behind every milestone is a long stack of unglamorous work - tutor onboarding, syllabus mapping, parent-friendly progress reports, time-zone scheduling for our Maldives and Gulf students, and the quiet evening sessions when the academic team reviews student feedback line by line.",

      "## A team-wide recognition",
      "This was a team day. Tutors, coordinators, academic staff, content reviewers, and the operations team that keeps schedules running across three time zones. The photos in this album are deliberately people-first - the work matters because the people doing it matter.",

      "## What comes next",
      "Pioneering an innovation is one thing. Sustaining it is another. The next phase is more subjects, more languages of instruction, deeper exam-prep support for CBSE and Cambridge students, and a tutor development programme that turns experienced subject experts into great online teachers. Watch this space.",
    ],
    photos: [
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___6_kg0x3g", width: 1024, height: 707 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___7_qfgqij", width: 768, height: 1024 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___2_evf7vp", width: 1024, height: 683 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___3_okvbqv", width: 1024, height: 683 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___1_utkhir", width: 768, height: 1024 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___5_cdch6c", width: 768, height: 1024 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___4_ekdmjy", width: 1024, height: 669 },
      { publicId: "_A_Landmark_Achievement_for_EDUS_Tutor_Pioneering_Innovation_in_Online_Learning___8_c6nxdg", width: 967, height: 1024 },
    ],
  },

  /* =====================================================================
   * 2024 - National ICT Award win
   * ===================================================================== */
  {
    slug: "edus-wins-national-ict-award-education",
    title:
      "EDUS Wins the National ICT Award 2024 in Education",
    description:
      "EDUS Online Institute wins the National ICT Award 2024 in Education - photos of the ceremony, the team, and the moment our work was recognised.",
    cardSubtitle: "Recognised at the National ICT Awards in the Education category",
    category: "Awards",
    tint: "#22C55E",
    eventDate: "2024-10-28",
    datePublished: "2024-10-28",
    location: "Colombo, Sri Lanka",
    keywords: [
      "National ICT Award 2024",
      "NBQSA Sri Lanka",
      "EDUS award winner",
      "Sri Lanka edtech award",
      "FITIS National ICT Awards",
      "online tuition award winner",
      "EDUS Online Institute",
      "best edtech Sri Lanka",
    ],
    externalLinks: [
      {
        label: "FITIS National ICT Awards",
        url: "https://fitis.lk/nbqsa/",
        context: "Awarding body recognising Sri Lankan ICT excellence (NBQSA).",
      },
      {
        label: "FITIS - Federation of Information Technology Industry Sri Lanka",
        url: "https://fitis.lk/",
        context: "The national IT industry federation that runs the awards.",
      },
    ],
    internalLinks: [
      {
        label: "EDUS in the Press",
        href: "/press",
        context: "Press coverage of EDUS milestones and partnerships.",
      },
      {
        label: "About EDUS",
        href: "/about",
        context: "What earned EDUS the National ICT Award recognition.",
      },
      {
        label: "Why EDUS works",
        href: "/#why",
        context: "The structured online tuition model that the award honours.",
      },
    ],
    body: [
      "On 28 October 2024, EDUS Online Institute was awarded the National ICT Award in the Education category - a national-level recognition of the work the team has done to build a structured, technology-driven online learning experience for Sri Lankan and international students.",

      "## What the award recognises",
      "The National ICT Awards celebrate technology projects that deliver real impact in Sri Lanka. The Education category specifically looks at solutions that change how students learn - not just digitise an old textbook, but build something that wouldn't exist without modern infrastructure.",
      "EDUS was recognised for the combination of live one-to-one online tuition, structured academic support, multi-syllabus coverage (Sri Lanka national, Cambridge, Edexcel, CBSE), and the operational systems behind the scenes - tutor matching, schedule coordination, attendance tracking, parent updates, and student feedback loops.",

      "## A milestone that belongs to the whole team",
      "Awards are won by organisations, but they are built by people. This award belongs to every tutor who delivered focused one-to-one classes, every coordinator who managed schedules across time zones, every academic reviewer who kept lesson quality high, and every parent who trusted EDUS with their child's learning.",

      "## A signal, not a stopping point",
      "Recognition is useful because it tells the team they are on the right track. But the work that mattered before the award - the daily small improvements - is the work that still matters after. EDUS continues, with the same focus: serious online learning, delivered with care.",
    ],
    photos: [
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_1_uiazwx", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_5_d83t8s", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_4_idiob1", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_3_cfsvj5", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_2_xsciuz", width: 1024, height: 509 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_7_djfqtk", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_6_b6cvsa", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_8_kgbgu0", width: 1024, height: 683 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_9_hdnrkp", width: 768, height: 1024 },
      { publicId: "Celebrating_Excellence_EDUS_Wins_the_National_ICT_Award_in_Education_10_dvjl9l", width: 2000, height: 994 },
    ],
  },

  /* =====================================================================
   * 2024 - Yarl IT Hub Innovation Festival
   * ===================================================================== */
  {
    slug: "edus-yarl-it-hub-innovation-festival-2024",
    title:
      "EDUS at Yarl IT Hub Innovation Festival 2024",
    description:
      "EDUS at the Yarl IT Hub Innovation Festival 2024 - showcasing online learning innovation to the Northern Province technology community.",
    cardSubtitle: "Showcasing EDUS at the Northern Province innovation festival",
    category: "Events",
    tint: "#8B5CF6",
    eventDate: "2024-08-05",
    datePublished: "2024-08-05",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "Yarl IT Hub Innovation Festival 2024",
      "Yarl IT Hub",
      "Jaffna technology festival",
      "Northern Province innovation",
      "EDUS events 2024",
      "Sri Lanka edtech showcase",
    ],
    externalLinks: [
      {
        label: "Yarl IT Hub",
        url: "https://yarlithub.org/",
        context: "Northern Province technology community that hosts the festival.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "How EDUS is rooted in the Jaffna technology ecosystem.",
      },
      {
        label: "EDUS Sri Lanka",
        href: "/sl",
        context: "Online tuition for Sri Lankan students from our Jaffna base.",
      },
    ],
    body: [
      "In August 2024 EDUS joined the Yarl IT Hub Innovation Festival - one of the most prominent technology gatherings in Sri Lanka's Northern Province. The festival brings together startups, students, established companies, and the wider tech community to demo what they're building, exchange ideas, and meet the people behind the work.",

      "## Why EDUS participated",
      "EDUS started in Jaffna. The local ecosystem - Yarl IT Hub, Yarl Geek Challenge, regional universities, and the long list of mentors who have supported us from day one - shaped what EDUS is today. Participating in the festival is one small way of giving that back, and of meeting the next generation of builders who will define what learning looks like in Sri Lanka.",

      "## What we shared at the festival",
      "The team showcased EDUS's structured online learning model - live one-to-one classes, multi-syllabus tutor matching, parent reporting, and the cross-border student base that now stretches from Jaffna to Male, Chennai, Doha, and London. We met students considering tutoring careers, parents curious about online schooling, and other founders working on adjacent education problems.",

      "## A community we keep coming back to",
      "Tech festivals are sometimes accused of being inward-looking. The Yarl IT Hub crowd is the opposite - rooted in the community, openly curious about what others are doing, generous with introductions. Photos in this album capture the visitor conversations, demo booths, and team moments from the day. Thanks to Yarl IT Hub for the invitation.",
    ],
    photos: [
      { publicId: "We_re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi_1_h8luqj", width: 627, height: 1024 },
      { publicId: "We_re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi_2_gny67g", width: 1024, height: 760 },
      { publicId: "We_re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi_3_c6hvsu", width: 1024, height: 638 },
      { publicId: "We_re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi_4_yzok4b", width: 910, height: 1024 },
      { publicId: "We_re_happy_to_share_that_EDUS_recently_participated_in_the_prestigious_Yarl_IT_Hub_Innovation_Festi_5_nvdvmc", width: 1024, height: 679 },
    ],
  },

  /* =====================================================================
   * 2023 - Slingshot Accelerator Demo Day
   * ===================================================================== */
  {
    slug: "edus-slingshot-accelerator-demo-day",
    title:
      "EDUS at Slingshot Accelerator Demo Day 2023",
    description:
      "EDUS pitches at Slingshot Accelerator Demo Day 2023 - photos from our presentation, mentor meetings, and the cohort of Sri Lankan startups.",
    cardSubtitle: "Pitching our online learning vision at Slingshot Demo Day",
    category: "Events",
    tint: "#FACC15",
    eventDate: "2023-12-15",
    datePublished: "2023-12-15",
    location: "Colombo, Sri Lanka",
    keywords: [
      "Slingshot Accelerator",
      "Slingshot Demo Day 2023",
      "Hatch Sri Lanka",
      "Hemas Holdings",
      "Sri Lankan startup accelerator",
      "EDUS startup",
      "Sri Lanka edtech accelerator",
    ],
    externalLinks: [
      {
        label: "Hatch - Sri Lanka",
        url: "https://hatch.lk/",
        context: "Co-organiser of the Slingshot accelerator programme.",
      },
      {
        label: "Hemas Holdings",
        url: "https://www.hemas.com/",
        context: "Slingshot's anchor partner and Sri Lankan conglomerate.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "The EDUS journey and what we pitched to mentors.",
      },
      {
        label: "EDUS Press",
        href: "/press",
        context: "Other recognition milestones for EDUS Online Institute.",
      },
    ],
    body: [
      "In December 2023, EDUS pitched at Slingshot Accelerator Demo Day - the culmination of a structured programme that put us in a room with mentors, investors, and a cohort of Sri Lankan startups going through the same hard questions about product, growth, and unit economics.",

      "## What Slingshot is",
      "Slingshot is the Hemas and Hatch joint initiative that backs early-stage Sri Lankan startups with mentorship, capital introductions, and the kind of structured operational coaching that you rarely get in informal networks. The Demo Day is where each cohort company presents what they've built, who it serves, and where it's going.",

      "## What we pitched",
      "EDUS's pitch focused on the single problem that defines our work - high-quality, one-to-one online tutoring delivered with structure. Not a marketplace. Not a recorded library. A live, personal, accountable academic relationship between a student and a matched tutor, supported by the operational systems that keep it consistent. The pitch was followed by mentor and investor conversations.",

      "## What we took away",
      "The most useful part of an accelerator is rarely the pitch itself - it's the months of structured questions that come before. Slingshot pushed us to sharpen the narrative around student outcomes, tutor quality control, and the operational difference between online tutoring done well and online tutoring done lazily. The photos in this album capture the team energy, the cohort camaraderie, and the demo-day moments.",
    ],
    photos: [
      { publicId: "Slingshot_Accelerator_demo_day_1_v8eiz6", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_2_mrbmst", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_3_g8kblm", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_4_bnvj2v", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_7_iraj3c", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_8_kxyzko", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_11_ompvot", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_12_xqx45a", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_13_tcpiyq", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_15_cqclux", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_16_xmde8d", width: 1024, height: 683 },
      { publicId: "Slingshot_Accelerator_demo_day_17_cdg4s7", width: 558, height: 1024 },
    ],
  },

  /* =====================================================================
   * 2023 - 1st year anniversary
   * ===================================================================== */
  {
    slug: "edus-1st-year-anniversary",
    title:
      "EDUS 1st Year Anniversary - Growth & Gratitude",
    description:
      "EDUS marks its first year with a team gathering - photos from the celebration, the speeches, and the small group that started it all.",
    cardSubtitle: "Looking back at year one and the students who trusted us early",
    category: "Anniversary",
    tint: "#EF4444",
    eventDate: "2023-11-22",
    datePublished: "2023-11-22",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "EDUS first anniversary",
      "EDUS 1st year",
      "EDUS Jaffna team",
      "online tuition Sri Lanka 2023",
      "EDUS Online Institute history",
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "How year one became the foundation for everything that followed.",
      },
      {
        label: "Why parents choose EDUS",
        href: "/#why",
        context: "The structured tutoring approach that defined year one.",
      },
    ],
    body: [
      "On 22 November 2023, EDUS quietly marked its first year as a registered online tuition institute. The celebration was deliberately small - the team, a few mentors, and the kind of food you only get in Jaffna - because year one is about gratitude, not noise.",

      "## What year one actually looked like",
      "Year one was the messy part. The first 50 students. The first 10 tutors who agreed to teach online when most of their peers wanted to stick to physical classes. The first parent who called to say her daughter scored better than expected in her O-Level mock paper. The first coordinator who learned how to manage live class schedules across three time zones from a small Jaffna office.",
      "Year-one work is rarely visible from outside. It's the unsexy operational scaffolding - the spreadsheet that became a CRM, the WhatsApp group that became a coordination system, the handful of subject experts who agreed to be the academic anchor.",

      "## Gratitude, named explicitly",
      "EDUS exists because a small group of people took a chance on it. The early tutors who delivered classes when the platform was rougher than it is today. The early parents who paid in trust as much as in fees. The early students who logged in on patchy connections and shaky cameras and stayed for the explanation. The mentors who answered late-night messages. The Jaffna community that gave us a home.",

      "## What we promised for year two",
      "Better systems. More subjects. More languages of instruction. A wider tutor pool. And the same quiet promise we made on day one - that every student who joins EDUS gets a real tutor, a real lesson plan, and real academic accountability.",
    ],
    photos: [
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_3_ba3s1a", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_4_tejoek", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_5_nlqweu", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_6_yvttha", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_7_tqkqqv", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_8_oipr0t", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_9_rh4wgz", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_10_chz8gg", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_11_kbkiaz", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_12_pr91sj", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_13_veu7s3", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_14_ye6fgr", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_15_wuk9kt", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_16_ammahk", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_17_it5hdl", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_18_bodokx", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_21_mopt9f", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_20_lsyvfx", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_22_b5odip", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_19_fi5wie", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_23_kwxhmt", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_25_hgmven", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_24_dm0rnl", width: 683, height: 1024 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_26_uwoqfg", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_27_nmrcob", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_29_nvurmx", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_30_fseimf", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_31_qfzlek", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_32_gdzqry", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_33_uoalcw", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_1_fcdzvt", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_1st_Year_Anniversary_A_Journey_of_Growth_and_Gratitude_2_f5gstt", width: 1024, height: 683 },
    ],
  },

  /* =====================================================================
   * 2023 - YGC Innovation Festival '23
   * ===================================================================== */
  {
    slug: "edus-ygc-innovation-festival-2023",
    title:
      "EDUS at Yarl Geek Challenge Innovation Festival 2023",
    description:
      "EDUS at the Yarl Geek Challenge Innovation Festival 2023 - mentor sessions, team photos, and meeting Sri Lanka's next-generation builders.",
    cardSubtitle: "Meeting the next generation of Northern Province innovators",
    category: "Events",
    tint: "#06B6D4",
    eventDate: "2023-11-09",
    datePublished: "2023-11-09",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "Yarl Geek Challenge 2023",
      "YGC Innovation Festival",
      "Yarl IT Hub",
      "Jaffna technology event",
      "Sri Lanka startup community",
      "EDUS events Jaffna",
    ],
    externalLinks: [
      {
        label: "Yarl Geek Challenge - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Yarl_Geek_Challenge",
        context: "Background on the Yarl Geek Challenge programme.",
      },
      {
        label: "Yarl IT Hub",
        url: "https://yarlithub.org/",
        context: "Organisation behind YGC and the Innovation Festival.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "EDUS's roots in the Jaffna technology community.",
      },
      {
        label: "EDUS Sri Lanka classes",
        href: "/sl",
        context: "Online tuition for Sri Lankan students.",
      },
    ],
    body: [
      "In November 2023, EDUS joined the Yarl Geek Challenge (YGC) Innovation Festival - one of the longest-running technology gatherings in Sri Lanka's Northern Province. YGC has been quietly producing builders, founders, and engineers since its first edition over a decade ago, and the festival is where the wider community converges to meet, demo, and learn from each other.",

      "## Why YGC matters to us",
      "EDUS is not the first Jaffna-based technology effort. It stands on the work of every YGC team that came before, every Yarl IT Hub initiative, and every patient mentor who has spent evenings teaching first-time founders the basics of running a startup. Participating in the festival is partly recognition of that lineage, partly an opportunity to keep meeting the people who will define what the next decade of Northern Province technology looks like.",

      "## What happened at the festival",
      "The team showcased EDUS's structured online tuition model, met student teams competing in the parallel YGC competition, and sat in on mentor sessions covering startup operations, product thinking, and fundraising. We had the kind of unscheduled hallway conversations that are usually more valuable than any panel session.",

      "## A community we keep showing up for",
      "If you've ever wondered how a Jaffna-based education institute ended up serving students across Sri Lanka, India, the Maldives, and the global diaspora - YGC and Yarl IT Hub are part of the answer. The photos in this album capture some of that community in action. Thank you to the YGC team for keeping this going year after year.",
    ],
    photos: [
      { publicId: "WhatsApp-Image-2023-11-04-at-64910-PM_rbo9e7", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64912-PM_tso0kp", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64925-PM.jpeg_adupt4", width: 1013, height: 1222 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64603-PM_jlgv6n", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64902-PM_i4nosn", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64841-PM_jfm4au", width: 1600, height: 1200 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64857-PM_qfatjc", width: 1125, height: 1375 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64923-PM_pdvpuy", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64944-PM_st8sc2", width: 1123, height: 1530 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64931-PM_mzkt8b", width: 1161, height: 1243 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64559-PM_rsg1oi", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64922-PM.jpeg_edhklz", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64917-PM.jpeg_gvi3wr", width: 1200, height: 1600 },
      { publicId: "WhatsApp-Image-2023-11-04-at-64919-PM.jpeg_s1hlad", width: 1200, height: 1600 },
    ],
  },

  /* =====================================================================
   * 2023 - Slingshot launch (Hemas & Hatch)
   * ===================================================================== */
  {
    slug: "hemas-hatch-slingshot-launch-2023",
    title:
      "Hemas & Hatch Launch Slingshot - EDUS at the Catalyst Event",
    description:
      "Photos from the Slingshot launch by Hemas and Hatch - the catalyst programme for Sri Lankan startups, and the cohort EDUS joined.",
    cardSubtitle: "Joining the first Slingshot cohort for Sri Lankan startups",
    category: "Events",
    tint: "#8B5CF6",
    eventDate: "2023-09-06",
    datePublished: "2023-09-06",
    location: "Colombo, Sri Lanka",
    keywords: [
      "Slingshot launch 2023",
      "Hemas Hatch Slingshot",
      "Sri Lankan startup accelerator",
      "Hemas Holdings",
      "Hatch Sri Lanka",
      "EDUS Slingshot cohort",
      "Sri Lanka startup ecosystem",
    ],
    externalLinks: [
      {
        label: "Hemas Holdings",
        url: "https://www.hemas.com/",
        context: "Anchor partner backing the Slingshot programme.",
      },
      {
        label: "Hatch - Sri Lanka",
        url: "https://hatch.lk/",
        context: "Co-creator and host of the Slingshot accelerator.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "What EDUS brought into the first Slingshot cohort.",
      },
      {
        label: "EDUS Press",
        href: "/press",
        context: "Other public recognition of EDUS Online Institute.",
      },
    ],
    body: [
      "On 6 September 2023, Hemas and Hatch officially launched Slingshot - a catalyst programme designed to accelerate Sri Lankan startups with structured mentorship, operational coaching, and capital introductions. EDUS was honoured to be selected into the first cohort, and this album captures the team alongside the founders, mentors, and partners who attended the launch.",

      "## Why programmes like Slingshot matter",
      "Sri Lanka has a long tradition of talented founders solving real problems. What's been harder to find is structured support that scales beyond informal networks - the kind of programme that picks early-stage teams, sits with them month after month, and helps them sharpen the operational basics that turn ideas into companies.",
      "Slingshot was launched to fill exactly that gap. It is not just capital. It is the mentorship and the operational discipline that come with capital, delivered through a cohort model so founders learn alongside peers who are working through the same hard questions.",

      "## What EDUS brings to the cohort",
      "EDUS joined Slingshot as one of the education-focused startups in the cohort. Our work is to deliver structured online tuition with measurable academic outcomes - and the Slingshot framework pushed us to sharpen the narrative around student impact, tutor quality, and the operational systems that make consistency possible at scale.",

      "## Gratitude to the organisers",
      "Programmes like Slingshot are built by people who care more about ecosystem outcomes than headlines. Thanks to the Hemas team, the Hatch team, and every mentor who showed up for the founders in our cohort. This launch was a milestone for Sri Lankan startups, not just for EDUS.",
    ],
    photos: [
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_5_jrmdu6", width: 2000, height: 1125 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_6_scpv9n", width: 1024, height: 576 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_7_b5es97", width: 1024, height: 683 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_8_hy4wcb", width: 1024, height: 576 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_9_gzhoqc", width: 1024, height: 683 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_1_ancfkn", width: 808, height: 538 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_2_nhunja", width: 2000, height: 1125 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_3_nwfqsy", width: 2000, height: 1333 },
      { publicId: "Hemas_and_Hatch_Launch_Slingshot_A_Catalyst_for_Sri_Lankan_Startups_4_kkg8ke", width: 2000, height: 1125 },
    ],
  },

  /* =====================================================================
   * 2023 - Kokuvil Hindu Primary scholarship recognition
   * ===================================================================== */
  {
    slug: "edus-honors-kokuvil-hindu-primary-grade-5-scholarship",
    title:
      "EDUS Honors Kokuvil Hindu Primary Grade 5 Scholarship Students",
    description:
      "EDUS recognises Grade 5 Scholarship Exam students from Kokuvil Hindu Primary - photos of the certificate handover and community celebration.",
    cardSubtitle: "Celebrating Grade 5 Scholarship achievers in our home community",
    category: "Events",
    tint: "#22C55E",
    eventDate: "2023-08-16",
    datePublished: "2023-08-16",
    location: "Kokuvil, Jaffna, Sri Lanka",
    coverPublicId:
      "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_2_mfdbrw",
    keywords: [
      "Grade 5 Scholarship Exam Sri Lanka",
      "Kokuvil Hindu Primary",
      "Grade 5 scholarship Jaffna",
      "EDUS community events",
      "Sri Lanka Grade 5 results",
      "Department of Examinations Sri Lanka",
      "primary school scholarship",
    ],
    externalLinks: [
      {
        label: "Department of Examinations - Sri Lanka",
        url: "https://www.doenets.lk/",
        context: "Official body administering the Grade 5 Scholarship Exam.",
      },
      {
        label: "Ministry of Education - Sri Lanka",
        url: "https://moe.gov.lk/",
        context: "Sri Lanka's Ministry of Education and exam policy authority.",
      },
    ],
    internalLinks: [
      {
        label: "EDUS Sri Lanka Grade 5 tuition",
        href: "/sl",
        context: "Online tuition for Sri Lankan primary students.",
      },
      {
        label: "About EDUS",
        href: "/about",
        context: "How EDUS supports the Northern Province community.",
      },
    ],
    relatedBlogSlug: "grade-5-scholarship-exam-2026-guide",
    body: [
      "On 16 August 2023, EDUS visited Kokuvil Hindu Primary School to honour students who performed exceptionally well in Sri Lanka's Grade 5 Scholarship Exam. The event was simple and deliberately community-focused - certificates, words of encouragement, photos with families, and a reminder to the next year-group that hard work is recognised here.",

      "## Why the Grade 5 exam matters",
      "The Grade 5 Scholarship Exam is one of the most consequential tests a Sri Lankan primary-school child sits. A strong score opens doors to popular national secondary schools. Children who do well are often the result of a coordinated effort - their school, their family, and increasingly, their tuition support.",
      "Recognising that effort publicly matters. It tells the children their work was seen. It tells the parents the sacrifice was worth something. And it tells the next cohort that the path is real - not abstract.",

      "## A small ceremony, a real meaning",
      "EDUS deliberately keeps these recognition events small. There is no stage, no microphone, no formality that overwhelms the children. Just the principal, the class teacher, the EDUS team, the parents, and the students - in the school hall, with a certificate and a handshake.",

      "## Our promise to the next year",
      "EDUS continues to support Grade 5 students preparing for the scholarship exam through one-to-one online tuition, structured past-paper practice, and the kind of patient, child-friendly explanation that primary-age children need. If your child is preparing for this exam and you would like a structured plan, the EDUS Sri Lanka team is here to help.",
    ],
    photos: [
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_1_f2ycpz", width: 576, height: 1024 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_2_mfdbrw", width: 1024, height: 576 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_3_wcrcwx", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_4_wsfjlc", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_5_yyybcj", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_6_kmyhbs", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_7_fp2oin", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_8_s3sfnm", width: 576, height: 1024 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_9_vd4mqj", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_10_vrfayk", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_11_oxt0zq", width: 1024, height: 683 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_12_h3luk1", width: 576, height: 1024 },
      { publicId: "EDUS_Honors_Outstanding_Students_from_Kokuvil_Hindu_Primary_at_Grade_5_Scholarship_Exam_13_siuv7f", width: 576, height: 1024 },
    ],
  },

  /* =====================================================================
   * 2023 - SLASSCOM Xcellerate
   * ===================================================================== */
  {
    slug: "edus-slasscom-xcellerate-2023",
    title:
      "EDUS at SLASSCOM Xcellerate 2023 - Online Learning Innovation",
    description:
      "EDUS at SLASSCOM Xcellerate 2023 - photos of the showcase, mentor sessions, and the team representing Sri Lankan edtech.",
    cardSubtitle: "Representing Sri Lankan edtech at SLASSCOM Xcellerate",
    category: "Events",
    tint: "#2563EB",
    eventDate: "2023-05-15",
    datePublished: "2023-05-15",
    location: "Colombo, Sri Lanka",
    keywords: [
      "SLASSCOM Xcellerate 2023",
      "SLASSCOM",
      "Sri Lanka edtech",
      "Sri Lanka IT industry",
      "EDUS Xcellerate cohort",
      "tech startup mentorship",
    ],
    externalLinks: [
      {
        label: "SLASSCOM",
        url: "https://slasscom.lk/",
        context: "Sri Lanka Association of Software and Services Companies.",
      },
      {
        label: "SLASSCOM Xcellerate",
        url: "https://slasscom.lk/xcellerate/",
        context: "The flagship Xcellerate programme that EDUS participated in.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "How SLASSCOM Xcellerate shaped EDUS's operational growth.",
      },
      {
        label: "EDUS Press",
        href: "/press",
        context: "More public recognition for EDUS Online Institute.",
      },
    ],
    body: [
      "In May 2023, EDUS participated in SLASSCOM Xcellerate - the flagship programme run by the Sri Lanka Association of Software and Services Companies to support promising local technology and IT-enabled-services companies. This album captures the EDUS team alongside the cohort, mentors, and SLASSCOM organisers.",

      "## What SLASSCOM Xcellerate offers",
      "Xcellerate is structured to push participating companies past the comfortable middle - the stage where a startup has product-market fit but hasn't yet built the operational systems to scale safely. It combines mentor-led sessions on growth strategy, operational discipline, and international expansion with peer learning across a curated cohort.",

      "## How EDUS used the programme",
      "EDUS used Xcellerate to sharpen the operational story behind our online tuition platform - tutor matching, syllabus mapping, time-zone scheduling for cross-border students, parent communication systems, and the academic quality controls that make one-to-one online tutoring different from a video call with a textbook. The conversations with mentors helped pressure-test how the model holds up at higher student volumes.",

      "## Why this matters for our students",
      "Programmes like Xcellerate may sound far removed from a Grade 9 maths class. But they are not. Every operational improvement EDUS makes - faster tutor matching, better parent reports, more reliable scheduling, deeper subject coverage - is the direct result of the kind of structured thinking these programmes force on the team. Better company, better lessons. Thank you to SLASSCOM for the invitation.",
    ],
    photos: [
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_1_t7dp4w", width: 1024, height: 655 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_2_xhfjit", width: 1024, height: 788 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_3_vmyvfn", width: 1024, height: 694 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_4_iyrrs2", width: 1024, height: 626 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_5_epr0tm", width: 923, height: 1024 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_6_xshhxa", width: 1024, height: 803 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_7_kgaa5j", width: 747, height: 1024 },
      { publicId: "EDUS_Online_Institute_A_Beacon_of_Innovation_at_the_Xcellerate_Program_2023_8_tdsspp", width: 1024, height: 789 },
    ],
  },

  /* =====================================================================
   * 2023 - Spiralation 2022 finalist
   * ===================================================================== */
  {
    slug: "edus-spiralation-2022-finalist",
    title:
      "EDUS Selected as Spiralation 2022 Finalist - Photos & Highlights",
    description:
      "EDUS reaches the Spiralation 2022 finalist round - photos of the showcase, the cohort, and a leap towards Sri Lankan edtech recognition.",
    cardSubtitle: "Selected as a Spiralation finalist among Sri Lankan startups",
    category: "Events",
    tint: "#FACC15",
    eventDate: "2023-02-16",
    datePublished: "2023-02-16",
    location: "Colombo, Sri Lanka",
    keywords: [
      "Spiralation 2022",
      "ICTA Sri Lanka",
      "Spiralation finalist",
      "Sri Lankan startup programme",
      "tech incubator Sri Lanka",
      "EDUS startup recognition",
    ],
    externalLinks: [
      {
        label: "ICTA - Information and Communication Technology Agency",
        url: "https://www.icta.lk/",
        context: "Government agency behind the Spiralation startup programme.",
      },
      {
        label: "Spiralation - ICTA",
        url: "https://www.icta.lk/projects/spiralation/",
        context: "Official ICTA Spiralation programme page.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "How Spiralation accelerated the EDUS operating model.",
      },
      {
        label: "EDUS Press",
        href: "/press",
        context: "Other public recognition milestones.",
      },
    ],
    body: [
      "In February 2023, EDUS was selected as a finalist in Spiralation 2022 - the flagship startup support programme run by ICTA in collaboration with industry partners. The selection put EDUS alongside a curated group of Sri Lankan early-stage technology companies, and this album captures the showcase, the mentor sessions, and the team energy from the day.",

      "## What Spiralation backs",
      "Spiralation is built to help early-stage Sri Lankan startups cross the gap between idea and operational business. The programme combines mentorship, technical support, and the kind of external visibility that helps young companies attract their first paying customers, hires, and partners.",

      "## Why being a finalist matters",
      "Being named a finalist is, by itself, a small thing. But for an early-stage company it carries practical weight. It signals to potential parents, tutors, and partners that EDUS has been independently vetted by people who know the local technology ecosystem. It opens doors that would otherwise stay shut.",
      "More importantly, the process of preparing for Spiralation forced the team to write down what EDUS actually is, who it serves, and what makes the academic experience different. That document still informs how we describe ourselves today.",

      "## A leap, not a destination",
      "Spiralation was an early validation - not a finish line. The work that came after - more students, more tutors, more syllabuses, more countries - mattered more than the recognition. But the recognition helped. Thanks to the Spiralation team and the mentors who spent time with us during the finalist round.",
    ],
    photos: [
      { publicId: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success_1_dhsgwc", width: 1024, height: 689 },
      { publicId: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success_3_utcvnl", width: 683, height: 1024 },
      { publicId: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success_2_waervu", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success_4_pjb8vq", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Finalist_Spot_at_Spiralation_2022_A_Leap_Towards_Greater_Success_5_cxro7z", width: 1024, height: 683 },
    ],
  },

  /* =====================================================================
   * 2022 - 2nd year anniversary
   * ===================================================================== */
  {
    slug: "edus-2nd-year-anniversary",
    title:
      "EDUS 2nd Year Anniversary - Community & Commitment",
    description:
      "Photos from the EDUS 2nd year anniversary - a tribute to the community, the tutors, and the families that built our online institute.",
    cardSubtitle: "Two years of online tuition, built on community trust",
    category: "Anniversary",
    tint: "#8B5CF6",
    eventDate: "2022-01-16",
    datePublished: "2022-01-16",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "EDUS 2nd anniversary",
      "EDUS Online Institute history",
      "online tuition Sri Lanka 2022",
      "EDUS tutor community",
      "Jaffna online learning",
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "The full EDUS journey since 2021.",
      },
      {
        label: "EDUS Sri Lanka",
        href: "/sl",
        context: "Where it all started - online tuition for Sri Lankan students.",
      },
    ],
    body: [
      "On 16 January 2022, EDUS marked its second year as an online tuition institute. By this point, the team had moved past the messy first-year survival mode and into something steadier - a regular rhythm of classes, a growing tutor pool, and a small but loyal community of parents who had become quiet evangelists for the EDUS academic approach.",

      "## What changed between year one and year two",
      "Year one was about proving online tutoring could work in our context - that Sri Lankan parents, especially in the Northern Province, would trust an online institute with their child's education. Year two was about doing it consistently. The same lesson quality every week. The same tutor turning up on time. The same parent update arriving when it was promised.",
      "Consistency is unglamorous, but it is what builds a real institute. The 2nd anniversary celebration was the team's quiet acknowledgement that the boring work was paying off.",

      "## A tribute to the community",
      "EDUS owes its second year more to the community than to any internal decision. The parents who told friends. The students who asked us to add new subjects. The tutors who stayed, then introduced their colleagues. The mentors who answered messages on evenings and weekends. The Jaffna community that gave us our home and our identity.",

      "## A reminder of why we exist",
      "Two years in, the answer to 'why does EDUS exist?' was clearer than it had been on day one. We exist to give every student - especially those who don't have easy access to top tutors locally - a structured, personal, accountable online learning experience. Year two reinforced that. Year three was set up to build on it.",
    ],
    photos: [
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_1_auyuig", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_3_h1kydt", width: 1024, height: 610 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_4_gedbyw", width: 1024, height: 690 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_5_vonujb", width: 1024, height: 749 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_6_k5jclr", width: 1024, height: 768 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_7_ehz9yc", width: 1024, height: 396 },
      { publicId: "EDUS_Celebrates_Its_2nd_Year_Anniversary_A_Tribute_to_Community_and_Commitment_8_yytfdr", width: 1024, height: 658 },
    ],
  },

  /* =====================================================================
   * 2021 - First office opening in Jaffna
   * ===================================================================== */
  {
    slug: "edus-first-office-opening-jaffna-2021",
    title:
      "EDUS Opens Its First Office in Jaffna - A New Beginning",
    description:
      "Photos from the EDUS first office opening in Jaffna - the small ceremony, the team that started it all, and where the online institute began.",
    cardSubtitle: "Where it all started - the first EDUS office in Jaffna",
    category: "Milestones",
    tint: "#2563EB",
    eventDate: "2021-10-26",
    datePublished: "2021-10-26",
    location: "Jaffna, Sri Lanka",
    keywords: [
      "EDUS first office",
      "EDUS founded 2021",
      "EDUS Jaffna",
      "EDUS Online Institute origin",
      "online tuition founder story",
      "Jaffna edtech 2021",
    ],
    externalLinks: [
      {
        label: "Jaffna - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Jaffna",
        context: "Background on Jaffna, the city EDUS was founded in.",
      },
    ],
    internalLinks: [
      {
        label: "About EDUS",
        href: "/about",
        context: "The complete EDUS story from this first office onwards.",
      },
      {
        label: "EDUS Sri Lanka",
        href: "/sl",
        context: "How that first office became a cross-border tuition platform.",
      },
    ],
    body: [
      "On 26 October 2021, EDUS opened its first office in Jaffna - a small, deliberately understated space that became the operational home of what would grow into a cross-border online tuition institute. This album captures the people, the room, and the quiet beginning that no one outside the founding team paid much attention to at the time.",

      "## Why an online institute needed a physical office",
      "EDUS was always designed to be online-first. Live classes, online tutors, students joining from their homes. But a real institute - even an online one - needs an operational base. Somewhere the coordinators can sit. Somewhere new tutors can come in for orientation. Somewhere parents can drop in if they want to see the people their child is studying with.",
      "The first Jaffna office answered all of that. It wasn't fancy. It was a room with the basics - decent internet, a few desks, a small meeting corner, and a wall where the team's plans for the next twelve months were taped up.",

      "## The team that started it all",
      "Day-one teams are always small. The EDUS founding group was a handful of people - a couple of academic anchors, an operations coordinator, a handful of subject experts willing to teach online when most of their peers were still figuring out Zoom. The photos in this album show that group, and the small office that held them.",

      "## A reminder of the beginning",
      "Four years later, EDUS serves students across Sri Lanka, India, the Maldives, and the global diaspora. But every part of what we do today traces back to this small room in Jaffna. Looking at these photos is a useful reminder - real institutes are built quietly, by small teams, over long periods. The opening event in 2021 was the start of that long period. Thank you to everyone who was in the room.",
    ],
    photos: [
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_1_plmjdp", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_3_tijhqc", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_5_c2pw1a", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_8_tdkxzu", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_9_bcyagw", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_11_ao2jz0", width: 1024, height: 768 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_12_g8k70q", width: 1024, height: 682 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_15_ftbitf", width: 1024, height: 683 },
      { publicId: "EDUS_Celebrates_New_Beginnings_with_First_Office_Opening_in_Jaffna_17_gehy5x", width: 1024, height: 683 },
    ],
  },
];

/* --------------------------------------------------------------- */
/* Helpers - mirror BlogData.ts conventions                         */
/* --------------------------------------------------------------- */

/** Filter out drafts. Used by the public index page + sitemap. */
export const PUBLISHED_ALBUMS = ALBUMS.filter((a) => !a.draft);

/** Find a single album by slug. Returns undefined for missing slugs. */
export function getAlbum(slug: string): GalleryAlbum | undefined {
  return ALBUMS.find((a) => a.slug === slug);
}

/**
 * Cover photo for an album.
 *   1. Editorial override via `album.coverPublicId` wins.
 *   2. Otherwise the first photo in `album.photos`.
 *   3. Brand OG image fallback when no photos exist yet.
 */
export function albumCover(album: GalleryAlbum, width = 800): string {
  if (album.coverPublicId) return cloudinaryUrl(album.coverPublicId, { width });
  const first = album.photos[0];
  if (!first) return "/edus-og.jpg";
  return cloudinaryUrl(first.publicId, { width });
}
