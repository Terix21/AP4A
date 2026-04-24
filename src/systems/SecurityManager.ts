import { useGameStore } from '../store/gameStore';
import { FacilityManager } from './FacilityManager';

export const SecurityManager = {
  THREAT_INCREASE_PER_TICK: 0.5, // Threat goes from 0 to 100

  calculateDefenseLevel() {
    const state = useGameStore.getState();
    const custodians = FacilityManager.getSurvivors().filter(s => s.role === 'Security Commander');
    
    // Each drone gives 10 defense. Each commander gives 5 base defense + 2 per level.
    // Plus Hero Gear (e.g. Aetherium Pulse Rifle = 50 + kinetic barrier = level * 2).
    let defense = (state.drones * 10);
    
    custodians.forEach(c => {
      // Base stats
      defense += 5 + (c.level * 2);
      
      // Hero Gear (Assumed always equipped if Tier 4 is unlocked)
      if (state.unlockedTech.includes('tech_tier_4')) {
        defense += 50; // Pulse Rifle
        defense += (c.level * 2); // Kinetic Barrier
      }
    });
    
    // Tech boost
    if (state.unlockedTech.includes('tech_security_1')) {
      defense += 20;
    }
    
    return defense;
  },

  evaluateRaid() {
    const state = useGameStore.getState();
    const defense = this.calculateDefenseLevel();
    // Random Raid Attack Level between 10 and 100
    const attackLevel = Math.floor(Math.random() * 90) + 10;
    
    console.log(`[SecurityManager] Raid Alert! Attack Level: ${attackLevel}, Defense: ${defense}`);

    if (attackLevel > defense) {
      // Failed to defend.
      const difference = attackLevel - defense;
      const percentageLoss = (difference / 2) / 100;
      
      state.removeScrapPercentage(percentageLoss);

      // Drone damage
      if (state.drones === 1) {
        state.setDrones(1, state.droneHealth - 45);
      } else if (state.drones > 1) {
        const dronesLost = Math.max(1, Math.floor(state.drones * 0.25));
        state.setDrones(state.drones - dronesLost, state.droneHealth);
      }

      console.log(`[SecurityManager] Raid Failed! Lost ${(percentageLoss*100).toFixed(1)}% Scrap. Drones impacted.`);
      return false;
    } else {
      console.log(`[SecurityManager] Raid Defeated! No losses.`);
      return true;
    }
  }
};
