import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { createFormStyles } from '@/styles/formStyles';
import { palette } from '@/styles/design-tokens';
import { useFormValidation, loginValidationSchema } from '@/hooks/useFormValidation';
import { FormField } from './FormField';
import { AuthHeader } from './AuthHeader';
import { AuthToggle } from './AuthToggle';
import { ThemeToggle } from './ThemeToggle';
import type { AuthFormProps, LoginCredentials } from '@/types/auth';

/**
 * Login form component with validation and modern React patterns
 */
export const LoginForm = React.memo<AuthFormProps>(({
  onSwitchMode,
  isDark,
  onToggleTheme,
}) => {
  const initialValues: LoginCredentials = {
    email: '',
    password: '',
  };

  const {
    values,
    errors,
    isFormValid,
    setValue,
    validateForm,
  } = useFormValidation(initialValues, loginValidationSchema);

  const baseStyles = createFormStyles(isDark);

  const styles = StyleSheet.create({
    container: {
      ...baseStyles.screen,
      alignItems: 'center',
      paddingTop: 28,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingBottom: 28,
      width: '100%',
    },
    formContainer: {
      ...baseStyles.card,
      padding: 28,
      maxWidth: 1200,
      width: '100%',
      marginBottom: 24,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? palette.text.dark : palette.text.light,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? palette.text.secondaryDark : '#6B7280',
      lineHeight: 20,
    },
    form: {
      gap: 16,
    },
    loginButton: {
      ...baseStyles.ctaButton,
    },
    loginButtonText: baseStyles.ctaButtonText,
  });

  // Wheel-to-scroll behavior on web: forward global wheel events to the form's ScrollView
  const scrollId = useMemo(() => 'auth-scroll-login', []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handler = (e: WheelEvent) => {
      const el = document.getElementById(scrollId);
      if (!el) return;
      // forward scroll amount to the form and prevent default page scroll
      el.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' } as any);
      // prevent page from handling the wheel
      e.preventDefault();
    };

    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler as EventListener);
  }, [scrollId]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setValue(field, value);
  }, [setValue]);

  const handleLogin = useCallback(async () => {
    const validation = await validateForm();
    if (validation.isValid) {
      // TODO: Implement actual login logic
      console.log('Login with:', values);
    }
  }, [validateForm, values]);

  const handleSwitchToRegister = useCallback(() => {
    onSwitchMode();
  }, [onSwitchMode]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          nativeID={scrollId}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader isDark={isDark} />

          <AuthToggle
            currentMode="login"
            onModeChange={() => handleSwitchToRegister()}
            isDark={isDark}
          />

          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <Text style={styles.subtitle}>
                Ingresa tus credenciales para acceder a tu cuenta
              </Text>
            </View>

            <View style={styles.form}>
              <FormField
                label="Correo"
                value={values.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="nombre@dominio.com"
                icon="email"
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                isDark={isDark}
              />

              <FormField
                label="Contraseña"
                value={values.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Tu contraseña"
                icon="lock"
                error={errors.password}
                secureTextEntry
                isDark={isDark}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Iniciar sesión"
                accessibilityHint="Toca para iniciar sesión con tus credenciales"
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {onToggleTheme && (
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      )}
    </SafeAreaView>
  );
});

LoginForm.displayName = 'LoginForm';
