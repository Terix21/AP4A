import { useGameStore } from '../store/gameStore';

export type Role = 'Base Logistician' | 'Base Fabricator' | 'Security Commander' | 'Trade & Diplomat Agent' | 'Drone Engineer/Commander' | 'Power Systems Engineer' | 'Fabrication Specialist' | 'Unassigned';
export type FacilityType = 'Synth-Farm' | 'Scrap Smelter' | 'Comms Relay' | 'Armory';

export interface Survivor {
  id: string;
  name: string;
  role: Role;
  assignedFacility: FacilityType | null;
  level: number;
  xp: number;
  equippedGear?: string[];
}

let localSurvivors: Survivor[] = [
  { id: '1', name: 'Jaxon', role: 'Base Logistician', assignedFacility: 'Synth-Farm', level: 1, xp: 0 },
  { id: '2', name: 'Aria', role: 'Power Systems Engineer', assignedFacility: 'Comms Relay', level: 1, xp: 0 },
  { id: '3', name: 'Zane', role: 'Base Fabricator', assignedFacility: null, level: 1, xp: 0 },
];

export const FacilityManager = {
  getSurvivors() {
    return [...localSurvivors];
  },

  assignRole(survivorId: string, facility: FacilityType | null, role: Role) {
    localSurvivors = localSurvivors.map(s => {
      if (s.id === survivorId) {
        return { ...s, assignedFacility: facility, role };
      }
      return s;
    });
    this.recalculateModifiers();
  },

  recalculateModifiers() {
    let newScrapRate = 12;
    let newMatsRate = -5;
    let systemOverloadRisk = 50;

    const synthFarmBoosters = localSurvivors.filter(s => s.assignedFacility === 'Synth-Farm' && (s.role === 'Base Logistician' || s.role === 'Base Fabricator'));
    const smelterBoosters = localSurvivors.filter(s => s.assignedFacility === 'Scrap Smelter' && (s.role === 'Base Logistician' || s.role === 'Base Fabricator'));
    const powerEngineers = localSurvivors.filter(s => s.role === 'Power Systems Engineer' && s.assignedFacility !== null);

    const synthFarmBonus = synthFarmBoosters.reduce((acc, s) => acc + (0.2 + (s.level * 0.01)), 0);
    const smelterBonus = smelterBoosters.reduce((acc, s) => acc + (0.2 + (s.level * 0.01)), 0);
    const powerBonus = powerEngineers.reduce((acc, s) => acc + (25 + (s.level * 0.5)), 0);

    newScrapRate = newScrapRate * (1 + synthFarmBonus);
    newMatsRate = newMatsRate * (1 - smelterBonus);
    
    systemOverloadRisk = Math.max(0, systemOverloadRisk - powerBonus);

    useGameStore.setState({ 
      scrapRatePerHour: newScrapRate, 
      matsRatePerHour: newMatsRate,
      systemOverloadRisk
    });
  },

  grantXP(amount: number) {
    const state = useGameStore.getState();
    const unlockedTech = state.unlockedTech;
    
    let maxLevel = 25;
    if (unlockedTech.includes('tech_tier_4')) maxLevel = 100;
    else if (unlockedTech.includes('tech_tier_3')) maxLevel = 75;
    else if (unlockedTech.includes('tech_tier_2')) maxLevel = 50;

    let leveledUp = false;

    localSurvivors = localSurvivors.map(s => {
      if (s.assignedFacility && s.level < maxLevel) {
        let newXp = s.xp + amount;
        let newLevel = s.level;
        const xpRequired = s.level * 100;

        if (newXp >= xpRequired) {
          newXp -= xpRequired;
          newLevel += 1;
          leveledUp = true;
        }

        return { ...s, xp: newXp, level: newLevel };
      }
      return s;
    });

    if (leveledUp) {
      this.recalculateModifiers();
    }
  }
};
