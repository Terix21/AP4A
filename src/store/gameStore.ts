import { create } from 'zustand';

export interface QueuedTask {
  id: string;
  type: 'research' | 'build' | 'train' | 'scavenge';
  timeRemainingMs: number;
  totalTimeMs: number;
  payload?: any;
}

export interface GameState {
  scrap: number;
  buildingMats: number;
  credits: number;
  unlockedSectors: string[];
  unlockedTech: string[];
  playerCoordinates: [number, number, number];
  activeQueues: QueuedTask[];
  
  threatLevel: number;
  drones: number;
  droneHealth: number; // 0-100
  
  cameraView: 'base' | 'world';
  selectedEntityId: string | null;
  activePath: [number, number, number][] | null;
  dronePosition: [number, number, number];
  navigationRequest: string | null;

  salvagedComponents: number;
  systemOverloadRisk: number;

  gameTimeHours: number;
  facilityLevels: Record<string, number>;
  activeSLAs: number; // For Trade Post
  creditsPerHour: number;

  // Base rates per hour
  scrapRatePerHour: number;
  matsRatePerHour: number;

  addScrap: (amount: number) => void;
  addMats: (amount: number) => void;
  addCredits: (amount: number) => void;
  removeScrapPercentage: (percentage: number) => void;
  setPlayerCoordinates: (coords: [number, number, number]) => void;
  unlockSector: (sectorId: string) => void;
  unlockTech: (techId: string) => void;
  setThreatLevel: (level: number) => void;
  setDrones: (count: number, health: number) => void;
  addSalvagedComponents: (amount: number) => void;
  setSystemOverloadRisk: (risk: number) => void;
  setGameTimeHours: (hours: number) => void;
  setCameraView: (view: 'base' | 'world') => void;
  setSelectedEntity: (id: string | null) => void;
  setActivePath: (path: [number, number, number][] | null) => void;
  setDronePosition: (pos: [number, number, number]) => void;
  requestNavigation: (path: string | null) => void;
  upgradeFacility: (facility: string) => void;
  addActiveSLA: (creditsPerHourBonus: number) => void;
  
  queueTask: (task: QueuedTask) => void;
  advanceTime: (elapsedMs: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  scrap: 450,
  buildingMats: 1200,
  credits: 100,
  unlockedSectors: ['sector-7'],
  unlockedTech: [],
  playerCoordinates: [0, 0, 0],
  activeQueues: [],
  
  threatLevel: 0,
  drones: 1,
  droneHealth: 100,
  salvagedComponents: 0,
  systemOverloadRisk: 0,
  
  cameraView: 'base',
  selectedEntityId: null,
  activePath: null,
  dronePosition: [0, 0, 0],
  navigationRequest: null,
  
  gameTimeHours: 6.0, // Start at 06:00
  facilityLevels: {
    'Synth-Farm': 1,
    'Scrap Smelter': 1,
    'Comms Relay': 1,
    'Armory': 1
  },
  activeSLAs: 0,
  creditsPerHour: 0,

  scrapRatePerHour: 12,
  matsRatePerHour: -5,
  
  addScrap: (amount) => set((state) => ({ scrap: Math.max(0, state.scrap + amount) })),
  addMats: (amount) => set((state) => ({ buildingMats: Math.max(0, state.buildingMats + amount) })),
  addCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits + amount) })),
  removeScrapPercentage: (percentage) => set((state) => ({ scrap: Math.max(0, state.scrap - (state.scrap * percentage)) })),
  setPlayerCoordinates: (coords) => set({ playerCoordinates: coords }),
  unlockSector: (sectorId) => set((state) => ({
    unlockedSectors: state.unlockedSectors.includes(sectorId) ? state.unlockedSectors : [...state.unlockedSectors, sectorId]
  })),
  unlockTech: (techId) => set((state) => ({
    unlockedTech: state.unlockedTech.includes(techId) ? state.unlockedTech : [...state.unlockedTech, techId]
  })),
  setThreatLevel: (level) => set({ threatLevel: Math.max(0, Math.min(100, level)) }),
  setDrones: (count, health) => set({ drones: Math.max(0, count), droneHealth: Math.max(0, Math.min(100, health)) }),
  addSalvagedComponents: (amount) => set((state) => ({ salvagedComponents: Math.max(0, state.salvagedComponents + amount) })),
  setSystemOverloadRisk: (risk) => set({ systemOverloadRisk: Math.max(0, Math.min(100, risk)) }),
  
  setGameTimeHours: (hours) => set({ gameTimeHours: hours % 28 }),
  setCameraView: (view) => set({ cameraView: view }),
  setSelectedEntity: (id) => set({ selectedEntityId: id }),
  setActivePath: (path) => set({ activePath: path }),
  setDronePosition: (pos) => set({ dronePosition: pos }),
  requestNavigation: (path) => set({ navigationRequest: path }),

  upgradeFacility: (facility) => set((state) => ({
    facilityLevels: { ...state.facilityLevels, [facility]: (state.facilityLevels[facility] || 1) + 1 }
  })),
  addActiveSLA: (bonus) => set((state) => ({ activeSLAs: state.activeSLAs + 1, creditsPerHour: state.creditsPerHour + bonus })),

  queueTask: (task) => set((state) => ({
    activeQueues: [...state.activeQueues, task]
  })),

  advanceTime: (elapsedMs) => set((state) => {
    const hoursElapsed = elapsedMs / (1000 * 60 * 60);
    const newScrap = Math.max(0, state.scrap + (state.scrapRatePerHour * hoursElapsed));
    const newMats = Math.max(0, state.buildingMats + (state.matsRatePerHour * hoursElapsed));
    const newCredits = Math.max(0, state.credits + (state.creditsPerHour * hoursElapsed));

    const finishedQueues = state.activeQueues.filter(q => q.timeRemainingMs - elapsedMs <= 0);
    const updatedQueues = state.activeQueues.map(q => ({
      ...q,
      timeRemainingMs: Math.max(0, q.timeRemainingMs - elapsedMs)
    })).filter(q => q.timeRemainingMs > 0);

    let newSalvaged = state.salvagedComponents;
    const newUnlockedTech = [...state.unlockedTech];
    const newUnlockedSectors = [...state.unlockedSectors];

    finishedQueues.forEach(q => {
      if (q.type === 'research' && q.payload?.techId) {
        if (!newUnlockedTech.includes(q.payload.techId)) {
          newUnlockedTech.push(q.payload.techId);
        }
      }
      if (q.type === 'scavenge') {
        if (q.payload?.isSuccess) {
          newSalvaged += 10; // Base scavenge yield
        }
      }
      if (q.type === 'build' && q.payload?.sectorId) {
        if (!newUnlockedSectors.includes(q.payload.sectorId)) {
          newUnlockedSectors.push(q.payload.sectorId);
        }
      }
    });

    return {
      scrap: newScrap,
      buildingMats: newMats,
      credits: newCredits,
      salvagedComponents: newSalvaged,
      activeQueues: updatedQueues,
      unlockedTech: newUnlockedTech,
      unlockedSectors: newUnlockedSectors
    };
  })
}));
