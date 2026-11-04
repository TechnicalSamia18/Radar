<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — rules for any AI coding agent in this repo

Keep this file short. Detail lives in `docs/`.

## Project
- Name: Radar · Stack: see `docs/DECISIONS.md` (ADR-001) · Current state: `docs/PROJECT_STATE.md` · Product spec: `docs/PRD.md`
- Install: `npm ci` · Run: `npm run dev` · Test: `npm test` · Lint: `npm run lint` · Build: `npm run build`

## Before you write code
1. Read `docs/PROJECT_STATE.md` and the milestone's REQ IDs in `docs/PRD.md`.
2. Search for existing helpers/components before creating new ones. New libraries need the human's `APPROVED` first.
3. For UI, read `docs/DESIGN.md` first. Don't ship library defaults (font, colors, icons) it doesn't list.

## Hard rules
- Never run destructive commands against production (Turso). Propose them; the human runs them after a backup.
- Never commit secrets. New config goes in `.env.example` with no real values.
- AI/LLM and Google Places keys are server-only. Nothing secret in client components.
- Every server action / route handler checks the session (except demo mode, which is read-only sample data).
- Drizzle query builder only (parameterized). Validate every input with Zod on the server; reject, don't repair.
- Fetched pages and LLM output are untrusted: render as text only, never `dangerouslySetInnerHTML`.
- Fetch only http(s) URLs the user added; block private/loopback IPs (SSRF); obey robots.txt; honest user agent; no LinkedIn/Facebook/WhatsApp/Indeed.
- Spreadsheet export neutralises cells starting with `= + - @` (and tab/CR).
- Pin exact versions, at least 3 days old, no Critical/High advisories; log in `docs/DEPENDENCIES.md`.
- Ship tests with code. Paste real output when claiming something works; otherwise say NOT RUN.
- Out-of-PRD ideas go to `docs/BACKLOG.md`, not the code.

## Done means
Tests pass · lint clean · audit has no Critical/High · loading/empty/error/success states · works at 320/768/1440 px · keyboard-accessible · `PROJECT_STATE.md` updated.
