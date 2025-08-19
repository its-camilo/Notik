/**
 * Authentication related types and interfaces
 */

export type AuthMode = 'login' | 'register';

export type ThemeMode = 'light' | 'dark';

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface RegisterCredentials {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}

/**
 * User data structure from Strapi authentication
 */
export interface User {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly provider: string;
  readonly confirmed: boolean;
  readonly blocked: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Authentication response from Strapi
 */
export interface AuthResponse {
  readonly jwt: string;
  readonly user: User;
}

/**
 * Estado de autenticación para el contexto global
 */
export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly user: User | null;
  readonly error: string | null;
}

/**
 * Acciones del contexto de autenticación
 */
export interface AuthContextValue extends AuthState {
  readonly login: (email: string, password: string) => Promise<void>;
  readonly register: (data: RegisterCredentials) => Promise<void>;
  readonly logout: () => Promise<void>;
  readonly checkAuth: () => Promise<void>;
}

export interface FormValidation {
  readonly isValid: boolean;
  readonly errors: Readonly<Record<string, string>>;
}

export interface AuthFormProps {
  readonly onSwitchMode: () => void;
  readonly isDark: boolean;
  readonly onToggleTheme?: () => void;
}

export interface AuthScreenProps {
  readonly initialMode?: AuthMode;
}

export interface ThemeToggleProps {
  readonly isDark: boolean;
  readonly onToggle: () => void;
}

export interface AuthHeaderProps {
  readonly isDark: boolean;
}

export interface AuthToggleProps {
  readonly currentMode: AuthMode;
  readonly onModeChange: (mode: AuthMode) => void;
  readonly isDark: boolean;
}

/**
 * Icon name type for Material Icons
 */
export type MaterialIconName =
  | 'person'
  | 'email'
  | 'lock'
  | 'visibility'
  | 'visibility-off'
  | 'add'
  | 'folder'
  | 'logout'
  | 'dark-mode'
  | 'light-mode'
  | 'chevron-left'
  | 'chevron-right';

export interface FormFieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder: string;
  readonly icon: MaterialIconName;
  readonly error?: string;
  readonly secureTextEntry?: boolean;
  readonly keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  readonly autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  readonly isDark: boolean;
}

/**
 * Theme context value type
 */
export interface ThemeContextValue {
  readonly isDark: boolean;
  readonly effectiveScheme: ThemeMode;
  readonly themeOverride: ThemeMode | null;
  readonly toggleTheme: () => void;
  readonly setTheme: (theme: ThemeMode | null) => void;
}
