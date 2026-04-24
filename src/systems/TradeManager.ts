import { useGameStore } from '../store/gameStore';

export const TradeManager = {
  sellScrap(amount: number) {
    const state = useGameStore.getState();
    if (state.scrap >= amount) {
      const creditsEarned = Math.floor(amount / 10);
      state.addScrap(-amount);
      state.addCredits(creditsEarned);
      return true;
    }
    return false;
  },

  buyScrap(amount: number) {
    const state = useGameStore.getState();
    const cost = Math.ceil(amount / 10) * 2;
    if (state.credits >= cost) {
      state.addCredits(-cost);
      state.addScrap(amount);
      return true;
    }
    return false;
  },

  sellMats(amount: number) {
    const state = useGameStore.getState();
    if (state.buildingMats >= amount) {
      const creditsEarned = Math.floor(amount / 5);
      state.addMats(-amount);
      state.addCredits(creditsEarned);
      return true;
    }
    return false;
  },

  buyMats(amount: number) {
    const state = useGameStore.getState();
    const cost = Math.ceil(amount / 5) * 2;
    if (state.credits >= cost) {
      state.addCredits(-cost);
      state.addMats(amount);
      return true;
    }
    return false;
  }
};
