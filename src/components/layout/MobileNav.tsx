import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function MobileNav({ isOpen, toggle }: MobileNavProps) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Trade', path: '/trade' },
    { name: 'Tech', path: '/tech' },
  ];

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        <h1 className="text-md font-bold text-cyan-400 tracking-widest uppercase">Aether Protocol</h1>
        <button
          type="button"
          className="p-2 -mr-2 text-gray-400 hover:text-white focus:outline-none"
          onClick={toggle}
        >
          <span className="sr-only">Open menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-xl border-b border-gray-700">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggle}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-cyan-900/50 text-cyan-300'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
