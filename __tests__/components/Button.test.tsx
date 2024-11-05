import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { expect, describe, it, jest } from '@jest/globals';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
    className: 'custom-class',
    disabled: false,
    variant: 'default',
    size: 'default',
  };

  const setup = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };
    const onClick = jest.fn();
    const utils = render(<Button {...finalProps} onClick={onClick} />);
    const button = screen.getByRole('button');
    return {
      button,
      onClick,
      ...utils,
    };
  };

  it('renders button with correct text content', () => {
    const { button } = setup();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies custom className correctly', () => {
    const { button } = setup({ className: 'test-class' });
    expect(button).toHaveClass('test-class');
  });

  it('handles click events when enabled', () => {
    const { button, onClick } = setup();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click events when disabled', () => {
    const { button, onClick } = setup({ disabled: true });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders different variants correctly', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    variants.forEach(variant => {
      const { button } = setup({ variant });
      expect(button).toHaveClass(`variant-${variant}`);
    });
  });

  it('renders different sizes correctly', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'];
    sizes.forEach(size => {
      const { button } = setup({ size });
      expect(button).toHaveClass(`size-${size}`);
    });
  });

  it('handles keyboard interactions', () => {
    const { button, onClick } = setup();
    
    // Test space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    fireEvent.keyUp(button, { key: ' ', code: 'Space' });
    
    // Test enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter', code: 'Enter' });
    
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('maintains focus state correctly', () => {
    const { button } = setup();
    
    button.focus();
    expect(button).toHaveFocus();
    
    button.blur();
    expect(button).not.toHaveFocus();
  });

  it('handles loading state correctly', () => {
    const { button } = setup({ isLoading: true });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('renders with async onClick handler', async () => {
    const asyncOnClick = jest.fn().mockImplementation(() => Promise.resolve());
    const { button } = setup({ onClick: asyncOnClick });
    
    await fireEvent.click(button);
    expect(asyncOnClick).toHaveBeenCalledTimes(1);
  });
});