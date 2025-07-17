import CardList from '@components/CardList/CardList.tsx';
import { createMockComponent } from '@/__tests__/__mocks__/createMockComponent.tsx';
import * as api from '@/core/api/getCharacters.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { searchStore } from '@/core/store/searchStore.ts';
import { screen, render, waitFor } from '@testing-library/react';
import { mockData } from '@/constants/tests.ts';

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

describe('CardList', (): void => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(searchStore, 'getQuery').mockReturnValue('');
    vi.spyOn(searchStore, 'subscribe').mockImplementation(() => (): void => {
      vi.fn();
    });
  });

  it('displays cards after loading', async (): Promise<void> => {
    vi.spyOn(api, 'getCharacters').mockResolvedValue(mockData);

    render(<CardList />);

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

    render(<CardList />);

    await waitFor((): void => {
      expect(screen.getByTestId('empty-list')).toHaveTextContent(
        'No results found'
      );
    });
  });
});
