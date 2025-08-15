#!/bin/bash

echo "🚀 Iniciando Notik en Codespaces..."

# Verificar si estamos en Codespaces
if [ "$CODESPACES" = "true" ]; then
    echo "✅ Detectado GitHub Codespaces"
    echo "🌐 URL del Codespace: https://$CODESPACE_NAME.github.dev"
else
    echo "ℹ️ Modo local detectado"
fi

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Navegar a la app e instalar dependencias
cd app
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de la app..."
    npm install
fi

echo "✅ Configuración completada!"
echo ""
echo "🎯 Para iniciar la aplicación, ejecuta:"
echo "  npm run dev        # Inicia todo"
echo "  npm run dev:app    # Solo la app"
echo "  npm run dev:server # Solo el servidor"
echo ""

# Si es Codespaces, mostrar URLs específicas
if [ "$CODESPACES" = "true" ]; then
    echo "🌐 URLs importantes:"
    echo "  Frontend: https://$CODESPACE_NAME.github.dev"
    echo "  Backend:  https://supportive-fireworks-d01261f76f.strapiapp.com"
fi
