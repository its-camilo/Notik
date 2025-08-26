import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/hooks/useTheme';
import { palette, radius } from '@/styles/design-tokens';

const SIDEBAR_WIDTH = 300;

interface SidebarToggleProps {
  sidebarVisible: boolean;
  onToggle: () => void;
  anim: Animated.Value;
}

const createSidebarToggleStyles = (isDark: boolean) => StyleSheet.create({
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

export const SidebarToggle: React.FC<SidebarToggleProps> = React.memo(({
  sidebarVisible,
  onToggle,
  anim,
}) => {
  const { isDark } = useTheme();
  const styles = useMemo(() => createSidebarToggleStyles(isDark), [isDark]);

  return (
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
      <TouchableOpacity 
        onPress={onToggle} 
        activeOpacity={0.8} 
        style={styles.arrowButton} 
        accessibilityLabel={sidebarVisible ? 'Ocultar sidebar' : 'Mostrar sidebar'}
      >
        <MaterialIcons 
          name={sidebarVisible ? 'chevron-left' : 'chevron-right'} 
          size={20} 
          color={isDark ? palette.text.light : '#111'} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
});

SidebarToggle.displayName = 'SidebarToggle';