import { useState } from 'react';
import { useGameStore, GameState } from '../store/gameStore';
import { ScavengeManager } from '../systems/ScavengeManager';
import { Plane, Pickaxe, Navigation, Cpu } from 'lucide-react';

export default function Operations() {
  const scrap = useGameStore((state: GameState) => state.scrap);
  const buildingMats = useGameStore((state: GameState) => state.buildingMats);
  const salvagedComponents = useGameStore((state: GameState) => state.salvagedComponents);
  const drones = useGameStore((state: GameState) => state.drones);
  const unlockedSectors = useGameStore((state: GameState) => state.unlockedSectors);
  const activeQueues = useGameStore((state: GameState) => state.activeQueues);
  const queueTask = useGameStore((state: GameState) => state.queueTask);
  const addScrap = useGameStore((state: GameState) => state.addScrap);
  const addMats = useGameStore((state: GameState) => state.addMats);

  const [selectedSector, setSelectedSector] = useState<string>('sector-7');

  const scavengeTasks = activeQueues.filter(q => q.type === 'scavenge');
  const expansionTasks = activeQueues.filter(q => q.type === 'build');

  const handleDeployDrone = () => {
    if (drones > scavengeTasks.length) {
      // Mock MTBF and Difficulty
      ScavengeManager.initiateRun(selectedSector, 85, 20);
    }
  };

  const handleDueDiligence = () => {
    // Mock expansion cost
    if (scrap >= 150 && buildingMats >= 300) {
      addScrap(-150);
      addMats(-300);
      queueTask({
        id: crypto.randomUUID(),
        type: 'build',
        timeRemainingMs: 3 * 60 * 60 * 1000, // 3 hours
        totalTimeMs: 3 * 60 * 60 * 1000,
        payload: { sectorId: `sector-${unlockedSectors.length + 7}` }
      });
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Operations Command
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Deploy drones for automated scavenging and initiate Due Diligence for base expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Scavenging Panel */}
        <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-cyan-400 flex items-center mb-4">
            <Plane className="w-5 h-5 mr-2" /> Automated Scavenging
          </h3>
          <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800 mb-4">
            <div className="text-sm text-gray-400 mb-2">Inventory</div>
            <div className="text-2xl font-bold text-white flex items-center">
              <Cpu className="w-5 h-5 text-cyan-500 mr-2" /> {salvagedComponents} Salvaged Components
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="text-sm text-gray-300">
              <span className="font-semibold text-white">Available Drones:</span> {drones - scavengeTasks.length} / {drones}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Target Sector</label>
              <select 
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500"
              >
                {unlockedSectors.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
              </select>
            </div>
            <div className="text-xs text-gray-500 bg-gray-950/50 p-3 rounded border border-gray-800">
              <div className="flex justify-between"><span>MTBF Status:</span> <span className="text-green-400">85% Optimal</span></div>
              <div className="flex justify-between"><span>Contamination Risk:</span> <span className="text-yellow-400">Moderate</span></div>
            </div>
          </div>

          <button 
            onClick={handleDeployDrone}
            disabled={drones - scavengeTasks.length <= 0}
            className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-cyan-500 hover:bg-cyan-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Deploy Drone
          </button>
        </div>

        {/* Expansion Panel */}
        <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-emerald-400 flex items-center mb-4">
            <Navigation className="w-5 h-5 mr-2" /> Base Expansion
          </h3>
          <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800 mb-4">
            <div className="text-sm text-gray-400 mb-2">Expansion Status</div>
            <div className="text-sm font-medium text-white flex flex-wrap gap-2">
              {unlockedSectors.map(s => (
                <span key={s} className="px-2 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-800 rounded">{s.toUpperCase()}</span>
              ))}
            </div>
          </div>

          <div className="space-y-4 flex-1">
             <div className="bg-gray-950/50 p-4 rounded border border-gray-800 text-sm">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Pickaxe className="w-4 h-4 mr-2 text-gray-400" /> Due Diligence Assessment
                </h4>
                <p className="text-gray-400 text-xs mb-3">Clear physical barriers (bollards, collapsed fencing) to secure the next adjacent sector.</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Scrap Cost:</span>
                    <span className={scrap >= 150 ? 'text-white' : 'text-red-400'}>150 / {Math.floor(scrap)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Materials Cost:</span>
                    <span className={buildingMats >= 300 ? 'text-white' : 'text-red-400'}>300 / {Math.floor(buildingMats)}</span>
                  </div>
                </div>
             </div>
          </div>

          <button 
            onClick={handleDueDiligence}
            disabled={scrap < 150 || buildingMats < 300 || expansionTasks.length > 0}
            className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-emerald-500 hover:bg-emerald-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {expansionTasks.length > 0 ? 'Assessment in Progress...' : 'Initiate Due Diligence'}
          </button>
        </div>

      </div>
    </div>
  );
}
