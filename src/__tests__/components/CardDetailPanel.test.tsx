import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import CardDetailPanel from '@components/CardList/Card/Detail/Panel/Panel.tsx';
import { BUTTON_LABELS } from '@/constants/constants.ts';
import { fireEvent } from '@testing-library/react';
import { character } from '@/constants/tests';
import * as routerDom from 'react-router-dom';
import * as api from '@/core/api/getCharactersById.ts';
import renderWithRouter from '@/__tests__/utils/renderWithRouter.tsx';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('@/core/api/getCharactersById.ts', () => ({
  getCharacterById: vi.fn(),
}));

vi.mock('@components/CardList/Card/Detail/Detail.tsx', () => ({
  default: () => <div>MockCardDetail</div>,
}));

vi.mock('@components/Loader/Loader.tsx', () => ({
  default: () => <div data-testid="loader-mock">Loading...</div>,
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

  it('renders loader while fetching data', (): void => {
    vi.spyOn(api, 'getCharacterById').mockImplementation(
      () =>
        new Promise((): void => {
          vi.fn();
        })
    );

    renderWithRouter(<CardDetailPanel />, {
      path: '/character/:id',
      initialEntries: ['/character/1'],
    });

    expect(screen.getByTestId('loader-mock')).toBeInTheDocument();
  });

  it('renders character details after successful fetch', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(character);

    renderWithRouter(<CardDetailPanel />, {
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

  it('navigates to home on "Exit" button click', async () => {
    const navigateMock = vi.fn();
    vi.mocked(routerDom.useNavigate).mockReturnValue(navigateMock);
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(character);

    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...originalLocation,
      search: '?page=2&name=alive',
    });

    renderWithRouter(<CardDetailPanel />, {
      path: '/:id',
      initialEntries: ['/1'],
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: BUTTON_LABELS.EXIT })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: BUTTON_LABELS.EXIT }));

    expect(navigateMock).toHaveBeenCalledWith({
      pathname: '/',
      search: '?page=2&name=alive',
    });
  });
  it('redirects to not-found page on fetch error', async () => {
    vi.spyOn(api, 'getCharacterById').mockRejectedValue(
      new Error('fetch failed')
    );

    renderWithRouter(<CardDetailPanel />, {
      path: '/:id',
      initialEntries: ['/1'],
    });

    await waitFor(() => {
      expect(screen.queryByText('MockCardDetail')).not.toBeInTheDocument();
      expect(screen.queryByTestId('loader-mock')).not.toBeInTheDocument();
    });
  });
});
