import { useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  isTokenValid
} from '@/services/auth';
import type { AuthState, RegisterCredentials } from '@/types/auth';

/**
 * Hook personalizado para manejar el estado de autenticación
 * Proporciona funciones para login, register, logout y verificación de estado
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  /**
   * Verifica el estado de autenticación
   * Usa validación canónica del servidor
   */
  const checkAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const user = await getCurrentUser();

      if (user) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user,
          error: null,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: 'Error verificando autenticación',
      });
    }
  }, []);

  /**
   * Función para hacer login
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const authData = await authLogin({
        identifier: email, // Strapi acepta email como identifier
        password,
      });

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: authData.user,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el login';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Función para hacer registro
   */
  const register = useCallback(async (data: RegisterCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Preparar datos para Strapi (sin confirmPassword)
      const registerData = {
        username: data.username,
        email: data.email,
        password: data.password,
        name: data.name,
      };

      const authData = await authRegister(registerData);

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: authData.user,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el registro';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Función para hacer logout
   */
  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      await authLogout();

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    } catch (error) {
      console.error('Error en logout:', error);
      // Incluso si hay error, limpiamos el estado local
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: 'Error en logout',
      });
    }
  }, []);

  /**
   * Verificar autenticación al montar el componente
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  };
};
