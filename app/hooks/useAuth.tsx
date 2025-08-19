import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, PropsWithChildren } from 'react';
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout } from '@/services/auth';
import type { AuthState, RegisterCredentials, AuthContextValue } from '@/types/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps extends PropsWithChildren<{}> {}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  const isMountedRef = useRef(true);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      if (!isMountedRef.current) return;
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await getCurrentUser();
      if (!isMountedRef.current) return;
      if (user) setAuthState({ isAuthenticated: true, isLoading: false, user, error: null });
      else setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: null });
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      if (isMountedRef.current) {
        setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: 'Error verificando autenticación' });
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      if (!isMountedRef.current) return;
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const authData = await authLogin({ email, password });
      if (!isMountedRef.current) return;
      setAuthState({ isAuthenticated: true, isLoading: false, user: authData.user, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el login';
      if (isMountedRef.current) setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterCredentials): Promise<void> => {
    try {
      if (!isMountedRef.current) return;
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const authData = await authRegister({ username: data.username, email: data.email, password: data.password });
      if (!isMountedRef.current) return;
      setAuthState({ isAuthenticated: true, isLoading: false, user: authData.user, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el registro';
      if (isMountedRef.current) setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      if (!isMountedRef.current) return;
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await authLogout();
      if (!isMountedRef.current) return;
      setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: null });
    } catch (error) {
      console.error('Error en logout:', error);
      if (isMountedRef.current) {
        setAuthState({ isAuthenticated: false, isLoading: false, user: null, error: 'Error en logout' });
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    (async () => {
      try {
        await checkAuth();
      } catch (e) {
        // already handled inside checkAuth
      }
    })();
    return () => { isMountedRef.current = false; };
  }, [checkAuth]);

  const value = useMemo<AuthContextValue>(() => ({
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  }), [authState, login, register, logout, checkAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
