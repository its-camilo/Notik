/**
 * Exportaciones centralizadas de errores de la API
 */

export {
  ApiError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  transformHttpError,
  handleNetworkError,
} from './api-error';
