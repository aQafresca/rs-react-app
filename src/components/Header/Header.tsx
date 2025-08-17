'use client';

import styles from './Header.module.scss';
import { type JSX } from 'react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/constants.ts';
import Button from '@components/Button/Button.tsx';
import { useTheme } from '@/hooks/useTheme.ts';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import LocaleSwitcher from '@components/localeSwitcher/LocaleSwitcher.tsx';
import { useTranslations } from 'next-intl';

const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? CiLight : MdDarkMode;

  const t = useTranslations('Header');

  const menuLinks: { route: string; caption: string }[] = [
    { route: ROUTES.HOME, caption: t('links.Home') },
    { route: ROUTES.ABOUT, caption: t('links.about') },
  ];

  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.header__content}>
        <nav className={styles.header__nav}>
          {menuLinks.map(
            (link: { route: string; caption: string }): JSX.Element => (
              <Link
                href={link.route}
                className={styles.header__link}
                key={link.route}
              >
                {link.caption}
              </Link>
            )
          )}
        </nav>
        <LocaleSwitcher />
        <Button className={styles.header__button} onClick={toggleTheme}>
          {<Icon />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
