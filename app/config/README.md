# 🌍 Configuración de Entornos - Notik

Este directorio contiene la configuración centralizada de URLs para frontend y backend.

## 📋 Archivos

- **`environment.ts`** - Configuración principal de URLs para todos los entornos

## 🚀 Cómo Usar

### Cambiar Entornos

Edita el archivo `environment.ts` y modifica la sección `CONFIG`:

```typescript
const CONFIG = {
  // Selecciona el entorno para el FRONTEND
  FRONTEND_ENV: 'codespaces' as Environment,

  // Selecciona el entorno para el BACKEND
  BACKEND_ENV: 'production' as Environment,
} as const;
```

### Opciones Disponibles

- **`localhost`** - Desarrollo local
- **`codespaces`** - GitHub Codespaces
- **`production`** - Producción (Strapi Cloud)

### Ejemplos de Configuración

#### 1. Todo en localhost (desarrollo local)
```typescript
const CONFIG = {
  FRONTEND_ENV: 'localhost',
  BACKEND_ENV: 'localhost',
};
```

#### 2. Frontend en Codespaces, Backend en producción
```typescript
const CONFIG = {
  FRONTEND_ENV: 'codespaces',
  BACKEND_ENV: 'production',
};
```

#### 3. Frontend en localhost, Backend en producción
```typescript
const CONFIG = {
  FRONTEND_ENV: 'localhost',
  BACKEND_ENV: 'production',
};
```

#### 4. Todo en producción
```typescript
const CONFIG = {
  FRONTEND_ENV: 'production',
  BACKEND_ENV: 'production',
};
```

## 📦 Importar Configuración

### Desde cualquier archivo de la app:

```typescript
// Importar URLs individuales
import { FRONTEND_URL, BACKEND_URL, API_URL } from '@/config/environment';

// Importar toda la información de entorno
import { ENV_INFO } from '@/config/environment';

// Importar configuración de timeouts
import { TIMEOUT_CONFIG } from '@/config/environment';
```

### Ejemplo de uso:

```typescript
import { API_URL, BACKEND_URL } from '@/config/environment';

// Hacer una petición a la API
const response = await fetch(`${API_URL}/users/me`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

## 🔧 URLs Definidas

### Localhost
- Frontend: `http://localhost:8081`
- Backend: `http://localhost:1337`

### Codespaces
- Frontend: `https://vigilant-spoon-5959j4vqjjr3v9xq.github.dev`
- Backend: `https://vigilant-spoon-5959j4vqjjr3v9xq-1337.app.github.dev`

### Producción
- Frontend: `https://notik.app` (cambiar cuando tengas dominio)
- Backend: `https://supportive-fireworks-d01261f76f.strapiapp.com`

## 🔄 Actualizar URLs de Codespaces

Si cambias de Codespace, actualiza las URLs en `environment.ts`:

```typescript
codespaces: {
  frontend: 'https://TU-NUEVO-CODESPACE.github.dev',
  backend: 'https://TU-NUEVO-CODESPACE-1337.app.github.dev',
},
```

## ⚙️ Configuración Automática

El sistema automáticamente ajusta:

- ✅ **Timeouts** - Más largos en Codespaces (15s vs 10s)
- ✅ **Keep-Alive** - Intervalos ajustados por entorno
- ✅ **Debug logs** - Más verbose en Codespaces
- ✅ **Headers** - Configuración consistente

## 🎯 Ventajas

✅ **Centralizado** - Todas las URLs en un solo lugar
✅ **Flexible** - Mezcla cualquier combinación de entornos
✅ **Type-safe** - TypeScript previene errores
✅ **Debug-friendly** - Logs automáticos de configuración
✅ **Mantenible** - Fácil de actualizar y entender

## 📝 Notas

- No es necesario reiniciar el servidor después de cambiar `CONFIG`
- Los cambios en las URLs requieren rebuild de la app
- Verifica los logs de consola para confirmar la configuración actual
