# Unity Migration Instructions

## Scope
Guidelines and conventions for the migration of Aether Protocol from Electron/React/Three.js to Unity (C#).

## Conventions
- Mirror core gameplay loop, state, and data systems in Unity using C#.
- Use ScriptableObjects for global state (GameManager, etc.).
- Implement TickManager, SaveManager, and Pathfinding using Unity MonoBehaviours and built-in systems (NavMesh, PlayerPrefs, etc.).
- Map each major web route/screen to a Unity Scene.
- Use URP, TextMeshPro, and modern Unity packages for rendering and UI.
- Maintain dark-first palette and neon accent styling.

## Common Patterns
- Use Update/FixedUpdate for game loop ticks.
- Use PlayerPrefs and JSON serialization for save/load.
- Use NavMeshAgent for drone/facility movement.
- Use Canvas and UGUI for HUD and overlays.
- Use additive scene loading for persistent 3D world.

## Pitfalls
- Do not hardcode data migration logic; provide import/export for web save data.
- Avoid direct 1:1 porting of React/Tailwind UI—adapt to Unity UI idioms.
- Do not bypass Unity's asset pipeline for models/textures.
- Avoid performance regressions by testing on mid-range hardware.

## Append-Only Updates
- 2026-04-27: Initial Unity migration instructions created from UNITY_MIGRATION_PLAN.md.