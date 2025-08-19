import { useState, useCallback, useMemo, useRef } from 'react';
import * as yup from 'yup';
import type { LoginCredentials, RegisterCredentials, FormValidation } from '@/types/auth';

/**
 * Hook state interface for type safety
 */
interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

/**
 * Return type for the useFormValidation hook
 */
interface UseFormValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isFormValid: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  validateField: (field: keyof T, value: T[keyof T]) => Promise<boolean>;
  validateForm: () => Promise<FormValidation>;
  resetForm: () => void;
}

/**
 * Custom hook for form validation using Yup schemas
 * Implements optimized validation with proper TypeScript support
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationSchema: yup.ObjectSchema<T>
): UseFormValidationReturn<T> {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });

  // Use ref to store the validation schema to avoid unnecessary re-renders
  const schemaRef = useRef(validationSchema);
  schemaRef.current = validationSchema;

  const validateField = useCallback(
    async (field: keyof T, value: T[keyof T]): Promise<boolean> => {
      try {
        // Validate single field by creating a partial object
        const partialValues = { [field]: value } as Partial<T>;
        await schemaRef.current.validateAt(field as string, partialValues);

        setState(prev => ({
          ...prev,
          errors: { ...prev.errors, [field]: '' }
        }));
        return true;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [field]: error.message }
          }));
          return false;
        }
        return false;
      }
    },
    []
  );

  const validateForm = useCallback(async (): Promise<FormValidation> => {
    try {
      await schemaRef.current.validate(state.values, { abortEarly: false });
      setState(prev => ({ ...prev, errors: {} }));
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setState(prev => ({ ...prev, errors: newErrors }));
        return { isValid: false, errors: newErrors };
      }
      return { isValid: false, errors: {} };
    }
  }, [state.values]);

  const setValue = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setState(prev => ({
        ...prev,
        values: { ...prev.values, [field]: value },
        touched: { ...prev.touched, [field]: true }
      }));

      // Validate on every change (validate-on-change)
      // fire-and-forget async validation so UI updates errors when available
      void validateField(field, value);
    },
    [validateField]
  );

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
    });
  }, [initialValues]);

  const isFormValid = useMemo(() => {
    const hasErrors = Object.values(state.errors).some(error => error !== '');
    const hasTouchedFields = Object.keys(state.touched).length > 0;
    return !hasErrors && hasTouchedFields;
  }, [state.errors, state.touched]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isFormValid,
    setValue,
    validateField,
    validateForm,
    resetForm,
  };
}

/**
 * Validation schemas for authentication forms
 */
export const loginValidationSchema: yup.ObjectSchema<LoginCredentials> = yup.object({
  email: yup
    .string()
    .email('Ingresa un correo válido')
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

export const registerValidationSchema: yup.ObjectSchema<RegisterCredentials> = yup.object({
  username: yup
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos')
    .required('El usuario es requerido'),
  email: yup
    .string()
    .email('Ingresa un correo válido')
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    )
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});
