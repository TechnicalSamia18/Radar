# Assumptions & unknowns

| ID | Assumption / unknown | Tag | How we'll confirm | Status |
|---|---|---|---|---|
| A-01 | Auth.js v5 (`next-auth@5.0.0-beta.32`, published 2026-07-20) is still a beta tag on npm; v4 is the "latest" tag. | [VERIFIED: `npm view next-auth`] | Decide v4 vs v5 at Milestone 9 with a Reuse Proposal | Open |
| A-02 | Sign-in provider for the owner-only login (GitHub OAuth is simplest; reviewers can't sign in, so they use demo mode). | [ASSUMED] | Ask user at Milestone 9 | Open |
| A-03 | PSEB Tech Hub terms may not allow automated import. | [UNKNOWN] (PRD §9) | User reads T&C / emails PSEB; fallback CSV + Google Places | Open |
| A-04 | Demo-mode sample data uses fictional companies (Nimbus Labs, Kestrel Systems…) and is labelled as sample data. | [ASSUMED] | Confirmed by user 2026-11-04 | Closed [USER] |
| A-05 | Share of PK software houses with careers pages / feeds / emails. | [UNKNOWN] (PRD §9) | Measure on first 50 companies; report in README | Open |
| A-06 | Vercel caps function request bodies at ~4.5 MB, so resumes are limited to 4 MB. | [ASSUMED] | Check Vercel docs before deploy (M10) | Open |
