# Decisions (ADR log)

## ADR-001: Tech stack
- **Date:** 2026-11-04 · **Status:** Accepted [USER]
- **Context:** single-user web app (PRD v0.1); a stranger must run it with no paid keys or database setup; free hosting; daily check of ~100 sites within ~15 min.
- **Options considered:** Next.js full-stack vs FastAPI + React. Next.js chosen: one project, one language, easy Vercel deploy.
- **Decision:**
  - Next.js 16.4.3 (TypeScript, App Router, `src/`), React 19.3.1, Tailwind CSS 4.3.3
  - SQLite file through Drizzle ORM 0.45.4 + @libsql/client 0.18.0 (~~Turso in production~~: dropped, ADR-004)
  - Daily check = a Node script run by a scheduled GitHub Actions workflow (no serverless timeout)
  - fetch + Cheerio + robots.txt parser; chrono-node for dates; Zod for all validation
  - Optional LLM extraction behind an env variable; app must work without it
  - ~~Auth.js restricted to the owner's account~~ (cut, ADR-003); public read-only demo mode with sample data
  - Vitest (logic) + Playwright (a few page tests)
- **Consequences:** Vercel functions can't write a local SQLite file, so production needs Turso. Auth.js v5 is still a beta release (see A-01).

## ADR-002: Fonts are loaded with `next/font/google`
- **Date:** 2026-11-04 · **Status:** Accepted
- **Decision:** Jost and Cormorant Garamond via `next/font/google`, which downloads them at build time and self-hosts them (no request to Google from the visitor's browser) [VERIFIED: node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md, line 13].
- **Consequence:** the first build needs internet access.

## ADR-003: v1 scope cut and read-only online demo
- **Date:** 2026-11-04 · **Status:** Accepted [USER]
- **Context:** full PRD ≈ 11–13 build hours; assignment asks for a small app. Login (Auth.js v5) is still beta and is the riskiest piece.
- **Decision:** keep the core loop + tracker + override + filters + all warnings + automated discovery (Places/OSM). Cut AI extraction, hiring-platform feeds, automated PSEB import, Excel, duplicate merging and online login. Deployed site = read-only demo with fictional data; real use is local.
- **Consequences:** no secrets or personal data on the public site; the user runs Radar on their own computer for real use. Full table in PRD §13.

## ADR-004: Free-only rule
- **Date:** 2026-11-04 · **Status:** Accepted [USER]
- **Decision:** nothing paid; use a free option if one exists, otherwise skip the feature.
- **Consequences:** Google Places dropped (card required, bills past free tier) → discovery uses OpenStreetMap only, plus CSV and add by hand. Turso dropped: the read-only online demo uses sample data bundled with the app. Vercel Hobby, GitHub Actions and all npm libraries are free.

## Blueprint deviations
| Date | Rule changed | Reason | Approved by |
| :--- | :--- | :--- | :--- |
| 2026-11-04 | Lite mode | Single-user student project | USER |
