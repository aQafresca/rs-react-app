import styles from './CardList.module.scss';
import { type JSX, useCallback, useEffect, useState } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import Card from '@components/CardList/Card/Card.tsx';
import type { TCharacter } from '@/shema/characterShema.ts';
import Loader from '@components/Loader/Loader.tsx';
import Pagination from '@components/Pagination/Pagination.tsx';
import { searchStore } from '@/core/store/searchStore.ts';
import EmptyList from '@components/EmptyList/EmptyList.tsx';
import { useSearchParams } from 'react-router-dom';
import { useCardStore } from '@/core/store/useCardStore.ts';
import Flyout from '@components/Flyout/Flyout.tsx';

const CardList = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getCharacters(currentPage, query);
        setCharacters(response.results);
        setTotalPages(response.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setTotalPages(0);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [query, currentPage]);

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
      {loading && <Loader />}
      {!loading && characters.length === 0 && <EmptyList />}
      <div className={styles.inner}>
        {characters.map(
          (char: TCharacter): JSX.Element => (
            <Card key={char.id} {...char} />
          )
        )}
      </div>

      {!loading && characters.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {Object.keys(selected).length > 0 && <Flyout />}
    </div>
  );
};

export default CardList;
