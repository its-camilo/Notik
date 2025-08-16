// Clean MainScreen implementation: single imports, single styles block, grayscale/black for dark mode controls
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Animated, Easing, useWindowDimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';
import { palette, spacing, radius } from '@/styles/design-tokens';

const SIDEBAR_WIDTH = 300;
const MOBILE_BREAKPOINT = 768; // Breakpoint para considerar móvil

const createMainScreenStyles = (isDark: boolean, isMobile: boolean) => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: isMobile ? 'column' : 'row',
    backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
  },
  sidebar: {
    width: isMobile ? '100%' : SIDEBAR_WIDTH,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
    borderRightWidth: isMobile ? 0 : 1,
    borderRightColor: isDark ? '#262626' : palette.surface.border,
    borderTopRightRadius: isMobile ? 0 : radius.xl,
    borderBottomRightRadius: isMobile ? 0 : radius.xl,
    ...(isMobile && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }),
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#262626' : palette.surface.border,
  },
  mobileHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  hamburgerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
    borderWidth: 1,
    borderColor: isDark ? '#262626' : palette.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  appHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  appHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoSmall: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: isDark ? palette.text.dark : palette.text.light,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: isDark ? palette.text.placeholderDark : palette.text.placeholderLight,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  tabsContainer: {
    gap: spacing.sm,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    borderRadius: radius.md,
    backgroundColor: isDark ? palette.surface.darkAlt : palette.surface.lightAlt,
    borderWidth: 1,
    borderColor: isDark ? '#262626' : palette.surface.borderAlt,
    gap: spacing.sm,
  },
  tabItemActive: {
    backgroundColor: isDark ? '#333' : palette.brand.brown,
    borderColor: isDark ? '#333' : palette.brand.brown,
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? palette.text.dark : '#222',
  },
  tabItemTextActive: {
    color: isDark ? '#FFF' : '#FFFFFF',
  },
  addTabButton: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.md,
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    backgroundColor: isDark ? '#0F0F0F' : '#F3F3F3',
    borderWidth: 1,
    borderColor: isDark ? '#2B2B2B' : '#D1D1D1',
  },
  addTabInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  addTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#DADADA' : '#222',
    marginRight: 8,
  },
  plusBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#2B2B2B' : '#D1D1D1',
    backgroundColor: isDark ? '#262626' : '#F3F3F3',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: isDark ? '#262626' : palette.surface.border,
  },
  username: {
    fontSize: 13,
    fontWeight: '500',
    color: isDark ? palette.text.secondaryDark : palette.text.secondaryLight,
  },
  mainPlaceholder: {
    flex: 1,
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -22 }],
    zIndex: 30,
  },
  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
    borderWidth: 1,
    borderColor: isDark ? '#262626' : palette.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});

export const MainScreen = React.memo(() => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const isMobile = screenWidth < MOBILE_BREAKPOINT;
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile); // En desktop siempre visible, en móvil oculta por defecto
  const [newTabName, setNewTabName] = useState('');
  const anim = useRef(new Animated.Value(isMobile ? 0 : 1)).current; // En móvil empieza en 0 (oculta), en desktop en 1 (visible)

  const styles = useMemo(() => createMainScreenStyles(isDark, isMobile), [isDark, isMobile]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarVisible(prev => !prev);
    }
  }, [isMobile]);

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  }, [isMobile]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleNewTabChange = useCallback((text: string) => {
    setNewTabName(text);
  }, []);

  // En desktop, la sidebar siempre está visible (anim = 1)
  // En móvil, la sidebar se anima entre 0 (oculta) y 1 (visible)
  const sidebarTranslateX = useMemo(() => {
    if (isMobile) {
      return anim.interpolate({ 
        inputRange: [0, 1], 
        outputRange: [-screenWidth, 0] 
      });
    }
    return 0; // En desktop no hay animación de translateX
  }, [anim, isMobile, screenWidth]);

  const animatedSidebarStyle = useMemo(() => ({ 
    transform: [{ translateX: sidebarTranslateX }] 
  }), [sidebarTranslateX]);

  const overlayOpacity = useMemo(() => {
    if (isMobile) {
      return anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      });
    }
    return 0; // En desktop no hay overlay
  }, [anim, isMobile]);

  useEffect(() => {
    if (isMobile) {
      Animated.timing(anim, {
        toValue: sidebarVisible ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // En desktop, asegurar que siempre esté visible
      anim.setValue(1);
    }
  }, [sidebarVisible, anim, isMobile]);

  // Renderizar contenido de la sidebar
  const renderSidebarContent = () => (
    <Animated.View style={[styles.sidebar, animatedSidebarStyle]}>
      <View style={styles.appHeaderRow}>
        <View style={styles.appHeaderLeft}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logoSmall} resizeMode="contain" accessibilityLabel="Logo de Notik" />
          <Text style={styles.appName}>Notik</Text>
        </View>

        <View style={styles.appHeaderActions}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleThemeToggle} accessibilityLabel="Modo oscuro">
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={20} color={isDark ? palette.text.dark : palette.text.light} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleLogout} accessibilityLabel="Cerrar sesión">
            <MaterialIcons name="logout" size={20} color={isDark ? palette.text.dark : palette.text.light} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.sectionLabel}></Text>
        <Text style={styles.sectionLabel}>Pestañas</Text>
        <View style={styles.tabsContainer}>
          <View style={styles.addTabButton}>
            <TextInput
              value={newTabName}
              onChangeText={handleNewTabChange}
              placeholder="Nueva pestaña"
              placeholderTextColor={isDark ? '#777' : '#888'}
              style={[styles.addTabInput, { color: isDark ? '#DADADA' : '#222' }]}
              accessibilityLabel="Nombre de nueva pestaña"
            />
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7} accessibilityLabel="Agregar pestaña">
              <View style={styles.plusBox}>
                <MaterialIcons name="add" size={16} color={isDark ? '#DADADA' : '#222'} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.tabItem, styles.tabItemActive]}>
            <MaterialIcons name="folder" size={16} color={'#FFFFFF'} />
            <Text style={[styles.tabItemText, styles.tabItemTextActive]}>Dashboard</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.username}>{user ? `@${user.username}` : 'Usuario'}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {isMobile ? (
        // Layout móvil
        <>
          {/* Header móvil con botón hamburguesa */}
          <View style={styles.mobileHeader}>
            <View style={styles.mobileHeaderLeft}>
              <Image source={require('@/assets/images/logo.png')} style={styles.logoSmall} resizeMode="contain" accessibilityLabel="Logo de Notik" />
              <Text style={styles.appName}>Notik</Text>
            </View>
            
            <TouchableOpacity 
              onPress={toggleSidebar} 
              activeOpacity={0.8} 
              style={styles.hamburgerButton}
              accessibilityLabel={sidebarVisible ? 'Cerrar menú' : 'Abrir menú'}
            >
              <MaterialIcons 
                name={sidebarVisible ? 'close' : 'menu'} 
                size={24} 
                color={isDark ? palette.text.dark : palette.text.light} 
              />
            </TouchableOpacity>
          </View>

          {/* Overlay para cerrar sidebar al tocar fuera */}
          {sidebarVisible && (
            <Animated.View 
              style={[styles.overlay, { opacity: overlayOpacity }]}
              pointerEvents="box-none"
            >
              <TouchableOpacity 
                style={{ flex: 1 }} 
                onPress={closeSidebar}
                activeOpacity={1}
              />
            </Animated.View>
          )}

          {/* Sidebar móvil */}
          {renderSidebarContent()}

          {/* Contenido principal */}
          <View style={styles.mainPlaceholder} />
        </>
      ) : (
        // Layout desktop
        <>
          {renderSidebarContent()}
          <View style={styles.mainPlaceholder} />
        </>
      )}
    </SafeAreaView>
  );
});

MainScreen.displayName = 'MainScreen';
