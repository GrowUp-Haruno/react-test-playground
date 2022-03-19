
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../../../providers/AuthProvider';

export const customRender = (children: ReactNode) => {
  render(<AuthProvider> {children}</AuthProvider>);
};
