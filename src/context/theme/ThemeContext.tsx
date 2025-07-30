import { createContext } from 'react';
import type { IThemeContextType } from '@/type/interface.ts';

export const ThemeContext = createContext<IThemeContextType | undefined>(
  undefined
);
