import { useState, useCallback, useMemo } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { ThemeMode } from '@/types/auth';

/**
 * Custom hook for managing theme state with system preference support
 */
export function useTheme() {
  const systemScheme = useColorScheme();
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);

  const effectiveScheme = useMemo(
    () => themeOverride ?? systemScheme ?? 'light',
    [themeOverride, systemScheme]
  );

  const isDark = useMemo(
    () => effectiveScheme === 'dark',
    [effectiveScheme]
  );

  const toggleTheme = useCallback(() => {
    setThemeOverride(prev => {
      if (prev) {
        return prev === 'dark' ? 'light' : 'dark';
      }
      // First toggle derives from system value
      return isDark ? 'light' : 'dark';
    });
  }, [isDark]);

  const setTheme = useCallback((theme: ThemeMode | null) => {
    setThemeOverride(theme);
  }, []);

  return {
    isDark,
    effectiveScheme,
    themeOverride,
    toggleTheme,
    setTheme,
  };
}
