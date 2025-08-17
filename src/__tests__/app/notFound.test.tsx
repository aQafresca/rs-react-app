import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../app/[locale]/not-found';
import { NOT_FOUND } from '@/constants/constants.ts';

describe('NotFoundPage', (): void => {
  it('renders the NOT_FOUND message', () => {
    render(<NotFoundPage />);

    // Проверяем, что заголовок с текстом ошибки отображается
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(NOT_FOUND.ERROR);
  });
});
