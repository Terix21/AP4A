import { useState, useEffect } from 'react';
import { Cpu, Users, ArrowUpCircle } from 'lucide-react';
import { FacilityManager, Survivor, FacilityType, Role } from '../systems/FacilityManager';
import { useGameStore } from '../store/gameStore';

export default function Facilities() {
  const [survivors, setSurvivors] = useState<Survivor[]>([]);
  const facilityLevels = useGameStore(state => state.facilityLevels);
  const unlockedTech = useGameStore(state => state.unlockedTech);
  const upgradeFacility = useGameStore(state => state.upgradeFacility);
  const scrap = useGameStore(state => state.scrap);
  const addScrap = useGameStore(state => state.addScrap);

  useEffect(() => {
    setSurvivors(FacilityManager.getSurvivors());
    FacilityManager.recalculateModifiers();
  }, []);

  const handleAssign = (survivorId: string, facility: string, role: string) => {
    const fac = facility === '' ? null : (facility as FacilityType);
    FacilityManager.assignRole(survivorId, fac, role as Role);
    setSurvivors(FacilityManager.getSurvivors());
  };

  const facilities: FacilityType[] = ['Synth-Farm', 'Scrap Smelter', 'Comms Relay'];

  const getFacilityMaxLevel = () => {
    if (unlockedTech.includes('tech_tier_4')) return 60;
    if (unlockedTech.includes('tech_tier_3')) return 45;
    if (unlockedTech.includes('tech_tier_2')) return 30;
    return 15; // default for Tier 1
  };

  const handleUpgrade = (facility: FacilityType) => {
    const currentLevel = facilityLevels[facility] || 1;
    const cost = currentLevel * 100;
    if (scrap >= cost && currentLevel < getFacilityMaxLevel()) {
      addScrap(-cost);
      upgradeFacility(facility);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Facility Management
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Assign personnel to manage resource yields and mitigate risks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6">
          <h3 className="text-lg font-semibold text-emerald-400 flex items-center mb-4">
            <Users className="w-5 h-5 mr-2" /> Roster
          </h3>
          <div className="space-y-4">
            {survivors.map(survivor => (
              <div key={survivor.id} className="bg-gray-950/80 p-4 rounded-lg border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <div className="font-bold text-white">{survivor.name} <span className="text-emerald-500 text-xs ml-1">Lvl {survivor.level}</span></div>
                  <div className="text-xs text-gray-400">Current Role: {survivor.role} | XP: {Math.floor(survivor.xp)}/{survivor.level * 100}</div>
                </div>
                <div className="flex space-x-2">
                  <select 
                    value={survivor.assignedFacility || ''} 
                    onChange={(e) => handleAssign(survivor.id, e.target.value, survivor.role)}
                    className="bg-gray-800 text-xs text-white border border-gray-600 rounded p-1"
                  >
                    <option value="">Unassigned</option>
                    {facilities.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <select 
                    value={survivor.role} 
                    onChange={(e) => handleAssign(survivor.id, survivor.assignedFacility || '', e.target.value)}
                    className="bg-gray-800 text-xs text-white border border-gray-600 rounded p-1"
                  >
                    {['Base Logistician', 'Base Fabricator', 'Security Commander', 'Trade & Diplomat Agent', 'Drone Engineer/Commander', 'Power Systems Engineer', 'Fabrication Specialist', 'Unassigned'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6">
           <h3 className="text-lg font-semibold text-cyan-400 flex items-center mb-4">
            <Cpu className="w-5 h-5 mr-2" /> Sectors Overview
          </h3>
          <div className="space-y-4">
            {facilities.map(facility => {
              const assigned = survivors.filter(s => s.assignedFacility === facility);
              const level = facilityLevels[facility] || 1;
              const maxLevel = getFacilityMaxLevel();
              const upgradeCost = level * 100;

              return (
                <div key={facility} className="bg-gray-950/80 p-4 rounded-lg border border-cyan-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-cyan-300">{facility} <span className="text-xs text-emerald-500 border border-emerald-900 px-1 rounded ml-2">Lvl {level}</span></div>
                    <button 
                      onClick={() => handleUpgrade(facility)}
                      disabled={level >= maxLevel || scrap < upgradeCost}
                      className="text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white px-2 py-1 rounded border border-gray-700 transition-colors flex items-center"
                    >
                      <ArrowUpCircle className="w-3 h-3 mr-1" />
                      {level >= maxLevel ? 'Max Level' : `Upgrade (${upgradeCost} Scrap)`}
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {assigned.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {assigned.map(s => <li key={s.id}>{s.name} <span className="text-gray-500">({s.role})</span></li>)}
                      </ul>
                    ) : (
                      <span className="text-gray-600 italic">No personnel assigned.</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
