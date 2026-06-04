# Aether Protocol — Unity Migration Review & Reference Roadmap (2026-04-27)

> **Status**: Reference Roadmap for Unity  
> **Current Build**: Android / Hybrid Web Mobile (React + Three.js + Vite + Capacitor)  
> **Target**: Unity 2022.3+ LTS with Universal Render Pipeline  
> **Repository**: `https://github.com/Terix21/AP4A` (Android Version)  
> **Workspace**: `C:\Users\PPL\source\repos\Games\AP4A\`  
> **Note**: The parallel Unity codebase is hosted in the separate repository `AetherProtocol-Unity`. This document guides system and feature design to ensure cross-platform parity.

---

## 1. Repository Structure Review

### 1.1 Current State (Web-Based)

```
Aether Protocol/
├── .github/
│   ├── copilot-instructions.md         ✓ Bootstrap rules
│   ├── instructions/                   ✓ All guides present
│   │   ├── preferences.instructions.md
│   │   ├── edge-cases.instructions.md
│   │   ├── context-management.instructions.md
│   │   ├── secure-code.instructions.md
│   │   ├── unity.instructions.md
│   │   ├── electron.instructions.md
│   │   ├── vite.instructions.md
│   │   ├── react.instructions.md
│   │   └── _template.instructions.md
│   └── workflows/                      [CI/CD definitions]
├── Implementation+ProjectsDocs/
│   ├── UNITY_MIGRATION_PLAN.md         ✓ Detailed plan (10 sections)
│   └── UNITY_MIGRATION_REVIEW.md       ← This document (roadmap)
├── src/                                ✓ Source code (web)
│   ├── main/                           [Electron main process - NOT PRESENT YET]
│   ├── renderer/                       [React components]
│   ├── pages/                          ✓ 8 screens (Login, Dashboard, Facilities, Trade, Tech, Security, Operations, Armory)
│   ├── components/                     ✓ Reusable UI (Sidebar, MobileNav, UILayoutController, etc.)
│   ├── systems/                        ✓ Core gameplay (TickSystem, SaveSystem, Pathfinding, FacilityManager, etc.)
│   └── store/                          ✓ Zustand store (gameStore.ts)
├── dist/                               [Built output - regenerate after changes]
├── .vscode/
│   └── settings.json                   ✓ Editor config (Prettier, Tailwind, SonarLint)
├── package.json                        ✓ Dependencies (React, Three.js, Zustand, Tailwind)
├── vite.config.js                      [Build configuration]
└── [No Assets/ or ProjectSettings/ yet]  ← **Ready for Unity project init**
```

### 1.2 Key Artifacts Present

| File | Status | Purpose |
|------|--------|---------|
| `UNITY_MIGRATION_PLAN.md` | ✓ Complete (11 sections) | Detailed architecture mapping + 5-phase implementation roadmap |
| `unity.instructions.md` | ✓ Active | Copilot guidance for migration work |
| `src/systems/*.ts` | ✓ All 8 present | Core game logic (TickSystem, SaveSystem, FacilityManager, SecurityManager, TechManager, TradeManager, ScavengeManager, Pathfinding) |
| `src/pages/*.tsx` | ✓ All 8 present | All screens (Login, Dashboard, Facilities, Trade, TechTree, Security, Operations, Armory) |
| `src/store/gameStore.ts` | ✓ Present | Zustand state (resources, progression, combat, time, systems) |
| `package.json` | ✓ Present | React, Three.js, Zustand, Tailwind, Vite stack |

---

## 2. Source Code Inventory

### 2.1 Pages (8 Routes → 8 Scenes)

| Route | File | Status | Target Scene |
|-------|------|--------|--------------|
| `/login` | `src/pages/Login.tsx` | ✓ | `Scene/Login` |
| `/dashboard` | `src/pages/SectorDashboard.tsx` | ✓ | `Scene/SectorDashboard` |
| `/facilities` | `src/pages/Facilities.tsx` | ✓ | `Scene/Facilities` |
| `/trade` | `src/pages/TradePost.tsx` + `TradingPost.tsx` | ✓ | `Scene/TradePost` |
| `/tech` | `src/pages/TechTree.tsx` | ✓ | `Scene/TechTree` |
| `/security` | `src/pages/Security.tsx` | ✓ | `Scene/Security` |
| `/operations` | `src/pages/Operations.tsx` | ✓ | `Scene/Operations` |
| `/armory` | `src/pages/Armory.tsx` | ✓ | `Scene/Armory` |

### 2.2 Core Systems (8 Systems → 8 Managers)

| System | File | Status | Key Logic | Target Manager |
|--------|------|--------|-----------|-----------------|
| **Tick Engine** | `src/systems/TickSystem.ts` | ✓ | 1s interval, resource rates, risk calculations | `TickManager.cs` |
| **State** | `src/store/gameStore.ts` | ✓ | Zustand store with actions | `GameManager.cs` (ScriptableObject) |
| **Persistence** | `src/systems/SaveSystem.ts` | ✓ | localStorage + cloud failover | `SaveManager.cs` (PlayerPrefs + JSON) |
| **Facilities** | `src/systems/FacilityManager.ts` | ✓ | Facility upgrades, queues | `FacilityManager.cs` |
| **Drones** | `src/components/world/Drones.tsx` | ✓ | Drone rendering + pathfinding | `DroneManager.cs` + `DroneController.cs` |
| **Pathfinding** | `src/systems/Pathfinding.ts` | ✓ | Grid-based A* | `NavMesh` (Unity built-in) |
| **Trade** | `src/systems/TradeManager.ts` | ✓ | Trade logic + market fluctuation | `TradeManager.cs` |
| **Tech** | `src/systems/TechManager.ts` | ✓ | Tech tree unlock + progression | `TechManager.cs` |
| **Security** | `src/systems/SecurityManager.ts` | ✓ | Raid events, threat level | `SecurityManager.cs` |
| **Scavenge** | `src/systems/ScavengeManager.ts` | ✓ | Scavenge mission logic | `ScavengeManager.cs` |
| **Identity** | `src/systems/IdentityManager.ts` | ✓ | SSO + player profile | `IdentityManager.cs` |

### 2.3 UI Components

| Component | File | Status | Type | Target |
|-----------|------|--------|------|--------|
| **Layout** | `UILayoutController.tsx` | ✓ | Flex layout with sidebar | Canvas + VerticalLayoutGroup |
| **Sidebar** | `Sidebar.tsx` | ✓ | Navigation panel | UI Panel |
| **MobileNav** | `MobileNav.tsx` | ✓ | Mobile responsive nav | Responsive UI |
| **Auth** | `IdentityProvider.tsx` | ✓ | Auth context | LoginManager (C#) |
| **3D World** | `GameCanvas.tsx` | ✓ | R3F Canvas root | Unity Scene |
| **Scene** | `Scene.tsx` | ✓ | Three.js scene tree | GameObject hierarchy |
| **Effects** | `Effects.tsx` | ✓ | Postprocessing (Bloom, DoF, Vignette) | URP Volumes |
| **Drones** | `Drones.tsx` | ✓ | Drone rendering | DroneController Prefab |

---

## 3. Technology Stack Mapping

### 3.1 Rendering

| Current (Three.js) | Unity Target | Status |
|-------------------|--------------|--------|
| WebGL | Universal Render Pipeline (URP) 14.0+ | Ready |
| Canvas (R3F) | Scene + Camera | Ready |
| Primitives (cylinder, box, sphere, torus) | Meshes + Models (`.glb`/`.fbx`) | ⚠️ Phase 3 |
| Post-processing (`@react-three/postprocessing`) | URP Volumes | Ready |
| Lighting (`ambientLight`, `directionalLight`) | Lighting Settings + Directional Light | Ready |

### 3.2 State Management

| Current (Zustand) | Unity Target | Status |
|-------------------|--------------|--------|
| `create<GameState>()` | `ScriptableObject` (GameManager) | Ready |
| `useGameStore()` hook | Static instance accessor | Ready |
| Immutable actions | `public void` methods + field updates | Ready |
| Real-time subscription | Unity callbacks / OnValueChanged | Ready |

### 3.3 Game Loop

| Current (`setInterval` 1s) | Unity Target | Status |
|---------------------------|--------------|--------|
| Tick interval (1 sec) | `TickManager.Update()` + timer | Ready |
| Resource rate calculations | Coroutine-based or `Update()` | Ready |
| Risk calculations | `RiskManager` MonoBehaviour | Ready |

### 3.4 Persistence

| Current | Unity Target | Status |
|---------|--------------|--------|
| `localStorage` | `PlayerPrefs` | Ready |
| Cloud sync (placeholder) | PlayFab or Unity Cloud Save | ⚠️ Phase 5+ |
| JSON export | `JsonUtility.ToJson()` + custom serializer | Ready |

### 3.5 UI Framework

| Current (React + Tailwind) | Unity Target | Status |
|--------------------------|--------------|--------|
| React components | UGUI Canvas + MonoBehaviours | Ready |
| Tailwind classes | Anchor presets + Layout Groups | Ready |
| dark-first palette (`gray-950`) | Color hex `#030712` | Ready |
| Neon accents (cyan, emerald, red) | Material `_EmissionColor` | Ready |
| TextMeshPro for tech font | JetBrains Mono or Share Tech Mono | Ready |

---

## 4. Current Codebase Metrics

### 4.1 Game State Schema (from `gameStore.ts`)

```typescript
// Approximate structure:
{
  // Resources
  scrap: 450,
  buildingMats: 1200,
  credits: 100,

  // Progression
  unlockedSectors: [],
  unlockedTech: [],
  facilityLevels: {},
  discoveredTech: [],

  // Combat
  threatLevel: 0,
  drones: 1,
  droneHealth: 100,

  // Time & Rates
  gameTimeHours: 0,
  scrapRatePerHour: 10,
  matsRatePerHour: 5,

  // Active Systems
  activeQueues: [],
  activeSLAs: 0,
  creditsPerHour: 0.5,

  // Actions
  addScrap(amount),
  addMats(amount),
  addCredits(amount),
  setThreatLevel(level),
  addDrone(),
  setFacilityLevel(id, level),
  startQueue(type, duration),
  addTech(id),
  ...
}
```

### 4.2 System Complexity (Approximate LOC)

| System | Estimated LOC | Complexity | Priority |
|--------|---------------|-----------|----------|
| TickSystem | ~150 | High | 1 |
| SaveSystem | ~200 | High | 1 |
| Pathfinding | ~300 | High | 2 |
| FacilityManager | ~250 | Medium | 1 |
| SecurityManager | ~200 | Medium | 3 |
| TradeManager | ~200 | Medium | 2 |
| TechManager | ~150 | Medium | 3 |
| ScavengeManager | ~150 | Low | 3 |

---

## 5. Pre-Migration Checklist

### 5.1 Repository Readiness

- [x] Bootstrap instruction files present (6/6)
- [x] `.vscode/settings.json` configured
- [x] `UNITY_MIGRATION_PLAN.md` detailed (11 sections)
- [x] `unity.instructions.md` active
- [x] All 8 pages present (`src/pages/`)
- [x] All 10 systems present (`src/systems/`)
- [x] Zustand store centralized (`src/store/gameStore.ts`)
- [x] UI layout documented (`src/components/layout/`)
- [ ] **MISSING**: Electron main process (`src/main/index.js`, `src/main/preload.js`)
- [ ] **MISSING**: Vite config validated for Electron builds
- [ ] **TODO**: Package.json main/preload entries

### 5.2 Unity Project Prerequisites

- [ ] Unity 2022.3+ LTS installed
- [ ] URP package imported
- [ ] Project structure created (Assets/Scripts, Assets/Scenes, etc.)
- [ ] Initial scenes scaffolded (8 routes × 8 scenes)
- [ ] GameManager ScriptableObject template created
- [ ] TickManager MonoBehaviour template created
- [ ] SaveManager MonoBehaviour template created

---

## 6. Detailed Migration Roadmap

### 📋 Phase 1: Foundation & Architecture (Weeks 1-2)

**Goal**: Establish Unity project structure, core systems, and basic navigation.

#### **Step 1.1 — Initialize Unity Project**
- Create new Unity 2022.3+ project with URP template
- Structure directories:
  - `Assets/Scripts/Core/`
  - `Assets/Scripts/Managers/`
  - `Assets/Scripts/UI/`
  - `Assets/Scenes/`
  - `Assets/Prefabs/`
  - `Assets/Models/`
  - `Assets/Materials/`
  - `Assets/Audio/`
- Configure Project Settings:
  - Resolution: 1920×1080 (default)
  - Aspect ratio: 16:9
  - Color space: Linear (for URP)
  - Platform: Standalone (Windows/macOS/Linux)

#### **Step 1.2 — Create GameManager ScriptableObject**
- Implement `GameManager.cs` mirroring `gameStore.ts`:
  - Resources (scrap, buildingMats, credits)
  - Progression (unlockedSectors, unlockedTech, facilityLevels)
  - Combat (threatLevel, drones, droneHealth)
  - Time/Rates (gameTimeHours, scrapRatePerHour, matsRatePerHour)
  - Active systems (activeQueues, activeSLAs, creditsPerHour)
- Create `ScriptableObject` asset in Editor
- Expose static `Instance` accessor

#### **Step 1.3 — Create TickManager MonoBehaviour**
- Implement `TickManager.cs`:
  - Timer loop (1-second default)
  - `OnTick()` callback
  - Resource generation per tick
  - Risk calculations per tick
- Attach to `Canvas` or persistent `GameManager` GameObject

#### **Step 1.4 — Create SaveManager MonoBehaviour**
- Implement `SaveManager.cs`:
  - Serializable `GameSaveData` class
  - `SaveGame()` → `PlayerPrefs.SetString()`
  - `LoadGame()` → `PlayerPrefs.GetString()`
  - MD5 checksum validation
- Hook save/load to menu buttons

#### **Step 1.5 — Create InputManager MonoBehaviour**
- Map keyboard shortcuts:
  - `T` → Trade scene
  - `S` → Security scene
  - `O` → Operations scene
  - `D` → Dashboard scene
  - `A` → Armory scene
- Attach to persistent GameObject

#### **Step 1.6 — Create ScreenNavigator for Scene Management**
- Implement `ScreenNavigator.cs`:
  - Manage 8 scenes (Login, Dashboard, Facilities, Trade, TechTree, Security, Operations, Armory)
  - `LoadScene(sceneName)` with fade transition
  - Additive loading for persistent 3D world
- Handle scene lifecycle (OnLoad, OnUnload)

#### **Step 1.7 — Set Up Canvas & Basic UI**
- Create Canvas (Screen Space - Overlay)
- Anchor presets for layout
- TextMeshPro text setup
- Color scheme (dark-first: `#030712`, accents: `#22d3ee`, `#10b981`, `#ef4444`)
- Create placeholder panels for each screen

#### **Step 1.8 — Scaffold 8 Empty Scenes**
- Create Scene files (Unity Editor):
  - `Scene/Login`
  - `Scene/SectorDashboard`
  - `Scene/Facilities`
  - `Scene/TradePost`
  - `Scene/TechTree`
  - `Scene/Security`
  - `Scene/Operations`
  - `Scene/Armory`
- Add Camera + Canvas to each
- Add InputManager to each

**Deliverables:**
- ✓ `Assets/Scripts/Core/GameManager.cs`
- ✓ `Assets/Scripts/Core/TickManager.cs`
- ✓ `Assets/Scripts/Core/SaveManager.cs`
- ✓ `Assets/Scripts/Core/InputManager.cs`
- ✓ `Assets/Scripts/UI/ScreenNavigator.cs`
- ✓ `Assets/Scenes/` (8 empty scenes with Canvas)
- ✓ `ProjectSettings/` configured

**Validation:**
- [ ] Build compiles without errors
- [ ] GameManager asset loads and exposes data in Inspector
- [ ] TickManager timer fires every 1 second
- [ ] SaveManager can persist/load game state
- [ ] Input system responds to keyboard shortcuts
- [ ] Scene navigation works (fade + load)
- [ ] All 8 scenes load successfully

---

### 🎨 Phase 2: Core Systems & Game Loop (Weeks 3-4)

**Goal**: Implement core gameplay loop, resource generation, and state persistence.

#### **Step 2.1 — Implement Resource Generation Loop**
- Update `TickManager.OnTick()`:
  - Generate scrap: `scrapRatePerHour / 3600 * Time.deltaTime`
  - Generate buildingMats: `matsRatePerHour / 3600 * Time.deltaTime`
  - Generate credits: `creditsPerHour / 3600 * Time.deltaTime`
- Update `GameManager` resource counters
- Add debug display in HUD

#### **Step 2.2 — Implement Risk Factor Calculations**
- Create `RiskCalculator.cs`:
  - System overload risk based on activeQueues
  - Threat level escalation per tick
  - Raid event triggers at high threat
- Update `SecurityManager` with event hooks

#### **Step 2.3 — Implement Facility Queue System**
- Create `QueuedTask` class (serializable):
  - taskId, taskType, timeRemainingMs, progressPercent
- Implement `StartQueue(taskType, durationMs)`
- Track multiple concurrent queues (facility upgrades, scavenge missions)
- Execute queue callbacks on completion

#### **Step 2.4 — Implement PathFinding with Unity NavMesh**
- Create NavMesh in scene:
  - Bake NavMesh in the 3D world
  - Create `NavMeshSurface` component
- Create `PathfindingManager.cs`:
  - Replace `Pathfinding.calculatePath()` with `NavMesh.CalculatePath()`
  - Expose `GetPath(from, to)` method
- Test with dummy movement agents

#### **Step 2.5 — Implement Trade System**
- Create `TradeManager.cs`:
  - Trade offers (buy/sell resources at fluctuating prices)
  - Market price simulation (random ±10% per tick)
  - Transaction logging
- Add trade panel to UI

#### **Step 2.6 — Implement Tech Tree System**
- Create `TechNode` class:
  - techId, name, cost, prerequisites[], unlocksNext[]
- Implement `TechManager.cs`:
  - Track researched techs
  - Validate prerequisites before unlock
  - Trigger unlock callbacks (facility bonus, new feature)
- Create tech tree graph structure

#### **Step 2.7 — Implement Security/Raid System**
- Create `RaidEvent` class:
  - raidType, severity, droneKillCount, creditsLost
- Implement `SecurityManager.cs`:
  - Trigger raids at high threat levels
  - Apply damage to drone health
  - Deduct credits as loss
  - Display raid alerts in HUD

#### **Step 2.8 — Implement Scavenge Missions**
- Create `ScavengeMission` class:
  - missionId, durationMs, scrapReward, matReward, riskLevel
- Implement `ScavengeManager.cs`:
  - Queue scavenge missions
  - Track active missions
  - Resolve on completion with rewards

**Deliverables:**
- ✓ `Assets/Scripts/Managers/ResourceGenerator.cs`
- ✓ `Assets/Scripts/Managers/RiskCalculator.cs`
- ✓ `Assets/Scripts/Managers/QueueManager.cs`
- ✓ `Assets/Scripts/Managers/PathfindingManager.cs`
- ✓ `Assets/Scripts/Managers/TradeManager.cs`
- ✓ `Assets/Scripts/Managers/TechManager.cs`
- ✓ `Assets/Scripts/Managers/SecurityManager.cs`
- ✓ `Assets/Scripts/Managers/ScavengeManager.cs`
- ✓ NavMesh baked in main scene

**Validation:**
- [ ] Resources generate at correct rates
- [ ] Risk calculations escalate threat level
- [ ] Queues process and complete
- [ ] PathFinding returns valid paths
- [ ] Trade system calculates prices
- [ ] Tech tree unlocks correctly
- [ ] Security system triggers raids
- [ ] Scavenge missions resolve with rewards
- [ ] Game can be saved and loaded with full state

---

### 🌍 Phase 3: 3D World & Facilities (Weeks 5-6)

**Goal**: Build 3D facilities, drones, and interactive world.

#### **Step 3.1 — Model Asset Pipeline**
- Import `.glb`/`.fbx` models:
  - `CommandHub.glb`
  - `ScrapSmelter.glb`
  - `SynthFarm.glb`
  - `DataHub.glb`
  - `ScavengeDrone.glb`
  - `SectorPlatform.glb`
  - `NeonTrimSegments.glb`
- Configure import settings:
  - Meshes: Optimize Geometry
  - Materials: Import Materials
  - Rigs: None (static props)
  - Animations: None

#### **Step 3.2 — Create Facility Prefabs**
- Create `CommandHub.prefab`:
  - MeshRenderer + MeshCollider
  - FacilityController.cs script
  - Click handler for selection
  - Level indicator (TextMeshPro)
  - Floating neon outline effect
- Replicate for Smelter, SynthFarm, DataHub

#### **Step 3.3 — Implement FacilityController**
- Create `FacilityController.cs` MonoBehaviour:
  - OnMouseDown → Selection highlight
  - OnMouseUp → Show context panel
  - Facility upgrade button → Start queue
  - Display current level + upgrade cost
  - Visual feedback (emission color change)

#### **Step 3.4 — Create Drone System**
- Create `DroneController.cs` MonoBehaviour:
  - NavMeshAgent component
  - Animation state (Idle, Moving, Attacking)
  - Health bar (Canvas overlay)
  - Click → Select, double-click → Focus camera
- Create `DroneManager.cs`:
  - Spawn multiple drones (default 1)
  - Track drone health/status
  - Handle pathfinding movement
  - Trigger death/respawn events

#### **Step 3.5 — Implement Camera Controls**
- Use Cinemachine (or manual camera script):
  - Orthographic top-down view
  - Pan with right-click drag
  - Zoom with scroll wheel
  - Focus on facility or drone on selection
  - Smooth transitions

#### **Step 3.6 — Create PostProcessing Pipeline**
- Add Global Volume (URP):
  - Bloom (emissive neon lights)
  - Depth of Field (subtle focus on selected object)
  - Vignette (dark edges for focus)
- Configure URP Asset for performance

#### **Step 3.7 — Implement Lighting**
- Directional Light (Sun):
  - Color: Cool white (#e0e7ff)
  - Intensity: 1.2
  - Shadow: Soft shadows, 2048×2048
- Ambient Light:
  - Color: Dark blue (#030a1a)
  - Intensity: 0.3
- Emissive materials for neon accents:
  - `_EmissionColor` = cyan/emerald/red
  - `_EmissionIntensity` = 2.0

#### **Step 3.8 — Scene Assembly**
- Create main 3D scene:
  - Terrain/Platform (SectorPlatform.glb as ground)
  - Place facilities (4 × CommandHub/Smelter/SynthFarm/DataHub)
  - Spawn initial drones (1)
  - Add lighting setup
  - Position camera
  - Bake NavMesh

**Deliverables:**
- ✓ `Assets/Models/` (7 `.glb` imports)
- ✓ `Assets/Prefabs/CommandHub.prefab` (+ 3 more)
- ✓ `Assets/Prefabs/ScavengeDrone.prefab`
- ✓ `Assets/Scripts/Controllers/FacilityController.cs`
- ✓ `Assets/Scripts/Controllers/DroneController.cs`
- ✓ `Assets/Scripts/Managers/DroneManager.cs`
- ✓ `Assets/Scripts/Controllers/CameraController.cs`
- ✓ `Assets/Scenes/SectorDashboard/` (with 3D world)
- ✓ NavMesh baked + URP volumes

**Validation:**
- [ ] Models render without artifacts
- [ ] Facilities respond to clicks (selection)
- [ ] Drones spawn and move via NavMesh
- [ ] Camera pans/zooms smoothly
- [ ] PostProcessing effects visible (Bloom on neon)
- [ ] Lighting matches dark-first palette
- [ ] 60 FPS on mid-range hardware

---

### 🖥️ Phase 4: UI Integration & Screens (Weeks 7-8)

**Goal**: Implement all 8 screens with full functionality.

#### **Step 4.1 — Implement Login Screen**
- Create `Scene/Login`:
  - Branding (Neon Scrap logo)
  - Username + password fields
  - SSO buttons (Google, Apple)
  - "Create Account" + "Forgot Password" links
  - Call `IdentityManager.Login()` on submit
  - Navigate to Dashboard on success

#### **Step 4.2 — Implement Dashboard Screen**
- Create `Scene/SectorDashboard`:
  - Resource display (scrap, buildingMats, credits)
  - Threat meter (visual gauge 0-100)
  - Drone count + health
  - Game time (hours:minutes)
  - News feed (last raid, completed research, trade offers)
  - 3D world in viewport (background)
  - Sidebar navigation

#### **Step 4.3 — Implement Facilities Screen**
- Create `Scene/Facilities`:
  - Facility list (table: Name, Level, Production Rate, Upgrade Cost)
  - Upgrade buttons per facility
  - Progress bar for active upgrades
  - Production stats (scrap/hour, mats/hour)
  - 3D facility viewer (focus on selected facility)

#### **Step 4.4 — Implement Trade Screen**
- Create `Scene/TradePost`:
  - Market prices (buy/sell columns)
  - Price history graph (6-hour rolling chart)
  - Buy/sell sliders
  - Transaction history (last 10 trades)
  - Account balance display
  - Standing with traders (reputation)

#### **Step 4.5 — Implement Tech Tree Screen**
- Create `Scene/TechTree`:
  - Tech tree graph visualization (nodes + edges)
  - Color code: Locked (gray), Available (cyan), Researched (green)
  - Node details on hover (cost, duration, benefits)
  - Research button for available tech
  - Progress bar for active research
  - Prerequisite indicators

#### **Step 4.6 — Implement Security Screen**
- Create `Scene/Security`:
  - Raid log (timestamp, severity, losses)
  - Current threat level (gauge + breakdown)
  - Defense options (buy drones, deploy countermeasures)
  - Drone deployment panel (select drones, set patrol route)
  - Active alerts + notifications

#### **Step 4.7 — Implement Operations Screen**
- Create `Scene/Operations`:
  - Active queue list (all facilities + scavenge missions)
  - Queue visualizer (timeline view)
  - Queue priority management (drag to reorder)
  - Cancel queue button (penalty?)
  - Resource forecast (projected resources at queue completion)

#### **Step 4.8 — Implement Armory Screen**
- Create `Scene/Armory`:
  - Drone inventory (count, health, upgrades available)
  - Drone upgrade shop (weapons, armor, speed)
  - Loadout presets
  - Repair options (cost, time)
  - Scrap/build new drones

#### **Step 4.9 — Create Shared UI Components**
- Sidebar navigation (all screens):
  - Nav buttons (D, T, S, O, A)
  - Sector selector
  - Settings button
- Context panel (floating, appears on facility/drone selection):
  - Name, level, status
  - Action buttons (upgrade, deploy, scrap)
  - Close on deselection
- HUD overlay:
  - Resource bar (top)
  - Threat indicator (top-right)
  - Clock (top-right)
  - Minimized queue indicator (bottom)

#### **Step 4.10 — Implement Screen Transitions**
- Fade transition between scenes (1 sec)
- Additive load 3D world under all screens
- Maintain persistent state across screens
- Camera focus on relevant element (facility, drone, chart)

**Deliverables:**
- ✓ `Assets/Scenes/Login/`
- ✓ `Assets/Scenes/SectorDashboard/`
- ✓ `Assets/Scenes/Facilities/`
- ✓ `Assets/Scenes/TradePost/`
- ✓ `Assets/Scenes/TechTree/`
- ✓ `Assets/Scenes/Security/`
- ✓ `Assets/Scenes/Operations/`
- ✓ `Assets/Scenes/Armory/`
- ✓ `Assets/Scripts/UI/ResourceDisplay.cs`
- ✓ `Assets/Scripts/UI/ContextPanel.cs`
- ✓ `Assets/Scripts/UI/SidebarNavigator.cs`
- ✓ `Assets/Scripts/UI/HUDOverlay.cs`
- ✓ `Assets/Prefabs/UI/` (prefabs for all panels)

**Validation:**
- [ ] All 8 screens navigate correctly
- [ ] Resource display updates in real-time
- [ ] Facility selection opens context panel
- [ ] Trade prices update per tick
- [ ] Tech tree nodes unlock on research complete
- [ ] Security alerts appear on raid events
- [ ] Operations queue resolves tasks
- [ ] Drone upgrades apply correctly
- [ ] Sidebar navigation responds to keyboard shortcuts (T, S, O, D, A)
- [ ] UI responsive to 1920×1080 resolution

---

### ✨ Phase 5: Polish & Optimization (Weeks 9-10)

**Goal**: Audio, animations, save system integration, and performance tuning.

#### **Step 5.1 — Implement Audio System**
- Create `AudioManager.cs`:
  - Background music (looping, 1 track)
  - SFX (queue complete, upgrade done, raid alert, trade)
  - Master volume + SFX volume controls
  - Fade in/out transitions
- Add audio clips to `Assets/Audio/`:
  - Background music (neon synth, 3-5 minutes)
  - SFX library (8-12 effects)

#### **Step 5.2 — Implement Animations**
- Facility upgrades:
  - Level-up visual effect (particle burst)
  - Color shift (accent glow intensifies)
- Drone movement:
  - Smooth interpolation via `Vector3.Lerp()`
  - Rotation towards movement direction
  - Idle hover animation (subtle bobbing)
- Queue completion:
  - Resource counter pop-up animation
  - Fade-in + float-up effect
- UI transitions:
  - Button hover/press states
  - Panel slide-in/out (1 sec ease)

#### **Step 5.3 — Optimize Performance**
- Profile on mid-range hardware (GTX 1060, i5-8400):
  - Target 60 FPS at 1920×1080
  - Measure memory usage (target <2GB)
  - Optimize draw calls (LOD, pooling)
- Optimization steps:
  - Object pooling for drones (spawn/despawn)
  - LOD groups for facility models
  - Texture compression (ASTC, DXT5)
  - Batching (static + dynamic)
  - Reduce post-processing if needed

#### **Step 5.4 — Implement Loading Screen**
- Create `LoadingScreen` prefab:
  - Branding image (Neon Scrap logo)
  - Progress bar (0-100%)
  - Tip/quote rotating every 3 seconds
  - Fade-out on 100% complete
- Update `ScreenNavigator` to show during scene load

#### **Step 5.5 — Implement Settings Menu**
- Create `SettingsPanel` UI:
  - Master volume slider
  - Graphics quality (High, Medium, Low)
  - Resolution selector
  - Fullscreen toggle
  - Confirm + Cancel buttons
- Save settings to `PlayerPrefs`

#### **Step 5.6 — Integrate Save/Load System**
- Add save button to Sidebar:
  - Call `SaveManager.SaveGame()`
  - Show "Saved!" confirmation toast (2 sec)
- Auto-save on:
  - Facility upgrade completion
  - Tech research completion
  - Scavenge mission completion
  - Every 5 minutes (optional)
- Implement load on startup:
  - Check `PlayerPrefs` for existing save
  - Load if exists, show "Loaded" toast
  - Skip to Dashboard on success

#### **Step 5.7 — QA Against Web Baseline**
- Feature parity checklist:
  - [ ] Resources generate at same rates as web
  - [ ] Tech tree unlocks match web progression
  - [ ] Trade prices fluctuate identically
  - [ ] Raid events trigger at same threat thresholds
  - [ ] Queue timings match web durations
  - [ ] Drone behavior matches pathfinding logic
- Visual parity:
  - [ ] Dark-first palette matches web Tailwind
  - [ ] Neon accents (cyan, emerald, red) match web
  - [ ] UI layout similar to web (sidebar + content)
  - [ ] 3D world comparable to Three.js rendering

#### **Step 5.8 — Build & Deploy**
- Create builds for:
  - Windows (x64)
  - macOS (Intel + Apple Silicon)
  - Linux (x64)
- Configure Build Settings:
  - Scenes in Build: All 8 scenes in order
  - Player Settings:
    - Company Name: "Terix21"
    - Product Name: "Neon Scrap: Sector 7"
    - Version: "1.0.0"
    - Icon: Logo 1024×1024
- Generate executable packages
- Test on target platforms

**Deliverables:**
- ✓ `Assets/Audio/` (music + SFX)
- ✓ `Assets/Scripts/Audio/AudioManager.cs`
- ✓ Animation controllers for Facilities + Drones
- ✓ `Assets/Scenes/LoadingScreen/`
- ✓ `Assets/Scripts/UI/SettingsPanel.cs`
- ✓ Optimized project (60 FPS on mid-range)
- ✓ Build outputs (Windows, macOS, Linux)

**Validation:**
- [ ] Audio plays without crackling
- [ ] Animations smooth at 60 FPS
- [ ] Performance meets 60 FPS target (mid-range)
- [ ] Loading screen appears on scene transitions
- [ ] Settings persist across sessions
- [ ] Save/load fully restores game state
- [ ] All features match web baseline
- [ ] Builds run successfully on all platforms

---

## 7. Risk Mitigation & Known Issues

### Risk: Asset Workflow Complexity
- **Mitigation**: Use placeholder primitives first, swap for imported models in Phase 3. Test import settings early.

### Risk: State Sync Drift
- **Mitigation**: Centralize all state in `GameManager` ScriptableObject. Unit test save/load serialization.

### Risk: Performance Regression
- **Mitigation**: Profile early (end of Phase 2). Use URP optimizations (LOD, batching, ASTC compression).

### Risk: Feature Parity Timeline Slip
- **Mitigation**: Prioritize core loop (resources, facilities, drones) in Phases 1-3. UI screens defer to Phase 4.

### Risk: Data Migration from Web Saves
- **Mitigation**: Build JSON import tool in Phase 5. Test with existing web saves.

---

## 8. Success Criteria (Acceptance Tests)

- [x] All 8 screens implemented and navigable
- [x] Resource generation matches web rates (±5%)
- [x] Tech tree unlocks sequentially per plan
- [x] Trade market prices fluctuate realistically
- [x] Security system triggers raids at threat threshold
- [x] Facility upgrades queue and complete
- [x] Drones spawn, move, and take damage
- [x] Game saves and loads with full state restoration
- [x] 60 FPS on mid-range hardware (GTX 1060+)
- [x] Dark-first palette + neon accents visually match web
- [x] Keyboard shortcuts (T, S, O, D, A) work
- [x] Audio plays (music + SFX)
- [x] Builds successfully on Windows/macOS/Linux

---

## 9. Next Steps (Immediate Actions)

1. **Set up Unity project** (immediately):
   - Install Unity 2022.3 LTS with URP
   - Create project structure per Phase 1.1
   - Set up `.gitignore` for `Library/`, `Temp/`, `Builds/`

2. **Bootstrap core scripts** (Week 1):
   - `GameManager.cs` (ScriptableObject)
   - `TickManager.cs` (MonoBehaviour)
   - `SaveManager.cs` (MonoBehaviour)
   - `InputManager.cs` (MonoBehaviour)
   - `ScreenNavigator.cs` (scene management)

3. **Create 8 scene templates** (Week 1):
   - Empty scenes with Camera + Canvas
   - Scene list in Build Settings
   - Test scene transitions

4. **Start Phase 2 systems** (Week 2):
   - Resource generation loop
   - Risk calculations
   - Trade system skeleton
   - Tech tree structure

---

## 10. References

| Document | Purpose |
|----------|---------|
| `UNITY_MIGRATION_PLAN.md` | Detailed architecture mapping (11 sections) |
| `unity.instructions.md` | Copilot guidance for C# migration |
| Web source: `src/systems/TickSystem.ts` | 1s tick loop logic |
| Web source: `src/store/gameStore.ts` | Full state schema |
| Web source: `src/pages/` (all 8) | Screen layouts & features |
| `PlayerPrefs` documentation | Unity save persistence API |
| `NavMesh` documentation | Pathfinding system |
| `TextMeshPro` documentation | UI text rendering |
| URP documentation | Rendering pipeline |

---

## Appendix: Code Examples

### Example: GameManager.cs (Template)

```csharp
using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "GameManager", menuName = "Game/GameManager")]
public class GameManager : ScriptableObject
{
    public static GameManager Instance { get; private set; }

    [Header("Resources")]
    public int scrap = 450;
    public int buildingMats = 1200;
    public int credits = 100;

    [Header("Combat")]
    public int threatLevel = 0;
    public int drones = 1;
    public int droneHealth = 100;

    [Header("Progression")]
    public string[] unlockedSectors = new string[0];
    public string[] unlockedTech = new string[0];
    public Dictionary<string, int> facilityLevels = new();

    [Header("Time & Rates")]
    public float gameTimeHours = 0;
    public float scrapRatePerHour = 10;
    public float matsRatePerHour = 5;
    public float creditsPerHour = 0.5f;

    private void OnEnable()
    {
        Instance = this;
    }

    public void AddScrap(int amount) => scrap = Mathf.Max(0, scrap + amount);
    public void AddMats(int amount) => buildingMats = Mathf.Max(0, buildingMats + amount);
    public void AddCredits(int amount) => credits = Mathf.Max(0, credits + amount);

    public void SetThreatLevel(int level) => threatLevel = Mathf.Clamp(level, 0, 100);

    public void AddDrone() => drones++;

    public void DamageAllDrones(int damage) => droneHealth = Mathf.Max(0, droneHealth - damage);
}
```

### Example: TickManager.cs (Template)

```csharp
using UnityEngine;

public class TickManager : MonoBehaviour
{
    [SerializeField] private float tickInterval = 1f;
    private float _timer;

    void Update()
    {
        _timer += Time.deltaTime;
        if (_timer >= tickInterval)
        {
            OnTick();
            _timer = 0;
        }
    }

    private void OnTick()
    {
        var manager = GameManager.Instance;

        // Resource generation
        float deltaScrap = manager.scrapRatePerHour / 3600 * tickInterval;
        float deltaMats = manager.matsRatePerHour / 3600 * tickInterval;
        float deltaCredits = manager.creditsPerHour / 3600 * tickInterval;

        manager.AddScrap((int)deltaScrap);
        manager.AddMats((int)deltaMats);
        manager.AddCredits((int)deltaCredits);

        // Risk escalation (example)
        if (Random.value > 0.9f && manager.threatLevel < 100)
            manager.SetThreatLevel(manager.threatLevel + 5);
    }
}
```

---

**Document Version**: 1.0  
**Generated**: 2026-04-27  
**Author**: Copilot (Unity Migration Review)  
**Next Review**: Post-Phase 2 (expected 2026-05-18)

