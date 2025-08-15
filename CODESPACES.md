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
- ✅ Puertos configurados (8081, 19000-19002, 3000)
- ✅ Extensiones de VS Code

### 3. Ejecutar la Aplicación

```bash
# Iniciar la aplicación React Native
npm start

# O desde la carpeta app
cd app && npm start
```

## 🌐 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | `https://vigilant-spoon-5959j4vqjjr3v9xq.github.dev` | Aplicación principal |
| **Backend API** | `https://supportive-fireworks-d01261f76f.strapiapp.com/api` | API de Strapi (Cloud) |
| **Admin Panel** | `https://supportive-fireworks-d01261f76f.strapiapp.com/admin` | Panel de administración |
| **Expo DevTools** | Puerto 19001 | Herramientas de desarrollo de Expo |

## 🔧 Configuración de Puertos

Los siguientes puertos están configurados para forwarding automático:

- **8081**: Servidor de desarrollo Expo
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
- ✅ **SIEMPRE usa el backend en la nube** (no hay backend local)

### Variables de Entorno
El sistema detecta automáticamente Codespaces y ajusta:
- URLs del frontend
- Timeouts de red
- Configuración de keep-alive
- Logs de debugging
- **Backend siempre apunta a Strapi Cloud**

## 🛠️ Comandos Útiles

```bash
# Tareas de VS Code (Ctrl+Shift+P -> Tasks: Run Task)
- Start Expo Dev Server
- Start Expo Web
- Install Dependencies

# Scripts npm
npm start              # Ejecutar la app
npm run build         # Build para producción
npm run lint          # Linting del código
```

## 🐛 Troubleshooting

### Puerto 8081 no accesible
1. Verifica que el puerto esté en la lista de forwards
2. Ve a la pestaña "Ports" en VS Code
3. Asegúrate de que el puerto 8081 esté marcado como "Public"

### Expo no se conecta
1. Usa el modo web: `npm run web`
2. O abre directamente: `https://vigilant-spoon-5959j4vqjjr3v9xq.github.dev`

### Problemas de conexión con Strapi
- La app está configurada para usar **SOLO Strapi Cloud**
- No hay backend local configurado
- Si hay problemas, verifica la URL del Strapi Cloud en `constants.js`

### Logs de debugging
Si necesitas más información:
```bash
# Los logs aparecerán automáticamente en la consola
# El entorno Codespaces tiene logs más verbosos habilitados
```

## 📝 Notas Importantes

1. **Backend**: **SIEMPRE** usa Strapi Cloud - no hay configuración local
2. **Frontend**: Se ejecuta en el puerto 8081 forwarded
3. **Persistencia**: Los datos se mantienen mientras el Codespace esté activo
4. **Configuración**: Se detecta automáticamente el entorno Codespaces
5. **Título**: La pestaña del navegador mostrará "Notik"

## 🔄 Actualizar Configuración

Si cambias la URL de tu Codespace, actualiza:
1. `app/src/utils/constants.js` - Variable `CODESPACES.DOMAIN`
2. Este README.md

---

¡Listo para desarrollar! 🎉
