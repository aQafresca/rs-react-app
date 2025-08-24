import * as React from 'react';

import styles from './Image.module.scss';

type ControlledProps = {
  onChange: (_value: string) => void;
  value: string;
  onFileChange?: never;
};

type UncontrolledProps = {
  onFileChange: (_fileBase64: string) => void;
  onChange?: never;
  value?: never;
};

type ConditionalProps = ControlledProps | UncontrolledProps;

interface IUploadImageProps {
  name: string;
  error?: string;
}

const UploadImage = ({ name, error, ...props }: IUploadImageProps & ConditionalProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validExtensions = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024;

    if (!validExtensions.includes(file.type)) {
      alert('Only JPEG and PNG are allowed');

      return;
    }

    if (file.size > maxSize) {
      alert('File size should not exceed 2MB');

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      if ('onChange' in props && props.onChange) {
        props.onChange(result);
      } else if ('onFileChange' in props && props.onFileChange) {
        props.onFileChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" name={name} accept="image/png, image/jpeg" onChange={handleFileChange} />
      <p className={styles.error}>{error || ' '}</p>
    </div>
  );
};

export default UploadImage;
