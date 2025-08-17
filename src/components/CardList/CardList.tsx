'use client';

import styles from './CardList.module.scss';
import Card from '@components/CardList/Card/Card.tsx';
import type { TCharacter } from '@/scheme/characterScheme.ts';
import Pagination from '@components/Pagination/Pagination.tsx';
import EmptyList from '@components/EmptyList/EmptyList.tsx';
import { type JSX } from 'react';
import Loader from '@components/Loader/Loader.tsx';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useCharacters } from '@/hooks/useCharacters.ts';
import { useCardStore } from '@/core/store/useCardStore.ts';
import Flyout from '@components/Flyout/Flyout.tsx';
import { useEffect } from 'react';

interface ICardListProps {
  currentPage: number;
}

const CardList = ({ currentPage }: ICardListProps): JSX.Element => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get('name') ?? '';
  const selected = useCardStore((state) => state.selected);

  const { data, isLoading, isError, error } = useCharacters(currentPage, query);

  useEffect(() => {
    if (isError) {
      toast.error(`Error loading: ${error.message}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {data?.results.length === 0 && <EmptyList />}
      <div className={styles.inner}>
        {data?.results.map(
          (char: TCharacter): JSX.Element => (
            <Card key={char.id} {...char} />
          )
        )}
      </div>
      {data?.results.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.info.pages ?? 0}
        />
      )}
      {Object.keys(selected).length > 0 && <Flyout />}
    </div>
  );
};

export default CardList;
