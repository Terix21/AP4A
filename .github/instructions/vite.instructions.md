## Scope
Vite-specific conventions and patterns for the Aether Protocol project.

## Conventions
- Centralize all bundling config in `vite.config.js`.
- Keep renderer entry at `src/renderer/js/main.jsx`.
- Use `vite-plugin-static-copy` for static assets/docs.

## Common Patterns
- Validate both `npm run build` and `npm run dev` after config changes.

## Pitfalls
- Do not edit `dist/` output directly.
- Avoid duplicating config between `vite.config.js` and `vite.config.ts`.

## Append-Only Updates
- 2026-04-24: File created from template for Vite registry compliance.