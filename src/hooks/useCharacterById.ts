import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '@/core/api/getCharactersById.ts';
import type { TCharacter } from '@/shema/characterShema.ts';

export const useCharacterById = (id: number | null) => {
  const isValidId: boolean = id !== null && !isNaN(id) && id > 0;

  return useQuery<TCharacter, Error>({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id!),
    enabled: isValidId,
  });
};
