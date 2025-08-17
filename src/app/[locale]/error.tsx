'use client';
import Button from '@components/Button/Button.tsx';
import { BUTTON_LABELS } from '@/constants/constants.ts';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.error('Caught by GlobalError:', error);
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate: '-50% -50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h2>Something went wrong.</h2>
      <Button variant="secondary" onClick={() => reset()}>
        {BUTTON_LABELS.RELOAD}
      </Button>
    </div>
  );
};

export default GlobalError;
