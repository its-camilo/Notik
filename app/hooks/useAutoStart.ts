import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTOSTART_KEY = '@notik_keepalive_autostart';

export interface UseAutoStartReturn {
  autoStart: boolean;
  setAutoStart: (enabled: boolean) => Promise<void>;
  loading: boolean;
}

/**
 * Hook para manejar la configuración de autostart del keep-alive
 * Persiste el estado en AsyncStorage
 */
export function useAutoStart(): UseAutoStartReturn {
  const [autoStart, setAutoStartState] = useState<boolean>(true); // Default true
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar configuración al montar el componente
  useEffect(() => {
    const loadAutoStartConfig = async () => {
      try {
        const saved = await AsyncStorage.getItem(AUTOSTART_KEY);
        if (saved !== null) {
          setAutoStartState(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading autostart config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAutoStartConfig();
  }, []);

  // Función para cambiar y persistir el estado
  const setAutoStart = useCallback(async (enabled: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(AUTOSTART_KEY, JSON.stringify(enabled));
      setAutoStartState(enabled);
    } catch (error) {
      console.error('Error saving autostart config:', error);
      throw error;
    }
  }, []);

  return {
    autoStart,
    setAutoStart,
    loading
  };
}
