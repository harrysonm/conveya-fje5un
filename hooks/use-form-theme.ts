"use client";

import { useThemeStore } from "@/stores/theme-store";

export function useFormTheme() {
  const { theme } = useThemeStore();

  const getThemeStyles = () => {
    const spacingMap = {
      compact: '0.75rem',
      comfortable: '1.5rem',
      spacious: '2rem'
    };

    const radiusMap = {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    };

    return {
      container: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: `${theme.fonts.body}, system-ui`,
        "--theme-primary": theme.colors.primary.value,
        "--theme-border": theme.colors.border,
        "--theme-radius": radiusMap[theme.borderRadius],
        "--theme-spacing": spacingMap[theme.spacing],
        "--theme-heading-font": theme.fonts.heading,
        "--theme-body-font": theme.fonts.body
      } as React.CSSProperties,
      content: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: spacingMap[theme.spacing]
      } as React.CSSProperties
    };
  };

  return {
    theme,
    getThemeStyles
  };
}