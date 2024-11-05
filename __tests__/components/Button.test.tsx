// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import '@testing-library/jest-dom';
import { describe, it } from 'node:test';

// Define the valid variant types
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
    variant: 'default' as ButtonVariant,
    size: 'default' as ButtonSize,
    className: '',
    disabled: false,
  };

  it('renders button with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    variants.forEach(variant => {
      const { rerender } = render(<Button {...defaultProps} variant={variant} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(`variant-${variant}`);
      rerender(<></>);
    });
  });

  it('applies size styles correctly', () => {
    const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon'];
    sizes.forEach(size => {
      const { rerender } = render(<Button {...defaultProps} size={size} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(`size-${size}`);
      rerender(<></>);
    });
  });

  it('disables button when disabled prop is true', () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});