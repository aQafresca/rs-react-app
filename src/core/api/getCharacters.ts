import {
  ApiResponseSchema,
  type TApiResponse,
} from '@/shema/characterShema.ts';

export const getCharacters = async (page = 1): Promise<TApiResponse> => {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;

  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching characters');
  }

  return ApiResponseSchema.parse(await response.json());
};
