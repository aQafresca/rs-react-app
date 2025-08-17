import { NOT_FOUND } from '@/constants/constants.ts';
import { type JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3>{NOT_FOUND.ERROR}</h3>
    </div>
  );
};

export default NotFoundPage;
