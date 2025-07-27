import styles from './Panel.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { TCharacter } from '@/shema/characterShema.ts';
import { getCharacterById } from '@/core/api/getCharactersById.ts';
import Loader from '@components/Loader/Loader.tsx';
import CardDetail from '@components/CardList/Card/Detail/Detail.tsx';
import Button from '@components/Button/Button.tsx';
import { BUTTON_LABELS, ROUTES } from '@/constants/constants.ts';
import { type JSX } from 'react';

const CardDetailPanel = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    setLoading(true);
    setError(null);
    if (!id) {
      setError('Character ID not found.');
      setLoading(false);
      return;
    }
    const fetchDetailPanelData = async (): Promise<void> => {
      try {
        const data = await getCharacterById(Number(id));
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError('Failed to load character details.');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };
    void fetchDetailPanelData();
  }, [id]);

  const handleClose = (): void => {
    void navigate({
      pathname: ROUTES.HOME,
      search: location.search,
    });
  };

  if (loading) {
    return (
      <div className={styles.detail__loader}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detail__error}>
        <p>{error}</p>
        <Button type={'button'} onClick={handleClose}>
          {BUTTON_LABELS.CLOSE}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.detail__panel}>
      <Button
        type={'button'}
        className={styles.detail__button}
        onClick={handleClose}
      >
        {BUTTON_LABELS.EXIT}
      </Button>
      <CardDetail {...character} />
    </div>
  );
};

export default CardDetailPanel;
