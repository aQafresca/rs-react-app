import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header/Header.tsx';
import { menuLinks } from '@/constants/constants.ts';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
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
});
