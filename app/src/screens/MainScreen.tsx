// Clean MainScreen implementation using modular Sidebar component
import React, { useMemo, useCallback, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { palette } from "@/styles/design-tokens";
import { Sidebar, TopBar } from "@/components";

const createMainScreenStyles = (isDark: boolean, isMobile: boolean, isSidebarVisible: boolean) =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: isMobile ? "column" : "row",
      backgroundColor: isDark
        ? palette.surface.darkBase
        : palette.surface.lightBase,
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
    },
    topBarContainer: {
      // En desktop, el TopBar se posiciona absolutamente y se ajusta automáticamente
      // En móvil, ocupa todo el ancho
    },
    mainContent: {
      flex: 1,
      paddingTop: isMobile ? 80 : 60, // Space for hamburger button on mobile, TopBar height on desktop
      // En desktop, el contenido principal ya no necesita margin porque el TopBar lo maneja
      marginLeft: isMobile ? 0 : 0,
    },
  });

export const MainScreen = React.memo(() => {
  const { isDark, toggleTheme } = useTheme();
  const { isMobile } = useBreakpoint();
  const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobile); // Desktop: visible by default, Mobile: hidden

  const styles = useMemo(
    () => createMainScreenStyles(isDark, isMobile, isSidebarVisible),
    [isDark, isMobile, isSidebarVisible]
  );

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleSidebarVisibilityChange = useCallback((visible: boolean) => {
    setIsSidebarVisible(visible);
  }, []);

  const handleChatPress = useCallback(() => {
    // TODO: Implementar funcionalidad de chat
    console.log("Chat pressed");
  }, []);

  const handleAddContentPress = useCallback(() => {
    // TODO: Implementar funcionalidad de agregar contenido
    console.log("Add content pressed");
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Sidebar
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
        onSidebarVisibilityChange={handleSidebarVisibilityChange}
      />
      <View style={styles.contentContainer}>
        <View style={styles.topBarContainer}>
          <TopBar
            isDark={isDark}
            isSidebarVisible={isSidebarVisible}
            onChatPress={handleChatPress}
            onAddContentPress={handleAddContentPress}
          />
        </View>
        <View style={styles.mainContent} />
      </View>
    </SafeAreaView>
  );
});

MainScreen.displayName = "MainScreen";
