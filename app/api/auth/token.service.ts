/**
 * Servicio de gestión de tokens
 *
 * Maneja el almacenamiento y recuperación del token JWT
 * de forma segura y consistente.
 */

import { storageService } from '@/lib/storage';
import { isValidJwtFormat, getJwtExpirationTime } from '../transformers';

/**
 * Clave para almacenar el token en el storage
 */
const TOKEN_STORAGE_KEY = 'auth_token' as const;

/**
 * Servicio de gestión de tokens
 */
class TokenService {
  /**
   * Obtiene el token del storage
   */
  async getToken(): Promise<string | null> {
    try {
      const token = await storageService.getItem(TOKEN_STORAGE_KEY);

      if (!token) {
        return null;
      }

      // Validar formato básico
      if (!isValidJwtFormat(token)) {
        console.warn('Token con formato inválido encontrado, eliminando...');
        await this.removeToken();
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }

  /**
   * Guarda el token en el storage
   */
  async setToken(token: string): Promise<void> {
    try {
      // Validar formato antes de guardar
      if (!isValidJwtFormat(token)) {
        throw new Error('Token con formato inválido');
      }

      await storageService.setItem(TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.error('Error guardando token:', error);
      throw new Error('No se pudo guardar el token de autenticación');
    }
  }

  /**
   * Elimina el token del storage
   */
  async removeToken(): Promise<void> {
    try {
      await storageService.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error eliminando token:', error);
      throw new Error('No se pudo eliminar el token de autenticación');
    }
  }

  /**
   * Verifica si existe un token guardado
   */
  async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }

  /**
   * Obtiene información sobre el token actual
   */
  async getTokenInfo(): Promise<{
    exists: boolean;
    expiresAt: number | null;
    isExpired: boolean;
  }> {
    const token = await this.getToken();

    if (!token) {
      return {
        exists: false,
        expiresAt: null,
        isExpired: true,
      };
    }

    const expiresAt = getJwtExpirationTime(token);
    const isExpired = expiresAt ? Date.now() > expiresAt : true;

    return {
      exists: true,
      expiresAt,
      isExpired,
    };
  }

  /**
   * Limpia toda la información de autenticación
   */
  async clearAuth(): Promise<void> {
    await this.removeToken();
    // Aquí podrías limpiar otros datos relacionados con auth si los hubiera
  }
}

/**
 * Instancia singleton del servicio de tokens
 */
export const tokenService = new TokenService();
