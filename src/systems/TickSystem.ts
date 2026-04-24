import { useGameStore } from '../store/gameStore';

import { SecurityManager } from './SecurityManager';

export const TickSystem = {
  // Config: how often the live game loop ticks
  TICK_INTERVAL_MS: 1000, 
  privateIntervalId: null as number | null,

  startEngine() {
    if (this.privateIntervalId !== null) return;
    
    this.privateIntervalId = window.setInterval(() => {
      // Advance by TICK_INTERVAL_MS
      useGameStore.getState().advanceTime(this.TICK_INTERVAL_MS);

      // Threat logic
      const state = useGameStore.getState();
      const newThreat = state.threatLevel + SecurityManager.THREAT_INCREASE_PER_TICK;
      
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
