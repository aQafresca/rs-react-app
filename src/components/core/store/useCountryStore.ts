import { create } from 'zustand';

interface CountryState {
  countries: string[];
  setCountries: (_countries: string[]) => void;
}

export const useCountryStore = create<CountryState>((set) => ({
  countries: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Ukraine', 'China', 'Japan', 'Belarus'],
  setCountries: (countries) => set({ countries }),
}));
