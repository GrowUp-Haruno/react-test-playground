export type firebaseErrorCodeType =
  | 'auth/user-not-found'
  | 'auth/email-already-exists'
  | 'auth/invalid-display-name'
  | 'auth/invalid-email'
  | 'auth/invalid-password'
  | 'auth/invalid-photo-url'
  | 'auth/internal-error'
  | 'changeProfile-error'
  | 'updateToDo-error'
  | 'auth/network-request-failed'
  | (string & {});

export type firebaseErrorsType = Record<
  firebaseErrorCodeType,
  {
    title: string;
    description: string;
  }
>;
