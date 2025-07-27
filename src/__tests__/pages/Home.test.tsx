import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@components/pages/Home/Home.tsx';
import { ROUTES } from '@/constants/constants.ts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@components/CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-cardList" />,
}));

vi.mock('@components/SearchBar/SearchBar.tsx', () => ({
  default: () => <div data-testid="mock-searchbar" />,
}));

describe('HomePage', () => {
  it('renders SearchBar and CardList components', (): void => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Routes>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-searchbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cardList')).toBeInTheDocument();
  });

  it('renders on home route without errors', (): void => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Routes>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-cardList')).toBeInTheDocument();
  });

  it('renders on non-home route without errors', (): void => {
    render(
      <MemoryRouter initialEntries={['/some-other-route']}>
        <Routes>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-cardList')).toBeInTheDocument();
  });
});
