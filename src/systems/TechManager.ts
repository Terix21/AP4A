import { useGameStore } from '../store/gameStore';

export interface TechItem {
  id: string;
  name: string;
  description: string;
  costScrap: number;
  costCredits: number;
  researchTimeMs: number;
  prerequisites: string[];
}

export const AvailableTechs: TechItem[] = [
  {
    id: 'tech_drone_ai',
    name: 'Advanced Drone AI',
    description: 'Increases Drone MTBF and reduces raid damage.',
    costScrap: 200,
    costCredits: 50,
    researchTimeMs: 1 * 60 * 60 * 1000, // 1 hour
    prerequisites: []
  },
  {
    id: 'tech_smelting',
    name: 'Plasma Smelting',
    description: 'Increases base Scrap yield by 15%.',
    costScrap: 500,
    costCredits: 100,
    researchTimeMs: 2 * 60 * 60 * 1000, // 2 hours
    prerequisites: []
  },
  {
    id: 'tech_security_1',
    name: 'Perimeter Defenses',
    description: 'Boosts base security defense against raids.',
    costScrap: 1000,
    costCredits: 200,
    researchTimeMs: 4 * 60 * 60 * 1000, // 4 hours
    prerequisites: ['tech_drone_ai']
  },
  {
    id: 'tech_tier_2',
    name: 'Sector Tech Tier II',
    description: 'Unlocks Level 30 facilities and Level 50 unit caps.',
    costScrap: 1000,
    costCredits: 300,
    researchTimeMs: 4 * 60 * 60 * 1000,
    prerequisites: ['tech_smelting']
  },
  {
    id: 'tech_tier_3',
    name: 'Sector Tech Tier III',
    description: 'Unlocks Level 45 facilities and Level 75 unit caps.',
    costScrap: 2500,
    costCredits: 800,
    researchTimeMs: 8 * 60 * 60 * 1000,
    prerequisites: ['tech_tier_2']
  },
  {
    id: 'tech_tier_4',
    name: 'Sector Tech Tier IV',
    description: 'Unlocks Level 60 facilities, Level 100 unit caps, and the Armory.',
    costScrap: 5000,
    costCredits: 2000,
    researchTimeMs: 12 * 60 * 60 * 1000,
    prerequisites: ['tech_tier_3']
  }
];

export const TechManager = {
  startResearch(techId: string) {
    const state = useGameStore.getState();
    const tech = AvailableTechs.find(t => t.id === techId);
    if (!tech) return false;

    // Check costs
    if (state.scrap < tech.costScrap || state.credits < tech.costCredits) {
      return false;
    }

    // Deduct costs
    state.addScrap(-tech.costScrap);
    state.addCredits(-tech.costCredits);

    // Queue task
    state.queueTask({
      id: crypto.randomUUID(),
      type: 'research',
      timeRemainingMs: tech.researchTimeMs,
      totalTimeMs: tech.researchTimeMs,
      payload: { techId }
    });

    return true;
  }
};
