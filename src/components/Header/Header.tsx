import styles from './Header.module.scss';
import { type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { menuLinks } from '@/constants/constants.ts';

const Header = (): JSX.Element => {
  return (
    <div className={`container ${styles.header}`}>
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
    </div>
  );
};

export default Header;
