
import React, { useMemo } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { KeepAliveIndicator } from '@/components/keepalive';
import { MainScreen } from '@/src/screens/MainScreen';
import { AuthScreen } from '@/src/screens/AuthScreen';
import { useAuth } from '@/hooks/useAuth';

/**
 * Main home screen component that handles authentication state
 * Now uses real authentication with Strapi JWT validation
 */
export default function HomeScreen() {
  const { isAuthenticated, isLoading, error } = useAuth();

  const containerStyle = useMemo(
    () => ({ flex: 1, backgroundColor: '#fff' }),
    []
  );

  const indicatorContainerStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      top: 20,
      right: 20,
      zIndex: 1,
    }),
    []
  );

  const loadingStyle = useMemo(
    () => ({
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: '#fff',
    }),
    []
  );

  const errorStyle = useMemo(
    () => ({
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: '#fff',
      padding: 20,
    }),
    []
  );

  // Mostrar loading mientras se verifica autenticación
  if (isLoading) {
    return (
      <View style={loadingStyle}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>
          Verificando autenticación...
        </Text>
      </View>
    );
  }

  // Mostrar error si hay problema con la verificación
  if (error) {
    return (
      <View style={errorStyle}>
        <Text style={{ color: '#FF3B30', textAlign: 'center', marginBottom: 10 }}>
          Error de autenticación
        </Text>
        <Text style={{ color: '#666', textAlign: 'center' }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {/* TODO: Enable KeepAliveIndicator when needed */}
      {/* <View style={indicatorContainerStyle}>
        <KeepAliveIndicator />
      </View> */}

      {isAuthenticated ? <MainScreen /> : <AuthScreen />}
    </View>
  );
}
