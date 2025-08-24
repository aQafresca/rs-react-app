import { useUserStore } from '@components/core/store/useIUserStore.ts';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import App from '@/App.tsx';

vi.mock('@components/form/controlled', () => {
  return {
    default: () => <div>ControlledFormData Mock</div>,
  };
});

vi.mock('@components/form/uncontrolled', () => {
  return {
    default: () => <div>UncontrolledFormData Mock</div>,
  };
});

vi.mock('@components/modal', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('App', () => {
  beforeEach(() => {
    useUserStore.getState().clearUserData();
  });

  it('renders controlled and uncontrolled buttons', () => {
    render(<App />);
    expect(screen.getByText('controlled')).toBeInTheDocument();
    expect(screen.getByText('uncontrolled')).toBeInTheDocument();
  });

  it('opens uncontrolled modal on button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('uncontrolled'));
    expect(screen.getByText('UncontrolledFormData Mock')).toBeInTheDocument();
  });

  it('opens controlled modal on button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('controlled'));
    expect(screen.getByText('ControlledFormData Mock')).toBeInTheDocument();
  });

  it('displays userData when present in store', () => {
    useUserStore.getState().setUserData({
      email: 'test@example.com',
      name: 'John',
      age: '30',
      gender: 'male',
      avatarBase64: 'data:image/png;base64,AAA',
    });

    render(<App />);

    expect(screen.getByText('User data:')).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
    expect(screen.getByText(/male/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'data:image/png;base64,AAA');
  });
});
