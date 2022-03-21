import { FC, memo } from 'react';
import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

type PropsType = {
  children: FlexProps['children'];
  justify: FlexProps['justify'];
  height: FlexProps['height'];
};

export const BaseLayout: FC<PropsType> = memo(({ children, justify, height }) => {
  return (
    <Flex
      direction="column"
      height={height}
      align="center"
      justify={justify}
      bg={useColorModeValue('gray.200', 'gray.800')}
    >
      {children}
    </Flex>
  );
});
