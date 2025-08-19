import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthResponse, User, LoginCredentials, RegisterCredentials } from '@/types/auth';

/**
 * Servidor base de Strapi - constante global
 */
export const SERVER_URL = 'https://supportive-fireworks-d01261f76f.strapiapp.com' as const;

/**
 * Key para el token de autenticación
 */
const AUTH_TOKEN_KEY = 'authToken' as const;

/**
 * Interfaz para la respuesta de autenticación de Strapi
 */
export interface StrapiAuthResponse {
  readonly jwt: string;
  readonly user: {
    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly name?: string;
    readonly provider: string;
    readonly confirmed: boolean;
    readonly blocked: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  };
}

/**
 * Interfaz para datos de registro (internal API format)
 */
export interface RegisterData {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

/**
 * Transform Strapi response to app User type
 */
const transformStrapiUser = (strapiUser: StrapiAuthResponse['user']): User => ({
  id: strapiUser.id,
  username: strapiUser.username,
  email: strapiUser.email,
  provider: strapiUser.provider,
  confirmed: strapiUser.confirmed,
  blocked: strapiUser.blocked,
  createdAt: strapiUser.createdAt,
  updatedAt: strapiUser.updatedAt,
});

/**
 * Wrapper para el storage que funciona tanto en web como React Native
 */
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return globalThis.localStorage?.getItem(key) || null;
    }
    return AsyncStorage.getItem(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.setItem(key, value);
      return;
    }
    return AsyncStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.removeItem(key);
      return;
    }
    return AsyncStorage.removeItem(key);
  },
} as const;

/**
 * Helper para obtener el token del storage
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await storage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Helper para guardar el token en el storage
 */
export const setToken = async (token: string): Promise<void> => {
  try {
    await storage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error guardando token:', error);
  }
};

/**
 * Helper para remover el token del storage
 */
export const removeToken = async (): Promise<void> => {
  try {
    await storage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removiendo token:', error);
  }
};

/**
 * Función para registrar un nuevo usuario en Strapi
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error en el registro');
    }

    const authData: StrapiAuthResponse = await response.json();

    // Guardar el token automáticamente
    await setToken(authData.jwt);

    // Return properly typed response
    return {
      jwt: authData.jwt,
      user: transformStrapiUser(authData.user),
    };
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

/**
 * Función para hacer login en Strapi
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Strapi exige el campo "identifier"; usamos el email directamente.
    const payload = { identifier: credentials.email, password: credentials.password };
    const response = await fetch(`${SERVER_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error en el login');
    }

    const authData: StrapiAuthResponse = await response.json();

    // Guardar el token automáticamente
    await setToken(authData.jwt);

    // Return properly typed response
    return {
      jwt: authData.jwt,
      user: transformStrapiUser(authData.user),
    };
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

/**
 * Función para hacer logout
 */
export const logout = async (): Promise<void> => {
  try {
    await removeToken();
  } catch (error) {
    console.error('Error en logout:', error);
  }
};

/**
 * Función para obtener el usuario actual desde Strapi
 * Usa la validación canónica del servidor
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${SERVER_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Token inválido o expirado
      if (response.status === 401) {
        await removeToken();
      }
      return null;
    }

    const userData = await response.json();
    return transformStrapiUser(userData);
  } catch (error) {
    console.error('Error obteniendo usuario actual:', error);
    return null;
  }
};

/**
 * Función para verificar si el token es válido
 * Fallback: decodifica JWT y verifica expiración
 */
export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = await getToken();

    if (!token) {
      return false;
    }

    // Validación canónica: llamar al servidor
    const user = await getCurrentUser();
    if (user) {
      return true;
    }

    // Fallback: verificar expiración del JWT localmente
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp > currentTime) {
        return true;
      }
    } catch (jwtError) {
      console.error('Error decodificando JWT:', jwtError);
    }

    return false;
  } catch (error) {
    console.error('Error verificando token:', error);
    return false;
  }
};
