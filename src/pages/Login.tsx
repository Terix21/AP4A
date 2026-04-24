import { useState, useEffect } from 'react';
import { ShieldAlert, LogIn, Monitor, UserPlus, Fingerprint } from 'lucide-react';
import { useIdentity } from '../components/auth/IdentityProvider';
import { useNavigate } from 'react-router-dom';
import { IdentityManager, UserProfile, AuthProvider } from '../systems/IdentityManager';

export default function Login() {
  const { login } = useIdentity();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<AuthProvider | null>(null);
  const [showLocalOptions, setShowLocalOptions] = useState(false);
  const [localProfiles, setLocalProfiles] = useState<UserProfile[]>([]);
  const [newLocalName, setNewLocalName] = useState('');
  const [acceptedToS, setAcceptedToS] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canLogin = acceptedToS && acceptedPrivacy && loading === null;

  useEffect(() => {
    setLocalProfiles(IdentityManager.getLocalProfiles());
  }, []);

  const handleCloudLogin = async (provider: 'Google' | 'Apple') => {
    setLoading(provider);
    await login(provider, 'Sector Commander');
    setLoading(null);
    navigate('/dashboard');
  };

  const handleLocalLogin = async (identifier: string | UserProfile) => {
    if (typeof identifier === 'string' && !identifier.trim()) return;
    setLoading('Local');
    await login('Local', identifier);
    setLoading(null);
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-950 font-sans overflow-y-auto py-8">
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
        
        <div className="relative flex flex-col rounded-2xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-950 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <ShieldAlert className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-widest text-cyan-400 uppercase text-center leading-tight">Aether Protocol</h1>
            <h2 className="text-sm font-medium tracking-widest text-gray-400 mt-1 uppercase">Sector Terminal</h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-3 mb-6 bg-gray-950/50 p-4 rounded-md border border-gray-800">
              <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                <input type="checkbox" checked={acceptedToS} onChange={(e) => setAcceptedToS(e.target.checked)} className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900" />
                <span>I accept the <a href="#" className="text-cyan-500 hover:text-cyan-400 underline" onClick={e => e.stopPropagation()}>Terms of Service</a></span>
              </label>
              <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                <input type="checkbox" checked={acceptedPrivacy} onChange={(e) => setAcceptedPrivacy(e.target.checked)} className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900" />
                <span>I accept the <a href="#" className="text-cyan-500 hover:text-cyan-400 underline" onClick={e => e.stopPropagation()}>Privacy Policy</a></span>
              </label>
            </div>

            <button
              onClick={() => handleCloudLogin('Google')}
              disabled={!canLogin}
              className="group relative flex w-full justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-gray-700 hover:border-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Fingerprint className="h-5 w-5 text-gray-400 group-hover:text-white" aria-hidden="true" />
              </span>
              {loading === 'Google' ? 'Authenticating...' : 'Sign in with Google Play'}
            </button>

            <button
              onClick={() => handleCloudLogin('Apple')}
              disabled={!canLogin}
              className="group relative flex w-full justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-gray-700 hover:border-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Fingerprint className="h-5 w-5 text-gray-400 group-hover:text-white" aria-hidden="true" />
              </span>
              {loading === 'Apple' ? 'Authenticating...' : 'Sign in with Apple Game Center'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-2 text-xs text-gray-500 uppercase tracking-widest">Or</span>
              </div>
            </div>

            <button
              onClick={() => setShowLocalOptions(!showLocalOptions)}
              className="group relative flex w-full justify-center rounded-md border border-gray-700 bg-gray-950 px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:text-white focus:outline-none disabled:opacity-50"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Monitor className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" aria-hidden="true" />
              </span>
              Local Terminal Sign-in
            </button>

            {showLocalOptions && (
              <div className="mt-4 p-4 rounded-md border border-gray-800 bg-gray-950/50 space-y-4">
                <div className="text-xs text-cyan-500 font-semibold uppercase tracking-wider mb-2">Select Profile</div>
                {localProfiles.length > 0 ? (
                  <ul className="space-y-2 mb-4">
                    {localProfiles.map(profile => (
                      <li key={profile.uuid}>
                        <button
                          onClick={() => handleLocalLogin(profile)}
                          disabled={!canLogin}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 bg-gray-800 rounded hover:bg-gray-700 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>{profile.name}</span>
                          <LogIn className="h-4 w-4 text-cyan-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-gray-500 mb-4 italic">No local profiles found.</div>
                )}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newLocalName}
                    onChange={(e) => setNewLocalName(e.target.value)}
                    placeholder="New Commander Name"
                    className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    onClick={() => {
                      handleLocalLogin(newLocalName);
                      setNewLocalName('');
                    }}
                    disabled={!newLocalName.trim() || !canLogin}
                    className="flex items-center justify-center rounded-md bg-cyan-900/50 px-3 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-800/60 disabled:opacity-50 border border-cyan-800/50 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-600">
            Establishing secure connection... GlobalIdentityManager v1.1
          </div>
        </div>
      </div>
    </div>
  );
}
