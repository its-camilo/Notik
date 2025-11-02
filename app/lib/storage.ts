/**
 * Servicio de storage unificado para web y React Native
 *
 * Proporciona una interfaz consistente para almacenamiento
 * que funciona tanto en navegadores (localStorage) como
 * en aplicaciones nativas (AsyncStorage).
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Interfaz del servicio de storage
 */
export interface IStorageService {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * Implementación de storage para web
 */
class WebStorage implements IStorageService {
  async getItem(key: string): Promise<string | null> {
    try {
      return globalThis.localStorage?.getItem(key) || null;
    } catch (error) {
      console.error('WebStorage.getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch (error) {
      console.error('WebStorage.setItem error:', error);
      throw new Error('Failed to save item to storage');
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch (error) {
      console.error('WebStorage.removeItem error:', error);
      throw new Error('Failed to remove item from storage');
    }
  }

  async clear(): Promise<void> {
    try {
      globalThis.localStorage?.clear();
    } catch (error) {
      console.error('WebStorage.clear error:', error);
      throw new Error('Failed to clear storage');
    }
  }
}

/**
 * Implementación de storage para React Native
 */
class NativeStorage implements IStorageService {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('NativeStorage.getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('NativeStorage.setItem error:', error);
      throw new Error('Failed to save item to storage');
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('NativeStorage.removeItem error:', error);
      throw new Error('Failed to remove item from storage');
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('NativeStorage.clear error:', error);
      throw new Error('Failed to clear storage');
    }
  }
}

/**
 * Crea una instancia del storage service según la plataforma
 */
const createStorageService = (): IStorageService => {
  return Platform.OS === 'web' ? new WebStorage() : new NativeStorage();
};

/**
 * Instancia singleton del servicio de storage
 */
export const storageService: IStorageService = createStorageService();

/**
 * Helper para guardar objetos JSON
 */
export const setJSONItem = async <T>(key: string, value: T): Promise<void> => {
  const jsonValue = JSON.stringify(value);
  await storageService.setItem(key, jsonValue);
};

/**
 * Helper para obtener objetos JSON
 */
export const getJSONItem = async <T>(key: string): Promise<T | null> => {
  const jsonValue = await storageService.getItem(key);
  if (!jsonValue) return null;

  try {
    return JSON.parse(jsonValue) as T;
  } catch (error) {
    console.error('getJSONItem parse error:', error);
    return null;
  }
};
