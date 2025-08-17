import React, { useState, useCallback } from 'react';
import { RegisterForm, LoginForm } from '@/components/Auth';
import { useTheme } from '@/hooks/useTheme';
import type { AuthMode, AuthScreenProps } from '@/types/auth';

/**
 * Authentication screen that manages login/register mode switching and theme state
 */
export const AuthScreen = React.memo<AuthScreenProps>(({ initialMode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode);
  const { isDark, toggleTheme } = useTheme();

  const handleSwitchMode = useCallback(() => {
    setCurrentMode(prev => prev === 'login' ? 'register' : 'login');
  }, []);

  const commonProps = {
    onSwitchMode: handleSwitchMode,
    isDark,
    onToggleTheme: toggleTheme,
  };

  if (currentMode === 'register') {
    return <RegisterForm {...commonProps} />;
  }

  return <LoginForm {...commonProps} />;
});

AuthScreen.displayName = 'AuthScreen';
