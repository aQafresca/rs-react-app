import FormField from '@components/form/field';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('FormField', () => {
  it('should render a text input by default', () => {
    render(<FormField name="name" label="Full Name" type="text" />);

    const input = screen.getByLabelText(/Full Name/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'name');
  });

  it('should render an email input', () => {
    render(<FormField type="email" label="Email Address" />);

    const input = screen.getByLabelText(/Email Address/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should render a password input', () => {
    render(<FormField type="password" label="Password" />);

    const input = screen.getByLabelText(/Password/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render a number input', () => {
    render(<FormField type="number" label="Age" />);

    const input = screen.getByLabelText(/Age/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should render a checkbox input and its label', () => {
    render(<FormField type="checkbox" label="Agree to terms" />);

    const checkbox = screen.getByLabelText(/Agree to terms/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('should render radio buttons from options', () => {
    const options = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ];

    render(<FormField type="radio" name="my-radio-group" options={options} />);

    const radio1 = screen.getByLabelText(/Option 1/i);
    const radio2 = screen.getByLabelText(/Option 2/i);

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio1).toHaveAttribute('type', 'radio');
    expect(radio2).toHaveAttribute('type', 'radio');
    expect(radio1).toHaveAttribute('name', 'my-radio-group');
    expect(radio2).toHaveAttribute('name', 'my-radio-group');
  });

  it('should display the correct placeholder text', () => {
    const placeholderText = 'Enter your username';

    render(<FormField placeholder={placeholderText} />);

    const input = screen.getByPlaceholderText(placeholderText);

    expect(input).toBeInTheDocument();
  });

  it('should display an error message', () => {
    const errorMessage = 'This field is required';

    render(<FormField error={errorMessage} />);

    const error = screen.getByText(errorMessage);

    expect(error).toBeInTheDocument();
  });

  it('should display a placeholder for the error message when no error is provided', () => {
    render(<FormField />);

    const placeholder = document.querySelector('p._error_efd8e4');

    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveTextContent('');
  });

  it('should handle user input for a text field', () => {
    render(<FormField name="username" />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input).toHaveValue('testuser');
  });

  it('should handle a click for a checkbox', () => {
    render(<FormField type="checkbox" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
