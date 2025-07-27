import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from '@components/pages/About/About.tsx';
import { ABOUT_ME } from '@/constants/texts.ts';

describe('AboutPage', (): void => {
  it('renders the about text parts correctly', (): void => {
    render(<AboutPage />);

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
