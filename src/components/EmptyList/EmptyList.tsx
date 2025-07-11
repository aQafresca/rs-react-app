import styles from './EmptyList.module.scss';
import { EMPTY_LIST } from '@/constants/constants.ts';

const EmptyList = () => {
  return (
    <div className={styles.empty__wrapper}>
      <h3 className={styles.empty__text}>{EMPTY_LIST.TEXT}</h3>
    </div>
  );
};

export default EmptyList;
