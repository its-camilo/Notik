import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { palette } from '@/styles/design-tokens';
import type { AuthHeaderProps } from '@/types/auth';

/**
 * Reusable authentication header with app logo and title
 */
export const AuthHeader = memo<AuthHeaderProps>(({ isDark }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 40,
    },
    iconContainer: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: isDark ? palette.text.dark : palette.text.light,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? palette.text.secondaryDark : palette.text.placeholderDark,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo de Notik"
        />
      </View>
      <Text style={styles.title}>Notik</Text>
      <Text style={styles.subtitle}>
        Gestiona tus notas, imágenes y archivos
      </Text>
    </View>
  );
});

AuthHeader.displayName = 'AuthHeader';
