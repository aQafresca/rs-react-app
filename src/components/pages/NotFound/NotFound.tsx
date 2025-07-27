import styles from './NotFound.module.scss';
import { NOT_FOUND } from '@/constants/constants.ts';
import { type JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className={styles.error}>
      <h3>{NOT_FOUND.ERROR}</h3>
    </div>
  );
};

export default NotFoundPage;
