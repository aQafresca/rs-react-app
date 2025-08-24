import { type FC } from 'react';
import * as React from 'react';

import styles from './Field.module.scss';

export interface IOption {
  label: string;
  value: string;
}

export interface IFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio';
  name?: string;
  placeholder?: string;
  options?: IOption[];
  error?: string;
}

const FormField: FC<IFormFieldProps> = ({ label, type, options, error, ...rest }) => {
  const renderInput = () => {
    switch (type) {
      case 'radio':
        if (!options) return null;

        return (
          <div className={styles.radio}>
            {options.map((option) => (
              <label key={option.value} className={styles.label}>
                <input type="radio" value={option.value} {...rest} />
                {option.label}
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <label>
            {label}
            <input type={'checkbox'} {...rest} />
          </label>
        );
      default:
        return <input type={type} placeholder={rest.placeholder} {...rest} />;
    }
  };

  const isRadioOrCheckbox = type === 'radio' || type === 'checkbox';

  return (
    <div className={styles.fieldContainer}>
      {!isRadioOrCheckbox && (
        <label className={styles.label}>
          {label && <span className={styles.label}>{label}:</span>}
          {renderInput()}
        </label>
      )}

      {isRadioOrCheckbox && <>{renderInput()}</>}
      <p className={styles.error}>{error || ' '}</p>
    </div>
  );
};

export default FormField;
