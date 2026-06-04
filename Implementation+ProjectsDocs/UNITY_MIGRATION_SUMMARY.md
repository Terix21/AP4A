# Aether Protocol — Unity Migration Summary & Parity Reference

## 📊 Repository Status: Android Version (AP4A) / Unity Parallel Reference

### ✅ Bootstrap Complete
All required infrastructure files exist and are configured:
- 6/6 `.github/instructions/*.md` files present
- `.vscode/settings.json` configured
- `UNITY_MIGRATION_PLAN.md` detailed (11 sections, 500+ LOC)
- `unity.instructions.md` active and ready

### 📦 Source Code Inventory
| Component | Count | Status |
|-----------|-------|--------|
| Pages/Screens | 8 | ✅ All present (Login, Dashboard, Facilities, Trade, TechTree, Security, Operations, Armory) |
| Core Systems | 10 | ✅ All present (Tick, Save, Pathfinding, Facilities, Drones, Trade, Tech, Security, Scavenge, Identity) |
| UI Components | 8+ | ✅ Layout, Sidebar, MobileNav, Effects, Scene, Drones, GameCanvas, IdentityProvider |
| Zustand Store | 1 | ✅ Centralized gameStore.ts |
| **NO Assets/ or ProjectSettings/ in this repo** | — | 🎯 Managed in separate parallel repository |

### 🏗️ Current Architecture
```
Web (Current State)             →    Unity (Target State)
─────────────────────────────────────────────────────────
React Pages (8)                →    Unity Scenes (8)
Zustand store (gameStore.ts)   →    GameManager ScriptableObject
Three.js + R3F Canvas          →    Scene + Camera + GameObjects
@react-three/postprocessing    →    URP Volumes (Bloom, DoF, Vignette)
setInterval 1s tick            →    TickManager Update() loop
localStorage + cloud (stub)    →    PlayerPrefs + SaveManager
Grid-based A* pathfinding      →    Unity NavMesh
Tailwind styling               →    UGUI Canvas + Layout Groups
```

---

## 🎯 5-Phase Implementation Roadmap

### **Phase 1: Foundation & Architecture** (Weeks 1-2)
**Goal**: Establish Unity project structure, core systems, basic navigation

**Key Deliverables:**
- ✓ Unity 2022.3+ project with URP
- ✓ GameManager (ScriptableObject) mirroring gameStore.ts
- ✓ TickManager, SaveManager, InputManager core systems
- ✓ ScreenNavigator for scene management (8 scenes)
- ✓ Basic Canvas + TextMeshPro UI setup
- ✓ 8 empty scenes scaffolded + linked in Build Settings

**Validation Checkpoints:**
- [ ] Build compiles, no errors
- [ ] GameManager loads in Inspector
- [ ] TickManager fires 1s callbacks
- [ ] Scene navigation works (fade transitions)
- [ ] Keyboard shortcuts respond (T, S, O, D, A)

---

### **Phase 2: Core Systems & Game Loop** (Weeks 3-4)
**Goal**: Implement resource generation, risk calculations, queue system, trade, tech tree, security, scavenge

**Key Deliverables:**
- ✓ Resource generation loop (scrap, mats, credits per tick)
- ✓ Risk factor calculations + threat level escalation
- ✓ Queue system (facility upgrades, scavenge missions)
- ✓ PathFinding via Unity NavMesh
- ✓ Trade system (market prices, fluctuation)
- ✓ Tech tree system (nodes, prerequisites, unlocks)
- ✓ Security/raid system (threat → raid events)
- ✓ Scavenge mission system (timed tasks with rewards)

**Validation Checkpoints:**
- [ ] Resources generate at correct rates (±5% of web)
- [ ] Risk escalates threat level over time
- [ ] Queues process and complete correctly
- [ ] NavMesh pathfinding returns valid paths
- [ ] Trade prices fluctuate per tick
- [ ] Tech tree unlocks prerequisite chains
- [ ] Raids trigger at high threat threshold
- [ ] Save/load persists full game state

---

### **Phase 3: 3D World & Facilities** (Weeks 5-6)
**Goal**: Build interactive 3D world with facilities, drones, camera, lighting, postprocessing

**Key Deliverables:**
- ✓ Import 3D models (7 `.glb` assets: 4 facilities, 1 drone, 2 environment)
- ✓ Facility prefabs with click handlers (CommandHub, ScrapSmelter, SynthFarm, DataHub)
- ✓ FacilityController + selection/upgrade logic
- ✓ DroneController + DroneManager (spawn, pathfind, health)
- ✓ Camera controls (pan, zoom, focus, orthographic)
- ✓ URP postprocessing (Bloom, DoF, Vignette volumes)
- ✓ Lighting setup (directional + ambient, neon emissive materials)
- ✓ NavMesh baked in main world scene

**Validation Checkpoints:**
- [ ] Models render without artifacts
- [ ] Facility selection highlights + context panel
- [ ] Drones spawn and navigate via NavMesh
- [ ] Camera pans/zooms smoothly
- [ ] PostProcessing visible (neon glow on emissive)
- [ ] Lighting matches dark-first palette (#030712)
- [ ] 60 FPS on mid-range hardware (GTX 1060+)

---

### **Phase 4: UI Integration & Screens** (Weeks 7-8)
**Goal**: Build all 8 screens with full functionality, shared components, transitions

**Key Deliverables:**
- ✓ Login screen (username, SSO buttons, identity flow)
- ✓ SectorDashboard (resources, threat, drone count, news feed, 3D world background)
- ✓ Facilities screen (facility table, upgrade buttons, production stats)
- ✓ TradePost screen (market prices, buy/sell, history graph)
- ✓ TechTree screen (graph visualization, color-coded nodes, research buttons)
- ✓ Security screen (raid log, threat breakdown, drone deployment)
- ✓ Operations screen (queue timeline, priority management, forecast)
- ✓ Armory screen (drone inventory, upgrades, loadouts, repairs)
- ✓ Shared components (Sidebar, context panel, HUD overlay, transitions)

**Validation Checkpoints:**
- [ ] All 8 screens navigate correctly via keyboard + sidebar
- [ ] Resource display updates real-time per tick
- [ ] Facility selection shows context panel
- [ ] Trade prices update per tick (±10%)
- [ ] Tech tree nodes unlock on research complete
- [ ] Security alerts trigger on raids
- [ ] Operations queue resolves tasks + forecasts
- [ ] Drone upgrades apply correctly
- [ ] UI responsive at 1920×1080

---

### **Phase 5: Polish & Optimization** (Weeks 9-10)
**Goal**: Audio, animations, performance tuning, save integration, multi-platform builds

**Key Deliverables:**
- ✓ Audio system (music + SFX, volume controls)
- ✓ Animations (level-ups, drone movement, UI transitions)
- ✓ Performance optimization (target 60 FPS mid-range)
- ✓ Loading screen with progress bar
- ✓ Settings menu (graphics, audio, resolution)
- ✓ Auto-save + load on startup
- ✓ Feature parity QA vs. web baseline
- ✓ Multi-platform builds (Windows, macOS, Linux)

**Validation Checkpoints:**
- [ ] Audio plays without crackling
- [ ] Animations smooth at 60 FPS
- [ ] Performance: 60 FPS on mid-range (GTX 1060, i5-8400)
- [ ] Loading screen appears on scene transitions
- [ ] Settings persist across sessions
- [ ] Save/load fully restores game state
- [ ] All features match web baseline
- [ ] Builds run successfully on all platforms

---

## 🚀 Immediate Next Steps (This Week)

### 1. **Install Unity 2022.3+ LTS**
   ```
   Download: https://unity.com/download
   Version: 2022.3.x (Latest LTS)
   Template: Universal 3D (includes URP)
   ```

### 2. **Create New Project**
   - Name: `AetherProtocol-Unity`
   - Location: Parallel to existing repo or same directory (ask for preference)
   - 3D Template: Yes (installs URP by default)

### 3. **Bootstrap Directory Structure**
   ```
   Assets/
   ├── Scripts/
   │   ├── Core/          (GameManager, TickManager, SaveManager, InputManager)
   │   ├── Managers/      (Resource, Risk, Queue, Pathfinding, Trade, Tech, Security, Scavenge)
   │   ├── Controllers/   (Facility, Drone, Camera)
   │   ├── UI/            (ScreenNavigator, ResourceDisplay, ContextPanel, etc.)
   │   └── Systems/       (Shared helpers, extensions)
   ├── Scenes/            (8 empty scenes: Login, Dashboard, Facilities, Trade, TechTree, Security, Operations, Armory)
   ├── Prefabs/           (Facility, Drone, UI panels)
   ├── Models/            (Facility, Drone, Environment `.glb` imports)
   ├── Materials/         (Neon emissive, UI)
   ├── Textures/
   └── Audio/             (Music + SFX)
   ```

### 4. **Create Initial Scripts (Week 1)**
   - `GameManager.cs` (ScriptableObject, mirrors gameStore.ts)
   - `TickManager.cs` (1s tick loop, resource generation placeholder)
   - `SaveManager.cs` (PlayerPrefs + JSON serialization)
   - `InputManager.cs` (Keyboard shortcuts: T, S, O, D, A)
   - `ScreenNavigator.cs` (Scene loading + fade transitions)

### 5. **Set Up Canvas + Scenes**
   - Create 8 scenes with empty Camera + Canvas
   - Add each scene to Build Settings in order
   - Test scene transitions via keyboard shortcuts

### 6. **Configure Project Settings**
   - Resolution: 1920×1080 (default)
   - Platform: Standalone (Windows/Mac/Linux)
   - Color Space: Linear (for URP)
   - Graphics: URP Asset (High Quality)

---

## 📋 Pre-Phase 1 Checklist

- [ ] Unity 2022.3+ LTS installed
- [ ] New Unity project created (`AetherProtocol-Unity`)
- [ ] Directory structure scaffolded per above
- [ ] 8 empty scenes created + added to Build Settings
- [ ] GameManager ScriptableObject template created
- [ ] TickManager MonoBehaviour template created
- [ ] SaveManager MonoBehaviour template created
- [ ] InputManager MonoBehaviour template created
- [ ] ScreenNavigator MonoBehaviour template created
- [ ] Canvas created with TextMeshPro + dark theme colors
- [ ] First build compiles successfully
- [ ] Scene transitions work (keyboard + navigator)

---

## 🔗 Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| **UNITY_MIGRATION_PLAN.md** | `Implementation+ProjectsDocs/` | Detailed architecture mapping (11 sections, 500+ LOC) |
| **UNITY_MIGRATION_REVIEW.md** | `Implementation+ProjectsDocs/` | This review: 5-phase roadmap, risk mitigation, success criteria |
| **unity.instructions.md** | `.github/instructions/` | Copilot guidance for C# migration work |
| Web: `src/store/gameStore.ts` | `src/store/` | Full game state schema |
| Web: `src/systems/TickSystem.ts` | `src/systems/` | 1s tick loop + resource generation logic |
| Web: `src/pages/` | `src/pages/` | All 8 screen layouts + features |

---

## 📌 Key Insights & Decisions

### 1. **State Management Centralization**
   - Current: Zustand `gameStore.ts` with hooks
   - Target: Single `GameManager` ScriptableObject (static instance)
   - Benefit: Simpler C# data binding, no event system needed initially

### 2. **Game Loop Architecture**
   - Current: `setInterval(1000ms)` in TickSystem
   - Target: Unity `Update()` + timer (same 1s interval)
   - Benefit: Tighter integration with physics, animations

### 3. **Pathfinding Simplification**
   - Current: Manual grid-based A* algorithm
   - Target: Unity's built-in NavMesh system
   - Benefit: Massive performance gain, automatic obstacle avoidance

### 4. **UI Framework Shift**
   - Current: React + Tailwind (component-driven)
   - Target: UGUI Canvas + MonoBehaviours (inspector-driven)
   - Benefit: Native IDE support, serialization, performance

### 5. **Asset Workflow**
   - Phase 1-2: Placeholder primitives (cube/cylinder/sphere meshes)
   - Phase 3: Swap for imported `.glb` models
   - Benefit: Non-blocking development, iterative improvement

---

## ⚠️ Known Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Model import complexity** | 🟡 Medium | Use primitives first, import models in Phase 3 |
| **State sync drift (web ↔ Unity)** | 🔴 High | Centralize in GameManager, unit test serialization |
| **Performance regression** | 🟡 Medium | Profile end of Phase 2, target 60 FPS early |
| **Feature parity timeline slip** | 🟡 Medium | Prioritize core loop (Phases 1-3), UI defers to Phase 4 |
| **Data migration from web saves** | 🟢 Low | Build JSON import tool in Phase 5, test with existing saves |

---

## 📈 Success Criteria (Final Validation)

- ✅ All 8 screens implemented and navigable
- ✅ Resource generation matches web rates (±5%)
- ✅ Tech tree unlocks sequentially per plan
- ✅ Trade market fluctuates realistically
- ✅ Security system triggers raids at threshold
- ✅ Facility upgrades queue and complete
- ✅ Drones spawn, move, take damage
- ✅ Game saves and loads (full state)
- ✅ **60 FPS on mid-range hardware** (GTX 1060+)
- ✅ Dark-first palette + neon accents match web
- ✅ Keyboard shortcuts work (T, S, O, D, A)
- ✅ Audio plays (music + SFX)
- ✅ Multi-platform builds succeed (Windows/macOS/Linux)

---

## 📞 Confirmed Repo Setup

The repository architecture has been confirmed as follows:

1. **Unity Project Location**: Separate parallel repository (`AetherProtocol-Unity`), leaving this repository (`AP4A`) focused solely on the Android/Capacitor version.
2. **Coordinated Parity**: Both codebases are maintained in parallel to ensure feature and gameplay mechanics match.
3. **Target Platforms**: Android (via Capacitor) in this repository; Windows, macOS, and Linux in the Unity repository.

---

**Document Version**: 1.1  
**Generated**: 2026-04-27  
**Status**: ✅ Parallel Repo Setup Confirmed

