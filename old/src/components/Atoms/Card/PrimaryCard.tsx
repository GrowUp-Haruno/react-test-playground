import { useColorModeValue } from '@chakra-ui/color-mode';
import { Stack, StackProps } from '@chakra-ui/layout';
import { FC, memo } from 'react';

export const PrimaryCard: FC<StackProps> = memo(({ children }) => {
  return (
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}
    >
      {children}
    </Stack>
  );
});
