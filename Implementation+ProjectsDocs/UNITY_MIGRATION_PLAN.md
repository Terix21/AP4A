# Aether Protocol — Unity Migration Plan

> **Status**: Planning  
> **Target**: Unity 2022.3+ (LTS) with Universal Render Pipeline (URP)  
> **Branch**: `unity-migration` (to be created)

---

## Executive Summary

Aether Protocol is currently built as a **web-based Electron + React + Three.js** application. This plan outlines the refactoring path to port the entire game to **Unity (C#)** while preserving the core gameplay loop, visual identity, and data systems.

### Why Migrate to Unity?

| Web (Current) | Unity (Target) |
|---------------|----------------|
| Browser-dependent rendering | Native performance, full GPU control |
| Limited offline capability | Robust offline/desktop builds |
| JavaScript runtime constraints | C# type safety, IL2CPP optimization |
| WebGL portability | Windows/macOS/Linux + console ports |
| Single-threaded JS event loop | Multithreaded game loop (Jobs System) |

---

## 1. Architecture Mapping

### 1.1 Frontend → Game Engine

| React/Three.js (Current) | Unity (Target) |
|--------------------------|----------------|
| `@react-three/fiber` | Unity Scene Graph + custom MonoBehaviours |
| `@react-three/drei` | Unity built-in primitives + custom helpers |
| `@react-three/postprocessing` | URP Volume + custom Render Features |
| `Canvas` (R3F root) | `GameObject` root with `Camera` component |
| `<Scene>` component | Root Scene with nested GameObjects |
| `<mesh>` primitives | `MeshFilter` + `MeshRenderer` components |
| `useFrame` hook | `Update()` / `FixedUpdate()` lifecycle |
| `Zustand` store | ScriptableObject-based state system |

### 1.2 State Management

| Zustand (Current) | Unity (Target) |
|-------------------|----------------|
| `create<GameState>()` | `ScriptableObject` + static instance accessor |
| `useGameStore(state => ...)` | `[SerializeField]` + property drawers |
| Actions as store methods | `public void` methods on MonoBehaviour |
| Immutable updates via `set()` | `SetValue()` with `[SerializeField]` backing |

**Proposed Unity Pattern:**

```csharp
// GameManager.cs (ScriptableObject)
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
    
    public void AddScrap(int amount) => scrap = Mathf.Max(0, scrap + amount);
    public void SetThreatLevel(int level) => threatLevel = Mathf.Clamp(level, 0, 100);
}
```

---

## 2. Core Systems Migration

### 2.1 Game Loop & Tick System

| Current (TickSystem.ts) | Unity Target |
|-------------------------|--------------|
| `setInterval`-based ticks | `Update()` + `FixedUpdate()` |
| 1-second tick interval | Configurable tick rate (default 1s) |
| Resource rate calculations | Coroutine-based timed callbacks |
| Risk factor calculations | Dedicated `RiskManager` MonoBehaviour |

```csharp
// TickManager.cs
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
    
    void OnTick()
    {
        // Resource generation: scrapRatePerHour / 3600 * deltaTime
        // Risk calculations: systemOverloadRisk, threatLevel
        // Queue processing: activeQueues timeRemainingMs
    }
}
```

### 2.2 Pathfinding System

| Current (Pathfinding.ts) | Unity Target |
|--------------------------|--------------|
| Grid-based A* implementation | Unity NavMeshSystem (built-in) |
| Manual path smoothing | `NavMeshAgent` with obstacle avoidance |
| 3D coordinate storage | `Vector3` with baked NavMesh |

**Migration Note:** The current `Pathfinding.calculatePath()` can be replaced with Unity's `NavMesh.CalculatePath()` for the drone movement system.

### 2.3 Save System

| Current (SaveSystem.ts) | Unity Target |
|-------------------------|--------------|
| `localStorage` + cloud failover | `PlayerPrefs` + binary/JSON serialization |
| Cloud sync (placeholder) | Unity Cloud Build + PlayFab (recommended) |
| Checksum validation | `Cryptography.MD5` hash on save data |

```csharp
// SaveManager.cs
[System.Serializable]
public class GameSaveData
{
    public int scrap;
    public int buildingMats;
    public int credits;
    public int[] unlockedSectors;
    public int[] unlockedTech;
    public float gameTimeHours;
    // ... full state mirror
}

public class SaveManager : MonoBehaviour
{
    const string SAVE_KEY = "neon_scrap_save_data";
    
    public void SaveGame()
    {
        var data = new GameSaveData
        {
            scrap = GameManager.Instance.scrap,
            // ... map all fields
        };
        PlayerPrefs.SetString(SAVE_KEY, JsonUtility.ToJson(data));
    }
    
    public void LoadGame()
    {
        if (PlayerPrefs.HasKey(SAVE_KEY))
        {
            var data = JsonUtility.FromJson<GameSaveData>(PlayerPrefs.GetString(SAVE_KEY));
            // ... apply to GameManager
        }
    }
}
```

---

## 3. Visual & Rendering Pipeline

### 3.1 Scene Architecture

| Three.js Concept | Unity Equivalent |
|------------------|------------------|
| `<Canvas>` | `Camera` + `RenderSettings` |
| `<OrthographicCamera>` | `Camera.orthographic = true` |
| `<MapControls>` | Custom input script or Cinemachine |
| `<Environment>` HDRI | `Lighting Settings` + `Environment` tab |
| `<Suspense>` loading | `Addressables` async loading |

### 3.2 3D Assets (Phase 7 Upgrade)

| Current Primitives | Unity Target |
|--------------------|--------------|
| `cylinderGeometry` | Cylinder mesh + CylinderCollider |
| `boxGeometry` | Cube mesh + BoxCollider |
| `sphereGeometry` | Sphere mesh + SphereCollider |
| `torusGeometry` | Imported Torus mesh |
| Custom facility models | `.glb` / `.fbx` modular assets |

**Asset Pipeline:**

```
src/assets/models/
├── facilities/
│   ├── CommandHub.glb
│   ├── ScrapSmelter.glb
│   ├── SynthFarm.glb
│   └── DataHub.glb
├── drones/
│   └── ScavengeDrone.glb
└── environment/
    ├── SectorPlatform.glb
    └── NeonTrimSegments.glb
```

### 3.3 Post-Processing

| Current (Effects.tsx) | Unity URP |
|-----------------------|-----------|
| `Bloom` | `Bloom` volume override |
| `DepthOfField` | `DepthOfField` volume override |
| `Vignette` | `Vignette` volume override |

**URP Configuration:**

1. Create URP Asset (Right-click → Create → Universal Render Pipeline → URP Asset)
2. Assign to Graphics Settings
3. Enable post-processing in Camera component
4. Add Global Volume with priority 1

### 3.4 Lighting

| Current | Unity |
|---------|-------|
| `ambientLight` | Window → Rendering → Lighting → Environment tab |
| `directionalLight` | Directional Light (Sun) GameObject |
| Dynamic neon colors | Material property blocks with `_EmissionColor` |

---

## 4. UI/UX Migration

### 4.1 HUD Architecture

| React/Tailwind | Unity UI (UGUI) |
|----------------|-----------------|
| `UILayoutController` | Canvas (Screen Space - Overlay) |
| `Sidebar` | Vertical Layout Group + Anchors |
| `MobileNav` | Horizontal Layout Group + Toggle |
| Tailwind classes | Anchor presets + custom layout groups |

### 4.2 Screen Mapping

| Web Route | Unity Scene |
|-----------|-------------|
| `/login` | `Scene/Login` |
| `/dashboard` | `Scene/SectorDashboard` |
| `/facilities` | `Scene/Facilities` |
| `/trade` | `Scene/TradePost` |
| `/tech` | `Scene/TechTree` |
| `/security` | `Scene/Security` |
| `/operations` | `Scene/Operations` |
| `/armory` | `Scene/Armory` |

**Scene Management:** Use `SceneManager.LoadScene()` with additive loading for the 3D world persistent under all UI screens.

### 4.3 Styling Convention

- **Dark-first palette**: Match current Tailwind `gray-950` → Unity UI `#030712`
- **Neon accents**: Cyan (`#22d3ee`), Emerald (`#10b981`), Red (`#ef4444`)
- **Font**: Use `TextMeshPro` with a monospace/tech font (e.g., JetBrains Mono or Share Tech Mono)

---

## 5. Input & Controls

### 5.1 Current Keyboard Macros

| Key | Action (Current) | Unity Mapping |
|-----|-------------------|----------------|
| `T` | Navigate to `/trade` | `Input.GetKeyDown(KeyCode.T)` |
| `S` | Navigate to `/security` | `Input.GetKeyDown(KeyCode.S)` |
| `O` | Navigate to `/operations` | `Input.GetKeyDown(KeyCode.O)` |
| `D` | Navigate to `/dashboard` | `Input.GetKeyDown(KeyCode.D)` |
| `A` | Navigate to `/armory` | `Input.GetKeyDown(KeyCode.A)` |

### 5.2 3D Interaction

| Web | Unity |
|-----|-------|
| Right-click → Raycast → Pathfinding | `Physics.Raycast` → `NavMeshAgent.SetDestination` |
| Click → Select entity | `OnMouseDown` → `Physics.Raycast` |
| Double-click → Navigate to facility | `OnMouseDoubleClick` → Scene load |

---

## 6. Data & Persistence

### 6.1 Game State Schema

```csharp
[System.Serializable]
public class GameState
{
    // Resources
    public int scrap;
    public int buildingMats;
    public int credits;
    
    // Progression
    public string[] unlockedSectors;
    public string[] unlockedTech;
    public Dictionary<string, int> facilityLevels;
    
    // Combat
    public int threatLevel;
    public int drones;
    public int droneHealth;
    
    // Time
    public float gameTimeHours;
    public float scrapRatePerHour;
    public float matsRatePerHour;
    
    // Active Systems
    public QueuedTask[] activeQueues;
    public int activeSLAs;
    public float creditsPerHour;
}
```

### 6.2 Cloud Sync (Future)

| Current | Unity Target |
|---------|--------------|
| Placeholder `fetchFromCloud()` | PlayFab (recommended) or Unity Cloud Save |
| LocalStorage fallback | `PlayerPrefs` + encrypted binary |

---

## 7. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

- [ ] Initialize Unity 2022.3+ project with URP
- [ ] Set up project structure (`Assets/Scripts`, `Assets/Scenes`, `Assets/Prefabs`)
- [ ] Create `GameManager` ScriptableObject mirroring `gameStore.ts`
- [ ] Implement basic scene with Camera and lighting
- [ ] Build empty UI canvas with screen navigation

### Phase 2: Core Systems (Weeks 3-4)

- [ ] Implement `TickManager` for game loop
- [ ] Port `Pathfinding` → Unity NavMesh
- [ ] Create `SaveManager` with JSON serialization
- [ ] Implement resource generation loop
- [ ] Add keyboard input system for navigation

### Phase 3: 3D World (Weeks 5-6)

- [ ] Import facility models (Command Hub, Smelter, Synth-Farm, DataHub)
- [ ] Create facility prefabs with click handlers
- [ ] Implement drone movement with NavMeshAgent
- [ ] Add post-processing volumes (Bloom, DoF, Vignette)
- [ ] Configure Environment lighting

### Phase 4: UI Integration (Weeks 7-8)

- [ ] Build all 8 screen UIs in Unity (Dashboard, Facilities, Trade, Tech, Security, Operations, Armory, Login)
- [ ] Connect UI buttons to scene navigation
- [ ] Implement floating context panel for facility selection
- [ ] Add HUD overlays (resource bars, threat indicator)

### Phase 5: Polish (Weeks 9-10)

- [ ] Add sound effects and background music
- [ ] Implement save/load with checksum validation
- [ ] Optimize for desktop builds (Windows/macOS/Linux)
- [ ] Add loading screen with progress bar
- [ ] Final QA against web baseline feature parity

---

## 8. File Structure

```
AetherProtocol-Unity/
├── Assets/
│   ├── Scripts/
│   │   ├── Core/
│   │   │   ├── GameManager.cs
│   │   │   ├── TickManager.cs
│   │   │   ├── SaveManager.cs
│   │   │   └── InputManager.cs
│   │   ├── Facilities/
│   │   │   ├── FacilityController.cs
│   │   │   ├── CommandHub.cs
│   │   │   ├── ScrapSmelter.cs
│   │   │   ├── SynthFarm.cs
│   │   │   └── DataHub.cs
│   │   ├── Drones/
│   │   │   ├── DroneController.cs
│   │   │   └── DroneManager.cs
│   │   ├── Systems/
│   │   │   ├── TradeManager.cs
│   │   │   ├── TechManager.cs
│   │   │   ├── SecurityManager.cs
│   │   │   └── ScavengeManager.cs
│   │   └── UI/
│   │       ├── ScreenNavigator.cs
│   │       ├── ResourceDisplay.cs
│   │       └── ContextPanel.cs
│   ├── Scenes/
│   │   ├── MainMenu/
│   │   ├── SectorDashboard/
│   │   ├── Facilities/
│   │   ├── TradePost/
│   │   ├── TechTree/
│   │   ├── Security/
│   │   ├── Operations/
│   │   └── Armory/
│   ├── Prefabs/
│   │   ├── Facilities/
│   │   ├── Drones/
│   │   └── UI/
│   ├── Models/
│   │   ├── Facilities/
│   │   ├── Drones/
│   │   └── Environment/
│   ├── Materials/
│   ├── Textures/
│   └── Audio/
├── Packages/
│   └── manifest.json
├── ProjectSettings/
└── README.md
```

---

## 9. Dependencies

### Unity Packages (Package Manager)

| Package | Version | Purpose |
|---------|---------|---------|
| Universal RP | 14.0+ | Rendering pipeline |
| TextMeshPro | 2.1+ | UI text rendering |
| Cinemachine | 2.9+ | Camera controls |
| Input System | 1.7+ | Modern input handling |
| NavMesh Components | 1.1+ | Pathfinding |
| Addressables | 1.21+ | Asset loading |

### Recommended Plugins

- **DOTween** — Tweening animations for UI and 3D
- **NaughtyAttributes** — Inspector attribute helpers
- **Odin Inspector** — Enhanced property drawers (optional)

---

## 10. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Asset rework from primitives to models | Use placeholder primitives first, swap for imported `.glb` later |
| State sync between UI and 3D | Centralize in `GameManager` ScriptableObject |
| Performance on lower-end hardware | Use URP with optimized settings; test early |
| Data migration from web localStorage | Export JSON from web, write import parser for Unity |
| Feature parity timeline | Prioritize core loop (resources, facilities, drones) first |

---

## 11. Success Criteria

- [ ] Unity build runs at 60 FPS on mid-range hardware
- [ ] All 8 screens accessible and functional
- [ ] 3D world renders with facilities and drones
- [ ] Save/load persists full game state
- [ ] Keyboard navigation matches web behavior
- [ ] Dark neon aesthetic preserved from web version

---

## Appendix A: Quick Reference

### Unity Equivalents Cheat Sheet

| Three.js | Unity |
|----------|-------|
| `new THREE.Vector3(x, y, z)` | `new Vector3(x, y, z)` |
| `mesh.position.set(x, y, z)` | `transform.position = new Vector3(x, y, z)` |
| `useFrame((state, delta) => { ... })` | `void Update() { ... }` |
| `useGameStore.getState()` | `GameManager.Instance` |
| `<Canvas>` | Camera + Scene |
| `<mesh>` | GameObject + MeshRenderer |
| `z-index` | Canvas Render Order / Sorting Layers |

---

*Generated: 2026-04-27*  
*Plan Version: 1.0*