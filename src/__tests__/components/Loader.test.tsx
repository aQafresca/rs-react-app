import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Loader from '@components/Loader/Loader.tsx';

describe('Loader - Real Component', (): void => {
  it('should render the Loader component in the document', (): void => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
