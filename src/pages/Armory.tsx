import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { FacilityManager, Survivor } from '../systems/FacilityManager';
import { Shield, Sword, Lock } from 'lucide-react';

export default function Armory() {
  const unlockedTech = useGameStore(state => state.unlockedTech);
  const facilityLevels = useGameStore(state => state.facilityLevels);
  const [survivors, setSurvivors] = useState<Survivor[]>([]);

  useEffect(() => {
    setSurvivors(FacilityManager.getSurvivors());
  }, []);

  const isUnlocked = unlockedTech.includes('tech_tier_4');
  const level = facilityLevels['Armory'] || 1;

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center pointer-events-auto">
        <Lock className="w-16 h-16 text-gray-700 mb-4" />
        <h2 className="text-2xl font-bold text-gray-500 mb-2">Armory Locked</h2>
        <p className="text-gray-600">Requires Sector Tech Tier IV to be researched.</p>
      </div>
    );
  }

  const commanders = survivors.filter(s => s.role === 'Security Commander');

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto overflow-y-auto pb-24">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Guardian Armory
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Equip your Security Commanders with Guardian Hero Gear. Requires 20 Power to operate.
        </p>
        <div className="mt-2 text-xs text-emerald-500 bg-emerald-950/50 inline-block px-3 py-1 rounded border border-emerald-900/50">
          Armory Level {level}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commanders.length === 0 ? (
          <div className="col-span-full p-8 border border-dashed border-gray-700 rounded-xl text-center text-gray-500">
            No Security Commanders assigned. Assign crew members in Facilities to access Hero Loadouts.
          </div>
        ) : (
          commanders.map(commander => (
            <div key={commander.id} className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">{commander.name}</h3>
                  <div className="text-sm text-emerald-400">Security Commander (Level {commander.level})</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Combat XP</div>
                  <div className="text-sm font-bold text-white">{Math.floor(commander.xp)} / {commander.level * 100}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center"><Sword className="w-4 h-4 mr-2"/> Primary Weapon</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Aetherium Pulse Rifle</span>
                    <span className="text-xs text-green-400">+50 Defense</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Standard issue plasma containment device. Levels with the Guardian.</p>
                </div>
                
                <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center"><Shield className="w-4 h-4 mr-2"/> Tactical Gear</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Kinetic Barrier Generator</span>
                    <span className="text-xs text-green-400">+{(commander.level * 2)} Defense</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Defense rating scales linearly with Guardian Level.</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
