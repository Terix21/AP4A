
# Aether Protocol — Phased Development Plan

> **Note:** This document describes the original phased development plan for the React/Three.js hybrid mobile codebase (which is packaged via Capacitor for Android in this repository). The Unity (C#) version is developed as a separate, parallel project in its own repository. For details on how systems and features match between platforms, see [UNITY_PARITY_TRACKER.md](Implementation+ProjectsDocs/UNITY_PARITY_TRACKER.md).

This document outlines the phased development plan for rebuilding the project from its previous iteration ("Neon Scrap") into **Aether Protocol**, an Idle Management Simulation. 

## Overview
The rebuild focuses on implementing a robust 3D-first architecture, a three-layer split (World/State/UI), and transitioning to an isometric `@react-three/fiber` implementation, while establishing deep resource management, crew progression, and a day/night cycle for trading and defense.

---

## Phase 1: Foundation & Architecture
Establish the core technical infrastructure, user interface framework, and data persistence layers.
- **UI & UX Framework:** Build a "Centralized Architecture" UI optimized for future mobile thumb-access but expanded into a sidebar-style layout for wide-screen PC monitors.
- **Identity Management:** Integrate Single Sign-On (SSO) and Identity Providers (IdPs) like Google/Facebook to allow cross-platform progression.
- **Data Persistence:** Implement cloud-storage for save data with robust failover testing to maintain progress if local sync fails.
- **Compliance:** Establish a framework for data privacy and regulatory compliance.

## Phase 2: Core Loop Prototype
Implement the foundational gameplay loops, focusing on resource management, base expansion, and automated scavenging.
- **Resource Management:** Build out core processing systems (Synth-Farm, Scrap Smelter, Comms Relay) to manage production chains and mitigate System Overload.
- **Crew Management:** Implement logic for Base Crew roles (Logisticians, Fabricators, Commanders) and stat leveling.
- **Automated Scavenging:** Develop the drone deployment system based on Mean Time Before Failure (MTBF).
- **Base Expansion:** Integrate physical barrier removal logic (e.g., bollards, fencing) gated by "Due Diligence" assessments.

## Phase 3: Content Expansion (Windows Target)
Expand the game into a feature-complete state for the initial Windows (Steam/Web) release.
- **Day/Night Cycle:** Implement the transition between daytime trading and nighttime defense phases.
- **Threat Systems:** Program random Raider waves ("Physical Intrusions") and test automated defense logic (turrets, walls).
- **RPG & Trading:** Develop Guardian "Hero Gear" (Access Code/Signature weapons) and inter-faction trading mechanics via SLAs and BPAs.
- **Release Polish:** Finalize keyboard/mouse support and widescreen layouts for the Release Candidate.

## Phase 4: Dynamic Scene Initialization
Transition the game's visual presentation from a static dashboard to a fully interactive 3D environment.
- **Live Rendering:** Replace the static UI hex map anchor with a live `@react-three/fiber` Canvas.
- **Camera Calibration:** Set an `OrthographicCamera` at a precise 35.264° / 45° angle to maintain an isometric constraint. Enable mouse-drag panning while disabling arbitrary rotation.
- **Environment Mapping:** Apply high-contrast HDRIs (industrial night scenes) to give foundational structures a metallic sheen.

## Phase 5: Interaction & Input
Implement the control logic for selecting and commanding units within the 3D space.
- **Raycasting:** Implement a global `Raycaster` to detect clicks on 3D meshes (drones, buildings).
- **State Management:** Create a `selectedEntity` slice in the Zustand store to link 3D selection with the UI sidebar.
- **Command Pattern:** Implement a "Click-to-Action" or "Right-Click to Move" system to dispatch movement commands to entities.

## Phase 6: Navigation & Pathfinding
Enable intelligent movement of dynamic entities across the base.
- **NavMesh Generation:** Create a hidden navigation mesh that mirrors the playable hex floor's geometry.
- **Pathfinding Algorithm:** Integrate a pathfinding solution (e.g., `yuka` or custom A*) to calculate routes around buildings and scrap piles.
- **Smooth Interpolation:** Use `useFrame` to smoothly lerp the position and rotation of moving assets along their paths.

## Phase 7: Asset & Visual Fidelity Upgrade
Replace prototype visuals with final, high-quality production assets.
- **PBR Asset Integration:** Swap primitive shapes with modular `.glb` models for machinery, structures, and drones.
- **Animated Emissives:** Use custom shaders or `LayerMaterial` to create "breathing" neon lights that synchronize dynamically with the base's Threat Level.
- **Contact Shadows:** Add `ContactShadows` beneath moving assets to ground them and maintain a "miniature toy" aesthetic.

## Phase 8: Real-Time World-to-UI Linking
Finalize the connection between the 3D world space and the HTML/Tailwind UI layer.
- **Visual Feedback:** Trigger Tailwind-based notifications (e.g., floating "+100 Scrap" text) in screen-space coordinates when a 3D action occurs.
- **Dynamic Unlocks:** Link the "Research & Development" tech tree directly to the 3D world (e.g., unlocking "Advanced Drone AI" visually swaps the 3D drone models and unlocks new idle patrol behaviors).
