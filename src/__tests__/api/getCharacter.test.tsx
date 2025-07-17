import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters } from '@/core/api/getCharacters.ts';
import { API_URL } from '@/constants/constants';
import { ApiResponseSchema } from '@/shema/characterShema';

const mockData = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
  ],
};

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

    expect(fetch).toHaveBeenCalledWith(new URL(`${API_URL}1`));
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

    const expectedUrl = new URL(`${API_URL}2`);
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
