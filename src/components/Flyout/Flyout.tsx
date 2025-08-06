import styles from './Flyout.module.scss';
import Button from '@components/Button/Button.tsx';
import { useCardStore } from '@/core/store/useCardStore.ts';
import { BUTTON_LABELS, HEADER_CSV } from '@/constants/constants.ts';
import saveAs from 'file-saver';
import type { TCharacter } from '@/shema/characterShema.ts';
import { type JSX } from 'react';

const Flyout = (): JSX.Element => {
  const clear = useCardStore((state) => state.clear);
  const selected = useCardStore((state) => state.selected);
  const selectedCharacters = Object.values(selected);

  const handleDownloadFile = (): void => {
    const rows = selectedCharacters.map(
      (char: TCharacter): (string | number)[] => [
        char.id,
        char.name,
        char.status,
        char.species,
        char.gender,
      ]
    );
    const csvContent = [HEADER_CSV, ...rows]
      .map((row: (string | number)[]): string =>
        row.map((cell: string | number): string => `"${cell}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const filename = `selected ${selectedCharacters.length} characters.csv`;
    saveAs(blob, filename);
  };

  const handleClearItem = (): void => {
    clear();
  };

  return (
    <div className={styles.flyout}>
      <h3 className={styles.flyout__item}>{Object.keys(selected).length}</h3>
      <Button type={'button'} onClick={handleClearItem}>
        {BUTTON_LABELS.CANCEL}
      </Button>
      <Button type={'button'} onClick={handleDownloadFile}>
        {BUTTON_LABELS.DOWNLOAD}
      </Button>
    </div>
  );
};

export default Flyout;
