/**
 * Tipos específicos para la API de autenticación (Strapi)
 *
 * Define la estructura de las respuestas de Strapi y los
 * datos necesarios para las peticiones de autenticación.
 */

import type { User } from '@/types/auth';

/**
 * Usuario tal como lo devuelve Strapi
 */
export interface StrapiUser {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly provider: string;
  readonly confirmed: boolean;
  readonly blocked: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name?: string;
}

/**
 * Respuesta de Strapi para autenticación (login/register)
 */
export interface StrapiAuthResponse {
  readonly jwt: string;
  readonly user: StrapiUser;
}

/**
 * Credenciales de login
 */
export interface LoginPayload {
  readonly identifier: string; // email o username
  readonly password: string;
}

/**
 * Datos para registro
 */
export interface RegisterPayload {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

/**
 * Respuesta normalizada de autenticación (para la app)
 */
export interface AuthResponse {
  readonly jwt: string;
  readonly user: User;
}

/**
 * Token guardado en storage
 */
export interface StoredToken {
  readonly token: string;
  readonly expiresAt?: number;
}
