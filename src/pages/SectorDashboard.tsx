import { Activity, Zap, AlertTriangle } from 'lucide-react';
import { useGameStore, GameState } from '../store/gameStore';

export default function SectorDashboard() {
  const scrap = useGameStore((state: GameState) => state.scrap);
  const buildingMats = useGameStore((state: GameState) => state.buildingMats);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Sector Command Overview
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Monitor your facilities, survivors, and current risk factors.
        </p>
      </div>

      {/* Multi-panel Grid as HUD Overlays */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 flex-1 content-start pointer-events-none">
        
        {/* Panel 1: Production (Synth-Farm / Smelter) */}
        <div className="pointer-events-auto bg-gray-900/60 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md flex flex-col">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700/50 flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-cyan-400 flex items-center drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              <Zap className="w-4 h-4 mr-2" /> Storage Inventory
            </h3>
          </div>
          <div className="p-4 sm:p-6 flex-1 space-y-4">
            <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800/50">
              <div className="text-sm text-gray-400 mb-1">Scrap (Data Hub)</div>
              <div className="text-2xl font-bold text-white">{scrap.toLocaleString()} <span className="text-sm font-normal text-green-400">+12/hr</span></div>
            </div>
            <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800/50">
              <div className="text-sm text-gray-400 mb-1">Building Mats (Smelter)</div>
              <div className="text-2xl font-bold text-white">{buildingMats.toLocaleString()} <span className="text-sm font-normal text-yellow-400">-5/hr</span></div>
            </div>
          </div>
        </div>

        {/* Panel 2: Survivors & Roles */}
        <div className="pointer-events-auto bg-gray-900/60 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md flex flex-col">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700/50 flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-emerald-400 flex items-center drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
              <Activity className="w-4 h-4 mr-2" /> Active Personnel
            </h3>
          </div>
          <div className="p-4 sm:p-6 flex-1">
            <ul className="divide-y divide-gray-800/50">
              {['Steward', 'Processor', 'Custodian', 'Owner'].map((role, idx) => (
                <li key={role} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-gray-600'}`}></div>
                    <span className="text-sm font-medium text-gray-200">{role}</span>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-gray-800/80 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-600/50">
                    {idx === 0 ? 'Assigned' : 'Idle'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel 3: Risk Simulation Alerts */}
        <div className="pointer-events-auto bg-gray-900/60 rounded-xl border border-red-900/50 shadow-2xl backdrop-blur-md flex flex-col">
          <div className="px-4 py-5 sm:px-6 border-b border-red-900/30 bg-red-950/30 flex justify-between items-center rounded-t-xl">
            <h3 className="text-base font-semibold leading-6 text-red-400 flex items-center drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">
              <AlertTriangle className="w-4 h-4 mr-2" /> Key Risk Factors
            </h3>
          </div>
          <div className="p-4 sm:p-6 flex-1 space-y-4">
            <div className="relative pl-8 pb-4 border-l border-gray-800/50">
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_#eab308]"></div>
              <p className="text-sm text-yellow-300 font-medium drop-shadow-sm">Thermal Shutdown Risk</p>
              <p className="text-xs text-gray-400 mt-1">Smelter running at 85% capacity.</p>
            </div>
            <div className="relative pl-8 border-l border-gray-800/50">
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444] animate-pulse"></div>
              <p className="text-sm text-red-300 font-medium drop-shadow-sm">Memory Leak Detected</p>
              <p className="text-xs text-gray-400 mt-1">Data Hub requires Custodian intervention.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
