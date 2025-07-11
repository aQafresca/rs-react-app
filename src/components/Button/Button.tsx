import styles from './Button.module.scss';
import type { ButtonHTMLAttributes, FC, JSX } from 'react';
import clsx from 'clsx';

type TButtonVariant = 'primary' | 'secondary';
type TButtonSize = 'x-small' | 'small' | 'medium' | 'large';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
}

const ButtonElement: FC<IButtonProps> = ({
  className,
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  ...rest
}: IButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonElement;
