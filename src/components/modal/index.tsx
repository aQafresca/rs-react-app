import { useState, type JSX } from 'react';

import styles from './ColumnSelectorModal.module.scss';

const availableColumns = ['methane', 'oil_co2', 'temperature_change_from_co2', 'gdp', 'cement_co2'];

interface ColumnSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (_columns: string[]) => void;
  selectedColumns: string[];
}

const ColumnSelectorModal = ({
  isOpen,
  onClose,
  onSave,
  selectedColumns,
}: ColumnSelectorModalProps): JSX.Element | null => {
  const [tempSelected, setTempSelected] = useState<string[]>(() => {
    return selectedColumns.filter((column) => availableColumns.includes(column));
  });

  const handleCheckboxChange = (column: string): void => {
    setTempSelected((prev) => (prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]));
  };

  const handleSave = (): void => {
    onSave(tempSelected);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog className={styles.backdrop}>
      <div className={styles.content}>
        <h3>Select Columns to Display</h3>
        <div className={styles.checkbox}>
          {availableColumns.map((column) => (
            <label key={column}>
              <input
                type="checkbox"
                checked={tempSelected.includes(column)}
                onChange={() => handleCheckboxChange(column)}
              />
              {column}
            </label>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default ColumnSelectorModal;
