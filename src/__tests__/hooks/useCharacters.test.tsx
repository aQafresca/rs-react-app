import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters } from '@/hooks/useCharacters';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as api from '@/core/api/getCharacters';
import type { TApiResponse } from '@/shema/characterShema.ts';
import { mockData } from '@/constants/tests.ts';

vi.mock('@/core/api/getCharacters');

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

describe('useCharacters', (): void => {
  const getCharactersMock = vi.mocked(api.getCharacters);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns data when fetch is successful', async (): Promise<void> => {
    getCharactersMock.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useCharacters(1, 'Rick'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('returns error when fetch fails', async () => {
    getCharactersMock.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCharacters(1, 'Morty'), {
      wrapper: createWrapper(),
    });

    await waitFor((): void => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network error');
  });

  it('calls API with correct arguments', async () => {
    const mockData: TApiResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    getCharactersMock.mockResolvedValueOnce(mockData);

    const page = 3;
    const query = 'Summer';

    const { result } = renderHook(() => useCharacters(page, query), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getCharactersMock).toHaveBeenCalledWith(page, query);
  });
});
