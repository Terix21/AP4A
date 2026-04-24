import { useGameStore } from '../store/gameStore';
import { FacilityManager } from './FacilityManager';

import { SecurityManager } from './SecurityManager';

export const TickSystem = {
  // Config: how often the live game loop ticks
  TICK_INTERVAL_MS: 1000, 
  privateIntervalId: null as number | null,

  startEngine() {
    if (this.privateIntervalId !== null) return;
    
    this.privateIntervalId = window.setInterval(() => {
      const state = useGameStore.getState();

      // Time conversion: 28 in-game hours = 3600 real seconds
      const hoursToAdvance = (this.TICK_INTERVAL_MS / 1000) * (28 / 3600);
      const newTime = (state.gameTimeHours + hoursToAdvance) % 28;
      state.setGameTimeHours(newTime);

      // Advance by TICK_INTERVAL_MS
      state.advanceTime(this.TICK_INTERVAL_MS);
      
      // Grant XP to assigned units
      FacilityManager.grantXP(5);

      // Threat logic
      const isNight = newTime >= 18 || newTime < 6;
      const threatMultiplier = isNight ? 2.5 : 1.0;
      const newThreat = state.threatLevel + (SecurityManager.THREAT_INCREASE_PER_TICK * threatMultiplier);
      
      if (newThreat >= 100) {
        useGameStore.getState().setThreatLevel(0);
        SecurityManager.evaluateRaid();
      } else {
        useGameStore.getState().setThreatLevel(newThreat);
      }
    }, this.TICK_INTERVAL_MS);
    
    console.log('[TickSystem] Engine started.');
  },

  stopEngine() {
    if (this.privateIntervalId !== null) {
      clearInterval(this.privateIntervalId);
      this.privateIntervalId = null;
      console.log('[TickSystem] Engine stopped.');
    }
  },

  calculateOfflineProgression(elapsedMs: number) {
    if (elapsedMs <= 0) return;
    
    const hours = (elapsedMs / (1000 * 60 * 60)).toFixed(2);
    console.log(`[TickSystem] Calculating offline progression for ${hours} hours...`);
    
    // Advance the game state instantly
    useGameStore.getState().advanceTime(elapsedMs);
  }
};
