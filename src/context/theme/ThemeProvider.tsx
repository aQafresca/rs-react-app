import {
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  type JSX,
  useMemo,
} from 'react';
import { ThemeContext } from '@/context/theme/ThemeContext.tsx';
import type { Theme } from '@/type/interface.ts';

import { LOCALSTORAGE_KEYS } from '@/constants/constants.ts';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>((): 'dark' | 'light' => {
    try {
      const savedTheme = localStorage.getItem(LOCALSTORAGE_KEYS.THEME);
      return savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : 'dark';
    } catch (error) {
      console.error(error);
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(LOCALSTORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const contextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
