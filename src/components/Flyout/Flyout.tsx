'use client';

import styles from './Flyout.module.scss';
import Button from '@components/Button/Button.tsx';
import { useCardStore } from '@/core/store/useCardStore.ts';
import saveAs from 'file-saver';
import { type JSX } from 'react';
import { useTranslations } from 'next-intl';
import { createCsv } from '@/actions/download.ts';

const Flyout = (): JSX.Element => {
  const clear = useCardStore((state) => state.clear);
  const selected = useCardStore((state) => state.selected);
  const selectedCharacters = Object.values(selected);
  const t = useTranslations('buttons');

  const handleDownloadFile = async () => {
    const blob = await createCsv(selectedCharacters);

    const fileName = `selected ${selectedCharacters.length} characters.csv`;
    saveAs(blob, fileName);
  };

  const handleClearItem = (): void => {
    clear();
  };

  return (
    <div className={styles.flyout}>
      <h3 className={styles.flyout__item}>{Object.keys(selected).length}</h3>
      <Button type={'button'} onClick={handleClearItem}>
        {t('labels.cancel')}
      </Button>
      <Button type={'button'} onClick={handleDownloadFile}>
        {t('labels.download')}
      </Button>
    </div>
  );
};

export default Flyout;
