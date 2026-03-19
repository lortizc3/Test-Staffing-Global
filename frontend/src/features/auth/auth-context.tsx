import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../../api/auth.api';
import { storage } from '../../utils/storage';
import type { User } from '../../types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setIsBootstrapping(false);
      return;
    }

    authApi
      .me()
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        storage.clearToken();
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsBootstrapping(false));
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isBootstrapping,
      login: (nextToken, nextUser) => {
        storage.setToken(nextToken);
        setToken(nextToken);
        setUser(nextUser);
      },
      logout: async () => {
        await authApi.logout().catch(() => undefined);
        storage.clearToken();
        setToken(null);
        setUser(null);
      },
      setUser,
    }),
    [isBootstrapping, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
