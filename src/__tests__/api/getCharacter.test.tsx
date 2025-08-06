import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters } from '@/core/api/getCharacters.ts';
import { API_URL } from '@/constants/constants';
import { ApiResponseSchema } from '@/shema/characterShema';
import { mockData } from '@/constants/tests';

describe('getCharacters', (): void => {
  beforeEach((): void => {
    vi.resetAllMocks();
  });

  it('should fetch characters without query', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await getCharacters(1);

    expect(fetch).toHaveBeenCalledWith(new URL(`${API_URL.PAGE}1`));
    expect(data).toEqual(ApiResponseSchema.parse(mockData));
  });

  it('should fetch characters with query', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await getCharacters(2, 'Rick');

    const expectedUrl = new URL(`${API_URL.PAGE}2`);
    expectedUrl.searchParams.set('name', 'Rick');

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    expect(data).toEqual(ApiResponseSchema.parse(mockData));
  });

  it('should throw error if fetch fails', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    await expect(getCharacters()).rejects.toThrow('Error fetching characters');
  });
});
