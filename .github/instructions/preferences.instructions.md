# Preferences Instructions

## Scope
Repository-level coding and review preferences.

## Conventions
- Prefer small, explicit functions with clear data flow.
- Maintain ES Modules style in new code.
- Ensure Capacitor native plugins have proper web fallbacks to maintain browser testing capability.
- Favor deterministic tests and include regression tests for bug fixes.
- Apply the JavaScript SonarQube profile "Sonar way-EXP" as the project coding-standard baseline, with the repository copy documented in `instructions/SonarQubeProfile.md`.
- Treat Sonar Blocker and Critical issues as merge blockers for new or modified code.
- Keep custom Sonar rule thresholds aligned with the imported profile: S101 naming format `^\$?[A-Z][a-zA-Z0-9]*$`, S107 max params `7`, S1479 max switch cases `30`, S2004 max nested control flow `4`, S3776 cognitive complexity threshold `15`.

## Common Patterns
- For behavior changes, include one direct test that fails before and passes after.
- For persistence changes, validate both new database bootstrap and reopen paths.
- For front-end changes, use Capacitor APIs instead of native browser APIs where device features are required.

## Pitfalls
- Avoid silent fallbacks that hide migration failures.
- Avoid broad catch blocks that swallow useful diagnostics.
- Do not suppress Sonar findings to bypass quality gates unless there is a documented false-positive rationale in code review.

## Append-Only Updates

