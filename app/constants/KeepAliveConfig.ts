/**
 * Configuración del servicio Keep-Alive
 * Importa la URL del backend desde la configuración central
 */

import { BACKEND_URL, TIMEOUT_CONFIG, ENV_INFO } from '@/config/environment';

export const KEEP_ALIVE_CONFIG = {
  serverUrl: BACKEND_URL,
  endpoint: '/',
  intervalMinutes: Math.floor(TIMEOUT_CONFIG.KEEP_ALIVE_INTERVAL / 60000), // Convertir ms a minutos
  timeoutMs: TIMEOUT_CONFIG.REQUEST_TIMEOUT,
  userAgent: 'Notik-App/1.0',
  enableLogs: true,
  autoStart: true,

  // Información del entorno (útil para debugging)
  _envInfo: {
    backendEnv: ENV_INFO.BACKEND_ENV,
    isProduction: ENV_INFO.IS_PRODUCTION_BACKEND,
  },
} as const;

export type KeepAliveConfigType = typeof KEEP_ALIVE_CONFIG;
