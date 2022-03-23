import { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../../providers/AuthProvider';
import { CommunicatingProvider } from '../../providers/CommunicatingProvider';


export const customRender = (children: ReactNode) => {
  render(
    <ChakraProvider>
      <AuthProvider>
        <CommunicatingProvider>{children}</CommunicatingProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
