#!/bin/bash

# Script de configuración para GitHub Codespaces
echo "🚀 Configurando entorno Notik para Codespaces..."

# Instalar dependencias globales necesarias
echo "📦 Instalando dependencias globales..."
npm install -g @expo/cli
npm install -g expo-cli

# Instalar dependencias del proyecto raíz
echo "📦 Instalando dependencias del proyecto raíz..."
npm install

# Navegar al directorio de la app e instalar dependencias
echo "📦 Instalando dependencias de la app..."
cd app
npm install

# Crear archivo de configuración específico para Codespaces
echo "⚙️ Creando configuración específica para Codespaces..."
cat > .env.codespaces << EOF
# Configuración específica para GitHub Codespaces
EXPO_PUBLIC_API_URL=https://supportive-fireworks-d01261f76f.strapiapp.com/api
EXPO_PUBLIC_ADMIN_URL=https://supportive-fireworks-d01261f76f.strapiapp.com/admin
EXPO_PUBLIC_BASE_URL=https://supportive-fireworks-d01261f76f.strapiapp.com
EXPO_PUBLIC_ENVIRONMENT=codespaces
EXPO_PUBLIC_DEBUG=true
EOF

# Configurar Git para Codespaces
echo "🔧 Configurando Git..."
git config --global init.defaultBranch main
git config --global pull.rebase false

# Crear alias útiles
echo "🔗 Creando alias útiles..."
echo 'alias start-app="cd app && npm start"' >> ~/.bashrc
echo 'alias start-server="cd server && npm run develop"' >> ~/.bashrc
echo 'alias start-all="npm run dev"' >> ~/.bashrc

echo "✅ Configuración completada!"
echo ""
echo "🎯 Comandos útiles:"
echo "  npm run dev          - Inicia toda la aplicación"
echo "  start-app           - Inicia solo la app React Native"
echo "  start-server        - Inicia solo el servidor Strapi"
echo "  expo start --web    - Inicia la app en modo web"
echo ""
echo "🌐 URLs importantes:"
echo "  Frontend: https://ubiquitous-parakeet-rxwxqr74gpx2xx47.github.dev"
echo "  Backend:  https://supportive-fireworks-d01261f76f.strapiapp.com"
echo "  Admin:    https://supportive-fireworks-d01261f76f.strapiapp.com/admin"
