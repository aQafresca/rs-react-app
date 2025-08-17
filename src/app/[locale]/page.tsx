import type { JSX } from 'react';
import CardListV2 from '@components/CardListV2/CardListV2.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';

interface IHomeProps {
  searchParams: {
    page?: string;
    name?: string;
  };
}

const Home = async ({ searchParams }: IHomeProps): Promise<JSX.Element> => {
  return (
    <>
      <SearchBar />
      <CardListV2 searchParams={searchParams} />
    </>
  );
};

export default Home;
