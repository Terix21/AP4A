import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import GameCanvas from '../world/GameCanvas';
import { SaveSystem } from '../../systems/SaveSystem';
import { TickSystem } from '../../systems/TickSystem';
import { NotificationSystem } from '../../systems/NotificationSystem';
import { useGameStore } from '../../store/gameStore';
import { X, Cpu } from 'lucide-react';
import { App } from '@capacitor/app';
import { HapticFeedback } from '../../systems/HapticFeedback';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavigationBar } from '@awesome-cordova-plugins/navigation-bar'; // Or use a direct Capacitor plugin if preferred, but usually requires additional install.
// Note: For standard Capacitor we usually use CSS + StatusBar.

interface UILayoutControllerProps {
  children: ReactNode;
}

export default function UILayoutController({ children }: UILayoutControllerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const selectedEntityId = useGameStore(state => state.selectedEntityId);
  const setSelectedEntity = useGameStore(state => state.setSelectedEntity);
  const activeQueues = useGameStore(state => state.activeQueues);
  const [prevQueuesLength, setPrevQueuesLength] = useState(activeQueues.length);

  // Hardware Back Button Listener
  useEffect(() => {
    const handleBackButton = async () => {
      try {
        await App.addListener('backButton', ({ canGoBack }) => {
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          } else if (selectedEntityId) {
            setSelectedEntity(null);
          } else if (location.pathname !== '/dashboard') {
            navigate('/dashboard');
          } else {
            App.exitApp();
          }
        });
      } catch (e) {
        console.warn('[UILayoutController] Back button listener failed (browser mode)', e);
      }
    };
    handleBackButton();
  }, [mobileMenuOpen, selectedEntityId, location.pathname, navigate, setSelectedEntity]);

  // Task Completion Haptics & Autosave
  useEffect(() => {
    if (activeQueues.length < prevQueuesLength) {
      console.log('[UILayoutController] Queue task completed. Triggering haptic and autosave.');
      HapticFeedback.triggerSuccess();
      SaveSystem.saveToLocal(useGameStore.getState());
    }
    setPrevQueuesLength(activeQueues.length);
  }, [activeQueues, prevQueuesLength]);

  useEffect(() => {
    SaveSystem.loadOrFailover().then(() => {
      TickSystem.startEngine();
      NotificationSystem.requestPermissions();
    });

    // Native App pause / background autosave trigger
    const registerAppStateListener = async () => {
      try {
        const handler = await App.addListener('appStateChange', ({ isActive }) => {
          if (!isActive) {
            console.log('[App] Application minimized/paused. Triggering autosave and stopping engine.');
            SaveSystem.saveToLocal(useGameStore.getState());
            TickSystem.stopEngine();
          } else {
            console.log('[App] Application resumed. Starting engine.');
            TickSystem.startEngine();
          }
        });
        return handler;
      } catch (e) {
        console.warn('[UILayoutController] Failed to bind native appStateChange listener (running in browser)', e);
        return null;
      }
    };

    const stateListenerPromise = registerAppStateListener();

    // Programmatic StatusBar styling for Android
    const configureStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#030712' });
        await StatusBar.setOverlaysWebView({ overlay: true });
      } catch (e) {
        console.warn('[UILayoutController] StatusBar plugin failed (running in browser)', e);
      }
    };
    configureStatusBar();

    // Block native context menus (long-press popups)
    const preventDefaultContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener('contextmenu', preventDefaultContextMenu);

    // Global Click Haptics for interactive elements
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('pointer-events-auto') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        HapticFeedback.triggerSelection();
      }
    };
    window.addEventListener('click', handleGlobalClick);

    return () => {
      TickSystem.stopEngine();
      window.removeEventListener('contextmenu', preventDefaultContextMenu);
      window.removeEventListener('click', handleGlobalClick);
      stateListenerPromise.then((handler) => {
        if (handler) {
          handler.remove();
        }
      });
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

              {/* Floating Context Panel */}
              {selectedEntityId && (
                <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 pointer-events-auto w-64 bg-gray-900/95 backdrop-blur-xl border border-cyan-900/50 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-cyan-400 flex items-center">
                      <Cpu className="w-4 h-4 mr-2"/>
                      {selectedEntityId.replace('-', ' ')}
                    </h4>
                    <button onClick={() => setSelectedEntity(null)} className="text-gray-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Facility selected. Double-click the structure to open management console.</p>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest border-t border-gray-800 pt-2">Status: Operational</div>
                </div>
              )}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
