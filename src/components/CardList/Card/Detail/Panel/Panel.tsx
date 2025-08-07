import styles from './Panel.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@components/Loader/Loader.tsx';
import CardDetail from '@components/CardList/Card/Detail/Detail.tsx';
import Button from '@components/Button/Button.tsx';
import { BUTTON_LABELS, ROUTES } from '@/constants/constants.ts';
import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useCharacterById } from '@/hooks/useCharacterById.ts';

const CardDetailPanel = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const characterId = Number(id);

  const { data: character, isLoading, isError } = useCharacterById(characterId);

  const handleClose = (): void => {
    void navigate({
      pathname: ROUTES.HOME,
      search: location.search,
    });
  };

  if (isLoading) {
    return (
      <div className={styles.detail__loader}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  if (!character) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
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
