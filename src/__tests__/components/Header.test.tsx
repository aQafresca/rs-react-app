import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import Header from '@/components/Header/Header';
import { ThemeProvider } from '@/context/theme/ThemeProvider';
import React from 'react';

vi.mock('@components/Button/Button', () => ({
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

vi.mock('@components/localeSwitcher/LocaleSwitcher', () => ({
  default: () => <div>LocaleSwitcher</div>,
}));

const toggleThemeMock = vi.fn();
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: toggleThemeMock,
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  });

  it('renders all navigation links from menuLinks', (): void => {
    const links = ['links.Home', 'links.about'];
    links.forEach((text): void => {
      const linkElement: HTMLElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe('A');
    });
  });

  it('renders a navigation element', (): void => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the theme toggle icon inside button', (): void => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).not.toBe('');
  });

  it('toggles theme when button is clicked', async () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor((): void => {
      expect(toggleThemeMock).toHaveBeenCalled();
    });
  });
});
