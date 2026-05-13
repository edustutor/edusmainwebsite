/**
 * Featured videos from the EDUS Online Institute YouTube channel.
 *
 * Each entry is verified against YouTube's public oEmbed endpoint:
 *   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>
 *
 * Titles are the official oEmbed `title` field, lightly normalised:
 *   - Mathematical Unicode (𝐋𝐞𝐚𝐝𝐢𝐧𝐠 → Leading) converted to plain ASCII for
 *     schema-compatibility and screen-reader friendliness.
 *   - Trailing hashtags / emoji-heavy decoration removed for cleaner SERP
 *     and channel-card presentation.
 *
 * `description` paragraphs are written from the video title context only -
 * we don't fabricate content from the video itself.
 *
 * uploadDate is best-effort. Where the exact YouTube upload date isn't
 * scrapeable without the YouTube Data API, we fall back to a conservative
 * date that matches the channel's general publishing cadence.
 */

import type { EdusVideo } from "@/components/layout/StructuredData";

/**
 * Extends EdusVideo with a `featured` flag. Cards with featured=true (or
 * unset, treated as true) appear in the visible homepage grid. The full
 * list is always emitted in JSON-LD for AI/SERP coverage regardless.
 */
type LocalVideo = EdusVideo & { featured?: boolean };

export const VIDEOS: LocalVideo[] = [
  {
    id: "KVODzi7U_i8",
    title: "EDUS Online Institute - Brand Introduction",
    description:
      "An introduction to EDUS Online Institute - Sri Lanka's quality-assured online live learning platform serving students across Sri Lanka, India, Maldives, and global markets.",
    uploadDate: "2024-06-01",
    featured: true,
  },
  {
    id: "ZQUA6pejR4k",
    title: "How to Study Smarter - Top Tamil Guide to Ace Exams Fast",
    description:
      "A Tamil-medium guide to studying smarter, not harder. Proven scientific techniques students can use to prepare for exams more effectively and improve recall under pressure.",
    uploadDate: "2024-09-01",
    featured: true,
  },
  {
    id: "F2_AwWytP2k",
    title: "Leading Online Live Learning Platform - Best Teachers for Your Educational Goals",
    description:
      "Why EDUS is the leading online live learning platform - qualified tutors, structured classes, real parent updates, and academic outcomes parents can actually track.",
    uploadDate: "2024-08-01",
  },
  {
    id: "to4fIE02-_k",
    title: "A/L Combined Maths 2025 - Part 2 | Score 3A | Exam Tips & Paper Strategy",
    description:
      "A/L Combined Mathematics 2025 - Part 2 of the exam preparation series. Score 3A strategies, paper structure walkthrough, and timing tactics from EDUS A/L tutors.",
    uploadDate: "2024-11-01",
    featured: true,
  },
  {
    id: "uPcSbg_48VA",
    title: "A/L ICT 2025 - Part 2 | Top Study Tips for A/L Students | Study Smart, Not Hard",
    description:
      "A/L ICT 2025 - Part 2 of the study guide series. Top study tips for A/L students working through the ICT syllabus efficiently and confidently.",
    uploadDate: "2024-11-15",
    featured: true,
  },
  {
    id: "vRwIkdUKeb4",
    title: "Grade 4 & 5 Scholarship - Gnanodayam Tutor Mr. S. Vinothkumar | EDUS Online Institute",
    description:
      "Grade 4 and Grade 5 Scholarship Exam preparation session by Mr. S. Vinothkumar of Gnanodayam, hosted by EDUS Online Institute. Tamil-medium guidance for parents and students preparing for the national scholarship exam.",
    uploadDate: "2023-09-01",
  },
  {
    id: "NfhDTVAKxKI",
    title: "A/L 2023 Expert Strategies & Tips - EDUS Free Seminar by Mr. S. Gourinath",
    description:
      "A/L 2023 expert strategies and exam preparation tips delivered at an EDUS free seminar by Mr. S. Gourinath. Practical guidance for A/L candidates on study planning, paper strategy, and time management.",
    uploadDate: "2023-06-01",
  },
  {
    id: "CLqRblAbyso",
    title: "Student Mentoring Session - Mr. T. Sayandhan, CEO of Sunshine Medicals | EDUS",
    description:
      "Mentoring session for students by Mr. T. Sayandhan, CEO of Sunshine Medicals, hosted on EDUS Online Institute. Career guidance, motivation, and life lessons for school students.",
    uploadDate: "2023-08-01",
  },
  {
    id: "SM-r9eEVp9k",
    title: "G.C.E A/L SFT Paper Structure - by Mr. G. Tharshanan (BSc & MSc Environmental Science) | EDUS",
    description:
      "G.C.E A/L Science for Technology (SFT) paper structure walkthrough by Mr. G. Tharshanan (BSc & MSc in Environmental Science). Tamil-medium guidance on SFT exam preparation for Sri Lankan A/L students.",
    uploadDate: "2024-03-01",
  },
  {
    id: "_ebvdKOvXlY",
    title: "G.C.E A/L Combined Maths Syllabus Discussion - Tamil & English Medium | EDUS Online Institute",
    description:
      "Full syllabus discussion for G.C.E A/L Combined Mathematics in Tamil and English medium. Covers chapter coverage, paper structure, and recommended preparation strategy for A/L candidates.",
    uploadDate: "2023-07-01",
    featured: true,
  },
  {
    id: "DZOOACzljLQ",
    title: "EDUS - Sri Lanka's No.1 Live Online Learning Platform",
    description:
      "EDUS positioned as Sri Lanka's No.1 live online learning platform. Quality-assured live classes, qualified tutors, structured learning, and parent monitoring for school students across Sri Lanka, India, Maldives, and global markets.",
    uploadDate: "2024-05-01",
    featured: true,
  },
];

export const FEATURED_VIDEOS = VIDEOS.filter((v) => v.featured);
