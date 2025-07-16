import * as React from 'react';
import type { HTMLAttributes, FC } from 'react';

export const createMockComponent = (
  testId: string,
  text: string
): FC<HTMLAttributes<HTMLDivElement>> => {
  const MockComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
    props
  ) => (
    <div data-testid={testId} {...props}>
      {text}
    </div>
  );
  MockComponent.displayName = `MockComponent(${testId})`;
  return MockComponent;
};
