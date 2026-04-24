import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import GameCanvas from '../world/GameCanvas';
import { SaveSystem } from '../../systems/SaveSystem';

import { TickSystem } from '../../systems/TickSystem';

interface UILayoutControllerProps {
  children: ReactNode;
}

export default function UILayoutController({ children }: UILayoutControllerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    SaveSystem.loadOrFailover().then(() => {
      TickSystem.startEngine();
    });

    return () => {
      TickSystem.stopEngine();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950 font-sans text-gray-50">
      {/* Z-0: The 3D World */}
      <GameCanvas />

      {/* Z-10: The HUD Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col pt-safe pb-safe">
        
        {/* Mobile Top Nav */}
        <div className="lg:hidden flex-shrink-0 pointer-events-auto">
          <MobileNav isOpen={mobileMenuOpen} toggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0 pointer-events-auto bg-gray-900/60 backdrop-blur-md border-r border-gray-800">
            <Sidebar />
          </div>

          {/* Main Content Area (HUD) */}
          <main className="flex-1 relative overflow-y-auto pointer-events-none">
            <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
              {/* React children need pointer events auto to be clickable */}
              <div className="pointer-events-auto h-full w-full">
                {children}
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
