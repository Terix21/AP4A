# Gemini Instructions for Aether Protocol (Capacitor + Vite + React + Tailwind CSS + TypeScript)

## Bootstrap Requirements (Run First)
- Before handling a request, verify these files exist:
  - `.github/instructions/preferences.instructions.md`
  - `.github/instructions/edge-cases.instructions.md`
  - `.github/instructions/context-management.instructions.md`
  - `.github/instructions/secure-code.instructions.md`
  - `.github/instructions/_template.instructions.md`
  - `.vscode/settings.json`
- If any are missing:
  - Create missing `.github/instructions/*.md` files from the template structure.
  - Create `.vscode/settings.json` with project defaults when absent.
  - Complete creation in one pass, then continue the user task.

## Router and Context Rules
- On every request, detect framework/domain keywords and load matching instruction files.
- Apply all matching files, most specific first.
- If no framework-specific match exists, apply general coding defaults.
- For new frameworks/languages not in the registry, create `.github/instructions/<framework>.instructions.md` using `_template.instructions.md` and add it to the registry.
- Use full workspace context when diagnosing issues, including active files and recent terminal command context.

## Registry
- `preferences` -> `.github/instructions/preferences.instructions.md` (active)

## Append-Only Knowledge Updates
- Keep these instruction logs append-only.
- Route updates as follows:
  - Preferences -> `preferences.instructions.md`
  - Bugs/edge cases -> `edge-cases.instructions.md`
  - Framework patterns -> framework-specific instruction file
- Do not overwrite historical entries unless explicitly correcting invalid content.

## General Coding Defaults
- Write clear, maintainable code and avoid implicit state mutations.
- Follow language and ecosystem best practices for imports, error handling, and async patterns.
- Prefer strong typing and explicit interfaces when practical.
- Do not hardcode secrets; validate and sanitize inputs.
- Recommend unit/integration tests for behavior changes.

## Project Scope
- Game application "Aether Protocol" built with Capacitor, React Three Fiber (R3F) for a 3D isometric world, Zustand for state management, Tailwind CSS for HUD, TypeScript, and a Vite-based asset pipeline. It is an Idle Management Simulation focused on base building, crew roles, and resource management.
- Follows a phased development structure: Phase 1 (Foundation), Phase 2 (Core Loop/Resource Management/Crew), Phase 3 (Windows Launch/Threat Systems/Trading), and Phase 4-8 (Dynamic 3D Scene/Interaction/Navigation/Assets/Real-Time Linking).
- Runtime entry point is `src/main.tsx`.
- Source code lives in `src/`; `dist/` is generated output.

## Source of Truth
- Always edit source files under `src/` and supporting build/runtime config files (for example `vite.config.js` and scripts under `scripts/`).
- Never hand-edit `dist/` files except for temporary debugging.
- If a change is made in `src/`, mirror it by running the build/watch pipeline before validating runtime behavior.

## Build and Run Workflow
- Build once: `npm run build`.
- Watch/dev mode: `npm run dev`.
- Start app: `npm run start`.
- If UI changes are not visible, verify the corresponding file exists under `dist/renderer/`.

## Repository Conventions
- Module system: ES Modules (`import`, `export`).
- Keep Capacitor config at the root and React UI code in `src/`.
- Keep React entry in `src/main.tsx` and components in `src/components/`.
- Use Tailwind CSS for styling components.
- Prefer small, named functions for build/runtime setup.
- Keep semicolon usage and single-quote string style consistent with existing files. Use TypeScript for strict typing.

## Capacitor Rules
- Use Capacitor plugins for native device features (e.g., FileSystem, Preferences).
- Provide web fallbacks for native plugins to ensure the app can be developed and tested in the browser.
- Keep `capacitor.config.ts` synchronized with web build output directory.

## Vite Rules
- Keep bundling behavior centralized in `vite.config.ts`.
- Keep application entry at `src/main.tsx`.
- When adding static assets/docs to build output, use `vite-plugin-static-copy` targets.
- Validate both `npm run build` and `npm run dev` after configuration changes.

## Change Checklist for Gemini
- Did you edit `src/` instead of `dist/`?
- Did you run/update the relevant Vite build/dev command(s)?
- If native plugins changed, did you ensure they work via web fallbacks or device emulators?
- If styling changed, did you use Tailwind CSS utility classes instead of inline styles or Chakra props?
- If adding dependencies, are they in the correct section (`dependencies` vs `devDependencies`)?

## Known Risks to Watch
- Data persistence mismatches: SaveSystem must correctly handle states (At Rest, In Transit, In Use) and Failover Sync logic must seamlessly reconcile local corruption with Cloud-Storage.
- TickSystem performance: Must efficiently calculate Key Risk Factors (Resource Exhaustion, Thermal Shutdown, Memory Leaks) without causing frame drops.
- UI scaling: UILayoutController must cleanly adapt between Windows widescreen (sidebar, multi-panel) and future mobile (centered, collapsible).
- UUID/SSO edge cases: Ensure consistent cross-platform progress syncing via GlobalIdentityManager.

## Session Summaries
- For longer threads (3+ back-and-forth exchanges on one task), include a short 5-bullet progress summary when useful.
- Offer to append durable patterns or lessons learned to the instruction files above.
