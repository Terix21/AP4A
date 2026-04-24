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
  droneHealth: number;

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

  queueTask: (task) => set((state) => ({
    activeQueues: [...state.activeQueues, task]
  })),

  advanceTime: (elapsedMs) => set((state) => {
    const hoursElapsed = elapsedMs / (1000 * 60 * 60);
    const newScrap = Math.max(0, state.scrap + (state.scrapRatePerHour * hoursElapsed));
    const newMats = Math.max(0, state.buildingMats + (state.matsRatePerHour * hoursElapsed));

    const finishedQueues = state.activeQueues.filter(q => q.timeRemainingMs - elapsedMs <= 0);
    const updatedQueues = state.activeQueues.map(q => ({
      ...q,
      timeRemainingMs: Math.max(0, q.timeRemainingMs - elapsedMs)
    })).filter(q => q.timeRemainingMs > 0);

    const newUnlockedTech = [...state.unlockedTech];
    finishedQueues.forEach(q => {
      if (q.type === 'research' && q.payload?.techId) {
        if (!newUnlockedTech.includes(q.payload.techId)) {
          newUnlockedTech.push(q.payload.techId);
        }
      }
    });

    return {
      scrap: newScrap,
      buildingMats: newMats,
      activeQueues: updatedQueues,
      unlockedTech: newUnlockedTech
    };
  })
}));
