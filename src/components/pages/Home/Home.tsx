import styles from './Home.module.scss';
import CardList from '@components/CardList/CardList.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/constants.ts';

const HomePage = () => {
  const location = useLocation();
  const isDetailOpen = location.pathname !== ROUTES.HOME;

  return (
    <div className={styles.home}>
      <SearchBar />
      <div className={styles.home__content}>
        <div
          className={`${styles.home__left} ${isDetailOpen ? styles.home__shrunk : ''}`}
        >
          <CardList />
        </div>
        <div className={styles.home__right}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
