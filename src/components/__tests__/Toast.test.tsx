// @ts-expect-error - React is used implicitly by JSX
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Toast } from '../Toast';

describe('Toast component', () => {
  test('renders correctly when visible', () => {
    const onClose = vi.fn();
    render(
      <Toast
        message="Test message"
        type="info"
        visible={true}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  test('does not render when not visible', () => {
    const { container } = render(
      <Toast
        message="Test message"
        type="info"
        visible={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Toast
        message="Test message"
        type="info"
        visible={true}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles for different types', () => {
    const { rerender } = render(
      <Toast message="Error" type="error" visible={true} />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(<Toast message="Success" type="success" visible={true} />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});