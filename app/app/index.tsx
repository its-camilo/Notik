import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AuthScreen } from "@/src/screens/AuthScreen";
import { useAuth, AuthProvider } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";
import { palette } from "@/styles/design-tokens";

/**
 * Auth route (/) - Shows login/register screen
 * Redirects to /home when user is authenticated
 */
function InnerApp() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();

  // Redirect to home when authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
    },
    loadingText: {
      marginTop: 10,
      color: isDark ? palette.text.secondaryDark : palette.text.placeholderDark,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
      padding: 20,
    },
    errorTitle: {
      color: palette.status.error,
      textAlign: "center",
      marginBottom: 10,
      fontSize: 16,
      fontWeight: "600" as const,
    },
    errorMessage: {
      color: isDark ? palette.text.secondaryDark : palette.text.placeholderDark,
      textAlign: "center",
    },
    containerStyle: {
      flex: 1,
      backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
    },
  });

  // Show loading while verifying authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.brand.brown} />
        <Text style={styles.loadingText}>
          Verificando autenticación...
        </Text>
      </View>
    );
  }

  // Show error if there's a problem with verification
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Error de autenticación
        </Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  // Only show AuthScreen if not authenticated
  if (!isAuthenticated) {
    return (
      <View style={styles.containerStyle}>
        <AuthScreen />
      </View>
    );
  }

  // This shouldn't render as we redirect above, but just in case
  return null;
}

export default function AuthPage() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
