import AutocompleteField from '@components/country';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@components/core/store/useCountryStore.ts', () => {
  return {
    useCountryStore: () => ({
      countries: ['United States', 'Canada', 'Germany'],
    }),
  };
});

describe('AutocompleteField', () => {
  it('renders label and input', () => {
    render(<AutocompleteField label="Country" name="country" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('calls onChange with selected country when clicked', () => {
    const handleChange = vi.fn();

    render(<AutocompleteField label="Country" name="country" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Country');

    fireEvent.change(input, { target: { value: 'Ger' } });

    const option = screen.getByText('Germany');

    fireEvent.mouseDown(option);

    expect(handleChange).toHaveBeenCalledWith('Germany');
  });

  it('displays error message', () => {
    render(<AutocompleteField label="Country" name="country" value="" onChange={() => {}} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
