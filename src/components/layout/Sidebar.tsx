import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, Cpu, Coins, FlaskConical, Target, Plane } from 'lucide-react';
import { useIdentity } from '../auth/IdentityProvider';

export default function Sidebar() {
  const { user, logout } = useIdentity();
  const syncStatus: string = 'synced'; // Mocked for now, will tie to Zustand later

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Facilities', path: '/facilities', icon: Cpu },
    { name: 'Trade Post', path: '/trade', icon: Coins },
    { name: 'Tech Tree', path: '/tech', icon: FlaskConical },
    { name: 'Security', path: '/security', icon: Target },
    { name: 'Operations', path: '/operations', icon: Plane },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-16 border-b border-gray-800 bg-gray-950 px-4">
        <h1 className="text-lg font-bold text-cyan-400 tracking-widest uppercase">Aether Protocol</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors pointer-events-auto ${
                  isActive
                    ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-800/50'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                }`
              }
            >
              <Icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 bg-gray-950/80 pointer-events-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">User</div>
          <button onClick={logout} className="text-xs text-gray-400 hover:text-white flex items-center">
            <LogOut className="w-3 h-3 mr-1" /> Logout
          </button>
        </div>
        <div className="text-xs text-gray-300 mb-4 truncate" title={user?.uuid}>
          {user ? `ID: ${user.uuid.split('-')[0]}...` : 'Not Authenticated'}
        </div>

        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Systems Status</div>
        <div className="flex items-center text-xs">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            syncStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' :
            syncStatus === 'error' ? 'bg-red-500' :
            'bg-green-500'
          }`}></div>
          <span className={
            syncStatus === 'syncing' ? 'text-yellow-400' :
            syncStatus === 'error' ? 'text-red-400' :
            'text-green-400'
          }>
            {syncStatus === 'syncing' ? 'Cloud Syncing...' :
             syncStatus === 'error' ? 'Sync Failed' :
             'All Systems Nominal'}
          </span>
        </div>
      </div>
    </div>
  );
}
