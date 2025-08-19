import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { createFormStyles } from '@/styles/formStyles';
import { palette } from '@/styles/design-tokens';
import { useFormValidation, registerValidationSchema } from '@/hooks/useFormValidation';
import { useAuth } from '@/hooks/useAuth';
import { FormField } from './FormField';
import { AuthHeader } from './AuthHeader';
import { AuthToggle } from './AuthToggle';
import { ThemeToggle } from './ThemeToggle';
import type { AuthFormProps, RegisterCredentials } from '@/types/auth';

/**
 * Register form component with validation and modern React patterns
 * Now integrated with Strapi authentication
 */
export const RegisterForm = React.memo<AuthFormProps>(({
  onSwitchMode,
  isDark,
  onToggleTheme,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const initialValues: RegisterCredentials = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    values,
    errors,
    isFormValid,
    setValue,
    validateForm,
  } = useFormValidation(initialValues, registerValidationSchema);

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
    registerButton: {
      ...baseStyles.ctaButton,
    },
    registerButtonText: baseStyles.ctaButtonText,
  });

  // Wheel-to-scroll behavior on web: forward global wheel events to the form's ScrollView
  const scrollId = useMemo(() => 'auth-scroll-register', []);

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

  const handleRegister = useCallback(async () => {
    const validation = await validateForm();

    // Permitimos intentar aunque la validación local falle
    if (!validation.isValid) {
      const msg = 'Campos inválidos localmente — intentando de todos modos.';
      if (Platform.OS === 'web') {
        alert(msg);
      } else {
        Alert.alert('Validación', msg);
      }
    }

    setIsSubmitting(true);
    try {
      await register(values);
      // El hook useAuth maneja la navegación automáticamente
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el registro';
      if (Platform.OS === 'web') {
        alert(errorMessage);
      } else {
        Alert.alert('Error de Registro', errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, values, register]);

  const handleSwitchToLogin = useCallback(() => {
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
            currentMode="register"
            onModeChange={() => handleSwitchToLogin()}
            isDark={isDark}
          />

          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>
                Completa los datos para crear tu nueva cuenta
              </Text>
            </View>

            <View style={styles.form}>
              <FormField
                label="Nombre"
                value={values.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Tu nombre completo"
                icon="person"
                error={errors.name}
                autoCapitalize="words"
                isDark={isDark}
              />

              <FormField
                label="Usuario"
                value={values.username}
                onChangeText={(value) => handleInputChange('username', value)}
                placeholder="Nombre de usuario único"
                icon="person"
                error={errors.username}
                autoCapitalize="none"
                isDark={isDark}
              />

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
                placeholder="Contraseña segura"
                icon="lock"
                error={errors.password}
                secureTextEntry
                isDark={isDark}
              />

              <FormField
                label="Confirmar Contraseña"
                value={values.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirma tu contraseña"
                icon="lock"
                error={errors.confirmPassword}
                secureTextEntry
                isDark={isDark}
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel="Crear cuenta"
                accessibilityHint="Toca para crear tu nueva cuenta"
              >
                {isSubmitting ? (
                  <ActivityIndicator
                    size="small"
                    color={isDark ? palette.text.light : palette.text.light}
                  />
                ) : (
                  <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                )}
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

RegisterForm.displayName = 'RegisterForm';
