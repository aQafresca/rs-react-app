import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/core/api/getCharacters.ts';
import type { TApiResponse } from '@/shema/characterShema.ts';

export const useCharacters = (page: number, query: string) => {
  return useQuery<TApiResponse, Error>({
    queryKey: ['characters', page, query],
    queryFn: () => getCharacters(page, query),
  });
};
