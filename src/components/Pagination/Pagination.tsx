'use client';

import styles from './Pagination.module.scss';
import type { JSX } from 'react';
import Button from '@components/Button/Button.tsx';
import { LiaChevronLeftSolid, LiaChevronRightSolid } from 'react-icons/lia';
import { getPaginationPages } from '@/core/utils/pagination/getPaginationPages.ts';
import { ELLIPSIS } from '@/constants/constants.ts';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface IProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: IProps): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number): void => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', String(page));
      }
      router.replace(`?${newSearchParams.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__button}
        type="button"
        size="x-small"
        onClick={(): void => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LiaChevronLeftSolid />
      </Button>
      <div className={styles.pagination__box}>
        {getPaginationPages(currentPage, totalPages).map(
          (page: string | number, index: number): JSX.Element => (
            <Button
              key={typeof page === 'number' ? page : `ellipsis-${index}`}
              type="button"
              size="x-small"
              className={`${styles.pagination__button} ${
                page === currentPage ? styles['is-active'] : ''
              }`}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === ELLIPSIS}
            >
              {page}
            </Button>
          )
        )}
      </div>
      <Button
        className={styles.pagination__button}
        type="button"
        size="x-small"
        onClick={(): void => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <LiaChevronRightSolid />
      </Button>
    </div>
  );
};

export default Pagination;
