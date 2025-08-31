import CountryData from '@components/Country-data';
import Loader from '@components/Loader';
import { Suspense } from 'react';

const MainPage = () => {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <CountryData />
      </Suspense>
    </main>
  );
};

export default MainPage;
