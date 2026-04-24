# Context Management Instructions

## Scope
Workspace context loading and review discipline for the Capacitor + Vite + React + Tailwind stack.

## Conventions
- Load the top-level `gemini.instructions.md` first, then matching framework files.
- For runtime or styling issues, inspect both the source components and the `tailwind.config.js` / `vite.config.ts` build pipeline files.
- Prefer targeted, line-anchored findings over broad summaries.

## Common Patterns
- **UI & Layout Issues**: For visual bugs or layout tasks, always read `src/components/layout/UILayoutController.tsx` and the corresponding Tailwind classes before proposing structural DOM changes.
- **Data Persistence Issues**: For save/load bugs, read `src/systems/SaveSystem.ts` and the Cloud Storage API interactions before proposing changes to the `In Use` React state.
- **Identity & SSO**: For login flows, check `src/systems/IdentityManager.ts`.

## Pitfalls
- Do not review only `dist` output; source under `src/` is authoritative.
- Do not confuse the in-game mechanics "Injection Attacks" and "DDoS" raider waves with real-world application security context.

## Append-Only Updates
- 2026-04-23: Initialized context management rules for the Neon Scrap: Sector 7 architecture.
