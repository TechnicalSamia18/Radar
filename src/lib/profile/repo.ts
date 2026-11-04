// Reads and writes the single profile row (id = 1).
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { profile, type Profile } from "@/db/schema";
import type { ProfileInput } from "./validation";

const PROFILE_ID = 1;

export async function getProfile(): Promise<Profile | null> {
  const rows = await db.select().from(profile).where(eq(profile.id, PROFILE_ID)).limit(1);
  return rows[0] ?? null;
}

export async function saveProfile(input: ProfileInput, resume?: { fileName: string }) {
  const now = new Date();
  const values = {
    ...input,
    updatedAt: now,
    ...(resume ? { resumeFileName: resume.fileName, resumeUploadedAt: now } : {}),
  };
  // Insert the row the first time, update it after that ("upsert").
  await db
    .insert(profile)
    .values({ id: PROFILE_ID, ...values })
    .onConflictDoUpdate({ target: profile.id, set: values });
}
