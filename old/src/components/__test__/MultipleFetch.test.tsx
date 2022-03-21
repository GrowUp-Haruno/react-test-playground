import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultipleFetches } from '../MultipleFetches';
import { errorHandlers, mockServer } from './mock/mockServer';

const baseRender = () => {
  render(<MultipleFetches />);

  const button = screen.getByText('Fetch post and comments');

  const queryFetchLoadingPost = () => screen.queryByTestId('fetch-loading-post');
  const queryFetchErrorPost = () => screen.queryByTestId('fetch-error-post');
  const queryFetchPost = () => screen.queryByTestId('fetch-post');
  const queryLoadingComments = () => screen.queryByTestId('fetch-loading-comments');
  const queryFetchErrorComments = () => screen.queryByTestId('fetch-error-comments');
  const queryCommentAuthor = () => screen.queryByTestId('comment-author');
  const queryMultipleFetchSuccess = () => screen.queryByTestId('multiple-fetch-success');

  const queryAllCommentAuthor = () => screen.queryAllByTestId('comment-author');

  const findFetchErrorPost = () => screen.findByTestId('fetch-error-post');
  const findFetchPost = () => screen.findByTestId('fetch-post');
  const findFetchErrorComments = () => screen.findByTestId('fetch-error-comments');
  const findMultipleFetchSuccess = () => screen.findByTestId('multiple-fetch-success');

  return {
    button,
    queryFetchLoadingPost,
    queryFetchErrorPost,
    queryFetchPost,
    queryLoadingComments,
    queryFetchErrorComments,
    queryCommentAuthor,
    queryMultipleFetchSuccess,
    queryAllCommentAuthor,
    findFetchErrorPost,
    findFetchErrorComments,
    findFetchPost,
    findMultipleFetchSuccess,
  };
};

// モックサーバの起動と停止
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('[query a Chuck Norris joke]ボタンの動作確認', () => {
  it('正常動作', async () => {
    const {
      button,
      queryFetchLoadingPost,
      queryFetchErrorPost,
      queryFetchPost,
      queryLoadingComments,
      queryFetchErrorComments,
      queryCommentAuthor,
      queryAllCommentAuthor,
      queryMultipleFetchSuccess,
      findFetchPost,
      findMultipleFetchSuccess,
    } = baseRender();

    // 初期状態
    // 各コンポーネントの非存在チェック
    expect(queryFetchLoadingPost()).toBeNull();
    expect(queryFetchErrorPost()).toBeNull();
    expect(queryFetchPost()).toBeNull();
    expect(queryLoadingComments()).toBeNull();
    expect(queryFetchErrorComments()).toBeNull();
    expect(queryCommentAuthor()).toBeNull();
    expect(queryMultipleFetchSuccess()).toBeNull();

    //ボタンをクリック
    userEvent.click(button);
    expect(queryFetchLoadingPost()).toHaveTextContent('Loading post...');
    // 各コンポーネントの非存在チェック
    expect(queryFetchErrorPost()).toBeNull();
    expect(queryFetchPost()).toBeNull();
    expect(queryLoadingComments()).toBeNull();
    expect(queryFetchErrorComments()).toBeNull();
    expect(queryCommentAuthor()).toBeNull();
    expect(queryMultipleFetchSuccess()).toBeNull();

    // .../posts/1のフェッチ完了を待つ
    await findFetchPost();
    expect(queryFetchPost()).toHaveTextContent('How to Become a Bad Developer');
    expect(queryLoadingComments()).toHaveTextContent('Loading comments...');
    // 各コンポーネントの非存在チェック
    expect(queryFetchLoadingPost()).toBeNull();
    expect(queryFetchErrorPost()).toBeNull();
    expect(queryFetchErrorComments()).toBeNull();
    expect(queryCommentAuthor()).toBeNull();
    expect(queryMultipleFetchSuccess()).toBeNull();

    // .../posts/1/commentsのフェッチ完了を待つ
    await findMultipleFetchSuccess();
    expect(queryFetchPost()).toHaveTextContent('How to Become a Bad Developer');
    expect(queryAllCommentAuthor()[0]).toHaveTextContent('Rafael');
    expect(queryAllCommentAuthor()[1]).toHaveTextContent('Andressa');
    expect(queryMultipleFetchSuccess()).toHaveTextContent('All fetched!');
    // 各コンポーネントの非存在チェック
    expect(queryFetchLoadingPost()).toBeNull();
    expect(queryFetchErrorPost()).toBeNull();
    expect(queryLoadingComments()).toBeNull();
    expect(queryFetchErrorComments()).toBeNull();
  });

  it('.../posts/1の通信エラー', async () => {
    // .../posts/1のエラーを発生させる
    mockServer.use(errorHandlers['posts']);
    const {
      button,
      queryFetchLoadingPost,
      queryFetchErrorPost,
      findFetchErrorPost,
      queryFetchPost,
      queryLoadingComments,
      queryFetchErrorComments,
      queryCommentAuthor,
      queryMultipleFetchSuccess,
    } = baseRender();

    //ボタンをクリック
    userEvent.click(button);

    // .../posts/1の通信エラーを待つ
    await findFetchErrorPost();
    expect(queryFetchErrorPost()).toHaveTextContent('Failed to fetch');
    // 各コンポーネントの非存在チェック
    expect(queryFetchLoadingPost()).toBeNull();
    expect(queryFetchPost()).toBeNull();
    expect(queryLoadingComments()).toBeNull();
    expect(queryFetchErrorComments()).toBeNull();
    expect(queryCommentAuthor()).toBeNull();
    expect(queryMultipleFetchSuccess()).toBeNull();
  });

  it('.../posts/1の通信正常、.../posts/1/commentsの通信エラー', async () => {
    // .../posts/1のエラーを発生させる
    mockServer.use(errorHandlers['comments']);

    const {
      button,
      queryFetchLoadingPost,
      queryFetchPost,
      queryLoadingComments,
      queryFetchErrorComments,
      queryFetchErrorPost,
      queryCommentAuthor,
      queryMultipleFetchSuccess,
      findFetchPost,
      findFetchErrorComments,
    } = baseRender();

    //ボタンをクリック
    userEvent.click(button);

    // .../posts/1のフェッチ完了を待つ
    await findFetchPost();

    // .../posts/1/commentsの通信エラーを待つ
    await findFetchErrorComments();
    expect(queryFetchPost()).toHaveTextContent('How to Become a Bad Developer');
    expect(queryFetchErrorComments()).toHaveTextContent('Failed to fetch');
    // 各コンポーネントの非存在チェック
    expect(queryFetchLoadingPost()).toBeNull();
    expect(queryFetchErrorPost()).toBeNull();
    expect(queryLoadingComments()).toBeNull();
    expect(queryCommentAuthor()).toBeNull();
    expect(queryMultipleFetchSuccess()).toBeNull();
  });
});
