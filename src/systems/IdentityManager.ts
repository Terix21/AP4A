export type AuthProvider = 'Google' | 'Apple' | 'Local';

export interface UserProfile {
  uuid: string;
  name: string;
  provider: AuthProvider;
  lastLoginAt: number;
  linkedAccounts?: AuthProvider[];
}

const LOCAL_PROFILES_KEY = 'neon_scrap_local_profiles';

export const IdentityManager = {
  // Get list of local profiles
  getLocalProfiles(): UserProfile[] {
    const data = localStorage.getItem(LOCAL_PROFILES_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Create a new local profile
  createLocalProfile(name: string): UserProfile {
    const profiles = this.getLocalProfiles();
    const newProfile: UserProfile = { 
      uuid: crypto.randomUUID(), 
      name, 
      provider: 'Local',
      lastLoginAt: Date.now()
    };
    profiles.push(newProfile);
    localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(profiles));
    return newProfile;
  },

  async mockLogin(provider: AuthProvider, identifier: string | UserProfile): Promise<UserProfile> {
    try {
      if (provider !== 'Local') {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      
      if (!identifier) {
        throw new Error('Authentication failed: Missing identifier.');
      }
      
      if (provider === 'Local') {
        if (typeof identifier === 'string') {
          return this.createLocalProfile(identifier);
        } else {
          const profile = { ...identifier, lastLoginAt: Date.now() };
          // Note: In a real implementation we would save the updated lastLoginAt to localStorage here
          return profile;
        }
      }
      
      const uuid = crypto.randomUUID();
      return { 
        uuid, 
        name: identifier as string, 
        provider,
        lastLoginAt: Date.now(),
        linkedAccounts: [provider]
      };
    } catch (error) {
      console.error('[IdentityManager] Authentication failed:', error);
      throw error;
    }
  },
  
  logout(): void {
    // Clear session
  }
};
