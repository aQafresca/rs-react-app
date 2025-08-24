import { type ReactNode, type FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

interface IModalProps {
  children?: ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <dialog className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(event): void => event.stopPropagation()}>
        {children}
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>,
    modalRoot,
  );
};

export default Modal;
