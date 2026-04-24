import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import UILayoutController from './components/layout/UILayoutController';
import SectorDashboard from './pages/SectorDashboard';
import Login from './pages/Login';
import { IdentityProvider, useIdentity } from './components/auth/IdentityProvider';

import Facilities from './pages/Facilities';
import TradePost from './pages/TradePost';
import TechTree from './pages/TechTree';
import Security from './pages/Security';
import Operations from './pages/Operations';

function ProtectedLayout() {
  const { user } = useIdentity();

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
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </IdentityProvider>
  );
}
