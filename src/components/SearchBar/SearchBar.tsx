import { useEffect, useRef, type RefObject } from 'react';
import * as React from 'react';
import styles from './SearchBar.module.scss';
import Button from '@components/Button/Button.tsx';
import InputElement from '@components/Input/Input.tsx';
import { FaSearch } from 'react-icons/fa';
import { useRestoreSearchQuery } from '@/hooks/useRestoreSearchQuery.ts';
import { PLACEHOLDERS, LOCALSTORAGE_KEYS } from '@/constants/constants.ts';
import { searchStore } from '@/core/store/searchStore.ts';

const SearchBar = () => {
  const { inputValue, setInputValue } = useRestoreSearchQuery();

  const isFirstRender: RefObject<boolean> = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && inputValue) {
      searchStore.setQuery(inputValue);
      isFirstRender.current = false;
    }
  }, [inputValue]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = (): void => {
    const trimmedValue: string = inputValue.trim();
    searchStore.setQuery(trimmedValue);
    localStorage.setItem(LOCALSTORAGE_KEYS.SEARCH_QUERY, trimmedValue);
  };

  return (
    <header className={`container ${styles.bar}`}>
      <InputElement
        placeholder={PLACEHOLDERS.SEARCH}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearchClick}>
        <FaSearch />
      </Button>
    </header>
  );
};

export default SearchBar;
