import UploadImage from '@components/upload/image';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('UploadImage', () => {
  it('renders input[type="file"]', () => {
    const { container } = render(<UploadImage name="test" onChange={() => {}} value="" />);
    const input = container.querySelector('input[type="file"]');

    expect(input).toBeInTheDocument();
  });

  it('displays the error text', () => {
    const { getByText } = render(<UploadImage name="test" onChange={() => {}} value="" error="Test error" />);

    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('calls onChange with a valid file', async () => {
    const onChange = vi.fn();
    const { container } = render(<UploadImage name="test" onChange={onChange} value="" />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]')!;

    Object.defineProperty(input, 'files', { value: [file] });

    fireEvent.change(input);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toContain('data:image/png;base64');
    });
  });

  it('shows alert on invalid file type', () => {
    vi.stubGlobal('alert', vi.fn());

    const { container } = render(<UploadImage name="test" onChange={() => {}} value="" />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]')!;

    Object.defineProperty(input, 'files', { value: [file] });

    fireEvent.change(input);

    expect(alert).toHaveBeenCalledWith('Only JPEG and PNG are allowed');
  });

  it('shows alert on file too large', () => {
    vi.stubGlobal('alert', vi.fn());

    const { container } = render(<UploadImage name="test" onChange={() => {}} value="" />);
    const file = new File([new ArrayBuffer(3 * 1024 * 1024)], 'large.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]')!;

    Object.defineProperty(input, 'files', { value: [file] });

    fireEvent.change(input);

    expect(alert).toHaveBeenCalledWith('File size should not exceed 2MB');
  });
});
