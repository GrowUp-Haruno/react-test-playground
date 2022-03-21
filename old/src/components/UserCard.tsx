import { FC, memo, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

//Propsの型定義
type PropsType = {};

export const UserCard: FC<PropsType> = memo(() => {
  const response = useContext(AuthContext);
  return (
    <div>
      {response.success && <p data-testid="user-card-id">id: {response.data[0].id}</p>}
      {response.success && <p data-testid="userCardName">name: {response.data[0].name}</p>}
    </div>
  );
});
