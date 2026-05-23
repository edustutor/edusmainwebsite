import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ClassEntry, TutorProfile } from "./types";

/**
 * Load the chatbot catalog (classes + tutors) from /public/data.
 *
 * Why read from filesystem instead of importing JSON directly?
 *   - Next's static JSON import bundles the file into the build output
 *     once at build time. Editing classes.json without rebuilding the
 *     app would NOT update the bot's answers.
 *   - readFile here is invoked from the /api/chat route handler, which
 *     runs on every request. Result: classes.json edits go live as soon
 *     as the file is committed + Vercel redeploys. No second build step.
 *   - We cache the file contents in module scope so multiple concurrent
 *     requests don't re-read disk. The cache busts on cold start (every
 *     few minutes on Vercel serverless) which is exactly when fresh
 *     data should be picked up.
 *
 * The catalog is small (~12KB JSON total), so caching it in memory is
 * cheap and predictable. Don't over-engineer this with Redis - it's
 * a static data file that changes ~weekly.
 */

type Catalog = {
  classes: ClassEntry[];
  tutors: Record<string, TutorProfile>;
};

let cache: Catalog | null = null;

export async function loadCatalog(): Promise<Catalog> {
  if (cache) return cache;
  const dataDir = path.join(process.cwd(), "public", "data");
  const [classesRaw, tutorsRaw] = await Promise.all([
    readFile(path.join(dataDir, "classes.json"), "utf8"),
    readFile(path.join(dataDir, "tutors.json"), "utf8"),
  ]);
  const classesJson = JSON.parse(classesRaw) as { classes: ClassEntry[] };
  const tutorsJson = JSON.parse(tutorsRaw) as {
    tutors: Record<string, TutorProfile>;
  };
  cache = {
    classes: classesJson.classes,
    tutors: tutorsJson.tutors,
  };
  return cache;
}
