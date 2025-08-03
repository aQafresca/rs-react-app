import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header/Header.tsx';
import { menuLinks } from '@/constants/constants.ts';
import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx';

vi.mock('@components/Button/Button.tsx', () => ({
  default: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <div role="button" onClick={onClick}>
      {children}
    </div>
  ),
}));

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </BrowserRouter>
    );
  });

  it('renders all navigation links from menuLinks', (): void => {
    menuLinks.forEach((link): void => {
      const linkElement = screen.getByText(link.caption);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.route);
      expect(linkElement.tagName).toBe('A');
    });
  });

  it('renders a navigation element', (): void => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the theme toggle icon inside button', (): void => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).not.toBe(''); // проверка, что иконка есть
  });

  it('toggles theme when button is clicked', async (): Promise<void> => {
    const button = screen.getByRole('button');
    const initialTheme = document.documentElement.getAttribute('data-theme');

    fireEvent.click(button);

    await waitFor(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
      expect(newTheme).not.toBeNull();
    });
  });
});
