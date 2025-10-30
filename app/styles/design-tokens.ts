// Central design tokens for reuse across components (JS/TS + Tailwind class names)
// Sincronizado con tailwind.config.js para mantener consistencia
export const palette = {
  // Brand colors - Colores principales de marca
  brand: {
    brown: '#7A3F12',
    brownDark: '#5B2D0C',
    accent: '#A16D47',
  },

  // Surface colors - Fondos y superficies
  surface: {
    // Light mode
    light: '#FFFFFF',
    lightAlt: '#F2EADF',
    lightBase: '#FBF6F1',
    // Dark mode
    dark: '#0F0F0F',
    darkAlt: '#151515',
    darkBase: '#080808',
    // Borders
    border: '#D8C9BB',
    borderAlt: '#D9C9BC',
  },

  // Text colors - Colores de texto
  text: {
    // Light mode
    light: '#111827',
    secondaryLight: '#3F2E1F',
    placeholderLight: '#8C8379',
    // Dark mode
    dark: '#F9FAFB',
    secondaryDark: '#D1D5DB',
    placeholderDark: '#6B7280',
    // Icon colors
    iconDark: '#9CA3AF',
  },

  // Neutral colors - Grises y colores neutros
  neutral: {
    25: '#F5F5F5',
    50: '#FAFAFA',
    100: '#F3F3F3',
    150: '#DADADA',
    200: '#E5E5E5',
    300: '#D1D1D1',
    400: '#A3A3A3',
    500: '#888888',
    600: '#777777',
    650: '#374151',
    700: '#525252',
    800: '#404040',
    825: '#2A2A2A',
    850: '#333333',
    875: '#1E1E1E',
    900: '#262626',
    925: '#2B2B2B',
    950: '#0A0A0A',
    975: '#101010',
  },

  // Beige colors - Colores beige/crema complementarios
  beige: {
    50: '#E5E2DC',
    100: '#E6D8C9',
    200: '#DCCFC2',
    300: '#D9CBBE',
    dark: '#2B1C10',
  },

  // Pure colors - Colores puros
  pure: {
    white: '#FFFFFF',
    black: '#000000',
    blackSoft: '#222222',
  },

  // Status colors - Colores de estado
  status: {
    error: '#EF4444',
    errorDark: '#DC2626',
    success: '#10B981',
    successDark: '#059669',
    warning: '#F59E0B',
    warningDark: '#D97706',
    info: '#3B82F6',
    infoDark: '#2563EB',
  },

  // Overlay colors - Colores de overlay (transparentes)
  overlay: {
    dark: 'rgba(0, 0, 0, 0.5)',
    darkLight: 'rgba(0, 0, 0, 0.3)',
    light: 'rgba(255, 255, 255, 0.5)',
  },
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 16,
  xl2: 20,
  pill: 28,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const shadows = {
  cardLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonLight: {
    shadowColor: '#7A3F12',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },
  cardDark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;

export const animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    inOut: 'ease-in-out',
    out: 'ease-out',
    in: 'ease-in',
  },
} as const;
