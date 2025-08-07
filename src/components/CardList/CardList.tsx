import styles from './CardList.module.scss';
import { useCharacters } from '@/hooks/useCharacters.ts';
import { type JSX, useCallback, useEffect } from 'react';
import Card from '@components/CardList/Card/Card.tsx';
import type { TCharacter } from '@/shema/characterShema.ts';
import Loader from '@components/Loader/Loader.tsx';
import Pagination from '@components/Pagination/Pagination.tsx';
import { searchStore } from '@/core/store/searchStore.ts';
import EmptyList from '@components/EmptyList/EmptyList.tsx';
import { useSearchParams } from 'react-router-dom';
import { useCardStore } from '@/core/store/useCardStore.ts';
import Flyout from '@components/Flyout/Flyout.tsx';
import toast from 'react-hot-toast';

const CardList = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = useCardStore((state) => state.selected);
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('name') ?? '';

  useEffect(() => {
    const initialQueryInUrl = searchParams.get('name') ?? '';

    if (searchStore.getQuery() !== initialQueryInUrl) {
      searchStore.setQuery(initialQueryInUrl);
    }
    const unsubscribe = searchStore.subscribe((newQueryFromStore: string) => {
      const currentQueryInUrl = searchParams.get('name') ?? '';
      if (newQueryFromStore !== currentQueryInUrl) {
        setSearchParams(
          (prev) => {
            const newSearchParams = new URLSearchParams(prev);
            if (newQueryFromStore.trim()) {
              newSearchParams.set('name', newQueryFromStore);
            } else {
              newSearchParams.delete('name');
            }
            newSearchParams.delete('page');
            return newSearchParams;
          },
          { replace: true }
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [searchParams, setSearchParams]);

  const { data, isLoading, isError, error } = useCharacters(currentPage, query);

  useEffect(() => {
    if (isError) {
      toast.error(`Error loading: ${error.message}`);
    }
  }, [isError, error]);

  const handlePageChange = useCallback(
    (page: number): void => {
      setSearchParams(
        (prev): URLSearchParams => {
          const newSearchParams = new URLSearchParams(prev);
          if (page === 1) {
            newSearchParams.delete('page');
          } else {
            newSearchParams.set('page', String(page));
          }
          return newSearchParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && data?.results.length === 0 && <EmptyList />}
      <div className={styles.inner}>
        {data?.results.map(
          (char: TCharacter): JSX.Element => (
            <Card key={char.id} {...char} />
          )
        )}
      </div>

      {!isLoading && !isError && data?.results.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.info.pages ?? 0}
          onPageChange={handlePageChange}
        />
      )}
      {Object.keys(selected).length > 0 && <Flyout />}
    </div>
  );
};

export default CardList;
