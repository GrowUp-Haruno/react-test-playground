import { ToastId, useToast } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { todoGetDataType } from '../../../../models/todoGetDataType';
import { PicKey } from '../../../../models/UtilityType';
import { AuthContext } from '../../../../providers/AuthProvider';
import { CommunicatingContext } from '../../../../providers/CommunicatingProvider';
import { LastUpdateContext } from '../../../../providers/LastUpdateProvider';
import { firebaseErrors } from '../../../../service/firebaseErrors';
import { batchTodo, fetchTodo } from '../../../../service/firebaseFirestore';
import { updateLimitCheck } from '../../../../service/updateLimitCheck';

// 更新間隔[分]
const updateInterval: number = 1;

// 連続更新の制限回数
const numberOfLimits: number = 3;

/**
 * useTodoカスタムフック
 * @template - const { todos, setTodos } = useTodo();
 */
export const useTodo = () => {
  const currentUser = useContext(AuthContext);
  const { setCommunicating } = useContext(CommunicatingContext);
  const { lastUpdate, setLastUpdate } = useContext(LastUpdateContext);

  const [todos, setTodos] = useState<Array<todoGetDataType> | undefined>([]);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  //  各種メッセージの表示コンポーネント
  const toast = useToast({ position: 'top', duration: 2000, isClosable: true });
  const toastIdRef = useRef<ToastId | undefined>();

  // isCmpleteの論理を反転
  const checkBoxChangeHandler = useCallback(
    (index: number, changeKey: PicKey<todoGetDataType, boolean>) => {
      if (todos) {
        setTodos(
          todos.map((todo, i) =>
            i === index ? { ...todo, [changeKey]: !todo[changeKey], isUpdated: true } : { ...todo }
          )
        );
        setUpdateFlag(true);
      }
    },
    [todos]
  );

  const todoUpdateHandler = useCallback(async () => {
    if (todos) {
      const batch = batchTodo(currentUser, todos);
      if (batch) {
        try {
          updateLimitCheck(
            lastUpdate,
            setLastUpdate,
            'updateToDo',
            numberOfLimits,
            updateInterval,
            'updateToDo-error'
          );

          console.log('Firestoreバッチ処理開始');
          setCommunicating(true);
          await batch.commit();

          setTodos(await fetchTodo(currentUser));
          setUpdateFlag(false);

          // 既にtoastが出ている場合はこれをを削除
          if (toastIdRef.current) {
            toast.close(toastIdRef.current);
          }

          // 完了メッセージを表示
          toastIdRef.current = toast({
            title: '変更完了',
            description: 'ToDoの更新が完了しました！',
            status: 'success',
          });
        } catch (error) {
          // 既にtoastが出ている場合はこれをを削除
          if (toastIdRef.current) {
            toast.close(toastIdRef.current);
          }

          if (error instanceof FirebaseError) {
            // エラーメッセージを表示
            if (firebaseErrors[error.code] !== undefined) {
              // Firebaseの非同期APIのエラーを表示
              toastIdRef.current = toast({
                title: firebaseErrors[error.code].title,
                description: firebaseErrors[error.code].description,
                status: 'error',
              });
            } else {
              // firebaseErrorsに登録されていないエラーコードが入っていた場合
              toastIdRef.current = toast({
                title: '予期しないエラー',
                description: `予期しないエラーが発生しました:${error.code}`,
                status: 'error',
              });
            }
          } else {
            // その他の非同期関数のエラー表示
            console.log(error);
          }
        } finally {
          console.log('Firestoreバッチ処理完了');

          setCommunicating(false);
          console.log('Firestore再読み込み完了');
        }
      }
    }
  }, [currentUser, lastUpdate, setCommunicating, setLastUpdate, toast, todos]);

  // todoの初回読み込み
  useEffect(() => {
    (async () => {
      setTodos(await fetchTodo(currentUser));
    })();

    return () => {
      setTodos([]);
      setUpdateFlag(false);
    };
  }, [currentUser]);

  return {
    todos,
    updateFlag,
    setTodos,
    setUpdateFlag,
    checkBoxChangeHandler,
    todoUpdateHandler,
  };
};
