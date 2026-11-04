# Dependencies — Radar

Rule (blueprint A11): newest patch on a supported line, at least 3 days old, no Critical/High advisory, exact pin, lockfile committed.
Scan command: `npm audit` (also `npx osv-scanner scan source -r .` before launch).

| Component | Kind | Version | Why | License | Released | Last scan | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Node.js | runtime | ≥22 (dev: 22.23.4) | Runtime | MIT | — | — | — |
| next | prod | 16.4.3 | Framework (16.4.4/16.4.5 were <3 days old) | MIT | 2026-10-23 | 2026-11-04 · npm audit | clean |
| react / react-dom | prod | 19.3.1 | UI | MIT | 2026-10-14 | 2026-11-04 · npm audit | clean |
| drizzle-orm | prod | 0.45.4 | Type-safe, parameterized SQL | Apache-2.0 | 2026-10-08 | 2026-11-04 · npm audit | clean |
| @libsql/client | prod | 0.18.0 | SQLite file locally, Turso in prod | MIT | 2026-09-02 | 2026-11-04 · npm audit | clean |
| zod | prod | 4.6.7 | Input / AI-output validation | MIT | 2026-10-12 | 2026-11-04 · npm audit | clean |
| tailwindcss + @tailwindcss/turbopack | dev | 4.3.3 | Styling (4.3.4 was <3 days old) | MIT | 2026-07-16 | 2026-11-04 · npm audit | clean |
| typescript | dev | 5.9.3 | Types (create-next-app default; 7.x not yet used by Next) | Apache-2.0 | 2025-09-30 | 2026-11-04 · npm audit | clean |
| drizzle-kit | dev | 0.31.11 | Schema push / migrations | MIT | 2026-09-21 | 2026-11-04 · npm audit | 1 moderate (below) |
| eslint + eslint-config-next | dev | 9.39.5 / 16.4.3 | Lint | MIT | — | 2026-11-04 · npm audit | 1 moderate (below) |
| vitest | dev | 5.0.5 | Unit tests (5.1.0 was <3 days old) | MIT | 2026-10-15 | 2026-11-04 · npm audit | clean |

## Open vulnerabilities (from `npm audit`, 2026-11-04)
| Advisory | Component | Severity | Reachable? | Action |
| :--- | :--- | :--- | :--- | :--- |
| [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) | esbuild ≤0.24.2 via drizzle-kit → @esbuild-kit | Moderate | No — only affects esbuild's own dev server, which drizzle-kit never starts; dev-only tool | Accept; re-check when drizzle-kit 1.0 is stable |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) | minimatch <11.0.1 via eslint 9 plugins | Moderate | No — ReDoS-style slowdown on hostile glob patterns; lint runs only on our own files; dev-only | Accept; re-check on eslint-config-next upgrade |

## Notes
- npm 10.9 hits an arborist bug (`Cannot read properties of null (reading 'edgesOut')`) when *resolving* vitest's optional peers without a lockfile. The lockfile was generated with npm 11; `npm ci` on npm 10 installs fine [VERIFIED 2026-11-04].
