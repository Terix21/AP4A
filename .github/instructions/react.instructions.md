## Scope
React-specific conventions and patterns for the Aether Protocol project.

## Conventions
- Use functional components and hooks.
- Wrap renderer root with `ChakraProvider`.
- Prefer Chakra UI primitives for layout and controls.

## Common Patterns
- Use small, named components for UI logic.
- Use master-detail and virtualization for large data surfaces.

## Pitfalls
- Avoid unbounded top-level `useState` arrays for feeds.
- Do not use Node.js APIs in renderer code.

## Append-Only Updates
- 2026-04-24: File created from template for React registry compliance.