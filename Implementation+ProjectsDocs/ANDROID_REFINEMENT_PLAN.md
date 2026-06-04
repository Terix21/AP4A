# Android Refinement & Mobile Parity Plan (AP4A)

This document outlines the phased plan to transition the Aether Protocol Android (Capacitor) codebase from a web-based dashboard into a high-performance, native-feeling Android application.

---

## Phase 1: Core Stability & Persistence
*Goal: Ensure player progress is durable and follows native Android storage standards.*

- [ ] **State Unification**: Refactor `FacilityManager.ts` to move the `survivors` array into the global Zustand store (`gameStore.ts`). This ensures all personnel data is part of the central state tree.
- [ ] **Native Storage Migration**: Replace `localStorage` with `@capacitor/preferences` (Android SharedPreferences).
    - *Reasoning*: `localStorage` can be cleared by the Android OS during system clean-up; `Preferences` is persistent.
- [ ] **Hardened Save Loop**: 
    - Implement a "Dirty State" check to trigger saves on critical data changes.
    - Ensure `SaveSystem.ts` captures the unified `survivors` and `facilityLevels` state.

## Phase 2: Android Navigation & UX
*Goal: Align the UI/UX with Android user expectations and hardware interactions.*

- [ ] **Hardware Back Button**: Implement the `@capacitor/app` listener in `UILayoutController.tsx`.
    - *Behavior*: Close Menu -> Close Sidebar -> Navigate to Dashboard -> Exit App.
- [ ] **Edge-to-Edge Experience**:
    - Configure `StatusBar` for `overlaysWebView: true`.
    - Integrate `@capacitor/navigation-bar` to theme the bottom navigation pill/buttons.
    - Audit CSS `safe-area-inset` variables to ensure UI elements aren't cut off by camera notches.
- [ ] **Touch Interaction Overhaul**:
    - Replace `onContextMenu` (Right-Click) in `Scene.tsx` with a mobile-friendly gesture.
    - Implement "Double-Tap to Move" or a "Command Mode" toggle for waypoint placement.

## Phase 3: Performance & Battery Optimization
*Goal: Prevent thermal throttling and ensure smooth performance on mid-range Android hardware.*

- [ ] **DPR Management**: Cap the `Device Pixel Ratio` in `GameCanvas.tsx` to `[1, 2]`. High-DPR rendering on Android (3x-4x) causes significant battery drain.
- [ ] **Graphics Tiering**: 
    - Create a "Low Graphics" profile in the game settings.
    - Toggle `@react-three/postprocessing` (Bloom/Vignette) based on the selected profile.
- [ ] **Background Throttling**: Configure the `TickSystem` to pause or slow down calculations when the app state changes to "background" to minimize CPU usage.

## Phase 4: Native Engagement & Polish
*Goal: Increase player retention using native Android platform features.*

- [ ] **Local Notifications**: Integrate `@capacitor/local-notifications`.
    - Automatically schedule a notification when `activeQueues` items (Research/Scavenge) are set to complete.
- [ ] **Advanced Haptics**: 
    - Expand `HapticFeedback.ts` to include "Impact" (for UI clicks), "Success" (for completions), and "Notification" (for raid alerts) using native Android patterns.
- [ ] **Asset Modernization**: 
    - Swap 3D primitives (Cubes/Spheres) for modular `.glb` models.
    - Implement Draco compression for models to keep the Android APK size optimal.

---

## Implementation Status Tracking

| Phase | Description | Status | Target Date |
| :--- | :--- | :---: | :--- |
| **P1** | Core Stability & Persistence | [ ] | TBD |
| **P2** | Android Navigation & UX | [ ] | TBD |
| **P3** | Performance & Optimization | [ ] | TBD |
| **P4** | Native Engagement & Polish | [ ] | TBD |

*Last Updated: 2026-06-04*
