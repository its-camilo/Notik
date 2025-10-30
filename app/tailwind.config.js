/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      borderRadius: {
        'xl2': '20px',
        'pill': '28px',
      },
      boxShadow: {
        'card-light': '0 3px 8px -2px rgba(0,0,0,0.06)',
        'card-strong': '0 4px 12px -2px rgba(0,0,0,0.15)',
        'glow-brown': '0 0 0 1px #7A3F12, 0 4px 16px -4px rgba(122,63,18,0.35)',
      },
    },
  },
  plugins: [],
}
