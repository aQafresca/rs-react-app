import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Flyout from '@components/Flyout/Flyout.tsx';
import * as cardStoreModule from '@/core/store/useCardStore';
import * as downloadModule from '@/actions/download.ts';

import { getMockCharacter } from '@/__tests__/__moks__/getMockCharacter.ts';

vi.mock('file-saver', () => ({
  default: vi.fn(),
}));

import saveAs from 'file-saver';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Flyout component', () => {
  const clearMock = vi.fn();

  const selectedMock = {
    1: getMockCharacter(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(cardStoreModule, 'useCardStore').mockImplementation((selector) =>
      selector({
        clear: clearMock,
        selected: selectedMock,
        add: vi.fn(),
        remove: vi.fn(),
        toggle: vi.fn(),
      })
    );
  });

  it('renders selected characters count', () => {
    render(<Flyout />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls clear on cancel button click', () => {
    render(<Flyout />);
    const cancelButton = screen.getByText('labels.cancel');
    fireEvent.click(cancelButton);
    expect(clearMock).toHaveBeenCalledTimes(1);
  });

  it('calls saveAs on download button click', async () => {
    const blob = new Blob(['test']);
    vi.spyOn(downloadModule, 'createCsv').mockResolvedValue(blob);

    render(<Flyout />);
    const downloadButton = screen.getByText('labels.download');

    await fireEvent.click(downloadButton);

    expect(downloadModule.createCsv).toHaveBeenCalledWith(
      Object.values(selectedMock)
    );
    expect(saveAs).toHaveBeenCalledWith(blob, 'selected 1 characters.csv');
  });
});
