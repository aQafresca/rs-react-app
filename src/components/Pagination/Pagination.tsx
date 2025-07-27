import styles from './Pagination.module.scss';
import type { JSX } from 'react';
import Button from '@components/Button/Button.tsx';
import { LiaChevronLeftSolid, LiaChevronRightSolid } from 'react-icons/lia';
import { getPaginationPages } from '@/core/utils/pagination/getPaginationPages.ts';
import { ELLIPSIS } from '@/constants/constants.ts';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IProps): JSX.Element => {
  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__button}
        type="button"
        size="x-small"
        onClick={(): void => onPageChange(currentPage - 1)}
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
              onClick={() => typeof page === 'number' && onPageChange(page)}
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
        onClick={(): void => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <LiaChevronRightSolid />
      </Button>
    </div>
  );
};

export default Pagination;
