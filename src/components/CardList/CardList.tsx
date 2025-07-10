import styles from './CardList.module.scss';
import * as React from 'react';
import type { JSX } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import Card from '@components/CardList/Card/Card.tsx';
import type { IApiResponse, ICharactersData } from '@/interface/interface.ts';
import Loader from '@components/Loader/Loader.tsx';
import Pagination from '@components/Pagination/Pagination.tsx';
import { BASE_LIMIT_PER_PAGE } from '@/constants/constants.ts';

interface IState {
  loading: boolean;
  characters: ICharactersData[];
  currentPage: number;
}

class CardList extends React.Component<unknown, IState> {
  state: IState = {
    loading: true,
    characters: [],
    currentPage: 1,
  };

  componentDidMount(): void {
    const fetchData = async (): Promise<void> => {
      try {
        const data: IApiResponse = await getCharacters();
        this.setState({ characters: data.results, loading: false });
      } catch (error) {
        console.error('error get data', error);
        this.setState({ loading: false });
      }
    };
    void fetchData();
  }

  render(): JSX.Element {
    const { loading, characters, currentPage } = this.state;
    const startIndex: number = (currentPage - 1) * BASE_LIMIT_PER_PAGE;
    const endIndex: number = startIndex + BASE_LIMIT_PER_PAGE;
    const currentCharacters: ICharactersData[] = characters.slice(
      startIndex,
      endIndex
    );

    return (
      <>
        {loading && <Loader />}
        <div className={styles.wrapper}>
          {currentCharacters.map(
            (char: ICharactersData): JSX.Element => (
              <Card key={char.id} {...char} />
            )
          )}
        </div>
        <Pagination
          currentPage={this.state.currentPage}
          totalItems={this.state.characters.length}
          itemsPerPage={BASE_LIMIT_PER_PAGE}
          onPageChange={(page: number): void =>
            this.setState({ currentPage: page })
          }
        />
      </>
    );
  }
}

export default CardList;
