import CardList from '@components/CardList/CardList.tsx';
import { createMockComponent } from '@/__tests__/__mocks__/createMockComponent.tsx';
import * as api from '@/core/api/getCharacters.ts';
import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { searchStore } from '@/core/store/searchStore.ts';
import { screen, waitFor } from '@testing-library/react';
import { mockData } from '@/constants/tests.ts';
import { useLocation } from 'react-router-dom';
import renderWithRouter from '@/__tests__/utils/renderWithRouter.tsx';

vi.mock('@components/CardList/Card/Card.tsx', () => ({
  default: ({ name }: { name: string }) =>
    createMockComponent('mock-card', name)({}),
}));

vi.mock('@components/EmptyList/EmptyList.tsx', () => ({
  default: () => <div data-testid="empty-list">No results found</div>,
}));

vi.mock('@components/Loader/Loader.tsx', () => ({
  default: () => <div data-testid="mock-loader">Loading...</div>,
}));

vi.mock('@components/Pagination/Pagination.tsx', () => ({
  default: () => <div data-testid="mock-pagination">Pagination</div>,
}));

vi.mock('@/core/api/getCharacters', () => ({
  getCharacters: vi.fn().mockResolvedValue({
    results: [],
    info: { pages: 0 },
  }),
}));

const LocationWatcher = () => {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
};

describe('CardList — searchStore sync', (): void => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchStore.setQuery('');
  });

  const renderWithRouterAndLocationWatcher = (
    ui: React.ReactNode,
    initialEntries: string[] = ['/']
  ) =>
    renderWithRouter(
      <>
        <LocationWatcher />
        {ui}
      </>,
      { initialEntries }
    );

  it('removes the name parameter from the URL if an empty string is passed', async (): Promise<void> => {
    renderWithRouterAndLocationWatcher(<CardList />, ['/']);

    await waitFor((): void => {
      expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    });

    searchStore.setQuery('rick');

    await waitFor((): void => {
      expect(screen.getByTestId('location').textContent).toContain(
        '?name=rick'
      );
    });
  });

  it('updates the name parameter in the URL when searchStore changes', async (): Promise<void> => {
    renderWithRouterAndLocationWatcher(<CardList />, ['/?name=rick']);

    await waitFor((): void => {
      expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    });

    searchStore.setQuery('');

    await waitFor((): void => {
      const currentSearch: string | null =
        screen.getByTestId('location').textContent;
      expect(currentSearch).not.toContain('name=');
    });
  });
});

describe('CardList', (): void => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(searchStore, 'getQuery').mockReturnValue('');
    vi.spyOn(searchStore, 'subscribe').mockImplementation(
      (cb): (() => void) => {
        cb('');
        return (): void => {
          vi.fn();
        };
      }
    );
  });

  it('displays cards after loading', async (): Promise<void> => {
    vi.spyOn(api, 'getCharacters').mockResolvedValue(mockData);

    renderWithRouter(<CardList />);

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('mock-card')).toHaveTextContent('Rick Sanchez');
      expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
    });
  });

  it('displays an empty list if no characters are found', async (): Promise<void> => {
    vi.spyOn(api, 'getCharacters').mockResolvedValue({
      info: {
        pages: 0,
        count: 0,
        next: null,
        prev: null,
      },
      results: [],
    });

    renderWithRouter(<CardList />);

    await waitFor((): void => {
      expect(screen.getByTestId('empty-list')).toHaveTextContent(
        'No results found'
      );
    });
  });
});
