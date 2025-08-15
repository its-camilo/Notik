/**
 * Configuración del servicio Keep-Alive
 */

export const KEEP_ALIVE_CONFIG = {
  serverUrl: "https://supportive-fireworks-d01261f76f.strapiapp.com",
  endpoint: "/",
  intervalMinutes: 10, // 10 minutos
  timeoutMs: 10000, // 10 segundos
  userAgent: "Notik-App/1.0",
  enableLogs: true,
  autoStart: true, // Booleano de autostart
} as const;

export type KeepAliveConfigType = typeof KEEP_ALIVE_CONFIG;
