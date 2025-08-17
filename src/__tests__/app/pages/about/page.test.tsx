import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from '../../../../app/[locale]/about/page.tsx';
import { ABOUT_ME } from '@/constants/texts.ts';

const tMock = vi.fn((key: string) => {
  if (key === 'text.part1') return ABOUT_ME.PART_1;
  if (key === 'text.part2') return ABOUT_ME.PART_3;
  return '';
});

vi.mock('next-intl', () => ({
  useTranslations: () => tMock,
}));

describe('AboutPage', (): void => {
  it('renders the about text parts correctly and calls t() with proper keys', (): void => {
    render(<AboutPage />);

    expect(tMock).toHaveBeenCalledWith('text.part1');
    expect(tMock).toHaveBeenCalledWith('text.part2');

    const paragraph: HTMLElement = screen.getByText(
      (content: string, element): boolean => {
        return (
          element?.tagName.toLowerCase() === 'p' &&
          content.includes(ABOUT_ME.PART_1) &&
          content.includes(ABOUT_ME.PART_3)
        );
      }
    );
    expect(paragraph).toBeInTheDocument();

    const link: HTMLElement = screen.getByRole('link', {
      name: ABOUT_ME.PART_2,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
