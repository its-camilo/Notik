# 🚀 Notik

Aplicación móvil React Native con backend Strapi para tomar y gestionar notas.

## 📱 Características

- **React Native** con Expo Router
- **Backend Strapi** en la nube
- **Keep-Alive Service** para mantener el servidor activo
- **GitHub Codespaces** ready para desarrollo instantáneo
- **Auto-start toggle** para el servicio Keep-Alive
- **TypeScript** para type safety

## 🛠️ Tecnologías

### Frontend
- **React Native** 0.79.5
- **Expo** 53.0.20
- **Expo Router** para navegación
- **TypeScript** para tipado
- **TailwindCSS** (NativeWind) para estilos
- **AsyncStorage** para persistencia local

### Backend
- **Strapi Cloud** (hosted)
- No hay configuración local de backend

## 🚀 Inicio Rápido

### Opción 1: GitHub Codespaces (Recomendado)

1. **Haz clic en el botón verde "Code"**
2. **Selecciona "Codespaces"**
3. **Crea un nuevo codespace**
4. **Espera la configuración automática**
5. **Ejecuta**: `npm start`

### Opción 2: Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/its-camilo/Notik.git
cd Notik

# Instalar dependencias de la app
cd app
npm install

# Iniciar el servidor de desarrollo
npm start
```

## 📁 Estructura del Proyecto

```
Notik/
├── app/                          # Aplicación React Native
│   ├── app/                      # Rutas de la aplicación
│   │   ├── (tabs)/              # Navegación por tabs
│   │   │   ├── index.tsx        # Página de inicio (Hello World + Keep-Alive)
│   │   │   └── explore.tsx      # Página de exploración
│   │   ├── _layout.tsx          # Layout principal
│   │   └── +not-found.tsx       # Página 404
│   ├── components/              # Componentes reutilizables
│   ├── hooks/                   # Custom hooks
│   │   ├── useKeepAlive.ts      # Hook para el servicio Keep-Alive
│   │   └── useAutoStart.ts      # Hook para persistir auto-start
│   ├── services/                # Servicios de la aplicación
│   │   └── keepAliveService.ts  # Servicio Keep-Alive principal
│   ├── constants/               # Configuraciones
│   │   └── KeepAliveConfig.ts   # Configuración del Keep-Alive
│   └── src/utils/               # Utilidades
│       └── constants.js         # Configuración global con detección de entorno
├── server/                      # Strapi backend (solo para referencia, no se usa)
├── .devcontainer/               # Configuración de GitHub Codespaces
├── .vscode/                     # Configuración de VS Code
└── CODESPACES.md               # Guía completa de Codespaces
```

## 🌐 URLs del Proyecto

- **Frontend**: https://ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev (Codespaces)
- **Backend API**: https://supportive-fireworks-d01261f76f.strapiapp.com/api
- **Admin Panel**: https://supportive-fireworks-d01261f76f.strapiapp.com/admin

## 🔧 Funcionalidades

### Keep-Alive Service
- **Auto-detección de entorno** (local vs Codespaces)
- **Intervalos inteligentes** (10 min local, 15 min Codespaces)
- **Toggle de auto-start** con persistencia
- **Logs verbosos** para debugging
- **Siempre apunta al backend en la nube**

### Página de Inicio
- **"Hello World! 👋"** como saludo principal
- **Botón Auto Start** para el Keep-Alive (verde = ON, gris = OFF)
- **Indicador de estado** del servicio (🟢 Activo / 🔴 Inactivo)
- **Configuración persistente** con AsyncStorage

## 📋 Scripts Disponibles

```bash
# En el directorio raíz
npm start              # Iniciar la aplicación
npm run build         # Build para producción
npm run lint          # Linting del código

# En el directorio app
cd app
npm start             # Iniciar con Expo
npm run web           # Iniciar en modo web
npm run android       # Iniciar en Android
npm run ios           # Iniciar en iOS
```

## 🌍 Desarrollo en Codespaces

El proyecto está completamente configurado para GitHub Codespaces:

- ✅ **Configuración automática** del entorno
- ✅ **Port forwarding** automático (8081, 19000-19002, 3000)
- ✅ **Extensiones de VS Code** preinstaladas
- ✅ **Tareas predefinidas** para desarrollo
- ✅ **Detección automática** del entorno Codespaces

Ver [CODESPACES.md](./CODESPACES.md) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Camilo** - [@its-camilo](https://github.com/its-camilo)

---

⭐ ¡Dale una estrella si te gusta este proyecto!

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
