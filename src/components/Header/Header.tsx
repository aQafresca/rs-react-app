import styles from './Header.module.scss';
import { type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { menuLinks } from '@/constants/constants.ts';
import Button from '@components/Button/Button.tsx';
import { useTheme } from '@/hooks/useTheme.ts';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';

const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? CiLight : MdDarkMode;
  return (
    <div className={`container ${styles.header}`}>
      <div className={styles.header__content}>
        <nav className={styles.header__nav}>
          {menuLinks.map(
            (link: { route: string; caption: string }): JSX.Element => (
              <NavLink
                to={link.route}
                className={styles.header__link}
                key={link.route}
              >
                {link.caption}
              </NavLink>
            )
          )}
        </nav>
        <Button className={styles.header__button} onClick={toggleTheme}>
          <Icon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
