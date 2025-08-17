import CardList from '@components/CardList/CardList.tsx';
import type { JSX } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import type { TApiResponse } from '@/scheme/characterScheme.ts';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

const fetchCharacters = async (queryData: {
  currentPage: number;
  query: string;
}): Promise<TApiResponse> => {
  return getCharacters(queryData.currentPage, queryData.query);
};

interface IHomeProps {
  searchParams: {
    page?: string;
    name?: string;
  };
}

const CardListV2 = async ({
  searchParams,
}: IHomeProps): Promise<JSX.Element> => {
  const awaitedSearchParams = await searchParams;
  const currentPage = Number(awaitedSearchParams.page) || 1;
  const query: string = awaitedSearchParams.name ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['characters', currentPage, query],
    queryFn: () => fetchCharacters({ currentPage, query }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList currentPage={currentPage} />
    </HydrationBoundary>
  );
};

export default CardListV2;
