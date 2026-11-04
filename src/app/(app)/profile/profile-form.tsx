"use client";
// Interactive profile form. Client component because it keeps the skill list
// in React state while you add/remove skills, before anything is saved.
import { useActionState, useId, useState, useTransition, type FormEvent, type KeyboardEvent } from "react";
import { AlertIcon, CheckIcon, UploadIcon, XIcon } from "@/components/icons";
import { CITIES, MAX_SKILLS, REMOTE_PREFERENCE, SEEKING } from "@/lib/profile/options";
import { MAX_RESUME_BYTES, RESUME_MESSAGES } from "@/lib/resume/messages";
import { canonicalSkill } from "@/lib/skills/detect";
import { saveProfileAction, uploadResume, type SaveState, type UploadState } from "./actions";

type Initial = {
  skills: string[];
  semester: number | null;
  graduationYear: number | null;
  cgpa: number | null;
  cities: string[];
  remotePreference: (typeof REMOTE_PREFERENCE)[number];
  seeking: (typeof SEEKING)[number];
  resumeFileName: string | null;
  updatedAt: string;
} | null;

const REMOTE_LABELS: Record<(typeof REMOTE_PREFERENCE)[number], string> = {
  any: "Onsite, hybrid or remote",
  onsite_ok: "Onsite or hybrid",
  remote_only: "Remote only",
};
const SEEKING_LABELS: Record<(typeof SEEKING)[number], string> = {
  internship: "Internships",
  job: "Jobs",
  both: "Both",
};

export function ProfileForm({ initial }: { initial: Initial }) {
  const [skills, setSkills] = useState<string[]>(initial?.skills ?? []);
  const [newSkills, setNewSkills] = useState<Set<string>>(new Set()); // detected, not yet saved
  const [draft, setDraft] = useState("");
  const [upload, setUpload] = useState<UploadState>({ status: "idle" });
  const [uploading, startUpload] = useTransition();
  const [save, saveAction, saving] = useActionState<SaveState, FormData>(saveProfileAction, { status: "idle" });
  const ids = { file: useId(), skill: useId() };

  const errors = save.status === "error" ? save.errors : {};

  // Adds skills that aren't already in the list (ignoring case), up to MAX_SKILLS.
  function addSkills(list: string[], markNew: boolean) {
    const seen = new Set(skills.map((s) => s.toLowerCase()));
    const added: string[] = [];
    for (const raw of list) {
      const s = canonicalSkill(raw);
      if (!s || seen.has(s.toLowerCase())) continue;
      seen.add(s.toLowerCase());
      added.push(s);
    }
    setSkills([...skills, ...added].slice(0, MAX_SKILLS));
    if (markNew) setNewSkills(new Set([...newSkills, ...added]));
  }

  function onFileChosen(e: FormEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    // Check size here too, so a big file never reaches the server (which would reject it less politely).
    if (file.size > MAX_RESUME_BYTES) {
      setUpload({ status: "error", message: RESUME_MESSAGES.too_large });
      return;
    }
    const fd = new FormData();
    fd.append("resume", file);
    startUpload(async () => {
      try {
        const result = await uploadResume(fd);
        setUpload(result);
        if (result.status === "ok") addSkills(result.skills, true);
      } catch {
        setUpload({ status: "error", message: RESUME_MESSAGES.unreadable });
      }
    });
  }

  function onSkillKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitDraft();
    }
  }
  function commitDraft() {
    const parts = draft.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) addSkills(parts, false);
    setDraft("");
  }
  function removeSkill(skill: string) {
    setSkills((s) => s.filter((x) => x !== skill));
  }

  return (
    <div className="mt-10 space-y-8">
      {!initial && upload.status === "idle" && (
        <div className="border border-line bg-paper p-5 text-stormy">
          <p className="font-normal text-evening">No resume yet</p>
          <p className="mt-1">
            Upload your resume to get fit scores. Until then, matching is off, but you can still browse companies.
          </p>
        </div>
      )}

      {/* ── Resume ─────────────────────────────── */}
      <section aria-labelledby="resume-h" className="border border-line bg-paper p-6">
        <h2 id="resume-h" className="label-caps text-stormy">Resume</h2>
        <p className="mt-2 text-stormy">
          PDF, up to 4 MB. Radar reads the text to suggest skills, then forgets the file.
          {initial?.resumeFileName && <> Last upload: <span className="text-evening">{initial.resumeFileName}</span>.</>}
        </p>
        <label
          htmlFor={ids.file}
          className={`label-caps mt-5 inline-flex cursor-pointer items-center gap-3 bg-sunset px-6 py-3 text-sand hover:bg-sunset/85 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-rose ${uploading ? "opacity-60" : ""}`}
        >
          <UploadIcon /> {uploading ? "Reading…" : "Choose PDF"}
          <input
            id={ids.file}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={onFileChosen}
            disabled={uploading}
          />
        </label>
        <div aria-live="polite" className="mt-4">
          {upload.status === "ok" && (
            <p className="flex items-start gap-2 text-evening">
              <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sunset" />
              {upload.skills.length
                ? `Found ${upload.skills.length} skills in ${upload.fileName}. They're marked "new" below: keep, remove or add, then save.`
                : `Read ${upload.fileName}, but found no skills Radar knows. Add yours by hand below.`}
            </p>
          )}
          {upload.status === "error" && (
            <p role="alert" className="flex items-start gap-2 text-danger">
              <AlertIcon className="mt-1 h-4 w-4 shrink-0" /> {upload.message}
            </p>
          )}
        </div>
      </section>

      <form action={saveAction} className="space-y-8">
        {upload.status === "ok" && <input type="hidden" name="resumeFileName" value={upload.fileName} />}
        {skills.map((s) => (
          <input key={s} type="hidden" name="skills" value={s} />
        ))}

        {/* ── Skills ─────────────────────────────── */}
        <section aria-labelledby="skills-h" className="border border-line bg-paper p-6">
          <h2 id="skills-h" className="label-caps text-stormy">Skills</h2>
          {skills.length === 0 ? (
            <p className="mt-3 text-stormy">No skills yet. Upload a resume or type them below.</p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your skills">
              {skills.map((s) => (
                <li key={s} className="flex items-center gap-2 border border-line bg-sand py-1 pl-3 pr-1">
                  {s}
                  {newSkills.has(s) && <span className="text-xs uppercase tracking-widest text-sunset">new</span>}
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    aria-label={`Remove ${s}`}
                    className="p-1 text-stormy hover:text-danger"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <label htmlFor={ids.skill} className="sr-only">Add a skill</label>
            <input
              id={ids.skill}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onSkillKey}
              maxLength={200}
              placeholder="Add a skill, e.g. Docker (comma for several)"
              className="min-w-0 flex-1 border border-line bg-white px-3 py-2"
            />
            <button type="button" onClick={commitDraft} className="label-caps border border-evening px-5 py-2 hover:bg-evening hover:text-beige">
              Add
            </button>
          </div>
          <FieldError message={errors.skills} />
        </section>

        {/* ── Preferences ────────────────────────── */}
        <section aria-labelledby="prefs-h" className="border border-line bg-paper p-6">
          <h2 id="prefs-h" className="label-caps text-stormy">Preferences</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <NumberField name="semester" label="Semester" min={1} max={12} step={1} value={initial?.semester} error={errors.semester} />
            <NumberField name="graduationYear" label="Graduation year" min={2020} max={2040} step={1} value={initial?.graduationYear} error={errors.graduationYear} />
            <NumberField name="cgpa" label="CGPA (optional)" min={0} max={4} step={0.01} value={initial?.cgpa} error={errors.cgpa} />
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm text-stormy">Preferred cities</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CITIES.map((c) => (
                <label key={c} className="flex items-center gap-2">
                  <input type="checkbox" name="cities" value={c} defaultChecked={initial?.cities.includes(c)} className="accent-sunset" />
                  {c}
                </label>
              ))}
            </div>
            <FieldError message={errors.cities} />
          </fieldset>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <RadioGroup name="remotePreference" legend="Work mode" options={REMOTE_LABELS} value={initial?.remotePreference ?? "any"} />
            <RadioGroup name="seeking" legend="Looking for" options={SEEKING_LABELS} value={initial?.seeking ?? "internship"} />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving || uploading}
            className="label-caps bg-evening px-8 py-4 text-beige hover:bg-stormy disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
          <div aria-live="polite">
            {save.status === "saved" && (
              <p className="flex items-center gap-2 text-evening">
                <CheckIcon className="text-sunset" /> Saved.
              </p>
            )}
            {save.status === "error" && (
              <p role="alert" className="text-danger">
                {errors.form ?? "Some fields need fixing. See the messages above."}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-danger">{message}</p> : null;
}

function NumberField(props: {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number | null | undefined;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm text-stormy">{props.label}</label>
      <input
        id={id}
        name={props.name}
        type="number"
        inputMode="decimal"
        min={props.min}
        max={props.max}
        step={props.step}
        defaultValue={props.value ?? ""}
        aria-invalid={props.error ? true : undefined}
        className="mt-1 w-full border border-line bg-white px-3 py-2"
      />
      <FieldError message={props.error} />
    </div>
  );
}

function RadioGroup<T extends string>(props: { name: string; legend: string; options: Record<T, string>; value: T }) {
  return (
    <fieldset>
      <legend className="text-sm text-stormy">{props.legend}</legend>
      <div className="mt-2 space-y-1">
        {(Object.keys(props.options) as T[]).map((key) => (
          <label key={key} className="flex items-center gap-2">
            <input type="radio" name={props.name} value={key} defaultChecked={props.value === key} className="accent-sunset" />
            {props.options[key]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
