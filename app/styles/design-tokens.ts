// Central design tokens for reuse across components (JS/TS + Tailwind class names)
export const palette = {
  brand: {
    brown: '#7A3F12',
    brownDark: '#5B2D0C',
    accent: '#A16D47',
  },
  surface: {
    light: '#FFFFFF',
    lightAlt: '#F2EADF',
    lightBase: '#FBF6F1',
    border: '#D8C9BB',
    borderAlt: '#D9C9BC',
    dark: '#0F0F0F',
    darkAlt: '#151515',
    darkBase: '#080808',
  },
  text: {
    light: '#111827',
    dark: '#F9FAFB',
    secondaryLight: '#3F2E1F',
    secondaryDark: '#D1D5DB',
    placeholderLight: '#8C8379',
    placeholderDark: '#6B7280',
  },
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 16,
  xl2: 20,
  pill: 28,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

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
};
