import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { LoginForm } from '@/components/Auth/LoginForm';

type AuthMode = 'login' | 'register';

export function AuthScreen() {
  // System scheme (read-only) + optional override so we can toggle on web
  const systemScheme = useColorScheme();
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(null);
  const effectiveScheme = themeOverride ?? systemScheme ?? 'light';
  const isDark = effectiveScheme === 'dark';
  const [currentMode, setCurrentMode] = useState<AuthMode>('login');

  const styles = createStyles(isDark);

  const toggleColorScheme = () => {
    setThemeOverride(prev => {
      if (prev) {
        return prev === 'dark' ? 'light' : 'dark';
      }
      // first toggle derives from system value
      return isDark ? 'light' : 'dark';
    });
  };

  const handleSwitchToLogin = () => {
  console.log('AuthScreen: switch to login');
  setCurrentMode('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentMode('register');
  };

  if (currentMode === 'register') {
    return (
      <RegisterForm
        onSwitchToLogin={handleSwitchToLogin}
        isDark={isDark}
        onToggleTheme={toggleColorScheme}
      />
    );
  }

  if (currentMode === 'login') {
    return (
      <LoginForm
        onSwitchToRegister={handleSwitchToRegister}
        isDark={isDark}
        onToggleTheme={toggleColorScheme}
      />
    );
  }

  // If not login, we're in register and handled earlier
  return null;
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: isDark ? '#080808' : '#FDF9F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
  backgroundColor: isDark ? '#FFFFFF' : '#7A3F12',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  shadowColor: isDark ? '#FFFFFF' : '#7A3F12',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: isDark ? '#F9FAFB' : '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: isDark ? '#D1D5DB' : '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    maxWidth: 320,
    width: '100%',
  },
  toggleButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonLeft: {
    backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderWidth: 1,
    borderColor: isDark ? '#6B7280' : '#D1D5DB',
  },
  toggleButtonRight: {
    backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: isDark ? '#6B7280' : '#D1D5DB',
  },
  toggleButtonActive: {
    backgroundColor: '#A16D47',
    borderColor: '#A16D47',
  },
  toggleButtonTextInactive: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#F9FAFB' : '#374151',
  },
  toggleButtonTextActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  mainButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
  backgroundColor: isDark ? '#1E1E1E' : '#EDE4DA',
    borderWidth: 1,
  borderColor: isDark ? '#2A2A2A' : '#E4D8CB',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#F9FAFB' : '#374151',
  },
  registerButton: {
  backgroundColor: isDark ? '#FFFFFF' : '#7A3F12',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  color: isDark ? '#111827' : '#FFFFFF',
  },
  loginFormContainer: {
  backgroundColor: isDark ? '#0F0F0F' : '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  borderWidth: 1,
  borderColor: isDark ? '#262626' : '#E9E1D7',
  shadowColor: isDark ? 'transparent' : '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: isDark ? 0 : 0.05,
  shadowRadius: 6,
  elevation: isDark ? 0 : 2,
  },
  darkModeToggle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 48,
    height: 30,
    borderRadius: 24,
  backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  borderColor: isDark ? '#2A2A2A' : '#E5E2DC',
  },
  // Styles for temporary content
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: isDark ? '#F9FAFB' : '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: isDark ? '#D1D5DB' : '#6B7280',
    marginBottom: 32,
  },
});
