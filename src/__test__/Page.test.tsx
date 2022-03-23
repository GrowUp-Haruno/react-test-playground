import { render, screen, waitFor } from '@testing-library/react';
import { customRender } from './__functions__/customRender';
import { Page } from '../components/Substrates/Page';
import userEvent from '@testing-library/user-event';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { AuthProvider } from '../providers/AuthProvider';
import { act } from 'react-dom/test-utils';
import { firebaseAuth } from '../services/firebase';
import { getAuth } from 'firebase/auth';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { firebaseAuth } from '../services/firebase';
// import { signInWithGoogle } from '../services/firebaseAuthentication';

const test = async () => {
  // テストプロジェクト環境の作成
  const testEnv = await initializeTestEnvironment({
    projectId: 'project123',
  });

  // ログイン情報つきのContextを作成し、そこから Firestore インスタンスを得る
  const authenticatedContext = testEnv.authenticatedContext('uid string');
  console.log(authenticatedContext);
  // getAuth().
};
jest.mock('../services/firebaseAuthentication', () => ({
  ...jest.requireActual('../services/firebaseAuthentication'),
  signInWithGoogle: async () => {
    try {
      // (
      //   '{"sub": "abc123", "email": "foo@example.com", "email_verified": true}')
      // );

      await test();
    } catch (error) {
      console.log(error);
    }
  },
}));

const baseRender = () => {
  customRender(<Page />);

  const button = screen.getByText('Google ログイン');
  // const queryLogin = () => screen.queryByTestId('login');
  const findeLogin = () => screen.findByTestId('login');
  return {
    button,
    // queryLogin,
    findeLogin,
  };
};

// モックサーバの起動と停止
// beforeAll(() => mockServer.listen());
// afterEach(() => mockServer.resetHandlers());
// afterAll(() => mockServer.close());

describe('UserCard', () => {
  it('初期状態', async () => {
    // baseRender();
    const {
      button,
      // queryLogin,
      findeLogin,
    } = baseRender();

    userEvent.click(button);

    await waitFor(() => {});

    // await findeLogin();

    // screen.debug()
    // const { queryUserCardId, queryUserCardName } = baseRender();
    // expect(queryUserCardId()).toBeNull();
    // expect(queryUserCardName()).toBeNull();
  });
  // it('useEffect完了', async () => {
  //   const { queryUserCardId, queryUserCardName, findeUserCardId } = baseRender();
  //   await findeUserCardId();
  //   expect(queryUserCardId()).toHaveTextContent('id: 2022031801');
  //   expect(queryUserCardName()).toHaveTextContent('name: Haruno');
  // });
});
