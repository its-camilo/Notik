/**
 * API de autenticación
 *
 * Maneja todas las peticiones relacionadas con autenticación
 * (login, registro, obtener usuario actual, etc.)
 */

import { httpClient } from '../client';
import { transformAuthResponse, transformStrapiUser } from '../transformers';
import type {
  StrapiAuthResponse,
  StrapiUser,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from '../types';
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

/**
 * Endpoints de autenticación de Strapi
 */
const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/local',
  REGISTER: '/api/auth/local/register',
  ME: '/api/users/me',
} as const;

/**
 * API de autenticación
 */
class AuthApi {
  /**
   * Inicia sesión con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const payload: LoginPayload = {
      identifier: credentials.email,
      password: credentials.password,
    };

    const response = await httpClient.post<StrapiAuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      payload
    );

    return transformAuthResponse(response);
  }

  /**
   * Registra un nuevo usuario
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const payload: RegisterPayload = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };

    const response = await httpClient.post<StrapiAuthResponse>(
      AUTH_ENDPOINTS.REGISTER,
      payload
    );

    return transformAuthResponse(response);
  }

  /**
   * Obtiene el usuario actual usando el token
   */
  async getCurrentUser(token: string): Promise<User> {
    const response = await httpClient.get<StrapiUser>(AUTH_ENDPOINTS.ME, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return transformStrapiUser(response);
  }

  /**
   * Verifica si un token es válido haciendo una petición al servidor
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.getCurrentUser(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}

/**
 * Instancia singleton de la API de autenticación
 */
export const authApi = new AuthApi();
