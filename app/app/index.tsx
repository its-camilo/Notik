
import React, { useMemo } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { KeepAliveIndicator } from '@/components/keepalive';
import { MainScreen } from '@/src/screens/MainScreen';
import { AuthScreen } from '@/src/screens/AuthScreen';
import { useAuth, AuthProvider } from '@/hooks';

/**
 * Main home screen component that handles authentication state
 * Now uses real authentication with Strapi JWT validation
 */
function InnerApp() {
  const { isAuthenticated, isLoading, error } = useAuth();

  const containerStyle = useMemo(() => ({ flex: 1, backgroundColor: '#fff' }), []);

  // Mostrar loading mientras se verifica autenticación
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Verificando autenticación...</Text>
      </View>
    );
  }

  // Mostrar error si hay problema con la verificación
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 }}>
        <Text style={{ color: '#FF3B30', textAlign: 'center', marginBottom: 10 }}>Error de autenticación</Text>
        <Text style={{ color: '#666', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  return <View style={containerStyle}>{isAuthenticated ? <MainScreen /> : <AuthScreen />}</View>;
}

export default function HomeScreen() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
