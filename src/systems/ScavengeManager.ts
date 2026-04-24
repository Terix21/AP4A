import { useGameStore } from '../store/gameStore';

export const ScavengeManager = {
  assessRun(droneMtbf: number, sectorDifficulty: number): boolean {
    // Standard stat check: Probability = (MTBF / (MTBF + Difficulty))
    const probability = (droneMtbf / (droneMtbf + sectorDifficulty));
    const roll = Math.random();
    
    console.log(`[ScavengeManager] Run Assessed. Probability: ${(probability*100).toFixed(1)}%, Roll: ${(roll*100).toFixed(1)}%`);
    
    return roll <= probability;
  },

  initiateRun(sectorId: string, droneMtbf: number, sectorDifficulty: number) {
    // Takes 2 hours (in ms)
    const totalTimeMs = 2 * 60 * 60 * 1000; 
    
    const isSuccess = this.assessRun(droneMtbf, sectorDifficulty);
    
    useGameStore.getState().queueTask({
      id: crypto.randomUUID(),
      type: 'scavenge',
      timeRemainingMs: totalTimeMs,
      totalTimeMs,
      payload: { sectorId, isSuccess }
    });
    
    console.log(`[ScavengeManager] Run initiated to ${sectorId}. Expected success: ${isSuccess}`);
  }
};
