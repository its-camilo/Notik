/**
 * Configuración modular de entornos para Notik
 *
 * Permite configurar frontend y backend independientemente
 * entre localhost, codespaces y producción.
 */

/**
 * Tipos de entorno disponibles
 */
export type Environment = 'localhost' | 'codespaces' | 'production';

/**
 * Configuración de URLs por entorno
 */
interface EnvironmentUrls {
  frontend: string;
  backend: string;
}

/**
 * Definición de URLs para cada entorno
 */
const ENVIRONMENT_URLS: Record<Environment, EnvironmentUrls> = {
  // Localhost - Desarrollo local
  localhost: {
    frontend: 'http://localhost:8081',
    backend: 'http://localhost:1337',
  },

  // GitHub Codespaces - Desarrollo en la nube
  codespaces: {
    frontend: 'https://vigilant-spoon-5959j4vqjjr3v9xq.github.dev',
    backend: 'https://vigilant-spoon-5959j4vqjjr3v9xq-1337.app.github.dev',
  },

  // Producción - Strapi Cloud
  production: {
    frontend: 'https://notik.app', // Cambiar cuando tengas dominio de producción
    backend: 'https://supportive-fireworks-d01261f76f.strapiapp.com',
  },
} as const;

/**
 * ⚙️ CONFIGURACIÓN PRINCIPAL
 *
 * Aquí puedes seleccionar qué entorno usar para frontend y backend
 * de manera independiente. Por ejemplo:
 * - Frontend en localhost + Backend en production
 * - Frontend en codespaces + Backend en production
 * - Ambos en localhost
 * - Ambos en codespaces
 * - Ambos en production
 */
const CONFIG = {
  // Selecciona el entorno para el FRONTEND
  FRONTEND_ENV: 'codespaces' as Environment,

  // Selecciona el entorno para el BACKEND
  BACKEND_ENV: 'production' as Environment,
} as const;

/**
 * URLs configuradas según la selección anterior
 */
export const FRONTEND_URL = ENVIRONMENT_URLS[CONFIG.FRONTEND_ENV].frontend;
export const BACKEND_URL = ENVIRONMENT_URLS[CONFIG.BACKEND_ENV].backend;

/**
 * URLs de API derivadas del backend
 */
export const API_URL = `${BACKEND_URL}/api`;
export const ADMIN_URL = `${BACKEND_URL}/admin`;

/**
 * Información del entorno actual
 */
export const ENV_INFO = {
  FRONTEND_ENV: CONFIG.FRONTEND_ENV,
  BACKEND_ENV: CONFIG.BACKEND_ENV,
  FRONTEND_URL,
  BACKEND_URL,
  API_URL,
  ADMIN_URL,

  // Helpers para detectar el entorno
  IS_LOCALHOST_FRONTEND: CONFIG.FRONTEND_ENV === 'localhost',
  IS_CODESPACES_FRONTEND: CONFIG.FRONTEND_ENV === 'codespaces',
  IS_PRODUCTION_FRONTEND: CONFIG.FRONTEND_ENV === 'production',

  IS_LOCALHOST_BACKEND: CONFIG.BACKEND_ENV === 'localhost',
  IS_CODESPACES_BACKEND: CONFIG.BACKEND_ENV === 'codespaces',
  IS_PRODUCTION_BACKEND: CONFIG.BACKEND_ENV === 'production',
} as const;

/**
 * Configuración de timeouts según el entorno del backend
 */
export const TIMEOUT_CONFIG = {
  // Codespaces puede ser más lento
  REQUEST_TIMEOUT: CONFIG.BACKEND_ENV === 'codespaces' ? 15000 : 10000,

  // Keep-alive intervals
  KEEP_ALIVE_INTERVAL: CONFIG.BACKEND_ENV === 'codespaces' ? 15 * 60 * 1000 : 10 * 60 * 1000,
} as const;

/**
 * Headers por defecto para peticiones
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

/**
 * Configuración de debug
 */
export const DEBUG_CONFIG = {
  ENABLED: true,
  VERBOSE_LOGS: CONFIG.BACKEND_ENV === 'codespaces' || CONFIG.FRONTEND_ENV === 'codespaces',
} as const;

/**
 * Información de puertos de Codespaces (referencia)
 */
export const CODESPACES_PORTS = {
  FRONTEND: 8081,
  BACKEND: 1337,
  EXPO_METRO: 19000,
  EXPO_DEVTOOLS: 19001,
  WEB_PREVIEW: 3000,
} as const;

/**
 * Función helper para obtener todas las URLs disponibles
 * Útil para debugging o mostrar en UI
 */
export const getAllEnvironmentUrls = () => ENVIRONMENT_URLS;

/**
 * Logging de configuración (solo en debug)
 */
if (DEBUG_CONFIG.ENABLED) {
  console.log('🌍 Environment Configuration');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📱 Frontend: ${CONFIG.FRONTEND_ENV.toUpperCase()}`);
  console.log(`   └─ URL: ${FRONTEND_URL}`);
  console.log(`🔧 Backend:  ${CONFIG.BACKEND_ENV.toUpperCase()}`);
  console.log(`   ├─ URL: ${BACKEND_URL}`);
  console.log(`   ├─ API: ${API_URL}`);
  console.log(`   └─ Admin: ${ADMIN_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (DEBUG_CONFIG.VERBOSE_LOGS) {
    console.log('🔍 Full config:', ENV_INFO);
  }
}
