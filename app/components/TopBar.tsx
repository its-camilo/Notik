import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { palette, spacing, radius, typography } from "@/styles/design-tokens";

const TOPBAR_HEIGHT = 60;
export const SIDEBAR_WIDTH = 300;

interface TopBarProps {
  title?: string;
  isDark: boolean;
  onChatPress?: () => void;
  onAddContentPress?: () => void;
  isSidebarVisible?: boolean;
}

const createTopBarStyles = (
  isDark: boolean,
  isMobile: boolean,
  isSidebarVisible: boolean
) => {
  return StyleSheet.create({
    container: {
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#262626" : palette.surface.border,
      zIndex: 50, // Siempre menor que sidebar
      // Siempre ocupar todo el ancho del contenedor padre
      position: "relative" as const,
      width: "100%",
    },
    topBar: {
      height: TOPBAR_HEIGHT,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "flex-end" as const, // Siempre alineado a la derecha
      paddingHorizontal: spacing.lg,
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
    },
    rightSection: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: isMobile ? spacing.sm : spacing.md, // Más gap en PC
    },
    iconButton: {
      padding: isMobile ? spacing.xs : spacing.sm, // Más padding en PC
      borderRadius: isMobile ? radius.sm : radius.md, // Más radius en PC
      backgroundColor: isDark
        ? palette.surface.darkAlt
        : palette.surface.lightAlt,
    },
    addButton: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: spacing.xs,
      paddingVertical: isMobile ? spacing.xs : spacing.sm, // Más padding en PC
      paddingHorizontal: isMobile ? spacing.sm : spacing.md, // Más padding en PC
      borderRadius: isMobile ? radius.sm : radius.md, // Más radius en PC
      // Usar los mismos colores que el Dashboard activo en la sidebar
      backgroundColor: isDark ? "#333" : palette.brand.brown,
    },
    addButtonText: {
      fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm, // Más grande en PC
      fontWeight: typography.fontWeight.medium as any,
      // Usar los mismos colores de texto que el Dashboard activo
      color: isDark ? "#FFF" : "#FFFFFF",
    },
  });
};

export const TopBar = React.memo<TopBarProps>(
  ({
    title = "Pestaña actual",
    isDark,
    onChatPress,
    onAddContentPress,
    isSidebarVisible = true,
  }) => {
    const { isMobile } = useBreakpoint();

    const styles = useMemo(
      () => createTopBarStyles(isDark, isMobile, isSidebarVisible),
      [isDark, isMobile, isSidebarVisible]
    );

    const iconColor = isDark ? palette.text.dark : palette.text.light;
    // Usar los mismos colores de texto que el Dashboard activo para el ícono
    const addTextColor = isDark ? "#FFF" : "#FFFFFF";

    const handleChatPress = () => {
      onChatPress?.();
    };

    const handleAddContentPress = () => {
      onAddContentPress?.();
    };

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.topBar}>
            {/* Sección derecha - Iconos */}
            <View style={styles.rightSection}>
              {/* Icono de chat */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleChatPress}
                accessibilityLabel="Chat"
                accessibilityRole="button"
              >
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={isMobile ? 16 : 20} // Tamaño condicional
                  color={iconColor}
                />
              </TouchableOpacity>

              {/* Botón de agregar contenido */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddContentPress}
                accessibilityLabel="Agregar contenido"
                accessibilityRole="button"
              >
                <MaterialIcons
                  name="add"
                  size={isMobile ? 14 : 18} // Tamaño condicional
                  color={addTextColor}
                />
                <Text style={styles.addButtonText}>Agregar contenido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
);

TopBar.displayName = "TopBar";

export { TOPBAR_HEIGHT };
