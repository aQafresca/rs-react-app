'use client';

import styles from './Card.module.scss';
import type { TCharacter } from '@/scheme/characterScheme.ts';
import { type JSX } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCardStore } from '@/core/store/useCardStore.ts';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

const Card = (props: TCharacter): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const t = useTranslations('Cards');

  const selected = useCardStore((state) => state.selected);
  const toggle = useCardStore((state) => state.toggle);

  const handleClick = (): void => {
    const search = searchParams?.toString();
    router.push(`/${currentLocale}/${props.id}${search ? `?${search}` : ''}`);
  };

  const handleCheckboxChange = (): void => {
    toggle(props);
  };

  const isChecked = Boolean(selected[props.id]);

  return (
    <div className={styles.card} onClick={handleClick} role={'button'}>
      <div>
        <Image
          className={styles.card__img}
          width={300}
          height={300}
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{props.name}</h3>
        <ul className={styles.card__list}>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{t('char.gender')}</span>
            <span className={styles.card__value}>{props.gender}</span>
          </li>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{t('char.status')}</span>
            <span className={styles.card__value}>{props.status}</span>
          </li>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{t('char.species')}</span>
            <span className={styles.card__value}>{props.species}</span>
          </li>
        </ul>
        <input
          className={styles.card__checkbox}
          type={'checkbox'}
          onClick={(e): void => e.stopPropagation()}
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
      </div>
    </div>
  );
};

export default Card;
