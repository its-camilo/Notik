// Clean MainScreen implementation: single imports, single styles block, grayscale/black for dark mode controls
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Animated, Easing } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';
import { palette, spacing, radius } from '@/styles/design-tokens';

const SIDEBAR_WIDTH = 300;

const createMainScreenStyles = (isDark: boolean) => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
    borderRightWidth: 1,
    borderRightColor: isDark ? '#262626' : palette.surface.border,
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
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
    backgroundColor: isDark ? '#333' : '#444',
    borderColor: isDark ? '#333' : '#444',
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? palette.text.dark : '#222',
  },
  tabItemTextActive: {
    color: '#FFF',
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

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [newTabName, setNewTabName] = useState('');
  const anim = useRef(new Animated.Value(0)).current;

  const styles = useMemo(() => createMainScreenStyles(isDark), [isDark]);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleNewTabChange = useCallback((text: string) => {
    setNewTabName(text);
  }, []);

  const sidebarTranslateX = useMemo(
    () => anim.interpolate({ inputRange: [0, 1], outputRange: [0, -SIDEBAR_WIDTH] }),
    [anim]
  );

  const animatedSidebarStyle = useMemo(() => ({ transform: [{ translateX: sidebarTranslateX }] }), [sidebarTranslateX]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: sidebarVisible ? 0 : 1,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [sidebarVisible, anim]);

  return (
    <SafeAreaView style={styles.root}>
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
              <MaterialIcons name="folder" size={16} color={isDark ? '#DADADA' : '#FFFFFF'} />
              <Text style={[styles.tabItemText, styles.tabItemTextActive]}>Dashboard</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.username}>{user ? `@${user.username}` : 'Usuario'}</Text>
        </View>
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.arrowContainer,
          {
            left: SIDEBAR_WIDTH - 20,
            transform: [
              {
                translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -SIDEBAR_WIDTH] }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={toggleSidebar} activeOpacity={0.8} style={styles.arrowButton} accessibilityLabel={sidebarVisible ? 'Ocultar sidebar' : 'Mostrar sidebar'}>
          <MaterialIcons name={sidebarVisible ? 'chevron-left' : 'chevron-right'} size={20} color={isDark ? palette.text.light : '#111'} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.mainPlaceholder} />
    </SafeAreaView>
  );
});

MainScreen.displayName = 'MainScreen';
