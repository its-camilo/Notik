import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { palette, spacing, radius } from "@/styles/design-tokens";

const SIDEBAR_WIDTH = 300;

interface SidebarProps {
  onSidebarVisibilityChange?: (visible: boolean) => void;
  onThemeToggle?: () => void;
  isDark: boolean; // Recibir el tema desde el parent
}

const createSidebarStyles = (isDark: boolean, isMobile: boolean) =>
  StyleSheet.create({
    sidebar: {
      width: isMobile ? "100%" : SIDEBAR_WIDTH,
      height: "100%", // Altura completa tanto en móvil como desktop
      flex: 1,
      flexDirection: "column" as const,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xl,
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
      borderRightWidth: isMobile ? 0 : 1,
      borderRightColor: isDark ? "#262626" : palette.surface.border,
      borderTopRightRadius: isMobile ? 0 : radius.xl,
      borderBottomRightRadius: isMobile ? 0 : radius.xl,
      ...(isMobile && {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // Muy alto para asegurar que esté encima de todo en móvil
      }),
    },
    sidebarOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    hamburgerButton: {
      position: "absolute",
      top: spacing.sm, // Cambiado de spacing.lg a spacing.sm para subirlo
      left: spacing.lg,
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: isDark
        ? palette.surface.darkAlt
        : palette.surface.lightAlt,
      borderWidth: 1,
      borderColor: isDark ? "#262626" : palette.surface.border,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1001,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    hamburgerButtonClose: {
      position: "absolute",
      top: spacing.xs, // Aún más pegado a la esquina
      right: spacing.xs, // Aún más pegado a la esquina
      width: 30,
      height: 30,
      borderRadius: 7,
      backgroundColor: isDark
        ? palette.surface.darkBase
        : palette.surface.light,
      borderWidth: 1,
      borderColor: isDark ? "#404040" : palette.surface.border,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10001, // Debe estar por encima del sidebar (9999)
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.15,
      shadowRadius: 4,
    },
    appHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    appHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    appHeaderActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    logoSmall: {
      width: 48,
      height: 48,
      borderRadius: 12,
    },
    appName: {
      fontSize: 22,
      fontWeight: "700",
      color: isDark ? palette.text.dark : palette.text.light,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 1,
      textTransform: "uppercase",
      color: isDark
        ? palette.text.placeholderDark
        : palette.text.placeholderLight,
      marginBottom: spacing.sm,
      marginTop: spacing.xs,
    },
    tabsContainer: {
      gap: spacing.sm,
    },
    tabItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      minHeight: 44,
      borderRadius: radius.md,
      backgroundColor: isDark
        ? palette.surface.darkAlt
        : palette.surface.lightAlt,
      borderWidth: 1,
      borderColor: isDark ? "#262626" : palette.surface.borderAlt,
      gap: spacing.sm,
    },
    tabItemActive: {
      backgroundColor: isDark ? "#333" : palette.brand.brown,
      borderColor: isDark ? "#333" : palette.brand.brown,
    },
    tabItemText: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? palette.text.dark : "#222",
    },
    tabItemTextActive: {
      color: isDark ? "#FFF" : "#FFFFFF",
    },
    addTabButton: {
      marginTop: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      minHeight: 44,
      paddingHorizontal: spacing.md,
      width: "100%",
      justifyContent: "space-between",
      borderRadius: radius.lg,
      backgroundColor: isDark ? "#0F0F0F" : "#F3F3F3",
      borderWidth: 1,
      borderColor: isDark ? "#2B2B2B" : "#D1D1D1",
    },
    addTabInput: {
      flex: 1,
      fontSize: 14,
      padding: 0,
    },
    plusBox: {
      width: 28,
      height: 28,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: isDark ? "#2B2B2B" : "#D1D1D1",
      backgroundColor: isDark ? "#262626" : "#F3F3F3",
    },
    footer: {
      marginTop: "auto",
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#262626" : palette.surface.border,
    },
    username: {
      fontSize: 13,
      fontWeight: "500",
      color: isDark ? palette.text.secondaryDark : palette.text.secondaryLight,
    },
    arrowContainer: {
      position: "absolute",
      top: "50%",
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      transform: [{ translateY: -22 }],
      zIndex: 30,
    },
    arrowButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: isDark
        ? palette.surface.darkBase
        : palette.surface.lightBase,
      borderWidth: 1,
      borderColor: isDark ? "#262626" : palette.surface.border,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
  });

export const Sidebar = React.memo<SidebarProps>(
  ({ onSidebarVisibilityChange, onThemeToggle, isDark }) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    // Ya no necesitamos useTheme aquí porque recibimos isDark como prop
    const { isMobile, isDesktop } = useBreakpoint();

    const [sidebarVisible, setSidebarVisible] = useState(isDesktop);
    const [newTabName, setNewTabName] = useState("");
    const anim = useRef(new Animated.Value(isDesktop ? 0 : 1)).current;

    const styles = useMemo(
      () => createSidebarStyles(isDark, isMobile),
      [isDark, isMobile]
    );

    const toggleSidebar = useCallback(() => {
      setSidebarVisible((prev) => {
        const newValue = !prev;
        onSidebarVisibilityChange?.(newValue);
        return newValue;
      });
    }, [onSidebarVisibilityChange]);

    const handleLogout = useCallback(async () => {
      try {
        await logout();
        router.replace("/");
      } catch (error) {
        console.error("Error during logout:", error);
        // Even if logout fails, redirect to auth page
        router.replace("/");
      }
    }, [logout, router]);

    const handleThemeToggle = useCallback(() => {
      onThemeToggle?.();
    }, [onThemeToggle]);

    const handleNewTabChange = useCallback((text: string) => {
      setNewTabName(text);
    }, []);

    // Handle responsive sidebar behavior
    useEffect(() => {
      if (isDesktop) {
        // On desktop, sidebar should always be visible
        setSidebarVisible(true);
        onSidebarVisibilityChange?.(true);
      } else {
        // On mobile, sidebar should be hidden by default
        setSidebarVisible(false);
        onSidebarVisibilityChange?.(false);
      }
    }, [isDesktop, onSidebarVisibilityChange]);

    const sidebarTranslateX = useMemo(() => {
      if (isMobile) {
        return anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -SIDEBAR_WIDTH],
        });
      }
      return anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -SIDEBAR_WIDTH],
      });
    }, [anim, isMobile]);

    const animatedSidebarStyle = useMemo(
      () => ({
        transform: [{ translateX: sidebarTranslateX }],
      }),
      [sidebarTranslateX]
    );

    useEffect(() => {
      Animated.timing(anim, {
        toValue: sidebarVisible ? 0 : 1,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, [sidebarVisible, anim]);

    const renderSidebar = () => (
      <Animated.View
        style={[styles.sidebar, !isMobile && animatedSidebarStyle]}
      >
        <View style={styles.appHeaderRow}>
          <View style={styles.appHeaderLeft}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logoSmall}
              resizeMode="contain"
              accessibilityLabel="Logo de Notik"
            />
            <Text style={styles.appName}>Notik</Text>
          </View>

          <View style={styles.appHeaderActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleThemeToggle}
              accessibilityLabel="Modo oscuro"
            >
              <MaterialIcons
                name={isDark ? "light-mode" : "dark-mode"}
                size={20}
                color={isDark ? palette.text.dark : palette.text.light}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              accessibilityLabel="Cerrar sesión"
            >
              <MaterialIcons
                name="logout"
                size={20}
                color={isDark ? palette.text.dark : palette.text.light}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.sectionLabel}></Text>
          <Text style={styles.sectionLabel}>Pestañas</Text>
          <View style={styles.tabsContainer}>
            <View style={styles.addTabButton}>
              <TextInput
                value={newTabName}
                onChangeText={handleNewTabChange}
                placeholder="Nueva pestaña"
                placeholderTextColor={isDark ? "#777" : "#888"}
                style={[
                  styles.addTabInput,
                  { color: isDark ? "#DADADA" : "#222" },
                ]}
                accessibilityLabel="Nombre de nueva pestaña"
              />
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.7}
                accessibilityLabel="Agregar pestaña"
              >
                <View style={styles.plusBox}>
                  <MaterialIcons
                    name="add"
                    size={16}
                    color={isDark ? "#DADADA" : "#222"}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.tabItem, styles.tabItemActive]}>
              <MaterialIcons name="folder" size={16} color={"#FFFFFF"} />
              <Text style={[styles.tabItemText, styles.tabItemTextActive]}>
                Dashboard
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.username}>
            {user ? `@${user.username}` : "Usuario"}
          </Text>
        </View>
      </Animated.View>
    );

    return (
      <>
        {/* Mobile hamburger/menu button (only when sidebar is hidden) */}
        {isMobile && !sidebarVisible && (
          <TouchableOpacity
            onPress={toggleSidebar}
            activeOpacity={0.8}
            style={styles.hamburgerButton}
            accessibilityLabel="Abrir menú"
          >
            <MaterialIcons
              name="menu"
              size={20}
              color={isDark ? palette.text.dark : palette.text.light}
            />
          </TouchableOpacity>
        )}

        {/* Desktop sidebar (always visible) */}
        {isDesktop && renderSidebar()}

        {/* Mobile sidebar with overlay */}
        {isMobile && sidebarVisible && (
          <>
            <TouchableOpacity
              style={styles.sidebarOverlay}
              onPress={() => setSidebarVisible(false)}
              activeOpacity={1}
            />
            {renderSidebar()}
            {/* Close (X) button fixed at top-right while sidebar is open */}
            <TouchableOpacity
              onPress={toggleSidebar}
              activeOpacity={0.8}
              style={styles.hamburgerButtonClose}
              accessibilityLabel="Cerrar menú"
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <MaterialIcons
                name="close"
                size={15}
                color={isDark ? palette.text.dark : palette.text.light}
              />
            </TouchableOpacity>
          </>
        )}

        {/* Desktop toggle arrow (only on desktop) */}
        {!isMobile && (
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.arrowContainer,
              {
                left: SIDEBAR_WIDTH - 20,
                transform: [
                  {
                    translateX: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -SIDEBAR_WIDTH],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={toggleSidebar}
              activeOpacity={0.8}
              style={styles.arrowButton}
              accessibilityLabel={
                sidebarVisible ? "Ocultar sidebar" : "Mostrar sidebar"
              }
            >
              <MaterialIcons
                name={sidebarVisible ? "chevron-left" : "chevron-right"}
                size={20}
                color={isDark ? palette.text.light : "#111"}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { SIDEBAR_WIDTH };
