import { createContext, FC, memo } from 'react';
import { useAuthentication } from '../services/firebaseAuthentication';
import { currentUserTyep } from '../types/currentUserTyep';

export const AuthContext = createContext<currentUserTyep>(undefined);

/**
 * Auth情報のプロバイダ
 */
export const AuthProvider: FC = memo(({ children }) => {
  const { currentUser } = useAuthentication();
  console.log(currentUser);
  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
});