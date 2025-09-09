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
      // En desktop, el TopBar debe ocupar todo el ancho disponible
      // En móvil, ocupa todo el ancho
      width: "100%",
    },
    mainContent: {
      flex: 1,
      // En móvil, si la sidebar está visible, no hay topbar, así que no padding top
      // En desktop siempre hay topbar
      paddingTop: isMobile ? (isSidebarVisible ? 0 : 80) : 60,
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
      <View style={{
        position:
          (isMobile && isSidebarVisible) || (!isMobile && !isSidebarVisible)
            ? ('absolute' as const)
            : ('relative' as const),
        zIndex:
          isMobile && isSidebarVisible
            ? 9999
            : !isMobile && !isSidebarVisible
            ? 100
            : 1,
        // Desktop cuando la sidebar está oculta: conservar ancho fijo para el botón/área
        width: !isMobile && !isSidebarVisible ? 300 : undefined,
        height: !isMobile && !isSidebarVisible ? '100%' : undefined,
        // Cobertura total en móvil cuando la sidebar está desplegada
        top:
          (isMobile && isSidebarVisible) || (!isMobile && !isSidebarVisible)
            ? 0
            : undefined,
        left:
          (isMobile && isSidebarVisible) || (!isMobile && !isSidebarVisible)
            ? 0
            : undefined,
        right: isMobile && isSidebarVisible ? 0 : undefined,
        bottom: isMobile && isSidebarVisible ? 0 : undefined,
      }}>
        <Sidebar
          onThemeToggle={handleThemeToggle}
          isDark={isDark}
          onSidebarVisibilityChange={handleSidebarVisibilityChange}
        />
      </View>
      <View style={styles.contentContainer}>
        {/* En móvil, ocultar topbar cuando sidebar está visible */}
        {!(isMobile && isSidebarVisible) && (
          <View style={styles.topBarContainer}>
            <TopBar
              isDark={isDark}
              isSidebarVisible={isSidebarVisible}
              onChatPress={handleChatPress}
              onAddContentPress={handleAddContentPress}
            />
          </View>
        )}
        <View style={styles.mainContent} />
      </View>
    </SafeAreaView>
  );
});

MainScreen.displayName = "MainScreen";
