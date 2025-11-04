/**
 * Theme Context y Provider
 *
 * Proporciona estado global del tema para toda la aplicación
 * con persistencia en storage.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { storageService } from '@/lib/storage';
import type { ThemeMode } from '@/types/auth';

const THEME_STORAGE_KEY = 'app_theme_preference';

interface ThemeContextValue {
  isDark: boolean;
  effectiveScheme: ThemeMode;
  themeOverride: ThemeMode | null;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode | null) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function AppThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencia de tema del storage al montar
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await storageService.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setThemeOverride(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Guardar preferencia cuando cambia
  useEffect(() => {
    if (!isLoading && themeOverride !== null) {
      storageService.setItem(THEME_STORAGE_KEY, themeOverride).catch(error => {
        console.error('Error saving theme preference:', error);
      });
    }
  }, [themeOverride, isLoading]);

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

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      effectiveScheme,
      themeOverride,
      toggleTheme,
      setTheme,
      isLoading,
    }),
    [isDark, effectiveScheme, themeOverride, toggleTheme, setTheme, isLoading]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook para usar el contexto de tema
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
