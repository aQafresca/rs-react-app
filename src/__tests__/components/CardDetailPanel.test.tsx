import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import CardDetailPanel from '@components/CardList/Card/Detail/Panel/Panel.tsx';
import { BUTTON_LABELS, ROUTES } from '@/constants/constants.ts';
import { fireEvent } from '@testing-library/react';
import { character } from '@/constants/tests';
import * as routerDom from 'react-router-dom';
import { type useCharacterById } from '@/hooks/useCharacterById.ts';
import { renderWithProviders } from '@/__tests__/utils/renderWithProvider.tsx';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  const MockedNavigate = vi.fn(() => null);
  return {
    ...actual,
    Navigate: MockedNavigate,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('@/hooks/useCharacterById.tests.ts');

vi.mock('@components/CardList/Card/Detail/Detail.tsx', () => ({
  default: () => <div>MockCardDetail</div>,
}));

vi.mock('@components/Loader/Loader.tsx', () => ({
  default: () => <div data-testid="mock-loader">Loading...</div>,
}));

vi.mock('@components/Button/Button.tsx', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: string;
    onClick: () => void;
  }) => (
    <button type={'button'} onClick={onClick}>
      {children}
    </button>
  ),
}));

const mockUseCharacterById = vi.fn<typeof useCharacterById>();

vi.mock('@/hooks/useCharacterById.tests.ts', () => {
  type TUseCharacterById =
    typeof import('@/hooks/useCharacterById.ts').useCharacterById;
  return {
    useCharacterById: (...args: Parameters<TUseCharacterById>) =>
      mockUseCharacterById(...args),
  };
});

describe('CardDetailPanel', (): void => {
  let originalLocation: Location;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(routerDom.useParams).mockReturnValue({ id: '1' });
    vi.mocked(routerDom.useNavigate).mockReturnValue(vi.fn());

    originalLocation = window.location;
  });

  afterEach(() => {
    vi.spyOn(window, 'location', 'get').mockRestore();
  });

  it('displays the loader when loading', (): void => {
    mockUseCharacterById.mockReturnValue({
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
      promise: Promise.resolve(character),
    });

    renderWithProviders(<CardDetailPanel />, {
      path: '/:id',
      initialEntries: ['/1'],
    });

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
  });

  it('renders character details after successful fetch', async () => {
    mockUseCharacterById.mockReturnValue({
      data: character,
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
      promise: Promise.resolve(character),
    });

    renderWithProviders(<CardDetailPanel />, {
      path: '/:id',
      initialEntries: ['/1'],
    });

    await waitFor(() => {
      expect(screen.getByText('MockCardDetail')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: BUTTON_LABELS.EXIT })
      ).toBeInTheDocument();
    });
  });

  it('navigates to home on "Exit" button click, preserving search params', async () => {
    const navigateMock = vi.fn();
    vi.mocked(routerDom.useNavigate).mockReturnValue(navigateMock);

    mockUseCharacterById.mockReturnValue({
      data: character,
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
      promise: Promise.resolve(character),
    });

    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...originalLocation,
      search: '?page=2&name=alive',
    });

    renderWithProviders(<CardDetailPanel />, {
      path: '/:id',
      initialEntries: ['/1'],
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_LABELS.EXIT }));
    });

    expect(navigateMock).toHaveBeenCalledWith({
      pathname: ROUTES.HOME,
      search: '?page=2&name=alive',
    });
  });
});
