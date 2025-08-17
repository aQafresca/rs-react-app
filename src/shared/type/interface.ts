export type Theme = 'dark' | 'light';

export interface IThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
