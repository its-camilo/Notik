
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeepAliveIndicator } from '@/components/keepalive';
import { MainScreen } from '@/src/screens/MainScreen';
import { AuthScreen } from '@/src/screens/AuthScreen';

/**
 * Main home screen component that handles authentication state
 * TODO: Replace with actual authentication state management
 */
export default function HomeScreen() {
  // TODO: Replace with actual authentication state from context/store
  const isAuthenticated = false;

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
