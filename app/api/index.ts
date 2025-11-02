/**
 * Exportaciones centralizadas de la API
 */

// Cliente HTTP
export { httpClient } from './client';
export type { RequestOptions, ApiResponse } from './client';

// Autenticación
export { authApi, tokenService } from './auth';

// Errores
export {
  ApiError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
} from './errors';

// Tipos
export type {
  StrapiUser,
  StrapiAuthResponse,
  LoginPayload,
  RegisterPayload,
  AuthResponse as ApiAuthResponse,
  StoredToken,
} from './types';

// Transformadores
export {
  transformStrapiUser,
  transformAuthResponse,
  isValidJwtFormat,
  decodeJwtPayload,
  isJwtExpired,
  getJwtExpirationTime,
} from './transformers';
