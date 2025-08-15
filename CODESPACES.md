# 🚀 Notik en GitHub Codespaces

Esta guía te ayudará a configurar y ejecutar Notik en GitHub Codespaces.

## ⚡ Inicio Rápido

### 1. Abrir en Codespaces
1. Ve a tu repositorio en GitHub
2. Haz clic en el botón verde "Code"
3. Selecciona la pestaña "Codespaces"
4. Haz clic en "Create codespace on main"

### 2. Configuración Automática
El contenedor se configurará automáticamente con:
- ✅ Node.js 18
- ✅ Expo CLI
- ✅ Dependencias instaladas
- ✅ Puertos configurados (8081, 1337, 19000-19002, 3000)
- ✅ Extensiones de VS Code

### 3. Ejecutar la Aplicación

```bash
# Opción 1: Ejecutar todo (recomendado)
npm run dev

# Opción 2: Solo la app React Native
npm run dev:app

# Opción 3: Solo el servidor Strapi
npm run dev:server
```

## 🌐 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | `https://ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev` | Aplicación principal |
| **Backend API** | `https://supportive-fireworks-d01261f76f.strapiapp.com/api` | API de Strapi (Cloud) |
| **Admin Panel** | `https://supportive-fireworks-d01261f76f.strapiapp.com/admin` | Panel de administración |
| **Expo DevTools** | Puerto 19001 | Herramientas de desarrollo de Expo |

## 🔧 Configuración de Puertos

Los siguientes puertos están configurados para forwarding automático:

- **8081**: Servidor de desarrollo Expo
- **1337**: Servidor Strapi local (si decides usarlo)
- **19000**: Metro Bundler de Expo
- **19001**: DevTools de Expo
- **19002**: Túnel de Expo
- **3000**: Vista previa web

## 📱 Desarrollo

### Modo Web
Para desarrollar en el navegador:
```bash
cd app
npm run web
```

### Keep-Alive Service
El servicio Keep-Alive está configurado para:
- ✅ Detectar automáticamente el entorno Codespaces
- ✅ Ajustar timeouts para conexiones más lentas
- ✅ Usar intervalos más largos (15 min vs 10 min)
- ✅ Logs más verbosos para debugging

### Variables de Entorno
El sistema detecta automáticamente Codespaces y ajusta:
- URLs del frontend y backend
- Timeouts de red
- Configuración de keep-alive
- Logs de debugging

## 🛠️ Comandos Útiles

```bash
# Tareas de VS Code (Ctrl+Shift+P -> Tasks: Run Task)
- Start Expo Dev Server
- Start Expo Web
- Start Strapi Server
- Install Dependencies

# Scripts npm
npm run dev                 # Ejecutar todo
npm run dev:app            # Solo app
npm run dev:server         # Solo servidor
npm run codespaces:setup   # Re-ejecutar setup
```

## 🐛 Troubleshooting

### Puerto 8081 no accesible
1. Verifica que el puerto esté en la lista de forwards
2. Ve a la pestaña "Ports" en VS Code
3. Asegúrate de que el puerto 8081 esté marcado como "Public"

### Expo no se conecta
1. Usa el modo web: `npm run web`
2. O abre directamente: `https://ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev`

### Problemas de conexión con Strapi
- La app está configurada para usar Strapi Cloud por defecto
- No necesitas ejecutar el servidor local a menos que hagas cambios en el backend

### Logs de debugging
Si necesitas más información:
```bash
# Los logs aparecerán automáticamente en la consola
# El entorno Codespaces tiene logs más verbosos habilitados
```

## 📝 Notas Importantes

1. **Backend**: Por defecto usa Strapi Cloud para estabilidad
2. **Frontend**: Se ejecuta en el puerto 8081 forwarded
3. **Persistencia**: Los datos se mantienen mientras el Codespace esté activo
4. **Configuración**: Se detecta automáticamente el entorno Codespaces

## 🔄 Actualizar Configuración

Si cambias la URL de tu Codespace, actualiza:
1. `app/src/utils/constants.js` - Variable `CODESPACES.DOMAIN`
2. Este README.md
3. `.devcontainer/devcontainer.json` - Si necesitas cambios en la configuración

---

¡Listo para desarrollar! 🎉
