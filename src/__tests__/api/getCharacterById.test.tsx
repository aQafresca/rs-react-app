import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacterById } from '@/core/api/getCharactersById.ts';
import { CharacterSchema } from '@/shema/characterShema.ts';
import { API_URL } from '@/constants/constants.ts';
import { character } from '@/constants/tests.ts';

describe('getCharacterById', (): void => {
  beforeEach((): void => {
    vi.resetAllMocks();
  });

  it('should fetch character by ID successfully', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(character),
      })
    );

    const data = await getCharacterById(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL.ID}1`);
    expect(data).toEqual(CharacterSchema.parse(character));
  });

  it('should throw "not found" error for 404 response', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    await expect(getCharacterById(999)).rejects.toThrow(
      'Character with ID 999 not found.'
    );
  });

  it('should throw generic error for non-200 response', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    await expect(getCharacterById(5)).rejects.toThrow(
      'Network response was not ok: Internal Server Error (Status: 500)'
    );
  });

  it('should throw schema validation error if response data is invalid', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' }),
      })
    );

    await expect(getCharacterById(1)).rejects.toThrow();
  });
});
