import { getCharacterById } from '@/core/api/getCharactersById.ts';
import CardDetailPanel from '@components/CardList/Card/Detail/Panel/Panel.tsx';
import CardListV2 from '@components/CardListV2/CardListV2.tsx';
import type { JSX } from 'react';
import { notFound } from 'next/navigation';
import type { TCharacter, TApiResponse } from '@/scheme/characterScheme.ts';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getCharacters } from '@/core/api/getCharacters.ts';
import styles from './Home.module.scss';
import SearchBar from '@components/SearchBar/SearchBar.tsx';

const fetchCharacter = async (id: number): Promise<TCharacter> => {
  return getCharacterById(id);
};

const fetchCharacters = async (queryData: {
  currentPage: number;
  query: string;
}): Promise<TApiResponse> => {
  return getCharacters(queryData.currentPage, queryData.query);
};

interface ICharacterDetailProps {
  params: {
    id: string;
  };
}

const CharacterPage = async ({
  params,
}: ICharacterDetailProps): Promise<JSX.Element> => {
  const { id } = await params;
  const characterId = Number(id);

  if (isNaN(characterId) || characterId <= 0) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: ['character', characterId],
      queryFn: () => fetchCharacter(characterId),
    })
    .catch(() => notFound());

  const currentPage = 1;
  const query = '';
  await queryClient.prefetchQuery({
    queryKey: ['characters', currentPage, query],
    queryFn: () => fetchCharacters({ currentPage, query }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.home}>
        <SearchBar />
        <div className={styles.home__content}>
          <div className={styles.home__left}>
            <CardListV2
              searchParams={{ page: String(currentPage), name: query }}
            />
          </div>
          <div className={styles.home__right}>
            <CardDetailPanel characterId={characterId} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CharacterPage;
