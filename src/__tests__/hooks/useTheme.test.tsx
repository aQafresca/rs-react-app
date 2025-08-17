import { renderHook } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme.ts';
import { ThemeContext } from '@/context/theme/ThemeContext';
import type { IThemeContextType } from '@/shared/type/interface.ts';
import { vi, describe, expect, it } from 'vitest';

describe('useTheme', () => {
  it('returns context when used inside ThemeProvider', () => {
    const mockContext: IThemeContextType = {
      theme: 'light',
      toggleTheme: vi.fn(),
    };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={mockContext}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    expect(result.current).toBe(mockContext);
  });

  it('throws error when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used inside ThemeProvider'
    );
  });
});
