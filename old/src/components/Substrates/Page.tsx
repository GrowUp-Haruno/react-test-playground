import { FC, memo, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';
import { BaseLayout } from '../Atoms/Layout/BaseLayout';

import { Login } from '../Modules/Page/Login';

export const Page: FC = memo(() => {
  /** ヘッダーの高さ */
  const headerHeight: number = 6;
  const currentUser = useContext(AuthContext);

  console.log(currentUser)
  return (
    <BaseLayout
      justify={!currentUser ? 'center' : 'start'}
      height={!currentUser ? '100vh' : `${100 - headerHeight}vh`}
    >
      {!currentUser ? <Login /> : <></>}
    </BaseLayout>
  );
});
