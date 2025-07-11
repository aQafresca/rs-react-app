import {
  ApiResponseSchema,
  type TApiResponse,
} from '@/shema/characterShema.ts';
import { API_URL } from '@/constants/constants.ts';

export const getCharacters = async (
  page = 1,
  query = ''
): Promise<TApiResponse> => {
  const url = new URL(`${API_URL}${page}`);

  if (query.trim()) {
    url.searchParams.append('name', query.trim());
  }

  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching characters');
  }

  return ApiResponseSchema.parse(await response.json());
};
