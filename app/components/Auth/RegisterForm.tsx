import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createFormStyles } from '@/styles/formStyles';
import { palette } from '@/styles/design-tokens';
import * as yup from 'yup';

export interface RegisterFormProps {
  onSwitchToLogin: () => void;
  isDark: boolean; // provided by parent
  onToggleTheme?: () => void;
}

export function RegisterForm({ onSwitchToLogin, isDark, onToggleTheme }: RegisterFormProps) {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState<string>('');

  // Email validation schema
  const emailSchema = yup.string().email('Ingresa un correo válido').required('El correo es requerido');

  const base = createFormStyles(isDark);
  const styles = StyleSheet.create({
    ...base,
  // increase top padding so logo sits further from the top edge,
  // keep centering and other base screen styles
  container: { ...base.screen, alignItems: 'center', paddingTop: 28 },
  keyboardView: { flex: 1 },
  // make content container span full width so children (form) can reach their own maxWidth
  // add bottom padding so the card sits above the bottom edge on tall screens / soft keyboards
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, paddingBottom: 28, width: '100%' },
    appHeader: { alignItems: 'center', marginBottom: 40 },
  appSubtitle: { fontSize: 16, color: isDark ? palette.text.secondaryDark : '#6B7280', textAlign: 'center', lineHeight: 22 },
    iconContainer: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    toggleContainer: {
      flexDirection: 'row',
      marginBottom: 32,
  // allow a wider toggle; form below can be even wider (see formContainer)
  maxWidth: 1200,
      width: '100%',
      alignSelf: 'center',
      backgroundColor: isDark ? '#1E1E1E' : '#E6D8C9',
      padding: 2,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: isDark ? '#2A2A2A' : '#D9CBBE',
    },
    segment: { flex: 1, height: 44, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  segmentLeft: {},
  segmentRight: {},
    segmentActive: { backgroundColor: isDark ? '#101010' : '#FFFFFF', borderWidth: 1, borderColor: isDark ? '#2A2A2A' : '#DCCFC2' },
    segmentTextInactive: { fontSize: 15, fontWeight: '600', color: isDark ? '#E5E5E5' : '#3F2E1F' },
    segmentTextActive: { fontSize: 15, fontWeight: '600', color: isDark ? '#F5F5F5' : '#2B1C10' },
  // increase the maximum width of the form card to better fit wide screens
  // ensure the form card also keeps distance from the bottom of the screen
  formContainer: { ...base.card, padding: 28, maxWidth: 1200, width: '100%', marginBottom: 24 },
    header: { marginBottom: 24 },
    title: { fontSize: 24, fontWeight: '700', color: isDark ? palette.text.dark : palette.text.light, marginBottom: 8 },
    subtitle: { fontSize: 14, color: isDark ? palette.text.secondaryDark : '#6B7280', lineHeight: 20 },
    form: { gap: 16 },
    inputGroup: { gap: 6 },
    label: base.fieldLabel,
    inputContainer: base.inputWrapper,
    inputIcon: { marginRight: 12 },
    input: base.input,
    registerButton: base.ctaButton,
    registerButtonText: base.ctaButtonText,
    errorText: {
      fontSize: 12,
      color: '#EF4444',
      marginTop: 4,
      fontWeight: '500',
    },
    darkModeToggle: {
      position: 'absolute',
      bottom: 40,
      left: 24,
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? '#1E1E1E' : palette.surface.light,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 1,
      borderColor: isDark ? '#2A2A2A' : '#E5E2DC',
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validate email on change
    if (field === 'email') {
      try {
        emailSchema.validateSync(value);
        setEmailError('');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setEmailError(error.message);
        }
      }
    }
  };

  const handleRegister = () => {
    // TODO: Implement registration logic
    console.log('Register with:', formData);
  };

  const toggleColorScheme = () => {
    onToggleTheme?.();
  };

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
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* App Icon and Title */}
          <View style={styles.appHeader}>
            <View style={styles.iconContainer}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ width: 80, height: 80, borderRadius: 20 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Notik</Text>
            <Text style={styles.appSubtitle}>
              Gestiona tus notas, imágenes y archivos
            </Text>
          </View>

          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.segment, styles.segmentLeft]}
              onPress={() => { console.log('RegisterForm: onSwitchToLogin pressed'); onSwitchToLogin(); }}
              activeOpacity={0.85}
            >
              <Text style={styles.segmentTextInactive}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={[styles.segment, styles.segmentRight, styles.segmentActive]}>
              <Text style={styles.segmentTextActive}>Registrarse</Text>
            </View>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>
                Completa los datos para crear tu nueva cuenta
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
            placeholder="Tu nombre completo"
            placeholderTextColor={isDark ? '#6B7280' : '#8C8379'}
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Usuario</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario único"
                    placeholderTextColor={isDark ? '#6B7280' : '#8C8379'}
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="email"
                    size={20}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="nombre@dominio.com"
                    placeholderTextColor={isDark ? '#6B7280' : '#8C8379'}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="lock"
                    size={20}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña segura"
                    placeholderTextColor={isDark ? '#6B7280' : '#8C8379'}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Contraseña</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="lock"
                    size={20}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirma tu contraseña"
                    placeholderTextColor={isDark ? '#6B7280' : '#8C8379'}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.registerButtonText}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Dark Mode Toggle Button */}
      <TouchableOpacity
        style={styles.darkModeToggle}
        onPress={toggleColorScheme}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={isDark ? 'light-mode' : 'dark-mode'}
          size={24}
          color={isDark ? '#F9FAFB' : '#374151'}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Local styles above compose shared form styles; no extra export needed.
