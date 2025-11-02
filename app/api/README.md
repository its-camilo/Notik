# 🏗️ API Modular - Notik

Arquitectura modular y escalable para las peticiones HTTP de la aplicación.

## 📁 Estructura

```
app/api/
├── auth/               # Módulo de autenticación
│   ├── auth.api.ts    # API de autenticación
│   ├── token.service.ts # Gestión de tokens
│   └── index.ts       # Exportaciones
├── client/            # Cliente HTTP base
│   ├── http-client.ts # Cliente con interceptors
│   └── index.ts       # Exportaciones
├── errors/            # Manejo de errores
│   ├── api-error.ts   # Clases de errores tipados
│   └── index.ts       # Exportaciones
├── transformers/      # Transformadores de datos
│   ├── auth.transformer.ts # Transforma datos de Strapi
│   └── index.ts       # Exportaciones
├── types/             # Tipos de TypeScript
│   ├── auth.types.ts  # Tipos de autenticación
│   └── index.ts       # Exportaciones
├── index.ts           # Exportaciones centralizadas
└── README.md          # Este archivo
```

## 🎯 Características

### ✅ Cliente HTTP Modular
- Cliente base con `fetch` configurado
- Soporte para interceptors (request/response/error)
- Manejo automático de timeouts
- Transformación automática de errores
- Métodos helper: `get`, `post`, `put`, `patch`, `delete`

### ✅ Manejo de Errores Tipado
- Jerarquía de errores personalizada
- Errores específicos por código HTTP
- Transformación automática de errores de Strapi
- Type-safe error handling

### ✅ Gestión de Tokens
- Storage unificado (web + native)
- Validación de formato JWT
- Verificación de expiración
- Auto-limpieza de tokens inválidos

### ✅ Transformadores de Datos
- Conversión Strapi → App
- Validación de JWT
- Decodificación segura de payloads

### ✅ API de Autenticación
- Login
- Registro
- Obtener usuario actual
- Verificar token

## 🚀 Uso

### Cliente HTTP Base

```typescript
import { httpClient } from '@/api/client';

// GET
const data = await httpClient.get('/api/users');

// POST
const result = await httpClient.post('/api/users', {
  username: 'john',
  email: 'john@example.com',
});

// Con headers personalizados
const user = await httpClient.get('/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

### API de Autenticación

```typescript
import { authApi, tokenService } from '@/api/auth';

// Login
try {
  const response = await authApi.login({
    email: 'user@example.com',
    password: 'password123',
  });

  // Guardar token
  await tokenService.setToken(response.jwt);

  console.log('Usuario:', response.user);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Credenciales inválidas');
  }
}

// Registro
const response = await authApi.register({
  username: 'john',
  email: 'john@example.com',
  password: 'password123',
});

// Obtener usuario actual
const token = await tokenService.getToken();
if (token) {
  const user = await authApi.getCurrentUser(token);
}

// Verificar token
const isValid = await authApi.verifyToken(token);
```

### Gestión de Tokens

```typescript
import { tokenService } from '@/api/auth';

// Guardar token
await tokenService.setToken('eyJhbGciOi...');

// Obtener token
const token = await tokenService.getToken();

// Verificar si existe token
const hasToken = await tokenService.hasToken();

// Obtener información del token
const info = await tokenService.getTokenInfo();
console.log('Expira en:', new Date(info.expiresAt));
console.log('Está expirado:', info.isExpired);

// Eliminar token
await tokenService.removeToken();

// Limpiar todo
await tokenService.clearAuth();
```

### Manejo de Errores

```typescript
import {
  AuthenticationError,
  ValidationError,
  NetworkError
} from '@/api/errors';

try {
  await authApi.login(credentials);
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Credenciales incorrectas
    alert('Usuario o contraseña incorrectos');
  } else if (error instanceof ValidationError) {
    // Error de validación
    console.log('Errores:', error.validationErrors);
  } else if (error instanceof NetworkError) {
    // Sin conexión
    alert('No hay conexión a internet');
  }
}
```

### Interceptors

```typescript
import { httpClient } from '@/api/client';
import { tokenService } from '@/api/auth';

// Agregar token automáticamente a todas las peticiones
httpClient.addRequestInterceptor(async (url, options) => {
  const token = await tokenService.getToken();

  if (token && !options.skipAuth) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  return { url, options };
});

// Logging de respuestas
httpClient.addResponseInterceptor((response) => {
  console.log('Response:', response);
  return response;
});

// Manejo global de errores
httpClient.addErrorInterceptor((error) => {
  console.error('API Error:', error.message);
  throw error;
});
```

## 📦 Tipos

### AuthResponse

```typescript
interface AuthResponse {
  jwt: string;
  user: User;
}
```

### StrapiUser

```typescript
interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🔧 Configuración

Las URLs y timeouts se configuran desde `config/environment.ts`:

```typescript
import { BACKEND_URL, TIMEOUT_CONFIG } from '@/config/environment';
```

## 🎨 Buenas Prácticas Implementadas

### ✅ Separación de Responsabilidades
- Cliente HTTP separado de la lógica de negocio
- Servicios específicos por módulo (auth, token, etc.)
- Transformadores centralizados

### ✅ Type Safety
- Tipos estrictos en toda la API
- Interfaces para requests y responses
- Errores tipados

### ✅ Error Handling
- Jerarquía de errores clara
- Transformación automática de errores HTTP
- Manejo de errores de red/timeout

### ✅ Single Responsibility
- Cada clase/función tiene una única responsabilidad
- Módulos pequeños y enfocados

### ✅ DRY (Don't Repeat Yourself)
- Cliente HTTP reutilizable
- Transformadores centralizados
- Helpers de storage compartidos

### ✅ Extensibilidad
- Sistema de interceptors
- Fácil agregar nuevos endpoints
- Modular y escalable

## 🔄 Migración desde el código anterior

El servicio `services/auth.ts` mantiene compatibilidad hacia atrás:

```typescript
// ✅ Funciona (API antigua)
import { login, register, getToken } from '@/services/auth';

// ✅ Recomendado (API nueva)
import { authApi, tokenService } from '@/api/auth';
```

## 📚 Próximos Pasos

Para agregar nuevos módulos de API:

1. Crear carpeta en `app/api/nuevo-modulo/`
2. Crear `nuevo-modulo.api.ts` con la API
3. Crear types en `app/api/types/`
4. Crear transformers si es necesario
5. Exportar desde `app/api/index.ts`

Ejemplo:

```typescript
// app/api/notes/notes.api.ts
class NotesApi {
  async getNotes() {
    return httpClient.get('/api/notes');
  }

  async createNote(data: CreateNoteDto) {
    return httpClient.post('/api/notes', data);
  }
}

export const notesApi = new NotesApi();
```
