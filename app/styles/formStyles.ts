import { StyleSheet } from 'react-native';
import { palette, radius, spacing, shadows } from './design-tokens';

export const createFormStyles = (isDark: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? palette.surface.darkBase : palette.surface.lightBase,
      padding: spacing.xl,
    },
    card: {
      backgroundColor: isDark ? palette.surface.dark : palette.surface.light,
      borderRadius: radius.xl2,
      padding: spacing.xl + 4,
      borderWidth: 1,
      borderColor: isDark ? '#262626' : palette.surface.border,
      ...(isDark ? {} : shadows.cardLight),
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? palette.text.dark : palette.text.light,
      marginBottom: 4,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? palette.surface.darkAlt : palette.surface.lightAlt,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: isDark ? '#262626' : palette.surface.borderAlt,
      paddingHorizontal: 14,
      height: 50,
      marginBottom: spacing.lg,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDark ? palette.text.dark : palette.text.light,
    },
    ctaButton: {
      backgroundColor: isDark ? palette.surface.light : palette.brand.brown,
      borderRadius: radius.lg,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      ...(isDark ? {} : shadows.buttonLight),
    },
    ctaButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? palette.text.light : palette.surface.light,
    },
  });

// Optional Tailwind class group tokens for Nativewind usage
export const tw = {
  containerLight: 'min-h-screen bg-surface-lightBase px-6 py-8',
  containerDark: 'min-h-screen bg-black px-6 py-8',
  card: 'rounded-xl2 border border-surface-border bg-surface-light shadow-card-light dark:bg-surface-dark dark:border-[#262626]',
  fieldLabel: 'text-sm font-semibold text-text-baseLight dark:text-text-baseDark mb-1',
  inputWrapper:
    'flex-row items-center h-[50px] px-3.5 rounded-lg border bg-surface-lightAlt border-surface-borderAlt dark:bg-surface-darkAlt dark:border-[#262626]',
  ctaButton:
    'h-[50px] rounded-lg justify-center items-center bg-brand-brown dark:bg-surface-light shadow-card-strong',
  ctaButtonText:
    'text-base font-semibold text-white dark:text-text-baseLight',
};
