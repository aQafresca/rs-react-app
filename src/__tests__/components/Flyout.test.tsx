import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Flyout from '@components/Flyout/Flyout.tsx';
import { BUTTON_LABELS } from '@/constants/constants';
import * as cardStoreModule from '@/core/store/useCardStore';

import { getMockCharacter } from '@/__tests__/__mocks__/getMockCharacter.ts';

vi.mock('file-saver', () => ({
  default: vi.fn(),
}));

import saveAs from 'file-saver';

describe('Flyout component', (): void => {
  const clearMock = vi.fn();

  const selectedMock = {
    1: getMockCharacter(),
  };

  beforeEach(() => {
    vi.spyOn(cardStoreModule, 'useCardStore').mockImplementation((selector) =>
      selector({
        clear: clearMock,
        selected: selectedMock,
        add: vi.fn(),
        remove: vi.fn(),
        toggle: vi.fn(),
      })
    );
    vi.clearAllMocks();
  });

  it('renders selected characters count', (): void => {
    render(<Flyout />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls clear on cancel button click', (): void => {
    render(<Flyout />);
    const cancelButton: HTMLElement = screen.getByText(BUTTON_LABELS.CANCEL);
    fireEvent.click(cancelButton);
    expect(clearMock).toHaveBeenCalledTimes(1);
  });

  it('calls saveAs on download button click', (): void => {
    render(<Flyout />);
    const downloadButton: HTMLElement = screen.getByText(
      BUTTON_LABELS.DOWNLOAD
    );
    fireEvent.click(downloadButton);
    expect(saveAs).toHaveBeenCalledTimes(1);
  });
});
