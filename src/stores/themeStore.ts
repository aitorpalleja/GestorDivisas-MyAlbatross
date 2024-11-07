import { create } from 'zustand';
import { darkTheme, lightTheme } from '../styles/theme';

type ThemeState = {
  isDarkMode: boolean;
  theme: typeof darkTheme;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true, 
  theme: darkTheme,
  toggleTheme: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
      theme: state.isDarkMode ? lightTheme : darkTheme,
    })),
}));