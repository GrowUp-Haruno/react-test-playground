import { FC, memo, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';
import { BaseLayout } from '../Atoms/Layout/BaseLayout';
import { Header } from '../Modules/Header/Header';
import { Login } from '../Modules/Page/Login';
import { Todo } from '../Modules/Page/Todo';

export const Page: FC = memo(() => {
  /** ヘッダーの高さ */
  const headerHeight: number = 6;
  const currentUser = useContext(AuthContext);
  return (
    <>
      {!currentUser ? <></> : <Header height={`${headerHeight}vh`} />}
      <BaseLayout
        justify={!currentUser ? 'center' : 'start'}
        height={!currentUser ? '100vh' : `${100 - headerHeight}vh`}
      >
        {!currentUser ? <Login /> : <Todo />}
      </BaseLayout>
    </>
  );
});
