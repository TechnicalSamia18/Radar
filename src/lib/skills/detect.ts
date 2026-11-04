// Finds known skills in free text (resume now, job requirements later).
//
// How it works: every alias becomes a regular expression with "token
// boundaries" — the character before and after must not be a letter, digit
// or one of + # . — so "java" doesn't match inside "javascript" and "c"
// doesn't match inside "c++".
import { SKILLS, type SkillEntry } from "./dictionary";

const MAX_TEXT_LENGTH = 200_000; // resumes are short; cap work on hostile input

// Characters that count as part of a skill token.
const TOKEN_CHAR = "[\\p{L}\\p{N}+#]";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function boundaryRegex(alias: string, flags: string) {
  // A trailing "." (end of sentence) is fine, but ".js" style suffixes are not.
  return new RegExp(`(?<!${TOKEN_CHAR}|\\.)${escapeRegex(alias)}(?!${TOKEN_CHAR}|\\.${TOKEN_CHAR})`, flags);
}

type Compiled = { name: string; patterns: RegExp[] };

const COMPILED: Compiled[] = SKILLS.map((s: SkillEntry) => ({
  name: s.name,
  patterns: [
    ...s.aliases.map((a) => boundaryRegex(a, "iu")),
    ...(s.exact ?? []).map((a) => boundaryRegex(a, "u")),
  ],
}));

/** Returns canonical skill names found in `text`, in dictionary order, without duplicates. */
export function detectSkills(text: string): string[] {
  const input = text.slice(0, MAX_TEXT_LENGTH);
  return COMPILED.filter((s) => s.patterns.some((re) => re.test(input))).map((s) => s.name);
}

/**
 * Maps something the user typed ("reactjs", "  Node ") to the dictionary's
 * display name when we know it; otherwise returns the trimmed text unchanged.
 */
export function canonicalSkill(input: string): string {
  const trimmed = input.trim().replace(/\s+/g, " ");
  const lower = trimmed.toLowerCase();
  const hit = SKILLS.find(
    (s) => s.name.toLowerCase() === lower || s.aliases.includes(lower) || (s.exact ?? []).includes(trimmed),
  );
  return hit ? hit.name : trimmed;
}
