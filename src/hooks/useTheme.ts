import { use } from 'react';
import { ThemeContext } from '@/context/theme/ThemeContext.tsx';

export const useTheme = () => {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
};
