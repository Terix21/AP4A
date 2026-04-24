import { useState, useEffect } from 'react';
import { Cpu, Users } from 'lucide-react';
import { FacilityManager, Survivor, FacilityType, Role } from '../systems/FacilityManager';

export default function Facilities() {
  const [survivors, setSurvivors] = useState<Survivor[]>([]);

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
                  <div className="font-bold text-white">{survivor.name}</div>
                  <div className="text-xs text-gray-400">Current Role: {survivor.role}</div>
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
              return (
                <div key={facility} className="bg-gray-950/80 p-4 rounded-lg border border-cyan-900/50">
                  <div className="font-bold text-cyan-300">{facility}</div>
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
