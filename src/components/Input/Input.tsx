import styles from './Input.module.scss';
import type { InputHTMLAttributes, JSX, FC } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputElement: FC<IInputProps> = ({
  type = 'text',
  label,
  id,
  placeholder,
  ...rest
}: IInputProps): JSX.Element => {
  return (
    <div className={styles.input__wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        id={id}
        placeholder={placeholder}
        type={type}
        {...rest}
      ></input>
    </div>
  );
};

export default InputElement;
