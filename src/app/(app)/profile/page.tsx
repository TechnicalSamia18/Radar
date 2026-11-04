// Profile page (REQ-030–032). The page shell renders instantly; the part that
// reads the database streams in inside <Suspense> (required with Cache Components).
import { connection } from "next/server";
import { Suspense } from "react";
import { getProfile } from "@/lib/profile/repo";
import { ProfileForm } from "./profile-form";

export const metadata = { title: "Profile — Radar" };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="label-caps text-sunset">Profile</p>
      <h1 className="mt-2 text-4xl font-normal">Your resume and preferences</h1>
      <p className="mt-3 text-stormy">
        Radar uses this to score each opening. Your resume file isn&apos;t stored: only the skills you confirm.
      </p>
      <Suspense fallback={<p className="mt-10 text-stormy">Loading your profile…</p>}>
        <ProfileLoader />
      </Suspense>
    </div>
  );
}

async function ProfileLoader() {
  await connection(); // always read fresh data for this request
  const profile = await getProfile();
  return (
    <ProfileForm
      initial={
        profile && {
          skills: profile.skills,
          semester: profile.semester,
          graduationYear: profile.graduationYear,
          cgpa: profile.cgpa,
          cities: profile.cities,
          remotePreference: profile.remotePreference,
          seeking: profile.seeking,
          resumeFileName: profile.resumeFileName,
          updatedAt: profile.updatedAt.toISOString(),
        }
      }
    />
  );
}
