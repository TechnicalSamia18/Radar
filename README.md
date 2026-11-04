# Radar

**Find the software houses you've never heard of.**

Radar is a personal web app for CS students in Pakistan. It builds a list of Pakistani software houses from public sources, finds each one's careers page, hiring platform or hiring email, checks them once a day, and tells you which new internships and jobs fit your resume, and why. You always apply yourself.

> **Status:** in development. Milestone 1 of 10 is done (profile + resume). See [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md).
> Product spec: [`docs/PRD.md`](docs/PRD.md).

## Run it locally

You need **Node.js 22 or newer** and npm. No paid keys and no database server are needed.

```bash
git clone <this repo> radar
cd radar
npm ci            # install the exact pinned versions from package-lock.json
npm run setup     # creates ./data/radar.db (a local SQLite file)
npm run dev       # http://localhost:3000
```

The first `npm run dev` / `npm run build` downloads two Google Fonts once (needs internet).

### Other commands

| Command | What it does |
|---|---|
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run db:generate` | Create a migration after changing `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations to the database in `DATABASE_URL` |

### Configuration

All optional for local use. Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Defaults to `file:./data/radar.db`. Set to a `libsql://…` URL for Turso in production. |
| `DATABASE_AUTH_TOKEN` | Turso token (production only). |

## What works so far

- Landing page and app shell (navy sidebar, sand pages), responsive from phone to desktop.
- **Profile** (`/profile`): upload a resume PDF → Radar suggests skills → you keep, remove or add skills → save with semester, graduation year, CGPA, cities, work mode and internship/job preference.
- Failure states for resumes: scanned (no text), password-protected, not a PDF, over 4 MB, over 10 pages, damaged.

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · SQLite / Turso via Drizzle ORM · Zod · unpdf · Vitest.
Why each was chosen: [`docs/DECISIONS.md`](docs/DECISIONS.md). Versions and vulnerability scan results: [`docs/DEPENDENCIES.md`](docs/DEPENDENCIES.md).

## Deliberately not implemented

- **LinkedIn, Indeed, Facebook or WhatsApp integration.** They have no public job APIs for this, and their terms prohibit scraping and bots.
- **Auto-filling or auto-submitting applications.** Every form is different, many have CAPTCHAs, and a wrong application sent under your name can't be taken back.
- **Reading job ads from images or PDFs (OCR).** It adds complexity and errors; these are shown as "New post found, open to view" instead.
- **Multi-user accounts and sharing.** v1 is a single-user tool.
- **Email or push notifications.** The dashboard is enough for v1.
- **Salary insights and company reviews.** There's no reliable data source.

## How it was built

Small commits, one feature at a time, following the milestones in [`docs/PRD.md`](docs/PRD.md) §11. The commit history is the build log.
