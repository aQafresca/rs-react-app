import * as React from 'react';
import type { HTMLAttributes, FC, JSX } from 'react';

export const createMockComponent = (
  testId: string,
  text: string
): FC<HTMLAttributes<HTMLDivElement>> => {
  const MockComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
    props: HTMLAttributes<HTMLDivElement>
  ): JSX.Element => (
    <div data-testid={testId} {...props}>
      {text}
    </div>
  );
  MockComponent.displayName = `MockComponent(${testId})`;
  return MockComponent;
};
