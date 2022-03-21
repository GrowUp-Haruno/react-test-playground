import { ChakraProvider } from '@chakra-ui/react';
import { Page } from './components/Substrates/Page';
// import { Page } from './components/Substrates/Page';
import { AuthProvider } from './providers/AuthProvider';
import { CommunicatingProvider } from './providers/CommunicatingProvider';
// import { LastUpdateProvider } from './providers/LastUpdateProvider';
// import { NetworkStatusProvider } from './providers/NetworkStatusProvider';

export function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        {/* <NetworkStatusProvider> */}
          <CommunicatingProvider>
            {/* <LastUpdateProvider> */}
              <Page />
            {/* </LastUpdateProvider> */}
          </CommunicatingProvider>
        {/* </NetworkStatusProvider> */}
      </AuthProvider>
    </ChakraProvider>
  );
}
