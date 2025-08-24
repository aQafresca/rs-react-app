import { useCountryStore } from '@components/core/store/useCountryStore.ts';
import React, { useState } from 'react';

import styles from './country.module.scss';

interface AutocompleteFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (_value: string) => void;
  error?: string;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ label, name, value, onChange, error }) => {
  const { countries } = useCountryStore();
  const [isOpen, setIsOpen] = useState(false);

  const filtered = countries.filter((country: string) => country.toLowerCase().includes(value.toLowerCase()));

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        autoComplete="off"
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={styles.list}>
          {filtered.map((country: string) => (
            <li
              className={styles.item}
              key={country}
              onMouseDown={() => {
                onChange(country);
                setIsOpen(false);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
      <p className={styles.error}>{error || ' '}</p>
    </div>
  );
};

export default AutocompleteField;
