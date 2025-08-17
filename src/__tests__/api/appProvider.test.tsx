import { render, screen } from '@testing-library/react';
import { AppProviders } from '../../core/api/appProvider.tsx';
import { describe, it, expect } from 'vitest';

describe('AppProviders', () => {
  it('renders children without crashing', () => {
    render(
      <AppProviders>
        <div data-testid="child">Hello</div>
      </AppProviders>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Hello');
  });
});
