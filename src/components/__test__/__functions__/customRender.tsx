import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../../../providers/AuthProvider';
import { ChakraProvider } from '@chakra-ui/react';

export const customRender = (children: ReactNode) => {
  render(
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
};
