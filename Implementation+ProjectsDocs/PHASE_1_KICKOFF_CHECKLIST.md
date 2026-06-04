# Phase 1 Kickoff Checklist: Foundation & Architecture

**Start Date**: [TO BE CONFIRMED]  
**Target Completion**: 2 weeks  
**Effort**: ~40 hours  
**Team**: [Developer(s) to be assigned]  
**Sprint Goal**: Establish Unity project structure, core managers, and scene navigation system.

---

## ✅ Pre-Kickoff (Before Day 1)

### Environment Setup
- [ ] Unity 2022.3+ LTS downloaded and installed
- [ ] Unity Editor tested and functional
- [ ] Git repository prepared (either branch or new repo)
- [ ] `.gitignore` configured for Unity (`Library/`, `Temp/`, `Builds/`, `*.csproj`, `*.sln`)
- [ ] Project directory created and ready: `C:\Users\PPL\source\repos\Games\AetherProtocol-Unity\` (or parallel location)

### Confirmations
- [ ] Team assignment confirmed
- [ ] Schedule blocked (2 weeks, ~40 hrs total)
- [ ] 3D asset status confirmed (required for Phase 3)
- [ ] Audio asset status confirmed (required for Phase 5)
- [ ] Success criteria reviewed and agreed upon

---

## 📋 Week 1: Project Bootstrap & Core Systems

### Day 1: Project Initialization
**Scope**: Create Unity project, configure project settings, scaffold directory structure  
**Deliverable**: Ready-to-build project with directory layout  
**Effort**: 4 hrs

#### Tasks
- [ ] **1.1a**: Create new Unity project
  - Open Unity Hub → New Project
  - Choose: Universal 3D template (URP included)
  - Version: Unity 2022.3.x LTS
  - Location: Confirm final path
  - Create

- [ ] **1.1b**: Configure Project Settings
  - Edit → Project Settings → Player
    - Company Name: `Terix21`
    - Product Name: `Neon Scrap: Sector 7`
    - Default Icon: Add placeholder or logo
  - Quality Settings → URP Asset (High)
  - Graphics → URP Asset (select)
  - Resolution: 1920×1080 (default)
  - Color Space: Linear

- [ ] **1.1c**: Create directory structure in Assets/
  ```
  Assets/
  ├── Scripts/
  │   ├── Core/
  │   ├── Managers/
  │   ├── Controllers/
  │   ├── UI/
  │   └── Systems/
  ├── Scenes/
  ├── Prefabs/
  ├── Models/
  ├── Materials/
  ├── Textures/
  └── Audio/
  ```

- [ ] **1.1d**: Initial commit to Git
  ```bash
  git add .gitignore Assets/ Packages/ ProjectSettings/
  git commit -m "feat: initialize Unity project with URP, directory structure"
  ```

#### Validation
- [ ] Project opens without errors
- [ ] Directory structure visible in Project panel
- [ ] URP Asset assigned in Graphics Settings
- [ ] Initial build succeeds (may show warnings, OK)

---

### Day 2: Core Manager Systems (GameManager, TickManager)
**Scope**: Create foundational ScriptableObject and MonoBehaviour managers  
**Deliverable**: GameManager + TickManager scripts tested and working  
**Effort**: 6 hrs

#### Tasks
- [ ] **1.2a**: Create `GameManager.cs` (ScriptableObject)
  - Location: `Assets/Scripts/Core/GameManager.cs`
  - Mirror `gameStore.ts` structure:
    - Resources: scrap, buildingMats, credits
    - Progression: unlockedSectors[], unlockedTech[], facilityLevels{}
    - Combat: threatLevel, drones, droneHealth
    - Time/Rates: gameTimeHours, scrapRatePerHour, matsRatePerHour, creditsPerHour
    - Active systems: activeQueues[], activeSLAs, creditsPerHour
  - Include public methods:
    - `AddScrap(int amount)`
    - `AddMats(int amount)`
    - `AddCredits(int amount)`
    - `SetThreatLevel(int level)`
    - `AddDrone()`
    - `DamageAllDrones(int damage)`
  - Static instance accessor: `public static GameManager Instance { get; private set; }`
  - Use `[SerializeField]` for all data (inspector-editable)

  **Reference**: See `UNITY_MIGRATION_REVIEW.md` § "Appendix: Code Examples" for template

- [ ] **1.2b**: Create GameManager asset in Editor
  - Right-click in Assets → Create → Game → GameManager
  - Verify asset created: `Assets/GameManager.asset`
  - Inspect in Inspector:
    - Verify all fields visible and editable
    - Set defaults: scrap=450, buildingMats=1200, credits=100, etc.
  - Save asset

- [ ] **1.2c**: Create `TickManager.cs` (MonoBehaviour)
  - Location: `Assets/Scripts/Core/TickManager.cs`
  - Design:
    - `[SerializeField] float tickInterval = 1f;`
    - `Update()` loop with timer
    - `OnTick()` callback (placeholder for now)
  - Features:
    - Fires every 1 second (configurable)
    - Logs to console: `Debug.Log("Tick occurred")`
    - Placeholder for Phase 2 resource generation

- [ ] **1.2d**: Create GameManager + TickManager in test scene
  - Open `Scenes/SampleScene` (default)
  - Create empty GameObject: `Managers`
  - Add TickManager.cs script to `Managers` GameObject
  - In Inspector, assign GameManager asset to a public field (if needed for reference)
  - Save scene as `Assets/Scenes/Test/ManagerTest.unity`

- [ ] **1.2e**: Test in Play mode
  - Press Play
  - Observer console:
    - "Tick occurred" appears every ~1 second
    - No errors or warnings
  - Observe Inspector:
    - GameManager fields update (simulate with manual Inspector edits)
    - Verify persistence across Play/Stop cycles
  - Stop Play

- [ ] **1.2f**: Commit to Git
  ```bash
  git add Assets/Scripts/Core/ Assets/GameManager.asset
  git commit -m "feat: implement GameManager ScriptableObject and TickManager"
  ```

#### Validation
- [ ] GameManager.cs compiles without errors
- [ ] GameManager asset loads in Inspector, all fields visible
- [ ] TickManager.cs compiles without errors
- [ ] TickManager fires OnTick() every 1 second (verify via console logs)
- [ ] No runtime errors in Play mode

---

### Day 3: Save & Input Managers
**Scope**: Create SaveManager for persistence and InputManager for keyboard shortcuts  
**Deliverable**: Both managers functional, tested in Play mode  
**Effort**: 6 hrs

#### Tasks
- [ ] **1.3a**: Create `SaveManager.cs` (MonoBehaviour)
  - Location: `Assets/Scripts/Core/SaveManager.cs`
  - Design:
    - `[System.Serializable] public class GameSaveData { ... }` (mirrors GameManager fields)
    - `public void SaveGame()` → Serialize GameManager to JSON, store in `PlayerPrefs`
    - `public void LoadGame()` → Retrieve JSON from `PlayerPrefs`, deserialize to GameManager
    - MD5 checksum validation (basic: compute hash of save data before/after)
    - Debug logs: "Game Saved" / "Game Loaded"
  - Use `JsonUtility.ToJson()` and `PlayerPrefs.SetString()`

- [ ] **1.3b**: Create `InputManager.cs` (MonoBehaviour)
  - Location: `Assets/Scripts/Core/InputManager.cs`
  - Map keyboard shortcuts:
    - `T` → Log "Navigate to Trade" (placeholder)
    - `S` → Log "Navigate to Security"
    - `O` → Log "Navigate to Operations"
    - `D` → Log "Navigate to Dashboard"
    - `A` → Log "Navigate to Armory"
    - `Ctrl+S` → Call `SaveManager.SaveGame()`
    - `Ctrl+L` → Call `SaveManager.LoadGame()`
  - Use `Input.GetKeyDown(KeyCode.T)` etc.
  - Debug logs for each key press

- [ ] **1.3c**: Add to Managers GameObject
  - Open `Assets/Scenes/Test/ManagerTest.unity`
  - Add SaveManager.cs to `Managers` GameObject
  - Add InputManager.cs to `Managers` GameObject
  - Verify both scripts visible in Inspector

- [ ] **1.3d**: Test in Play mode
  - Press Play
  - Press `T` → Console logs "Navigate to Trade"
  - Press `S` → Console logs "Navigate to Security"
  - Press `Ctrl+S` → Console logs "Game Saved"
  - Check `PlayerPrefs` (open Edit → Preferences → check registry or console output)
  - Press `Ctrl+L` → Console logs "Game Loaded"
  - Verify data restored (inspect GameManager fields in Inspector)
  - Stop Play

- [ ] **1.3e**: Commit to Git
  ```bash
  git add Assets/Scripts/Core/SaveManager.cs Assets/Scripts/Core/InputManager.cs
  git commit -m "feat: implement SaveManager and InputManager with keyboard shortcuts"
  ```

#### Validation
- [ ] SaveManager.cs compiles without errors
- [ ] InputManager.cs compiles without errors
- [ ] Keyboard shortcuts respond (T, S, O, D, A, Ctrl+S, Ctrl+L)
- [ ] Save/load persists data in PlayerPrefs
- [ ] No runtime errors in Play mode

---

### Day 4-5: Scene Management & Navigation
**Scope**: Create ScreenNavigator, scaffold 8 empty scenes, test transitions  
**Deliverable**: All 8 scenes created, navigation system working, fade transitions smooth  
**Effort**: 8 hrs

#### Tasks
- [ ] **1.4a**: Create `ScreenNavigator.cs` (MonoBehaviour, Singleton)
  - Location: `Assets/Scripts/UI/ScreenNavigator.cs`
  - Design:
    - Static instance: `public static ScreenNavigator Instance { get; private set; }`
    - Public method: `public void LoadScene(string sceneName)`
    - Fade transition logic:
      - Create black Canvas overlay
      - Fade in (1 sec) before scene load
      - Load scene via `SceneManager.LoadScene(sceneName, LoadSceneMode.Single)`
      - Fade out (1 sec) after scene load
    - Debug logs for each transition

- [ ] **1.4b**: Create fade effect system (optional, can use simple black panel)
  - Option 1 (Simple): Create black UI Panel, animate alpha 0→1→0 via `CanvasGroup`
  - Option 2 (Advanced): Use Coroutine with `WaitForSeconds`
  - Test transition smoothness (should feel polished, not jarring)

- [ ] **1.4c**: Create 8 empty scenes
  - Right-click in Assets/Scenes → Create → Scene
  - Create and save:
    1. `Login.unity`
    2. `SectorDashboard.unity`
    3. `Facilities.unity`
    4. `TradePost.unity`
    5. `TechTree.unity`
    6. `Security.unity`
    7. `Operations.unity`
    8. `Armory.unity`
  - For each scene:
    - Add MainCamera (default or from template)
    - Add Canvas (Screen Space - Overlay)
    - Add TextMeshPro text with scene name (e.g., "Login Screen")
    - Add ScreenNavigator.cs to a singleton GameObject
    - Save scene

- [ ] **1.4d**: Add scenes to Build Settings
  - File → Build Settings
  - Drag 8 scenes into "Scenes in Build" list in order:
    - Scene 0: Login
    - Scene 1: SectorDashboard
    - Scene 2: Facilities
    - Scene 3: TradePost
    - Scene 4: TechTree
    - Scene 5: Security
    - Scene 6: Operations
    - Scene 7: Armory
  - Verify list order

- [ ] **1.4e**: Update InputManager to use ScreenNavigator
  - Modify InputManager.cs:
    - `T` → `ScreenNavigator.Instance.LoadScene("TradePost")`
    - `S` → `ScreenNavigator.Instance.LoadScene("Security")`
    - `O` → `ScreenNavigator.Instance.LoadScene("Operations")`
    - `D` → `ScreenNavigator.Instance.LoadScene("SectorDashboard")`
    - `A` → `ScreenNavigator.Instance.LoadScene("Armory")`

- [ ] **1.4f**: Test in Play mode (start from Login scene)
  - File → Build Settings → Set Login as scene 0
  - Press Play
  - Press `D` → Fade transition to Dashboard (should see "Sector Dashboard Screen" text)
  - Press `T` → Fade transition to Trade (should see "Trade Post Screen" text)
  - Press `S`, `O`, `A` to test other scenes
  - Verify fade effect is smooth and not jarring
  - Stop Play

- [ ] **1.4g**: Commit to Git
  ```bash
  git add Assets/Scripts/UI/ScreenNavigator.cs Assets/Scenes/
  git commit -m "feat: implement ScreenNavigator and 8 scene templates with fade transitions"
  ```

#### Validation
- [ ] ScreenNavigator.cs compiles without errors
- [ ] All 8 scenes appear in Build Settings in correct order
- [ ] Keyboard shortcuts trigger scene transitions
- [ ] Fade transitions are smooth (~1 second)
- [ ] No runtime errors, scenes load correctly
- [ ] Can navigate between any two scenes

---

### Day 6: Placeholder UI & Canvas Setup
**Scope**: Create basic Canvas, apply color scheme, add placeholders for all screens  
**Deliverable**: Consistent UI theme applied, all 8 scenes have placeholder layouts  
**Effort**: 6 hrs

#### Tasks
- [ ] **1.5a**: Create UI theme (colors + fonts)
  - Create folder: `Assets/Resources/UI/`
  - Define color palette (in code or as Scriptable):
    - Background: `#030712` (dark-first)
    - Primary accent: `#22d3ee` (cyan)
    - Secondary accent: `#10b981` (emerald)
    - Tertiary accent: `#ef4444` (red)
    - Text: `#ffffff` (white)
    - Text (muted): `#94a3b8` (gray)
  - Add TextMeshPro font (import or use default)
    - Recommended: JetBrains Mono or Share Tech Mono

- [ ] **1.5b**: Create UIManager.cs helper
  - Location: `Assets/Scripts/UI/UIManager.cs`
  - Static methods for styling:
    - `ApplyDarkTheme(CanvasGroup)` → Set background color
    - `ApplyAccentColor(Image, AccentType)` → Cyan/Emerald/Red
    - Centralize font references

- [ ] **1.5c**: Update each of 8 scenes with consistent Canvas layout
  - For each scene (e.g., `Login.unity`):
    - Select Canvas
    - Set Canvas Scaler: Reference Resolution 1920×1080
    - Add Image component (full-screen background color: `#030712`)
    - Add TextMeshPro Text (scene name + placeholder)
    - Save scene

- [ ] **1.5d**: Add sidebar placeholder to Dashboard + other main scenes
  - Select `SectorDashboard.unity` scene
  - Create Panel (VerticalLayoutGroup) on Canvas, left side, 200px wide
    - Add Text: "DASHBOARD"
    - Add Button (placeholder): "T - Trade"
    - Add Button (placeholder): "S - Security"
    - Add Button (placeholder): "O - Operations"
    - Add Button (placeholder): "D - Dashboard"
    - Add Button (placeholder): "A - Armory"
  - Replicate to other main scenes

- [ ] **1.5e**: Test visual appearance
  - Press Play from Login scene
  - Navigate through scenes (T, S, O, D, A)
  - Verify dark theme applied consistently
  - Verify neon accents visible (cyan buttons)
  - Verify text readable (white on dark background)
  - Stop Play

- [ ] **1.5f**: Commit to Git
  ```bash
  git add Assets/Scripts/UI/UIManager.cs Assets/Scenes/
  git commit -m "feat: apply dark-first UI theme and placeholder layouts to all 8 scenes"
  ```

#### Validation
- [ ] Canvas Scaler set to 1920×1080 reference
- [ ] All scenes have dark background (`#030712`)
- [ ] Sidebar visible on main screens with buttons
- [ ] Text readable (good contrast)
- [ ] Neon accents visible (cyan, emerald, red)
- [ ] No visual glitches or layout issues

---

### Day 7: First Full Build & Integration Test
**Scope**: Complete first full build, verify all systems work together  
**Deliverable**: Buildable, runnable application with core features working  
**Effort**: 4 hrs

#### Tasks
- [ ] **1.6a**: Resolve any compiler errors
  - Check Console for any `CS` (C#) errors
  - Fix before proceeding

- [ ] **1.6b**: Create persistent Managers scene (optional, advanced)
  - Alternatively: Add Managers to each scene (simpler for now)
  - For now, keep Managers in each scene for simplicity

- [ ] **1.6c**: Build executable
  - File → Build Settings
  - Platform: PC, Mac & Linux Standalone
  - Architecture: x86_64
  - Click Build
  - Choose output folder: `Builds/Debug/`
  - Wait for build to complete (~2-5 minutes)

- [ ] **1.6d**: Test built executable
  - Navigate to `Builds/Debug/` folder
  - Run `.exe` (Windows) or app (macOS)
  - Verify:
    - Launches to Login screen
    - Keyboard shortcuts work (T, S, O, D, A)
    - Scene transitions smooth
    - No errors or crashes
    - Can save/load (Ctrl+S, Ctrl+L)
  - Exit application

- [ ] **1.6e**: Performance baseline
  - Note FPS in-game (should be very high with placeholder scenes)
  - Take screenshot for comparison later

- [ ] **1.6f**: Final commit
  ```bash
  git add Assets/ ProjectSettings/
  git commit -m "feat: complete Phase 1 foundation - buildable project with core managers and scene navigation"
  ```

#### Validation
- [ ] Build completes without errors
- [ ] Executable runs on target platform
- [ ] All 8 scenes accessible via keyboard shortcuts
- [ ] Save/load functional
- [ ] No crashes or warnings in built version
- [ ] FPS target achievable (60+ on mid-range hardware)

---

### End of Week 1: Go/No-Go Checkpoint

**Go/No-Go Criteria:**
- [x] Unity project builds without errors
- [x] GameManager loads and accessible
- [x] TickManager fires 1-second callbacks
- [x] InputManager responds to keyboard shortcuts (T, S, O, D, A, Ctrl+S, Ctrl+L)
- [x] All 8 scenes created, appear in Build Settings
- [x] Scene navigation works with fade transitions
- [x] UI theme applied (dark-first palette, neon accents)
- [x] First executable build succeeds
- [x] No runtime errors or crashes

**If all criteria met**: Proceed to Week 2 ✅
**If any criteria failed**: Debug and resolve before proceeding

---

## 📋 Week 2: Polish & Phase 2 Prep

### Day 8: Documentation & Code Review
**Scope**: Add code comments, validate Phase 1 deliverables, prepare handoff to Phase 2  
**Deliverable**: Clean, documented codebase ready for Phase 2 development  
**Effort**: 4 hrs

#### Tasks
- [ ] **1.7a**: Add inline code comments
  - GameManager.cs: Explain each field's purpose
  - TickManager.cs: Document OnTick() placeholder
  - SaveManager.cs: Comment serialization logic
  - InputManager.cs: Document keyboard mapping
  - ScreenNavigator.cs: Explain fade transition flow
  - Comment style: Concise, no redundant comments (follow existing project style)

- [ ] **1.7b**: Create Phase 1 Summary document
  - Location: `Documentation/Phase1_Summary.md`
  - Include:
    - All deliverables completed ✅
    - Known issues (if any)
    - Decisions made (e.g., fade transition duration)
    - Performance baseline (FPS measured in Week 1)
    - Recommendations for Phase 2

- [ ] **1.7c**: Code review checklist
  - [ ] No unused variables or imports
  - [ ] Consistent naming conventions (PascalCase for classes/methods)
  - [ ] All `[SerializeField]` fields have meaningful defaults
  - [ ] Error handling present (try-catch where needed)
  - [ ] No hardcoded magic numbers (use constants)

- [ ] **1.7d**: Performance sanity check
  - Profile in Editor (Profiler window)
  - Note CPU/GPU usage (should be minimal with placeholder scenes)
  - Compare to baseline from Day 7
  - No regressions expected

#### Validation
- [ ] All code has appropriate comments
- [ ] Phase 1 Summary document complete
- [ ] No compiler warnings
- [ ] Performance stable

---

### Day 9-10: Phase 2 Preparation & Optional Enhancements
**Scope**: Prep for Phase 2 systems (resource generation, queues, etc.)  
**Deliverable**: Architecture ready for system implementation  
**Effort**: 4 hrs

#### Tasks
- [ ] **1.8a**: Design Phase 2 folder structure
  - Create `Assets/Scripts/Managers/` subdirectories:
    - `ResourceManager/`
    - `QueueManager/`
    - `TradeManager/`
    - `TechManager/`
    - `SecurityManager/`
    - `ScavengeManager/`
    - `PathfindingManager/`
  - Add placeholder files with class stubs

- [ ] **1.8b**: Create data classes
  - Location: `Assets/Scripts/Core/DataTypes.cs`
  - Define:
    - `[System.Serializable] class QueuedTask { ... }`
    - `[System.Serializable] class TechNode { ... }`
    - `[System.Serializable] class RaidEvent { ... }`
    - etc.
  - Use consistent naming from `gameStore.ts`

- [ ] **1.8c**: Design event system (optional, for later)
  - Note: Consider using Unity Events or custom event system
  - Example: `public UnityEvent<int> OnResourceGenerated;`
  - Defer implementation to Phase 2 if time allows

- [ ] **1.8d**: Final Phase 1 commit & tag
  ```bash
  git add Assets/Scripts/Managers/ Assets/Scripts/Core/DataTypes.cs
  git commit -m "feat: phase 1 complete - core infrastructure ready for Phase 2"
  git tag -a v1.0-phase1-complete -m "Phase 1 Foundation Complete"
  ```

#### Validation
- [ ] Phase 2 folder structure created
- [ ] Data classes defined and compilable
- [ ] Phase 1 tagged in Git for reference

---

## 🎯 Phase 1 Success Criteria (Final Validation)

### Must-Have (Blocking)
- [x] **Unity project initialized with URP**
- [x] **GameManager (ScriptableObject) with all fields from gameStore.ts**
- [x] **TickManager fires 1-second callbacks**
- [x] **SaveManager persists/loads game state**
- [x] **InputManager responds to 7 keyboard shortcuts**
- [x] **8 scenes created and listed in Build Settings**
- [x] **Scene navigation with fade transitions (1 sec)**
- [x] **UI theme applied (dark-first palette, neon accents)**
- [x] **First executable build succeeds**

### Nice-to-Have (Non-Blocking)
- [ ] Event system for phase 2
- [ ] Performance profiling baseline
- [ ] Extended code documentation
- [ ] Phase 2 folder structure pre-created

---

## 📊 Phase 1 Effort Summary

| Component | Hours | Days | Status |
|-----------|-------|------|--------|
| Project setup + project settings | 4 | Day 1 | — |
| GameManager + TickManager | 6 | Day 2 | — |
| SaveManager + InputManager | 6 | Day 3 | — |
| ScreenNavigator + 8 scenes | 8 | Day 4-5 | — |
| UI theme + placeholders | 6 | Day 6 | — |
| Full build + integration test | 4 | Day 7 | — |
| Documentation + code review | 4 | Day 8 | — |
| Phase 2 prep + optional | 4 | Day 9-10 | — |
| **Total** | **40** | **~2 weeks** | **✅ On track** |

---

## 🚀 Phase 2 Kickoff (After Phase 1 Complete)

Once Phase 1 validation passes, immediately begin Phase 2:
- **Goal**: Core gameplay loop (resource generation, queues, risk calculations)
- **Duration**: 2 weeks (~40 hrs)
- **Start Date**: [End of Week 2 + 1 day]
- **Reference**: `UNITY_MIGRATION_REVIEW.md` § Phase 2

---

**Document Version**: Phase 1 Checklist 1.0  
**Last Updated**: 2026-04-27  
**Status**: Ready for execution

