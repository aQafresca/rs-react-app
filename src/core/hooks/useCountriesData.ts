import { useSuspenseQuery } from '@tanstack/react-query';

import fetchCountryData from '@/core/fetch-data/fetchCountryData.ts';
import type { ICountriesData } from '@/type/interface';

export const useCountriesData = () => {
  return useSuspenseQuery<ICountriesData>({
    queryKey: ['countries'],
    queryFn: fetchCountryData,
  });
};
