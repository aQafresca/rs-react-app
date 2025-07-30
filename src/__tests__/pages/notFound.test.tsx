import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import NotFoundPage from '@components/pages/NotFound/NotFound.tsx';
import { NOT_FOUND } from '@/constants/constants.ts';

describe('NotFoundPage', () => {
  it('renders error message from constants', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(NOT_FOUND.ERROR);
  });
});
