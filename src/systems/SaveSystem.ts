import { useGameStore, GameState } from '../store/gameStore';
import { TickSystem } from './TickSystem';

export interface GameSaveData {
  timestamp: number;
  checksum: string;
  state: Pick<GameState, 'scrap' | 'buildingMats' | 'credits' | 'unlockedSectors' | 'unlockedTech' | 'playerCoordinates' | 'activeQueues' | 'threatLevel' | 'drones' | 'droneHealth' | 'scrapRatePerHour' | 'matsRatePerHour' | 'salvagedComponents' | 'systemOverloadRisk'>;
}

const STORAGE_KEY = 'neon_scrap_save_data';

function generateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16);
}

export const SaveSystem = {
  async fetchFromCloud(): Promise<GameSaveData> {
    await new Promise((resolve) => setTimeout(resolve, 600)); 
    const state = {
      scrap: 450,
      buildingMats: 1200,
      credits: 100,
      unlockedSectors: ['sector-7'],
      unlockedTech: [],
      playerCoordinates: [0, 0, 0] as [number, number, number],
      activeQueues: [],
      threatLevel: 0,
      drones: 1,
      droneHealth: 100,
      salvagedComponents: 0,
      systemOverloadRisk: 0,
      scrapRatePerHour: 12,
      matsRatePerHour: -5,
    };
    const data = { timestamp: Date.now(), state };
    return { ...data, checksum: generateChecksum(JSON.stringify(data)) };
  },

  async syncToCloud(data: Omit<GameSaveData, 'checksum'>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const payload = btoa(JSON.stringify(data));
    console.log(`[SaveSystem] Synced to cloud: ${payload}`);
  },

  saveToLocal(state: GameSaveData['state']): GameSaveData {
    const timestamp = Date.now();
    const saveState = { timestamp, state };
    const checksum = generateChecksum(JSON.stringify(saveState));
    
    const fullSave: GameSaveData = { ...saveState, checksum };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullSave));
    return fullSave;
  },

  async loadOrFailover(): Promise<void> {
    const raw = localStorage.getItem(STORAGE_KEY);
    let finalData: GameSaveData;
    
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as GameSaveData;
        const stateWithoutChecksum = { timestamp: parsed.timestamp, state: parsed.state };
        const calculatedChecksum = generateChecksum(JSON.stringify(stateWithoutChecksum));
        
        if (calculatedChecksum === parsed.checksum) {
          // Compare with cloud timestamp for conflict resolution
          const cloudData = await this.fetchFromCloud();
          if (cloudData.timestamp > parsed.timestamp) {
            console.log('[SaveSystem] Cloud save is newer. Initiating failover sync.');
            finalData = cloudData;
          } else {
            finalData = parsed;
          }
        } else {
          console.warn('[SaveSystem] Checksum mismatch. Failover sync initiated.');
          finalData = await this.fetchFromCloud();
        }
      } catch (e) {
        console.error('[SaveSystem] Parsing failed.', e);
        finalData = await this.fetchFromCloud();
      }
    } else {
      finalData = await this.fetchFromCloud();
    }
    
    // Inject missing properties for old saves seamlessly
    const mergedState = { ...this.getDefaultState(), ...finalData.state };
    useGameStore.setState(mergedState);
    
    const elapsedMs = Date.now() - finalData.timestamp;
    TickSystem.calculateOfflineProgression(elapsedMs);
    
    this.saveToLocal(useGameStore.getState());
  },

  getDefaultState() {
    return {
      scrap: 450,
      buildingMats: 1200,
      credits: 100,
      unlockedSectors: ['sector-7'],
      unlockedTech: [],
      playerCoordinates: [0, 0, 0] as [number, number, number],
      activeQueues: [],
      threatLevel: 0,
      drones: 1,
      droneHealth: 100,
      salvagedComponents: 0,
      systemOverloadRisk: 0,
      scrapRatePerHour: 12,
      matsRatePerHour: -5,
    };
  }
};
