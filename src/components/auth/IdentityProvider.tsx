import { createContext, useContext, useState, ReactNode } from 'react';
import { IdentityManager, UserProfile, AuthProvider } from '../../systems/IdentityManager';

interface IdentityContextType {
  user: UserProfile | null;
  login: (provider: AuthProvider, identifier: string | UserProfile) => Promise<void>;
  logout: () => void;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = async (provider: AuthProvider, identifier: string | UserProfile) => {
    const profile = await IdentityManager.mockLogin(provider, identifier);
    setUser(profile);
  };

  const logout = () => {
    IdentityManager.logout();
    setUser(null);
  };

  return (
    <IdentityContext.Provider value={{ user, login, logout }}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
}
