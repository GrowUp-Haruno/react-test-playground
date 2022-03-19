import { screen } from '@testing-library/react';

import { UserCard } from '../UserCard';
import { customRender } from './__functions__/customRender';
import { mockServer } from './mock/mockServer';

const baseRender = () => {
  customRender(<UserCard />);
  const queryUserCardId = () => screen.queryByTestId('user-card-id');
  const queryUserCardName = () => screen.queryByTestId('userCardName');
  const findeUserCardId = () => screen.findByTestId('user-card-id');
  return { queryUserCardId, queryUserCardName, findeUserCardId };
};

// モックサーバの起動と停止
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('UserCard', () => {
  it('初期状態', () => {
    const { queryUserCardId, queryUserCardName } = baseRender();
    expect(queryUserCardId()).toBeNull();
    expect(queryUserCardName()).toBeNull();
  });
  it('useEffect完了', async () => {
    const { queryUserCardId, queryUserCardName, findeUserCardId } = baseRender();
    await findeUserCardId();
    expect(queryUserCardId()).toHaveTextContent('id: 2022031801');
    expect(queryUserCardName()).toHaveTextContent('name: Haruno');
  });
});
