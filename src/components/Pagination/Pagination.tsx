import styles from './Pagination.module.scss';
import type { JSX } from 'react';
import Button from '@components/Button/Button.tsx';
import { LiaChevronLeftSolid, LiaChevronRightSolid } from 'react-icons/lia';

interface IProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: IProps): JSX.Element => {
  const maxPage: number = Math.ceil(totalItems / itemsPerPage);
  const pages: number[] = Array.from(
    { length: maxPage },
    (_, i): number => i + 1
  );
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
        {pages.map(
          (page): JSX.Element => (
            <Button
              key={page}
              type={'button'}
              size={'x-small'}
              className={`${styles.pagination__button} ${page === currentPage ? styles['is-active'] : ''}`}
              onClick={(): void => onPageChange(page)}
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
        disabled={currentPage === maxPage}
      >
        <LiaChevronRightSolid />
      </Button>
    </div>
  );
};

export default Pagination;
