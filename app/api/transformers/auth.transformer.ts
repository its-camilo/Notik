/**
 * Transformadores de datos para la API de autenticación
 *
 * Convierte datos entre el formato de Strapi y el formato
 * usado internamente en la aplicación.
 */

import type { User } from '@/types/auth';
import type { StrapiUser, StrapiAuthResponse, AuthResponse } from '../types';

/**
 * Transforma un usuario de Strapi al formato de la app
 */
export const transformStrapiUser = (strapiUser: StrapiUser): User => {
  return {
    id: strapiUser.id,
    username: strapiUser.username,
    email: strapiUser.email,
    provider: strapiUser.provider,
    confirmed: strapiUser.confirmed,
    blocked: strapiUser.blocked,
    createdAt: strapiUser.createdAt,
    updatedAt: strapiUser.updatedAt,
  };
};

/**
 * Transforma una respuesta de autenticación de Strapi al formato de la app
 */
export const transformAuthResponse = (strapiResponse: StrapiAuthResponse): AuthResponse => {
  return {
    jwt: strapiResponse.jwt,
    user: transformStrapiUser(strapiResponse.user),
  };
};

/**
 * Valida que un token JWT tenga formato válido
 */
export const isValidJwtFormat = (token: string): boolean => {
  // JWT debe tener 3 partes separadas por puntos
  const parts = token.split('.');
  return parts.length === 3;
};

/**
 * Decodifica el payload de un JWT (sin verificar firma)
 * IMPORTANTE: Solo para obtener información, NO para validar autenticación
 */
export const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    if (!isValidJwtFormat(token)) {
      return null;
    }

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

/**
 * Verifica si un JWT ha expirado (basado en el payload)
 * IMPORTANTE: Esto es solo una verificación local, siempre validar en el servidor
 */
export const isJwtExpired = (token: string): boolean => {
  const payload = decodeJwtPayload(token);

  if (!payload || typeof payload.exp !== 'number') {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Obtiene el tiempo de expiración de un JWT en milisegundos
 */
export const getJwtExpirationTime = (token: string): number | null => {
  const payload = decodeJwtPayload(token);

  if (!payload || typeof payload.exp !== 'number') {
    return null;
  }

  return payload.exp * 1000; // Convertir a milisegundos
};
