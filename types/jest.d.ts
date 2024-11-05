import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

declare global {
  const expect: typeof import('@jest/globals').expect;
  const jest: typeof import('@jest/globals').jest;
  
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveTextContent(text: string): R;
    }
  }
}