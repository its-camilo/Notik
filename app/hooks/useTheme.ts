import { useThemeContext } from '@/contexts/ThemeContext';

/**
 * Custom hook for managing theme state with system preference support
 *
 * @deprecated Use useThemeContext directly from contexts/ThemeContext
 * This hook is kept for backward compatibility
 */
export function useTheme() {
  return useThemeContext();
}
