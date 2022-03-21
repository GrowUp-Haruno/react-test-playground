import { FC, memo } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { signInWithGoogle } from '../../../services/firebaseAuthentication';
import { PrimaryButton } from '../../Atoms/Button/PrimaryButton';

export const GoogleLoginButton: FC = memo(() => {
  return (
    <PrimaryButton onClick={signInWithGoogle} leftIcon={<FcGoogle />} variant="outline">
      Google ログイン
    </PrimaryButton>
  );
});
