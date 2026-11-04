# Project State — Radar

- **Current phase:** Phase 5 — Development, Milestone 1 (Setup) · **Mode:** Lite
- **Version:** v0.1.0
- **Chosen stack:** Next.js 16.4.3 + Tailwind 4.3.3 + Drizzle/libSQL (SQLite) — ADR-001, ADR-004
- **Hosting:** Vercel Hobby (read-only demo) + GitHub Actions (daily check) — all free
- **Completed:** Milestone 1 — scaffold, pinned deps, docs, design tokens, landing page, app shell, profile page with resume upload/skills/preferences (REQ-030–032)
- **In progress:** —
- **INCOMPLETE (flagged):** `/demo` is a placeholder page (M9); dashboard shows only first-run empty states (M7)
- **Scope decision (2026-11-04, USER):** v1 re-scoped in PRD §13. The deployed site is a read-only demo; real data runs locally only, so no login is needed (R-07 mitigated by design: the deployed build must run with server actions disabled for writes)
- **Free-only rule (2026-11-04, USER, ADR-004):** nothing paid → no Google Places, no Turso
- **Blockers / open questions:** OpenStreetMap coverage not yet measured (A-08); the sandbox blocks its API, so measure via GitHub Actions or with user approval
- **Open assumptions:** see ASSUMPTIONS.md
- **Next action:** Milestone 2 — companies + discovery (REQ-001–004)
- **Last updated:** 2026-11-04

## Milestones (PRD §11, re-scoped in PRD §13 on 2026-11-04)
| # | Milestone | REQs | Status |
|---|---|---|---|
| 1 | Setup, profile, resume | 030–032 | Done 2026-11-04 |
| 2 | Companies: CSV, add by hand, non-software filter, discovery (OpenStreetMap, free) | 001–004 | Next |
| 3 | Careers finder + link override | 010, 012, 013 | — |
| 4 | Daily check (GitHub Actions), change detection, image/PDF ads | 020, 021, 024 | — |
| 5 | Rules-based extraction | 022 | — |
| 6 | Matching + eligibility warnings | 040–042 | — |
| 7 | Dashboard, combined filters, CSV export | 050–052 | — |
| 8 | Tracking: statuses, dates, notes, 7-day nudge | 060–063 | — |
| 9 | Polish + public read-only demo with sample data | NFRs | — |
| 10 | Deploy, recording, README results | — | — |

## Gate log
| Gate | Date | Result | Notes |
| :--- | :--- | :--- | :--- |
| Gate 1 (Phase 00) | 2026-11-04 | APPROVED [USER] | PRD, stack table and design approved in the previous chat; confirmed with "start" |
| Definition of Ready (Phase 4) | 2026-11-04 | APPROVED [USER] | Lite mode: PRD REQ list + "Done when" criteria serve as DoR |
| Go/No-Go (Phase 7) | | | |
