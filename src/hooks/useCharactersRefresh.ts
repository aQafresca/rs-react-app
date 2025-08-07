import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useCharactersRefresh = (): (() => void) => {
  const queryClient = useQueryClient();
  return useCallback((): void => {
    void queryClient.invalidateQueries({ queryKey: ['characters'] });
    void queryClient.invalidateQueries({ queryKey: ['character'] });
  }, [queryClient]);
};
