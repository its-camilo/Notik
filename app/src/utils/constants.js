/**
 * Configuración global de la aplicación
 *
 * IMPORTANTE: Este archivo ahora importa de config/environment.ts
 * Para cambiar las URLs de frontend o backend, edita:
 * app/config/environment.ts
 */

import {
  FRONTEND_URL,
  BACKEND_URL,
  API_URL,
  ADMIN_URL,
  ENV_INFO,
  TIMEOUT_CONFIG,
  DEFAULT_HEADERS,
  DEBUG_CONFIG,
  CODESPACES_PORTS,
} from '@/config/environment';

/**
 * Exportación principal de configuración
 * Mantiene compatibilidad con código existente
 */
export const ENV = {
  // Información del entorno
  ENVIRONMENT: ENV_INFO.FRONTEND_ENV, // o usa una lógica combinada si prefieres
  IS_CODESPACES: ENV_INFO.IS_CODESPACES_FRONTEND || ENV_INFO.IS_CODESPACES_BACKEND,
  IS_LOCAL: ENV_INFO.IS_LOCALHOST_FRONTEND && ENV_INFO.IS_LOCALHOST_BACKEND,

  // URLs dinámicas (desde config/environment.ts)
  FRONTEND_URL,
  API_URL,
  ADMIN_URL,
  BASE_URL: BACKEND_URL,

  // Configuración de red
  TIMEOUT: TIMEOUT_CONFIG.REQUEST_TIMEOUT,

  // Headers por defecto
  DEFAULT_HEADERS,

  // Configuración de Keep Alive
  KEEP_ALIVE: {
    INTERVAL: TIMEOUT_CONFIG.KEEP_ALIVE_INTERVAL,
    ENDPOINT: '/',
    ENABLED: true,
  },

  // Debug
  DEBUG: DEBUG_CONFIG.ENABLED,
  VERBOSE_LOGS: DEBUG_CONFIG.VERBOSE_LOGS,

  // Configuración específica de Codespaces
  CODESPACES: {
    PORTS: CODESPACES_PORTS,
  },

  // Información adicional de entornos
  ENV_INFO, // Exporta toda la info para casos avanzados
};

/**
 * Re-exportar para facilitar importaciones directas
 */
export {
  FRONTEND_URL,
  BACKEND_URL,
  API_URL,
  ADMIN_URL,
  ENV_INFO,
  TIMEOUT_CONFIG,
  DEFAULT_HEADERS,
  DEBUG_CONFIG,
  CODESPACES_PORTS,
};
