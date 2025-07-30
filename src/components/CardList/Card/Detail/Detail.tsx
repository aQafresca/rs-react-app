import styles from './Detail.module.scss';
import type { TCharacter } from '@/shema/characterShema.ts';
import { type JSX } from 'react';
import { CHAR } from '@/constants/constants.ts';

const CardDetail = (props: Partial<TCharacter>): JSX.Element => {
  return (
    <div className={styles.detail}>
      <ul className={styles.detail__list}>
        <li className={styles.detail__item}>
          <h3 className={styles.detail__title}>{props.name}</h3>
        </li>
        <li className={styles.detail__item}>
          <span className={styles.detail__label}>{CHAR.ORIGIN}</span>
          <span className={styles.detail__value}>{props.origin?.name}</span>
        </li>
        <li className={styles.detail__item}>
          <span className={styles.detail__label}>{CHAR.LOCATION}</span>
          <span className={styles.detail__value}>{props.location?.name}</span>
        </li>
      </ul>
    </div>
  );
};

export default CardDetail;
