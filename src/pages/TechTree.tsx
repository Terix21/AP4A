import { Cpu, Lock, Unlock, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { TechManager, AvailableTechs } from '../systems/TechManager';

export default function TechTree() {
  const unlockedTech = useGameStore(state => state.unlockedTech);
  const activeQueues = useGameStore(state => state.activeQueues);
  const scrap = useGameStore(state => state.scrap);
  const credits = useGameStore(state => state.credits);

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto overflow-y-auto pb-24">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Research & Development
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Invest resources into discovering new technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AvailableTechs.map(tech => {
          const isUnlocked = unlockedTech.includes(tech.id);
          const activeTask = activeQueues.find(q => q.type === 'research' && q.payload?.techId === tech.id);
          
          const hasPrereqs = tech.prerequisites.every(p => unlockedTech.includes(p));
          const canAfford = scrap >= tech.costScrap && credits >= tech.costCredits;
          
          return (
            <div key={tech.id} className={`p-5 rounded-xl border backdrop-blur-md shadow-xl ${isUnlocked ? 'bg-emerald-950/40 border-emerald-900/50' : 'bg-gray-900/80 border-gray-700/50'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-bold flex items-center ${isUnlocked ? 'text-emerald-400' : 'text-gray-200'}`}>
                  <Cpu className="w-5 h-5 mr-2" />
                  {tech.name}
                </h3>
                {isUnlocked ? <Unlock className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-gray-500" />}
              </div>
              
              <p className="text-sm text-gray-400 mb-4 h-10">{tech.description}</p>
              
              {!isUnlocked && !activeTask && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Cost:</span>
                    <span>{tech.costScrap} Scrap, {tech.costCredits} CR</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Time:</span>
                    <span>{tech.researchTimeMs / (1000 * 60 * 60)} Hours</span>
                  </div>
                  <button 
                    onClick={() => TechManager.startResearch(tech.id)}
                    disabled={!hasPrereqs || !canAfford}
                    className="w-full bg-cyan-900/50 hover:bg-cyan-800/50 disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-700 text-cyan-100 py-2 rounded text-sm transition-colors border border-cyan-700/50"
                  >
                    {!hasPrereqs ? 'Prerequisites Missing' : !canAfford ? 'Insufficient Funds' : 'Start Research'}
                  </button>
                </div>
              )}

              {activeTask && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-emerald-400 mb-1">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> Researching...</span>
                    <span>{Math.ceil(activeTask.timeRemainingMs / (1000 * 60))} mins left</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${100 - (activeTask.timeRemainingMs / activeTask.totalTimeMs) * 100}%` }}></div>
                  </div>
                </div>
              )}
              
              {isUnlocked && (
                <div className="mt-4 text-center text-sm text-emerald-500 font-semibold bg-emerald-950/50 py-2 rounded">
                  Technology Researched
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
