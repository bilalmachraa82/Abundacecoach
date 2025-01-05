import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark, isCompact } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.dataset.compact = isCompact.toString();
  }, [isDark, isCompact]);

  return <>{children}</>;
}