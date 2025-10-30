import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { palette } from '@/styles/design-tokens';
import type { ThemeToggleProps } from '@/types/auth';

/**
 * Reusable theme toggle button component
 */
export const ThemeToggle = memo<ThemeToggleProps>(({ isDark, onToggle }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 40,
      left: 24,
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? palette.neutral[875] : palette.surface.light,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 1,
      borderColor: isDark ? palette.neutral[825] : palette.beige[50],
    },
  });

  const iconName = isDark ? 'light-mode' : 'dark-mode';
  const iconColor = isDark ? palette.text.dark : palette.neutral[650];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      accessibilityHint="Toca para alternar entre modo claro y oscuro"
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={iconColor}
      />
    </TouchableOpacity>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
