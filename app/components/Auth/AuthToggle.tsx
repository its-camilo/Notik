import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { AuthToggleProps, AuthMode } from '@/types/auth';

/**
 * Reusable authentication mode toggle component
 */
export const AuthToggle = memo<AuthToggleProps>(({
  currentMode,
  onModeChange,
  isDark,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 32,
      maxWidth: 1200,
      width: '100%',
      alignSelf: 'center',
      backgroundColor: isDark ? '#1E1E1E' : '#E6D8C9',
      padding: 2,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: isDark ? '#2A2A2A' : '#D9CBBE',
    },
    segment: {
      flex: 1,
      height: 44,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    segmentActive: {
      backgroundColor: isDark ? '#101010' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#2A2A2A' : '#DCCFC2',
    },
    segmentTextInactive: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#E5E5E5' : '#3F2E1F',
    },
    segmentTextActive: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#F5F5F5' : '#2B1C10',
    },
  });

  const handleLoginPress = useCallback(() => {
    if (currentMode !== 'login') {
      onModeChange('login');
    }
  }, [currentMode, onModeChange]);

  const handleRegisterPress = useCallback(() => {
    if (currentMode !== 'register') {
      onModeChange('register');
    }
  }, [currentMode, onModeChange]);

  const isLoginActive = currentMode === 'login';
  const isRegisterActive = currentMode === 'register';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, isLoginActive && styles.segmentActive]}
        onPress={handleLoginPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Cambiar a iniciar sesión"
        accessibilityState={{ selected: isLoginActive }}
      >
        <Text
          style={isLoginActive ? styles.segmentTextActive : styles.segmentTextInactive}
        >
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, isRegisterActive && styles.segmentActive]}
        onPress={handleRegisterPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Cambiar a registrarse"
        accessibilityState={{ selected: isRegisterActive }}
      >
        <Text
          style={isRegisterActive ? styles.segmentTextActive : styles.segmentTextInactive}
        >
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
});

AuthToggle.displayName = 'AuthToggle';
