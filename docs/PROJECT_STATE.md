# Project State — Radar

- **Current phase:** Phase 5 — Development, Milestone 1 (Setup) · **Mode:** Lite
- **Version:** v0.1.0
- **Chosen stack:** Next.js 16.4.3 + Tailwind 4.3.3 + Drizzle/libSQL (SQLite locally, Turso in prod) — ADR-001
- **Hosting:** Vercel (web) + GitHub Actions (daily check)
- **Completed:** Milestone 1 — scaffold, pinned deps, docs, design tokens, landing page, app shell, profile page with resume upload/skills/preferences (REQ-030–032)
- **In progress:** —
- **INCOMPLETE (flagged):** no login yet (Server Actions are open) → do NOT deploy publicly before Milestone 9 (R-07); `/demo` is a placeholder page (M9); dashboard shows only first-run empty states (M7)
- **Blockers / open questions:** Auth.js sign-in provider (A-02, decide at M9)
- **Open assumptions:** see ASSUMPTIONS.md
- **Next action:** Milestone 2 — companies: CSV import, manual add, non-software filter (REQ-001, 002, 004)
- **Last updated:** 2026-11-04

## Milestones (PRD §11)
| # | Milestone | REQs | Status |
|---|---|---|---|
| 1 | Setup, profile, resume | 030–032 | Done 2026-11-04 |
| 2 | Companies | 001, 002, 004 | — |
| 3 | Careers finder | 010–012 | — |
| 4 | Daily check, change detection | 020, 021, 024 | — |
| 5 | Extraction (rules, then optional AI) | 022, 023 | — |
| 6 | Matching | 040–042 | — |
| 7 | Dashboard, filters, export | 050–052 | — |
| 8 | Tracking | 060–063 | — |
| 9 | Polish, auth, security checks | NFRs | — |
| 10 | Deploy, recording, README results | — | — |

## Gate log
| Gate | Date | Result | Notes |
| :--- | :--- | :--- | :--- |
| Gate 1 (Phase 00) | 2026-11-04 | APPROVED [USER] | PRD, stack table and design approved in the previous chat; confirmed with "start" |
| Definition of Ready (Phase 4) | 2026-11-04 | APPROVED [USER] | Lite mode: PRD REQ list + "Done when" criteria serve as DoR |
| Go/No-Go (Phase 7) | | | |
