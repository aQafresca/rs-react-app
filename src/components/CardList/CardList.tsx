import styles from './CardList.module.scss';
import * as React from 'react';
import type { JSX } from 'react';
import { getCharacters } from '@/core/api/getCharacters.ts';
import Card from '@components/CardList/Card/Card.tsx';
import type { ICharactersData } from '@/interface/interface.ts';
import Loader from '@components/Loader/Loader.tsx';

interface IState {
  loading: boolean;
  characters: ICharactersData[];
}

class CardList extends React.Component<unknown, IState> {
  state: IState = {
    loading: true,
    characters: [],
  };

  componentDidMount(): void {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await getCharacters();
        this.setState({ characters: data.results, loading: false });
      } catch (error) {
        console.error('error get data', error);
        this.setState({ loading: false });
      }
    };
    void fetchData();
  }

  render() {
    const { loading, characters } = this.state;

    return (
      <>
        {loading && <Loader />}
        <div className={styles.wrapper}>
          {characters.map(
            (char: ICharactersData): JSX.Element => (
              <Card key={char.id} {...char} />
            )
          )}
        </div>
      </>
    );
  }
}

export default CardList;
