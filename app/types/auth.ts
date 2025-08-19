/**
 * Authentication related types and interfaces
 */

export type AuthMode = 'login' | 'register';

export type ThemeMode = 'light' | 'dark';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Estado de autenticación para el contexto global
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
}

/**
 * Acciones del contexto de autenticación
 */
export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface AuthFormProps {
  onSwitchMode: () => void;
  isDark: boolean;
  onToggleTheme?: () => void;
}

export interface AuthScreenProps {
  initialMode?: AuthMode;
}

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export interface AuthHeaderProps {
  isDark: boolean;
}

export interface AuthToggleProps {
  currentMode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  isDark: boolean;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  isDark: boolean;
}
