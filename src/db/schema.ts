// Database tables (PRD §6). Drizzle turns these definitions into SQL
// migrations (`npm run db:generate`) and gives us typed, parameterized queries.
// More tables are added milestone by milestone.
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const SEEKING = ["internship", "job", "both"] as const;
export const REMOTE_PREFERENCE = ["onsite_ok", "remote_only", "any"] as const;

/**
 * The single user's profile (REQ-032). Always exactly one row with id = 1.
 * We store the skills extracted from the resume, never the PDF itself.
 */
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  skills: text("skills", { mode: "json" }).$type<string[]>().notNull().default([]),
  semester: integer("semester"),
  graduationYear: integer("graduation_year"),
  cgpa: real("cgpa"),
  cities: text("cities", { mode: "json" }).$type<string[]>().notNull().default([]),
  remotePreference: text("remote_preference", { enum: REMOTE_PREFERENCE }).notNull().default("any"),
  seeking: text("seeking", { enum: SEEKING }).notNull().default("internship"),
  resumeFileName: text("resume_file_name"),
  resumeUploadedAt: integer("resume_uploaded_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export type Profile = typeof profile.$inferSelect;
