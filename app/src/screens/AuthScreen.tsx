import React, { useState, useCallback } from 'react';
import { RegisterForm, LoginForm } from '@/components/Auth';
import { useTheme } from '@/hooks/useTheme';
import type { AuthMode, AuthScreenProps } from '@/types/auth';

interface AuthScreenState {
  currentMode: AuthMode;
}

/**
 * Authentication screen that manages login/register mode switching and theme state
 * Implements proper React patterns with memoization and callback optimization
 */
export const AuthScreen = React.memo<AuthScreenProps>(({ initialMode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode);
  const { isDark, toggleTheme } = useTheme();

  const handleSwitchMode = useCallback(() => {
    setCurrentMode(prev => prev === 'login' ? 'register' : 'login');
  }, []);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const commonProps = {
    onSwitchMode: handleSwitchMode,
    isDark,
    onToggleTheme: handleToggleTheme,
  } as const;

  if (currentMode === 'register') {
    return <RegisterForm {...commonProps} />;
  }

  return <LoginForm {...commonProps} />;
});

AuthScreen.displayName = 'AuthScreen';
