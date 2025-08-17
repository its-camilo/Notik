import React, { memo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
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
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
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
