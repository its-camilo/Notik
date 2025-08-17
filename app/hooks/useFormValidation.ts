import { useState, useCallback, useMemo } from 'react';
import * as yup from 'yup';
import type { LoginCredentials, RegisterCredentials, FormValidation } from '@/types/auth';

/**
 * Custom hook for form validation using Yup schemas
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationSchema: yup.ObjectSchema<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    async (field: string, value: any) => {
      try {
        // Validate single field by creating a partial object
        const partialValues = { [field]: value } as Partial<T>;
        await validationSchema.validateAt(field, partialValues);
        setErrors(prev => ({ ...prev, [field]: '' }));
        return true;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setErrors(prev => ({ ...prev, [field]: error.message }));
          return false;
        }
        return false;
      }
    },
    [validationSchema]
  );

  const validateForm = useCallback(async (): Promise<FormValidation> => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
        return { isValid: false, errors: newErrors };
      }
      return { isValid: false, errors: {} };
    }
  }, [values, validationSchema]);

  const setValue = useCallback(
    (field: string, value: any) => {
      setValues(prev => ({ ...prev, [field]: value }));
      setTouched(prev => ({ ...prev, [field]: true }));

      // Validate on every change (validate-on-change)
      // fire-and-forget async validation so UI updates errors when available
      void validateField(field, value);
    },
    [validateField]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isFormValid = useMemo(() => {
    return Object.keys(errors).length === 0 && Object.keys(touched).length > 0;
  }, [errors, touched]);

  return {
    values,
    errors,
    touched,
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
  name: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es requerido'),
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
