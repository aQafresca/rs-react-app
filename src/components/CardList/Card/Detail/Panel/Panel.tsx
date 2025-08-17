'use client';

import styles from './Panel.module.scss';
import CardDetail from '@components/CardList/Card/Detail/Detail.tsx';
import Button from '@components/Button/Button.tsx';
import { BUTTON_LABELS } from '@/constants/constants.ts';
import { useRouter } from '@/i18n/navigation';
import { useCharacterById } from '@/hooks/getCharactersById.ts';
import Loader from '@components/Loader/Loader.tsx';
import toast from 'react-hot-toast';

interface ICardDetailPanelProps {
  characterId: number;
}

const CardDetailPanel = ({ characterId }: ICardDetailPanelProps) => {
  const router = useRouter();

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useCharacterById(characterId);

  const handleClose = (): void => {
    router.replace(`/`);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    toast.error(`Error loading: ${error.message}`);
  }

  if (!character) {
    return null;
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
