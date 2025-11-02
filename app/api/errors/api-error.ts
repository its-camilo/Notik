/**
 * Clases de errores personalizadas para la API
 *
 * Proporciona una jerarquía de errores tipados para manejar
 * diferentes tipos de errores de la API de manera consistente.
 */

/**
 * Error base de la API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Error de red (sin conexión, timeout, etc.)
 */
export class NetworkError extends ApiError {
  constructor(message = 'Error de conexión. Verifica tu internet.') {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Error de autenticación (401)
 */
export class AuthenticationError extends ApiError {
  constructor(message = 'Credenciales inválidas') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error de autorización (403)
 */
export class AuthorizationError extends ApiError {
  constructor(message = 'No tienes permisos para realizar esta acción') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Error de validación (400)
 */
export class ValidationError extends ApiError {
  constructor(
    message = 'Los datos proporcionados son inválidos',
    public validationErrors?: Record<string, string[]>
  ) {
    super(message, 400, 'VALIDATION_ERROR', validationErrors);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error de recurso no encontrado (404)
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error del servidor (500+)
 */
export class ServerError extends ApiError {
  constructor(message = 'Error del servidor. Intenta más tarde.', statusCode = 500) {
    super(message, statusCode, 'SERVER_ERROR');
    this.name = 'ServerError';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

/**
 * Error de timeout
 */
export class TimeoutError extends ApiError {
  constructor(message = 'La solicitud tardó demasiado. Intenta de nuevo.') {
    super(message, 408, 'TIMEOUT_ERROR');
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * Estructura de error de Strapi
 */
interface StrapiError {
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: unknown;
  };
  message?: string;
}

/**
 * Transforma errores de respuesta HTTP a errores tipados
 */
export const transformHttpError = async (response: Response): Promise<ApiError> => {
  const { status } = response;

  try {
    const errorData: StrapiError = await response.json();
    const message = errorData.error?.message || errorData.message || 'Error en la solicitud';
    const details = errorData.error?.details;

    // Mapear códigos de estado a tipos de error
    switch (status) {
      case 400:
        return new ValidationError(message, details as Record<string, string[]>);
      case 401:
        return new AuthenticationError(message);
      case 403:
        return new AuthorizationError(message);
      case 404:
        return new NotFoundError(message);
      case 408:
        return new TimeoutError(message);
      default:
        if (status >= 500) {
          return new ServerError(message, status);
        }
        return new ApiError(message, status, errorData.error?.name, details);
    }
  } catch (parseError) {
    // Si no se puede parsear la respuesta
    return new ApiError(`Error HTTP ${status}`, status);
  }
};

/**
 * Maneja errores de red y timeout
 */
export const handleNetworkError = (error: unknown): ApiError => {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new NetworkError();
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return new TimeoutError();
  }

  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError(
    error instanceof Error ? error.message : 'Error desconocido'
  );
};
