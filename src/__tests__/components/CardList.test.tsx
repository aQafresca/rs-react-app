import CardList from '@components/CardList/CardList.tsx';
import { createMockComponent } from '@/__tests__/__mocks__/createMockComponent.tsx';
import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { searchStore } from '@/core/store/searchStore.ts';
import { screen, waitFor } from '@testing-library/react';
import { mockData } from '@/constants/tests.ts';
import { useLocation } from 'react-router-dom';
import { type useCharacters } from '@/hooks/useCharacters.ts';
import { renderWithProviders } from '@/__tests__/utils/renderWithProvider.tsx';

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

const mockUseCharacters = vi.fn<typeof useCharacters>();

vi.mock('@/hooks/useCharacters.ts', () => {
  type TUseCharacters = typeof import('@/hooks/useCharacters.ts').useCharacters;
  return {
    useCharacters: (...args: Parameters<TUseCharacters>) =>
      mockUseCharacters(...args),
  };
});

const LocationWatcher = () => {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
};

const renderWithRouterAndLocationWatcher = (
  ui: React.ReactNode,
  initialEntries: string[] = ['/']
) =>
  renderWithProviders(
    <>
      <LocationWatcher />
      {ui}
    </>,
    { initialEntries }
  );

describe('CardList component', (): void => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchStore.setQuery('');
  });

  it('displays the loader when loading', (): void => {
    mockUseCharacters.mockReturnValue({
      data: undefined,
      isError: false,
      isPending: true,
      isLoading: true,
      isSuccess: false,
      isFetched: false,
      isFetching: false,
      isStale: false,
      error: null,
      failureCount: 0,
      isFetchedAfterMount: false,
      refetch: vi.fn(),
      status: 'pending',
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isEnabled: false,
      fetchStatus: 'fetching',
      promise: Promise.resolve(mockData),
    });
    renderWithProviders(<CardList />);
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
  });

  it('displays the list of cards when data is loaded', async (): Promise<void> => {
    mockUseCharacters.mockReturnValue({
      data: mockData,
      isError: false,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isFetched: true,
      isFetching: false,
      isStale: false,
      error: null,
      failureCount: 0,
      isFetchedAfterMount: true,
      refetch: vi.fn(),
      status: 'success',
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      dataUpdatedAt: 1,
      errorUpdatedAt: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isEnabled: true,
      fetchStatus: 'idle',
      promise: Promise.resolve(mockData),
    });

    renderWithProviders(<CardList />);

    await waitFor(() => {
      expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    });

    const cardElements = await screen.findAllByTestId('mock-card');
    expect(cardElements).toHaveLength(mockData.results.length);
  });

  it('displays the empty list message when data is empty', async (): Promise<void> => {
    const mockEmptyData = {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };

    mockUseCharacters.mockReturnValue({
      data: mockEmptyData,
      isError: false,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isFetched: true,
      isFetching: false,
      isStale: false,
      error: null,
      failureCount: 0,
      isFetchedAfterMount: true,
      refetch: vi.fn(),
      status: 'success',
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      dataUpdatedAt: 1,
      errorUpdatedAt: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isEnabled: true,
      fetchStatus: 'idle',
      promise: Promise.resolve(mockEmptyData),
    });

    renderWithProviders(<CardList />);

    await waitFor((): void => {
      expect(screen.getByTestId('empty-list')).toBeInTheDocument();
      expect(screen.queryAllByTestId('mock-card')).toHaveLength(0);
    });
  });

  it('adds the name parameter to the URL when searchStore query changes', async (): Promise<void> => {
    mockUseCharacters.mockReturnValue({
      data: mockData,
      isError: false,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isFetched: true,
      isFetching: false,
      isStale: false,
      error: null,
      failureCount: 0,
      isFetchedAfterMount: true,
      refetch: vi.fn(),
      status: 'success',
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      dataUpdatedAt: 1,
      errorUpdatedAt: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isEnabled: true,
      fetchStatus: 'idle',
      promise: Promise.resolve(mockData),
    });

    renderWithRouterAndLocationWatcher(<CardList />, ['/']);

    await waitFor(() => {
      expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    });

    searchStore.setQuery('rick');

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toContain(
        '?name=rick'
      );
    });
  });

  it('displays pagination when data is not empty', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockData,
      isError: false,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isFetched: true,
      isFetching: false,
      isStale: false,
      error: null,
      failureCount: 0,
      isFetchedAfterMount: true,
      refetch: vi.fn(),
      status: 'success',
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      dataUpdatedAt: 1,
      errorUpdatedAt: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isEnabled: true,
      fetchStatus: 'idle',
      promise: Promise.resolve(mockData),
    });

    renderWithProviders(<CardList />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
    });
  });
});
