import { useState } from 'react';
import { LOCALSTORAGE_KEYS } from '@/constants/constants.ts';

export const useRestoreSearchQuery = () => {
  const [inputValue, setInputValue] = useState<string>((): string => {
    try {
      const savedValue: string | null = localStorage.getItem(
        LOCALSTORAGE_KEYS.SEARCH_QUERY
      );
      return savedValue ?? '';
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return '';
    }
  });

  return { inputValue, setInputValue };
};
