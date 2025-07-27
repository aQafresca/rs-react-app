export const BUTTON_LABELS = {
  ERROR: 'Error',
  RELOAD: 'Reload',
  CLOSE: 'Close',
  EXIT: 'X',
};

export const PLACEHOLDERS = {
  SEARCH: 'Rick Sanchez',
};

export const CHAR = {
  STATUS: 'Status:',
  SPECIES: 'Species:',
  GENDER: 'Gender:',
  ORIGIN: 'Origin:',
  LOCATION: 'Location:',
};

export const BASE_LIMIT_VISIBLE_PAGINATION = 3;
export const ELLIPSIS = '.';

export const EMPTY_LIST = {
  TEXT: 'Please enter a different Char name and click "Search"',
};

export const API_URL = {
  PAGE: 'https://rickandmortyapi.com/api/character?page=',
  ID: 'https://rickandmortyapi.com/api/character/',
};

export const LOCALSTORAGE_KEYS = {
  SEARCH_QUERY: 'search_query',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CHARACTERS: '/characters',
  NOT_FOUND: '*',
};

export const menuLinks: { route: string; caption: string }[] = [
  { route: ROUTES.HOME, caption: 'Home' },
  { route: ROUTES.ABOUT, caption: 'About' },
];

export const NOT_FOUND = {
  ERROR: 'error 404',
};
