import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  isCompact: boolean;
  toggleDarkMode: () => void;
  toggleCompactMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDark: false,
      isCompact: false,
      toggleDarkMode: () => set(state => ({ isDark: !state.isDark })),
      toggleCompactMode: () => set(state => ({ isCompact: !state.isCompact })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
