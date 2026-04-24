import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import UILayoutController from './components/layout/UILayoutController';
import SectorDashboard from './pages/SectorDashboard';
import Login from './pages/Login';
import { IdentityProvider, useIdentity } from './components/auth/IdentityProvider';

import Facilities from './pages/Facilities';
import TradePost from './pages/TradePost';
import TechTree from './pages/TechTree';
import Security from './pages/Security';
import Operations from './pages/Operations';
import Armory from './pages/Armory';

function ProtectedLayout() {
  const { user } = useIdentity();
  const navigate = useNavigate();

  // Global Macros
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch(e.key.toLowerCase()) {
        case 't': navigate('/trade'); break;
        case 's': navigate('/security'); break;
        case 'o': navigate('/operations'); break;
        case 'd': navigate('/dashboard'); break;
        case 'a': navigate('/armory'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UILayoutController>
      <Outlet />
    </UILayoutController>
  );
}

export default function App() {
  return (
    <IdentityProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<SectorDashboard />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="trade" element={<TradePost />} />
            <Route path="tech" element={<TechTree />} />
            <Route path="security" element={<Security />} />
            <Route path="operations" element={<Operations />} />
            <Route path="armory" element={<Armory />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </IdentityProvider>
  );
}
