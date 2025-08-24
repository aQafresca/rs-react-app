import Modal from '@components/modal';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('Modal', () => {
  let modalRoot: HTMLElement | null;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
    vi.clearAllMocks();
  });

  it('should render children and a close button correctly', () => {
    const onCloseMock = vi.fn();

    render(
      <Modal onClose={onCloseMock}>
        <h1>Test Header</h1>
        <p>Test Text</p>
      </Modal>,
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close', hidden: true })).toBeInTheDocument();
  });

  it('should call onClose when the backdrop is clicked', () => {
    const onCloseMock = vi.fn();

    render(<Modal onClose={onCloseMock} />);

    const backdrop = screen.getByRole('dialog', { hidden: true });

    fireEvent.click(backdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(<Modal onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button', { name: 'Close', hidden: true });

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the Escape key is pressed', () => {
    const onCloseMock = vi.fn();

    render(<Modal onClose={onCloseMock} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when the content inside the modal is clicked', () => {
    const onCloseMock = vi.fn();

    render(
      <Modal onClose={onCloseMock}>
        <p>I am inside the modal. Do not close me!</p>
      </Modal>,
    );

    const content = screen.getByText('I am inside the modal. Do not close me!');

    fireEvent.click(content);

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  describe('when modal-root does not exist', () => {
    it('should return null', () => {
      const { container } = render(<Modal onClose={vi.fn()} />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
