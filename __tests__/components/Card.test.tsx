// __tests__/components/Card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/components/ui/card';
import { describe, it } from 'node:test';

describe('Card Component', () => {
    const mockProps = {
      title: 'Test Card',
      description: 'Test Description',
      image: {
        src: '/test.jpg',
        alt: 'Test Image',
      },
    };

    it('renders card with all props', () => {
        render(<Card {...mockProps} />);
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
        expect(screen.getByAltText(mockProps.image.alt)).toBeInTheDocument();
    });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Card {...mockProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});[4]

