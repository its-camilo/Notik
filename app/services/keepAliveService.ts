import { KEEP_ALIVE_CONFIG } from '@/constants/KeepAliveConfig';

interface KeepAliveConfig {
  serverUrl: string;
  endpoint: string;
  intervalMinutes: number;
  timeoutMs: number;
  userAgent: string;
}

class KeepAliveService {
  private intervalId: number | null = null;
  private config: KeepAliveConfig;
  private isRunning = false;

  constructor() {
    // Usar la configuración del archivo de constantes
    this.config = {
      serverUrl: KEEP_ALIVE_CONFIG.serverUrl,
      endpoint: KEEP_ALIVE_CONFIG.endpoint,
      intervalMinutes: KEEP_ALIVE_CONFIG.intervalMinutes,
      timeoutMs: KEEP_ALIVE_CONFIG.timeoutMs,
      userAgent: KEEP_ALIVE_CONFIG.userAgent
    };
  }

  /**
   * Actualizar la configuración del servicio
   */
  updateConfig(newConfig: Partial<KeepAliveConfig>) {
    this.config = { ...this.config, ...newConfig };
    
    // Si el servicio está corriendo, reiniciarlo con la nueva configuración
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  /**
   * Realizar una petición keep-alive al servidor
   */
  private async makeKeepAliveRequest(): Promise<void> {
    try {
      const startTime = Date.now();
      const url = `${this.config.serverUrl}${this.config.endpoint}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': this.config.userAgent,
          'Accept': 'application/json',
        },
        // @ts-ignore - React Native fetch tiene algunas diferencias
        timeout: this.config.timeoutMs,
      });

      const duration = Date.now() - startTime;
      const timestamp = new Date().toISOString();

      if (KEEP_ALIVE_CONFIG.enableLogs) {
        if (response.ok) {
          console.log(`[${timestamp}] ✅ Keep-alive request successful (${duration}ms) - Status: ${response.status}`);
        } else {
          console.warn(`[${timestamp}] ⚠️ Keep-alive request failed - Status: ${response.status}`);
        }
      }
    } catch (error) {
      if (KEEP_ALIVE_CONFIG.enableLogs) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ❌ Keep-alive request error:`, error);
      }
    }
  }

  /**
   * Iniciar el servicio de keep-alive
   */
  start(): void {
    if (this.isRunning) {
      if (KEEP_ALIVE_CONFIG.enableLogs) {
        console.warn('Keep-alive service is already running');
      }
      return;
    }

    if (KEEP_ALIVE_CONFIG.enableLogs) {
      console.log(`🚀 Starting keep-alive service for ${this.config.serverUrl}${this.config.endpoint}`);
      console.log(`⏰ Making requests every ${this.config.intervalMinutes} minutes`);
    }

    // Hacer una petición inicial inmediatamente
    this.makeKeepAliveRequest();

    // Configurar el intervalo
    const intervalMs = this.config.intervalMinutes * 60 * 1000;
    this.intervalId = setInterval(() => {
      this.makeKeepAliveRequest();
    }, intervalMs);

    this.isRunning = true;
    
    if (KEEP_ALIVE_CONFIG.enableLogs) {
      console.log('💚 Keep-alive service started successfully');
    }
  }

  /**
   * Detener el servicio de keep-alive
   */
  stop(): void {
    if (!this.isRunning) {
      if (KEEP_ALIVE_CONFIG.enableLogs) {
        console.warn('Keep-alive service is not running');
      }
      return;
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    
    if (KEEP_ALIVE_CONFIG.enableLogs) {
      console.log('🔴 Keep-alive service stopped');
    }
  }

  /**
   * Verificar si el servicio está corriendo
   */
  getStatus(): { isRunning: boolean; config: KeepAliveConfig } {
    return {
      isRunning: this.isRunning,
      config: { ...this.config }
    };
  }

  /**
   * Realizar una petición manual (útil para testing)
   */
  async ping(): Promise<boolean> {
    try {
      await this.makeKeepAliveRequest();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Instancia singleton
const keepAliveService = new KeepAliveService();

export default keepAliveService;
export type { KeepAliveConfig };
