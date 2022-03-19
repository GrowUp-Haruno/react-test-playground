import { createContext, FC, memo, useState } from 'react';
import { initialResponse } from '../services/customFetch';
import { useAuth } from './hooks/useAuth';

export const AuthContext = createContext(initialResponse);

/**
 * Auth情報のプロバイダ
 */
export const AuthProvider: FC = memo(({ children }) => {
  const { response } = useAuth();
  return <AuthContext.Provider value={response}>{children}</AuthContext.Provider>;
});
