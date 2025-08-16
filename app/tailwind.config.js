/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        },
        text: {
          baseLight: '#111827',
          baseDark: '#F9FAFB',
          secondaryLight: '#3F2E1F',
          secondaryDark: '#D1D5DB',
        },
  // flat aliases
  'brand-brown': '#7A3F12',
  'brand-accent': '#A16D47',
  'surface-light': '#FFFFFF',
  'surface-light-alt': '#F2EADF',
  'surface-light-base': '#FBF6F1',
  'surface-border': '#D8C9BB',
  'surface-border-alt': '#D9C9BC',
  'surface-dark': '#0F0F0F',
  'surface-dark-alt': '#151515',
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
