# Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-01 | Sites change layout and break detection | High | Medium | Change detection on cleaned text, not layout; manual careers-link override (REQ-013) | Dev |
| R-02 | AI extraction invents data | Medium | High | Zod-validated output, "Not stated" defaults, always link to original (REQ-023) | Dev |
| R-03 | Fetcher used for SSRF (e.g. a company URL pointing at 127.0.0.1) | Low | High | Only http(s); resolve DNS and block private/loopback ranges; no redirects to private IPs | Dev |
| R-04 | Malicious job post plants a spreadsheet formula | Low | Medium | Neutralise `= + - @` cells on export (REQ-052) | Dev |
| R-05 | Auth.js v5 is beta | — | — | Closed: login cut from v1 (ADR-003) | Dev |
| R-06 | Scope creep | High | Medium | Anything outside the PRD goes to `docs/BACKLOG.md` | User |
| R-07 | Profile Server Actions have no login | — | High if deployed with write access | Deployed build is read-only demo (ADR-003): writes disabled when DEMO_MODE is set; test this before deploy | Dev |
| R-08 | Google Places bill if a loop runs away | Low | Medium | Hard cap on calls per discovery run; set a quota in Google Cloud; key optional | Dev |
