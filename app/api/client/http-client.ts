/**
 * Cliente HTTP base para peticiones a la API
 *
 * Proporciona una interfaz consistente para hacer peticiones HTTP
 * con manejo automático de errores, timeouts, y transformación de respuestas.
 */

import { BACKEND_URL, TIMEOUT_CONFIG, DEFAULT_HEADERS } from '@/config/environment';
import { transformHttpError, handleNetworkError, type ApiError } from '../errors';

/**
 * Opciones para configurar una petición HTTP
 */
export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeout?: number;
  skipAuth?: boolean;
}

/**
 * Tipo de respuesta genérica de la API
 */
export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Interceptor para modificar requests antes de enviarlos
 */
export type RequestInterceptor = (
  url: string,
  options: RequestOptions
) => Promise<{ url: string; options: RequestOptions }> | { url: string; options: RequestOptions };

/**
 * Interceptor para procesar respuestas
 */
export type ResponseInterceptor = <T>(response: T) => Promise<T> | T;

/**
 * Interceptor para manejar errores
 */
export type ErrorInterceptor = (error: ApiError) => Promise<never> | never;

/**
 * Cliente HTTP configurado para la API
 */
class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(baseUrl: string = BACKEND_URL, timeout: number = TIMEOUT_CONFIG.REQUEST_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  /**
   * Agrega un interceptor de request
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Agrega un interceptor de response
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Agrega un interceptor de error
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(endpoint: string): string {
    // Si el endpoint ya es una URL completa, usarla directamente
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    // Asegurar que no haya dobles slashes
    const cleanBase = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${cleanBase}${cleanEndpoint}`;
  }

  /**
   * Aplica interceptores de request
   */
  private async applyRequestInterceptors(
    url: string,
    options: RequestOptions
  ): Promise<{ url: string; options: RequestOptions }> {
    let currentUrl = url;
    let currentOptions = options;

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(currentUrl, currentOptions);
      currentUrl = result.url;
      currentOptions = result.options;
    }

    return { url: currentUrl, options: currentOptions };
  }

  /**
   * Aplica interceptores de response
   */
  private async applyResponseInterceptors<T>(response: T): Promise<T> {
    let currentResponse = response;

    for (const interceptor of this.responseInterceptors) {
      currentResponse = await interceptor(currentResponse);
    }

    return currentResponse;
  }

  /**
   * Aplica interceptores de error
   */
  private async applyErrorInterceptors(error: ApiError): Promise<never> {
    let currentError = error;

    for (const interceptor of this.errorInterceptors) {
      try {
        await interceptor(currentError);
      } catch (err) {
        currentError = err as ApiError;
      }
    }

    throw currentError;
  }

  /**
   * Realiza una petición HTTP
   */
  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const timeout = options.timeout ?? this.defaultTimeout;

    try {
      // Construir URL
      let url = this.buildUrl(endpoint);

      // Preparar opciones
      let requestOptions: RequestOptions = {
        ...options,
        headers: {
          ...DEFAULT_HEADERS,
          ...options.headers,
        },
      };

      // Serializar body si es un objeto
      if (requestOptions.body && typeof requestOptions.body === 'object') {
        requestOptions.body = JSON.stringify(requestOptions.body) as any;
      }

      // Aplicar interceptores de request
      const intercepted = await this.applyRequestInterceptors(url, requestOptions);
      url = intercepted.url;
      requestOptions = intercepted.options;

      // Crear AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Realizar petición
      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Manejar errores HTTP
      if (!response.ok) {
        const error = await transformHttpError(response);
        return this.applyErrorInterceptors(error);
      }

      // Parsear respuesta JSON
      const data: T = await response.json();

      // Aplicar interceptores de response
      return this.applyResponseInterceptors(data);
    } catch (error) {
      // Manejar errores de red/timeout
      const apiError = handleNetworkError(error);
      return this.applyErrorInterceptors(apiError);
    }
  }

  /**
   * Método GET
   */
  async get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Método POST
   */
  async post<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body,
    });
  }

  /**
   * Método PUT
   */
  async put<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    });
  }

  /**
   * Método PATCH
   */
  async patch<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    });
  }

  /**
   * Método DELETE
   */
  async delete<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

/**
 * Instancia singleton del cliente HTTP
 */
export const httpClient = new HttpClient();
