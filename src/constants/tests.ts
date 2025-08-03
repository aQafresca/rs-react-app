import type { TCharacter } from '@/shema/characterShema.ts';

export const mockData = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      origin: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3 ',
      },
      location: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
    },
  ],
};

export const character = mockData.results[0];

export const baseCharacter: TCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  location: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
};
