import { useUserStore } from '@components/core/store/useIUserStore';
import ControlledFormData from '@components/form/controlled';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSetUserData = vi.fn();

vi.mock('@components/core/store/useIUserStore', () => ({
  useUserStore: vi.fn(() => ({
    setUserData: mockSetUserData,
  })),
}));

vi.mock('@components/upload/image', () => ({
  __esModule: true,
  default: vi.fn((props) => (
    <input
      type="file"
      data-testid="upload-image-input"
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
    />
  )),
}));

describe('ControlledFormData', () => {
  beforeEach(() => {
    mockSetUserData.mockClear();
    vi.clearAllMocks();
    (useUserStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setUserData: mockSetUserData,
    });
  });

  it('should render the form with initial state and disabled submit button', () => {
    render(<ControlledFormData onClose={vi.fn()} />);

    expect(screen.getByLabelText(/Email:/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
