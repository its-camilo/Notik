import { useState, useCallback, useEffect } from 'react';
import keepAliveService, { KeepAliveConfig } from '@/services/keepAliveService';

interface UseKeepAliveReturn {
  isRunning: boolean;
  config: KeepAliveConfig;
  start: () => void;
  stop: () => void;
  updateConfig: (newConfig: Partial<KeepAliveConfig>) => void;
  ping: () => Promise<boolean>;
  status: () => { isRunning: boolean; config: KeepAliveConfig };
}

/**
 * Hook personalizado para manejar el servicio de keep-alive
 * Permite controlar el servicio desde cualquier componente de la app
 */
export function useKeepAlive(): UseKeepAliveReturn {
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<KeepAliveConfig>({
    serverUrl: '',
    endpoint: '',
    intervalMinutes: 0,
    timeoutMs: 0,
    userAgent: ''
  });

  // Actualizar el estado cuando el componente se monte
  useEffect(() => {
    const status = keepAliveService.getStatus();
    setIsRunning(status.isRunning);
    setConfig(status.config);
  }, []);

  const start = useCallback(() => {
    keepAliveService.start();
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    keepAliveService.stop();
    setIsRunning(false);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<KeepAliveConfig>) => {
    keepAliveService.updateConfig(newConfig);
    const status = keepAliveService.getStatus();
    setConfig(status.config);
  }, []);

  const ping = useCallback(async (): Promise<boolean> => {
    return await keepAliveService.ping();
  }, []);

  const status = useCallback(() => {
    return keepAliveService.getStatus();
  }, []);

  return {
    isRunning,
    config,
    start,
    stop,
    updateConfig,
    ping,
    status
  };
}
