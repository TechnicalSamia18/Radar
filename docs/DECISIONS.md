# Decisions (ADR log)

## ADR-001: Tech stack
- **Date:** 2026-11-04 · **Status:** Accepted [USER]
- **Context:** single-user web app (PRD v0.1); a stranger must run it with no paid keys or database setup; free hosting; daily check of ~100 sites within ~15 min.
- **Options considered:** Next.js full-stack vs FastAPI + React. Next.js chosen: one project, one language, easy Vercel deploy.
- **Decision:**
  - Next.js 16.4.3 (TypeScript, App Router, `src/`), React 19.3.1, Tailwind CSS 4.3.3
  - SQLite file locally / Turso in production, through Drizzle ORM 0.45.4 + @libsql/client 0.18.0
  - Daily check = a Node script run by a scheduled GitHub Actions workflow (no serverless timeout)
  - fetch + Cheerio + robots.txt parser; chrono-node for dates; Zod for all validation
  - Optional LLM extraction behind an env variable; app must work without it
  - Auth.js restricted to the owner's account; public read-only demo mode with sample data
  - Vitest (logic) + Playwright (a few page tests)
- **Consequences:** Vercel functions can't write a local SQLite file, so production needs Turso. Auth.js v5 is still a beta release (see A-01).

## ADR-002: Fonts are loaded with `next/font/google`
- **Date:** 2026-11-04 · **Status:** Accepted
- **Decision:** Jost and Cormorant Garamond via `next/font/google`, which downloads them at build time and self-hosts them (no request to Google from the visitor's browser) [VERIFIED: node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md, line 13].
- **Consequence:** the first build needs internet access.

## Blueprint deviations
| Date | Rule changed | Reason | Approved by |
| :--- | :--- | :--- | :--- |
| 2026-11-04 | Lite mode | Single-user student project | USER |
