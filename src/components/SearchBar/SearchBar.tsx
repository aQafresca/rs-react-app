'use client';

import { useState, type JSX } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './SearchBar.module.scss';
import Button from '@components/Button/Button.tsx';
import InputElement from '@components/Input/Input.tsx';
import { FaSearch } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useCharactersRefresh } from '@/hooks/useCharactersRefresh.ts';

const SearchBar = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const [query, setQuery] = useState<string>(searchParams.get('name') ?? '');

  const refreshCharacters = useCharactersRefresh();

  const handleSearchClick = (): void => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      newSearchParams.set('name', query.trim());
    } else {
      newSearchParams.delete('name');
    }
    newSearchParams.delete('page');
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className={`container ${styles.bar}`}>
      <InputElement
        placeholder={t('SearchBar.placeholders.search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearchClick}>
        <FaSearch />
      </Button>
      <Button type={'button'} onClick={refreshCharacters}>
        {t('buttons.labels.refresh')}
      </Button>
    </div>
  );
};

export default SearchBar;
