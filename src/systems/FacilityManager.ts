import { useGameStore } from '../store/gameStore';

export type Role = 'Base Logistician' | 'Base Fabricator' | 'Security Commander' | 'Trade & Diplomat Agent' | 'Drone Engineer/Commander' | 'Power Systems Engineer' | 'Fabrication Specialist' | 'Unassigned';
export type FacilityType = 'Synth-Farm' | 'Scrap Smelter' | 'Comms Relay';

export interface Survivor {
  id: string;
  name: string;
  role: Role;
  assignedFacility: FacilityType | null;
}

let localSurvivors: Survivor[] = [
  { id: '1', name: 'Jaxon', role: 'Base Logistician', assignedFacility: 'Synth-Farm' },
  { id: '2', name: 'Aria', role: 'Power Systems Engineer', assignedFacility: 'Comms Relay' },
  { id: '3', name: 'Zane', role: 'Base Fabricator', assignedFacility: null },
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
    let systemOverloadRisk = 50; // Base risk

    // Base Logisticians and Fabricators increase output
    const synthFarmBoosters = localSurvivors.filter(s => s.assignedFacility === 'Synth-Farm' && (s.role === 'Base Logistician' || s.role === 'Base Fabricator')).length;
    const smelterBoosters = localSurvivors.filter(s => s.assignedFacility === 'Scrap Smelter' && (s.role === 'Base Logistician' || s.role === 'Base Fabricator')).length;
    const powerEngineers = localSurvivors.filter(s => s.role === 'Power Systems Engineer' && s.assignedFacility !== null).length;

    newScrapRate = newScrapRate * (1 + (0.2 * synthFarmBoosters));
    newMatsRate = newMatsRate * (1 - (0.2 * smelterBoosters)); // Reduce the negative draw
    
    systemOverloadRisk = Math.max(0, systemOverloadRisk - (powerEngineers * 25));

    useGameStore.setState({ 
      scrapRatePerHour: newScrapRate, 
      matsRatePerHour: newMatsRate,
      systemOverloadRisk
    });
  }
};
