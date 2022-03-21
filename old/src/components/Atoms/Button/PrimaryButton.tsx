import { Button, ButtonProps } from '@chakra-ui/react';
import { FC, memo, useContext } from 'react';
import { CommunicatingContext } from '../../../providers/CommunicatingProvider';

type PropsType = {
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  leftIcon?: ButtonProps['leftIcon'];
  variant?: ButtonProps['variant'];
  isDisabled?: ButtonProps['isDisabled'];
  loadingText?: ButtonProps['loadingText'];
  as?: ButtonProps['as'];
};

export const PrimaryButton: FC<PropsType> = memo(
  ({ children, onClick, type, leftIcon, variant, isDisabled, loadingText, as }) => {
    const { communicating } = useContext(CommunicatingContext);

    return (
      <Button
        isDisabled={isDisabled}
        isLoading={communicating}
        onClick={onClick}
        type={type}
        colorScheme="blue"
        w="full"
        variant={variant}
        leftIcon={leftIcon}
        loadingText={loadingText}
        as={as}
      >
        {children}
      </Button>
    );
  }
);
