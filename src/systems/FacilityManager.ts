import { useGameStore } from '../store/gameStore';

export type Role = 'Owner' | 'Steward' | 'Processor' | 'Custodian' | 'Unassigned';
export type FacilityType = 'SynthFarm' | 'Smelter' | 'DataHub';

export interface Survivor {
  id: string;
  name: string;
  role: Role;
  assignedFacility: FacilityType | null;
}

// Initial mock data
let localSurvivors: Survivor[] = [
  { id: '1', name: 'Jaxon', role: 'Owner', assignedFacility: 'SynthFarm' },
  { id: '2', name: 'Aria', role: 'Processor', assignedFacility: 'Smelter' },
  { id: '3', name: 'Zane', role: 'Custodian', assignedFacility: null },
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

    // Owners and Stewards increase output
    const synthFarmBoosters = localSurvivors.filter(s => s.assignedFacility === 'SynthFarm' && (s.role === 'Owner' || s.role === 'Steward')).length;
    const smelterBoosters = localSurvivors.filter(s => s.assignedFacility === 'Smelter' && (s.role === 'Owner' || s.role === 'Steward')).length;

    newScrapRate = newScrapRate * (1 + (0.2 * synthFarmBoosters));
    newMatsRate = newMatsRate * (1 - (0.2 * smelterBoosters)); // Reduce the negative draw

    useGameStore.setState({ scrapRatePerHour: newScrapRate, matsRatePerHour: newMatsRate });
  }
};
