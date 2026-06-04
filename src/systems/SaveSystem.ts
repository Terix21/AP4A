import { useGameStore, GameState } from '../store/gameStore';
import { TickSystem } from './TickSystem';
import { Preferences } from '@capacitor/preferences';

export interface GameSaveData {
  timestamp: number;
  checksum: string;
  state: Pick<GameState, 'scrap' | 'buildingMats' | 'credits' | 'unlockedSectors' | 'unlockedTech' | 'playerCoordinates' | 'activeQueues' | 'threatLevel' | 'drones' | 'droneHealth' | 'scrapRatePerHour' | 'matsRatePerHour' | 'salvagedComponents' | 'systemOverloadRisk' | 'gameTimeHours' | 'facilityLevels' | 'activeSLAs' | 'creditsPerHour' | 'survivors'>;
}

const STORAGE_KEY = 'aether_protocol_save_data';

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
    const state = this.getDefaultState();
    const data = { timestamp: Date.now(), state };
    return { ...data, checksum: generateChecksum(JSON.stringify(data)) };
  },

  async syncToCloud(data: Omit<GameSaveData, 'checksum'>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const payload = btoa(JSON.stringify(data));
    console.log(`[SaveSystem] Synced to cloud: ${payload}`);
  },

  async saveToLocal(state: GameSaveData['state']): Promise<GameSaveData> {
    const timestamp = Date.now();
    const saveState = { timestamp, state };
    const checksum = generateChecksum(JSON.stringify(saveState));
    
    const fullSave: GameSaveData = { ...saveState, checksum };

    try {
      await Preferences.set({
        key: STORAGE_KEY,
        value: JSON.stringify(fullSave),
      });
    } catch (e) {
      console.error('[SaveSystem] Preferences.set failed, falling back to localStorage', e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullSave));
    }

    return fullSave;
  },

  async loadOrFailover(): Promise<void> {
    let raw: string | null = null;
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      raw = value;
    } catch (e) {
      console.warn('[SaveSystem] Preferences.get failed, checking localStorage', e);
      raw = localStorage.getItem(STORAGE_KEY);
    }

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
    
    await this.saveToLocal(useGameStore.getState());
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
      gameTimeHours: 6.0,
      facilityLevels: { 'Synth-Farm': 1, 'Scrap Smelter': 1, 'Comms Relay': 1, 'Armory': 1 },
      activeSLAs: 0,
      creditsPerHour: 0,
      scrapRatePerHour: 12,
      matsRatePerHour: -5,
      survivors: [
        { id: '1', name: 'Jaxon', role: 'Base Logistician', assignedFacility: 'Synth-Farm', level: 1, xp: 0 },
        { id: '2', name: 'Aria', role: 'Power Systems Engineer', assignedFacility: 'Comms Relay', level: 1, xp: 0 },
        { id: '3', name: 'Zane', role: 'Base Fabricator', assignedFacility: null, level: 1, xp: 0 },
      ],
    };
  }
};
