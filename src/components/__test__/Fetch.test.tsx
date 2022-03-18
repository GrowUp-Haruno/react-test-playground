import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Fetch } from '../Fetch';
import { errorHandlers, mockServer } from './mock/mockServer';

const baseRender = () => {
  render(<Fetch />);

  const button = screen.getByText('Get a Chuck Norris joke');

  const queryFetchLoading = () => {
    return screen.queryByTestId('fetch-loading');
  };

  const queryFetchError = () => {
    return screen.queryByTestId('fetch-error');
  };
  const findFetchError = () => {
    return screen.findByTestId('fetch-error');
  };

  const queryFetchJoke = () => {
    return screen.queryByTestId('fetch-joke');
  };
  const findFetchJoke = () => {
    return screen.findByTestId('fetch-joke');
  };

  return {
    button,
    queryFetchLoading,
    queryFetchError,
    queryFetchJoke,
    findFetchJoke,
    findFetchError,
  };
};

// モックサーバの起動と停止
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('初期状態の確認', () => {
  it('ボタン以外のコンポーネントが表示されないこと', () => {
    const { queryFetchError, queryFetchJoke, queryFetchLoading } = baseRender();

    expect(queryFetchLoading()).toBeNull();
    expect(queryFetchError()).toBeNull();
    expect(queryFetchJoke()).toBeNull();
  });
});

describe('[query a Chuck Norris joke]ボタンの動作確認', () => {
  it('ボタンクリック直後に「Loading...」と表示されること', () => {
    const { button, queryFetchError, queryFetchJoke, queryFetchLoading, findFetchJoke } =
      baseRender();

    userEvent.click(button);
    expect(queryFetchLoading()).toHaveTextContent('Loading...');
    expect(queryFetchError()).toBeNull();
    expect(queryFetchJoke()).toBeNull();
  });

  it('通信完了後、「Chuck Norris counted to infinity. Twice.」が表示されること', async () => {
    const { button, queryFetchError, queryFetchJoke, queryFetchLoading, findFetchJoke } =
      baseRender();

    userEvent.click(button);
    await findFetchJoke();

    expect(queryFetchLoading()).toBeNull();
    expect(queryFetchError()).toBeNull();
    expect(queryFetchJoke()).toHaveTextContent('Chuck Norris counted to infinity. Twice.');
  });

  it('通信エラーが発生すると、エラー「Failed to fetch」が表示されること', async () => {
    // エラーを発生させる
    mockServer.use(errorHandlers['jokesRandom']);

    const { button, queryFetchError, queryFetchJoke, queryFetchLoading, findFetchError } =
      baseRender();

    userEvent.click(button);
    await findFetchError();

    expect(queryFetchLoading()).toBeNull();
    expect(queryFetchError()).toHaveTextContent('Failed to fetch');
    expect(queryFetchJoke()).toBeNull();
  });
});
