import { useUserStore } from '@components/core/store/useIUserStore.ts';
import UncontrolledFormData from '@components/form/uncontrolled';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

interface IFormFieldProps {
  name: string;
  type?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  options?: { label: string; value: string }[];
}

vi.mock('@components/upload/image', () => {
  return {
    default: ({ onFileChange }: { onFileChange: (s: string) => void }) => (
      <div onClick={() => onFileChange('data:image/png;base64,AAA')}>UploadImage Mock</div>
    ),
  };
});

vi.mock('@components/form/field', () => {
  return {
    default: (props: IFormFieldProps) => (
      <div>
        <input {...props} data-testid={props.name} />
        {props.error && <span>{props.error}</span>}
      </div>
    ),
  };
});

describe('UncontrolledFormData', () => {
  beforeEach(() => {
    useUserStore.getState().clearUserData();
  });

  it('renders all fields and submit button', () => {
    render(<UncontrolledFormData onClose={() => {}} />);
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('age')).toBeInTheDocument();
    expect(screen.getByTestId('gender')).toBeInTheDocument();
    expect(screen.getByText('UploadImage Mock')).toBeInTheDocument();
    expect(screen.getByTestId('accept')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('sets errors on invalid submit', () => {
    render(<UncontrolledFormData onClose={() => {}} />);

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/Must contain at least 1 special character/i)).toBeInTheDocument();
    expect(screen.getByText(/Name must start with an uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/Age must be a number between 1 and 99/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select your gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Please accept the agreement/i)).toBeInTheDocument();
  });
});
