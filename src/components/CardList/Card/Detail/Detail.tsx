import styles from './Detail.module.scss';
import type { TCharacter } from '@/scheme/characterScheme.ts';
import { type JSX } from 'react';
import { useTranslations } from 'next-intl';

const CardDetail = (props: Partial<TCharacter>): JSX.Element => {
  const t = useTranslations('Cards');

  return (
    <div className={styles.detail}>
      <ul className={styles.detail__list}>
        <li className={styles.detail__item}>
          <h3 className={styles.detail__title}>{props.name}</h3>
        </li>
        <li className={styles.detail__item}>
          <span className={styles.detail__label}>{t('char.origin')}</span>
          <span className={styles.detail__value}>{props.origin?.name}</span>
        </li>
        <li className={styles.detail__item}>
          <span className={styles.detail__label}>{t('char.location')}</span>
          <span className={styles.detail__value}>{props.location?.name}</span>
        </li>
      </ul>
    </div>
  );
};

export default CardDetail;
