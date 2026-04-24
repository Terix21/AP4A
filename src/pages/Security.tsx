import { Shield, ShieldAlert, Target } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { SecurityManager } from '../systems/SecurityManager';

export default function Security() {
  const threatLevel = useGameStore(state => state.threatLevel);
  const drones = useGameStore(state => state.drones);
  const droneHealth = useGameStore(state => state.droneHealth);
  
  const defenseLevel = SecurityManager.calculateDefenseLevel();

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto overflow-y-auto pb-24">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Security Command
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Monitor threat levels and assign defense protocols against Scavenger Raids.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/80 rounded-xl border border-red-900/50 shadow-2xl backdrop-blur-md p-6">
          <h3 className="text-xl font-semibold text-red-400 flex items-center mb-6">
            <Target className="w-6 h-6 mr-2" /> 
            Threat Radar
          </h3>
          
          <div className="mb-2 flex justify-between text-sm text-gray-300">
            <span>Current Threat Level</span>
            <span className="font-bold text-red-400">{Math.floor(threatLevel)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4 mb-6">
            <div className="bg-red-500 h-4 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${threatLevel}%` }}></div>
          </div>
          
          <p className="text-xs text-gray-400">
            When Threat Level reaches 100%, a Scavenger Raid will intercept Sector 7. Ensure your Defense Level is higher than the expected attack force.
          </p>
        </div>

        <div className="bg-gray-900/80 rounded-xl border border-blue-900/50 shadow-2xl backdrop-blur-md p-6">
          <h3 className="text-xl font-semibold text-blue-400 flex items-center mb-6">
            <Shield className="w-6 h-6 mr-2" /> 
            Sector Defense
          </h3>

          <div className="space-y-4">
            <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Defense Rating</span>
              <span className="text-xl font-bold text-blue-400">{defenseLevel}</span>
            </div>
            
            <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800">
              <span className="text-gray-300 text-sm flex items-center mb-2">
                Active Drones ({drones})
              </span>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Fleet Integrity</span>
                <span className={droneHealth < 50 ? 'text-red-400' : 'text-emerald-400'}>{Math.floor(droneHealth)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1">
                <div className={`h-1 rounded-full ${droneHealth < 50 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${droneHealth}%` }}></div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                useGameStore.getState().setThreatLevel(0);
                SecurityManager.evaluateRaid();
              }}
              className="w-full bg-red-900/50 hover:bg-red-800/50 text-red-100 py-2 rounded text-sm transition-colors border border-red-700/50 flex items-center justify-center"
            >
              <ShieldAlert className="w-4 h-4 mr-2" /> Manually Trigger Raid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
