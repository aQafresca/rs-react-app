import { type JSX } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './LocaleSwitcher.module.scss';
import Cookies from 'js-cookie';
import * as React from 'react';
import { usePathname } from 'next/navigation';

const LocaleSwitcher = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChangeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newLocale: string = event.target.value;

    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, path: '/' });

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;

    router.push(newPath);
  };

  return (
    <div className={styles.switcher__container}>
      <label htmlFor="language-select">
        <GrLanguage />
      </label>
      <select
        id="language-select"
        className={styles.switcher__select}
        value={currentLocale}
        onChange={handleChangeLanguage}
      >
        <option value={'en'}>EN</option>
        <option value={'ru'}>RU</option>
      </select>
    </div>
  );
};

export default LocaleSwitcher;
