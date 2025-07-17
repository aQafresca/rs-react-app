import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import InputElement from '@components/Input/Input.tsx';

describe('InputElement for character name input', () => {
  it('renders input with placeholder "Character Name"', () => {
    render(<InputElement id="charName" placeholder="Character Name" />);
    const input = screen.getByPlaceholderText('Character Name');
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided and associates it with input', () => {
    render(<InputElement id="charName" label="Character Name" />);
    const input = screen.getByLabelText('Character Name');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn();
    render(<InputElement placeholder="Character Name" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Character Name');

    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(onChange).toHaveBeenCalled();
  });
});
