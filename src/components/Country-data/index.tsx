import ColumnSelectorModal from '@components/modal';
import { useMemo, useState, useCallback, type JSX } from 'react';
import * as React from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

import { useCountriesData } from '@/core/hooks/useCountriesData.ts';

import styles from './CountryData.module.scss';

const defaultColumns = ['Country', 'ISO code', 'population', 'co2', 'co2_per_capita'];

const CountryData = () => {
  const { data } = useCountriesData();

  const allYears: number[] = useMemo(() => {
    const years = new Set<number>();

    Object.values(data).forEach((countryData): void => {
      countryData?.data.forEach((yearData): void => {
        if (yearData.year) {
          years.add(yearData.year);
        }
      });
    });

    return Array.from(years).sort((a, b): number => b - a);
  }, [data]);

  const [selectedYear, setSelectedYear] = useState<number | undefined>(allYears[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultColumns);

  const countries = useMemo(() => {
    const lowerCaseSearchQuery: string = searchQuery.toLowerCase();

    let filteredCountries = Object.entries(data).filter(([countryName]): boolean => {
      return countryName.toLowerCase().includes(lowerCaseSearchQuery);
    });

    filteredCountries = filteredCountries.sort(([countryNameA], [countryNameB]) => {
      const isAsc = sortOrder === 'asc';
      const compareValue = countryNameA.localeCompare(countryNameB);

      return isAsc ? compareValue : -compareValue;
    });

    return filteredCountries;
  }, [data, searchQuery, sortOrder]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const yearValue = parseInt(e.target.value, 10);

    setSelectedYear(isNaN(yearValue) ? undefined : yearValue);
  }, []);

  const handleSortClick = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleSaveColumns = useCallback((columns: string[]): void => {
    setSelectedColumns([...defaultColumns, ...columns]);
  }, []);

  return (
    <section className={styles.country}>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="search-input">Select Year: </label>
          <input
            id={'search-input'}
            type={'text'}
            value={searchQuery}
            placeholder={'country name'}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="year-select">Select Year: </label>
          <select id="year-select" value={selectedYear} onChange={handleYearChange}>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => setIsModalOpen(true)}>Select Columns</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {selectedColumns.map((col) => (
              <th key={col}>
                {col}
                {col === 'Country' && (
                  <button onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map(([countryName, countryData]): JSX.Element => {
            const yearData = countryData.data.find((data): boolean => data.year === selectedYear);

            return (
              <tr key={countryName} className={styles.row}>
                {selectedColumns.map((col) => {
                  if (col === 'Country') {
                    return <td key={`${countryName}-country`}>{countryName}</td>;
                  }
                  if (col === 'ISO code') {
                    return <td key={`${countryName}-iso`}>{countryData?.iso_code ?? 'N/A'}</td>;
                  }

                  return <td key={`${countryName}-${col}`}>{yearData?.[col as keyof typeof yearData] ?? 'N/A'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ColumnSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveColumns}
        selectedColumns={selectedColumns}
      />
    </section>
  );
};

export default CountryData;
