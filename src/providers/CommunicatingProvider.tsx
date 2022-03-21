import { createContext, Dispatch, FC, memo, useState } from 'react';

type CommunicatingContextType = {
  communicating: boolean;
  setCommunicating: Dispatch<React.SetStateAction<boolean>>;
};

export const CommunicatingContext = createContext({} as CommunicatingContextType);

/**
 * Firebaseとの通信状態を管理
 */
export const CommunicatingProvider: FC = memo(({ children }) => {
  const [communicating, setCommunicating] = useState<boolean>(false);

  return (
    <CommunicatingContext.Provider value={{ communicating, setCommunicating }}>
      {children}
    </CommunicatingContext.Provider>
  );
});
