// Clean MainScreen implementation using modular Sidebar component
import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { palette } from "@/styles/design-tokens";
import { Sidebar } from "@/components";

const createMainScreenStyles = (isDark: boolean, isMobile: boolean) =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: isMobile ? "column" : "row",
      backgroundColor: isDark
        ? palette.surface.darkBase
        : palette.surface.lightBase,
    },
    mainContent: {
      flex: 1,
      paddingTop: isMobile ? 80 : 0, // Space for hamburger button on mobile
    },
  });

export const MainScreen = React.memo(() => {
  const { isDark, toggleTheme } = useTheme();
  const { isMobile } = useBreakpoint();

  const styles = useMemo(
    () => createMainScreenStyles(isDark, isMobile),
    [isDark, isMobile]
  );

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <SafeAreaView style={styles.root}>
      <Sidebar onThemeToggle={handleThemeToggle} isDark={isDark} />
      <View style={styles.mainContent} />
    </SafeAreaView>
  );
});

MainScreen.displayName = "MainScreen";
