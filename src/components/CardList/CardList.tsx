import styles from './CardList.module.scss';
import * as React from 'react';
import type { JSX } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import Card from '@components/CardList/Card/Card.tsx';
import type { TApiResponse, TCharacter } from '@/shema/characterShema.ts';
import Loader from '@components/Loader/Loader.tsx';
import Pagination from '@components/Pagination/Pagination.tsx';
import { searchStore } from '@/core/store/serchStore.ts';
import EmptyList from '@components/EmptyList/EmptyList.tsx';
import type { ICardListState } from '@/interface/interface.ts';

class CardList extends React.Component<unknown, ICardListState> {
  state: ICardListState = {
    loading: true,
    characters: [],
    currentPage: 1,
    totalPages: 0,
    query: '',
  };

  unsubscribe: (() => void) | null = null;

  componentDidMount(): void {
    const initQuery: string = searchStore.getQuery();
    void this.fetchData(1, initQuery);

    this.unsubscribe = searchStore.subscribe((query): void => {
      if (this.state.query !== query) {
        this.setState({ query, currentPage: 1 }, (): void => {
          void this.fetchData(1, query);
        });
      }
    });
  }

  componentDidUpdate(_: unknown, prevState: ICardListState): void {
    if (prevState.currentPage !== this.state.currentPage) {
      void this.fetchData(this.state.currentPage, this.state.query);
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe?.();
  }

  fetchData = async (page: number, query: string): Promise<void> => {
    this.setState({ loading: true });
    try {
      const data: TApiResponse = await getCharacters(page, query);
      this.setState({
        characters: data.results,
        totalPages: data.info.pages,
        loading: false,
      });
    } catch (error) {
      console.error('error get data', error);
      this.setState({ characters: [], totalPages: 0, loading: false });
    }
  };

  render(): JSX.Element {
    const { loading, characters, currentPage, totalPages } = this.state;

    return (
      <div className={styles.wrapper}>
        {loading && <Loader />}
        {!loading && characters.length === 0 && <EmptyList />}
        <div className={styles.inner}>
          {characters.map(
            (char: TCharacter): JSX.Element => (
              <Card key={char.id} {...char} />
            )
          )}
        </div>
        {!loading && characters.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number): void =>
              this.setState({ currentPage: page })
            }
          />
        )}
      </div>
    );
  }
}

export default CardList;
