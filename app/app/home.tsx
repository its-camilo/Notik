import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { MainScreen } from "@/src/screens/MainScreen";
import { useAuth, AuthProvider } from "@/hooks";

/**
 * Home route (/home) - Protected route that shows MainScreen
 * Redirects to / if user is not authenticated
 */
function InnerHome() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const router = useRouter();

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while verifying authentication
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Cargando aplicación...
        </Text>
      </View>
    );
  }

  // Show error if there's a problem with verification
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <Text
          style={{ color: "#FF3B30", textAlign: "center", marginBottom: 10 }}
        >
          Error de autenticación
        </Text>
        <Text style={{ color: "#666", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  // Only show MainScreen if authenticated
  if (isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <MainScreen />
      </View>
    );
  }

  // This shouldn't render as we redirect above, but just in case
  return null;
}

export default function HomePage() {
  return (
    <AuthProvider>
      <InnerHome />
    </AuthProvider>
  );
}
