# Project State — Radar

- **Current phase:** Phase 5 — Development · **Mode:** Lite
- **Version:** v0.1.0
- **Chosen stack:** Next.js 16.4.3 + Tailwind 4.3.3, browser-only (localStorage + Zod), unpdf in the browser — ADR-001, ADR-005
- **Hosting:** Vercel Hobby (static) — free
- **Scope:** frontend-only v1, PRD §14 (ADR-005, 2026-11-04, USER). Free-only rule (ADR-004).
- **Completed:** M1 (design, landing, resume → skills, profile)
- **In progress:** F1 — move storage to the browser
- **Next action:** F1 → F7 below
- **Last updated:** 2026-11-04

## Frontend milestones (PRD §14)
| # | Milestone | Status |
|---|---|---|
| M1 | Setup, design, landing, resume → skills, profile | Done |
| F1 | Remove DB/server code; browser storage (repository + Zod) ; profile in the browser | In progress |
| F2 | Paste-an-opening extraction (rules) | — |
| F3 | Matching: fit score, reasons, eligibility warnings | — |
| F4 | Dashboard + demo data + companies list | — |
| F5 | Openings list: combined filters, CSV export | — |
| F6 | Opening detail: tracker, dates, notes, 7-day nudge | — |
| F7 | Polish (a11y, states), Playwright tests, README, deploy | — |

## Gate log
| Gate | Date | Result | Notes |
| :--- | :--- | :--- | :--- |
| Gate 1 (Phase 00) | 2026-11-04 | APPROVED [USER] | PRD, stack table and design approved in the previous chat; confirmed with "start" |
| Definition of Ready (Phase 4) | 2026-11-04 | APPROVED [USER] | Lite mode: PRD REQ list + "Done when" criteria serve as DoR |
| Go/No-Go (Phase 7) | | | |
