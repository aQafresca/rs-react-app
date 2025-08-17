import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockComponent } from '@/__tests__/__moks__/createMockComponent.tsx';

describe('createMockComponent', () => {
  it('renders the component with given text and testId', () => {
    const TestComponent = createMockComponent('mock-id', 'Hello World');

    render(<TestComponent className="test-class" />);

    const element = screen.getByTestId('mock-id');

    expect(element).toHaveTextContent('Hello World');

    expect(element).toHaveClass('test-class');
  });

  it('has correct displayName', () => {
    const TestComponent = createMockComponent('mock-id', 'Hello World');
    expect(TestComponent.displayName).toBe('MockComponent(mock-id)');
  });
});
