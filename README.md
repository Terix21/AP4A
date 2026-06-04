# Aether Protocol — Android Version (AP4A)

## Overview
Aether Protocol is an Idle Management Simulation game. This repository contains the **Android version** of the game, built using a hybrid mobile stack with React, Vite, Tailwind CSS, and React Three Fiber (Three.js), compiled and run on mobile via **Capacitor**. 

The **Unity (C#) version** of Aether Protocol is a separate, parallel desktop/console project managed in its own repository (e.g., `AetherProtocol-Unity`). 

Both projects are developed in parallel, aiming for feature and visual parity.

## Current State
- **Android/Capacitor (This Repo)**: Active development and maintenance of the mobile/hybrid codebase.
- **Unity (Separate Repo)**: Re-building the core engine, visual asset pipeline, and gameplay loop natively in C# for desktop/consoles. See the [Unity & Android Parity Tracker](Implementation+ProjectsDocs/UNITY_PARITY_TRACKER.md) for cross-platform alignment.

## Android Tech Stack (This Repo)
- **Framework**: React (with TypeScript & Vite)
- **State Management**: Zustand
- **3D Viewport**: React Three Fiber / Three.js
- **Styling**: Tailwind CSS
- **Mobile Integration**: Capacitor (native Android bridging, haptics, status bar control, etc.)

## How to Contribute
- **For Android/Mobile**: Edit files under `src/` and assets under `public/`. Build and sync the Android project using Capacitor:
  ```bash
  npm run build
  npx cap sync
  npx cap open android
  ```
- **For Unity**: Contributions to the C# codebase must be made in the parallel Unity repository.
- Always check the [copilot-instructions.md](.github/copilot-instructions.md) for up-to-date workspace guidelines.

## Documentation
The `Implementation+ProjectsDocs/` directory serves to align architecture and track parity between the parallel Android and Unity versions:
- [UNITY_PARITY_TRACKER.md](Implementation+ProjectsDocs/UNITY_PARITY_TRACKER.md): Feature, UI, and visual parity status between Android and Unity
- [UNITY_MIGRATION_PLAN.md](Implementation+ProjectsDocs/UNITY_MIGRATION_PLAN.md): Architecture references and web-to-Unity mappings
- [AetherProtocol_DevelopmentPlan.md](AetherProtocol_DevelopmentPlan.md): Original phased development plan for the web/hybrid client
- [AetherProtocol.md](AetherProtocol.md): Shared game concept, lore, world, and core systems

## Status
- **Android (Capacitor)**: Active development (this repository)
- **Unity (C#)**: Active development (separate repository)

---

*For details on how the Android features map to their C# Unity equivalents, see the [UNITY_PARITY_TRACKER.md](Implementation+ProjectsDocs/UNITY_PARITY_TRACKER.md).*