import styles from './CardList.module.scss';
import * as React from 'react';
import type { JSX } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import Card from '@components/CardList/Card/Card.tsx';
import type { IApiResponse, ICharactersData } from '@/interface/interface.ts';
import Loader from '@components/Loader/Loader.tsx';
import Pagination from '@components/Pagination/Pagination.tsx';

interface IState {
  loading: boolean;
  characters: ICharactersData[];
  currentPage: number;
  totalPages: number;
}

class CardList extends React.Component<unknown, IState> {
  state: IState = {
    loading: true,
    characters: [],
    currentPage: 1,
    totalPages: 0,
  };

  componentDidMount(): void {
    void this.fetchData(this.state.currentPage);
  }

  componentDidUpdate(_: unknown, prevState: IState): void {
    if (prevState.currentPage !== this.state.currentPage) {
      void this.fetchData(this.state.currentPage);
    }
  }

  fetchData = async (page: number): Promise<void> => {
    this.setState({ loading: true });
    try {
      const data: IApiResponse = await getCharacters(page);
      this.setState({
        characters: data.results,
        totalPages: data.info.pages,
        loading: false,
      });
    } catch (error) {
      console.error('error get data', error);
      this.setState({ loading: false });
    }
  };

  render(): JSX.Element {
    const { loading, characters, currentPage, totalPages } = this.state;

    return (
      <div className={styles.wrapper}>
        {loading && <Loader />}
        <div className={styles.inner}>
          {characters.map((char: ICharactersData) => (
            <Card key={char.id} {...char} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => this.setState({ currentPage: page })}
        />
      </div>
    );
  }
}

export default CardList;
