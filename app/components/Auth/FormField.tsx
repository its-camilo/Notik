import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  type TextInputProps,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createFormStyles } from '@/styles/formStyles';
import type { FormFieldProps } from '@/types/auth';

/**
 * Reusable form field component with consistent styling and validation
 */
export const FormField = memo<FormFieldProps>(({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  isDark,
}) => {
  const baseStyles = createFormStyles(isDark);

  // When this field is a password (secureTextEntry), we briefly show the
  // entered text on each change and then re-enable masking. This creates
  // the common UX where the last-typed characters are visible for a
  // short moment before turning into bullets.
  const [masked, setMasked] = useState<boolean>(secureTextEntry);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sync when prop changes from parent
  useEffect(() => {
    setMasked(secureTextEntry);
  }, [secureTextEntry]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChangeText = useCallback((text: string) => {
    onChangeText?.(text);

    // Avoid toggling secureTextEntry on web because it breaks composition
    // and can result in reversed characters in some browsers. Only
    // briefly reveal on native platforms (iOS/Android).
    if (!secureTextEntry || Platform.OS === 'web') return;

    // reveal for a short moment on native
    setMasked(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMasked(true);
      timeoutRef.current = null;
    }, 700);
  }, [onChangeText, secureTextEntry]);

  const styles = StyleSheet.create({
    inputGroup: {
      gap: 6,
    },
    label: baseStyles.fieldLabel,
    inputContainer: baseStyles.inputWrapper,
    inputIcon: {
      marginRight: 12,
    },
    input: baseStyles.input,
    errorText: {
      fontSize: 12,
      color: '#EF4444',
      marginTop: 4,
      fontWeight: '500',
    },
  });

  const iconColor = isDark ? '#9CA3AF' : '#6B7280';
  const placeholderColor = isDark ? '#6B7280' : '#8C8379';

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={icon as any}
          size={20}
          color={iconColor}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry ? masked : false}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          accessibilityLabel={label}
          accessibilityHint={placeholder}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

FormField.displayName = 'FormField';
