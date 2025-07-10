export interface ICharactersData {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface IApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharactersData[];
}
