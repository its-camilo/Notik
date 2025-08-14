# Notik

Aplicación monorepo (cliente Expo React Native + backend Strapi) en desarrollo.

## Estructura
```
./
  app/        # Aplicación móvil/web Expo (React Native + TypeScript + NativeWind)
  server/     # Backend Strapi (API CMS, contenido y assets)
```

## Requisitos
- Node.js 18+
- npm / pnpm / yarn
- (Opcional) GitHub CLI `gh`

## Instalación
Instala dependencias en cada paquete.
```powershell
# raíz (si añades workspaces más tarde) - actualmente sólo dependencias locales mínimas
# Cliente
cd app
npm install
# Backend
cd ../server
npm install
```

## Desarrollo
En dos terminales diferentes:
```powershell
# Terminal 1 - App Expo
cd app
npx expo start

# Terminal 2 - Strapi
cd server
npm run develop
```
Expo abrirá una interfaz donde puedes lanzar la app en web, iOS o Android (con Expo Go).

## Variables de entorno
Crea archivos `.env` según corresponda (no se suben al repo). Proporciona un `.env.example` si deseas documentarlas.

## Branching / Git
- `main`: estable
- Crea ramas de feature `feat/descripcion-corta`
- Usa Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)

## Scripts útiles (server Strapi)
```powershell
npm run develop   # modo desarrollo
npm run build     # build de producción
npm run start     # iniciar build
```

## Estilo de código
- ESLint + (puedes añadir Prettier) en el cliente
- Normalización de EOL vía `.gitattributes`

## Licencia
Define la licencia (MIT sugerido) en un archivo `LICENSE`.
