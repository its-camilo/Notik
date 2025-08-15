@echo off
echo 🚀 Iniciando Notik...

REM Verificar si tenemos Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    pause
    exit /b 1
)

REM Instalar dependencias si es necesario
if not exist "node_modules" (
    echo 📦 Instalando dependencias raíz...
    npm install
)

REM Navegar a la app e instalar dependencias
cd app
if not exist "node_modules" (
    echo 📦 Instalando dependencias de la app...
    npm install
)

cd ..

echo ✅ Configuración completada!
echo.
echo 🎯 Para iniciar la aplicación, ejecuta:
echo   npm run dev        # Inicia todo
echo   npm run dev:app    # Solo la app
echo   npm run dev:server # Solo el servidor
echo.
echo 🌐 URLs importantes:
echo   Frontend: http://localhost:8081
echo   Backend:  https://supportive-fireworks-d01261f76f.strapiapp.com
echo.
pause
