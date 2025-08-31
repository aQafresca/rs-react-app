export interface ICountryYearlyData {
  year: number;
  population?: number;
  co2: number;
  co2_per_capita: number;
}

export interface ICountryData {
  iso_code: string;
  data: ICountryYearlyData[];
}

export interface ICountriesData {
  [key: string]: ICountryData;
}
