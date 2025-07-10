import styles from './Card.module.scss';
import type { ICharactersData } from '@/interface/interface.ts';
import { CHAR } from '@/constants/constants.ts';
import type { JSX } from 'react';

const Card = (props: ICharactersData): JSX.Element => {
  return (
    <div className={styles.card}>
      <div>
        <img className={styles.card__img} src={props.image} alt={props.name} />
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{props.name}</h3>
        <ul className={styles.card__list}>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{CHAR.GENDER}</span>
            <span className={styles.card__value}>{props.gender}</span>
          </li>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{CHAR.STATUS}</span>
            <span className={styles.card__value}>{props.status}</span>
          </li>
          <li className={styles.card__item}>
            <span className={styles.card__label}>{CHAR.SPECIES}</span>
            <span className={styles.card__value}>{props.species}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
