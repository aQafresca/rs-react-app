'use client';

import { createContext } from 'react';
import type { IThemeContextType } from '@/shared/type/interface';

export const ThemeContext = createContext<IThemeContextType | undefined>(
  undefined
);
