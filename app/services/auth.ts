/**
 * Servicio de autenticación
 *
 * Proporciona funciones de alto nivel para autenticación
 * utilizando la API modular de auth.
 *
 * REFACTORIZADO: Ahora usa arquitectura modular con:
 * - API separada (authApi)
 * - Gestión de tokens (tokenService)
 * - Manejo de errores tipado
 * - Cliente HTTP con interceptors
 */

import type { AuthResponse, User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { authApi, tokenService } from '@/api/auth';
import { BACKEND_URL } from '@/config/environment';
import { AuthenticationError } from '@/api/errors';

/**
 * @deprecated Use BACKEND_URL from config/environment instead
 */
export const SERVER_URL = BACKEND_URL;

/**
 * Obtiene el token del storage
 * @deprecated Use tokenService.getToken() instead
 */
export const getToken = async (): Promise<string | null> => {
  return tokenService.getToken();
};

/**
 * Guarda el token en el storage
 * @deprecated Use tokenService.setToken() instead
 */
export const setToken = async (token: string): Promise<void> => {
  return tokenService.setToken(token);
};

/**
 * Elimina el token del storage
 * @deprecated Use tokenService.removeToken() instead
 */
export const removeToken = async (): Promise<void> => {
  return tokenService.removeToken();
};

/**
 * Registra un nuevo usuario
 */
export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await authApi.register(credentials);

    // Guardar el token automáticamente
    await tokenService.setToken(response.jwt);

    return response;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

/**
 * Inicia sesión con email y contraseña
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await authApi.login(credentials);

    // Guardar el token automáticamente
    await tokenService.setToken(response.jwt);

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logout = async (): Promise<void> => {
  try {
    await tokenService.clearAuth();
  } catch (error) {
    console.error('Error en logout:', error);
    throw error;
  }
};

/**
 * Obtiene el usuario actual
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = await tokenService.getToken();

    if (!token) {
      return null;
    }

    try {
      const user = await authApi.getCurrentUser(token);
      return user;
    } catch (error) {
      // Si el token es inválido, limpiarlo
      if (error instanceof AuthenticationError) {
        await tokenService.removeToken();
      }
      return null;
    }
  } catch (error) {
    console.error('Error obteniendo usuario actual:', error);
    return null;
  }
};

/**
 * Verifica si el token actual es válido
 */
export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = await tokenService.getToken();

    if (!token) {
      return false;
    }

    // Verificar con el servidor
    return await authApi.verifyToken(token);
  } catch (error) {
    console.error('Error verificando token:', error);
    return false;
  }
};
