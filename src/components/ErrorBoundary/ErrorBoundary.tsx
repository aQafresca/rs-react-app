import styles from './ErrorBoundary.module.scss';
import { type ReactNode } from 'react';
import { Component } from 'react';
import * as React from 'react';
import Button from '@components/Button/Button.tsx';
import { BUTTON_LABELS } from '@/constants/constants.ts';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  state: IState = { hasError: false };
  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h2 className={styles.error__text}>Something went wrong.</h2>
          <Button
            className={styles.error__button}
            variant={'secondary'}
            onClick={(): void => window.location.reload()}
          >
            {BUTTON_LABELS.RELOAD}
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
