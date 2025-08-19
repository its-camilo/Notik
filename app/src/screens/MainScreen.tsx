import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { palette } from '@/styles/design-tokens';

export function MainScreen() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
      padding: 20,
    },
    header: {
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? palette.text.dark : palette.text.light,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? palette.text.secondaryDark : palette.text.secondaryLight,
    },
    userInfo: {
      backgroundColor: isDark ? palette.surface.darkAlt : palette.surface.lightAlt,
      padding: 20,
      borderRadius: 12,
      marginBottom: 30,
    },
    userInfoTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? palette.text.dark : palette.text.light,
      marginBottom: 15,
    },
    userDetail: {
      fontSize: 14,
      color: isDark ? palette.text.secondaryDark : palette.text.secondaryLight,
      marginBottom: 8,
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error durante logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido a Notik!</Text>
        <Text style={styles.subtitle}>Tu aplicación de notas está lista para usar</Text>
      </View>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Información del Usuario</Text>
          <Text style={styles.userDetail}>Nombre: {user.name || 'No especificado'}</Text>
          <Text style={styles.userDetail}>Usuario: {user.username}</Text>
          <Text style={styles.userDetail}>Email: {user.email}</Text>
          <Text style={styles.userDetail}>
            Cuenta confirmada: {user.confirmed ? 'Sí' : 'No'}
          </Text>
          <Text style={styles.userDetail}>
            Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
          </Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
