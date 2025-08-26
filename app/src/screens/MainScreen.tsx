// Clean MainScreen implementation: single imports, single styles block, grayscale/black for dark mode controls
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';
import { Sidebar, SidebarToggle } from '@/components';
import { useTheme } from '@/hooks/useTheme';
import { palette } from '@/styles/design-tokens';

const SIDEBAR_WIDTH = 300;

const createMainScreenStyles = (isDark: boolean) => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
  },
  mainPlaceholder: {
    flex: 1,
  },
});

export const MainScreen = React.memo(() => {
  const { isDark } = useTheme();

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [newTabName, setNewTabName] = useState('');
  const anim = useRef(new Animated.Value(0)).current;

  const styles = useMemo(() => createMainScreenStyles(isDark), [isDark]);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
  }, []);

  const handleNewTabChange = useCallback((text: string) => {
    setNewTabName(text);
  }, []);

  const sidebarTranslateX = useMemo(
    () => anim.interpolate({ inputRange: [0, 1], outputRange: [0, -SIDEBAR_WIDTH] }),
    [anim]
  );

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
      <Sidebar
        sidebarVisible={sidebarVisible}
        newTabName={newTabName}
        onNewTabChange={handleNewTabChange}
        sidebarTranslateX={sidebarTranslateX}
      />
      
      <SidebarToggle
        sidebarVisible={sidebarVisible}
        onToggle={toggleSidebar}
        anim={anim}
      />

      <View style={styles.mainPlaceholder} />
    </SafeAreaView>
  );
});

MainScreen.displayName = 'MainScreen';
