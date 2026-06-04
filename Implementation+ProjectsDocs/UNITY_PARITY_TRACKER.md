# Aether Protocol — Unity & Android (Capacitor) Parity Tracker

This document tracks implementation, feature, and architectural parity between the dual-track platforms:
1. **Unity Version (C#)**: A native rebuild targeting desktop and consoles.
2. **Android Version (Capacitor)**: A hybrid webview application compiled from the React/Three.js web codebase.

---

## 1. Core Screens & Pages Parity

| Web Page/Screen | Unity Scene Equivalent | Android (Capacitor) Status | Unity (C#) Status | Parity Notes |
| :--- | :--- | :---: | :---: | :--- |
| **Login** (`/login`) | `Scene/Login` | [x] Completed | [ ] Pending | Username input, local profile loading, SSO mockup controls. |
| **SectorDashboard** (`/dashboard`) | `Scene/SectorDashboard` | [x] Completed | [ ] Pending | Resource HUD, threat indicator, news logs feed, and persistent 3D world render. |
| **Facilities** (`/facilities`) | `Scene/Facilities` | [x] Completed | [ ] Pending | Base structures upgrade panel, production rate indicators. |
| **TradePost** (`/trade`) | `Scene/TradePost` | [x] Completed | [ ] Pending | Dynamic commodity market pricing, buy/sell system, transaction history. |
| **TechTree** (`/tech`) | `Scene/TechTree` | [x] Completed | [ ] Pending | Multi-branch graph rendering, unlock prerequisites, research queue. |
| **Security** (`/security`) | `Scene/Security` | [x] Completed | [ ] Pending | Defense configurations, automated turret platform settings, raid logs. |
| **Operations** (`/operations`) | `Scene/Operations` | [x] Completed | [ ] Pending | Base queues, countdown timers, resource forecasts, priority adjustments. |
| **Armory** (`/armory`) | `Scene/Armory` | [x] Completed | [ ] Pending | Guardian loadouts, drone upgrades, repair bay management. |

---

## 2. Core Game Systems Parity

| System Name | Web/Capacitor Implementation | Unity (C#) Equivalent | Android Status | Unity Status | Parity Constraints |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **State Management** | Zustand store (`src/store/gameStore.ts`) | ScriptableObject `GameManager.cs` | [x] Completed | [ ] Pending | State values, resource rates, and active queues must match exactly. |
| **Game Loop (Tick)** | Interval timer (`src/systems/TickSystem.ts`) | `Update()` timer `TickManager.cs` | [x] Completed | [ ] Pending | Default tick rate: 1-second interval. Must recalculate resource rates. |
| **Save/Load System** | LocalStorage + Cloud stub (`SaveSystem.ts`) | PlayerPrefs + Binary `SaveManager.cs` | [x] Completed | [ ] Pending | JSON save structures and MD5 checksum algorithms must resolve to the same state. |
| **Pathfinding** | Grid A* algorithm (`Pathfinding.ts`) | Built-in Unity NavMesh Agent | [x] Completed | [ ] Pending | Drones must take the same pathways around structures without clipping. |
| **Facilities Mgr** | Logic store hooks (`FacilityManager.ts`) | MonoBehaviour `FacilityController.cs` | [x] Completed | [ ] Pending | Level limit (max 60), upgrade multiplier equations must be mathematically identical. |
| **Drone Operations** | Logic hooks (`ScavengeManager.ts`) | MonoBehaviour `DroneManager.cs` | [x] Completed | [ ] Pending | Drone spawn timers, health degradation, MTBF mechanics, and wreckage cleanup. |
| **Trade / Market** | Fluctuation logic (`TradeManager.ts`) | C# logic class `TradeManager.cs` | [x] Completed | [ ] Pending | Commodity listing, prices, hourly fluctuations (±10%), and SLA taxes. |
| **Research Tree** | Tech tree nodes (`TechManager.ts`) | ScriptableObject `TechManager.cs` | [x] Completed | [ ] Pending | Node costs, branch dependency validation, unlocked state updates. |
| **Security / Raids** | Raid loop trigger (`SecurityManager.ts`) | `SecurityManager.cs` state controller | [x] Completed | [ ] Pending | Threat escalation rate, raid wave parameters, health/damage scales. |
| **Authentication** | Mock SSO (`IdentityProvider.tsx`) | C# mock SSO adapter / PlayFab | [x] Completed | [ ] Pending | User profiles, account linking indicators (Google, Apple, Local). |

---

## 3. UI/UX & Platform Mechanics Parity

| Feature/UX Element | Android (Capacitor) Target | Unity (C#) Target | Parity Target Details |
| :--- | :--- | :--- | :--- |
| **Adaptive Layout** | Responsive Tailwind CSS sidebars / drawers | UGUI Canvas + Canvas Scaler | UI scales across aspect ratios (20:9, 16:9, 4:3). |
| **Screen Notch Support** | CSS safe-area variables (`env(safe-area-inset-top)`) | Unity Safe Area Helper script | HUD elements do not overlap with notches/camera punch-holes. |
| **Color Theme** | Sleek Dark Mode (Tailwind `gray-950` / `#030712`) | Hex value `#030712` | Dark background with neon Emerald, Cyan, and Red highlights. |
| **Input Methods** | Multi-touch raycasting, drag panning, pinch zoom | Touch/Mouse events, Cinemachine controls | Identical dragging/panning bounds and 3D object tap selectors. |
| **Haptic Feedback** | `@capacitor/haptics` integration | Android Native Haptics (via Unity API) | Vibration triggers on upgrades, research completion, and raid alerts. |
| **Status/Nav Bars** | `@capacitor/status-bar` overlay + dark style | Custom Android manifest fullscreen config | Unified dark theme status bar, overlay mode without blocking UI. |
| **Hardware Back Button** | `@capacitor/app` listener (route navigation) | `Input.GetKeyDown(KeyCode.Escape)` logic | Standard Android hardware back button pops screen stack. |

---

## 4. Visual Parity & Rendering

| Asset/Visual Group | Android (Capacitor) Stack | Unity (C#) Stack | Visual Parity Target |
| :--- | :--- | :--- | :--- |
| **3D Rendering Engine** | WebGL (Three.js / React Three Fiber) | Universal Render Pipeline (URP) | High-contrast neon glows, metallic reflections on scrap assets. |
| **Camera Settings** | `OrthographicCamera` (35.264° / 45° angle) | Orthographic Camera (35.264° / 45°) | Constant isometric constraints, disabled rotation. |
| **Post-Processing** | `@react-three/postprocessing` (Bloom, Vignette) | URP Volume Profile (Bloom, Vignette) | Intense emissive bloom matching colors of base threat levels. |
| **Environment HDRI** | Industrial Night HDRI map | Ambient lighting settings + skybox HDRI | Matching metallic reflections on building panels. |
| **3D Assets** | Shared modular `.glb` models | Shared modular `.glb` models | 100% mesh parity (Command Hub, Scrap Smelter, Synth-Farm, Drones). |

---

*Parity tracker initiated: 2026-06-04*  
*Parity Version: 1.0*  
