import { firebaseErrorsType } from '../models/firebaseErrorsType';

export const firebaseErrors: firebaseErrorsType = {
  'auth/user-not-found': {
    title: 'ログインエラー',
    description: 'ユーザーが存在しないか、パスワードに誤りがあります。',
  },
  'auth/email-already-exists': {
    title: 'メールアドレスエラー',
    description: '提供されたメールアドレスはすでに使用されています。',
  },
  'auth/invalid-display-name': {
    title: 'ユーザー名エラー',
    description: 'ユーザー名に指定された文字に無効な文字(空文字を含む)が含まれています。',
  },
  'auth/invalid-email': {
    title: 'メールアドレスエラー',
    description: '有効なメールアドレスではありません。',
  },
  'auth/invalid-password': {
    title: 'パスワードエラー',
    description: 'passwordに指定された値は無効です。6 文字以上の文字列を指定してください。',
  },
  'auth/invalid-photo-url': {
    title: '',
    description: '指定された値は無効です。文字列 URL を指定する必要があります。',
  },
  'auth/internal-error': {
    title: '予期しないエラー',
    description: '予期しないエラーが発生しました。',
  },
  'changeProfile-error': {
    title: 'プロフィールの変更制限',
    description: 'プロフィール変更制限中です。1分ほど時間をあけてから、再試行してください。',
  },
  'updateToDo-error': {
    title: 'ToDoの変更制限',
    description: 'ToDoの変更制限中です。1分ほど時間をあけてから、再試行してください。',
  },
  'auth/network-request-failed': {
    title: 'ネットワークエラー',
    description: 'ネットワークにつながっていません。回線を確認してください。',
  },
};
