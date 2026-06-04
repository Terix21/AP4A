# Aether Protocol

## Overview
Aether Protocol is an Idle Management Simulation game originally built as a web-based Electron + React + Three.js application. The project is now undergoing a full migration to Unity (C#), targeting Unity 2022.3+ with the Universal Render Pipeline (URP).

## Current State
- **Electron/Web**: Legacy codebase in `src/` (Electron main/renderer, React, Zustand, Three.js)
- **Unity Migration**: In progress, following the [UNITY_MIGRATION_PLAN.md](Implementation+ProjectsDocs/UNITY_MIGRATION_PLAN.md)

## Migration Highlights
- Core gameplay loop, state, and data systems are being ported to Unity using ScriptableObjects and MonoBehaviours.
- Each major web route/screen is mapped to a Unity Scene.
- Asset pipeline is being rebuilt for Unity, with `.glb`/`.fbx` models and URP post-processing.
- Save/load, pathfinding, and input systems are being re-implemented using Unity best practices.

## How to Contribute
- For Electron/web: Edit files under `src/` and follow the Vite/Electron/React conventions in `.github/instructions/`.
- For Unity: Edit files under `Assets/` and follow the migration mapping in [UNITY_MIGRATION_PLAN.md](Implementation+ProjectsDocs/UNITY_MIGRATION_PLAN.md) and `.github/instructions/unity.instructions.md`.
- Always check the [copilot-instructions.md](.github/copilot-instructions.md) for up-to-date workflow and quality gates.

## Documentation
- [UNITY_MIGRATION_PLAN.md](Implementation+ProjectsDocs/UNITY_MIGRATION_PLAN.md): Full migration mapping, architecture, and phase plan
- [AetherProtocol_DevelopmentPlan.md](AetherProtocol_DevelopmentPlan.md): Original phased development plan
- [AetherProtocol.md](AetherProtocol.md): Game concept, world, and systems

## Status
- **Electron/Web**: Maintenance only
- **Unity**: Active development (see migration plan for phase status)

---

*For details on migration rationale, architecture, and Unity equivalents, see [UNITY_MIGRATION_PLAN.md](Implementation+ProjectsDocs/UNITY_MIGRATION_PLAN.md).*