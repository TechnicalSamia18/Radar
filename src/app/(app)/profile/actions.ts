"use server";
// Server Actions for the profile page. These run only on the server; the
// browser calls them like functions, and Next.js sends the form data over POST.
//
// INCOMPLETE (Milestone 9): these actions don't check a login yet. The app
// must not be deployed publicly until Auth.js is added (docs/PROJECT_STATE.md).
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveProfile } from "@/lib/profile/repo";
import { fieldErrors, profileFormToObject, profileSchema } from "@/lib/profile/validation";
import { extractResume, RESUME_MESSAGES } from "@/lib/resume/extract";

export type UploadState =
  | { status: "idle" }
  | { status: "ok"; fileName: string; skills: string[] }
  | { status: "error"; message: string };

/** Reads the uploaded PDF and returns detected skills. Nothing is saved here: the user confirms first (REQ-031). */
export async function uploadResume(form: FormData): Promise<UploadState> {
  const file = form.get("resume");
  if (!(file instanceof File)) return { status: "error", message: RESUME_MESSAGES.empty };

  const result = await extractResume(new Uint8Array(await file.arrayBuffer()));
  if (!result.ok) return { status: "error", message: result.message };

  return { status: "ok", fileName: cleanFileName(file.name), skills: result.skills };
}

export type SaveState =
  | { status: "idle" }
  | { status: "saved"; at: string }
  | { status: "error"; errors: Record<string, string> };

export async function saveProfileAction(_prev: SaveState, form: FormData): Promise<SaveState> {
  const parsed = profileSchema.safeParse(profileFormToObject(form));
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error) };

  const resumeName = z.string().min(1).max(200).safeParse(form.get("resumeFileName"));

  try {
    await saveProfile(parsed.data, resumeName.success ? { fileName: cleanFileName(resumeName.data) } : undefined);
  } catch (err) {
    console.error("saveProfile failed:", err instanceof Error ? err.message : "unknown error");
    return { status: "error", errors: { form: "Couldn't save your profile. Please try again." } };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { status: "saved", at: new Date().toISOString() };
}

/** Keeps only the base name and strips control characters, so a crafted file name can't inject into logs or the UI. */
function cleanFileName(name: string) {
  const base = name.split(/[\\/]/).pop() ?? "resume.pdf";
  return base.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200) || "resume.pdf";
}
