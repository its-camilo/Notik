/**
 * Configuración global de la aplicación
 * Detecta automáticamente si está corriendo en Codespaces o localhost
 */

// Función para detectar el entorno
function detectEnvironment() {
  // En Codespaces, process.env.CODESPACES está definido
  const isCodespaces = typeof process !== 'undefined' && process.env.CODESPACES === 'true';

  // En web, podemos verificar la URL
  const isCodespacesWeb = typeof window !== 'undefined' &&
    window.location.hostname.includes('github.dev');

  return {
    isCodespaces: isCodespaces || isCodespacesWeb,
    isLocal: !isCodespaces && !isCodespacesWeb
  };
}

const { isCodespaces, isLocal } = detectEnvironment();

// URLs base dependiendo del entorno
const getBaseURLs = () => {
  if (isCodespaces) {
    // En Codespaces, usar las URLs forwarded
    const codespacesDomain = 'ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev';
    return {
      FRONTEND_URL: `https://${codespacesDomain}`,
      BACKEND_URL: `https://${codespacesDomain.replace('github.dev', 'github.dev').replace('https://', 'https://').replace('.github.dev', '-1337.app.github.dev')}`,
      // Backup a Strapi Cloud si no funciona el forwarding
      STRAPI_CLOUD: "https://supportive-fireworks-d01261f76f.strapiapp.com"
    };
  } else {
    // Local development
    return {
      FRONTEND_URL: "http://localhost:8081",
      BACKEND_URL: "http://localhost:1337",
      STRAPI_CLOUD: "https://supportive-fireworks-d01261f76f.strapiapp.com"
    };
  }
};

const urls = getBaseURLs();

export const ENV = {
  // Información del entorno
  ENVIRONMENT: isCodespaces ? "codespaces" : isLocal ? "local" : "production",
  IS_CODESPACES: isCodespaces,
  IS_LOCAL: isLocal,

  // URLs dinámicas
  FRONTEND_URL: urls.FRONTEND_URL,

  // Backend - Preferir Strapi Cloud para estabilidad
  API_URL: `${urls.STRAPI_CLOUD}/api`,
  ADMIN_URL: `${urls.STRAPI_CLOUD}/admin`,
  BASE_URL: urls.STRAPI_CLOUD,

  // URLs alternativas para desarrollo local
  LOCAL_BACKEND_URL: urls.BACKEND_URL,
  LOCAL_API_URL: `${urls.BACKEND_URL}/api`,

  // Configuración de red
  TIMEOUT: 15000, // 15 segundos para Codespaces (conexión más lenta)

  // Headers por defecto
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Configuración de Keep Alive - Ajustada para Codespaces
  KEEP_ALIVE: {
    INTERVAL: isCodespaces ? 15 * 60 * 1000 : 10 * 60 * 1000, // 15 min en Codespaces, 10 min local
    ENDPOINT: "/",
    ENABLED: true,
  },

  // Debug - Más verboso en Codespaces
  DEBUG: true,
  VERBOSE_LOGS: isCodespaces,

  // Configuración específica de Codespaces
  CODESPACES: {
    DOMAIN: "ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev",
    PORTS: {
      FRONTEND: 8081,
      BACKEND: 1337,
      EXPO_METRO: 19000,
      EXPO_DEVTOOLS: 19001,
      WEB_PREVIEW: 3000
    }
  }
};

// Logging para debug
if (ENV.DEBUG) {
  console.log("🌍 Environment:", ENV.ENVIRONMENT);
  console.log("📱 Frontend URL:", ENV.FRONTEND_URL);
  console.log("🔗 API URL:", ENV.API_URL);
  console.log("🔗 Admin URL:", ENV.ADMIN_URL);

  if (ENV.IS_CODESPACES) {
    console.log("☁️ Running in GitHub Codespaces");
    console.log("🔗 Local Backend URL:", ENV.LOCAL_BACKEND_URL);
  }

  if (ENV.VERBOSE_LOGS) {
    console.log("🔧 Full ENV config:", ENV);
  }
}
