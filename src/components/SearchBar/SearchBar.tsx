import { useEffect, useState, useRef, type RefObject } from 'react';
import * as React from 'react';
import styles from './SearchBar.module.scss';
import Button from '@components/Button/Button.tsx';
import InputElement from '@components/Input/Input.tsx';
import { FaSearch } from 'react-icons/fa';
import { useRestoreSearchQuery } from '@/hooks/useRestoreSearchQuery.ts';
import BrokenComponent from '@components/BrokenComponent/BrokenComponent.tsx';
import {
  BUTTON_LABELS,
  PLACEHOLDERS,
  LOCALSTORAGE_KEYS,
} from '@/constants/constants.ts';
import { searchStore } from '@/core/store/searchStore.ts';

const SearchBar = () => {
  const { inputValue, setInputValue } = useRestoreSearchQuery();
  const [showErrorComponent, setShowErrorComponent] = useState<boolean>(false);

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

  const handleErrorClick = (): void => {
    setShowErrorComponent(true);
  };

  return (
    <header className={`container ${styles.header}`}>
      <InputElement
        placeholder={PLACEHOLDERS.SEARCH}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearchClick}>
        <FaSearch />
      </Button>
      <Button onClick={handleErrorClick}>{BUTTON_LABELS.ERROR}</Button>
      {showErrorComponent && <BrokenComponent />}
    </header>
  );
};

export default SearchBar;
