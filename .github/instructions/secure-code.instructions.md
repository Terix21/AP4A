# Secure Code Instructions

## Scope
Security guidelines for the Neon Scrap: Sector 7 application, specifically around data persistence and Identity Management.

## Conventions
- Treat all remote Cloud-Storage payloads fetched by the `SaveSystem` as untrusted until validated and sanitized.
- Use explicit and secure cross-platform `UUID` generation for binding player progress in the `GlobalIdentityManager`.
- Rely on established SSO providers (Google/Apple) via official SDKs or Capacitor plugins. Local auth profiles must use secure local persistence.

## Common Patterns
- **SSO Tokens**: Never log or expose raw SSO access tokens in the console or standard application state beyond the authentication boundary.
- **State Integrity**: Validate the integrity of the "At Rest" (Local/Cloud Storage) data before transitioning it to the "In Use" active memory state to prevent corrupted save injection.

## Pitfalls
- Do not hardcode API keys or secrets for Firebase, Supabase, or AWS in the client-side code without appropriate usage restrictions (e.g., domain whitelisting).
- Avoid relying on `Math.random()` for generating the player `UUID`; use `crypto.randomUUID()` or a robust UUID library to ensure uniqueness and security.

## Append-Only Updates
- 2026-04-23: Established secure code guidelines for GlobalIdentityManager SSO flows and SaveSystem data validation.
