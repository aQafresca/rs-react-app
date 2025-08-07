import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterById } from '@/hooks/useCharacterById';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { baseCharacter } from '@/constants/tests.ts';
import * as api from '@/core/api/getCharactersById';

vi.mock('@/core/api/getCharactersById');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCharacterById', (): void => {
  const getCharacterByIdMock = vi.mocked(api.getCharacterById);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns data when fetch is successful', async (): Promise<void> => {
    getCharacterByIdMock.mockResolvedValueOnce(baseCharacter);

    const { result } = renderHook(() => useCharacterById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(baseCharacter);
  });

  it('returns error when fetch fails', async () => {
    getCharacterByIdMock.mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useCharacterById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Fetch failed');
  });

  it('does not fetch if id is null', () => {
    const { result } = renderHook(() => useCharacterById(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(getCharacterByIdMock).not.toHaveBeenCalled();
  });
});
